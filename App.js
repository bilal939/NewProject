import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Homestack from './Routes/Homestack';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './Screens/Actions/Reducer';
const store = createStore(AuthReducer,  applyMiddleware(thunk));
// console.log(JSON.stringify(store.getState()));
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Homestack />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
