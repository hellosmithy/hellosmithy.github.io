import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const LastUpdated: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  if (!fileData.dates) return null
  const date = fileData.dates.modified ?? getDate(cfg, fileData)!
  return (
    <p class="last-updated">
      Last updated <Date date={date} locale={cfg.locale} />.
    </p>
  )
}

export default (() => LastUpdated) satisfies QuartzComponentConstructor
