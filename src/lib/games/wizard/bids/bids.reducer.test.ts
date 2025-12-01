import { beforeEach, describe, expect, it } from "vitest"
import { setBid } from "@/lib/games/wizard/bids/bids.actions"
import { bidsReducer } from "@/lib/games/wizard/bids/bids.reducer"
import type { Player } from "@/lib/games/wizard/players/player"
import { addPlayer, removePlayer } from "@/lib/games/wizard/players/players.actions"
import { startNewRound } from "@/lib/games/wizard/round/round.actions"

describe("bidsReducer", () => {
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
      state = bidsReducer(undefined, { type: "initialize" })
      expect(state).toEqual({})
    }))

  describe("addPlayer action", () => {
    it("should add a new player with default value when player is added", () => {
      state = bidsReducer(state, addPlayer(playerCharlie))

      expect(state[playerCharlie.id]).toBe(0)
    })
  })

  describe("removePlayer action", () => {
    it("should remove a player's bid when player is removed", () => {
      state = bidsReducer(state, removePlayer({ id: playerAlice.id }))

      expect(state[playerAlice.id]).toBeUndefined()
    })

    it("should only remove the specified player", () => {
      state = bidsReducer(state, removePlayer({ id: playerAlice.id }))

      expect(state[playerAlice.id]).toBeUndefined()
      expect(state[playerBob.id]).toBe(4)
    })
  })

  describe("setBid action", () => {
    it("should set a player's bid to a specified value", () => {
      state = bidsReducer(state, setBid(playerAlice.id, 3))
      expect(state[playerAlice.id]).toBe(3)
    })

    it("should set a bid to 0", () => {
      state = bidsReducer(state, setBid(playerAlice.id, 0))
      expect(state[playerAlice.id]).toBe(0)
    })

    it("should handle large bid values", () => {
      state = bidsReducer(state, setBid(playerAlice.id, 99))
      expect(state[playerAlice.id]).toBe(99)
    })
  })

  describe("startNewRound action", () => {
    it("should reset all players' bids to 0 on new round", () => {
      state = bidsReducer(state, startNewRound())

      expect(state[playerAlice.id]).toBe(0)
      expect(state[playerBob.id]).toBe(0)
    })
  })

  describe("complex scenarios", () => {
    it("should handle a complete game flow", () => {
      // Set bids for round 1
      state = bidsReducer(state, setBid(playerAlice.id, 2))
      state = bidsReducer(state, setBid(playerBob.id, 3))

      expect(state[playerAlice.id]).toBe(2)
      expect(state[playerBob.id]).toBe(3)

      // Start new round
      state = bidsReducer(state, startNewRound())

      expect(state[playerAlice.id]).toBe(0)
      expect(state[playerBob.id]).toBe(0)

      // Set bids for round 2
      state = bidsReducer(state, setBid(playerAlice.id, 1))
      state = bidsReducer(state, setBid(playerBob.id, 2))

      expect(state[playerAlice.id]).toBe(1)
      expect(state[playerBob.id]).toBe(2)
    })

    it("should handle adding and removing players during the game", () => {
      state = {}

      state = bidsReducer(state, addPlayer(playerAlice))
      state = bidsReducer(state, setBid(playerAlice.id, 3))
      expect(Object.keys(state).length).toBe(1)

      state = bidsReducer(state, addPlayer(playerBob))
      state = bidsReducer(state, setBid(playerBob.id, 4))
      expect(Object.keys(state).length).toBe(2)

      state = bidsReducer(state, removePlayer({ id: playerAlice.id }))
      expect(Object.keys(state).length).toBe(1)
      expect(state[playerAlice.id]).toBeUndefined()
      expect(state[playerBob.id]).toBe(4)
    })
  })
})
