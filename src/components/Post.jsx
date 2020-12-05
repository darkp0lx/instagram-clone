import React from "react";
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ image, userName,caption }) {


  return (
    <div className="Post">
      <div className="Post__header">
        <Avatar
          className="Post__avatar"
          alt={userName}
          src="static/images/avatar/1.jpg"
        />
        <h3>{userName}</h3>
      </div>
      <img className="Post__image" src={image} alt="image" />
      <h3 className="Post__text">
        <strong>{userName}</strong>{caption}
      </h3>
    </div>
  );
}

export default Post;
