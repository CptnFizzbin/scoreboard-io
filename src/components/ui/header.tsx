import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import type { FC } from "react"

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          Scoreboard - Wizard
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
