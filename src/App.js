import React, { createContext, useContext, useEffect, useState } from "react";
const pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export default function App() {
  const handleClick = (index) => {
    //if (gameOver) return;

    if (tiles[index] === "") {
      let arr = [...tiles];
      arr[index] = term;
      setTiles(arr);
      setTerm(term === "O" ? "X" : "O");
      setPrevious(index);
    }
  };
  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [term, setTerm] = useState("X");
  const [previous, setPrevious] = useState(-1);
  const arrayOfTiles = tiles.map((tile, index) => (
    <Block current={tile} onTileSelect={() => handleClick(index)} key = {index}/>
  ));

  const headerDOM = ()=>{
    let winner = isGameOver(previous, tiles);
    if (!winner)
      return <h1>{term + "'s term"}</h1>


    if (winner === 'X' || winner === 'O')
      return <h1>{winner + ' wins'}</h1>;
    else
      return <h1>Tie</h1>;
  }
  return (
    <>
      {headerDOM()}
      <div className="container">{arrayOfTiles}</div>
    </>
  );
}

function isGameOver(index, tiles) {
  const checkPattern = pattern.filter((element) => {
    return element.find((indexVal) => indexVal === index);
  }); //returning patterns matches the index

  let status= '';
  checkPattern.forEach((element) => {
    let isBingo = true;
    for (let i = 0; i < element.length - 1; i++) {
      if (tiles[element[i]] != tiles[element[i + 1]]) {
        isBingo = false;
        break; //exit loop
      }
    }

    if (isBingo) {
      status= tiles[index];
      return;
    }
  });
  if (status != '')
    return status;
  else if (tiles.filter(element => element === '').length === 0)
    return true;
  return false; //if gone through the entire array and not found.
}
function Block(props) {
  return (
    <div className="block" onClick={props.onTileSelect}>
      {props.current}
    </div>
  );
}
