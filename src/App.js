import "./App.css";
import Post from "./components/Post";
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./components/ImageUpload";
import Modal from "@material-ui/core/Modal";
function getModalStyle() {
  const left = 50;
  const top = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%,-${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //esta loggeado
        setUser(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: userName,
          });
        }
      } else {
        //usuario logout
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userName, user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  });
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };
  return (
    <div className="app">
      {user ? (
        <ImageUpload userName={user.displayName} />
      ) : (
        <h1>Nesecitas iniciar sesion!</h1>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              className="app__headerImage"
            />
            <Input
              placeholder="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
            />
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <Input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signUp">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              className="app__headerImage"
            />
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <Input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button type="submit" onClick={signIn}>
              signIn
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          alt="logo"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>logOut</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>sign In</Button>
          <Button onClick={() => setOpen(true)}>sign Up</Button>
        </div>
      )}
      <h2>hello! my name is paolo and building this app! :</h2>
      {post.map(({ post, id }) => (
        <Post
          key={id}
          userName={post.userName}
          caption={post.caption}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default App;
