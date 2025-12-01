import { createReducer } from "@reduxjs/toolkit"
import { setBid } from "@/lib/games/wizard/bids/bids.actions"
import { addPlayer, removePlayer } from "@/lib/games/wizard/players/players.actions"
import { startNewRound } from "@/lib/games/wizard/round/round.actions"

export const bidsReducer = createReducer(
  {} as Record<string, number>,
  ({ addCase }) => {
    addCase(addPlayer, (state, action) => {
      const playerId = action.payload.id
      state[playerId] = 0
    })

    addCase(removePlayer, (state, action) => {
      const playerId = action.payload.id
      delete state[playerId]
    })

    addCase(startNewRound, (state) => {
      for (const playerId of Object.keys(state)) {
        state[playerId] = 0
      }
    })

    addCase(setBid, (state, action) => {
      const playerId = action.payload.playerId
      state[playerId] = action.payload.value
    })
  },
)
