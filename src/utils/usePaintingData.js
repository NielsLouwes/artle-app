import * as React from "react";
import { useFetch } from "./useFetch";

const PaintingDataContext = React.createContext();

export const usePaintingData = () => React.useContext(PaintingDataContext);

export function PaintingDataContextProvider({ children }) {
  const { paintingData, loading, fetchData } = useFetch();

  return (
    <PaintingDataContext.Provider value={{ paintingData, loading, fetchData }}>
      {" "}
      {children}
    </PaintingDataContext.Provider>
  );
}
