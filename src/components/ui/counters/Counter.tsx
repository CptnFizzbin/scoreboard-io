import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import type { FC } from "react"

type CounterProps = {
  label: string
  value: number
} & (
  | {
      readonly?: false
      onPlusClick: () => void
      onMinusClick: () => void
    }
  | { readonly: true }
)

export const Counter: FC<CounterProps> = (props) => {
  const { label, value, readonly } = props

  return (
    <Stack alignItems="center" justifyContent={"center"}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        {!readonly && (
          <IconButton
            size="small"
            onClick={props.onMinusClick}
            aria-label="decrease"
          >
            <RemoveIcon />
          </IconButton>
        )}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ minWidth: "40px" }}
          textAlign={"center"}
        >
          {value}
        </Typography>
        {!readonly && (
          <IconButton
            size="small"
            onClick={props.onPlusClick}
            aria-label="increase"
          >
            <AddIcon />
          </IconButton>
        )}
      </Stack>
    </Stack>
  )
}
