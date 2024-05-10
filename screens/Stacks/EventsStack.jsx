import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventCancel from "../Events/EventCancel";
import EventRegisterConfirmation from "../Events/EventRegisterConfirmation";
import Events from "../Events/Events";

const stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Events" component={Events} />
      <stack.Screen
        name="EventRegisterConfirmation"
        component={EventRegisterConfirmation}
      />
      <stack.Screen name="EventCancel" component={EventCancel} />
    </stack.Navigator>
  );
};

export default EventsStack;
