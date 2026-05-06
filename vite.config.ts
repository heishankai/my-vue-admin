import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

// 引入 Element Plus 的解析器
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 与 createWebHistory 保持一致，否则子路径部署时脚本会从 /js/* 404
const APP_BASE = '/fitment-admin/'

/** vue-hooks-plus 官方 meta-data：一次性注册全部 hooks，便于全局类型与 ESLint globals */
const viteDirname = dirname(fileURLToPath(import.meta.url))
const vueHooksPlusPreset = {
  from: 'vue-hooks-plus',
  imports: (
    JSON.parse(
      readFileSync(join(viteDirname, 'node_modules/vue-hooks-plus/meta-data.json'), 'utf-8'),
    ) as { function: string[] }
  ).function.map((name) => name.trim()),
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const serverConfig = (() => {
    // 基础配置：所有环境都开放 host，方便局域网访问
    const baseConfig = {
      host: '0.0.0.0',
      // host: '127.0.0.1',
      port: 5173,
      open: false, // 启动时不自动打开浏览器
    }

    // 开发环境和测试环境需要代理
    if (mode === 'development' || mode === 'test') {
      return {
        ...baseConfig,
        proxy: {
          '/api': {
            target: 'http://ceshi13.dishait.cn/admin', // 👈 你的本地后端地址
            changeOrigin: true, // 允许跨域
            rewrite: (path: string) => path.replace(/^\/api/, ''), // 重写路径，去掉 /api 前缀
          },
        },
      }
    }

    // QA 环境示例（如果有需要可以开启）
    if (mode === 'qa') {
      return {
        ...baseConfig,
        proxy: {
          '/api': {
            target: 'http://your-qa-server.com', // 👈 你的 QA 服务器地址
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
          },
        },
      }
    }

    // 生产环境通常不需要代理，直接返回基础配置即可
    return baseConfig
  })()

  return {
    base: APP_BASE,
    plugins: [
      vue(),
      vueJsx(),
      tailwindcss(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
        imports: ['vue', 'vue-router', vueHooksPlusPreset],
        dts: 'src/auto-imports.d.ts', // 生成 TS 类型声明
        eslintrc: {
          enabled: true, // 生成 ESLint 配置，防止报错 "xxx is not defined"
        },
      }),
      // 仅按需解析 Element Plus；不扫描本地目录，自定义组件请手写 import
      Components({
        dirs: [],
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts',
        // 不写 TSX：关闭第二套 declare global，只保留 declare module 'vue'（GlobalComponents）
        dtsTsx: false,
      }),
    ],
    server: serverConfig,
    // 路径别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // --- 构建优化 ---
    build: {
      outDir: 'fitment-admin', // 打包输出目录
      sourcemap: false, // 生产环境关闭 source map
      emptyOutDir: true, // 打包前清空 dist 目录
      chunkSizeWarningLimit: 1500, // 增大警告阈值
      cssTarget: 'chrome80', // 指定 CSS 目标浏览器版本
      rollupOptions: {
        output: {
          // 文件名哈希格式
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // 核心优化：手动分包，将 node_modules 里的库单独拆分
          manualChunks(id) {
            if (id?.includes('node_modules')) {
              // 兼容 pnpm 和 npm 的目录结构正则
              const pnpmMatch = id?.match(
                /node_modules\/\.pnpm\/[^/]+\/node_modules\/(@[^/]+\/[^/]+|[^/]+)\//,
              )
              const flatMatch = id?.match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)\//)
              const match = pnpmMatch || flatMatch
              if (match) {
                return match?.[1]?.replace(/\//g, '-')
              }
            }
          },
        },
      },
    },
    // 👇 新增：SCSS 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          // 自动导入变量文件，末尾记得加分号
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    /**
     * @description 开发模式生效： 需要预构建的依赖项 如：pinia、lodash-es、axios
     * 优化依赖预构建，加快页面加载速度，避免重复打包依赖
     */
    optimizeDeps: {
      include: ['pinia', 'lodash-es', 'axios', 'dayjs', 'element-plus'],
      exclude: ['@element-plus/icons-vue', '@vant/use'],
    },
  }
})
