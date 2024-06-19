import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Articles from "../Articles/Articles";
import SubscribeScreen from "../SubscribeScreen";

const stack = createNativeStackNavigator();

const ArticlesStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Article" component={Articles} />
      <stack.Screen name="Subscribe" component={SubscribeScreen} />
    </stack.Navigator>
  );
};

export default ArticlesStack;
