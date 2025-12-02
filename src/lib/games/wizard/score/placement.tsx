import { faCrown } from "@fortawesome/free-solid-svg-icons/faCrown"
import { useTheme } from "@mui/material"
import Stack from "@mui/material/Stack"
import type { FC } from "react"
import { FontAwesomeSvgIcon } from "@/integrations/font-awesome/font-awesome-svg-icon"
import { selectPlayerStanding } from "@/lib/games/wizard/score/score.selectors"
import { useWizardSelector } from "@/lib/games/wizard/wizard-store"
import { toOrdinal } from "@/lib/numberUtils"

interface PlacementProps {
  playerId: string
  podiumOnly?: boolean
}

export const Placement: FC<PlacementProps> = ({ playerId, podiumOnly }) => {
  const standing = useWizardSelector(selectPlayerStanding(playerId))
  const color = usePlacementColour(standing)

  if (podiumOnly && standing >= 4) return null

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ color: color }}
    >
      {standing < 4 && <FontAwesomeSvgIcon icon={faCrown} />}
      {toOrdinal(standing)}
    </Stack>
  )
}

function usePlacementColour(placement: number): string {
  const theme = useTheme()

  switch (placement) {
    case 1:
      return "#FFD700"
    case 2:
      return "#C0C0C0"
    case 3:
      return "#CD7F32"
    default:
      return theme.palette.grey[600]
  }
}
