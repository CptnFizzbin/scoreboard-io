import { createAction } from "@reduxjs/toolkit"
import type { Player } from "@/lib/games/wizard/players/player"

export const setTricks = createAction(
  "game/wizard/tricks/set",
  (playerId: Player["id"], value: number) => {
    return {
      payload: { playerId, value },
    }
  },
)
