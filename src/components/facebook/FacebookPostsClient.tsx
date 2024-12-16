"use client";

import { useState, useEffect } from "react";

interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
}

interface FacebookPostsClientProps {
  initialPosts: FacebookPost[];
}

export default function FacebookPostsClient({
  initialPosts,
}: FacebookPostsClientProps) {
  const [posts, setPosts] = useState<FacebookPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/facebook-posts");

    setIsLoading(true);

    eventSource.onmessage = (event) => {
      try {
        const newPosts = JSON.parse(event.data);
        setPosts(newPosts);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error("Error parsing Facebook posts:", err);
        setError("Failed to update posts. Please try again later.");
        setIsLoading(false);
      }
    };

    eventSource.onerror = () => {
      console.error("EventSource failed.");
      setError("Failed to connect to the server. Please try again later.");
      setIsLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (error) {
    return (
      <div className="text-red-500" role="alert">
        {error}
      </div>
    );
  }

  if (isLoading && posts?.length === 0) {
    return <div className="text-gray-500">Loading posts...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Facebook Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-2">
              {new Date(post.created_time).toLocaleString()}
            </p>
            <p>{post.message}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
