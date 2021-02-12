import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    let AvailableButton = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        AvailableButton = TouchableNativeFeedback
    }
    return (
        <View style={styles.buttonContainer}>
            <AvailableButton onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </AvailableButton>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    }
});
export default MainButton;