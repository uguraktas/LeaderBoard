import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GeneralStack } from './GeneralNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {

    const NavigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
        },
    };

    return (
        <NavigationContainer theme={NavigationTheme}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="General" component={GeneralStack} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
