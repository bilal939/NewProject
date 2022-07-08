import Payee from '../HomeScrens/Payee'
import * as actionTypes from './Actiontypes'
const initiallStates = {
    Userdata : '',
    isLoading:'',
    isSignUpError:'',
    isLoginError:'',
    isForgetPasswordError:'',
    isloggedin:'',
    payedata:[],
    BankDetails:[],
}

export const AuthReducer = (state=initiallStates,action)=>{
    switch(action.type){
        case(actionTypes.Signup):
        return{
            ...state,
            Userdata:action.payload,
            isLoading:false
        }
        case(actionTypes.SignupFailure):
        return{
            ...state,
            isSignUpError:action.payload,
            isLoading:false,
        }
        case(actionTypes.Reset):
        return{
            ...state,
            isSignUpError:'',
            isLoginError:'',
            isForgetPasswordError:''
        }
        case(actionTypes.SET_LOADING):
        return{
            ...state,
            isLoading:true
        }
        case(actionTypes.ForgetPassword):
        return{
            ...state,
            isForgetPasswordError:action.payload,
            isLoading:false
        }
        case(actionTypes.Login):
        return{
            ...state,
            Userdata:action.payload,
            isLoading:false,
            isloggedin:true,
        }
        case(actionTypes.LoginFailure):
        return{
            ...state,
            isLoading:false,
            isloggedin:false
        }
        case(actionTypes.islogout):
        return{
            ...state,
            isLoading:false,
            isloggedin:false,
        }
        case(actionTypes.GetAllPayeeType):
        return{
            ...state,
            isLoading:false,
            payedata:action.payload
        }
        case(actionTypes.GetAllBanks):
        return{
            ...state,
            isLoading:false,
            payedata:action.payload
        }
        
        default:
            return state;
    }
}