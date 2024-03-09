<template>
  <div class="py-6">
    <div class="max-w-screen-lg space-y-4">
      <n-card title="套餐介绍">
        <div class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="item in packageList" :key="item.title">
            <n-card :title="item.title">
              <div class="py-4 space-y-4">
                <h2 class="text-xl font-bold">🤖{{ item.title }}</h2>
                <div class="text-base text-slate-500">
                  价格：
                  <n-tag type="info">{{ item.price }} 元 </n-tag>
                </div>
                <!-- <div>🤖Token*50万 ≈25万个字</div> -->
                <div>
                  <n-button type="primary" @click="() => handleOpenBuy(item)"> 立即购买 </n-button>
                </div>
              </div>
            </n-card>
          </div>
        </div>
      </n-card>
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    style="width: 600px"
    preset="card"
    :on-after-leave="handleModalClose"
  >
    <main>
      <header>
        <ul class="space-y-3">
          <li class="flex items-center">
            <span>需要支付：</span>
            <span class="dark:[#86dfba] flex-1 text-2xl font-bold text-[#4b9e5f]">
              ¥{{ buyProduct?.price }}</span
            >
          </li>
          <li class="flex">
            <span>确认订单：</span>
            <span class="flex-1 text-ellipsis-2">🤖{{ buyProduct?.title }}</span>
          </li>
          <li class="flex">
            <span>套餐详情：</span>
            <span class="flex-1 text-ellipsis-3">🤖{{ buyProduct?.title }}</span>
          </li>
        </ul>
      </header>
      <div class="my-6">
        <!-- <n-spin :show="payLoading"> -->
        <div v-show="!isWaitingPayDone" class="text-center">
          <n-radio-group v-model:value="payWay" name="radiogroup">
            <n-space>
              <n-radio value="wxpay">
                <NIcon>
                  <LogoWechat />
                </NIcon>
                {{ t('weixin') }}
              </n-radio>
              <n-radio value="alipay">
                <NIcon>
                  <LogoAlipay />
                </NIcon>
                {{ t('alipay') }}
              </n-radio>
            </n-space>
          </n-radio-group>
          <div class="mt-4 text-center">
            <n-button type="primary" :loading="payLoading" @click="handleBuy">立即支付 </n-button>
          </div>
        </div>
        <!-- </n-spin> -->
        <div v-show="isWaitingPayDone" class="mt-6">
          <div
            v-show="isQRCodePay"
            class="m-auto h-[200px] w-[200px] rounded-md border dark:border-slate-500"
          >
            <canvas ref="qrCodeRef" class="object-cover w-full h-full" alt="pay-code"> </canvas>
          </div>
          <div class="mt-4 text-center">
            <n-button type="primary" @click="handleCheckPay">已支付？点击查询支付状态 </n-button>
          </div>
        </div>
      </div>
    </main>
  </n-modal>
</template>

<script setup lang="ts">
import { NCard, NButton, NTag, NRadio, NRadioGroup, NModal, useMessage } from 'naive-ui'
import { payTest, getProduct, getPayStatus } from '@/api/product'
import { LogoWechat, LogoAlipay } from '@vicons/ionicons5'
import { ref, onMounted } from 'vue'
// import { useI18n } from 'vue-i18n';
// import QRCode from 'qrcode'
import { useUserStore } from '@/store'

interface Product {
  id: number
  title: string
  stype: number
  num: number
  price: string
  tokenLimit: number
  type: string
  createdAt: string
  updatedAt: string
}
// const { t } = useI18n();
const t = (str: string) => str
const message = useMessage()
const userStore = useUserStore()

const qrCodeRef = ref(null)
const showModal = ref(false)
const payWay = ref('wxpay')
const buyProduct = ref<Product>()
const payLoading = ref(false)
const packageList = ref<Product[]>([])
const isWaitingPayDone = ref<boolean>(false)
const isQRCodePay = ref<boolean>(false)
let orderId = ''

const handleModalClose = () => {
  isWaitingPayDone.value = false
}
const handleOpenBuy = (item: Product) => {
  buyProduct.value = item
  showModal.value = true
}
const handleBuy = () => {
  payLoading.value = true
  payTest({
    user_email: localStorage.getItem('userName'),
    product_id: buyProduct.value?.id,
    payment_type: payWay.value
  })
    .then(res => {
      console.log(res)
      // {
      // "payurl": "",
      // "qrcode": "https://qr.alipay.com/bax06886xsrma24srtuq30de",
      // "urlscheme": ""
      // }
      if (res.data.qrcode) {
        // 渲染二维码
        // QRCode.toCanvas(qrCodeRef.value, res.data.qrcode, {
        //   width: 200,
        //   height: 200
        // })
        isQRCodePay.value = true
      } else {
        window.open(res.data.payurl || res.data.urlscheme, '_blank')
      }
      orderId = res.data.trade_no
      isWaitingPayDone.value = true
    })
    .finally(() => {
      payLoading.value = false
    })
}
const handleCheckPay = () => {
  getPayStatus({
    user_email: localStorage.getItem('userName'),
    trade_no: orderId
  })
    .then(async res => {
      if (res.data.payment_status === 'paied') {
        message.success('订单支付成功！，将为您更新会员信息...')
        await userStore.getUserInfo()
        showModal.value = false
      } else if (res.data.payment_status === 'unpaied') {
        message.warning('订单未支付！')
      }
    })
    .catch(() => {
      message.error('支付出现异常！如若已成功支付，请联系管理员解决')
    })
}
onMounted(() => {
  console.log('mounted')
  getProduct({})
    .then(res => {
      console.log(res)
      packageList.value = res.data.productList
    })
    .catch(rej => {
      console.log(rej)
    })
})
</script>
