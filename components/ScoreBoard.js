import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import styled from "styled-components"
import { motion } from "framer-motion"
import {
  GET_SCOREBOARD,
  ADD_PLAYER,
  DELETE_PLAYER,
  UPDATE_WON,
  UPDATE_LOST,
  RESET_SCORES,
} from "../queries/queries"

const LeaderboardStyles = styled.div`
  width: 100%;
  align-items: flex-end;
  padding: 30px;
  overflow: scroll;
  .leaderboard_player {
    width: 300px;
    padding: 15px 0;
    transition: 0.5s ease margin;
    h3 {
      margin-bottom: 10px;
    }
  }
`

const ControlStyles = styled.div`
  display: flex;
  padding: 30px;
  form {
    input {
      outline: none;
      border: 1px solid black;
      padding: 10px 15px;
      border-radius: 25px;
      width: 200px;
    }
  }
`

export default function ScoreBoard() {
  const [name, setName] = React.useState("")
  const { data, loading, error } = useQuery(GET_SCOREBOARD)
  const [addPlayer] = useMutation(ADD_PLAYER, {
    onCompleted: () => setName(""),
  })
  const [deletePlayer] = useMutation(DELETE_PLAYER)
  const [updateWon] = useMutation(UPDATE_WON)
  const [updateLost] = useMutation(UPDATE_LOST)
  const [resetScores] = useMutation(RESET_SCORES)

  async function handleAddPlayer(e) {
    e.preventDefault()
    if (!name.trim()) return
    await addPlayer({
      variables: { name: name },
      refetchQueries: [
        {
          query: GET_SCOREBOARD,
        },
      ],
    })
  }

  async function handleDeletePlayer({ id }) {
    const isConfirmed = window.confirm("Do you want to delete this player?")
    if (isConfirmed) {
      await deletePlayer({
        variables: { id },
        update: (cache) => {
          const prevData = cache.readQuery({ query: GET_SCOREBOARD })
          const newPlayers = prevData.players.filter(
            (player) => player.id !== id
          )
          cache.writeQuery({
            query: GET_SCOREBOARD,
            data: { players: newPlayers },
          })
        },
      })
    }
  }

  async function handleUpdateWon({ id }) {
    await updateWon({
      variables: { id },
    })
  }

  async function handleUpdateLost({ id }) {
    await updateLost({
      variables: { id },
    })
  }

  async function handleResetScores() {
    await resetScores()
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
    return <h2>Error fetching data :(</h2>
  }

  return (
    <>
      <LeaderboardStyles>
        {data?.players.map((p, i) => {
          return (
            <motion.div
              key={p.id}
              className="leaderboard_player"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * i }}
              style={{ marginLeft: p.won * 100 }}
            >
              <h3 onDoubleClick={() => handleDeletePlayer(p)}>{p?.name}</h3>
              <p>
                <button onClick={() => handleUpdateWon(p)}>
                  Won: {p?.won}
                </button>{" "}
                |{" "}
                <button onClick={() => handleUpdateLost(p)}>
                  Lost: {p?.lost}
                </button>
              </p>
            </motion.div>
          )
        })}
      </LeaderboardStyles>
      <ControlStyles>
        <form onSubmit={handleAddPlayer}>
          <input
            type="text"
            value={name}
            placeolder="Add player to leaderboard"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" style={{ marginRight: 20 }}>
            Add Name
          </button>
        </form>
        <button onClick={handleResetScores}>Reset Scores</button>
      </ControlStyles>
    </>
  )
}
