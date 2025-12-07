import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { FC } from "react"
import { Placement } from "@/games/wizard/score/placement"
import {
  selectLeaderboard,
  selectPlayers,
} from "@/games/wizard/wizard.selectors"
import { useWizardSelector } from "@/games/wizard/wizard-store"

interface LeaderboardDialogProps {
  open: boolean
  onClose: () => void
}

export const LeaderboardDialog: FC<LeaderboardDialogProps> = ({
  open,
  onClose,
}) => {
  const players = useWizardSelector(selectPlayers)
  const leaderboard = useWizardSelector(selectLeaderboard)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Leaderboard</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack gap={2}>
          {leaderboard.map(({ playerId, score }) => (
            <Stack
              direction={"row"}
              key={playerId}
              gap={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                direction="row"
                gap={2}
                alignItems={"center"}
                sx={{ minWidth: 250 }}
              >
                <Placement playerId={playerId} />
                <Typography>{players[playerId].name}</Typography>
              </Stack>

              <Typography>{score}</Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
