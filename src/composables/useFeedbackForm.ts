import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
import type { FeedbackFormData, CategoryOption } from '../components/types/feedback'

export const useFeedbackForm = () => {
  // 類別選項
  const categoryOptions: CategoryOption[] = [
    { label: '操作問題', value: '操作問題' },
    { label: '優化建議', value: '優化建議' },
    { label: 'Bug反饋', value: 'Bug反饋' },
    { label: '其他', value: '其他' }
  ]

  // 表單驗證規則
  const formRules = reactive<FormRules<FeedbackFormData>>({
    category: [
      { 
        required: true, 
        message: '請選擇類別', 
        trigger: 'change' 
      }
    ],
    title: [
      {
        required: true,
        message: '請輸入標題',
        trigger: 'blur'
      },
      {
        min: 1,
        max: 30,
        message: '標題長度應在 1-30 個字符之間',
        trigger: 'blur'
      }
    ],
    description: [
      {
        required: true,
        message: '請輸入描述',
        trigger: 'blur'
      },
      {
        min: 1,
        max: 300,
        message: '描述長度應在 1-300 個字符之間',
        trigger: 'blur'
      }
    ]
  })

  // 上傳限制
  const uploadLimit = 3

  return {
    categoryOptions,
    formRules,
    uploadLimit
  }
}
