import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeComponent from "./Screens/home";
import TrendingComponent from "./Screens/trending";
import ChartsComponent from "./Screens/charts";

const Stack = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen name="Trending" component={TrendingComponent} />
        <Stack.Screen name="Charts" component={ChartsComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
