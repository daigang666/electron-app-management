<template>
  <NLayout class="h-full">
    <NInput
      style="width: 100%"
      v-model:value="textValue"
      type="textarea"
      :autosize="{
        minRows: 3,
        maxRows: 5,
      }"
      placeholder="提示词输入/自动转英文"
    />

    <NButton
      style="width: 100%; margin-top: 10px"
      @click="handleClick"
      :loading="buttonLoading"
      :disabled="buttonLoading"
    >
      提交任务
    </NButton>

    <!-- 我的绘画 -->
    <NCard title="Midjourney" style="margin-bottom: 16px">
      <NTabs type="line" animated>
        <NTabPane name="one" tab="我的绘画">
          <NCard
            style="margin-top: 5px"
            v-for="(item, index) of drawList"
            :key="index"
            :title="item?.prompt"
          >
            <template #cover>
              <n-image lazy :src="item?.imageUrl" />
              <n-button
                type="primary"
                size="small"
                style="margin-top: 10px"
                @click="handleDownImg(item)"
              >
                <NIcon class="text-2xl"> <ArrowDownCircleOutline /> </NIcon>下载原图
              </n-button>
            </template>
            {{ '绘画进度:' + item?.progress }}
            {{ '绘画状态:' + item?.status }}
            {{ '失败原因:' + item?.failReason || '无' }}
          </NCard>
        </NTabPane>
      </NTabs>
    </NCard>
  </NLayout>
</template>

<script setup lang="ts">
import { getImaginList, submitImaginTask } from '@/api/draw';
import { NLayout, useMessage, NImage, NButton, NIcon } from 'naive-ui';
import { ArrowDownCircleOutline } from '@vicons/ionicons5';
import { onMounted, onUnmounted, ref } from 'vue';

const textValue = ref('');
const buttonLoading = ref(false);
const message = useMessage();
const drawList = ref([]);

let timer: any = null;
onMounted(async () => {
  getDrawList();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
});

const startPolling = () => {
  timer = setInterval(() => {
    getDrawList();
  }, 10000);
};

const stopPolling = () => {
  clearTimeout(timer);
};

const handleDownImg = (item) => {
  fetch(item.imageUrl)
    .then((response) => {
      console.log(response);
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};
// 提交图片任务
async function handleClick() {
  buttonLoading.value = true;
  try {
    let resData = await submitImaginTask({ prompt: textValue.value });
    if (resData?.status == 0) {
      message.success(resData?.msg);
      startPolling();
    } else {
      message.warning(resData?.msg);
    }
    buttonLoading.value = false;
  } catch (e: any) {
    buttonLoading.value = false;
  }
}
// 获取绘图信息
async function getDrawList() {
  try {
    let resData = await getImaginList();
    if (resData?.status == 0) {
      let drawData = resData?.data.map((item: any) => {
        return {
          ...item,
          imageUrl:
            item.status == 'SUCCESS'
              ? item.imageUrl.replace(
                  'https://cdn.discordapp.com',
                  'https://www.teamaiservices.com/images',
                )
              : item.imageUrl,
        };
      });
      console.log(drawData);
      if (drawData.every((item: any) => item.status !== 'IN_PROGRESS')) {
        stopPolling();
      }
      drawList.value = drawData.reverse();
      // buttonLoading.value  = false
      // message.success('获取绘图信息成功');
    } else {
      console.log(resData);
      message.success('获取绘图信息失败');
    }
  } catch (e: any) {
    console.log('error', e);
  }
}
</script>
