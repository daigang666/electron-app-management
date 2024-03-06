<script setup lang="ts">
import { NSpace, NList, NListItem, NThing, NRate } from 'naive-ui'
import { useRouter } from 'vue-router'
import { newDownloadFile, listenerDownloadItemDone } from '@/ipc/ipc-renderer'

const props = defineProps<{
  title: string
  infoList: any[]
}>()
const router = useRouter()

const handleJump = (item: any) => {
  router.push({
    path: '/appDetail/' + item.id
  })
}
const handleDownload = info => {
  console.log('下载 ')
  newDownloadFile({
    url: info.appdownurl,
    fileName: info.appname,
    path: '/Users/daigang/Downloads/i4ToolsDownloads'
  })
}
listenerDownloadItemDone((event, item: IDownloadFile) => {
  console.log(event, item)
})
</script>

<template>
  <NSpace vertical size="large" class="p-4">
    <NList hoverable clickable>
      <template #header>
        <div class="flex items-center justify-between">
          <span>{{ props.title }}</span>
          <n-button quaternary type="info"> 查看更多 </n-button>
        </div>
      </template>
      <NListItem v-for="item in infoList">
        <template #prefix>
          <div style="display: block; border-radius: 12px; width: 58px; height: 58px">
            <img :src="item.appicon" style="width: 100%; height: 100%" />
          </div>
        </template>
        <template #suffix>
          <NButton type="info" @click="handleDownload(item)">下载</NButton>
        </template>
        <NThing :title="item.appname" @click="handleJump(item)">
          <div class="newnum">
            <div>
              <NRate v-if="item.appmod == 0" :value="1" :count="1" readonly color="#2469f6"></NRate>
              <NRate
                v-else-if="item.appmod == 1"
                :value="1"
                :count="1"
                readonly
                color="#1a9f35"
              ></NRate>
            </div>
            <span v-if="item.appmod == 0" style="color: #2469f6">{{ item.appstar }}</span>
            <span v-if="item.appmod == 1" style="color: #1a9f35">{{ item.appstar }}</span>
            <span style="color: #6c6c6c; margin-left: 10px">{{ item.appbb }}</span>
          </div>
          <div class="newnum">
            <text class="nomod" v-if="item.appmod == 0">原版</text>
            <text class="mod" v-else-if="item.appmod == 1">MOD</text>
            <span>
              {{ item.appdata + 'MB  · ' + item.appdownnum + '次下载' }}
            </span>
          </div>
        </NThing>
      </NListItem>
    </NList>
  </NSpace>
</template>

<style scoped>
.newnum {
  display: flex;
  align-items: center;
  flex: 1;
}
.nomod {
  padding: 4px 10px;
  margin-right: 16px;
  border-radius: 6px;
  background-color: #2469f6;
  font-size: 9px;
  color: #fff;
}
.mod {
  padding: 4px 10px;
  margin-right: 16px;
  border-radius: 6px;
  background-color: #1a9f35;
  font-size: 9px;
  color: #fff;
}
</style>
