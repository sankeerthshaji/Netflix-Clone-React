import React, { useState, useEffect } from "react";
import "./RowPost.css";
import axios from "../../axios.js";
import { imageUrl, API_KEY } from "../../constants/constants.js";
import YouTube from "react-youtube";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState();
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response?.data?.results);
        setMovies(response?.data?.results);
      })
      .catch((err) => {
        alert("Network Error");
      });
  }, []);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovieTrailer = (id) => {
    axios
      .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response?.data?.results?.length !== 0) {
          console.log(response?.data?.results[0]);
          setUrlId(response?.data?.results[0]);
        }else{
          console.log("Array Empty");
        }
      });
  };
  return (
    <div className="row">
      <h1>{props.title}</h1>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovieTrailer(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${movies ? imageUrl + obj.backdrop_path : ""}`}
            alt="poster"
          />
        ))}
      </div>
      { urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
