import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo.config";
import { getAllPosts, formatWPPost } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url;

    // Static pages with their priorities and change frequencies
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/process`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/case-studies`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];

    // Dynamic blog post pages from WordPress
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const wpPosts = await getAllPosts();
        blogPages = wpPosts.map((wpPost) => {
            const post = formatWPPost(wpPost);
            return {
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.modifiedISO),
                changeFrequency: "monthly" as const,
                priority: 0.7,
            };
        });
    } catch (error) {
        // If WordPress API is unavailable, sitemap still works with static pages
        console.error("Failed to fetch WordPress posts for sitemap:", error);
    }

    return [...staticPages, ...blogPages];
}
