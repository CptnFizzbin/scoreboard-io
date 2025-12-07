import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { FC } from "react"
import { BidCounter } from "@/lib/games/wizard/bids/bid-counter"
import { Placement } from "@/lib/games/wizard/score/placement"
import { ScoreCounter } from "@/lib/games/wizard/score/score-counter"
import { TricksCounter } from "@/lib/games/wizard/tricks/tricks-counter"
import { selectDealer, selectPlayer } from "@/lib/games/wizard/wizard.selectors"
import type { UUID } from "@/lib/games/wizard/wizard.types"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"
import { Chip } from "@mui/material"

interface PlayerCardProps {
  playerId: UUID
}

export const PlayerCard: FC<PlayerCardProps> = ({ playerId }) => {
  const player = useWizardSelector(selectPlayer(playerId))
  const isDealer = useWizardSelector(selectDealer) === player.id

  return (
    <Paper>
      <Stack gap={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          padding={1}
          paddingBottom={0}
        >
          <Stack gap={2} direction={"row"}>
            <Placement playerId={playerId} />

            <Box>
              <Stack direction={"row"} gap={1}>
                <Typography variant="body2" color="textSecondary">
                  Player
                </Typography>

                {isDealer && (
                  <Chip label={"Dealer"} size={"small"} color={"info"} />
                )}
              </Stack>
              <Typography variant="h6" fontWeight="bold">
                {player.name}
              </Typography>
            </Box>
          </Stack>

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
