import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Mui from "@/integrations/mui"
import TanstackQuery from "@/integrations/tanstack-query"
import TanstackRouter from "@/integrations/tanstack-router"

import reportWebVitals from "./reportWebVitals.ts"
import "./index.scss"

// Render the app
const rootElement = document.getElementById("app")
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Mui.Provider>
        <TanstackQuery.Provider>
          <TanstackRouter.Provider />
        </TanstackQuery.Provider>
      </Mui.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
