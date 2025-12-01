import { createReducer } from "@reduxjs/toolkit"
import { addPlayer, removePlayer } from "@/lib/games/wizard/players/players.actions"
import { setScore } from "@/lib/games/wizard/score/score.actions"

export const scoreReducer = createReducer(
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

    addCase(setScore, (state, action) => {
      const playerId = action.payload.playerId
      state[playerId] = action.payload.value
    })
  },
)
