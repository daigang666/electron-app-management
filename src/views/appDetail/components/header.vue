<script lang="ts" setup>
import { computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowBack } from '@vicons/ionicons5'
import { SvgIcon } from '@/components/common'
import { useAppStore, useChatStore } from '@/store'

const props = defineProps<{
  title: string
}>()
const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()

const collapsed = computed(() => appStore.siderCollapsed)
const currentChatHistory = computed(() => chatStore.getChatHistoryByCurrentActive)

function handleUpdateCollapsed() {
  router.push({ path: '/homePage' })
}

function onScrollToTop() {
  const scrollRef = document.querySelector('#scrollRef')
  if (scrollRef) nextTick(() => (scrollRef.scrollTop = 0))
}

function onScrollToBottom() {
  const scrollRef = document.querySelector('#scrollRef')
  if (scrollRef) nextTick(() => (scrollRef.scrollTop = scrollRef.scrollHeight))
}
</script>

<template>
  <header
    class="top-0 left-0 right-0 z-30 border-b dark:border-neutral-800 bg-white/80 dark:bg-black/20 backdrop-blur absolute"
  >
    <div class="relative flex items-center justify-between h-14">
      <button class="flex items-center justify-center w-9 h-9 pl-2">
        <ArrowBack @click="handleUpdateCollapsed" />
      </button>
      <h1
        class="flex-1 px-4 overflow-hidden text-center cursor-pointer select-none text-ellipsis whitespace-nowrap"
        @dblclick="onScrollToTop"
      >
        {{ props.title ?? '' }}
      </h1>
    </div>
  </header>
</template>
