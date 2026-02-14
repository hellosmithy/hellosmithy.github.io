import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

export function byDateAndAlphabeticalFolderFirst(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort folders first
    const f1IsFolder = isFolderPath(f1.slug ?? "")
    const f2IsFolder = isFolderPath(f2.slug ?? "")
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1

    // If both are folders or both are files, sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
  showDates?: boolean
} & QuartzComponentProps

function formatMonthYear(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, { month: "short", year: "numeric" })
}

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort, showDates }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  const dates = showDates !== false
  let lastMonthYear = ""

  return (
    <ul class={`section-ul ${dates ? "with-dates" : ""}`}>
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []
        const date = dates && page.dates ? getDate(cfg, page)! : undefined
        const monthYear = date ? formatMonthYear(date, cfg.locale) : ""
        const showMonth = monthYear !== lastMonthYear
        if (showMonth) lastMonthYear = monthYear

        return (
          <li class="section-li">
            <div class="section">
              {dates && (
                <div class="section-date">
                  {showMonth && monthYear && (
                    <span class="section-month">{monthYear}</span>
                  )}
                </div>
              )}
              <div class="section-content">
                <div class="desc">
                  <h3>
                    <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                      {title}
                    </a>
                  </h3>
                </div>
                <ul class="tags">
                  {tags.map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.with-dates .section {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 0.5rem;
}

.section h3 {
  margin: 0;
}

.section-date {
  padding-top: 0.1rem;
}

.section-month {
  font-family: var(--headerFont);
  font-style: italic;
  font-size: 0.875rem;
  color: var(--gray);
}

.section-content > .tags {
  margin: 0;
}
`
