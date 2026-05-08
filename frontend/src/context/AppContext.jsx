import { createContext, useContext, useMemo, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const value = useMemo(
    () => ({
      data,
      setData,
      clearData: () => setData(null),
    }),
    [data]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
