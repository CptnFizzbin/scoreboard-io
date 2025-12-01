import { createAction } from "@reduxjs/toolkit"
import type { Player } from "@/lib/games/wizard/players/player"

export const setBid = createAction(
  "game/wizard/bids/set",
  (playerId: Player["id"], value: number) => {
    return {
      payload: { playerId, value },
    }
  },
)
