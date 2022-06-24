import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './Actiontypes';

export const SignupAction = User => async dispatch => {
  console.log("username",User.Name)
  console.log("password",User.password)
  console.log("email is",User.Email)
    try {
      dispatch({type:actionTypes.SET_LOADING})
      await fetch(actionTypes.SignupUrl, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:User.Email, 
          password:User.password,
          full_name:User.Name
        }),
      }).then(async res => {
        const Response =await res.json();
        if(Response.status == 201){
          console.log("status is",Response.status)
          alert("User Created")
         
          dispatch({type:actionTypes.Signup,payload:User})
        }
        else{
          dispatch({
            type:actionTypes.SignupFailure,
            payload:Response.description
          })
        }
        
      });
    } catch (error) {
      dispatch({
        type:actionTypes.SignupFailure,
        payload:Response.description
      })
    }
};

export const LoginAction = User => async dispatch => {
  dispatch({type:actionTypes.SET_LOADING})
  dispatch({type:actionTypes.Login})
  try {
    await fetch(actionTypes.Loginurl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_field:User.Email, 
        password:User.Password,
      }),
    }).then(async res => {
      const Response =await res.json();
      const status = await res.status;
      if(status === 200){
        const token = 'BrytCorp'+ ' '+Response.data.token;
        await AsyncStorage.setItem('token',token)

      }
      else{
        console.log("resopose",Response)
        dispatch({
          type:actionTypes.LoginFailure,
          payload:Response.description
        })
      }
      
    });
  } catch (error) {
    dispatch({
      type:actionTypes.LoginFailure,
      payload:Response.description
    })
  }
};


export const ForgetPassword = User => async dispatch => {
  dispatch({type:actionTypes.SET_LOADING})
  try {
    await fetch(actionTypes.ForgetPasswordurl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:User, 
      }),
    }).then(async res => {
      const Response =await res.json();
      console.log("response status",Response.status)
      if(Response.status == 200){
        console.log(Response)
        dispatch({type:actionTypes.ForgetPassword,payload:Response.description})
      
      }
      else{
        console.log(Response)
        dispatch({
          type:actionTypes.ForgetPassword,
          payload:Response.description
        })
      }
      
    });
  } catch (error) {
    dispatch({
      type:actionTypes.EmailError,
      payload:Response.description
    })
  }
};


export const Logout = ( ) => async dispatch => {
  dispatch({type:actionTypes.islogout})
  try {
    const token = await AsyncStorage.getItem('token')
    await fetch(actionTypes.LogoutApi, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Authorization':token
      },
    }).then(async res => {
      const Response =await res.json();
      if(Response.status == 200){
        await AsyncStorage.removeItem('item')
        dispatch({
          type:actionTypes.islogout,
        })
        dispatch({type:actionTypes.Login})
      }
      else{
        await AsyncStorage.removeItem('item')
        dispatch({
          type:actionTypes.islogout,
        })
      }
      
    });
  } catch (error) {
    dispatch({
      type:actionTypes.islogout,
      payload:Response.description
    })
  }
};


