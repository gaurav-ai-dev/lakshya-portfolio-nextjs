import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/data/blogposts";
import BlogDetailPage from "./BlogDetailPage";

const normalize = (s: string) =>
    decodeURIComponent(String(s))
        .trim()
        .toLowerCase()
        .replace(/\/+$/, ""); // remove trailing slash

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
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
