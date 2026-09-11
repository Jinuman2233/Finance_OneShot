import type { MetadataRoute } from "next";

/**
 * Canonical production origin for Search Console.
 * Avoid empty-string env values and never use markdown-wrapped URLs.
 */
const baseUrl = (() => {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "https://salaryoneshot.com";
})();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, priority: 1.0 },
    {
      url: `${baseUrl}/salary-calculator`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/severance-pay`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tax-return`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/overtime-pay`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/unemployment-benefits`,
      lastModified,
      priority: 0.8,
    },
    { url: `${baseUrl}/privacy`, lastModified, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified, priority: 0.5 },
  ];
}
