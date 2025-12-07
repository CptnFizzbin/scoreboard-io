import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import { Button, IconButton, Stack, TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { type FC, type KeyboardEvent, useState } from "react"
import { DealerChip } from "@/games/wizard/players/dealer-chip"
import {
  addPlayer,
  removePlayer,
  setDealer,
} from "@/games/wizard/wizard.actions"
import {
  selectDealer,
  selectPlayer,
  selectPlayerIds,
} from "@/games/wizard/wizard.selectors"
import type { UUID } from "@/games/wizard/wizard.types"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/games/wizard/wizard-store"

export const Route = createFileRoute("/games/wizard/players")({
  component: RouteComponent,
})

function RouteComponent() {
  const [newPlayerName, setNewPlayerName] = useState("")
  const navigate = useNavigate({ from: "/games/wizard" })
  const dispatch = useWizardDispatch()
  const playerIds = useWizardSelector(selectPlayerIds)

  const onAddPlayer = () => {
    if (newPlayerName.trim()) {
      dispatch(addPlayer({ id: crypto.randomUUID(), name: newPlayerName }))
      setNewPlayerName("")
    }
  }

  const onRemovePlayer = (playerId: UUID) => {
    dispatch(removePlayer({ id: playerId }))
  }

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onAddPlayer()
    }
  }

  return (
    <Stack gap={2} padding={2}>
      <Stack>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate({ to: "/games/wizard" })}
          >
            Back
          </Button>
        </Box>
      </Stack>
      {playerIds.length === 0 ? (
        <Typography
          sx={{ textAlign: "center", py: 2, color: "text.secondary" }}
        >
          No players yet. Add one to get started!
        </Typography>
      ) : (
        <Stack gap={1} sx={{ overflowX: "auto" }}>
          {Array.from(playerIds).map((playerId) => (
            <PlayerRow
              key={playerId}
              playerId={playerId}
              onRemove={onRemovePlayer}
            />
          ))}
        </Stack>
      )}

      <Stack direction="row" gap={1}>
        <TextField
          label="Player Name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyUp={onKeyPress}
          fullWidth
          size="small"
          placeholder="Enter player name"
        />
        <Button
          variant="contained"
          onClick={onAddPlayer}
          disabled={!newPlayerName.trim()}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Stack>
    </Stack>
  )
}

interface PlayerRowProps {
  playerId: UUID
  onRemove: (playerId: UUID) => void
}

const PlayerRow: FC<PlayerRowProps> = ({ playerId, onRemove }) => {
  const player = useWizardSelector(selectPlayer(playerId))
  const isDealer = useWizardSelector(selectDealer) === playerId
  const dispatch = useWizardDispatch()

  return (
    <Stack
      component={Paper}
      variant={"outlined"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={1}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Typography>{player.name}</Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        {isDealer ? (
          <DealerChip />
        ) : (
          <Button onClick={() => dispatch(setDealer({ playerId }))}>
            Make Dealer
          </Button>
        )}
        <IconButton
          size="small"
          onClick={() => onRemove(playerId)}
          color="error"
          title="Remove player"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  )
}
