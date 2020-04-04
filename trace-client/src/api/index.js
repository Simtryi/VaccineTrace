import ajax from './ajax'

// 请求登录
export const reqLogin = (user) => ajax('/login',user,'POST')

// 请求注册
export const reqRegister = (user) => ajax('/register',user,'POST')

// 请求更新账户
export const reqUpdateUser = (user) => ajax('/account',user,'POST')
