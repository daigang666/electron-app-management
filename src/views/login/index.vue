<template>
  <div class="h-screen bg-[#e8eaf1] dark:bg-[#111114]">
    <div class="flex h-full">
      <div class="m-auto flex max-w-[840px] items-stretch overflow-hidden rounded-md bg-white dark:bg-[#18181c]">
        <div v-if="!isMobile" class="w-[420px] bg-[#f8f9fa] dark:bg-[#25272c]">
          <NCarousel autoplay dot-type="line">
            <div v-for="item in imgList" class="flex h-full">
              <div class="m-auto text-center dark:text-white">
                <img class="inline-block w-[260px]" :src="item.imgSrc" :alt="item.title" style="-webkit-user-drag: none;">
                <h1 class="mb-2 mt-2 text-xl font-bold">{{ item.title }}</h1>
                <p class="text-slate-500">{{ item.content }}</p>
              </div>
            </div>
          </NCarousel>
        </div>
        <div class="p-6 pb-0 w-[420px]">
          <header class="relative mb-6">
            <h1 class="mb-4 text-3xl font-bold dark:text-white">AI集成助手</h1>
            <div class="absolute top-0 right-0">
              <img class="w-8 h-8" :src="logo" alt="logo" style="-webkit-user-drag: none;">
            </div>
          </header>
          <n-alert type="warning">
            您应积极履行信息安全义务。遵守相关法律法规，遵守自愿、平等、 公平及诚实信用原则，不利用本服务侵犯他人合法权益及谋取不正当利益，不扰乱互联网平台正常秩序，维护清朗网络环境。
          </n-alert>
          <div class="view-account-form">
            <NTabs class="card-tabs" :value="pane1" @update:value="(value) => { pane1 = value }" size="large" animated
              style="width: 360px">
              <NTabPane name="signin" tab="登录">
                <NTabs class="card-tabs" :value="pane2" @update:value="(value) => { pane2 = value }" size="small" animated
                  style="width: 360px">
                  <NTabPane name="signinWithPWD" tab="密码登录">
                    <NForm ref="signinFormRef1" label-placement="left" size="large" :model="formInline1" :rules="rules1">
                      <NFormItem path="username">
                        <NInput v-model:value="formInline1.username" placeholder="请输入邮箱">
                          <template #prefix>
                            <NIcon size="18" color="#808695">
                              <PersonOutline />
                            </NIcon>
                          </template>
                        </NInput>
                      </NFormItem>
                      <NFormItem path="password">
                        <NInput v-model:value="formInline1.password" type="password" showPasswordOn="click"
                          placeholder="请输入密码">
                          <template #prefix>
                            <NIcon size="18" color="#808695">
                              <LockClosedOutline />
                            </NIcon>
                          </template>
                        </NInput>
                      </NFormItem>
                      <!-- <div style="margin-bottom: 15px; display: flex; justify-content: flex-end; align-items: center;">
                    <span style="cursor: pointer;" @click="showModifyModal = true">忘记密码?</span>
                  </div> -->
                      <NFormItem>
                        <NButton type="info" @click="handleSubmitWithPWD" size="large" :loading="loading" block>
                          登录
                        </NButton>
                      </NFormItem>
                    </NForm>
                  </NTabPane>
                  <NTabPane name="signinWithCaptcha" tab="验证码登录">
                    <NForm ref="signinFormRef2" label-placement="left" size="large" :model="formInline2" :rules="rules2">
                      <NFormItem path="username">
                        <NInput v-model:value="formInline2.username" placeholder="请输入邮箱">
                          <template #prefix>
                            <NIcon size="18" color="#808695">
                              <PersonOutline />
                            </NIcon>
                          </template>
                        </NInput>
                      </NFormItem>
                      <NFormItem path="password">
                        <NInput v-model:value="formInline2.password" type="password" showPasswordOn="click"
                          placeholder="请输验证码">
                          <template #prefix>
                            <NIcon size="18" color="#808695">
                              <LockClosedOutline />
                            </NIcon>
                          </template>
                        </NInput>
                        <NButton type="primary" :loading="sendLoading" :disabled="!!timeReflow" style="margin-left: 10px;"
                          @click="(e) => sendEmail(e, formInline2.username)">
                          {{ timeReflow ? `${timeReflow}秒后重试` : '发送验证码' }}
                        </NButton>
                      </NFormItem>
                      <NFormItem>
                        <NButton type="info" @click="handleSubmitWithCaptcha" size="large" :loading="loading" block>
                          登录
                        </NButton>
                      </NFormItem>
                    </NForm>
                  </NTabPane>
                </NTabs>
              </NTabPane>
              <NTabPane name="signup" tab="注册">
                <NForm ref="signupFormRef" label-placement="left" size="large" :model="formInline3" :rules="rules3">
                  <NFormItem path="username">
                    <NInput v-model:value="formInline3.username" placeholder="请输入邮箱">
                      <template #prefix>
                        <NIcon size="18" color="#808695">
                          <PersonOutline />
                        </NIcon>
                      </template>
                    </NInput>
                  </NFormItem>
                  <NFormItem path="captcha">
                    <NInput v-model:value="formInline3.captcha" placeholder="请输验证码">
                      <template #prefix>
                        <NIcon size="18" color="#808695">
                          <LockClosedOutline />
                        </NIcon>
                      </template>
                    </NInput>
                    <NButton type="primary" :loading="sendLoading" :disabled="!!timeReflow" style="margin-left: 10px;"
                      @click="(e) => sendEmail(e, formInline3.username)">
                      {{ timeReflow ? `${timeReflow}秒后重试` : '发送验证码' }}
                    </NButton>
                  </NFormItem>
                  <NFormItem path="password">
                    <NInput v-model:value="formInline3.password" type="password" showPasswordOn="click"
                      placeholder="请输入密码">
                      <template #prefix>
                        <NIcon size="18" color="#808695">
                          <LockClosedOutline />
                        </NIcon>
                      </template>
                    </NInput>
                  </NFormItem>
                  <NFormItem path="password2">
                    <NInput v-model:value="formInline3.password2" type="password" showPasswordOn="click"
                      placeholder="请重复密码">
                      <template #prefix>
                        <NIcon size="18" color="#808695">
                          <LockClosedOutline />
                        </NIcon>
                      </template>
                    </NInput>
                  </NFormItem>
                  <!-- <NFormItem path="inviteCode">
                <NGrid :cols="3">
                  <NGi>
                    <div
                      style="cursor: default; background: #f0f0f0; color: #888; font-size: 14px; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"
                    >
                      邀请码 (选填):
                    </div>
                  </NGi>
                  <NGi span="2">
                    <NInput
                      v-model:value="formInline3.inviteCode"
                      placeholder="请输入邀请码"
                    />
                  </NGi>
                </NGrid>
              </NFormItem> -->
                  <NFormItem>
                    <NButton type="info" @click="signup" size="large" :loading="loading" block>
                      注册
                    </NButton>
                  </NFormItem>
                </NForm>
              </NTabPane>
            </NTabs>
          </div>
        </div>
      </div>

    </div>
  </div>
  <NModal :show="showSuppModal">
    <NCard title="请补全您账号的登录密码" style="width: 420px">
      <p style="margin-bottom: 10px; color: #4096ff; size: 12px;">
        补全登录密码后，您可以使用密码进行登录，更加方便快捷
      </p>
      <NForm ref="suppFormRef" label-placement="left" size="large" :model="formInline4" :rules="rules4">
        <NFormItem path="password">
          <NInput v-model:value="formInline4.password" type="password" showPasswordOn="click" placeholder="请设置密码">
            <template #prefix>
              <NIcon size="18" color="#808695">
                <LockClosedOutline />
              </NIcon>
            </template>
          </NInput>
        </NFormItem>
        <NFormItem path="password">
          <NInput v-model:value="formInline4.password2" type="password" showPasswordOn="click" placeholder="请再次确认密码">
            <template #prefix>
              <NIcon size="18" color="#808695">
                <LockClosedOutline />
              </NIcon>
            </template>
          </NInput>
        </NFormItem>
        <NFormItem>
          <NButton type="info" @click="suppPWD" size="large" :loading="loading" block>
            提交
          </NButton>
        </NFormItem>
      </NForm>
    </NCard>
  </NModal>
  <NModal :show="showModifyModal">
    <NCard title="重置密码" style="width: 420px">
      <NForm ref="modifyFormRef" label-placement="left" size="large" :model="formInline5" :rules="rules5">
        <NFormItem path="username">
          <NInput v-model:value="formInline5.username" placeholder="请输入邮箱">
            <template #prefix>
              <NIcon size="18" color="#808695">
                <PersonOutline />
              </NIcon>
            </template>
          </NInput>
        </NFormItem>
        <NFormItem path="captcha">
          <NInput v-model:value="formInline5.captcha" placeholder="请输验证码">
            <template #prefix>
              <NIcon size="18" color="#808695">
                <LockClosedOutline />
              </NIcon>
            </template>
          </NInput>
          <NButton type="primary" :loading="sendLoading" :disabled="!!timeReflow" style="margin-left: 10px;"
            @click="(e) => sendEmail(e, formInline5.username)">
            {{ timeReflow ? `${timeReflow}秒后重试` : '发送验证码' }}
          </NButton>
        </NFormItem>
        <NFormItem path="password">
          <NInput v-model:value="formInline5.password" type="password" showPasswordOn="click" placeholder="请设置密码">
            <template #prefix>
              <NIcon size="18" color="#808695">
                <LockClosedOutline />
              </NIcon>
            </template>
          </NInput>
        </NFormItem>
        <NFormItem path="password2">
          <NInput v-model:value="formInline5.password2" type="password" showPasswordOn="click" placeholder="请再次确认密码">
            <template #prefix>
              <NIcon size="18" color="#808695">
                <LockClosedOutline />
              </NIcon>
            </template>
          </NInput>
        </NFormItem>
        <NFormItem>
          <NButton type="info" @click="" size="large" :loading="loading" block>
            提交
          </NButton>
        </NFormItem>
      </NForm>
    </NCard>
  </NModal>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { FormItemRule, useMessage, NCarousel } from 'naive-ui';
import { sendPostEmail } from '@/api/user';
import { getCookie } from '@/utils/utils';
import banner1 from '@/assets/banner-1.png'
import banner2 from '@/assets/banner-2.png'
import banner3 from '@/assets/banner-3.png'
import banner4 from '@/assets/banner-4.png'
import logo from '@/assets/logo.png'
import { useBasicLayout } from '@/hooks/useBasicLayout';

const { isMobile } = useBasicLayout()
// import { ResultEnum } from '@/enums/httpEnum';
// import { PageEnum } from '@/enums/pageEnum';
// import { websiteConfig } from '@/config/website.config';
interface FormState {
  username: string;
  password: string;
  type: number;
}

const pane1 = ref<'signin' | 'signup'>('signin');
const pane2 = ref('signinWithPWD');
const signinFormRef1 = ref();
const signinFormRef2 = ref();
const signupFormRef = ref();
const suppFormRef = ref();
const message = useMessage();
const loading = ref(false);
const timeReflow = ref(0);
const sendLoading = ref(false);
const showSuppModal = ref(false);
const showModifyModal = ref(false);
// const autoLogin = ref(true);
// const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

const imgList = [{
  imgSrc: banner1,
  title: '工作助手',
  content: '工作遇到麻烦？来问一问吧'
}, {
  imgSrc: banner2,
  title: 'AI绘画',
  content: '一键生成你的设计内容'
}, {
  imgSrc: banner3,
  title: '问答百科',
  content: '不管你是什么问题，都能快速获得答案'
}, {
  imgSrc: banner4,
  title: '代码问题',
  content: '提供个性化的编程辅助服务，提高编程效率'
},]

const formInline1 = reactive({
  username: '',
  password: '',
});
const formInline2 = reactive({
  username: '',
  password: '',
  isCaptcha: true,
});
const formInline3 = reactive({
  username: '',
  captcha: '',
  password: '',
  password2: '',
  inviteCode: '',
});
const formInline4 = reactive({
  password: '',
  password2: '',
});
const formInline5 = reactive({
  username: '',
  captcha: '',
  password: '',
  password2: '',
});
const rules1 = {
  username: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        return new Error('邮箱格式不正确')
      }
      return true
    },
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '密码格式不正确'
  },
};
const rules2 = {
  username: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        return new Error('邮箱格式不正确')
      }
      return true
    },
  },
  password: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      return true
    },
  },
};
const rules3 = {
  username: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        return new Error('邮箱格式不正确')
      }
      return true
    },
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '密码格式不正确'
  },
  password2: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (value !== formInline3.password) {
        return new Error('两次密码不一致');
      }
      return true
    },
  },
};
const rules4 = {
  password: {
    required: true,
    trigger: 'blur',
    message: '密码格式不正确'
  },
  password2: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (value !== formInline3.password) {
        return new Error('两次密码不一致');
      }
      return true
    },
  },
};
const rules5 = {
  username: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        return new Error('邮箱格式不正确')
      }
      return true
    },
  },
  captcha: {
    required: true,
    trigger: 'blur',
    message: '验证码格式不正确',
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '密码格式不正确'
  },
  password2: {
    required: true,
    trigger: 'blur',
    validator(rule: FormItemRule, value: string) {
      if (value !== formInline3.password) {
        return new Error('两次密码不一致');
      }
      return true
    },
  },
};

const userStore = useUserStore();
//   function updateUserInfo(options: Partial<UserInfo>) {
//   userStore.updateUserInfo(options)
//   ms.success(t('common.success'))
// }
const router = useRouter();
// const route = useRoute();
// this.router.

const sendEmail = async (e: { preventDefault: () => void; }, username: string) => {
  e.preventDefault();
  // 发送验证码
  sendLoading.value = true;
  let data: any = Object.create(null);
  try {
    data = await sendPostEmail({ username: username ? username : formInline2.username });
  } catch (error) {
    sendLoading.value = false;
    message.error('邮件发送错误');
    return;
  }

  sendLoading.value = false;
  message.info(data.message)
  timeReflow.value = 60;
  let timeCount = setInterval(() => {
    --timeReflow.value;
    if (timeReflow.value === 0) {
      clearInterval(timeCount);
    }
  }, 1000);
}

// 账号密码登录
const handleSubmitWithPWD = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  signinFormRef1.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline1;
      message.loading('登录中...');
      loading.value = true;

      const params: FormState = {
        username,
        password,
        type: 0,
      };

      try {
        let data: any = Object.create(null);
        data = await userStore.login(params);
        message.destroyAll();
        if (data?.data?.code === 0) {
          let name = data?.data?.name;
          let vipdate = data?.data?.vipdate;
          let quota3 = data?.data?.quota3;
          let quota4 = data?.data?.quota4;
          userStore.updateUserInfo({ token: data?.data?.use, name, quota3, quota4, vipdate });
          window.localStorage.setItem('userName', name);
          window.localStorage.setItem('quota3', quota3);
          window.localStorage.setItem('quota4', quota4);
          window.localStorage.setItem('vipdate', data?.data?.vipdate);
          const toPath = decodeURIComponent(('/chat' || '/') as string);
          message.success('登录成功!');
          router.push(toPath);
        }
        else {
          message.error(data?.msg);
        }
      }
      catch (err) {
        console.log(err);
      }
      finally {
        loading.value = false;
      }
    }
    else {
      message.error('请填写完整信息');
    }
  });
};
// 邮箱验证码登录
const handleSubmitWithCaptcha = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  signinFormRef2.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline2;
      message.loading('登录中...');
      loading.value = true;

      const params: FormState = {
        username,
        password,
        type: 1,
      };

      try {
        let data: any = Object.create(null);
        data = await userStore.login(params);
        message.destroyAll();
        if (data?.data?.code === 0) {
          let needSetPwd = data?.data?.needSetPwd;
          let name = data?.data?.name;
          let vipdate = data?.data?.vipdate;
          let quota3 = data?.data?.quota3;
          let quota4 = data?.data?.quota4;
          userStore.updateUserInfo({ token: data?.data?.use, name, quota3, quota4, vipdate });
          window.localStorage.setItem('userName', name);
          window.localStorage.setItem('quota3', quota3);
          window.localStorage.setItem('quota4', quota4);
          window.localStorage.setItem('vipdate', data?.data?.vipdate);
          const toPath = decodeURIComponent(('/chat' || '/') as string);
          message.success('登录成功!');
          if (needSetPwd) {
            showSuppModal.value = true;
          }
          else {
            router.push(toPath);
          }
        } else {
          message.error(data?.msg);
        }

      } finally {
        loading.value = false;
      }
    } else {
      message.error('请填写完整信息');
    }
  });
};
// 账号注册
const signup = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  signupFormRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password, captcha, inviteCode } = formInline3;
      loading.value = true;

      const params = {
        username,
        password,
        captcha,
        inviteCode,
      };

      try {
        let data: any = Object.create(null);
        data = await userStore.signup(params);
        message.destroyAll();
        if (data.msg.includes('成功')) {
          message.success('注册成功!');
          pane1.value = 'signin'
        } else {
          message.error(data?.msg);
        }
      }
      catch (err) {
        console.log(err);
      }
      finally {
        loading.value = false;
      }
    }
    else {
      message.error('请填写完整信息');
    }
  });
};
// 补全密码
const suppPWD = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  suppFormRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { password } = formInline4;
      loading.value = true;

      const params = {
        password,
        token: getCookie('token'),
      };

      try {
        let data: any = Object.create(null);
        data = await userStore.modifyPassword(params);
        message.destroyAll();
        if (data.msg.includes('成功')) {
          message.success('设置密码成功!');
          router.push(decodeURIComponent(('/chat' || '/') as string));
        } else {
          message.error(data?.msg);
        }

        showSuppModal.value = false;
      }
      catch (err) {
        console.log(err);
      }
      finally {
        loading.value = false;
      }
    }
    else {
      message.error('请填写完整信息');
    }
  });
};

</script>

<style lang="less" scoped>
.title {
  font-size: 30px;
}

.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
