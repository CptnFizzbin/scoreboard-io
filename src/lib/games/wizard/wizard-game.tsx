import { Group as GroupIcon } from "@mui/icons-material"
import { Button, Stack } from "@mui/material"
import { type FC, useState } from "react"
import { PlayerList } from "@/lib/games/wizard/players/player-list"
import { PlayerManagementDialog } from "@/lib/games/wizard/players/player-management-dialog"
import { WizardStoreProvider } from "@/lib/games/wizard/wizard-store-provider"

export const WizardGame: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <WizardStoreProvider>
      <Stack gap={2} padding={2}>
        <Button
          variant="outlined"
          startIcon={<GroupIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Manage Players
        </Button>

        <PlayerList />
      </Stack>
      <PlayerManagementDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </WizardStoreProvider>
  )
}
