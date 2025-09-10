


import  {useMediaQuery} from 'react-responsive';
import React, {createContext, type ReactNode, useContext} from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';



interface DeviceContextProps {
  deviceType: DeviceType;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}
const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  let deviceType: DeviceType = 'desktop';

  if (isMobile) {
    deviceType = 'mobile';
  } else if (isTablet) {
    deviceType = 'tablet';
  } else if(isDesktop) {
    deviceType = 'desktop';
  }

  return (
    <DeviceContext.Provider value={{ deviceType }}>
      {children}
    </DeviceContext.Provider>
  );
};

const useDevice = (): DeviceContextProps => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};

export { DeviceProvider, useDevice };