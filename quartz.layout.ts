import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Flex({
      components: [
        { Component: Component.GraphIcon() },
        { Component: Component.PageTitle(), grow: true },
      ],
      gap: "0.5rem",
    }),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  afterBody: [
    Component.Graph({ localGraph: { showTags: false } }),
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Recently updated",
        limit: 5,
        showTags: false,
        filter: (f) => !f.slug?.startsWith("Topic/"),
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/hellosmithy",
      Twitter: "https://x.com/hellosmithy",
      Bluesky: "https://bsky.app/profile/hellosmithy.com",
      LinkedIn: "https://linkedin.com/in/hellosmithy",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false }),
    Component.LastUpdated(),
  ],
  left: [],
  right: [],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [],
  right: [],
};
