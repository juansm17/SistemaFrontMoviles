import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import { Icon } from 'react-native-elements';

import Field from '../services/Field';
import Http from '../services/Http';

import { signUpStyles } from '../styles/signUp';
import MainButton from '../components/MainButton';
import Colors from '../constants/color';


const SignUp = ({ navigation }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const perfil = ["Estudiante", "Control de Estudio"]

  let passInput = '';
  let pass2Input = '';
  let emailInput = '';

  const submitSignUp = async () => {
    setLoading(true);
    if (
      !Field.checkFields([
        user.email,
        user.password,
        user.ci,
        user.perfil,
        user.nombre,
        user.confirmPassword,
      ])
    ) {
      Alert.alert('Empty Field', 'Please, fill the fields');
    } else {
      const data = await Http.send('POST', '/api/users/signup', user);

      if (!data) {
        Alert.alert('Fatal Error', 'No data from server...');
      } else {
        switch (data.typeResponse) {
          case 'Success':
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                email: user.email,
                name: user.nombre,
                id: data.body.id,
              })
            );
            navigation.navigate('Solicitud', {
              email: user.email,
              name: user.name,
              id: data.body.id,
            });
            break;

          case 'Fail':
            data.body.errors.forEach((element) => {
              ToastAndroid.showWithGravity(
                element.text,
                ToastAndroid.SHORT,
                ToastAndroid.TOP
              );
            });
            break;

          default:
            Alert.alert(data.typeResponse, data.message);
            break;
        }
      }
    }

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
        <ScrollView>
      <View style={signUpStyles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/logo.jpg')}
          />
        </View>
        <Text style={signUpStyles.title}>Ingresar</Text>
        <Text style={signUpStyles.subtitle}>Bienvendido a  SDGPE!</Text>
        <View>
          <View style={signUpStyles.section}>
            <Icon name="person-outline" color="gray" type="ionicon" size={20} />
            <TextInput
              placeholder="Name"
              blurOnSubmit={false}
              style={signUpStyles.textInput}
              autoFocus
              onChangeText={(name) => setUser({ ...user, name: name })}
              onSubmitEditing={() => emailInput.focus()}
            />
          </View>
          <View style={signUpStyles.section}>
            <Icon name="wallet-outline" color="gray" type="ionicon" size={20} />
            <TextInput
           // ref={(input)=>(ciInput=input)}
              placeholder="CI"
              blurOnSubmit={false}
              style={signUpStyles.textInput}
              autoFocus
              onChangeText={(ci) => setUser({ ...user, ci:ci })}
              onSubmitEditing={() => passInput.focus()}
            />
          </View>
          <View style={signUpStyles.section} >
          <RNPickerSelect 
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Estudiante', value: 'estudiante' },
                { label: 'Control de Estudio', value: 'control de estudio' },
               
            ]}
        />
          </View>
          <View style={signUpStyles.section}>
            <Icon name="mail-outline" color="gray" type="ionicon" size={20} />
            <TextInput
            //  ref={(input) => (perfilInput = input)}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType={'email-address'}
              blurOnSubmit={false}
              style={signUpStyles.textInput}
              onChangeText={(email) => setUser({ ...user, email: email })}
              onSubmitEditing={() => passInput.focus()}
            />
          </View>
          <View style={signUpStyles.section}>
            <Icon
              name="lock-closed-outline"
              color="gray"
              type="ionicon"
              size={20}
            />
            <TextInput
            //  ref={(input) => (passInput = input)}
              placeholder="Password"
              autoCapitalize="none"
              blurOnSubmit={false}
              style={signUpStyles.textInput}
              secureTextEntry
              onChangeText={(password) =>
                setUser({ ...user, password: password })
              }
              onSubmitEditing={() => pass2Input.focus()}
            />
          </View>
          <View style={signUpStyles.section}>
            <Icon
              name="lock-closed-outline"
              color="gray"
              type="ionicon"
              size={20}
            />
            <TextInput
             // ref={(input) => (pass2Input = input)}
              placeholder="Confirm Password"
              autoCapitalize="none"
              blurOnSubmit={false}
              style={signUpStyles.textInput}
              secureTextEntry
              onChangeText={(password) =>
                setUser({ ...user, confirmPassword: password })
              }
              onSubmitEditing={() => submitSignUp()}
            />
          </View>
        </View>
          <View style={styles.button}>
        <MainButton   onPress={() => submitSignUp()}>Buscar</MainButton>
        <MainButton styels={styles.button} >Guardar</MainButton>
        <MainButton onPress>Eliminar</MainButton>
        {/* <TouchableOpacity
          onPress={() => submitSignUp()}
          style={signUpStyles.signIn}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#00ff00" />
          ) : (
            <Text style={signUpStyles.textSignIn}>Sign Up</Text>
          )}
        </TouchableOpacity> */}
        </View>
        <View style={signUpStyles.signUp}>
          <Text style={signUpStyles.textSignUp}>Ya tiene cuenta ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={[
                signUpStyles.textSignUp,
                { color: Colors.quinary, marginLeft: 3 },
              ]}
            >
              Ingresar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    // borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    // borderWidth: 3,
    // borderColor: Colors.quaternary,
    // overflow: 'hidden',
    marginHorizontal: Dimensions.get('window').width / 5.5,
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button:{
   width:'100',
   flexDirection: "row",
    justifyContent: 'space-around',
    alignItems:'center',
    justifyContent:"center"

  },
});

export default SignUp;