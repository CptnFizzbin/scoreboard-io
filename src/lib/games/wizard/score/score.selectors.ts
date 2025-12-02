import { createSelector } from "reselect"
import type { WizardState } from "@/lib/games/wizard/wizard-store"

export const selectAllScores = (state: WizardState) => state.score

export const selectPlayerScore = (playerId: string) => {
  return (state: WizardState) => {
    return state.score[playerId] || 0
  }
}

export const selectLeaderboard = createSelector([selectAllScores], (score) => {
  return Object.entries(score)
    .sort(([_playerA, scoreA], [_playerB, scoreB]) => {
      return scoreB - scoreA
    })
    .map(([playerId]) => playerId)
})

export const selectPlayerStanding = (playerId: string) => {
  return createSelector([selectLeaderboard], (leaderboard) => {
    return leaderboard.indexOf(playerId) + 1
  })
}
