import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetToken} from '../../Asynchronous Storage/AsynchronousStorage';
import * as actionTypes from './Actiontypes';

export const SignupAction = User => async dispatch => {
  try {
    return await fetch(actionTypes.SignupUrl, {
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
      console.log("Respose",Response.data)
      if (Response.data) {
         console.log("true conditipn")
         return 201;
      } else {
         return Response.description;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
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
      body: JSON.stringify({
        login_field: User.Email,
        password: User.Password,
        role:2
      }),
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('df', status);
      if (status == 200) {
        console.log('successfull login');
        const token = 'BrytCorp' + ' ' + Response.data.token;
        console.log(token);
        await AsyncStorage.setItem('token', token);
        dispatch({type: actionTypes.Login});
        return status;
      } else {
        dispatch({type: actionTypes.LoginFailure});
        console.log('Resposne', Response.description);
        return Response.description;
      }
    });
  } catch (error) {
    console.log('cache me aya');
    return error.TypeError;
  }
};

export const ForgetPassword = User => async dispatch => {
  let error = '';
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
        console.log('Respose ', Response.description);
        dispatch({type: actionTypes.ForgetPassword});
        error = Response.description;
      } else {
        console.log('jk', Response.description);
        dispatch({type: actionTypes.ForgetPassword});
        error = Response.description;
      }
    });
  } catch (error) {
    return error;
  }
  return error;
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

export const GetAllPayeeType = () => async dispatch => {
  try {
    const token = await GetToken();
    var config = {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    return await fetch(actionTypes.GetAllPayeeTypeApi, config).then(
      async res => {
        const Response = await res.json();
        const status = res.status;
        if (status == 200) {
          console.log('getting all the types', Response);
          const newarray = [];
          Response.data.map(item => {
            newarray.push(item);
          });
          return newarray;
        } else {
          console.log(Response.description);
          return Response.description;
        }
      },
    );
  } catch (error) {
    return error;
  }
};

export const GetAllBanks = item => async dispatch => {
  try {
    dispatch({type: actionTypes.SET_LOADING});
    console.log('Banks mien aya');
    const token = await GetToken();
    return await fetch(item, {
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
      // console.log('response data is', Response.data);
      if (status == 200) {
        console.log('getting all the Banks');
        return Response.data;
      } else {
        console.log('ashda', Response);
        if (Response.description === 'Expired Token') {
          dispatch({type: actionTypes.islogout});
        }
      }
    });
  } catch (error) {
    return error;
  }
};

///Crud Payeee Operation///

export const AddpayeeData = item => async dispatch => {
  console.log('item id', item.Bankid);
  try {
    dispatch({type: actionTypes.SET_LOADING});
    console.log('Add Karaha hun');
    const token = await GetToken();
    return await fetch(actionTypes.AddPayeeApi, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        payees_name: item.Payeename,
        account_number: item.AccountNumber,
        bank: item.Typeid,
      }),
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('respose', Response);
      console.log('Status of payee is', Response);
      if (status == 200) {
        console.log('data tjat is bieg added', Response.data);
        return Response.description;
      } else {
        console.log(Response.description);
        return Response.description;
      }
    });
  } catch (error) {
    return error;
  }
};

export const FectchApiPayee = () => async dispatch => {
  try {
    const token = await GetToken();
    return await fetch(actionTypes.FetchPayeeApi, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      if (status == 200) {
        return Response.data;
      } else {
        if (Response.code === 'token_not_valid') {
          dispatch({type: actionTypes.islogout});
        }
      }
    });
  } catch (error) {
    return error;
  }
};

export const DeletepayeeeApi = item => async dispatch => {
  try {
    const token = await GetToken();
    return await fetch(item, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('Status of banks is', status);
      console.log('response data is', Response.description);
      if (status == 200) {
        console.log('condition truy');
        return Response.description;
      } else {
        console.log(Response.description);
        return Response.description;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdatadataPayee = (item, itemdata, bankid) => async dispatch => {
  try {
    const token = await GetToken();
    return await fetch(item, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        payees_name: itemdata.payees_name,
        bank: bankid,
        account_number: itemdata.account_number,
      }),
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('stats is', status);
      if (status == 200) {
        console.log('updated data in api', Response.data);
        return Response.data;
      } else {
        return Response.description;
      }
    });
  } catch (error) {
    return error;
  }
};

//Crud Contact Operation Start//

export const AddContacts = (full_name,email,phone_no) => async dispatch => {
  console.log("item",full_name,email,phone_no)
  try {
    dispatch({type: actionTypes.SET_LOADING});
    console.log('Add Karaha hun');
    const token = await GetToken();
    console.log("token",token)
    return await fetch(actionTypes.AddContactsApi, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        full_name: full_name,
        email: email,
        phone_no: phone_no,
      }),
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('respose', status);
      if (status == 200) {
        console.log("data tjat is bieg added",Response.data)
        return status;
      } else {
        console.log("sfs",Response.description);
        return Response.description;
      }
    });
  } catch (error) {
    return error;
  }
};

export const GetContacts = () => async dispatch => {
  try {
    const token = await GetToken();
    return await fetch(actionTypes.GetContactsApi, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      if (status == 200) {
        return Response.data;
      } else {
        if (Response.code === 'token_not_valid') {
          dispatch({type: actionTypes.islogout});
        }
      }
    });
  } catch (error) {
    return error;
  }
};

export const DeleteContacts = item => async dispatch => {
  try {
    const token = await GetToken();
    return await fetch(item, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('Status of banks is', status);
      console.log('response data is', Response.description);
      if (status == 200) {
        console.log('condition truy');
        return Response.description;
      } else {
        console.log(Response.description);
        return Response.description;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateContacts = (item,full_name,email,num) => async dispatch => {
  console.log("item",item,full_name,email,num)
  try {
    const token = await GetToken();
    return await fetch(item, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        full_name: full_name,
        email: email,
        phone_no: num,
      }),
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      console.log('stats is', status);
      if (status == 200) {
        console.log('updated data in api', Response.data);
        return Response.data;
      } else {
        return Response.description;
      }
    });
  } catch (error) {
    return error;
  }
};



//Crud Operation Contacts end//
export const GetCountriesCodes = () => async dispatch => {
  try {
    return await fetch(actionTypes.GetCountriesApi, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      const Response = await res.json();
      const status = res.status;
      if (status == 200) {
        return Response.data;
      } 
    });
  } catch (error) {
    return error;
  }
}

