
import React from 'react'
import { SafeAreaView } from 'react-native'

import { ThemeProvider, } from '@rneui/themed';
import FlashMessage from "react-native-flash-message";

import { theme } from './src/theme';
import { AppProvider } from './src/contexts/app.context';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background  }}>
        <AppProvider>
          <RootNavigator />
          <FlashMessage position="top" />
        </AppProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
