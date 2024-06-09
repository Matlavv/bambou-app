import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "./firebaseConfig";

const BookmarkContext = createContext();

export const useBookmarks = () => {
  return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookmarkedEvents = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setBookmarkedEvents(userData.bookmarkedEvents || []);
        }
      }
    };

    fetchBookmarkedEvents();
  }, [user, db]);

  const toggleBookmark = async (eventId) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    const isBookmarked = bookmarkedEvents.includes(eventId);

    try {
      if (isBookmarked) {
        await updateDoc(userDocRef, {
          bookmarkedEvents: arrayRemove(eventId),
        });
        setBookmarkedEvents((prev) => prev.filter((id) => id !== eventId));
      } else {
        await updateDoc(userDocRef, {
          bookmarkedEvents: arrayUnion(eventId),
        });
        setBookmarkedEvents((prev) => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Error updating bookmarks: ", error);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedEvents, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
