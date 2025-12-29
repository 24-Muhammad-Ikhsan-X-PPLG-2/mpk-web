"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface LayoutContextType {
  noScroll: boolean;
  changeNoScroll: (state: boolean) => void;
  toggleNoScroll: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [noScroll, setNoScroll] = useState(false);
  const changeNoScroll = (state: boolean) => {
    setNoScroll(state);
  };
  const toggleNoScroll = () => {
    setNoScroll((prev) => !prev);
  };
  return (
    <LayoutContext.Provider
      value={{ changeNoScroll, noScroll, toggleNoScroll }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within an LayoutProvider");
  }
  return context;
};
