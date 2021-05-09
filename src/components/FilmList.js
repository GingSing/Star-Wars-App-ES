import React from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher, getIdFromURL } from "../helpers";
import PropTypes from "prop-types";

const FilmList = ({ films }) => {
  return (
    <ul>
      {films &&
        films.map((filmURL, key) => <FilmItem key={key} filmURL={filmURL} />)}
    </ul>
  );
};

const FilmItem = ({ filmURL }) => {
  const history = useHistory();
  const { data: filmInfo } = useSWR(filmURL, fetcher);
  return (
    <li
      onClick={() =>
        filmInfo && history.push(`/films/${getIdFromURL(filmInfo.url)}`)
      }
    >
      <span>{filmInfo ? filmInfo.title : "Skeleton"}</span>
    </li>
  );
};

FilmList.propTypes = {
  films: PropTypes.array,
};

FilmItem.propTypes = {
  filmURL: PropTypes.string,
};

export default FilmList;
