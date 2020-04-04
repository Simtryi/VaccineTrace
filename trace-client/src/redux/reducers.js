import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'
const initUser = {
    username:'',
    type:'',
    msg:'',
}

// 产生user状态的reducer
function  user(state=initUser,action) {
    switch (action.type){
        case AUTH_SUCCESS: //data是user
            return {...state,...action.data}
        case ERROR_MSG: //data是msg
            return {...state,msg:action.data}
        default:
            return state;
    }
}



export default combineReducers({
    user,
})