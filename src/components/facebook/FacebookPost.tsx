import { use } from "react";
import FacebookPostsClient from "./FacebookPostsClient";

async function fetchInitialPosts() {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/142518588946366/posts?fields=id,message,created_time&access_token=EAAPduhbZCqZA4BOZBzgjdzZAQyuTjBbWFMDRijCbL8z66qCz9r0HZBOP4KHC09N0XXHINElnCFFNgdWMR7Lr9EPMKOyILo8VsdpbahAPE4QIDad9zVlBSJZBW0q7MUG6wHpAA9WzZBPfCGC2vbfKPK8tkmdAQr6DjxRld8iLl5qdwPHzuZBE2kWhDLh918sKdvsnQOsuMFYU`
  );
  const data = await response.json();
  return data.data;
}

export default function FacebookPosts() {
  const initialPosts = use(fetchInitialPosts());

  return <FacebookPostsClient initialPosts={initialPosts} />;
}
