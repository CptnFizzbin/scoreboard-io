import { sort } from "fast-sort"
import type { UUID } from "@/lib/games/wizard/wizard.types"

export interface LeaderboardRow {
  playerId: UUID
  placement: number
  score: number
}

export interface Leaderboard {
  getPlacement(playerId: UUID): number

  map<Return>(mapFn: (row: LeaderboardRow) => Return): Return[]
}

export function createLeaderboard(
  players: { id: UUID; score: number }[],
): Leaderboard {
  const playersByScore = sort(players).by([{ desc: (player) => player.score }])

  return {
    getPlacement(playerId: UUID): number {
      const player = players.find((player) => player.id === playerId)
      if (!player) return -1

      const index = playersByScore.findIndex(
        (row) => row.score === player.score,
      )
      if (index === -1) return -1
      return index + 1
    },

    map(mapFn) {
      return playersByScore.map((player) => {
        return mapFn({
          playerId: player.id,
          placement: this.getPlacement(player.id),
          score: player.score,
        })
      })
    },
  }
}
