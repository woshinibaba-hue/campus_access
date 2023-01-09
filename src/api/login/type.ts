export type IUser = {
  email: string
  nickName: string
  token: string
  avatar?: null | string
  referral?: string
  password?: string
} & TBase
