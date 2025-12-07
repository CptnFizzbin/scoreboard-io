import { Group as GroupIcon } from "@mui/icons-material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Menu, MenuItem, Stack, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { type FC, useState } from "react"
import { LeaderboardButton } from "@/games/wizard/leaderboard/leaderboard-button"
import { PlayerList } from "@/games/wizard/players/player-list"
import { PlayerManagementDialog } from "@/games/wizard/players/player-management-dialog"
import { EndRoundButton } from "@/games/wizard/round/end-round-button"
import { startNewGame } from "@/games/wizard/wizard.actions"
import {
  selectCurrentRound,
  selectTotalBids,
} from "@/games/wizard/wizard.selectors"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/games/wizard/wizard-store"
import { WizardStoreProvider } from "@/games/wizard/wizard-store-provider"

const WizardGameContent: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const dispatch = useWizardDispatch()
  const round = useWizardSelector(selectCurrentRound)
  const totalBids = useWizardSelector(selectTotalBids)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleNewGame = () => {
    dispatch(startNewGame())
    handleMenuClose()
  }

  const handleManagePlayers = () => {
    setDialogOpen(true)
    handleMenuClose()
  }

  return (
    <Stack gap={2} padding={2}>
      <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
        <LeaderboardButton />

        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleNewGame}>
            <PlayArrowIcon sx={{ mr: 1 }} />
            New Game
          </MenuItem>
          <MenuItem onClick={handleManagePlayers}>
            <GroupIcon sx={{ mr: 1 }} />
            Manage Players
          </MenuItem>
        </Menu>
      </Stack>

      <Paper sx={{ padding: 2 }}>
        <Stack alignItems={"center"}>
          <Typography variant="h5">Round {round}</Typography>
          <Typography variant="subtitle2">
            Bidding {totalBids} for {round}
          </Typography>
        </Stack>
      </Paper>

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
