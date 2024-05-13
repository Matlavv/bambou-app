import React from "react";
import { Modal, Text, View } from "react-native";

const TradePointsModal = ({ visible, onRequestClose, brand }) => {
  if (!brand) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View className="absolute inset-x-0 bottom-0 h-2/3 bg-primary-beige rounded-t-3xl">
        <Text className="">cc</Text>
      </View>
    </Modal>
  );
};

export default TradePointsModal;
