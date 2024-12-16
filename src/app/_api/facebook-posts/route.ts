import { NextResponse } from "next/server";

// This should be replaced with your actual Facebook Page access token
const ACCESS_TOKEN =
  "EAAPduhbZCqZA4BOZBzgjdzZAQyuTjBbWFMDRijCbL8z66qCz9r0HZBOP4KHC09N0XXHINElnCFFNgdWMR7Lr9EPMKOyILo8VsdpbahAPE4QIDad9zVlBSJZBW0q7MUG6wHpAA9WzZBPfCGC2vbfKPK8tkmdAQr6DjxRld8iLl5qdwPHzuZBE2kWhDLh918sKdvsnQOsuMFYU";
const PAGE_ID = "142518588946366";

async function fetchFacebookPosts() {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${PAGE_ID}/posts?fields=id,message,created_time&access_token=${ACCESS_TOKEN}`
  );
  const data = await response.json();
  return data.data;
}

export async function GET() {
  const posts = await fetchFacebookPosts();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(`data: ${JSON.stringify(posts)}\n\n`);

      // Simulate checking for new posts every 30 seconds
      setInterval(async () => {
        const newPosts = await fetchFacebookPosts();
        if (JSON.stringify(newPosts) !== JSON.stringify(posts)) {
          controller.enqueue(`data: ${JSON.stringify(newPosts)}\n\n`);
        }
      }, 30000);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
