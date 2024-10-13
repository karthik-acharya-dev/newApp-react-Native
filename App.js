import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/homePage/HomePage";
import Menu from "./components/hamburgerMenu/Menu";
import Order from "./components/featuresButton/Order";
import BuyAgain from "./components/featuresButton/BuyAgain";
import Cart from "./components/featuresButton/Cart";
import Favorites from "./components/featuresButton/Favorites";
import OrderList from "./components/featuresButton/OrderList";
import Ledger from "./components/featuresButton/Ledger";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider

const Stack = createStackNavigator();

const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="BuyAgain" component={BuyAgain} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="OrderList" component={OrderList} />
            <Stack.Screen name="Ledger" component={Ledger} />
            <Stack.Screen name="Favorites" component={Favorites} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
