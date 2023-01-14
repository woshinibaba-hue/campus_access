export type IUser = {
  email: string
  nickName: string
  token: string
  avatar?: null | string
  referral?: string
  password?: string
} & TBase

type health = {
  name: string
  period: string
  college: string
  class: string
  studentNo: string
  education: string
  identity: string
  dormitory?: string
  dormitoryNo?: string
  birthday?: string
  phone?: string
  sex?: string
  koseki?: string
  native?: string
  oneVaccine?: string
  oneVaccineTime?: string
  twoVaccine?: string
  twoVaccineTime?: string
  threeVaccine?: string
  threeVaccineTime?: string
} & TBase

export type IUserAndHealth = {
  health: health
} & IUser
