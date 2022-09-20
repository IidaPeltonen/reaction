import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import uuid from 'react-uuid'

export default function App() {

  const [gameStarted, setGameStarted] = useState(false)
  const [startTime, setStartTime] = useState(0)

  const NBR_OF_DICES = 2
  const [diceImages, setDiceImages] = useState([])
  const [status, setStatus] = useState("")
  const [wrongStatus, setWrongStatus] = useState()
  const [maara, setMaara] = useState(0)

  function initialize() {
    let imgs= []
    for (let i=0; i < NBR_OF_DICES; i++) {
      imgs[i] = require("./assets/dice-images/smiley.png")
    }
      setDiceImages(imgs)
  }

  function setImages(throws) {
    let imgs = []
    for (let i=0; i < throws.length; i++) {
      switch(throws[i]) {
        case 1: imgs[i] = (require("./assets/dice-images/1.png")); break;
        case 2: imgs[i] = (require("./assets/dice-images/2.png")); break;
        case 3: imgs[i] = (require("./assets/dice-images/3.png")); break;
        case 4: imgs[i] = (require("./assets/dice-images/4.png")); break;
        case 5: imgs[i] = (require("./assets/dice-images/5.png")); break;
        case 6: imgs[i] = (require("./assets/dice-images/6.png")); break;
        default: break;
      }
    }
      setDiceImages(imgs)
  }

  function throwDices() {
    let throws = []
    let sum = 0
    setStartTime(new Date())
    setGameStarted(true)
    for (let i=0; i < NBR_OF_DICES; i++) {
      throws[i] = Math.floor(Math.random() * 6 + 1)
      sum += throws[i]
    }
    setImages(throws)
  }

  useEffect(() => {
    initialize()
  }, [])

  function checkDices() {
    if (gameStarted) {
      diceImages[0] === diceImages[1]
      ? setStatus("Reaction time: " + (new Date() - startTime) + "ms.")
      : setMaara(maara+1) & setStatus('Noup! Dices are not the same.') & setWrongStatus('Wrong hits: ' + maara)
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reaction time</Text>
      <Button 
        style={styles.button}
        onPress={throwDices} 
        title='Throw dices' >
      </Button>
      <View style={styles.flex}>
        {diceImages.map(dice => (
          <Image style={styles.dice} source={dice} key={uuid()} />
        ))}
      </View>
      <Button 
        style={styles.button}
        onPress={checkDices} 
        title='Same dices' >
      </Button>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.wrong}>{wrongStatus}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    marginTop: 100,
    marginBottom: 30
  },
  button: {
    marginTop: 30,
    marginBottom: 30
  },
  flex: {
    flexDirection: 'row'
  },
  dice: {
    width: 80,
    height: 80,
    marginTop: 30,
    marginBottom: 15,
    marginRight: 10
  },
  sum: {
    fontSize: 20
  }
});
