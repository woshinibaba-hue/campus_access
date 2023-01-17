import type { TInform } from '@/api/inform/inform'
import { formConfig } from './form.config'

export const dialogConfig: DialogType<TInform> = {
  title: '通知管理',
  form: formConfig,
}
