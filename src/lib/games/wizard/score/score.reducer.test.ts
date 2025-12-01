import { beforeEach, describe, expect, it } from "vitest"
import type { Player } from "@/lib/games/wizard/players/player"
import {
  addPlayer,
  removePlayer,
} from "@/lib/games/wizard/players/players.actions"
import { setScore } from "@/lib/games/wizard/score/score.actions"
import { scoreReducer } from "@/lib/games/wizard/score/score.reducer"

describe("scoreReducer", () => {
  let state: Record<string, number>

  const playerAlice: Player = { id: "player-alice", name: "Alice" }
  const playerBob: Player = { id: "player-bob", name: "Bob" }
  const playerCharlie: Player = { id: "player-charlie", name: "Charlie" }

  beforeEach(() => {
    state = {
      [playerAlice.id]: 20,
      [playerBob.id]: 30,
    }
  })

  describe("initial state", () =>
    it("should return the initial state", () => {
      state = scoreReducer(undefined, { type: "initialize" })
      expect(state).toEqual({})
    }))

  describe("addPlayer action", () => {
    it("should add a new player with default value when player is added", () => {
      state = scoreReducer(state, addPlayer(playerCharlie))

      expect(state[playerCharlie.id]).toBe(0)
    })
  })

  describe("removePlayer action", () => {
    it("should remove a player's score when player is removed", () => {
      state = scoreReducer(state, removePlayer({ id: playerAlice.id }))

      expect(state[playerAlice.id]).toBeUndefined()
    })

    it("should only remove the specified player", () => {
      state = scoreReducer(state, removePlayer({ id: playerAlice.id }))

      expect(state[playerAlice.id]).toBeUndefined()
      expect(state[playerBob.id]).toBe(30)
    })
  })

  describe("setScore action", () => {
    it("should set a player's score to a specified value", () => {
      state = scoreReducer(state, setScore(playerAlice.id, 25))
      expect(state[playerAlice.id]).toBe(25)
    })

    it("should set a score to 0", () => {
      state = scoreReducer(state, setScore(playerAlice.id, 0))
      expect(state[playerAlice.id]).toBe(0)
    })

    it("should handle large score values", () => {
      state = scoreReducer(state, setScore(playerAlice.id, 999))
      expect(state[playerAlice.id]).toBe(999)
    })

    it("should handle negative score values", () => {
      state = scoreReducer(state, setScore(playerAlice.id, -10))
      expect(state[playerAlice.id]).toBe(-10)
    })
  })

  describe("complex scenarios", () => {
    it("should handle a complete game flow", () => {
      // Set scores for round 1
      state = scoreReducer(state, setScore(playerAlice.id, 20))
      state = scoreReducer(state, setScore(playerBob.id, 30))

      expect(state[playerAlice.id]).toBe(20)
      expect(state[playerBob.id]).toBe(30)

      // Update scores for round 2
      state = scoreReducer(state, setScore(playerAlice.id, 35))
      state = scoreReducer(state, setScore(playerBob.id, 50))

      expect(state[playerAlice.id]).toBe(35)
      expect(state[playerBob.id]).toBe(50)
    })

    it("should handle adding and removing players during the game", () => {
      state = {}

      state = scoreReducer(state, addPlayer(playerAlice))
      state = scoreReducer(state, setScore(playerAlice.id, 20))
      expect(Object.keys(state).length).toBe(1)

      state = scoreReducer(state, addPlayer(playerBob))
      state = scoreReducer(state, setScore(playerBob.id, 30))
      expect(Object.keys(state).length).toBe(2)

      state = scoreReducer(state, removePlayer({ id: playerAlice.id }))
      expect(Object.keys(state).length).toBe(1)
      expect(state[playerAlice.id]).toBeUndefined()
      expect(state[playerBob.id]).toBe(30)
    })
  })
})
