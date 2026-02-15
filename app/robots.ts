import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo.config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/"], // Add any paths you want to disallow
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
