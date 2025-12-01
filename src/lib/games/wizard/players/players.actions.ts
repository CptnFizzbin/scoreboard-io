import { createAction } from "@reduxjs/toolkit"
import type { Player } from "@/lib/games/wizard/players/player.ts"

export const setPlayers = createAction<Player[]>("players/setPlayers")

export const addPlayer = createAction(
  "players/addPlayer",
  (player: Omit<Player, "id">): { payload: Player } => {
    return {
      payload: {
        id: crypto.randomUUID(),
        ...player,
      },
    }
  },
)
export const removePlayer = createAction<Pick<Player, "id">>(
  "players/removePlayer",
)
