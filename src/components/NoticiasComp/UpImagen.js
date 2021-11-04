import React, { useState } from "react";
import firebase from "../../utils/firebase";

const db = firebase.firestore(firebase);
export const UpImagen = () => {
  const [uploadValue, setUploadValue] = useState("");
  const [pictureValues, setPictureValues] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const link = "/photoNews/" + file.name;
    const storaref = firebase.storage().ref(link);
    const task = storaref.put(file);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (error) => {
        console.log("Error Img", error.message);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          setPictureValues(url);
        });
      }
    );
  };
  return (
    <>
      <img width="200" src={pictureValues} />
      <br></br>
      <progress value={uploadValue} max="100"></progress>
      <br></br>
      <input type="file" onChange={handleUpload} />
      <br></br>
    </>
  );
};
/*onChange={onUpload}*/
