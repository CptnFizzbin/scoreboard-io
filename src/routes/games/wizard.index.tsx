import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Stack, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { type MouseEvent, useState } from "react"
import { LeaderboardButton } from "@/games/wizard/leaderboard/leaderboard-button"
import { PlayerList } from "@/games/wizard/players/player-list"
import { EndRoundButton } from "@/games/wizard/round/end-round-button"
import {
  selectCurrentRound,
  selectPlayerIds,
  selectTotalBids,
} from "@/games/wizard/wizard.selectors"
import { WizardMenu } from "@/games/wizard/wizard-menu"
import { useWizardSelector } from "@/games/wizard/wizard-store"

export const Route = createFileRoute("/games/wizard/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const navigate = useNavigate({ from: "/games/wizard" })
  const round = useWizardSelector(selectCurrentRound)
  const totalBids = useWizardSelector(selectTotalBids)
  const numPlayers = useWizardSelector(selectPlayerIds).length

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  return (
    <Stack gap={2} padding={2}>
      <Stack direction={"row"} gap={1} justifyContent={"flex-end"}>
        <LeaderboardButton />

        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        <WizardMenu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        />
      </Stack>

      {numPlayers < 3 ? (
        <>
          <Paper component={Stack} padding={2} alignItems="center">
            <Typography>Not enough players to start</Typography>
          </Paper>
          <Button
            variant={"contained"}
            onClick={() => navigate({ to: "players" })}
          >
            Manage Players
          </Button>
        </>
      ) : (
        <>
          <Paper component={Stack} padding={2} alignItems="center">
            <Typography variant="h5">Round {round}</Typography>
            <Typography variant="subtitle2">
              Bidding {totalBids} for {round}
            </Typography>
          </Paper>

          <PlayerList />

          <EndRoundButton />
        </>
      )}
    </Stack>
  )
}
