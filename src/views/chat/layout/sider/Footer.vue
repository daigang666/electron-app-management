<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { getProduct } from '@/api/product';
import { reactive, watchEffect, onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const modelValue = ref('gpt-3.5-turbo-0613');
const isShowPayModal = ref(false);
const payList = reactive({
  pdtid: '3',
  paytype: 'alipay',
});
const productList = ref(<any>[]);
let used: any = userStore.$state.userInfo.quota4 * 100;

if (used > 100) {
  used = 100;
}

watchEffect(() => {
  localStorage.setItem('model', modelValue.value);
});

const quota = ref(parseInt(used));
const options = [
  {
    label: 'GPT-4-0613',
    value: 'gpt-4-0613',
  },
  {
    label: 'GPT-3.5-0613',
    value: 'gpt-3.5-turbo-0613',
  },
  {
    label: '记账',
    value: 'bill',
  },
  {
    label: '文心一言',
    value: 'wenxin',
    disabled: true,
  },
  {
    label: '巴德',
    value: 'bard',
    disabled: true,
  },
];

onMounted(async () => {
  // 获取充值产品数据
  try {
    await getProduct({});
  } catch (e: any) {
    if (e?.status == 0) {
      productList.value = e?.data.productList;
    }
  }

  // products = await
});

// setInterval(async() => {
//   let data: any = Object.create(null);
//   data = await userStore.protect(userStore.$state.userInfo);
//   if(data?.data?.use) {
//     digit.value = data?.data.use;
//   }
// }, 3000);

// const handleGetUse = async (e: { preventDefault: () => void; }) => {
//   e.preventDefault();
//   // userStore.protect();
//   let data: any = Object.create(null);
//   data = await userStore.protect(userStore.$state.userInfo);
//   if(data?.data?.use) {
//     digit.value = data?.data.use;
//   }
// }

const gotoPay = async (e: { preventDefault: () => void }) => {
  e.preventDefault();
  window.location.href = `http://www.ai-services.club/pay.php?username=${userStore.$state.userInfo.name}&pdtid=${payList.pdtid}&paytype=${payList.paytype}`;
};
</script>

<template>
  <footer
    class="flex justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800"
    style="flex-direction: column"
  >
    <div style="display: flex; justify-content: center; align-items: center">
      <div style="width: 50px; vertical-align: bottom">模型:</div
      ><NSelect v-model:value="modelValue" size="small" :options="options" />
    </div>
    <div style="margin-top: 10px">
      <NProgress type="line" :percentage="quota" :indicator-placement="'inside'" processing />
    </div>
  </footer>
  <footer
    class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800"
  >
    <div style="display: flex; flex-direction: column">
      <div>权限到期时间:{{ userStore.$state.userInfo.vipdate || '暂无' }}</div>
      <div>{{ userStore.$state.userInfo.name || '游客' }}</div>
    </div>
    <NButton
      type="primary"
      size="small"
      @click="() => router.push({ path: 'user', query: { tab: 'plan' } })"
      >充值</NButton
    >
  </footer>
  <NModal v-model:show="isShowPayModal">
    <NCard
      style="width: 600px"
      title="支付表单"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <NForm :model="payList">
        <NFormItem label="开通类型" path="pdtid">
          <NRadioGroup v-model:value="payList.pdtid">
            <template v-for="item in productList">
              <NRadio :label="`${item.title}/${item.price}¥`" :value="item.id" />
            </template>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="支付方式" path="paytype">
          <NRadioGroup v-model:value="payList.paytype">
            <NRadio label="支付宝" value="alipay" />
          </NRadioGroup>
        </NFormItem>
        <NGrid :cols="12">
          <NGridItem :offset="9">
            <NButton size="large" type="info" @click="() => (isShowPayModal = false)">
              取消
            </NButton>
          </NGridItem>
          <NGridItem :offset="1">
            <NButton size="large" type="primary" @click="gotoPay"> 提交 </NButton>
          </NGridItem>
        </NGrid>
      </NForm>
    </NCard>
  </NModal>
</template>

<style>
.nb-button {
  margin: 10px;
}
</style>
