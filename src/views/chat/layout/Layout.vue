<script setup lang="ts">
// import { computed } from 'vue';
import { NLayout, NLayoutContent } from 'naive-ui'
import GlobalSider from './globalSider.vue'
import { AlbumsOutline } from '@vicons/ionicons5'
// import GlobalFooter from './globalFooter.vue';
// import { useBasicLayout } from '@/hooks/useBasicLayout';

// const appStore = useAppStore();

// const { isMobile } = useBasicLayout();

// const getMobileClass = computed(() => {
//   if (isMobile.value) return ['rounded-none', 'shadow-none'];
//   return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800'];
// });

// const getContainerClass = computed(() => {
//   return [
//     'h-full',
//     // { 'pl-[260px]': !isMobile.value && !collapsed.value },
//   ];
// });
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
          <AlbumsOutline class="fixed left-0 top-0" />
        </NLayoutContent>
      </NLayout>
      <!-- <GlobalFooter v-if="isMobile" /> -->
    </div>
  </div>
</template>
