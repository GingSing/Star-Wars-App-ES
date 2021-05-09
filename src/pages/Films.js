import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import { useHistory } from "react-router-dom";
import { LabeledComponent, Page } from "../components";
import { fetcher, getIdFromURL } from "../helpers";

const Films = () => {
  const [filteredFilms, setFilteredFilms] = useState();
  const history = useHistory();
  const { data: films, error } = useSWR("/films/", fetcher);

  const handleChange = useCallback(
    (e) => {
      // used to filter results by text (title and opening crawl)
      const fuse = new Fuse(films.results, {
        distance: 600,
        threshold: 0.4,
        location: 300,
        keys: ["title", "opening_crawl"],
      });
      const pattern = e.target.value;
      const newList = fuse.search(pattern);
      setFilteredFilms(newList.length > 0 ? newList : films.results);
    },
    [films]
  );

  useEffect(() => {
    if (films) {
      setFilteredFilms(films.results);
    }
  }, [films]);

  return (
    <Page loaded={films} error={error} removeButtons>
      <h1 className="title">Star Wars App</h1>
      <input placeholder="Search..." onChange={handleChange} />
      {filteredFilms &&
        filteredFilms.map((filteredData, key) => {
          //get film id (episode id is not film id)
          //need this check for fuse.js to work properly
          const data = filteredData.item ? filteredData.item : filteredData;
          return (
            <div
              key={key}
              className="clickable"
              onClick={() => history.push(`/films/${getIdFromURL(data.url)}`)}
            >
              <LabeledComponent title={data.title}>
                <p>{data.opening_crawl}</p>
              </LabeledComponent>
            </div>
          );
        })}
    </Page>
  );
};

export default Films;
