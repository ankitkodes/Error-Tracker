import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // Block API routes from crawling
          "/project/",  // Dashboard — authenticated only
          "/alerts/",   // Dashboard — authenticated only
          "/analytics/", // Dashboard — authenticated only
          "/issue/",    // Dashboard — authenticated only
          "/report/",   // Dashboard — authenticated only
          "/setup/",    // Dashboard — authenticated only
          "/profile/",  // Dashboard — authenticated only
        ],
      },
    ],
    sitemap: "https://bugtrace.in/sitemap.xml",
  };
}
