import { beforeEach, describe, expect, it } from "vitest"
import { setBid } from "@/lib/games/wizard/bids/bids.actions"
import type { Player } from "@/lib/games/wizard/players/player"
import { selectPlayerStats } from "@/lib/games/wizard/players/player.selectors"
import { setPlayers } from "@/lib/games/wizard/players/players.actions"
import { setTricks } from "@/lib/games/wizard/tricks/tricks.actions"
import { endRound } from "@/lib/games/wizard/wizard.actions"
import { createWizardStore, type WizardStore } from "@/lib/games/wizard/wizard-store"

describe("Wizard Store", () => {
  let store: WizardStore
  let playerAlice: Player
  let playerBob: Player

  beforeEach(() => {
    playerAlice = { id: "player-alice", name: "Alice" }
    playerBob = { id: "player-bob", name: "Bob" }

    store = createWizardStore()
    store.dispatch(setPlayers([playerAlice, playerBob]))
  })

  describe("roundEnd", () => {
    it("should handle round end logic correctly", () => {
      store.dispatch(setBid(playerAlice.id, 1))
      store.dispatch(setTricks(playerAlice.id, 1))
      store.dispatch(setBid(playerBob.id, 2))
      store.dispatch(setTricks(playerBob.id, 1))
      store.dispatch(endRound())

      const state = store.getState()
      expect(state.round).toBe(1)

      const aliceStats = selectPlayerStats(playerAlice.id)(state)
      expect(aliceStats.bid).toBe(0)
      expect(aliceStats.tricks).toBe(0)
      expect(aliceStats.score).toBe(30)

      const bobStats = selectPlayerStats(playerBob.id)(state)
      expect(bobStats.bid).toBe(0)
      expect(bobStats.tricks).toBe(0)
      expect(bobStats.score).toBe(-10)
    })
  })
})
