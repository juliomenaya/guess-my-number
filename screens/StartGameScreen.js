import React, { useState, useEffect } from 'react';
import {
    View, 
    StyleSheet, 
    Text, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);    
    
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    // hook that is executed after render cycle ends
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
    
        // this event is added on every render cycle
        // we must to dispose it
        Dimensions.addEventListener('change', updateLayout);

        // useEffect return is a "clean my mess" function
        // this function is not executed the first time that useEffect runs but until the second time and so on
        // e.g. useEffect runs and the event is attached but it does not remove the previously added event
        // next time useEffect runs it removes the 'change' event and then adds a new one
        // https://dmitripavlutin.com/react-useeffect-explanation/
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };
    
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();

    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}> 
                <Text>You selected:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.startGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={closeKeyboard}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>The Game Screen</Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a Number</Text>
                            <Input 
                                style={styles.input} 
                                autocorrect={false} 
                                keyboardType='numeric' 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}

                            />
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button title='Reset' onPress={resetInputHandler} color={Colors.accent} />
                                </View>
                                <View style={styles.button}>
                                    <Button title='Confirm' onPress={confirmInputHandler} color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, // takes all the space below the header
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    button: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }

});

export default StartGameScreen;