import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colours';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);


  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  // if valid number
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameover={gameOverHandler}/>
  }

  // if (gameIsOver && userNumber) {
  //   screen = <GameOverScreen />
  // }
  
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    )
  }


  return (
    <LinearGradient 
      colors={[Colors.primary700, Colors.accent500]} 
      style={styles.rootScreen}
    >
        <ImageBackground 
            source={require('./assets/images/background.jpeg')} 
            resizeMode="cover" 
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
          <SafeAreaView style={styles.rootScreen}> 
            {screen}
          </SafeAreaView>
            
        </ImageBackground>
        
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1  
  },
  backgroundImage: {
    opacity: 0.15
  }
});


// Views only take as much space as they need
  // const [gameIsOver, setGameIsOver] = useState(True);
