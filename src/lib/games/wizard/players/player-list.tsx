import Stack from "@mui/material/Stack"
import type { FC } from "react"
import { selectPlayerIds } from "@/lib/games/wizard/players/player.selectors"
import { PlayerCard } from "@/lib/games/wizard/players/player-card"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"

export const PlayerList: FC = () => {
  const playerIds = useWizardSelector(selectPlayerIds)

  return (
    <Stack gap={2} padding={2}>
      {Array.from(playerIds).map((playerId) => (
        <PlayerCard key={playerId} playerId={playerId} />
      ))}
    </Stack>
  )
}
