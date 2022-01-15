import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { useTheme } from '@/hooks';
import { queryClient } from '@/lib/react-query';
import { RootNavigator } from '@/navigators';
import { useThemeStore } from '@/stores';

export default function App() {
  const theme = useTheme();
  const [isHydrated, setIsHydrated] = useState<boolean>(
    // @ts-ignore
    useThemeStore.persist.hasHydrated(),
  );

  if (!isHydrated) {
    // @ts-ignore
    useThemeStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={theme.statusBar} translucent />
      <RootNavigator />
    </QueryClientProvider>
  );
}
