import type { FC } from "react"
import { PlayerList } from "@/lib/games/wizard/players/player-list"
import { WizardStoreProvider } from "@/lib/games/wizard/wizard-store-provider"

export const WizardGame: FC = () => {
  return (
    <WizardStoreProvider>
      <PlayerList />
    </WizardStoreProvider>
  )
}
