import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { FC } from "react"
import { BidCounter } from "@/lib/games/wizard/bids/bid-counter"
import { selectPlayerStats } from "@/lib/games/wizard/players/player.selectors"
import { ScoreCounter } from "@/lib/games/wizard/score/score-counter"
import { TricksCounter } from "@/lib/games/wizard/tricks/tricks-counter"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"

interface PlayerCardProps {
  playerId: string
}

export const PlayerCard: FC<PlayerCardProps> = ({ playerId }) => {
  const stats = useWizardSelector(selectPlayerStats(playerId))

  return (
    <Paper>
      <Stack gap={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={1}
          paddingBottom={0}
        >
          <Box>
            <Typography variant="body2" color="textSecondary">
              Player
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {stats.player.name}
            </Typography>
          </Box>

          <ScoreCounter playerId={playerId} />
        </Stack>

        <Divider />

        <Stack
          direction="row"
          justifyContent={"space-around"}
          gap={1}
          padding={1}
          paddingTop={0}
        >
          <Paper component={Box} flexGrow={1} variant={"outlined"}>
            <BidCounter playerId={playerId} />
          </Paper>
          <Paper component={Box} flexGrow={1} variant={"outlined"}>
            <TricksCounter playerId={playerId} />
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  )
}
