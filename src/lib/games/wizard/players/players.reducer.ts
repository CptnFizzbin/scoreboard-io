import { createReducer } from "@reduxjs/toolkit"
import type { Player } from "@/lib/games/wizard/players/player.ts"
import {
  addPlayer,
  removePlayer,
  setPlayers,
} from "@/lib/games/wizard/players/players.actions.ts"

export const playersReducer = createReducer(
  {} as Record<string, Player>,
  ({ addCase }) => {
    addCase(setPlayers, (_state, action) => {
      const state: Record<string, Player> = {}

      action.payload.forEach((player) => {
        state[player.id] = player
      })

      return state
    })

    addCase(addPlayer, (state, action) => {
      state[action.payload.id] = action.payload
    })

    addCase(removePlayer, (state, action) => {
      delete state[action.payload.id]
    })
  },
)
