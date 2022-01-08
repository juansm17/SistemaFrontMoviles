import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.containerLoading}>
            <ActivityIndicator size='large' color='white' />
        </View>
    )
};

const styles = StyleSheet.create({
    containerLoading: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 6,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        top: 300,
        position: 'absolute'
    },
});

export default Loading;