<template>
  <n-tooltip>
    <template #trigger>
      <n-button :class="className" @click="onClick" text style="font-size: 24px">
        <slot></slot>
      </n-button>
      <!-- <a :class="className" @click="onClick">
      </a> -->
    </template>
    {{ title }}
  </n-tooltip>
</template>

<script>
import { defineComponent } from 'vue'
import { NTooltip, NButton } from 'naive-ui'

export default defineComponent({
  name: 'IconButton',
  components: {
    NTooltip,
    NButton
  },
  props: {
    className: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    onClick: Function
  }
})
</script>

<style scoped>
/* 根据需要添加组件样式 */
</style>
