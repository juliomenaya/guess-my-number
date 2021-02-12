import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} />
            </View>
            <Text>Guess rounds: {props.guessRounds}</Text>
            <MainButton onPress={props.onRestart}>Start New Game</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10
    },
    imageContainer: {
      width: Dimensions.get('window').width * 0.7,
      height: Dimensions.get('window').width * 0.7,
      borderRadius: (Dimensions.get('window').width * 0.7) / 2,
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden',
      marginVertical: Dimensions.get('window').height / 30
    },
    image: {
      width: '100%',
      height: '100%'
    },
    resultContainer: {
      marginHorizontal: 30,
      marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
      textAlign: 'center',
      fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight: {
      color: Colors.primary,
      fontFamily: 'open-sans-bold'
    }
  });

export default GameOverScreen;