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



import Field from '../services/Field';
import Http from '../services/Http';

import { solicitudStyles } from '../styles/Solicitud'
import MainButton from '../components/MainButton';

import Colors from '../constants/color';


const Solicitud = ({ navigation }) => {
  const [solicitud, setSolicitud] = useState({
   tipo_documento:'',
   descripcion:'',
   fecha:''
  });
  const [loading, setLoading] = useState(false);
  
  let passInput = '';
  let emailInput = '';
  

  const submitSolicitud = async () => {
    setLoading(true);
    if (
      !Field.checkFields([
      
      ])
    ) {
      Alert.alert('Empty Field', 'Please, fill the fields');
    } else {
      const data = await Http.send('POST', '/api/users/signup', solicitud);

      if (!data) {
        Alert.alert('Fatal Error', 'No data from server...');
      } else {
        switch (data.typeResponse) {
          case 'Success':
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                tipo_documento: solicitud.tipo_documento,
                descripcion:solicitud.descripcion,
                fecha:solicitud.fecha,
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
      <View style={solicitudStyles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/logo.jpg')}
          />
        </View>
        <Text style={solicitudStyles.title}>Ingresar Solicitud</Text>
        <View>
        <View style={solicitudStyles.section}>
           
            <TextInput
              placeholder="Fecha"
              blurOnSubmit={false}
              style={solicitudStyles.textInput}
              keyboardType="numeric"
              autoFocus
              onChangeText={(fecha) => setUser({ ...solicitud, fecha: fecha })}
              onSubmitEditing={() => emailInput.focus()}
            />
          </View>
          <View style={solicitudStyles.section}>
         
          <RNPickerSelect 
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Constancia', value: 'constancia' },
                { label: 'Expediente', value: 'expediente' },
                {label:'Certificado',value:'certificado'}
               
            ]}
                  />
          </View>
          
         
          <View style={solicitudStyles.section}>
           
            <TextInput style={solicitudStyles.textAreaContainer}
             placeholder="Description"
             blurOnSubmit={false}
             style={solicitudStyles.textInput}
             autoFocus
             onChangeText={(descripcion) => setSolicitud({ ...solicitud, descripcion: descripcion })}
             onSubmitEditing={() => passInput.focus()}
           />
            
          </View>
         
         
        </View>
          <View >
        <MainButton   onPress={() => submitSolicitud()}>Enviar</MainButton>
      
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

export default Solicitud;