import React from "react"
import styled from "styled-components"
import { useMutation } from "@apollo/client"
import { UPDATE_WON, UPDATE_LOST } from "../queries/queries"
import EmojiRain from "./EmojiRain"

const HeadToHeadStyles = styled.div`
  display: flex;
  padding: 100px 30px;
  justify-content: space-around;
  text-align: center;
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 400px;
    margin: auto;
    padding: 80px 30px;
  }
  .head-to-head_player {
    @media (max-width: 768px) {
      &:first-child {
        margin-bottom: 100px;
      }
    }
    h1 {
      margin-bottom: 20px;
    }
    .head-to-head_player_buttons {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  }
`

export default function HeadToHead({ players }) {
  const [scores, setScores] = React.useState({
    playerOneScore: 0,
    playerTwoScore: 0,
  })
  const [updateWon] = useMutation(UPDATE_WON)
  const [updateLost] = useMutation(UPDATE_LOST)

  function decPlayerOneScore() {
    if (scores.playerOneScore > 0) {
      setScores({ ...scores, playerOneScore: scores.playerOneScore - 1 })
    }
  }

  function incPlayerOneScore() {
    if (typeof scores.playerOneScore == "number") {
      setScores({ ...scores, playerOneScore: scores.playerOneScore + 1 })
    }
  }

  function decPlayerTwoScore() {
    if (scores.playerTwoScore > 0) {
      setScores({ ...scores, playerTwoScore: scores.playerTwoScore - 1 })
    }
  }

  function incPlayerTwoScore() {
    if (typeof scores.playerOneScore == "number") {
      setScores({ ...scores, playerTwoScore: scores.playerTwoScore + 1 })
    }
  }

  React.useEffect(() => {
    if (scores.playerOneScore >= 11 && scores.playerTwoScore < 10) {
      setScores({ playerOneScore: "Winner", playerTwoScore: "Loser" })
    } else if (scores.playerTwoScore >= 11 && scores.playerOneScore < 10) {
      setScores({ playerOneScore: "Loser", playerTwoScore: "Winner" })
    } else if (scores.playerOneScore >= 10 && scores.playerTwoScore >= 10) {
      scores.playerOneScore > scores.playerTwoScore + 1
        ? setScores({ playerOneScore: "Winner", playerTwoScore: "Loser" })
        : scores.playerTwoScore > scores.playerOneScore + 1 &&
          setScores({ playerOneScore: "Loser", playerTwoScore: "Winner" })
    }
  }, [scores])

  React.useEffect(() => {
    if (scores.playerOneScore === "Winner") {
      updateWon({
        variables: { id: players.playerOne.id },
      })
      updateLost({
        variables: { id: players.playerTwo.id },
      })
    } else if (scores.playerTwoScore === "Winner") {
      updateWon({
        variables: { id: players.playerTwo.id },
      })
      updateLost({
        variables: { id: players.playerOne.id },
      })
    }
  }, [scores])

  return (
    <>
      {typeof scores.playerOneScore === "string" && <EmojiRain />}
      <HeadToHeadStyles>
        <div className="head-to-head_player">
          <h1>{players.playerOne.name}</h1>
          <div className="head-to-head_player_buttons">
            <button onClick={decPlayerOneScore}>-</button>
            <h2>{scores.playerOneScore}</h2>
            <button onClick={incPlayerOneScore}>+</button>
          </div>
        </div>
        <div className="head-to-head_player">
          <h1>{players.playerTwo.name}</h1>
          <div className="head-to-head_player_buttons">
            <button onClick={decPlayerTwoScore}>-</button>
            <h2>{scores.playerTwoScore}</h2>
            <button onClick={incPlayerTwoScore}>+</button>
          </div>
        </div>
      </HeadToHeadStyles>
    </>
  )
}
