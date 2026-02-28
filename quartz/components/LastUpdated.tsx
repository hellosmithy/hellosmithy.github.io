import { FullSlug, resolveRelative } from "../util/path"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const LastUpdated: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  if (!fileData.dates) return null
  const date = fileData.dates.modified ?? getDate(cfg, fileData)!
  const tags = fileData.frontmatter?.tags

  return (
    <p class="last-updated">
      Last updated <Date date={date} locale={cfg.locale} />
      {tags && tags.length > 0 && (
        <>
          {tags.map((tag) => {
            const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
            return (
              <>
                {<span class="delimiter"> · </span>}
                <a href={linkDest} class="internal tag-link">
                  {tag}
                </a>
              </>
            )
          })}
        </>
      )}
    </p>
  )
}

export default (() => LastUpdated) satisfies QuartzComponentConstructor
