import { Metadata } from "next";

// Site Configuration
export const siteConfig = {
    name: "Lakshya Portfolio",
    title: "Lakshya - Growth Marketing Strategist",
    description: "Expert growth marketing strategist specializing in performance marketing, creative testing, and data-driven strategies for scaling DTC and B2B brands.",
    url: "https://seofreelancerusa.com",
    author: {
        name: "Lakshya",
        email: "hello@lakshya-portfolio.com", // TODO: Update with actual email
        twitter: "@lakshya", // TODO: Update with actual handle
    },
    social: {
        twitter: "https://twitter.com/lakshya", // TODO: Update
        linkedin: "https://linkedin.com/in/lakshya", // TODO: Update
    },
    ogImage: "/og-image.jpg", // TODO: Create and add OG image
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "growth marketing",
        "performance marketing",
        "digital marketing",
        "marketing strategy",
        "creative testing",
        "attribution",
        "DTC marketing",
        "B2B marketing",
        "marketing consultant",
    ],
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: siteConfig.author.twitter,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// Helper function to generate page metadata
export function generatePageMetadata({
    title,
    description,
    path = "",
    image,
    noIndex = false,
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const url = `${siteConfig.url}${path}`;
    const ogImage = image || siteConfig.ogImage;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
            creator: siteConfig.author.twitter,
        },
        robots: noIndex
            ? {
                index: false,
                follow: false,
            }
            : undefined,
    };
}

// Helper function to generate blog post metadata
export function generateBlogMetadata({
    title,
    description,
    slug,
    image,
    publishedTime,
    modifiedTime,
    author,
    tags,
}: {
    title: string;
    description: string;
    slug: string;
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
}): Metadata {
    const url = `${siteConfig.url}/insights/${slug}`;
    const ogImage = image || siteConfig.ogImage;

    return {
        title,
        description,
        keywords: tags,
        authors: author ? [{ name: author }] : [{ name: siteConfig.author.name }],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "en_US",
            type: "article",
            publishedTime,
            modifiedTime,
            authors: author ? [author] : [siteConfig.author.name],
            tags,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
            creator: siteConfig.author.twitter,
        },
    };
}
