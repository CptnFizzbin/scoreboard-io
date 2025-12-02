import { SvgIcon } from "@mui/material"
import { forwardRef } from "react"
import type { FontAwesomeIconData } from "@/integrations/font-awesome/font-awesome-icon-data"

interface FontAwesomeSvgIconProps {
  icon: FontAwesomeIconData
}

export const FontAwesomeSvgIcon = forwardRef<
  SVGSVGElement,
  FontAwesomeSvgIconProps
>((props, ref) => {
  const { icon } = props

  const {
    icon: [width, height, , , svgPathData],
  } = icon

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === "string" ? (
        <path d={svgPathData} />
      ) : (
        svgPathData.map((d: string, i: number) => (
          // biome-ignore lint/correctness/useJsxKeyInIterable: No unique key available for paths
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  )
})
