import { notFound } from "next/navigation";
import BlogDetailPage from "./BlogDetailPage";
import { generateBlogMetadata } from "@/lib/seo.config";
import { getAllPosts, getPostBySlug, formatWPPost, getFeaturedImage } from "@/lib/wordpress";
import type { Metadata } from "next";

const normalize = (s: string) =>
    decodeURIComponent(String(s))
        .trim()
        .toLowerCase()
        .replace(/\/+$/, ""); // remove trailing slash

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = normalize(rawSlug);
    const wpPost = await getPostBySlug(slug);

    if (!wpPost) {
        return {
            title: "Post Not Found",
            description: "The blog post you're looking for doesn't exist.",
        };
    }

    const post = formatWPPost(wpPost);
    const featuredImage = getFeaturedImage(wpPost);

    return generateBlogMetadata({
        title: post.title,
        description: post.excerpt,
        slug: post.slug,
        image: featuredImage || undefined,
        publishedTime: post.dateISO,
        modifiedTime: post.modifiedISO,
        author: post.author,
        tags: [...post.categories, ...post.tags],
    });
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: rawSlug } = await params;
    const slug = normalize(rawSlug);

    const wpPost = await getPostBySlug(slug);
    if (!wpPost) return notFound();

    const post = formatWPPost(wpPost);

    // Fetch all posts for related posts sidebar
    const allPosts = await getAllPosts();
    const relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .slice(0, 4)
        .map(formatWPPost);

    return <BlogDetailPage post={post} relatedPosts={relatedPosts} />;
}
