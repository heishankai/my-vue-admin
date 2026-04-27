// Button.tsx
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppButton',
  props: {
    label: String,
    isActive: Boolean,
  },
  setup(props) {
    const handleClick = () => console.log('clicked')

    // 直接在 render 函数中利用 JS 能力
    return () => (
      <button class={['btn', { active: props.isActive }]} onClick={handleClick}>
        {props.label}
      </button>
    )
  },
})
