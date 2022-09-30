import { useState, useEffect } from "react";
import "./index.scss";

export default function Gobang() {
  const [mode, setMode] = useState("single");
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [squareArr, setSquareArr] = useState(new Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const WIN_RESULT = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
  ];

  const changeMode = (e) => {
    setMode(e.target.value);
    clearBoard();
  };
  const getWinner = () => {
    for (let i = 0; i < WIN_RESULT.length; i++) {
      const [a, b, c] = WIN_RESULT[i];
      if (
        squareArr[a] &&
        squareArr[a] === squareArr[b] &&
        squareArr[a] === squareArr[c]
      ) {
        return squareArr[a];
      }
    }
    return "";
  };
  const handleWin = (notWinFun) => {
    let win = getWinner();
    if (win) {
      setWinner(win);
      console.log("win: ", win);
    } else {
      if (notWinFun) {
        notWinFun();
      }
    }
  };
  const handlePlay = (index) => {
    if (!winner) {
      squareArr[index] = currentPlayer;
      setSquareArr([...squareArr]);
      handleWin(() => {
        if (mode === "single") {
          autoPlay(currentPlayer);
          handleWin();
        } else {
          setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
        }
      });
    }
  };

  const autoPlay = (currentPlayer) => {
    let randomIndexArr = [];
    for (let i = 0; i < squareArr.length; i++) {
      if (squareArr[i] === "") {
        randomIndexArr.push(i);
      }
    }
    let randomIndex =
      randomIndexArr[Math.floor(Math.random() * randomIndexArr.length)];
    let playTimer = setTimeout(() => {
        squareArr[randomIndex] = currentPlayer === "x" ? "o" : "x";
        setSquareArr([...squareArr]);
        clearTimeout(playTimer)
    }, 1000)
  };

  const clearBoard = () => {
    squareArr.fill("");
    setSquareArr([...squareArr]);
    setCurrentPlayer("x");
    setWinner("");
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <div className="gobang">
      <div>
        <label htmlFor="mode">Mode</label>
        <input
          type="radio"
          name="mode"
          value="single"
          checked={mode === "single"}
          onChange={changeMode}
        />
        Single
        <input
          type="radio"
          name="mode"
          value="double"
          checked={mode === "double"}
          onChange={changeMode}
        />
        Double
      </div>
      <div className="currentPlayer">Current Player: {currentPlayer}</div>
      <div className="board">
        {squareArr.map((square, index) => {
          return (
            <Square
              player={square}
              handlePlay={handlePlay.bind(this, index)}
              key={index}
            />
          );
        })}
      </div>
      <button onClick={clearBoard}>Clear</button>
      <div className="winner">Winner: {winner}</div>
    </div>
  );
}

const Square = (props) => {
  const handleChange = () => {
    if (props.player === "") {
      props.handlePlay();
    }
  };
  return (
    <div className="square" onClick={handleChange}>
      {props.player}
    </div>
  );
};
