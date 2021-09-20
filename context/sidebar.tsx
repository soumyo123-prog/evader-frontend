import React, { PropsWithChildren } from 'react';

const SidebarContext = React.createContext<{
  expand: boolean;
  active: string;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}>({
  expand: true,
  active: 'home',
  setExpand: () => {},
  setActive: () => {},
});

export const SidebarProvider = ({ children }: PropsWithChildren<{}>) => {
  const [expand, setExpand] = React.useState<boolean>(true);
  const [active, setActive] = React.useState<string>('home');

  React.useEffect(() => {
    if (window.innerWidth < 1250) {
      setExpand(false);
    } else {
      setExpand(true);
    }

    window.onresize = () => {
      if (window.innerWidth < 1250) {
        setExpand(false);
      } else {
        setExpand(true);
      }
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        expand,
        active,
        setExpand,
        setActive,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => React.useContext(SidebarContext);
