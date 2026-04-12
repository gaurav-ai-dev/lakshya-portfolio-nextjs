const WP_API_URL = process.env.WORDPRESS_API_URL;

// Sabhi posts fetch karo
export async function getAllPosts() {
    const res = await fetch(
        `${WP_API_URL}/posts?_embed&per_page=100&status=publish`,
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('Posts fetch nahi hue');
    return res.json();
}

// Single post fetch karo slug se
export async function getPostBySlug(slug: string) {
    const res = await fetch(
        `${WP_API_URL}/posts?slug=${slug}&_embed`,
        { next: { revalidate: 60 } }
    );
    const posts = await res.json();
    return posts[0] || null;
}

// Featured image extract karo
export function getFeaturedImage(post: any) {
    return post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
}