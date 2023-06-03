import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/GeneralStack/HomeScreen';

const Stack = createNativeStackNavigator();

export function GeneralStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}

        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
}
