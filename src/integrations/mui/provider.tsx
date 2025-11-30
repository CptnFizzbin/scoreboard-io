import { ThemeProvider } from "@mui/material"
import type { FC, PropsWithChildren } from "react"
import Mui from "@/integrations/mui"

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={Mui.themes.darkTheme}>{children}</ThemeProvider>
}
