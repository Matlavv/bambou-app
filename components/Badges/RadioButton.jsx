import React from "react";
import { TouchableOpacity, View } from "react-native";

const RadioButton = ({ selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-6 w-6 rounded-full justify-center items-center bg-primary-beige"
    >
      {selected && <View className="h-3 w-3 rounded-full bg-primary-green" />}
    </TouchableOpacity>
  );
};

export default RadioButton;
