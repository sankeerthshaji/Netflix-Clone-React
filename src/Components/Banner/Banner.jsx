import React from "react";
import "./Banner.css";
import { useEffect, useState } from "react";
import axios from "../../axios.js";
import { API_KEY, imageUrl } from "../../constants/constants.js";

function Banner() {
  const [movie, setMovie] = useState();
  let randomNumber = Math.floor(Math.random() * 20);
  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(randomNumber);
        console.log(response?.data?.results[randomNumber]);
        setMovie(response?.data?.results[randomNumber]);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title ? movie.title : movie.name : ""}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">My List</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
