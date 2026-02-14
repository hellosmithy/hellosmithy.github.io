import rss from "@astrojs/rss";

import type { PostProps } from "../types";

const postImportResult = import.meta.glob<PostProps>("../../posts/**/*.mdx", {
  eager: true,
});
const posts = Object.values(postImportResult);

export const GET = () =>
  rss({
    // `<title>` field in output xml
    title: "Ben Smith",
    // `<description>` field in output xml
    description: "Personal blog of Ben Smith, Software Engineer.",
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: "https://hellosmithy.com",
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: posts.map(({ frontmatter }) => ({
      title: frontmatter.title,
      link: frontmatter.path,
      pubDate: new Date(frontmatter.date),
    })),
  });
