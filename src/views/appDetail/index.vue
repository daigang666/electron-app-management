<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  NSpace,
  NCarousel,
  useDialog,
  NList,
  NLayoutContent,
  NListItem,
  NThing,
  NRate
} from 'naive-ui'
import Header from './components/header.vue'
import { getAppinfo, API_CONFIG } from '@/api'
import { t } from '@/locales/index'
import AES from '@/utils/aes.js'

const route = useRoute()
const { id } = route.params as { id: string }
console.log(route, route.params)
const appInfo = ref({})

const imgList = ref<any[]>([])

onMounted(() => {
  // // scrollToBottom();
  getAppinfo(id).then(res => {
    var result = JSON.parse(AES.AES.decrypt(res, API_CONFIG.JmKey(), API_CONFIG.JmIv()))
    console.log(result)
    appInfo.value = result.data
    imgList.value = result.data.appsce.split(',')
  })
  // getAppinfo('apptime').then(res => {
  //   var result = JSON.parse(AES.AES.decrypt(res, API_CONFIG.JmKey(), API_CONFIG.JmIv()))
  //   console.log(result)
  //   recentApp.value = result.data
  // })
})
</script>

<template>
  <Header />
  <NSpace vertical size="large" class="p-4 mt-14">
    <NList>
      <NListItem>
        <template #prefix>
          <div class="block w-32 h-32 p-5 rounded-xl">
            <img :src="appInfo.appicon" style="width: 100%; height: 100%" />
          </div>
        </template>
        <template #suffix>
          <NButton type="info">下载</NButton>
        </template>
        <NThing :title="appInfo.appname">
          <div class="newnum">
            <span style="color: #6c6c6c">版本：{{ appInfo.appbb }}</span>
            <text class="nomod" v-if="appInfo.appmod == 0">原版</text>
            <text class="mod" v-else-if="appInfo.appmod == 1">MOD</text>
          </div>
          <div class="newnum">
            <span> 大小：{{ appInfo.appdata + 'MB' }} </span>
          </div>
          <div class="newnum">
            <span> 下载次数：{{ appInfo.appdownnum + '次下载' }} </span>
          </div>
        </NThing>
      </NListItem>
      <NListItem>
        <n-card>
          <n-tabs type="line" animated>
            <n-tab-pane name="介绍" tab="介绍">
              <NCarousel autoplay show-arrow>
                <img v-for="item in imgList" class="carousel-img" :src="item" />
              </NCarousel>
              <p class="p-4 whitespace-break-spaces">
                {{ appInfo.appmsg }}
              </p>
            </n-tab-pane>
            <n-tab-pane name="评论" tab="评论"> </n-tab-pane>
            <n-tab-pane name="推荐" tab="推荐"> </n-tab-pane>
          </n-tabs>
        </n-card>
      </NListItem>
    </NList>
  </NSpace>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.newnum {
  display: flex;
  align-items: center;
  flex: 1;
}
.nomod {
  padding: 4px 10px;
  margin-left: 16px;
  border-radius: 6px;
  background-color: #2469f6;
  font-size: 9px;
  color: #fff;
}
.mod {
  padding: 4px 10px;
  margin-left: 16px;
  border-radius: 6px;
  background-color: #1a9f35;
  font-size: 9px;
  color: #fff;
}
</style>
