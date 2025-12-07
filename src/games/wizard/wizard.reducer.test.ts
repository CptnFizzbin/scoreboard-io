import { beforeEach, describe, expect, it } from "vitest"
import * as actions from "@/games/wizard/wizard.actions"
import { wizardReducer } from "@/games/wizard/wizard.reducer"
import { selectHistoryForRound } from "@/games/wizard/wizard.selectors"
import type {
  RoundHistory,
  UUID,
  WizardState,
} from "@/games/wizard/wizard.types"

describe("wizardReducer", () => {
  let state: WizardState
  let aliceId: UUID
  let bobId: UUID
  let charlieId: UUID

  beforeEach(() => {
    aliceId = crypto.randomUUID()
    bobId = crypto.randomUUID()
    charlieId = crypto.randomUUID()

    state = {
      round: 0,
      dealer: null,
      players: {},
      history: [],
    }

    state = wizardReducer(
      state,
      actions.addPlayer({ id: aliceId, name: "Alice" }),
    )
    state = wizardReducer(state, actions.addPlayer({ id: bobId, name: "Bob" }))
    state = wizardReducer(
      state,
      actions.addPlayer({ id: charlieId, name: "Charlie" }),
    )
  })

  describe("initial state", () => {
    it("should return the initial state", () => {
      const initialState = wizardReducer(undefined, { type: "unknown" })
      expect(initialState).toEqual({
        round: 1,
        dealer: null,
        players: {},
        history: [],
      })
    })
  })

  describe("addPlayer action", () => {
    let davidId: UUID
    let ericId: UUID

    beforeEach(() => {
      davidId = crypto.randomUUID()
      ericId = crypto.randomUUID()
    })

    it("should add a new player to the game", () => {
      state = wizardReducer(
        state,
        actions.addPlayer({ id: davidId, name: "David" }),
      )

      expect(Object.keys(state.players)).toHaveLength(4)

      const player = state.players[davidId]
      expect(player.name).toBe("David")
      expect(player.score).toBe(0)
      expect(player.tricks).toBe(0)
      expect(player.bid).toBe(0)
    })

    it("should add multiple players", () => {
      state = wizardReducer(
        state,
        actions.addPlayer({ id: davidId, name: "David" }),
      )
      state = wizardReducer(
        state,
        actions.addPlayer({ id: ericId, name: "Eric" }),
      )
      expect(Object.keys(state.players)).toHaveLength(5)

      const david = state.players[davidId]
      expect(david.name).toBe("David")

      const eric = state.players[ericId]
      expect(eric.name).toBe("Eric")
    })

    it("should use the provided ID for each player", () => {
      state = wizardReducer(
        state,
        actions.addPlayer({ id: davidId, name: "David" }),
      )
      state = wizardReducer(
        state,
        actions.addPlayer({ id: ericId, name: "Eric" }),
      )

      expect(state.players[davidId]).toBeDefined()
      expect(state.players[ericId]).toBeDefined()
      expect(state.players[davidId].id).toBe(davidId)
      expect(state.players[ericId].id).toBe(ericId)
    })

    it("should preserve existing players when adding a new one", () => {
      state = wizardReducer(
        state,
        actions.addPlayer({ id: davidId, name: "David" }),
      )
      expect(state.players[aliceId].name).toBe("Alice")
    })
  })

  describe("removePlayer action", () => {
    it("should remove a player from the game", () => {
      state = wizardReducer(state, actions.removePlayer({ id: aliceId }))

      expect(Object.keys(state.players)).toHaveLength(2)
      expect(state.players[aliceId]).toBeUndefined()
    })

    it("should handle removing a non-existent player gracefully", () => {
      const nonExistentId = crypto.randomUUID()
      const newState = wizardReducer(
        state,
        actions.removePlayer({ id: nonExistentId }),
      )

      expect(newState).toEqual(state)
    })

    it("should remove only the specified player", () => {
      state = wizardReducer(state, actions.removePlayer({ id: bobId }))

      expect(Object.keys(state.players)).toHaveLength(2)
      expect(state.players[aliceId]).not.toBeUndefined()
      expect(state.players[bobId]).toBeUndefined()
      expect(state.players[charlieId]).not.toBeUndefined()
    })
  })

  describe("startNewGame action", () => {
    it("should initialize a new game with round 1", () => {
      state = { ...state, round: 5 }
      state = wizardReducer(state, actions.startNewGame())
      expect(state.round).toBe(1)
    })

    it("should clear the history when starting a new game", () => {
      state = { ...state, history: [1, 2, 3, 4] as unknown as RoundHistory[] }
      state = wizardReducer(state, actions.startNewGame())
      expect(state.history).toHaveLength(0)
    })

    it("should reset all player scores, bids, and tricks", () => {
      const alice = state.players[aliceId]

      state = {
        ...state,
        players: {
          ...state.players,
          [aliceId]: {
            ...alice,
            bid: 5,
            tricks: 3,
            score: 100,
          },
        },
      }

      state = wizardReducer(state, actions.startNewGame())

      expect(state.players[aliceId].bid).toBe(0)
      expect(state.players[aliceId].tricks).toBe(0)
      expect(state.players[aliceId].score).toBe(0)
    })

    it("should set the first player as dealer when no dealer is set", () => {
      state = wizardReducer(state, actions.startNewGame())
      const playerIds = Object.keys(state.players)
      expect(state.dealer).toBe(playerIds[0])
    })

    it("should rotate dealer when starting a new game", () => {
      state = wizardReducer(state, actions.startNewGame())
      expect(state.dealer).toBe(aliceId)

      state = wizardReducer(state, actions.startNewGame())
      expect(state.dealer).toBe(bobId)
    })
  })

  describe("setBid action", () => {
    it("should set a player bid", () => {
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 5 }),
      )
      expect(state.players[aliceId].bid).toBe(5)
    })

    it("should allow bid of 0", () => {
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 0 }),
      )
      expect(state.players[aliceId].bid).toBe(0)
    })

    it("should update an existing bid", () => {
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 3 }),
      )
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 7 }),
      )
      expect(state.players[aliceId].bid).toBe(7)
    })

    it("should not affect other players bids", () => {
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 5 }),
      )
      state = wizardReducer(state, actions.setBid({ playerId: bobId, bid: 3 }))

      expect(state.players[aliceId].bid).toBe(5)
      expect(state.players[bobId].bid).toBe(3)
    })

    it("should allow high bid values", () => {
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 100 }),
      )
      expect(state.players[aliceId].bid).toBe(100)
    })
  })

  describe("setTricks action", () => {
    it("should set a player tricks count", () => {
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 3 }),
      )
      expect(state.players[aliceId].tricks).toBe(3)
    })

    it("should allow tricks of 0", () => {
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 0 }),
      )
      expect(state.players[aliceId].tricks).toBe(0)
    })

    it("should update an existing tricks count", () => {
      state = wizardReducer(
        state,
        actions.addPlayer({ id: aliceId, name: "Alice" }),
      )

      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 2 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 5 }),
      )

      expect(state.players[aliceId].tricks).toBe(5)
    })

    it("should not affect other players tricks", () => {
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 4 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: bobId, tricks: 2 }),
      )

      expect(state.players[aliceId].tricks).toBe(4)
      expect(state.players[bobId].tricks).toBe(2)
    })

    it("should allow high tricks values", () => {
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 50 }),
      )
      expect(state.players[aliceId].tricks).toBe(50)
    })
  })

  describe("endRound action", () => {
    it("should increment the round number", () => {
      state = wizardReducer(state, actions.startNewGame())
      expect(state.round).toBe(1)

      state = wizardReducer(state, actions.endRound())
      expect(state.round).toBe(2)
    })

    it("should add entry to history", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(state, actions.endRound())

      expect(Object.values(state.history)).toHaveLength(1)
    })

    it("should calculate score correctly when bid equals tricks", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 5 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 5 }),
      )
      state = wizardReducer(state, actions.endRound())

      const history = selectHistoryForRound(1)(state)
      expect(history[aliceId].score).toBe(70) // 20 + 5 * 10
    })

    it("should calculate score correctly when bid exceeds tricks", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 5 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 3 }),
      )
      state = wizardReducer(state, actions.endRound())

      const history = selectHistoryForRound(1)(state)
      expect(history[aliceId].score).toBe(-20) // -(5 - 3) * 10
    })

    it("should calculate score correctly when tricks exceed bid", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 2 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 6 }),
      )
      state = wizardReducer(state, actions.endRound())

      const history = selectHistoryForRound(1)(state)
      expect(history[aliceId].score).toBe(-40) // -(6 - 2) * 10
    })

    it("should accumulate score across multiple rounds", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 3 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 3 }),
      )
      state = wizardReducer(state, actions.endRound())

      const scoreAfterRound1 = state.players[aliceId].score

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 2 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 2 }),
      )
      state = wizardReducer(state, actions.endRound())

      const scoreAfterRound2 = state.players[aliceId].score

      expect(scoreAfterRound2).toBeGreaterThan(scoreAfterRound1)
    })

    it("should reset bid and tricks to 0 after round ends", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 5 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 4 }),
      )
      state = wizardReducer(state, actions.endRound())

      expect(state.players[aliceId].bid).toBe(0)
      expect(state.players[aliceId].tricks).toBe(0)
    })

    it("should rotate dealer after round ends", () => {
      state = wizardReducer(state, actions.startNewGame())

      const dealerBeforeRound = state.dealer
      state = wizardReducer(state, actions.endRound())

      expect(state.dealer).not.toBe(dealerBeforeRound)
    })

    it("should handle multiple players in endRound", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 2 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 2 }),
      )
      state = wizardReducer(state, actions.setBid({ playerId: bobId, bid: 3 }))
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: bobId, tricks: 1 }),
      )
      state = wizardReducer(
        state,
        actions.setBid({ playerId: charlieId, bid: 1 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: charlieId, tricks: 1 }),
      )
      state = wizardReducer(state, actions.endRound())

      expect(state.players[aliceId].score).toBe(40)
      expect(state.players[bobId].score).toBe(-20)
      expect(state.players[charlieId].score).toBe(30)
    })

    it("should preserve all history entries when multiple rounds are played", () => {
      state = wizardReducer(state, actions.startNewGame())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 1 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 1 }),
      )
      state = wizardReducer(state, actions.endRound())

      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 2 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 2 }),
      )
      state = wizardReducer(state, actions.endRound())

      expect(Object.values(state.history)).toHaveLength(2)
      expect(state.history[1][aliceId].bid).toBe(1)
      expect(state.history[2][aliceId].bid).toBe(2)
    })

    describe("dealer rotation", () => {
      it("should rotate dealer in a circular fashion", () => {
        state = wizardReducer(state, actions.startNewGame())

        const dealers: (UUID | null)[] = [state.dealer]

        state = wizardReducer(state, actions.endRound())
        dealers.push(state.dealer)

        state = wizardReducer(state, actions.endRound())
        dealers.push(state.dealer)

        state = wizardReducer(state, actions.endRound())
        dealers.push(state.dealer)

        // Should cycle back to first player
        expect(dealers[3]).toBe(dealers[0])
      })

      it("should handle single player dealer rotation", () => {
        state = { ...state, players: {} }
        state = wizardReducer(
          state,
          actions.addPlayer({ id: aliceId, name: "Alice" }),
        )

        state = wizardReducer(state, actions.startNewGame())
        expect(state.dealer).toBe(aliceId)

        state = wizardReducer(state, actions.endRound())
        expect(state.dealer).toBe(aliceId)
      })
    })

    describe("score calculation edge cases", () => {
      it("should handle bid of 0 with tricks of 0", () => {
        state = wizardReducer(state, actions.startNewGame())

        state = wizardReducer(
          state,
          actions.setBid({ playerId: aliceId, bid: 0 }),
        )
        state = wizardReducer(
          state,
          actions.setTricks({ playerId: aliceId, tricks: 0 }),
        )

        state = wizardReducer(state, actions.endRound())

        expect(state.players[aliceId].score).toBe(20)
        const history = selectHistoryForRound(1)(state)
        expect(history[aliceId].score).toBe(20) // 20 + 0 * 10
      })

      it("should handle large bid and tricks values", () => {
        state = wizardReducer(state, actions.startNewGame())

        state = wizardReducer(
          state,
          actions.setBid({ playerId: aliceId, bid: 100 }),
        )
        state = wizardReducer(
          state,
          actions.setTricks({ playerId: aliceId, tricks: 100 }),
        )

        state = wizardReducer(state, actions.endRound())

        expect(state.players[aliceId].score).toBe(1020)
        const history = selectHistoryForRound(1)(state)
        expect(history[aliceId].score).toBe(1020) // 20 + 100 * 10
      })

      it("should handle negative score progression", () => {
        state = wizardReducer(state, actions.startNewGame())

        state = wizardReducer(
          state,
          actions.setBid({ playerId: aliceId, bid: 10 }),
        )
        state = wizardReducer(
          state,
          actions.setTricks({ playerId: aliceId, tricks: 0 }),
        )
        state = wizardReducer(state, actions.endRound())

        expect(state.players[aliceId].score).toBe(-100)

        state = wizardReducer(
          state,
          actions.setBid({ playerId: aliceId, bid: 10 }),
        )
        state = wizardReducer(
          state,
          actions.setTricks({ playerId: aliceId, tricks: 0 }),
        )
        state = wizardReducer(state, actions.endRound())

        expect(state.players[aliceId].score).toBe(-200)
      })
    })
  })

  describe("complex game scenarios", () => {
    it("should handle a complete multi-round game", () => {
      state = wizardReducer(state, actions.startNewGame())
      expect(state.round).toBe(1)

      // Round 1
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 2 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 2 }),
      )
      state = wizardReducer(state, actions.setBid({ playerId: bobId, bid: 1 }))
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: bobId, tricks: 0 }),
      )
      state = wizardReducer(state, actions.endRound())

      expect(state.round).toBe(2)
      expect(Object.values(state.history)).toHaveLength(1)
      expect(state.players[aliceId].score).toBe(40)
      expect(state.players[bobId].score).toBe(-10)

      // Round 2
      state = wizardReducer(
        state,
        actions.setBid({ playerId: aliceId, bid: 1 }),
      )
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: aliceId, tricks: 1 }),
      )
      state = wizardReducer(state, actions.setBid({ playerId: bobId, bid: 2 }))
      state = wizardReducer(
        state,
        actions.setTricks({ playerId: bobId, tricks: 2 }),
      )
      state = wizardReducer(state, actions.endRound())

      expect(state.round).toBe(3)
      expect(Object.values(state.history)).toHaveLength(2)
      expect(state.players[aliceId].score).toBe(70)
      expect(state.players[bobId].score).toBe(30)
    })

    it("should handle adding and removing players between games", () => {
      state = wizardReducer(state, actions.startNewGame())
      state = wizardReducer(state, actions.endRound())

      const davidId = crypto.randomUUID()
      state = wizardReducer(
        state,
        actions.addPlayer({ id: davidId, name: "David" }),
      )

      state = wizardReducer(state, actions.startNewGame())
      expect(state.players[davidId].score).toBe(0)
    })
  })
})
