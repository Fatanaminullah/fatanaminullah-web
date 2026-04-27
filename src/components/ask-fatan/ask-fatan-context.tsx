"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AskFatanContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const AskFatanContext = createContext<AskFatanContextValue | null>(null);

export function AskFatanProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );
  return (
    <AskFatanContext.Provider value={value}>{children}</AskFatanContext.Provider>
  );
}

export function useAskFatan() {
  const ctx = useContext(AskFatanContext);
  if (!ctx) {
    throw new Error("useAskFatan must be used within AskFatanProvider");
  }
  return ctx;
}
