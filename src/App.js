import React, { useState, useEffect } from "react";
import "./styles.css";

const key = process.env.REACT_APP_KEY_IMAGE;

const style = {
  image: {
    width: "100%",
    Height: "50%",
    boxShadow: "10px 10px 5px 0px rgba(230, 228, 240, 1)"
  },
  description: {
    textAlign: "justify"
  }
};

export default function App() {
  const [image, setImage] = useState({});
  const [message, setMessage] = useState(".... Will be loading image shortly.");

  useEffect(() => {
    // Update the document title using the browser API
    async function getImage() {
      let responseImage = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${key}`
      );
      let response = await responseImage.json();
      if ("code" in response) {
        setMessage("Unable to get the image, server said :( , " + response.msg);
      } else {
        setImage(response);
      }
    }
    getImage();
  }, []);

  if (Object.keys(image).length === 0) {
    return (
      <div className="App">
        <div style={style.description}>{message}</div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          <h4>{image.title}</h4>
          <p>{image.date}</p>
          <img style={style.image} src={image.url} alt={image.title} />
        </div>
        <div className="description">
          <div style={style.description}>
            <p>
              {image.explanation}
              <br />
              <br />
              &copy; {image.copyright}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
