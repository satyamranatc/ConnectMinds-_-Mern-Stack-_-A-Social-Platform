import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        console.log(res.data);
        if (res.data.posts) {
          setPosts(res.data.posts);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center">
      {loading ? (
        <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">Loading...</h1>
      ) : posts.length === 0 ? (
        <h1 className="text-2xl font-semibold text-gray-600">No posts found.</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white h-fit shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Author Section */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <img
                  src={post.user?.avatar || 'https://via.placeholder.com/50'}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full object-cover border"
                />
                <h3 className="text-gray-800 font-medium">{post.user?.name || 'Unknown User'}</h3>
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-60 object-cover"
                />
              )}

              {/* Post Content */}
              <div className="p-5 space-y-2">
                <h1 className="text-xl font-semibold text-gray-800">{post.title}</h1>
                <p className="text-gray-600 text-sm">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
