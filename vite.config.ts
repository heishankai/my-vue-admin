import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入这两个插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// 引入 Element Plus 的解析器
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // --- 1. 根据模式动态生成 Server 配置 (包含代理) ---
  const serverConfig = (() => {
    // 基础配置：所有环境都开放 host，方便局域网访问
    const baseConfig = {
      host: '0.0.0.0',
      port: 5173,
      open: false, // 启动时不自动打开浏览器
    }

    // 开发环境和测试环境需要代理
    if (mode === 'development' || mode === 'test') {
      return {
        ...baseConfig,
        proxy: {
          '/api': {
            target: 'http://localhost:3000', // 👈 你的本地后端地址
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
    plugins: [
      vue(),
      // 自动导入 Vue API (ref, computed, onMounted 等)
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
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
      outDir: 'dist', // 打包输出目录
      sourcemap: false, // 生产环境关闭 source map
      emptyOutDir: true, // 打包前清空 dist 目录
      chunkSizeWarningLimit: 1500, // 增大警告阈值
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
