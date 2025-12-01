import { createAction } from "@reduxjs/toolkit"
import type { Player } from "@/lib/games/wizard/players/player"

export const setScore = createAction(
  "game/wizard/score/set",
  (playerId: Player["id"], value: number) => {
    return {
      payload: { playerId, value },
    }
  },
)
