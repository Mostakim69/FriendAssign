import AOS from "aos";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import "aos/dist/aos.css";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

const logOut = () => {
  setLoading(true);
  return signOut(auth);
};

  const authInfo = {
    googleLogin,
    createUser,
    login,
    updateUser,
    user,
    loading,
    logOut,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        axios
          .post(
            "https://worldwide-recipe-chefs-sharing-serv.vercel.app/api/v1/jwt",
            {
              email: currentUser.email,
            },
            {
              withCredentials: true,
            },
          )
          .then((res) => console.log("res", res.data))
          .catch((err) => console.log("err", err));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default MyProvider;