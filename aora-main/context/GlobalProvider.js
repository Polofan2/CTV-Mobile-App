import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  // Remove user authentication state and related logic
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
