<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-position="top"
    class="mx-4 max-w-[600px] h-[680px]"
  >
    <el-form-item prop="category">
      <template #label>
        <span class="text-gray-500">類別</span>
      </template>
      <el-select 
        v-model="formData.category" 
        placeholder="請選擇類別"
        class="w-full"
      >
        <el-option 
          v-for="option in categoryOptions"
          :key="option.value"
          :label="option.label" 
          :value="option.value" 
        />
      </el-select>
    </el-form-item>

    <el-form-item prop="title">
      <template #label>
        <span class="text-gray-500">標題</span>
        <span class="text-gray-400 text-sm ml-2">(限30字符內)</span>
      </template>
      <el-input 
        v-model="formData.title"  
        placeholder="請輸入標題"
      />
    </el-form-item>
    <el-form-item prop="description">
      <template #label>
        <span class="text-gray-500">描述</span>
        <span class="text-gray-400 text-sm ml-2">(限300字符內)</span>
      </template>
      <el-input 
        v-model="formData.description" 
        type="textarea"
        placeholder="請描述您的意見/問題"
        :rows="3"
      />
    </el-form-item>

    <el-form-item prop="fileList">
      <template #label>
        <span class="text-gray-500">參考圖片</span>
        <span class="text-gray-400 text-sm ml-2">(僅支持PNG，JPG格式，每張5MB內)</span>
      </template>
      <ImageUploader
        v-model="formData.fileList"
        :limit="uploadLimit"
      />
    </el-form-item>

    <el-form-item>
      <el-button 
        :disabled="submitDisabled" 
        :loading="loading"
        type="primary" 
        class="w-full"
        @click="handleSubmit"
      >
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import ImageUploader from './ImageUploader.vue'
import { useFeedbackForm } from '../composables/useFeedbackForm.ts'
import type { FeedbackFormData } from './types/feedback.ts'

// --- props & emits
interface Props {
  formData: FeedbackFormData
  loading?: boolean
}

interface Emits {
  (e: 'submit', valid: boolean, fields?: any): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

// --- refs
const formRef = ref<FormInstance>()

// --- composable
const { 
  categoryOptions, 
  formRules, 
  uploadLimit 
} = useFeedbackForm()

// --- computed
const submitDisabled = computed(() => 
  !(props.formData.category && props.formData.title && props.formData.description) || props.loading
)

// --- methods
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid, fields) => {
    emit('submit', valid, fields)
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  props.formData.fileList = []
}

// --- expose
defineExpose({
  resetForm
})
</script>
