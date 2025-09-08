import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreens from "./screens/AguaScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen options={{ headerShown: false  }}
                        name={"Home"}
                        component={HomeScreens} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}