import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Feather } from '@expo/vector-icons'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min) + min);
    if (rndNum === exclude)
        generateRandomBetween(min, max, exclude);
    else
        return rndNum;
};

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <Text>#{listLength - itemData.index}</Text>
            <Text>{itemData.item}</Text>
        </View>
    );
};

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableWidth, setAvailableWidth] = useState([Dimensions.get('window').width]);
    const [availableHeight, setAvailableHeight] = useState([Dimensions.get('window').height]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    useEffect(() => {
        const changeLayout = () => {
            setAvailableHeight(Dimensions.get('window').height)
            setAvailableWidth(Dimensions.get('window').width)
        };
        Dimensions.addEventListener('change', changeLayout)

        return () => {
            Dimensions.removeEventListener('change', changeLayout)
        }
    });

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater') && currentGuess > props.userChoice) {
            Alert.alert('Lier!', 'You know that this is wrong...', [{text: 'Sorry', style: 'cancel'}]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(previousGuesses => [nextNumber.toString(), ...previousGuesses]);
    };

    let listContainerStyle = styles.listContainer

    if (availableWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (availableHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Feather name='thumbs-down' color='white' size={24}/>
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Feather name='thumbs-up' color='white' size={24}/>
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView> */}
                    <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Feather name='thumbs-down' color='white' size={24}/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Feather name='thumbs-up' color='white' size={24}/>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}/>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
      width: 400,
      maxWidth: '90%'
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%'
    },
    listContainer: {
      flex: 1,
      width: '60%'
    },
    listContainerBig: {
      flex: 1,
      width: '80%'
    },
    list: {
      flexGrow: 1,
      // alignItems: 'center',
      justifyContent: 'flex-end'
    },
    listItem: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 15,
      marginVertical: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    }
  });

export default GameScreen;

