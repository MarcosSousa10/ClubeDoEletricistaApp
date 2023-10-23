/* eslint-disable prettier/prettier */
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
import Administrador from './src/modules/administrador';
import GlobalModal from './src/shared/modal/globalModal/GlobalModal';
import {Provider} from 'react-redux';
import store from './src/story';
import CreateUser from './src/modules/createUser';
import Editar from './src/modules/editarcadastro/screens/editar';
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
        iconName = 'cart';
        break;
      case MenuUrl.INFORMACAO:
        iconName = 'info';
        break;
      case MenuUrl.PERFIL:
      default:
        iconName = 'profile';
        break;
    }
    return <Icon name={iconName} size={23} color={color} />;
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
          height: 65,
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
        options={{title: 'Sobre', headerShown: false}}
      />
      <Tab.Screen
        name={MenuUrl.ADMINISTRADOR}
        component={Administrador}
        options={{title: 'Vendas', headerShown: false}}
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
    <Provider store={store}>
      <GlobalModal />
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
        <Stack.Screen name={MenuUrl.CADASTRO} component={CreateUser} options={{ title: 'Criar Usuario' }} />
        <Stack.Screen name={MenuUrl.EDITAR} component={Editar} options={{ title: 'Editar' }} />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
};

export default App;
