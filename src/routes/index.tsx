import { Box, Container, Stack, Typography, useTheme } from "@mui/material"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          paddingTop: { xs: 4, md: 8 },
          paddingBottom: { xs: 4, md: 8 },
        }}
      >
        <Stack spacing={4} sx={{ marginBottom: 8 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                marginBottom: 2,
                color: theme.palette.primary.main,
                fontSize: { xs: "2rem", md: "3.5rem" },
              }}
            >
              SCOREBOARD IO
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
