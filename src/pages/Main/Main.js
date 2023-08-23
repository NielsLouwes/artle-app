/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Pixelify } from "react-pixelify";
import { usePaintingData } from "../../utils/usePaintingData";import { MainContainer, Styled, Text } from "./Main.styled";
;

function Main() {
  const [userInput, setUserInput] = useState("");

  const { paintingData, loading, fetchData } = usePaintingData();

  let navigate = useNavigate();

  const artistName = paintingData?.artist?.split(" ");
  const lastName = artistName?.pop().toLowerCase();

  const inputTextHandler = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

 const playGame = (e) => {
  e.preventDefault(); // Prevent the default form behavior
  if (userInput.toLowerCase() === lastName) {
    alert('You win!');
    navigate(`/info`);
    return;
  }
  alert('Wrong answer!');
  navigate(`/info`);
  setUserInput("");
};

  return (
    <Styled>
      <MainContainer>
        {loading && <Text>Loading...</Text>} 
        <Pixelify
          src={paintingData?.image}
          pixelSize={6}
          width={500}
          height={500}
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
        onSubmit={playGame}
      >
        <TextField
          value={userInput}
          id="outlined-basic"
          label="Guess last name"
          variant="outlined"
          autocomplete="off"
          type="text"
          onChange={inputTextHandler}
          inputProps={{
            maxLength: 25,
          }}
        />
        <Button type="submit" variant="contained" size="large" style={{backgroundColor: "black" , width: "125px", fontSize: "12px", height: "100px;"}}>
          Submit answer
        </Button>
        <Link to="/info">See Info</Link>
      </Box>
    </Styled>
  );
}

export default Main;
