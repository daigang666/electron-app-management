<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NTabPane, NTabs } from 'naive-ui';
import General from './General.vue';
import { SvgIcon } from '@/components/common';

const active = ref('General');

const reload = ref(false);

function handleReload() {
  reload.value = true;
  setTimeout(() => {
    reload.value = false;
  }, 0);
}
</script>

<template>
  <NCard role="dialog" aria-modal="true" :bordered="false" style="width: 100%; height: 100%">
    <NTabs v-model:value="active" style="width: 100%; max-width: 640px" type="line" animated>
      <NTabPane name="General" tab="General">
        <template #tab>
          <SvgIcon class="text-lg" icon="ri:file-user-line" />
          <span class="ml-2">{{ $t('setting.general') }}</span>
        </template>
        <div class="min-h-[100px]">
          <General v-if="!reload" @update="handleReload" />
        </div>
      </NTabPane>
      <!-- <NTabPane name="Config" tab="Config">
        <template #tab>
          <SvgIcon class="text-lg" icon="ri:list-settings-line" />
          <span class="ml-2">{{ $t('setting.config') }}</span>
        </template>
        <About />
      </NTabPane> -->
    </NTabs>
  </NCard>
</template>
