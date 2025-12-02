import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { FC } from "react"
import { selectAllPlayers } from "@/lib/games/wizard/players/player.selectors"
import { Placement } from "@/lib/games/wizard/score/placement"
import {
  selectAllScores,
  selectLeaderboard,
} from "@/lib/games/wizard/score/score.selectors"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"

interface LeaderboardDialogProps {
  open: boolean
  onClose: () => void
}

export const LeaderboardDialog: FC<LeaderboardDialogProps> = ({
  open,
  onClose,
}) => {
  const players = useWizardSelector(selectAllPlayers)
  const scores = useWizardSelector(selectAllScores)
  const leaderboard = useWizardSelector(selectLeaderboard)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Leaderboard</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack gap={2}>
          {leaderboard.map((playerId) => (
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

              <Typography>{scores[playerId] || 0}</Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
