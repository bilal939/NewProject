import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './Actiontypes';

export const SignupAction = User => async dispatch => {
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
  let error='';
  try {
    dispatch({type:actionTypes.SET_LOADING})
    await fetch(actionTypes.Loginurl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_field:User.Email, 
        password:User.Password,
      },
      console.log("iskabaddd")
      ),
      
    }).then(async res => {
      const Response =await res.json();
      const status = await res.status;
      if(status === 200){ 
        console.log("successfull login")
        const token = 'BrytCorp'+ ' '+Response.data.token;
        await AsyncStorage.setItem('token',token)
        dispatch({type:actionTypes.Login})
      }
      else{
       error=Response.description;
       console.log("eror",error)
       dispatch({
        type:actionTypes.LoginFailure,
      })
     
      }
    });
    
  } catch (error) {
    dispatch({
      type:actionTypes.LoginFailure,
      payload:Response.description
    })
  }
  return error;

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


export const Logout = () => async dispatch => {
  console.log("logout action")
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
        console.log("succefully logout")
        const token =  await AsyncStorage.removeItem("token")
        dispatch({
          type:actionTypes.islogout,
        })

      }
      else{
        console.log("Token may be expired")
        const token =  await AsyncStorage.removeItem("token")
        // console.log("tookn if ",token)
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


export const GetAllPayeeType = () => async (dispatch) =>{
  let error = '';
  try {
    
    console.log("Payee mien aya")
    const token = await AsyncStorage.getItem('token')
    await fetch(actionTypes.GetAllPayeeTypeApi,
    {
      method:'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Authorization':token
      },
    }).then(res=>{
      console.log("yahan aya", res.json());
      return res.json;
      // const Response =await res.json();
      
      // const status = res.status;
      // console.log("Status is",status)
      // console.log("response data is",Response.data)
      // if (status == 200) {
      //   console.log("getting all the types")
      //   const newarray = [];
      //   Response.data.map(item=>{
      //     newarray.push(item)
      //   })
      //   dispatch({
      //     type:actionTypes.GetAllPayeeType,
      //     payload:newarray
      //   })
      //   return newarray;
      
      // } else {
      //   console.log(Response.description)
      //   return Response.description;
        // error = Response.description;
        // dispatch({
        // type:actionTypes.GetTypeError,
        // payload:Response.description 
        // })
      // }
    })
  } catch (error) {
    dispatch({
      type:actionTypes.GetTypeError,
      payload:error
      })
  }
  return error;
}


export const GetAllBanks = () => async dispatch =>{
  try {
    console.log("Banks mien aya")
    const token = await AsyncStorage.getItem('token')
    await fetch(actionTypes.GetAllBanks,
    {
      method:'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Authorization':token
      },
    }).then(async res=>{
      const Response =await res.json();
      const status = await res.status;
      console.log("Status of banks is",status)
      console.log("response data is",Response.data)
      if (status == 200) {
        console.log("getting all the Banks")
        const newarray = [];
        Response.data.map(item=>{
          newarray.push(item)
        })
        dispatch({
          type:actionTypes.GetAllBanks,
          payload:newarray
        })
      } else {
        console.log(Response.description)
        
      }
    })
  } catch (error) {
    return error;
  }
}