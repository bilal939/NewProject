import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './Actiontypes';


export const SignupAction = User => async dispatch => {
  let error = ''
  try {
    dispatch({type: actionTypes.SET_LOADING});
    await fetch(actionTypes.SignupUrl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: User.Email,
        password: User.password,
        full_name: User.Name,
      }),
    }).then(async res => {
      const Response = await res.json();
      if (Response.status == 201) {
        console.log('status is', Response.status);
        dispatch({type: actionTypes.Signup});
      } else {
        error = Response.description
      }
    });
  } catch (error) {
    return error;
  }
  return error;
};

export const LoginAction = User => async dispatch => {
  try {
    dispatch({type: actionTypes.SET_LOADING});
   return await fetch(actionTypes.Loginurl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          login_field: User.Email,
          password: User.Password,
        },
        
      ),
    }).then(async res => {
      const Response = await res.json();
      const status =  res.status;
      if (status == 200) {
        console.log('successfull login');
        const token = 'BrytCorp' + ' ' + Response.data.token;
        await AsyncStorage.setItem('token', token);
        dispatch({type: actionTypes.Login});
        
      } else {
        dispatch({type:actionTypes.LoginFailure})
        console.log("Resposne",Response.description)
        return Response.description;
       
      }
    });
  } catch (error) {
    console.log("cache me aya");
    return error;
  }
 
};

export const ForgetPassword = User => async dispatch => {
  let error = ''
  dispatch({type: actionTypes.SET_LOADING});
  try {
    await fetch(actionTypes.ForgetPasswordurl, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: User,
      }),
    }).then(async res => {
      const Response = await res.json();
      const Status = res.status;
      if (Status == 200) {
        console.log("Respose ",Response.description)
        dispatch({type:actionTypes.ForgetPassword})
        error = Response.description;
      } else {
        console.log('jk',Response.description)
        dispatch({type:actionTypes.ForgetPassword})
        error =  Response.description;
      }
    });
  } catch (error) {
    return error;
  }
  return error;  ;

};

export const Logout = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    await fetch(actionTypes.LogoutApi, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(async res => {
      const Response = await res.json();
      if (Response.status == 200) {
        console.log('succefully logout');
        const token = await AsyncStorage.removeItem('token');
        dispatch({
          type: actionTypes.islogout,
        });
      } else {
        console.log('Token may be expired');
        const token = await AsyncStorage.removeItem('token');
        dispatch({
          type: actionTypes.islogout,
        });
      }
    });
  } catch (error) {
    return error;
  }
};


export const GetAllPayeeType = (token) => async (dispatch) =>{
  try {
    var config = {
      method:'GET',
      headers:{
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Authorization':token
      }
    }
    return await fetch(actionTypes.GetAllPayeeTypeApi,config)
    .then(async res => {
      const Response = await res.json();
      const status = res.status;
      if (status == 200) {
        console.log("getting all the types", Response)
        const newarray = [];
        Response.data.map(item=>{
          newarray.push(item)
        })
      return newarray;
      } else {
        console.log(Response.description)
        return Response.description;
      }
    })
  } catch (error) {
   return error;
  }

}

export const GetAllBanks = (item) => async dispatch => {
  try {
    dispatch({type: actionTypes.SET_LOADING});
    console.log('Banks mien aya');
    const token = await AsyncStorage.getItem('token');
    return await fetch(item
    , {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('Status of banks is', status);
      console.log('response data is', Response.data);
      if (status == 200) {
        console.log('getting all the Banks');
        return Response.data
      } else {
        console.log(Response.messages.message);
        return Response.messages.message;
      }
    });
  } catch (error) {
    return error;
  }
};

