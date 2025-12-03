import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { bidsReducer } from "@/lib/games/wizard/bids/bids.reducer"
import { playersReducer } from "@/lib/games/wizard/players/players.reducer.ts"
import { roundReducer } from "@/lib/games/wizard/round/round.reducer"
import { scoreReducer } from "@/lib/games/wizard/score/score.reducer"
import { tricksReducer } from "@/lib/games/wizard/tricks/tricks.reducer"

export function createWizardStore() {
  const rootReducer = combineReducers({
    players: playersReducer,
    round: roundReducer,
    bids: bidsReducer,
    tricks: tricksReducer,
    score: scoreReducer,
  })

  const persistedReducer = persistReducer(
    {
      key: "game.wizard",
      storage,
    },
    rootReducer,
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
