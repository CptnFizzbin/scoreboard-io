import { createAction } from "@reduxjs/toolkit"
import { createThunkFactory } from "@/integrations/redux/create-thunk-factory"
import { startNewRound } from "@/lib/games/wizard/round/round.actions"
import { setScore } from "@/lib/games/wizard/score/score.actions"
import type {
  WizardDispatch,
  WizardState,
} from "@/lib/games/wizard/wizard-store"

const createThunk = createThunkFactory<WizardDispatch, WizardState>()

export const startNewGame = createAction("game/wizard/newGame")

export const endRound = createThunk((dispatch, getState) => {
  const { players, bids, tricks, score } = getState()

  for (const player of Object.values(players)) {
    const playerBid = bids[player.id] || 0
    const playerTricks = tricks[player.id] || 0
    let playerScore = score[player.id] || 0

    if (playerBid === playerTricks) {
      playerScore += 20 + playerBid * 10
    } else {
      playerScore -= Math.abs(playerBid - playerTricks) * 10
    }

    dispatch(setScore(player.id, playerScore))
  }

  dispatch(startNewRound())
})
