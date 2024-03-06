<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { NIcon, NLayoutSider, NTooltip } from 'naive-ui'
import { ColorPaletteOutline, GitMergeOutline, SettingsOutline } from '@vicons/ionicons5'
import { MessageOutlined } from '@vicons/antd'
import avatar from '@/assets/avatar.jpg'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useChatStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const { isMobile } = useBasicLayout()

const chatStore = useChatStore()
const menuList = [
  {
    url: 'homePage',
    icon: MessageOutlined,
    tips: '聊天'
  },
  {
    url: 'drawer',
    icon: ColorPaletteOutline,
    tips: '绘画'
  },
  {
    url: 'mind-map',
    icon: GitMergeOutline,
    tips: '思维导图'
  }
]

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)'
    }
  }
  return {}
})

const handleJump = (routerName: string) => {
  router.push({ name: routerName })
}
</script>

<template>
  <NLayoutSider :width="72" collapse-mode="transform" bordered :style="getMobileClass">
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0"></main>
      <div
        class="flex h-full flex-col items-center justify-between bg-[#e8eaf1] px-2 py-4 dark:bg-[#25272d]"
      >
        <div class="flex flex-col space-y-4">
          <a
            v-for="item in menuList"
            :key="item.url"
            class="h-12 w-12 cursor-pointer rounded-xl bg-white duration-300 dark:bg-[#34373c]"
            @click="() => handleJump(item.url)"
          >
            <div class="flex h-full">
              <div class="m-auto text-center">
                <NTooltip trigger="hover" placement="right">
                  <template #trigger>
                    <NIcon
                      :class="`inline-block text-2xl dark:text-white `"
                      :color="route.name == item.url ? '#4b9e5f' : ''"
                    >
                      <component :is="item.icon" />
                    </NIcon>
                  </template>
                  {{ item.tips }}
                </NTooltip>
              </div>
            </div>
          </a>
        </div>
        <div class="flex select-none flex-col items-center space-y-4">
          <NBadge>
            <NAvatar
              class="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-200 shadow-md hover:border-white dark:border-slate-700"
              round
              :src="avatar"
              @click="() => router.push({ name: 'user' })"
            />
          </NBadge>
          <a
            class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-white dark:hover:bg-[#33373c]"
            @click="() => handleJump('setting')"
          >
            <NIcon class="text-2xl">
              <SettingsOutline />
            </NIcon>
          </a>
        </div>
      </div>
    </div>
  </NLayoutSider>
</template>
