<script setup lang="ts">
import { NLayout, NLayoutContent, NDrawer, NDrawerContent } from 'naive-ui'
import GlobalSider from './globalSider.vue'
import { DownloadOutline } from '@vicons/ionicons5'
import DownloadList from '@/views/download/index.vue'
import { ref } from 'vue'
import { openDownloadManager } from '@/ipc/ipc-renderer'

const downloadVisible = ref(false)
const handleOpen = () => {
  downloadVisible.value = true
  openDownloadManager()
}
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all p-4">
    <div
      class="flex h-full flex-col overflow-hidden border rounded-md shadow-md dark:border-neutral-800"
    >
      <NLayout class="z-40 transition h-full" has-sider>
        <GlobalSider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
          <DownloadOutline class="fixed right-4 top-4 w-5 h-5" @click="handleOpen" />
          <NDrawer v-model:show="downloadVisible" :width="502">
            <NDrawerContent title="下载列表" closable>
              <DownloadList />
            </NDrawerContent>
          </NDrawer>
        </NLayoutContent>
      </NLayout>
      <!-- <GlobalFooter v-if="isMobile" /> -->
    </div>
  </div>
</template>
