import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { type FC, type KeyboardEvent, useState } from "react"
import { addPlayer, removePlayer } from "@/lib/games/wizard/wizard.actions"
import {
  selectPlayer,
  selectPlayerIds,
} from "@/lib/games/wizard/wizard.selectors"
import type { UUID } from "@/lib/games/wizard/wizard.types"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/lib/games/wizard/wizard-store"

interface PlayerManagementDialogProps {
  open: boolean
  onClose: () => void
}

export const PlayerManagementDialog: FC<PlayerManagementDialogProps> = ({
  open,
  onClose,
}) => {
  const [newPlayerName, setNewPlayerName] = useState("")
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
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Players</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack gap={2}>
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
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}

interface PlayerRowProps {
  playerId: UUID
  onRemove: (playerId: UUID) => void
}

const PlayerRow: FC<PlayerRowProps> = ({ playerId, onRemove }) => {
  const player = useWizardSelector(selectPlayer(playerId))

  return (
    <Stack
      component={Paper}
      variant={"outlined"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={1}
    >
      <Typography>{player.name}</Typography>
      <IconButton
        size="small"
        onClick={() => onRemove(playerId)}
        color="error"
        title="Remove player"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  )
}
