import { FormRules } from 'element-plus'

type Type = 'input' | 'password' | 'select'
export type TFromItem = {
  field: string
  type: Type
  lable: string
  placeholder?: string
  options?: { title: string; value: string | number }[]
  isHide?: boolean
  isDisabled?: boolean
}
export type TFormProps = {
  fromItems: TFromItem[]
  rules?: FormRules
  labelWidth?: string
}
