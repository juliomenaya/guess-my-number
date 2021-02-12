import React from 'react';
import { View, StyleSheet } from 'react-native';


const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10

        // position and width will be pass down by props
        // width: 300,
        // maxWidth: '80%',
        // alignItems: 'center',

        // all the shadow stuff works only on IOS
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
    }
});

export default Card;
