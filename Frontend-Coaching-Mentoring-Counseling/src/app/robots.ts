import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cmc.hulunautika.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tentang", "/layanan", "/faq"],
        disallow: ["/api/", "/sso/", "/dashboard/admin", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
