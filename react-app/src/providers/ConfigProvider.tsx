import React, { createContext, useContext, useEffect, useState } from "react";

import {
  ChatProviderListSessionMessagesMessage,
  ChatProviderListSessionMessagesOptions,
  ChatProviderSendMessageOptions,
  ChatWidgetConfig,
} from "../types/mainProcess";

interface ConfigContextType {
  config: ChatWidgetConfig;
  setConfig: React.Dispatch<React.SetStateAction<ChatWidgetConfig>>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<ChatWidgetConfig>({});

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context)
    throw new Error("useConfig must be used within a ConfigProvider");
  return context;
};
