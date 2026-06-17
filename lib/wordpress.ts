const WP_API_URL = process.env.WORDPRESS_API_URL || "https://cms.seofreelancerusa.com/wp-json/wp/v2";

// ---------- TypeScript Interfaces ----------

export interface WPFeaturedMedia {
    source_url: string;
    alt_text: string;
    media_details: {
        width: number;
        height: number;
        sizes: Record<string, { source_url: string; width: number; height: number }>;
    };
}

export interface WPTerm {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
}

export interface WPPost {
    id: number;
    date: string;
    date_gmt: string;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    title: { rendered: string };
    content: { rendered: string; protected: boolean };
    excerpt: { rendered: string; protected: boolean };
    author: number;
    featured_media: number;
    categories: number[];
    tags: number[];
    _embedded?: {
        author?: Array<{ id: number; name: string; slug: string }>;
        "wp:featuredmedia"?: WPFeaturedMedia[];
        "wp:term"?: WPTerm[][];
    };
}

/** Normalized post shape used throughout the UI */
export interface NormalizedPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // full HTML
    featuredImage: string | null;
    featuredImageAlt: string;
    category: string;
    categories: string[];
    tags: string[];
    readTime: string;
    date: string; // formatted display date e.g. "May 2026"
    dateISO: string; // ISO string for SEO
    modifiedISO: string;
    author: string;
}

// ---------- Helpers ----------

/** Strip HTML tags and decode common HTML entities */
function stripHTML(html: string): string {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#8217;/g, "'")
        .replace(/&#8216;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#8211;/g, "–")
        .replace(/&#8212;/g, "—")
        .replace(/&hellip;/g, "…")
        .replace(/&#8230;/g, "…")
        .replace(/&nbsp;/g, " ")
        .trim();
}

/** Estimate reading time from HTML content */
function estimateReadTime(htmlContent: string): string {
    const text = stripHTML(htmlContent);
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min`;
}

/** Format a date string to "Month Year" */
function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Get the featured image URL from embedded data */
export function getFeaturedImage(post: WPPost): string | null {
    return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

/** Get the featured image alt text from embedded data */
function getFeaturedImageAlt(post: WPPost): string {
    return post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || "";
}

/** Extract category names from embedded terms */
function getCategories(post: WPPost): string[] {
    const terms = post?._embedded?.["wp:term"];
    if (!terms) return [];
    // wp:term[0] = categories, wp:term[1] = tags
    return (terms[0] || []).map((t) => t.name);
}

/** Extract tag names from embedded terms */
function getTags(post: WPPost): string[] {
    const terms = post?._embedded?.["wp:term"];
    if (!terms) return [];
    return (terms[1] || []).map((t) => t.name);
}

/** Get author display name from embedded data */
function getAuthorName(post: WPPost): string {
    const author = post?._embedded?.author?.[0];
    if (!author) return "Lakshya Pareek";
    // If the WP display name is an email, fall back to a human name
    if (author.name.includes("@")) return "Lakshya Pareek";
    return author.name;
}

/** Transform a raw WordPress REST API post into a normalized shape for the UI */
export function formatWPPost(post: WPPost): NormalizedPost {
    const categories = getCategories(post);
    return {
        id: post.id,
        slug: post.slug,
        title: stripHTML(post.title.rendered),
        excerpt: stripHTML(post.excerpt.rendered),
        content: post.content.rendered,
        featuredImage: getFeaturedImage(post),
        featuredImageAlt: getFeaturedImageAlt(post),
        category: categories[0] || "Uncategorized",
        categories: categories,
        tags: getTags(post),
        readTime: estimateReadTime(post.content.rendered),
        date: formatDate(post.date),
        dateISO: post.date_gmt ? `${post.date_gmt}Z` : post.date,
        modifiedISO: post.modified_gmt ? `${post.modified_gmt}Z` : post.modified,
        author: getAuthorName(post),
    };
}

// ---------- API Functions ----------

/** Fetch all published posts with embedded data */
export async function getAllPosts(): Promise<WPPost[]> {
    const res = await fetch(
        `${WP_API_URL}/posts?_embed&per_page=100&status=publish`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return res.json();
}

/** Fetch all published posts and return them normalized */
export async function getAllNormalizedPosts(): Promise<NormalizedPost[]> {
    const posts = await getAllPosts();
    return posts.map(formatWPPost);
}

/** Fetch a single post by slug with embedded data */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const res = await fetch(
        `${WP_API_URL}/posts?slug=${slug}&_embed`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const posts: WPPost[] = await res.json();
    return posts[0] || null;
}

/** Fetch a single post by slug and return it normalized */
export async function getNormalizedPostBySlug(slug: string): Promise<NormalizedPost | null> {
    const post = await getPostBySlug(slug);
    if (!post) return null;
    return formatWPPost(post);
}