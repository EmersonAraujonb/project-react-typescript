import React from 'react';

interface IDrawerOption {
  icon: string;
  path: string;
  label: any;
}

interface IDrawerContextData {
  children?: React.ReactNode;
  isDrawerOpen?: boolean;
  toggleDrawerOpen?: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;

}

const DrawerContext = React.createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return React.useContext(DrawerContext);
};
export const DrawerProvider= ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerOptions, setDrawerOptions] = React.useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);
  const handleSetDrawerOptions = React.useCallback(( newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
