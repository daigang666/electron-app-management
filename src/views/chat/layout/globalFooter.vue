<script setup lang="ts">
import { NIcon } from 'naive-ui';
import {
  ColorPaletteOutline,
  FileTrayOutline,
  PersonCircleOutline,
  SettingsOutline,
} from '@vicons/ionicons5';
import { MessageOutlined } from '@vicons/antd';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const menuList = [
  {
    url: 'Chat',
    icon: MessageOutlined,
    tips: 'AI聊天',
  },
  {
    url: 'drawer',
    icon: ColorPaletteOutline,
    tips: 'AI绘画',
  },
  {
    url: 'workbench',
    icon: FileTrayOutline,
    tips: '工作台',
  },
  {
    url: 'user',
    icon: PersonCircleOutline,
    tips: '个人中心',
  },
  {
    url: 'setting',
    icon: SettingsOutline,
    tips: '设置',
  },
];
</script>

<template>
  <footer class="bg-white dark:bg-[#25272c]">
    <div class="grid border-t py-2 dark:border-t-neutral-800 grid-cols-5">
      <a
        v-for="item in menuList"
        :key="item.url"
        :class="`cursor-pointer text-center leading-4 ${
          route.name == item.url ? 'text-[#4b9e5f] dark:text-[#86dfba]' : 'text-slate-500'
        } `"
        @click="() => router.push({ name: item.url })"
      >
        <span class="inline-block text-xl">
          <NIcon
            :class="`inline-block text-2xl dark:text-white `"
            :color="route.name == item.url ? '#4b9e5f' : ''"
          >
            <component :is="item.icon" />
          </NIcon>
        </span>
        <p>{{ item.tips }}</p>
      </a>
    </div>
  </footer>
</template>
