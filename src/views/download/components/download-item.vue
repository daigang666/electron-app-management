<template>
  <div :key="item.id" class="download-item-container">
    <!-- 下载进度 -->
    <div
      v-show="item.state === 'progressing'"
      class="download-item-progress"
      :style="{ width: `${item.progress * 100}%` }"
    ></div>

    <div class="download-item-main">
      <!-- 下载项的图标 -->
      <div class="file-icon" @dblclick="onOpenFile(item.path)">
        <img :src="item.icon" />
      </div>
      <!-- 文件名、下载大小、速度 -->
      <div class="file-info">
        <n-tooltip>
          <template #trigger>
            <p class="file-name">{{ item.fileName }}</p>
          </template>
          {{ item.fileName }}
        </n-tooltip>
        <div class="file-desc">
          <template v-if="item.state === 'progressing'">
            <div class="file-size">
              {{ getFileSize(item.receivedBytes, false) }}/{{ getFileSize(item.totalBytes) }}
            </div>
            <span class="download-speed">{{ getFileSize(item.speed) }}/s</span>
          </template>
          <template v-if="item.state === 'completed'">
            <p>{{ getFileSize(item.totalBytes) }}</p>
          </template>
        </div>
      </div>
      <!-- 操作 -->
      <div class="operating">
        <template v-if="item.state === 'progressing'">
          <icon-button
            :title="item.paused ? '恢复' : '暂停'"
            className="operating-item"
            @click="() => onPauseOrResume(item)"
          >
            <n-icon size="30">
              <CaretForward v-if="item.paused" />
              <PauseOutline v-else />
            </n-icon>
          </icon-button>
        </template>

        <template v-if="item.state === 'completed'">
          <icon-button
            title="打开所在位置"
            className="operating-item"
            @click="() => onOpenFolder(item.path)"
          >
            <n-icon size="30">
              <FolderOutline />
            </n-icon>
          </icon-button>
        </template>

        <icon-button
          :title="`${item.state === 'progressing' ? '取消并' : ''}移除下载`"
          className="operating-item"
          @click="() => onCancel(item, index)"
        >
          <n-icon size="30">
            <CloseOutline />
          </n-icon>
        </icon-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import IconButton from './IconButton.vue'
import { PauseOutline, FolderOutline, CaretForward, CloseOutline } from '@vicons/ionicons5'

import './style.less'

export default {
  name: 'DownloadItem',
  components: {
    IconButton,
    CaretForward,
    PauseOutline,
    FolderOutline,
    CloseOutline
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: ['open-file', 'pause-resume', 'open-folder', 'remove'],
  setup(props, { emit }) {
    const getFileSize = (bytes, isUnit = true) => {
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB']

      if (bytes === 0) {
        return isUnit ? '0B' : '0'
      }

      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      if (i === 0) {
        return bytes + (isUnit ? sizes[i] : '')
      }
      return (bytes / 1024 ** i).toFixed(2) + (isUnit ? sizes[i] : '')
    }
    const onOpenFile = path => {
      emit('open-file', path)
    }
    const onPauseOrResume = item => {
      emit('pause-resume', item)
    }
    const onOpenFolder = path => {
      emit('open-folder', path)
    }
    const onCancel = (item, index) => {
      emit('remove', item, index)
    }
    return {
      getFileSize,
      onOpenFile,
      onPauseOrResume,
      onOpenFolder,
      onCancel
    }
  }
}
</script>

<style scoped>
/* 根据需要添加组件样式 */
</style>
