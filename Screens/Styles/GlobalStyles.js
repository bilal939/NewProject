import {StyleSheet, Dimensions} from 'react-native';
import { WidthWindow } from '../DimesionsScreen/ScreenDimesnions';
import { HeightWindow } from '../DimesionsScreen/ScreenDimesnions';
export const Colours = {
    buttonColour : '#665abc',
   initialcolor :'white',
   ErrorColour : 'red'
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor:'white',
    paddingHorizontal:15
  },
  Back: {
    HeightWindow: HeightWindow * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingLeft: 4,
  },
  BackText: {
    color: '#444555',
    paddingLeft: 5,
    fontSize: HeightWindow * 0.025,
  },
  Header: {
    // backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom:20
  },
  HeaderText: {
    marginTop:20,
    color: '#1E2843',
    fontSize: HeightWindow * 0.045,
    paddingHorizontal: 20,
  },
  ActivityIndicator: {
    alignSelf: 'center',
    width: WidthWindow,
    HeightWindow: HeightWindow,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    zIndex: 1,
    opacity:0.9
  },
  HeaderInfo: {
    paddingHorizontal: 20,
    fontSize: HeightWindow * 0.019,
    marginTop: 5,
    color: 'black',
    fontWeight: '100',
  },
  SubmitButtonView: {
    height: HeightWindow * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmittButton: {
    backgroundColor:  Colours.buttonColour,
    height: HeightWindow * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
  },
  SubmittButtonText: {
    color: 'white',
    fontSize: HeightWindow * 0.027,
  },
  choice: {
    fontSize: HeightWindow * 0.025,
    color: '#A1A6B3',
    textAlign: 'center',
    fontWeight: '300',
    textTransform: 'uppercase',
  },
  SocialLogin: {
    height: HeightWindow * 0.13,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
  },
  socialapps: {
    backgroundColor: '#3E89FB',
    paddingVertical:12,
    paddingHorizontal:18,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  socialText: {
    color: 'white',
    paddingLeft:5,
    fontSize: HeightWindow * 0.016,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naivagetto: {
    paddingLeft: 20,
    color: '#6153C3',
    fontSize: HeightWindow * 0.025,
  },
  sameInputTextView: {
    flexDirection: 'row',
    padding: 3,
    alignItems: 'center',
    width: '95%',
    borderColor: '#E2E6EB',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 18,
  },
  minifooter: {
    color: '#A1A6B3',
    fontSize: HeightWindow * 0.025,
  },

  RequestText: {
    color: 'red',
    paddingLeft: 20,
    fontSize: HeightWindow * 0.024,
    marginTop: 3,
  },
  header: {
    backgroundColor: Colours.buttonColour,
    justifyContent: 'center',
    alignItems: 'center',
    HeightWindow: HeightWindow * 0.08,
  },
  Payee: {
    color: 'white',
    fontSize: HeightWindow * 0.03,
  },
  PayeeView: {
    backgroundColor: '#6153C3',
    HeightWindow: HeightWindow * 0.08,
    justifyContent: 'center',
  },
  payeeinnerView: {
    flexDirection: 'row',
    width: WidthWindow * 0.2,
    alignItems: 'center',
    paddingLeft: 5,
  },
  addpayeeBackText: {
    color: 'white',
    fontSize: HeightWindow * 0.024,
    paddingLeft: 5,
  },
  addPayeeView: {
    color: 'black',
    width: WidthWindow * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPayeText: {
    color: 'white',
    fontSize: HeightWindow * 0.03,
  },
});
