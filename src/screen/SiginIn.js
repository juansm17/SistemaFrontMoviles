import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import { Icon } from 'react-native-elements';
import { signInStyles } from '../styles/signIn';
import Colors from '../constants/color';
import MainButton from '../components/MainButton';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const SignIn = ({ navigation }) => {
  const [document, setDocument] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://tesis-app-server.herokuapp.com/auth/signin', {
        document,
        email,
        key: password,
      });
      setDocument('');
      setEmail('');
      setPassword('');
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Solicitud');
      }, 1000);
      console.log(res.data);
    } catch (e) {
      console.log(e.response.data);
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <View style={signInStyles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/logo.jpg')}
            />
          </View>
          <Text style={signInStyles.title}>Ingresar</Text>
          <Text style={signInStyles.subtitle}>Bienvendido a  SDGPE!</Text>
          <View>
            <View style={signInStyles.section}>
              <Icon name="wallet-outline" color="gray" type="ionicon" size={20} />
              <TextInput
                placeholder="Cédula de identidad"
                autoCapitalize="none"
                blurOnSubmit={false}
                style={signInStyles.textInput}
                autoFocus
                value={document}
                onChangeText={(v) => setDocument(v)}
                onSubmitEditing={() => document.focus()}
              />
            </View>
            <View style={signInStyles.section}>
              <Icon name="mail-outline" color="gray" type="ionicon" size={20} />
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType={'email-address'}
                blurOnSubmit={false}
                style={signInStyles.textInput}
                value={email}
                onChangeText={(v) => setEmail(v)}
                onSubmitEditing={() => email.focus()}
              />
            </View>
            <View style={signInStyles.section}>
              <Icon
                name="lock-closed-outline"
                color="gray"
                type="ionicon"
                size={20}
              />
              <TextInput
                placeholder="password"
                autoCapitalize="none"
                style={signInStyles.textInput}
                secureTextEntry
                value={password}
                onChangeText={(v) => setPassword(v)}
              />
            </View>
          </View>
          {
            loading &&
            <Loading />
          }
          <MainButton onPress={signIn}>Iniciar sesión</MainButton>
          <View style={signInStyles.signUp}>
            <Text style={signInStyles.textSignUp}>No tiene cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={[
                  signInStyles.textSignUp,
                  { color: Colors.quinary, marginLeft: 3 },
                ]}
              >
                Crear Usuario
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
    marginHorizontal: Dimensions.get('window').width / 5.5,
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SignIn;