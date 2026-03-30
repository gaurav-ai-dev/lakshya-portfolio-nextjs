import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import BlogDetailPage from "./BlogDetailPage";
import { generateBlogMetadata } from "@/lib/seo.config";
import type { Metadata } from "next";

const normalize = (s: string) =>
    decodeURIComponent(String(s))
        .trim()
        .toLowerCase()
        .replace(/\/+$/, ""); // remove trailing slash

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = normalize(rawSlug);
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The blog post you're looking for doesn't exist.",
        };
    }

    return generateBlogMetadata({
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        slug: post.slug,
        publishedTime: post.publishedTime,
        modifiedTime: post.modifiedTime,
        author: post.author,
        tags: post.keywords || post.tags,
    });
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: rawSlug } = await params;
    const slug = normalize(rawSlug);
    const post = getPostBySlug(slug);

    if (!post) return notFound();

    return <BlogDetailPage slug={slug} />;
}
