import type { UploadUserFile } from 'element-plus'

// 表單數據
export interface FeedbackFormData {
  category: string
  title: string
  description: string
  fileList: UploadUserFile[]
}

// 類別選項
export interface CategoryOption {
  label: string
  value: string
}

// api回傳
export interface SubmitResponse {
  success: boolean
  message: string
  data?: any
}
