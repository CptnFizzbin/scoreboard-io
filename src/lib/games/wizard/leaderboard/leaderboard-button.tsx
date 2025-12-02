import { EmojiEvents as LeaderboardIcon } from "@mui/icons-material"
import { Button } from "@mui/material"
import { type FC, useState } from "react"
import { LeaderboardDialog } from "@/lib/games/wizard/leaderboard/leaderboard-dialog"

export const LeaderboardButton: FC = () => {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<LeaderboardIcon />}
        onClick={() => setLeaderboardOpen(true)}
      >
        Show Leaderboard
      </Button>

      <LeaderboardDialog
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />
    </>
  )
}
