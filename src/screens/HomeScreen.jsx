import { Text } from "react-native";
import BoyScreen from "./BoyScreen";
import GirlScreen from "./GirlScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import styled from "styled-components";
const HeaderStyle = styled(Text)`
  color: #fff;
  font-weight: 600;
  font-size: 18px;
`

const OptionHeader = (type = 'boy') => {
  return {
    tabBarIcon: () => <Text>{type === 'boy' ? '🧑' : '👧'}</Text>,
    headerStyle: {
      backgroundColor: '#5356FF',
    },
    headerTitleAlign: 'center',
    headerTitle: () => <HeaderStyle>{type === 'boy' ? 'Bạn gấu đực 🧑' : 'Bạn gấu cái 👧'}</HeaderStyle>,
  }
}

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Gấu Cái"
        component={GirlScreen} 
        options={OptionHeader('girl')}
      />
      <Tab.Screen 
        name="Gấu Đực" 
        component={BoyScreen} 
        options={OptionHeader('boy')}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
