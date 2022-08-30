
import * as actionTypes from './Actiontypes'
const initiallStates = {
    isLoading:'',
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
            isLoading:false
        }
        case(actionTypes.SignupFailure):
        return{
            ...state,
            isLoading:false,
        }
        case(actionTypes.SET_LOADING):
        return{
            ...state,
            isLoading:true
        }
        case(actionTypes.ForgetPassword):
        return{
            ...state,
            isLoading:false,
        }
        case(actionTypes.Login):
        return{
            ...state,
            isLoading:false,
            isloggedin:true,
        }
        case(actionTypes.islogout):
        return{
            ...state,
            isLoading:false,
            isloggedin:false,
        }
        case(actionTypes.AddPayee):
        return{
            ...state,
            payedata:action.payload

        }
        default:
            return state;
    }
}