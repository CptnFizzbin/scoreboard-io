import { createSelector } from "reselect"
import { selectBid } from "@/lib/games/wizard/bids/bids.selectors"
import type { Player } from "@/lib/games/wizard/players/player"
import { selectScore } from "@/lib/games/wizard/score/score.selectors"
import { selectTricks } from "@/lib/games/wizard/tricks/tricks.selectors"
import type { WizardState } from "../wizard-store"

const selectAllPlayers = (state: WizardState) => state.players

export const selectPlayerIds = createSelector([selectAllPlayers], (players) =>
  Object.keys(players),
)

export const selectPlayer = (playerId: Player["id"]) => {
  return (state: WizardState) => {
    const player = state.players[playerId]
    if (!player) throw new Error(`Player with id ${playerId} not found`)
    return player
  }
}

export const selectPlayerStats = (playerId: string) => {
  return createSelector(
    [
      selectPlayer(playerId),
      selectScore(playerId),
      selectBid(playerId),
      selectTricks(playerId),
    ],
    (player, score, bid, tricks) => {
      return {
        player,
        score,
        bid,
        tricks,
      }
    },
  )
}
