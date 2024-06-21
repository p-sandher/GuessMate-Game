import { View ,Text, StyleSheet, Alert } from 'react-native';
import Title from '../components/ui/title'
import { useState, useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import {Ionicons} from '@expo/vector-icons';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max-min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);
    
    function nextGuessHandler(direction) { //direction => lower, greater

        if ( 
            ( direction === 'lower' && currentGuess < userNumber) || 
            ( direction === 'greater' && currentGuess > userNumber) ) 
            {
            Alert.alert("Don't Lie!", "You know this is wrong...", [
                {text: 'Sorry!', style: 'cancel'},
            ]);
            return ;
        }
        if (direction === 'lower'){
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText>Higher or lower?</InstructionText>
                <View>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    {/* <Ionicons name="md-remove" size={24} color="white" /> */}
                    -
                    </PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        {/* <Ionicons name="md-" size={24} color="white" /> */}
                        +
                    </PrimaryButton>
                </View>
                
            </Card>
            {/* <View></View> */}
        </View>
    )     
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    }
});