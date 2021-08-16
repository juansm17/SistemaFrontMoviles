import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Card = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.cardContainer}>
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: 300,
    height: 150,
    shadowOpacity: 0.1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;