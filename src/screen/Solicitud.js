import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Button,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { signUpStyles } from '../styles/signUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { solicitudStyles } from '../styles/Solicitud'
import Loading from '../components/Loading';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Solicitud = ({ navigation }) => {
  const [documentType, setDocumentType] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [idUser, setIdUser] = React.useState('');
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    return await AsyncStorage.getItem('user');
  }

  useEffect(() => {
    getUser().then(res => setIdUser(JSON.parse(res).id_person));
  }, []);

  const createRequest = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://tesis-app-server.herokuapp.com/request', {
        documentType,
        description,
        idUser,
      });
      setDocumentType('');
      setDescription('');
      setTimeout(() => {
        Alert.alert(res.data.message);
        setLoading(false);
      }, 1000);
    } catch (e) {
      Alert.alert(e.response.data.message);
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
        <View style={solicitudStyles.container}>
          <Icon
            containerStyle={{
              marginHorizontal: 15,
              padding: 1,
              width: Dimensions.get('window').width / 11.5,
              height: Dimensions.get('window').height / 21,
              backgroundColor: '#d4223f',
              alignSelf: 'flex-end',
              borderRadius: 1000
            }}
            name='log-out'
            size={22}
            color='white'
            type='feather'
            style={{ padding: 1, margin: 2 }}
            onPress={() => navigation.navigate('SignIn')}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/logo.jpg')}
            />
          </View>
          <Text style={solicitudStyles.title}>Ingresar Solicitud</Text>
          <Picker
            style={{
              ...signUpStyles.textInput, marginVertical: 10, height: 50, borderColor: 'gray',
              backgroundColor: 'white', color: 'gray', borderRadius: 5
            }}
            selectedValue={documentType}
            onValueChange={(value) =>
              setDocumentType(value)
            }>
            <Picker.Item label="Constancia" value='CONSTANCIA' />
            <Picker.Item label="Certificado" value='CERTIFICADO' />
          </Picker>
          <View style={{
            ...solicitudStyles.section, marginVertical: 10
          }}>
            <TextInput
              placeholder="Descripción"
              blurOnSubmit={false}
              style={{
                ...solicitudStyles.textInput, marginVertical: 10, height: 50, borderColor: 'gray',
                backgroundColor: 'white', color: 'gray', borderRadius: 5
              }}
              autoFocus
              value={description}
              onChangeText={(v) => setDescription(v)}
            />
          </View>
          <View>
            {
              loading &&
              <Loading />
            }
            <Button onPress={createRequest} title='Enviar solicitud' />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback >
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
  button: {
    width: '100',
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: "center"
  },
});

export default Solicitud;