import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MenuUrl} from './src/shared/components/enums/MenuUrl.enum';
import Login from './src/modules/login';
import Home from './src/modules/home/screens/Home';
import Splash from './src/modules/splash';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from './src/shared/icon/Icon';
import {theme} from './src/shared/themes/theme';
import Perfil from './src/modules/perfil';
import Informacao from './src/modules/Informacoes';
import Caousel from './src/shared/components/carousel/Carousel';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  const renderTabBarIcon = (
    color: string,
    route: RouteProp<ParamListBase, string>,
  ) => {
    let iconName: string;
    switch (route.name) {
      case MenuUrl.HOME:
        iconName = 'home';
        break;
      case MenuUrl.ADMINISTRADOR:
        iconName = 'man';
        break;
      case MenuUrl.INFORMACAO:
        iconName = 'info';
        break;
      case MenuUrl.PERFIL:
      default:
        iconName = 'profile';
        break;
    }
    return <Icon name={iconName} size={16} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => renderTabBarIcon(color, route),
        tabBarActiveTintColor: theme.colors.mainTheme.primary,
        tabBarInactiveTintColor: theme.colors.grayTheme.gray80,
        tabBarLabelStyle: {
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 52,
          padding: 8,
        },
      })}>
      <Tab.Screen
        name={MenuUrl.HOME}
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.INFORMACAO}
        component={Informacao}
        options={{title: 'Informações', headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.ADMINISTRADOR}
        component={Caousel}
        options={{title: 'Administrador', headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.PERFIL}
        component={Perfil}
        options={{title: 'Perfil', headerShown: false}}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={MenuUrl.SPLASH}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={MenuUrl.LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={MenuUrl.HOME}
          component={TabNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
