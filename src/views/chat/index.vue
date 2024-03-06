<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NCarousel, useDialog, NList, NLayoutContent, NListItem, NThing, NRate } from 'naive-ui';
import Sider from './layout/sider/index.vue';
import Header from './layout/header/index.vue';
import { Message } from './components';
import { useScroll } from './hooks/useScroll';
import { useChat } from './hooks/useChat';
import { useCopyCode } from './hooks/useCopyCode';
import { useUsingContext } from './hooks/useUsingContext';
import { HoverButton, SvgIcon } from '@/components/common';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { useChatStore } from '@/store';
import { getNewhotApp } from '@/api';
import { t } from '@/locales/index';
import AES from '@/utils/aes.js'

const API = {

    //解密KEY
    JmKey:function(){
        return '1212121212121212'
    }, 
    //解密KEY
    JmIv:function(){
        return '3434343434343434'
    },
}
let controller = new AbortController();

const route = useRoute();
const dialog = useDialog();

const chatStore = useChatStore();

useCopyCode();
const { isMobile } = useBasicLayout();
const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } = useChat();
const { scrollRef, scrollToBottom } = useScroll();
const { usingContext, toggleUsingContext } = useUsingContext();

const { uuid } = route.params as { uuid: string };
console.log(route, route.params);

const hotApp = ref<any[]>([]);

function handleDelete(index: number) {
  if (loading.value) return;

  dialog.warning({
    title: t('chat.deleteMessage'),
    content: t('chat.deleteMessageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.deleteChatByUuid(+uuid, index);
    },
  });
}

function handleClear() {
  if (loading.value) return;

  dialog.warning({
    title: t('chat.clearChat'),
    content: t('chat.clearChatConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.clearChatByUuid(+uuid);
    },
  });
}

function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
}

function handleStop() {
  if (loading.value) {
    controller.abort();
    loading.value = false;
  }
}

const placeholder = computed(() => {
  if (isMobile.value) return t('chat.placeholderMobile');
  return t('chat.placeholder');
});

const wrapClass = computed(() => {
  if (isMobile.value) return ['pt-14'];
  return [];
});

const footerClass = computed(() => {
  let classes = ['p-4'];
  if (isMobile.value)
    classes = ['sticky', 'left-0', 'bottom-0', 'right-0', 'p-2', 'pr-4', 'overflow-hidden'];
  return classes;
});

onMounted(() => {
  scrollToBottom();
  getNewhotApp('appdownnum').then((res) => {
    var result = JSON.parse(AES.AES.decrypt(res, API.JmKey(), API.JmIv()));
    console.log(result);
    hotApp.value = result.data;
  });
});

</script>

<template>
  <NSpace vertical size="large" class="p-4">
    <NCarousel show-arrow>
    <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg" />
    <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg" />
    <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg" />
    <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg" />
  </NCarousel>
  <NList  hoverable clickable>
    <template #header>
      <div class="flex items-center justify-between">
        <span>热门软件</span>
        <n-button quaternary type="info">
          查看更多
        </n-button>
      </div>
    </template>
    <NListItem v-for="item in hotApp">
      <template #prefix>
        <div  style="display: block;border-radius: 12px;width: 58px;height: 58px;">
          <img :src="item.appicon" style="width: 100%;height: 100%;">
        </div>
      </template>
      <template #suffix>
        <NButton type="info">下载</NButton>
      </template>
      <NThing :title="item.appname" >
        <div class="newnum">
          <div>
            <NRate v-if="item.appmod==0" :value="1" :count="1" readonly color="#2469f6"></NRate>
            <NRate v-else-if="item.appmod==1" :value="1" :count="1" readonly color="#1a9f35"></NRate>
          </div>
          <span  v-if="item.appmod==0"  style="color:#2469f6">{{ item.appstar }}</span>
          <span  v-if="item.appmod==1"  style="color:#1a9f35">{{ item.appstar }}</span>
          <span style="color:#6c6c6c;margin-left: 10px;">{{ item.appbb }}</span>
        </div>
        <div class="newnum">				                
          <text class="nomod" v-if="item.appmod==0">原版</text>
          <text class="mod" v-else-if="item.appmod==1">MOD</text>   
          <span>
            {{item.appdata+'MB  · '+item.appdownnum+'次下载'}}
          </span>
        </div>		
      </NThing>
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