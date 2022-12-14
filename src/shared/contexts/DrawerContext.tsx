import React from 'react';

interface IDrawerContextData {
  children?: React.ReactNode;
  isDrawerOpen?: boolean;
  toggleDrawerOpen?: () => void;
}

const DrawerContext = React.createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return React.useContext(DrawerContext);
};
export const DrawerProvider: React.FC<IDrawerContextData> = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
