import { Dialog, DialogActions, DialogContent, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { type FC, useState } from "react"
import { endRound } from "@/lib/games/wizard/wizard.actions"
import {
  selectCurrentRound,
  selectTotalTricks,
} from "@/lib/games/wizard/wizard.selectors"
import {
  useWizardDispatch,
  useWizardSelector,
} from "@/lib/games/wizard/wizard-store"

export const EndRoundButton: FC = () => {
  const dispatch = useWizardDispatch()
  const [checkDialogOpen, setCheckDialogOpen] = useState(false)

  const round = useWizardSelector(selectCurrentRound)
  const totalTricks = useWizardSelector(selectTotalTricks)
  const tricksDelta = totalTricks - round

  const onClick = () => {
    if (totalTricks !== round) {
      setCheckDialogOpen(true)
    } else {
      dispatch(endRound())
    }
  }

  return (
    <>
      <Button variant="outlined" onClick={onClick} fullWidth>
        End Round
      </Button>

      <Dialog open={checkDialogOpen} onClose={() => setCheckDialogOpen(false)}>
        <DialogContent>
          <Typography>
            {tricksDelta > 0 ? (
              <>{Math.abs(tricksDelta)} extra tricks</>
            ) : (
              <>{Math.abs(tricksDelta)} missing tricks</>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckDialogOpen(false)} fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
