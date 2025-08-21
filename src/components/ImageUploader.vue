<template>
  <div class="image-uploader">
    <el-upload
      v-model:file-list="fileList"
      :class="{ 'hide-upload': fileList.length >= limit }"
      action="#"
      :auto-upload="false"
      list-type="picture-card"
      accept=".jpg, .png"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <div>
      <p class="text-gray-400">
        可提供意見/問題截圖(上傳數量
        <span :class="{ 'text-green-600': fileList.length > 0 }">
          {{ fileList.length }}
        </span>
        /{{ limit }})
      </p>
      <p v-if="fileList.length === limit" class="text-gray-300 mb-3">
        請先刪除已上傳圖片，才能再上傳新圖片
      </p>
    </div>

    <!-- 圖片預覽對話框 -->
    <el-dialog 
      v-model="previewDialogVisible" 
      :title="previewTitle"
      width="80%"
      center
    >
      <div class="flex justify-center">
        <img 
          :src="previewImageUrl" 
          alt="Preview Image" 
          class="max-w-full max-h-96 object-contain"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

// --- props
interface Props {
  modelValue: UploadUserFile[]
  limit?: number
  maxSize?: number // MB
}

interface Emits {
  (e: 'update:modelValue', value: UploadUserFile[]): void
}

const props = withDefaults(defineProps<Props>(), {
  limit: 3,
  maxSize: 5
})

const emit = defineEmits<Emits>()

// --- refs
const previewDialogVisible = ref(false)
const previewImageUrl = ref('')
const previewTitle = ref('')

// --- computed
const fileList = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// --- methods
const beforeUpload = (file: File) => {
  const isValidSize = file.size / 1024 / 1024 < props.maxSize

  if (!isValidSize) {
    ElMessage.error(`圖片大小不能超過 ${props.maxSize}MB`)
    return false
  }

  return true
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!
  previewTitle.value = uploadFile.name
  previewDialogVisible.value = true
}
</script>

<style scoped>
.image-uploader :deep(.hide-upload .el-upload--picture-card) {
  display: none;
}
</style>
