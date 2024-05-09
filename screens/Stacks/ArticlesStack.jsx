import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Articles from "../Articles/Articles";

const stack = createNativeStackNavigator();

const ArticlesStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Article" component={Articles} />
    </stack.Navigator>
  );
};

export default ArticlesStack;
