import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Pressable,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import { Icon } from 'react-native-elements';

import Field from '../services/Field';
import Http from '../services/Http';
import Loading from '../components/Loading';

import { signUpStyles } from '../styles/signUp';
import MainButton from '../components/MainButton';
import Colors from '../constants/color';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);

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

  const signUp = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://tesis-app-server.herokuapp.com/auth/signup', {
        name,
        document,
        email,
        key: password,
        admin
      });
      setName('');
      setDocument('');
      setEmail('');
      setPassword('');
      setAdmin('');
      console.log(res.data.message);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('SignIn');
      }, 1000);
    } catch (e) {
      console.log(e.response.data.error);
    }
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
                value={name}
                onChangeText={(v) => setName(v)}
              />
            </View>
            <View style={signUpStyles.section}>
              <Icon name="wallet-outline" color="gray" type="ionicon" size={20} />
              <TextInput
                // ref={(input)=>(ciInput=input)}
                placeholder="Cédula de identidad"
                blurOnSubmit={false}
                style={signUpStyles.textInput}
                autoFocus
                value={document}
                onChangeText={(v) => setDocument(v)}
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
                value={email}
                onChangeText={(v) => setEmail(v)}
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
                value={password}
                onChangeText={(v) => setPassword(v)}
                onSubmitEditing={() => pass2Input.focus()}
              />
            </View>
            <View style={signUpStyles.section}>
              <RNPickerSelect
                onValueChange={(value) => setAdmin(value)}
                items={[
                  { label: 'Estudiante', value: true },
                  { label: 'Control de estudio', value: false },
                ]}
              />
            </View>
          </View>
          {
            loading &&
            <Loading />
          }
          <Button styles={styles.button} title='Ingresar' onPress={signUp} />
          <View style={signUpStyles.signUp}>
            <Text style={signUpStyles.textSignUp}>Ya tiene cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={[
                  signUpStyles.textSignUp,
                  { color: Colors.quinary, marginLeft: 3 },
                ]}
              >
                Iniciar sesión
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
    flex: 1,
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
  button: {
    width: '100',
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: "center"

  },
});

export default SignUp;