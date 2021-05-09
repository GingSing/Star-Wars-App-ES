import React from "react";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetcher, getIdFromURL } from "../../helpers";
import PropTypes from "prop-types";

const StarshipList = ({ starships }) => {
  return (
    <ul>
      {starships &&
        starships.map((starshipURL, key) => (
          <StarshipItem key={key} starshipURL={starshipURL} />
        ))}
    </ul>
  );
};

const StarshipItem = ({ starshipURL }) => {
  const history = useHistory();
  const { data: starshipInfo } = useSWR(starshipURL, fetcher);

  return (
    <li
      className="clickable"
      onClick={() =>
        starshipInfo &&
        history.push(`/starships/${getIdFromURL(starshipInfo.url)}`)
      }
    >
      <span>{starshipInfo ? starshipInfo.name : "Skeleton"}</span>
    </li>
  );
};

StarshipList.propTypes = {
  starhips: PropTypes.array,
};

StarshipItem.propTypes = {
  starshipURL: PropTypes.string,
};

export default StarshipList;
