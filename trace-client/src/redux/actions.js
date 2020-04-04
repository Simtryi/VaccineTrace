import{
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'
import {
    reqLogin,
    reqRegister,
    reqUpdateUser
} from '../api'

// 授权成功的同步action
const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});

// 错误提示信息的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});

// 登录异步action
export const login = (user) => {
    const {username,password,type} = user;
    if(!username){
        return errorMsg('用户名不能为空');
    }
    else if(!password){
        return errorMsg('密码不能为空');
    }
    return async dispatch => {
        const response = await reqLogin({username,password,type});
        const result = response.data;
        if(result.code===0){//成功
            // 分发授权成功的同步action
            dispatch(authSuccess(result.data));
        }
        else{//失败
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg));
        }
    }
}

// 注册异步action
export const register = (user) => {
    const {username,password,repassword,type} = user;
    if(!username){
        return errorMsg('用户名不能为空');
    }
    else if(!password){
        return errorMsg('密码不能为空');
    }
    else if(password !== repassword){
        return errorMsg('2次密码要一致！');
    }

    return async dispatch => {
        const response = await reqRegister({username,password,type});
        const result = response.data; //{code:0/1 , data:user , msg:''}
        if(result.code===0){//成功
            // 分发授权成功的同步action
            dispatch(authSuccess(result.data));
        }
        else{//失败
            // 分发错误提示信息的同步action
            dispatch(errorMsg(result.msg));
        }
    }
}

// 注册异步action
export const update = (user) => {
    const {username,password,newpassword,repassword} = user;
    if(!username){
        return errorMsg('用户名不能为空');
    }
    else if(!password){
        return errorMsg('密码不能为空');
    }
    else if(newpassword !== repassword){
        return errorMsg('2次密码要一致！');
    }

    return async dispatch => {
        const response = await reqUpdateUser({username,password,newpassword});
        const result = response.data; //{code:0/1 , data:user , msg:''}
        dispatch(errorMsg(result.msg));
    }
}
