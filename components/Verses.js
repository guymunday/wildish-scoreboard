import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { GET_SCOREBOARD } from "../queries/queries"
import HeadToHead from "./HeadToHead"
import { motion, AnimatePresence } from "framer-motion"

const FlexBox = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px;
`

const VStyles = styled(FlexBox)`
  flex-direction: column;
  div {
    padding: 10px;
  }
`

export default function Verses() {
  const [players, setPlayers] = React.useState({
    playerOne: {
      name: "",
      id: "",
    },
    playerTwo: {
      name: "",
      id: "",
    },
  })
  const { data, loading, error } = useQuery(GET_SCOREBOARD)

  function handleUpdatePlayers(p) {
    if (players.playerOne.id === "") {
      setPlayers({
        playerOne: {
          name: p.name,
          id: p.id,
        },
        playerTwo: {
          name: "",
          id: "",
        },
      })
    } else if (players.playerOne.id !== "") {
      setPlayers({
        ...players,
        playerTwo: {
          name: p.name,
          id: p.id,
        },
      })
    }
  }

  function resetPlayers() {
    setPlayers({
      playerOne: {
        name: "",
        id: "",
      },
      playerTwo: {
        name: "",
        id: "",
      },
    })
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
      <FlexBox>
        <h2>
          <span>{players.playerOne.name}</span> VS{" "}
          <span>{players.playerTwo.name}</span>
        </h2>
      </FlexBox>
      {!players.playerTwo.id ? (
        <VStyles>
          {data?.players.map((p, i) => {
            return (
              <>
                <AnimatePresence>
                  {players.playerOne.id !== p.id && (
                    <motion.div
                      initial={{ scale: 0.2 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={p.id}
                      className="verses_player-click"
                    >
                      <button onClick={() => handleUpdatePlayers(p)}>
                        {p?.name}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )
          })}
        </VStyles>
      ) : (
        <HeadToHead players={players} />
      )}
      <FlexBox>
        <button onClick={resetPlayers}>Reset</button>
      </FlexBox>
    </>
  )
}
