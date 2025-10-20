# Blog Guide

## How to Add Blog Posts

Your blog posts are stored in `src/data/blogs.json` as a JSON array. Each blog post follows this structure:

```json
{
  "id": "unique-id-1",
  "title": "Your Blog Post Title",
  "slug": "your-blog-post-title",
  "excerpt": "A short description or preview of your blog post (2-3 sentences).",
  "content": "The full content of your blog post. You can use \\n for line breaks between paragraphs.",
  "author": "Your Name",
  "date": "2025-01-15",
  "tags": ["AI", "Machine Learning", "Research"],
  "coverImage": "/path/to/image.jpg"
}
```

### Fields Explained

- **id**: A unique identifier for the post (can be a UUID or simple string like "post-1")
- **title**: The main title of your blog post
- **slug**: URL-friendly version of the title (used in the URL path)
- **excerpt**: Short preview text shown on the blog list page
- **content**: Full blog post content. Use `\n` to separate paragraphs
- **author**: Your name or pen name
- **date**: Publication date in YYYY-MM-DD format
- **tags**: Array of relevant tags for filtering
- **coverImage**: (Optional) Path to a cover image

### Example Blog Post

```json
[
  {
    "id": "getting-started-with-julia",
    "title": "Getting Started with Julia for Machine Learning",
    "slug": "getting-started-with-julia",
    "excerpt": "Julia is an incredible language for machine learning. In this post, I'll share why I love it and how to get started.",
    "content": "Julia has become my go-to language for machine learning research. Its speed, ease of use, and powerful ecosystem make it perfect for ML experimentation.\n\nOne of the biggest advantages of Julia is its performance. Unlike Python, Julia code runs at near C-level speeds without requiring extensive optimization. This means you can prototype quickly and still get production-ready performance.\n\nAnother great feature is multiple dispatch, which makes it easy to write generic, reusable code. This is especially useful when working with different data types and model architectures.",
    "author": "Shuey",
    "date": "2025-01-15",
    "tags": ["Julia", "Machine Learning", "Tutorial"],
    "coverImage": "/images/julia-ml.jpg"
  }
]
```

## Adding Your First Post

1. Open `src/data/blogs.json`
2. Add your blog post object to the array
3. Make sure the JSON is valid (proper commas, quotes, etc.)
4. Save the file
5. Your blog post will automatically appear on the site!

## Navigation

- **Home page**: Your portfolio with a blog icon in the header
- **Blog list**: `/blog` - Shows all your blog posts with filtering by tags
- **Blog post**: `/blog/[slug]` - Individual blog post view

## Tips

- Keep slugs URL-friendly (lowercase, hyphens instead of spaces)
- Use descriptive tags to help readers find related content
- Excerpt should be engaging to encourage clicks
- For multi-paragraph content, separate paragraphs with `\n`
- Cover images are optional but make posts more visually appealing
- Store cover images in the `public` folder for easy access

## Styling Your Content

The blog detail page supports:

- Paragraphs (automatically created from `\n`)
- Headers (if you add HTML like `<h2>` in content)
- Code snippets (wrap in `<code>` tags)
- Blockquotes (wrap in `<blockquote>` tags)
