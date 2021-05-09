import React from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { fetcher, getIdFromURL } from "../helpers";
import PropTypes from "prop-types";

const CharacterList = ({ characters }) => {
  return (
    <ul>
      {characters &&
        characters.map((characterURL, key) => (
          <CharacterItem key={key} characterURL={characterURL} />
        ))}
    </ul>
  );
};

const CharacterItem = ({ characterURL }) => {
  const history = useHistory();
  const { data: characterInfo } = useSWR(characterURL, fetcher);
  return (
    <li
      onClick={() =>
        characterInfo &&
        history.push(`/characters/${getIdFromURL(characterInfo.url)}`)
      }
    >
      <span>{characterInfo ? characterInfo.name : "Skeleton"}</span>
    </li>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.array,
};

CharacterItem.propTypes = {
  characterURL: PropTypes.string,
};

export default CharacterList;
