<template>
  <NLayout class="h-full">
    <button @click="() => unzipFile('')">解压文件</button>
    <!-- <download-manager-menu @create="handleOpenCreate" @clear="handleClearDone" /> -->
    <div class="main" @scroll="handleScroll">
      <download-item
        v-for="(item, index) in downloadItem"
        :key="item.id"
        :item="item"
        :index="index"
        @open-file="handleOpenFile"
        @pause-resume="handlePauseOrResume"
        @open-folder="handleOpenFolder"
        @remove="handleRemove"
      />
    </div>

    <!-- <create-modal v-model="show" /> -->
  </NLayout>
</template>

<script lang="ts">
import { NLayout } from 'naive-ui'
import { ref, reactive, onMounted, toRaw } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
// import CreateModal from './create.vue'
// import DownloadManagerMenu from './components/manager-menu.vue';
import DownloadItem from './components/download-item.vue'

import {
  clearDownloadDone,
  getDownloadData,
  listenerDownloadItemDone,
  listenerDownloadItemUpdate,
  listenerNewDownloadItem,
  openFile,
  openFileInFolder,
  unzipFile,
  pauseOrResume,
  removeDownloadItem
} from '@/ipc/ipc-renderer'

export default {
  components: {
    // CreateModal,
    // DownloadManagerMenu,
    DownloadItem
  },
  setup() {
    const show = ref(false)
    const downloadItem = ref([])

    const dialog = useDialog()
    const message = useMessage()
    const pageIndex = ref(1)
    const pageCount = ref(6)
    const hasMore = ref(true)

    const initData = async () => {
      const data = await getDownloadData({
        pageIndex: pageIndex.value,
        pageCount: pageCount.value
      })
      console.log(data)
      if (!data.length) {
        pageIndex.value -= 1
        hasMore.value = false
        return
      }

      downloadItem.value.push(...data)
      hasMore.value = true
    }

    const handleUpdateData = item => {
      const index = downloadItem.value.findIndex(d => d.id === item.id)
      if (index < 0) {
        downloadItem.value.unshift(item)
      } else {
        downloadItem.value[index] = item
      }
    }

    const handleScroll = event => {
      const { scrollHeight, clientHeight, scrollTop } = event.target

      if (scrollTop + clientHeight + 10 >= scrollHeight && hasMore.value) {
        pageIndex.value += 1
        initData()
      }
    }

    const handleOpenCreate = () => {
      show.value = true
    }

    const handleCloseCreate = () => {
      show.value = false
    }

    const handlePauseOrResume = async item => {
      const data = await pauseOrResume(toRaw(item))
      handleUpdateData(data)
    }

    const handleOpenFile = async path => {
      const res = await openFile(path)
      if (!res) {
        message.error('文件不存在')
      }
    }

    const handleOpenFolder = async path => {
      const res = await openFileInFolder(path)
      if (!res) {
        message.error('文件不存在')
      }
    }

    const handleRemove = (item, index) => {
      dialog.warning({
        title: '提示',
        content: `确定${item.state === 'progressing' ? '取消并' : ''}移除下载项吗？`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          removeDownloadItem(toRaw(item), index).finally(() => {
            downloadItem.value.splice(index, 1)
          })
        }
      })
    }

    const handleClearDone = () => {
      dialog.warning({
        title: '提示',
        content: '确定清空已完成的下载吗？',
        positiveText: '确定',
        negativeText: '取消',
        async onPositiveClick() {
          const data = await clearDownloadDone()
          downloadItem.value.splice(0, downloadItem.value.length, ...data)
        }
      })
    }

    onMounted(() => {
      listenerNewDownloadItem((event, item) => {
        handleCloseCreate()
        handleUpdateData(item)
      })

      listenerDownloadItemUpdate((event, item) => {
        handleUpdateData(item)
      })

      listenerDownloadItemDone((event, item) => {
        handleUpdateData(item)
      })

      initData()
    })

    return {
      show,
      downloadItem,
      hasMore,
      unzipFile,
      handleScroll,
      handleOpenCreate,
      handleCloseCreate,
      handlePauseOrResume,
      handleOpenFile,
      handleOpenFolder,
      handleRemove,
      handleClearDone
    }
  }
}
</script>
