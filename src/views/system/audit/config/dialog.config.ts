export const dialogConfig: DialogType = {
  title: '请假申请拒绝',
  form: {
    columns: [
      {
        field: 'cause',
        lable: '拒绝原因',
        placeholder: '请输入拒绝原因',
        itemType: 'textarea',
        rows: 3
      }
    ],
    isAction: false,
    labelPosition: 'right',
    rules: {
      cause: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]
    }
  }
}
