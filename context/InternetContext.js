import React from "react";

export const InternetContext = React.createContext({});

export const InternetProvider = (props) => {
  const [networkAvailable, setNetworkAvailable] = React.useState(true);

  return (
    <InternetContext.Provider
      value={{
        networkAvailable,
        setNetworkAvailable,
      }}
    >
      {props.children}
    </InternetContext.Provider>
  );
};
