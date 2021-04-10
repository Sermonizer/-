export const validateEmail = (rule, value, cb) => {
  const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  if (emailReg.test(value)) {
    return cb()
  }
  cb(new Error('邮箱地址不正确'))
}

export const validateMobile = (rule, value, cb) => {
  const mobileReg = /^1[3456789]\d{9}$/
  if (mobileReg.test(value)) {
    return cb()
  }
  cb(new Error('手机号格式不正确'))
}
