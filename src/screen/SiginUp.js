import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Button,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from 'react-native-elements';
import Loading from '../components/Loading';
import { signUpStyles } from '../styles/signUp';
import Colors from '../constants/color';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);

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
      setTimeout(() => {
        Alert.alert(res.data.message);
        setLoading(false);
        navigation.navigate('SignIn');
      }, 1000);
    } catch (e) {
      Alert.alert(e.response.data.message);
      setLoading(false);
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
            <Picker
              style={{
                ...signUpStyles.textInput, marginVertical: 10, height: 50, borderColor: 'gray',
                backgroundColor: 'white', color: 'gray', borderRadius: 5
              }}
              selectedValue={admin}
              onValueChange={(value) =>
                setAdmin(value)
              }>
              <Picker.Item label="Estudiante" value={true} />
              <Picker.Item label="Control de estudio" value={false} />
            </Picker>
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