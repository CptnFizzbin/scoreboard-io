import { beforeEach, describe, expect, it } from "vitest"
import type { Player } from "@/lib/games/wizard/players/player"
import {
  addPlayer,
  removePlayer,
} from "@/lib/games/wizard/players/players.actions"
import { startNewRound } from "@/lib/games/wizard/round/round.actions"
import { setTricks } from "@/lib/games/wizard/tricks/tricks.actions"
import { tricksReducer } from "@/lib/games/wizard/tricks/tricks.reducer"

describe("ticksReducer", () => {
  let state: Record<string, number>
  const playerAlice: Player = { id: "player-alice", name: "Alice" }
  const playerBob: Player = { id: "player-bob", name: "Bob" }
  const playerCharlie: Player = { id: "player-charlie", name: "Charlie" }

  beforeEach(() => {
    state = {
      [playerAlice.id]: 3,
      [playerBob.id]: 4,
    }
  })

  describe("initial state", () =>
    it("should return the initial state", () => {
      state = tricksReducer(undefined, { type: "initialize" })
      expect(state).toEqual({})
    }))

  describe("addPlayer action", () => {
    it("should add a new player with default value when player is added", () => {
      state = tricksReducer(state, addPlayer(playerCharlie))

      expect(state[playerCharlie.id]).toBe(0)
    })
  })

  describe("removePlayer action", () => {
    it("should remove a player's bid when player is removed", () => {
      state = tricksReducer(state, removePlayer({ id: playerAlice.id }))

      expect(state[playerAlice.id]).toBeUndefined()
    })

    it("should only remove the specified player", () => {
      state = tricksReducer(state, removePlayer({ id: playerAlice.id }))

      expect(state[playerAlice.id]).toBeUndefined()
      expect(state[playerBob.id]).toBe(4)
    })
  })

  describe("setTricks action", () => {
    it("should set a player's bid to a specified value", () => {
      state = tricksReducer(state, setTricks(playerAlice.id, 3))
      expect(state[playerAlice.id]).toBe(3)
    })

    it("should set a bid to 0", () => {
      state = tricksReducer(state, setTricks(playerAlice.id, 0))
      expect(state[playerAlice.id]).toBe(0)
    })

    it("should handle large bid values", () => {
      state = tricksReducer(state, setTricks(playerAlice.id, 99))
      expect(state[playerAlice.id]).toBe(99)
    })
  })

  describe("startNewRound action", () => {
    it("should reset all players' bids to 0 on new round", () => {
      state = tricksReducer(state, startNewRound())

      expect(state[playerAlice.id]).toBe(0)
      expect(state[playerBob.id]).toBe(0)
    })
  })

  describe("complex scenarios", () => {
    it("should handle a complete game flow", () => {
      // Set bids for round 1
      state = tricksReducer(state, setTricks(playerAlice.id, 2))
      state = tricksReducer(state, setTricks(playerBob.id, 3))

      expect(state[playerAlice.id]).toBe(2)
      expect(state[playerBob.id]).toBe(3)

      // Start new round
      state = tricksReducer(state, startNewRound())

      expect(state[playerAlice.id]).toBe(0)
      expect(state[playerBob.id]).toBe(0)

      // Set bids for round 2
      state = tricksReducer(state, setTricks(playerAlice.id, 1))
      state = tricksReducer(state, setTricks(playerBob.id, 2))

      expect(state[playerAlice.id]).toBe(1)
      expect(state[playerBob.id]).toBe(2)
    })

    it("should handle adding and removing players during the game", () => {
      state = {}

      state = tricksReducer(state, addPlayer(playerAlice))
      state = tricksReducer(state, setTricks(playerAlice.id, 3))
      expect(Object.keys(state).length).toBe(1)

      state = tricksReducer(state, addPlayer(playerBob))
      state = tricksReducer(state, setTricks(playerBob.id, 4))
      expect(Object.keys(state).length).toBe(2)

      state = tricksReducer(state, removePlayer({ id: playerAlice.id }))
      expect(Object.keys(state).length).toBe(1)
      expect(state[playerAlice.id]).toBeUndefined()
      expect(state[playerBob.id]).toBe(4)
    })
  })
})
