import type { FC, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { addPlayer } from "@/lib/games/wizard/players/players.actions"
import { createWizardStore } from "@/lib/games/wizard/wizard-store"

const wizardStore = createWizardStore()
wizardStore.dispatch(addPlayer({ name: "Alice" }))
wizardStore.dispatch(addPlayer({ name: "Bob" }))
wizardStore.dispatch(addPlayer({ name: "Charlie" }))
wizardStore.dispatch(addPlayer({ name: "David" }))

export const WizardStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={wizardStore}>{children}</Provider>
}
