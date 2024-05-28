import { getAuth } from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { credits } from "../../assets";
import { app } from "../../firebaseConfig";

const DailyChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [userCredits, setUserCredits] = useState(0);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);

      // Fetch user credits and last challenge update
      const unsubscribeUser = onSnapshot(userDoc, async (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUserCredits(userData.credits);

          // Vérifier la date de dernière mise à jour des défis
          const lastUpdate = userData.lastChallengeUpdate?.toDate();
          const currentDate = new Date();

          if (
            !lastUpdate ||
            moment(currentDate).isAfter(moment(lastUpdate), "day")
          ) {
            // Mise à jour des défis si la date a changé ou si c'est la première fois
            await updateDailyChallenges(user.uid);
            await updateDoc(userDoc, {
              lastChallengeUpdate: Timestamp.fromDate(currentDate),
            });
          } else {
            // Récupérer les défis quotidiens existants
            const dailyChallengesCollection = collection(
              db,
              "users",
              user.uid,
              "dailyChallenges"
            );
            const snapshot = await getDocs(dailyChallengesCollection);
            const challengeIds = snapshot.docs.map((doc) => doc.id);
            const challengesData = await fetchChallengesByIds(challengeIds);
            setChallenges(
              challengesData.map((challenge) => ({
                ...challenge,
                completed: snapshot.docs
                  .find((doc) => doc.id === challenge.id)
                  ?.data().completed,
              }))
            );
          }
        }
      });

      return () => unsubscribeUser();
    }
  }, [user]);

  const initializeChallengesIfNeeded = async () => {
    const dailyChallengesCollection = collection(
      db,
      "users",
      user.uid,
      "dailyChallenges"
    );
    const snapshot = await getDocs(dailyChallengesCollection);

    if (snapshot.empty) {
      await updateDailyChallenges(user.uid);
    } else {
      const challengeIds = snapshot.docs.map((doc) => doc.id);
      const challengesData = await fetchChallengesByIds(challengeIds);
      setChallenges(
        challengesData.map((challenge) => ({
          ...challenge,
          completed: snapshot.docs
            .find((doc) => doc.id === challenge.id)
            ?.data().completed,
        }))
      );
    }
  };

  useEffect(() => {
    if (user) {
      initializeChallengesIfNeeded();
    }
  }, [user]);

  const fetchChallengesByIds = async (ids) => {
    const challengesCollection = collection(db, "challenges");
    const snapshot = await getDocs(challengesCollection);
    return snapshot.docs
      .filter((doc) => ids.includes(doc.id))
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  };

  const updateDailyChallenges = async (userId) => {
    const challengesCollection = collection(db, "challenges");
    const snapshot = await getDocs(challengesCollection);
    const allChallenges = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sélectionner 3 défis aléatoires
    const selectedChallenges = allChallenges
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const dailyChallengesCollection = collection(
      db,
      "users",
      userId,
      "dailyChallenges"
    );

    // Supprimer les anciens défis quotidiens
    const oldChallengesSnapshot = await getDocs(dailyChallengesCollection);
    const batch = writeBatch(db);
    oldChallengesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Ajouter les nouveaux défis
    const newBatch = writeBatch(db);
    selectedChallenges.forEach((challenge) => {
      const challengeDoc = doc(dailyChallengesCollection, challenge.id);
      newBatch.set(challengeDoc, { completed: false });
    });
    await newBatch.commit();

    setChallenges(
      selectedChallenges.map((challenge) => ({
        ...challenge,
        completed: false,
      }))
    );
  };

  const handleCompleteChallenge = async (challenge) => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        credits: userCredits + challenge.credits,
      });

      // Update the challenge as completed
      const challengeDoc = doc(
        db,
        "users",
        user.uid,
        "dailyChallenges",
        challenge.id
      );
      await updateDoc(challengeDoc, {
        completed: true,
      });

      // Refresh the challenges to show the completed state
      const updatedChallenges = challenges.map((c) =>
        c.id === challenge.id ? { ...c, completed: true } : c
      );
      setChallenges(updatedChallenges);
    }
  };

  return (
    <View>
      {challenges.map((challenge) => (
        <View
          key={challenge.id}
          className="flex flex-row justify-between items-center m-2 p-2 bg-secondary-beige rounded-lg shadow"
        >
          <Text className="text-primary-green text-lg font-sans mx-2">
            {challenge.description}
          </Text>
          {challenge.completed ? (
            <Ionicons name="checkmark-circle" size={24} color="#005B41" />
          ) : (
            <TouchableOpacity
              className="flex flex-row items-center bg-primary-yellow p-2 px-4 rounded-full"
              onPress={() => handleCompleteChallenge(challenge)}
            >
              <Text className="text-primary-beige font-wakBold text-lg">
                {challenge.credits}
              </Text>
              <Image source={credits} alt="credits" className="w-4 h-4 ml-2" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default DailyChallenges;
