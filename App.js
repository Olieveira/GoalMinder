import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components/native';
import THEME from './src/theme';
import Home from './src/screens/Home';

import { Routes } from './src/routes';

SplashScreen.preventAutoHideAsync(); //tela de carregamento

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync(); //esconde a tela de carregamento
  }

  return (
    <ThemeProvider theme={THEME}>
      <Routes />
    </ThemeProvider>
  );
}
