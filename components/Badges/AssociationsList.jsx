import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { wwf } from "../../assets";
import TradeDonationPointsModal from "../../screens/Gifts/TradeDonationPointsModal";

const AssociationsList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssociation, setSelectedAssociation] = useState(null);

  const openModal = (association) => {
    setSelectedAssociation(association);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const associations = [
    {
      id: 1,
      name: "wwf",
      description:
        "Le WWF œuvre pour préserver les régions et espèces sauvages menacées. ",
      fullDescription:
        "Le WWF oeuvre à la protection de l'environnement et au développement durable. Elle est l'une des plus importantes ONG environnementalistes de la planète, grâce à plus de cinq millions de soutiens à travers le monde.Pour plus d’informations, rendez-vous sur :https://www.wwf.fr/ ",
    },
    {
      id: 2,
      name: "wwf",
      description:
        "Le WWF œuvre pour préserver les régions et espèces sauvages menacées. ",
      fullDescription:
        "Le WWF oeuvre à la protection de l'environnement et au développement durable. Elle est l'une des plus importantes ONG environnementalistes de la planète, grâce à plus de cinq millions de soutiens à travers le monde.Pour plus d’informations, rendez-vous sur :https://www.wwf.fr/ ",
    },
    {
      id: 3,
      name: "amnesty international",
      description:
        "Le WWF œuvre pour préserver les régions et espèces sauvages menacées. ",
      fullDescription:
        "Le WWF oeuvre à la protection de l'environnement et au développement durable. Elle est l'une des plus importantes ONG environnementalistes de la planète, grâce à plus de cinq millions de soutiens à travers le monde.Pour plus d’informations, rendez-vous sur :https://www.wwf.fr/ ",
    },
    {
      id: 4,
      name: "wwf",
      description:
        "Le WWF œuvre pour préserver les régions et espèces sauvages menacées. ",
      fullDescription:
        "Le WWF oeuvre à la protection de l'environnement et au développement durable. Elle est l'une des plus importantes ONG environnementalistes de la planète, grâce à plus de cinq millions de soutiens à travers le monde.Pour plus d’informations, rendez-vous sur :https://www.wwf.fr/ ",
    },
    {
      id: 5,
      name: "croix rouge",
      description:
        "Le WWF œuvre pour préserver les régions et espèces sauvages menacées. ",
      fullDescription:
        "Le WWF oeuvre à la protection de l'environnement et au développement durable. Elle est l'une des plus importantes ONG environnementalistes de la planète, grâce à plus de cinq millions de soutiens à travers le monde.Pour plus d’informations, rendez-vous sur :https://www.wwf.fr/ ",
    },
  ];

  return (
    <View>
      <FlatList
        data={associations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: association }) => (
          <TouchableOpacity
            className="flex-row items-center bg-secondary-beige p-3 rounded-xl mx-5 my-2"
            onPress={() => openModal(association)}
          >
            <Image source={wwf} className="w-16 h-16" alt="brand logo" />
            <View className="ml-4">
              <Text className="text-primary-green font-sans text-lg">
                {association.name}
              </Text>
              <View className="flex-row items-center w-5/6">
                <Text className="text-primary-green font-sansBold">
                  {association.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TradeDonationPointsModal
        visible={modalVisible}
        onRequestClose={closeModal}
        association={selectedAssociation}
      />
    </View>
  );
};

export default AssociationsList;
