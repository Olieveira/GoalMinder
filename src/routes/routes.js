import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Screen, Navigator } = createBottomTabNavigator();

import THEME from "../theme";
import { MaterialIcons } from '@expo/vector-icons'

import Goals from "../screens/Goals"; // Metas
import Home from '../screens/Home'; //Home
import Habits from "../screens/Habits"; //Hábitos

export function UserRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveBackgroundColor: THEME.COLORS.BACKGROUND,
            tabBarInactiveBackgroundColor: THEME.COLORS.BACKGROUND,
            tabBarActiveTintColor: THEME.COLORS.ALERT,
            tabBarInactiveTintColor: THEME.COLORS.PRIMARY600,
            tabBarStyle: {backgroundColor: THEME.COLORS.BACKGROUND},
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true
        }}>
            <Screen
                name="Home"
                options={{
                    title: 'HOME',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    )
                }}
                component={Home}
            />
            <Screen
                name="Goals"
                options={{
                    title: 'METAS',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="add-task"
                            color={color}
                            size={size}
                        />
                    )
                }}
                component={Goals}
            />
            <Screen
                name="Habits"
                options={{
                    title: 'METAS',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="menu-book"
                            color={color}
                            size={size}
                        />
                    )
                }}
                component={Habits}
            />
        </Navigator >
    );
}