import React,  { useState, createContext } from "react";

const gameContext = createContext();

function GameContext() {
  
   const playGame = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === lastName) {
      alert('You win!');
      navigate(`/info`);
      setPlayerPoints(playerPoints + 1);
      setGamesPlayed(gamesPlayed + 1);
      localStorage.setItem('Score', playerPoints);
      localStorage.setGamesPlayed('Games', gamesPlayed);
      return;
    }
    alert('Wrong answer!');
    navigate(`/info`);
    setGamesPlayed(gamesPlayed + 1);
    localStorage.setItem('Score', playerPoints);
    localStorage.setGamesPlayed('Games', gamesPlayed);
  };

  return (
    
  )
}

export default GameContext
