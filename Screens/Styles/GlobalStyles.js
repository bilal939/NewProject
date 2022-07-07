import {StyleSheet, Dimensions} from 'react-native';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
export const buttonColour = '#6153C3';
export const initialcolor = 'white';
export const ErrorColour = 'red';
module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: 'white',
  },
  Back: {
    height: Height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingLeft: 4,
  },
  BackText: {
    color: '#444555',
    paddingLeft: 5,
    fontSize: Height * 0.025,
  },
  Header: {
    height: Height * 0.2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  HeaderText: {
    // color:'black',
    color: '#1E2843',
    // backgroundColor:'transparent',
    fontSize: Height * 0.06,
    paddingHorizontal: 20,
  },
  ActivityIndicator: {
    alignSelf: 'center',
    width: Width,
    height: Height,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    zIndex: 1,
  },
  HeaderInfo: {
    paddingHorizontal: 20,
    fontSize: Height * 0.02,
    marginTop: 5,
    color: 'black',
    fontWeight: '100',
  },
  SubmitButtonView: {
    height: Height * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmittButton: {
    backgroundColor: buttonColour,
    height: Height * 0.076,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderRadius: 10,
  },
  SubmittButtonText: {
    color: 'white',
    fontSize: Height * 0.027,
  },
  choice: {
    fontSize: Height * 0.025,
    color: '#A1A6B3',
    textAlign: 'center',
    fontWeight: '300',
    textTransform: 'uppercase',
  },
  SocialLogin: {
    height: Height * 0.13,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
  },
  socialapps: {
    backgroundColor: '#3E89FB',
    width: Width * 0.45,
    height: Height * 0.1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  socialText: {
    color: 'white',
    fontSize: Height * 0.02,
  },
  footer: {
    height: Height * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naivagetto: {
    paddingLeft: 20,
    color: '#6153C3',
    fontSize: Height * 0.025,
  },
  sameInputTextView: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    width: '95%',
    borderColor: '#E2E6EB',
    borderWidth: 1,
    borderRadius: 10,
    height: Height * 0.08,
    marginBottom: 18,
  },
  minifooter: {
    color: '#A1A6B3',
    fontSize: Height * 0.025,
  },

  RequestText: {
    color: 'red',
    paddingLeft: 20,
    fontSize: Height * 0.024,
    marginTop: 3,
  },
  header: {
    backgroundColor: buttonColour,
    justifyContent: 'center',
    alignItems: 'center',
    height: Height * 0.08,
  },
  Payee: {
    color: 'white',
    fontSize: Height * 0.03,
  },
  PayeeView: {
    backgroundColor: '#6153C3',
    height: Height * 0.08,
    justifyContent: 'center',
  },
  payeeinnerView: {
    flexDirection: 'row',
    width: Width * 0.2,
    alignItems: 'center',
    paddingLeft: 5,
  },
  addpayeeBackText: {
    color: 'white',
    fontSize: Height * 0.024,
    paddingLeft: 5,
  },
  addPayeeView: {
    color: 'black',
    width: Width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPayeText: {
    color: 'white',
    fontSize: Height * 0.03,
  },
});
