import { MoreVert } from "@mui/icons-material";
import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {format} from 'timeago.js'
import {Link} from "react-router-dom"

export default function Post({ post }) {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);
  
  const likeHandler = () => {

    
    setLike(isLiked?like-1: like + 1);
    setIsLiked(!isLiked);
  }

   useEffect(() => {
     const fetchUser = async () => {
       const resp = await axios.get(`/users?userId=${post.userId}`);
       console.log('SHIHAM >>> ', resp.data)
       setUser(resp.data);
     };
     fetchUser();
   }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={
                user.profilePicture
                ? pf + user.profilePicture
                : pf + "person/noAvatar.png"
              }
              alt=""
              />
              </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={pf + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="heartIcon"
              src="/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
