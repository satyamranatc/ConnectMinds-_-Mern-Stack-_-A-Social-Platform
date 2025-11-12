import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, setUser }) {
  let [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const userD = JSON.parse(localStorage.getItem("user"));
      console.log(userD);
      if (userD) {
        setUser(userD);
            async function getMyPosts() {
      let res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/myPosts?user=${userD._id}`
      );
      console.log(res.data);
      if (res.data.posts) {
        setMyPosts(res.data.posts);
      }
    }
    getMyPosts();
      } else {
        navigate("/auth");
      }
    }
  }, [user, navigate, setUser]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex justify-center">
            {user && (
              <div
                id="ProfileCard"
                className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-10 text-center shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue-400/70 bg-white/60 shadow-lg">
                  <img
                    className="h-28 w-28 rounded-full object-cover shadow-md"
                    src={user.avatar || "https://via.placeholder.com/150"}
                    alt="avatar"
                  />
                </div>
                <h1 className="mt-6 text-3xl font-semibold text-slate-800">{user.name}</h1>
                <h2 className="text-sm text-slate-500">{user.email}</h2>

                <button
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/auth");
                  }}
                  className="mt-8 w-full rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-rose-600 hover:via-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-rose-300/80 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <h3 className="text-2xl font-semibold text-slate-800">Your Posts</h3>
              <span className="rounded-full bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-500 shadow-sm">
                {myPosts.length} shared
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {myPosts.map((post) => (
                <div
                  key={post._id}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Author Section */}
                  <div className="relative flex items-center gap-3 border-b border-slate-100/80 bg-white/70 px-5 py-4">
                    <img
                      src={post.user?.avatar || 'https://via.placeholder.com/50'}
                      alt="User Avatar"
                      className="h-12 w-12 rounded-full border border-white/80 object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">{post.user?.name || 'Unknown User'}</h3>
                      <p className="text-xs text-slate-400">Posted by you</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="relative h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  )}

                  {/* Post Content */}
                  <div className="relative space-y-3 px-6 py-5">
                    <h1 className="text-lg font-semibold text-slate-900">{post.title}</h1>
                    <p className="text-sm leading-relaxed text-slate-600">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
