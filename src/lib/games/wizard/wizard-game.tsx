import { Group as GroupIcon } from "@mui/icons-material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Box, Button, Stack, Typography } from "@mui/material"
import { type FC, useState } from "react"
import { selectTotalBids } from "@/lib/games/wizard/bids/bids.selectors"
import { PlayerList } from "@/lib/games/wizard/players/player-list"
import { PlayerManagementDialog } from "@/lib/games/wizard/players/player-management-dialog"
import { EndRoundButton } from "@/lib/games/wizard/round/end-round-button"
import { selectCurrentRound } from "@/lib/games/wizard/round/round.selectors"
import { startNewGame } from "@/lib/games/wizard/wizard.actions"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/lib/games/wizard/wizard-store"
import { WizardStoreProvider } from "@/lib/games/wizard/wizard-store-provider"

const WizardGameContent: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const dispatch = useWizardDispatch()
  const round = useWizardSelector(selectCurrentRound)
  const totalBids = useWizardSelector(selectTotalBids)

  return (
    <Stack gap={2} padding={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography variant="h5">Round {round}</Typography>
          <Typography variant="subtitle2">
            Bidding {totalBids} for {round}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Button
            variant="outlined"
            startIcon={<PlayArrowIcon />}
            onClick={() => dispatch(startNewGame())}
          >
            New Game
          </Button>
          <Button
            variant="outlined"
            startIcon={<GroupIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Manage Players
          </Button>
        </Stack>
      </Box>

      <PlayerList />

      <EndRoundButton />

      <PlayerManagementDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Stack>
  )
}

export const WizardGame: FC = () => {
  return (
    <WizardStoreProvider>
      <WizardGameContent />
    </WizardStoreProvider>
  )
}
