import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from 'firebase'
const ImageUpload = ({userName}) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      ()=>{
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url=>{
          db.collection("posts").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            caption:caption,
            image:url,
            userName:userName
          })
          setProgress("")
          setCaption("")
          setImage(null)
        })

      }
    );
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="enter a caption--"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Publicar</Button>
    </div>
  );
};

export default ImageUpload;
