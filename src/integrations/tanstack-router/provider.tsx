import { RouterProvider } from "@tanstack/react-router"
import type { FC } from "react"
import { router } from "./router"

export const Provider: FC = () => {
  return <RouterProvider router={router} />
}
