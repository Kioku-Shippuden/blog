import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [ alertState, setAlertState ] = useState(0);

  return (
    <AlertContext.Provider value={{ alertState, setAlertState }}>
      {children}
    </AlertContext.Provider>
  );
}
