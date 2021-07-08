import { gql } from "@apollo/client"

export const GET_SCOREBOARD = gql`
  query Scoreboard {
    players(order_by: { name: asc }) {
      id
      name
      won
      lost
    }
  }
`
export const ADD_PLAYER = gql`
  mutation AddPlayer($name: String!) {
    insert_players(objects: { name: $name }) {
      returning {
        id
        name
        won
        lost
      }
    }
  }
`

export const DELETE_PLAYER = gql`
  mutation DeletePlayer($id: uuid!) {
    delete_players(where: { id: { _eq: $id } }) {
      returning {
        id
        name
        won
        lost
      }
    }
  }
`

export const UPDATE_WON = gql`
  mutation UpdateWon($id: uuid!) {
    update_players(where: { id: { _eq: $id } }, _inc: { won: 1 }) {
      returning {
        id
        name
        won
        lost
      }
    }
  }
`

export const UPDATE_LOST = gql`
  mutation UpdateLost($id: uuid!) {
    update_players(where: { id: { _eq: $id } }, _inc: { lost: 1 }) {
      returning {
        id
        name
        won
        lost
      }
    }
  }
`

export const RESET_SCORES = gql`
  mutation Reset {
    update_players(
      where: { id: { _is_null: false } }
      _set: { won: 0, lost: 0 }
    ) {
      returning {
        won
        name
        lost
        id
      }
    }
  }
`