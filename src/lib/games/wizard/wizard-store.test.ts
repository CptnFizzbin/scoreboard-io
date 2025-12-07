import { beforeEach, describe, expect, it } from "vitest"
import {
  endRound,
  setBid,
  setPlayers,
  setTricks,
  startNewGame,
} from "@/lib/games/wizard/wizard.actions"
import { selectPlayer } from "@/lib/games/wizard/wizard.selectors"
import type { UUID } from "@/lib/games/wizard/wizard.types"
import {
  createWizardStore,
  type WizardStore,
} from "@/lib/games/wizard/wizard-store"

describe("Wizard Store", () => {
  let store: WizardStore

  let aliceId: UUID
  let bobId: UUID

  beforeEach(() => {
    aliceId = crypto.randomUUID()
    bobId = crypto.randomUUID()

    store = createWizardStore().store
    store.dispatch(
      setPlayers([
        { id: aliceId, name: "Alice" },
        { id: bobId, name: "Bob" },
      ]),
    )
  })

  describe("roundEnd", () => {
    it("should handle round end logic correctly", () => {
      store.dispatch(startNewGame())
      store.dispatch(setBid({ playerId: aliceId, bid: 1 }))
      store.dispatch(setTricks({ playerId: aliceId, tricks: 1 }))
      store.dispatch(setBid({ playerId: bobId, bid: 2 }))
      store.dispatch(setTricks({ playerId: bobId, tricks: 1 }))
      store.dispatch(endRound())

      const state = store.getState()
      expect(state.round).toBe(2)

      const aliceStats = selectPlayer(aliceId)(state)
      expect(aliceStats.bid).toBe(0)
      expect(aliceStats.tricks).toBe(0)
      expect(aliceStats.score).toBe(30)

      const bobStats = selectPlayer(bobId)(state)
      expect(bobStats.bid).toBe(0)
      expect(bobStats.tricks).toBe(0)
      expect(bobStats.score).toBe(-10)
    })
  })
})
