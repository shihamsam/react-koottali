import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

// import {Posts} from "../../dummyData"

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get("/posts/timeline/626cc87e24e4f086d466e9ab");

         // const resp =  await axios.get(`/posts/profile/${username}`)

      setPosts( resp.data);
    };
    fetchPosts();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
