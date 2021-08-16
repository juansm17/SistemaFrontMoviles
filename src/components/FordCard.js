import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const FormCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: 330,
    height: 200,
    shadowOpacity: 0.1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    padding: 20,
    borderRadius: 10,
  },
});

export default FormCard;