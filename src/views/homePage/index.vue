<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import AppList from './components/appList.vue'
import { getNewhotApp, API_CONFIG } from '@/api'
import { t } from '@/locales/index'
import AES from '@/utils/aes.js'

const hotApp = ref<any[]>([])

const recentApp = ref<any[]>([])

onMounted(() => {
  // scrollToBottom();
  getNewhotApp('appdownnum').then(res => {
    var result = JSON.parse(AES.AES.decrypt(res, API_CONFIG.JmKey(), API_CONFIG.JmIv()))
    console.log(result)
    hotApp.value = result.data
  })
  getNewhotApp('apptime').then(res => {
    var result = JSON.parse(AES.AES.decrypt(res, API_CONFIG.JmKey(), API_CONFIG.JmIv()))
    console.log(result)
    recentApp.value = result.data
  })
})
</script>

<template>
  <NSpace vertical size="large" class="p-4">
    <NCarousel show-arrow autoplay>
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      />
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      />
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      />
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      />
    </NCarousel>
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <AppList title="热门软件" :infoList="hotApp" />
      </n-gi>
      <n-gi>
        <AppList title="最新发布" :infoList="recentApp" />
      </n-gi>
    </n-grid>
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
