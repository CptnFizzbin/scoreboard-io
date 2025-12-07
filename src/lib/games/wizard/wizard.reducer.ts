import { createReducer } from "@reduxjs/toolkit"
import * as actions from "@/lib/games/wizard/wizard.actions"
import type {
  Player,
  RoundHistory,
  UUID,
  WizardState,
} from "@/lib/games/wizard/wizard.types"

const defaultState: WizardState = {
  round: 1,
  dealer: null,
  players: {},
  history: [],
}

export const wizardReducer = createReducer(defaultState, ({ addCase }) => {
  addCase(actions.setPlayers, (state, { payload }) => {
    const players: Player[] = payload.map((player) => ({
      id: player.id,
      name: player.name,
      score: 0,
      tricks: 0,
      bid: 0,
    }))

    state.players = Object.fromEntries(
      players.map((player) => [player.id, player]),
    )
  })

  addCase(actions.addPlayer, (state, { payload }) => {
    state.players[payload.id] = {
      id: payload.id,
      name: payload.name,
      score: 0,
      tricks: 0,
      bid: 0,
    }
  })

  addCase(actions.removePlayer, (state, { payload }) => {
    delete state.players[payload.id]
  })

  addCase(actions.startNewGame, (state) => {
    state.round = 1
    state.history = []

    for (const player of Object.values(state.players)) {
      player.bid = 0
      player.tricks = 0
      player.score = 0
    }

    state.dealer = getNextDealer(state)
  })

  addCase(actions.setBid, (state, { payload }) => {
    state.players[payload.playerId].bid = payload.bid
  })

  addCase(actions.setTricks, (state, { payload }) => {
    state.players[payload.playerId].tricks = payload.tricks
  })

  addCase(actions.endRound, (state) => {
    const history: RoundHistory = {}

    for (const player of Object.values(state.players)) {
      const { bid, tricks } = player
      const score = calcPlayerScore(player)

      history[player.id] = { bid, tricks, score }

      player.bid = 0
      player.tricks = 0
      player.score = score
    }

    state.history[state.round] = history

    state.round += 1
    state.dealer = getNextDealer(state)
  })
})

function getNextDealer (state: WizardState): UUID {
  const playerIds = Object.values(state.players).map((player) => player.id)

  if (state.dealer === null) {
    return playerIds[0]
  }

  let nextDealerIndex = playerIds.indexOf(state.dealer) + 1
  if (nextDealerIndex >= playerIds.length) {
    nextDealerIndex = 0
  }

  return playerIds[nextDealerIndex]
}

function calcPlayerScore (player: Player): number {
  const { bid, tricks } = player
  let score = player.score

  if (bid === tricks) {
    score += 20 + bid * 10
  } else {
    score -= Math.abs(bid - tricks) * 10
  }

  return score
}
