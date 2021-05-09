import React from "react";
import { useHistory } from "react-router-dom";

const Page = ({ loaded, error, children }) => {
  const history = useHistory();
  if (error || !loaded) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      {/* Added check in case users went to a page immediately without going through the main page*/}
      <button
        onClick={() => {
          history.length > 2 ? history.goBack() : history.push("/");
        }}
      >
        Back
      </button>
      {/* Added for ease to go back to main page */}
      <button onClick={() => history.push("/")}>Home</button>
      {children}
    </div>
  );
};

export default Page;
