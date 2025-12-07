import Stack from "@mui/material/Stack"
import type { FC } from "react"
import { PlayerCard } from "@/lib/games/wizard/players/player-card"
import { selectPlayerIds } from "@/lib/games/wizard/wizard.selectors"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"

export const PlayerList: FC = () => {
  const playerIds = useWizardSelector(selectPlayerIds)

  return (
    <Stack gap={2}>
      {Array.from(playerIds).map((playerId) => (
        <PlayerCard key={playerId} playerId={playerId} />
      ))}
    </Stack>
  )
}
