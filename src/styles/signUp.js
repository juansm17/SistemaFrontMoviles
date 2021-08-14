import { StyleSheet } from 'react-native';
import Colors from '../constants/color';

export const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  title: {
    color: Colors.quinary,
    fontSize: 30,
    fontFamily: 'open-sans-bold',
  },
  subtitle: {
    fontFamily: 'open-sans',
    color: 'gray',
  },
  section: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    fontFamily: 'open-sans',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    color: 'gray',
    paddingLeft: 10,
    fontFamily: 'open-sans',
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    color: '#3465d9',
  },
  signIn: {
    width: '100%',
    height: 40,
    backgroundColor: '#3465d9',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'open-sans',
    marginTop: 25,
  },
  textSignIn: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'open-sans',
    borderRadius: 50,
  },
  signUp: {
    color: 'gray',
    marginTop: 25,
    flexDirection: 'row',
    fontFamily: 'open-sans',
    justifyContent: 'center',
  },
  textSignUp: {
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
});