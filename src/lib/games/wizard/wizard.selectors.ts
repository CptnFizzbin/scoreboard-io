import { createSelector } from "reselect"
import {
  createLeaderboard,
  type Leaderboard,
} from "@/lib/games/wizard/leaderboard/leaderboard"
import type { UUID, WizardState } from "@/lib/games/wizard/wizard.types"

export const selectCurrentRound = (state: WizardState) => state.round

export const selectPlayers = (state: WizardState) => state.players

export const selectPlayersArray = createSelector([selectPlayers], (players) =>
  Object.values(players),
)

export const selectPlayerIds = createSelector([selectPlayers], (players) =>
  Object.values(players).map((player) => player.id),
)

export const selectPlayer = (playerId: UUID) => {
  return (state: WizardState) => state.players[playerId]
}

export const selectDealer = (state: WizardState) => state.dealer

export const selectTotalBids = (state: WizardState) => {
  return Object.values(state.players)
    .map((player) => player.bid)
    .reduce((sum, bid) => sum + bid, 0)
}

export const selectTotalTricks = (state: WizardState) => {
  return Object.values(state.players)
    .map((player) => player.tricks)
    .reduce((sum, bid) => sum + bid, 0)
}

export const selectHistoryForRound = (round: number) => {
  return (state: WizardState) => state.history[round]
}

export const selectLeaderboard = createSelector(
  [selectPlayersArray],
  (players): Leaderboard => {
    return createLeaderboard(players)
  },
)

export const selectPlayerStanding = (playerId: UUID) => {
  return createSelector([selectLeaderboard], (leaderboard) => {
    return leaderboard.getPlacement(playerId)
  })
}
