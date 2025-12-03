import type { FC, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { createWizardStore } from "@/lib/games/wizard/wizard-store"

const { store, persistor } = createWizardStore()

export const WizardStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
