<template>
  <span
    @click="dialogVisible = true" 
    class="cursor-pointer"
  >
    <el-icon 
      size="32" 
      color="#005aaa">
      <WarningFilled/>
    </el-icon>
  </span>
  
  <el-dialog
    v-model="dialogVisible"
    destroy-on-close
    @closed="handleDialogClosed"
    top="25px"
  >
    <template #title>
      <h3 class="text-gray-500 font-bold">意見反饋</h3>
    </template>
    
    <FeedbackForm 
      ref="feedbackFormRef"
      v-model:form-data="formData"
      @submit="handleSubmit"
    />
  </el-dialog>
  <el-dialog
    v-model="responseDialogVisible"
    destroy-on-close
    width="500"
    @closed="handleDialogClosed"
  >
    <template #title>
      <h3 class="font-bold text-green-600 flex item-center">
        <el-icon size="24" class="mr-2">
          <CircleCheckFilled />
        </el-icon>
        提交成功
      </h3>
    </template>
    
    <p>感謝您的反饋，我們將繼續努力，提供更優質的服務！</p>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import FeedbackForm from './FeedbackForm.vue'
import type { FeedbackFormData } from './types/feedback.ts'

// --- dialog
const dialogVisible = ref(false)
const feedbackFormRef = ref()
const responseDialogVisible = ref(false)

// --- form data
const formData = reactive<FeedbackFormData>({
  category: '',
  title: '',
  description: '',
  fileList: []
})

// --- methods
const handleSubmit = async (valid: boolean) => {
  if (valid) {
    try {
      console.log(formData)
      responseDialogVisible.value = true
      dialogVisible.value = false
      setTimeout(() => {
        responseDialogVisible.value = false
      }, 5000)
    } catch (error) {
      console.error(error)
    }
  } else {
    console.error('欄位不完整')
  }
}

const handleDialogClosed = () => {
  // 關閉彈窗後重置表單 
  feedbackFormRef.value?.resetForm()
}
</script>
