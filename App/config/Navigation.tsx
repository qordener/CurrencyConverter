import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import Home from '../screens/Home';
import Options from '../screens/Options';
import CurrencyList from '../screens/CurrencyList';
import colors from '../constants/color';
import { ConversionContextProvider } from '../util/ConversionContext';

const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="Options" component={Options} />
  </MainStack.Navigator>
);

const Modalstack = createStackNavigator();
const ModalStackScreen = () => (
  <Modalstack.Navigator screenOptions={{ presentation: 'modal' }}>
    <Modalstack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="CurrencyList"
      component={CurrencyList}
      options={({ navigation, route }: any) => ({
        title: route.params && route.params.title,
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 10 }}
          >
            <Entypo name="cross" size={30} color={colors.blue} />
          </TouchableOpacity>
        ),
      })}
    />
  </Modalstack.Navigator>
);

export default () => {
  return (
    <NavigationContainer>
      <ConversionContextProvider>
        <ModalStackScreen />
      </ConversionContextProvider>
    </NavigationContainer>
  );
};
