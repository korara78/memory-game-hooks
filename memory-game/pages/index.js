import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";

/*
  -useState is a Hook that lets you add React state to function components. 
  -useEffect: tells React that your component needs to do something after render.
*/

/*
  -Step 1: create main menu in parent App component.
  -Step 2: create game board on MemoryGame child component.
  -Step 3: adding Style
  -Step 4: create Card grandchild component in MemoryGame to populate game. 
  -Step 5: apply click logic
  -Step 6: apply match logic
  -Step 7: high score logic 
*/


/* Step 1: create main menu in parent App component.
  -1A declare state variables options. 
  -1A the value for var options determines if player is playing a game and how many tiles/difficulty.
  -1A var options useState hook with initial state 'null'.
  -1A ops var setOptions will update the var options, thus also changing its useState argument.
    
  -1B declare state variable highscore. 
  -1B var highScore useState with initial state of 0. 
  -1B var setHighScore will update var highScore, thus also changing its useState argument. 
  -1B var highScore useState hook linked to useEffect hook? 
  -1B var highScore we pass a function to useEffect hook. This function we pass is our effect.
  -1B inside our effect, we set an empty object and empty list

  -Step 1 Render:  
  -1A when options are null, render button elements Easy, Med, Hard via setOptions function.  
  -1A Start Over button with onclick event handler to set setOptions state to null.
  -useEffect to load when the game starts, create an empty object and empty list. 
*/


/* Step 2: create game board on MemoryGame child component.
  -2A child component MemoryGame takes its parent's var options as props.
  -2B declare game with useState hook with initial state an empty array.
  -2C declare flippedCount (attempts) and setFlipped to useState hook initial state 0.
  -2D declare flippedIndexes (cards guessed) and setFlippedIndexes to useState hook inital state empty array.
  
  -Step 2 Render:
  -2B game variable is an array with length equal to the number stored in the options variable.
  -2B 1st useEffect hook randomly assigns options / 2 colors out to all the cards.
  -2C 1st useEffect hook checks if flipped property matched.
  -2B 1st useEffect hook pushes first and second options to var game useState array.
  -2B cards are shuffled using Math.random() and the game is set.
  -2ABC render out the cards (objects in the game array) with map. We also passed down the color, game, 
   and both of our flipped hooks to each of the cards to use in the click handlers we will soon set up.
*/

https://www.code-boost.com/react-memory-game/


export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  /*
   -Placing useEffect inside the component lets us access the count state variable (or any props)
     right from the effect.
   -By default useEffect runs both after the first render and after every update. */
  useEffect(() => {
    //Loads when the game starts and empty object and empty list
  }, [])

  return (
    <div>
      <div className="container">
        <h1>Memory Game</h1>
        <div>High Score: {highScore}</div>     
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(12)}>Easy</button> 
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(prevOptions)
                  }, 5)
                }}
              >
                Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Choose a difficulty to begin!</h2>
      )}
    </div>
  )
}

/*
  

*/

function MemoryGame({options, setOptions, highScore, setHighScore}) {
  const [game, setGame] = useState([])
  const [flippedCount, setFlippedCount] = useState(0)
  const [flippedIndexes, setFlippedIndexes] = useState([])

  const colors = [
    '#ecdb54',
    '#e34132',
    '#6ca0dc',
    '#944743',
    '#dbb2d1',
    '#ec9787',
    '#00a68c',
    '#645394',
    '#6c4f3d',
    '#ebe1df',
    '#bc6ca7',
    '#bfd833',
  ]

  /*
  -2A 
  */

  useEffect(() => {
    const newGame = []
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      }
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      }

      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [])

  useEffect(() => {
    // Loads when the game variable changes
  }, [game])

  if (flippedIndexes.length === 2) {
    // Runs if two cards have been flipped
  }

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
      <div id="cards">
        {game.map((card, index) => (
          <div className="card" key={index}>
            <Card
              id={index}
              color={card.color}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          </div>
        ))}
      </div>
    )
  }
}

function Card(props) {
  return <div>i'm a card</div>
}