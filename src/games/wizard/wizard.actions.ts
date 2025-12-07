import { createAction } from "@reduxjs/toolkit"
import type { UUID } from "@/games/wizard/wizard.types"

export const setPlayers =
  createAction<{ id: UUID; name: string }[]>("players/setPlayers")
export const addPlayer = createAction<{ id: UUID; name: string }>(
  "players/addPlayer",
)
export const removePlayer = createAction<{ id: UUID }>("players/removePlayer")

export const startNewGame = createAction("game/wizard/newGame")

export const setDealer = createAction<{ playerId: UUID }>(
  "game/wizard/setDealer",
)

export const setBid = createAction<{ playerId: UUID; bid: number }>(
  "game/wizard/setBid",
)
export const setTricks = createAction<{ playerId: UUID; tricks: number }>(
  "game/wizard/setTricks",
)

export const endRound = createAction("game/wizard/endRound")
