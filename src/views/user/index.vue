<template>
  <div class="min-h-full p-8">
    <header class="mb-4">
      <h2 class="mb-2 text-2xl font-bold text-black dark:text-white">个人中心</h2>
    </header>
    <main>
      <NAlert type="warning">
        您应积极履行信息安全义务。遵守相关法律法规，遵守自愿、平等、
        公平及诚实信用原则，不利用本服务侵犯他人合法权益及谋取不正当利益，不扰乱互联网平台正常秩序，维护清朗网络环境。
      </NAlert>
      <NTabs
        v-model:value="activeTab"
        style="width: 100%"
        type="line"
        animated
        @update:value="handleTabChange"
      >
        <NTabPane name="Overview" tab="总览" disabled>
          <template #tab>
            <NIcon>
              <PersonOutline />
            </NIcon>
            <span class="ml-2">{{ t('userInfo.overView') }}</span>
          </template>
          <div class="min-h-[100px]">
            <overview />
          </div>
        </NTabPane>
        <NTabPane name="account" tab="账户" disabled>
          <template #tab>
            <NIcon> <SettingsOutline /> </NIcon>
            <span class="ml-2">{{ t('userInfo.account') }}</span>
          </template>
          <account />
        </NTabPane>
        <NTabPane name="plan" tab="套餐">
          <template #tab>
            <NIcon> <SettingsOutline /> </NIcon>
            <span class="ml-2">{{ t('userInfo.plan') }}</span>
          </template>
          <plan />
        </NTabPane>
        <NTabPane name="invite" tab="邀请码" disabled>
          <template #tab>
            <NIcon> <SettingsOutline /> </NIcon>
            <span class="ml-2">{{ t('userInfo.inviteCode') }}</span>
          </template>
          <invite />
        </NTabPane>
      </NTabs>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NAlert, NIcon } from 'naive-ui'
import { PersonOutline, SettingsOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import account from './panels/account.vue'
import invite from './panels/invite.vue'
import overview from './panels/overview.vue'
import plan from './panels/plan.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { t } = useI18n()
const activeTab = ref<string>((route.query.tab as string) ?? 'plan')
const handleTabChange = (val: string) => {
  router.push({ path: route.path, query: { tab: val } })
}
</script>
