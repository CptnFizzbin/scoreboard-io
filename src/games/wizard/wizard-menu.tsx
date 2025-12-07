import { Group as GroupIcon } from "@mui/icons-material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Menu, MenuItem, type MenuProps } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import type { FC } from "react"
import { startNewGame } from "@/games/wizard/wizard.actions"
import { useWizardDispatch } from "@/games/wizard/wizard-store"

interface WizardMenuProps extends MenuProps {
  onClose: () => void
}

export const WizardMenu: FC<WizardMenuProps> = (props) => {
  const dispatch = useWizardDispatch()
  const navigate = useNavigate({ from: "/games/wizard" })

  const onNewGame = () => {
    dispatch(startNewGame())
    props.onClose()
  }

  const onManagePlayers = () => {
    navigate({ to: "players" })
    props.onClose()
  }

  return (
    <Menu {...props}>
      <MenuItem onClick={onNewGame}>
        <PlayArrowIcon sx={{ marginRight: 1 }} />
        New Game
      </MenuItem>
      <MenuItem onClick={onManagePlayers}>
        <GroupIcon sx={{ marginRight: 1 }} />
        Manage Players
      </MenuItem>
    </Menu>
  )
}
