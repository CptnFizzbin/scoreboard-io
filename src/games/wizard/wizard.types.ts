export type UUID = ReturnType<typeof crypto.randomUUID>

export interface WizardState {
  round: number
  dealer: UUID | null
  players: {
    [playerId: UUID]: Player
  }
  history: {
    [round: number]: RoundHistory
  }
}

export interface Player {
  id: UUID
  name: string
  bid: number
  tricks: number
  score: number
}

export interface RoundHistory {
  [playerId: UUID]: {
    bid: number
    tricks: number
    score: number
  }
}
