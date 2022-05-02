import "./share.css";
import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const desc = useRef("");
  const [file, setFile] = useState(null);

  const shareHandler = async (e) => {
    e.preventdefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      await axios.post("/posts", newPost);
    } catch (error) {
      console.log("Share failed, ", error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfilePicture"
            src={
              user.profilePicture
                ? pf + user.profilePicture
                : pf + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`what's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={shareHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
