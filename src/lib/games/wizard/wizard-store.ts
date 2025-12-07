import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { wizardReducer } from "@/lib/games/wizard/wizard.reducer"

export function createWizardStore () {
  const persistedReducer = persistReducer(
    {
      key: "game.wizard",
      storage,
    },
    wizardReducer,
  )

  const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  })

  const persistor = persistStore(store)
  return { store, persistor }
}

export type WizardStore = ReturnType<typeof createWizardStore>["store"]
export type WizardState = ReturnType<WizardStore["getState"]>
export type WizardDispatch = WizardStore["dispatch"]

export const useWizardDispatch = useDispatch.withTypes<WizardDispatch>()
export const useWizardSelector = useSelector.withTypes<WizardState>()
