import Box from "@mui/material/Box"
import { createFileRoute } from "@tanstack/react-router"
import { WizardGame } from "@/lib/games/wizard/wizard-game"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <WizardGame />
    </Box>
  )
}
