/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import axios from 'axios';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Pixelify } from "react-pixelify";
import { useFetch } from "./utils/useFetch";
import { usePaintingData } from "./utils/usePaintingData";

const Styled = styled.div`
  display: flex;
  justify-content: center;
  height: 94vh;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  max-height: 650px;
  width: 650px;
  margin-bottom: 15px;
`;

const Text = styled.p`
  margin-bottom: 15px;
`;


function Main() {

  const [userInput, setUserInput] = useState("");

  const { paintingData, loading, fetchData } = usePaintingData();

  // let navigate = useNavigate();

  // const artistName = paintingData?.artist?.split(" ");

  // const lastName = artistName?.pop().toLowerCase();

  const inputTextHandler = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    console.log('this is being called');
    fetchData();
  }, []);

  // const playGame = (e) => {
  //   e.preventDefault();
  //   if (userInput.toLowerCase() === lastName) {
  //     setPlayerPoints(playerPoints + 1);
  //     setGamesPlayed(gamesPlayed + 1);
  //     localStorage.setItem('Score', playerPoints);
  //     localStorage.setGamesPlayed('Games', gamesPlayed);
  //     alert('You win!');
  //     navigate(`/info`);
  //     return;
  //   }
  //   setGamesPlayed(gamesPlayed + 1);
  //   localStorage.setItem('Score', playerPoints);
  //   localStorage.setGamesPlayed('Games', gamesPlayed);
  //   alert('Wrong answer!');
  //   navigate(`/info`);
  // };

  return (
    <Styled>
      <MainContainer>
        {loading && <Text>Loading...</Text>} 
        <Pixelify
          src={paintingData?.image}
          pixelSize={6}
          width={650}
          height={650}
          centered={true}
        />
      </MainContainer>
      <Text>{paintingData?.title}</Text>
      <Text>{paintingData?.year}</Text>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={userInput}
          id="outlined-basic"
          label="Guess last name"
          variant="outlined"
          type="text"
          onChange={inputTextHandler}
          inputProps={{
            maxLength: 25,
          }}
        />
        <Button variant="contained" size="large">
          Submit answer
        </Button>
        <Link to="/info">See Info</Link>
      </Box>
    </Styled>
  );
}

export default Main;
