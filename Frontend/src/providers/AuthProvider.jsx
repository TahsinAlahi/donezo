import { createContext, useContext, useEffect, useState } from "react";
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
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import useAxiosPublic from "../hooks/useAxiosPublic";

const authContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  async function registerWithEmail(username, email, password, imageUrl) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;

      await updateProfile(userData, {
        displayName: username,
        photoURL: imageUrl,
      });

      toast.success("User created successfully");
      return { status: "success", message: "User created successfully" };
    } catch (error) {
      console.log(error);

      let errorMessage = "Something went wrong";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Weak password";
      }

      toast.error(errorMessage);
      return { status: "error", message: errorMessage };
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function loginWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;

      setUser(userData);

      toast.success("User logged in successfully");
      return { status: "success", message: "User logged in successfully" };
    } catch (error) {
      console.log(error);

      let errorMessage = "An unknown error occurred. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "The password you entered is incorrect.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credential.";
      }
      toast.error(errorMessage);
      return { status: "error", message: errorMessage };
    } finally {
      setIsAuthLoading(false);
    }
  }

  async function forgotPassword(email) {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      toast.success("Password reset email sent successfully");
      return {
        status: "success",
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      console.log(error);

      let errorMessage =
        "An error occurred while sending the password reset email.";

      if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "A network error occurred. Please try again later.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many password reset requests. Please try again later.";
      }

      toast.error(errorMessage);
      return { status: "error", message: errorMessage };
    }
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userData = userCredential.user;
      setUser(userData);
      toast.success("User logged in successfully");
      return { status: "success", message: "User logged in successfully" };
    } catch (error) {
      console.log(error);
      let errorMessage = "An unknown error occurred. Please try again.";

      if (error.code === "auth/popup-blocked") {
        errorMessage = "The sign-in popup was blocked by your browser.";
      } else if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "The popup was closed before completing the sign-in.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        errorMessage =
          "An account already exists with the same email but a different sign-in method.";
      }

      toast.error(errorMessage);
      return { status: "error", message: errorMessage };
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      await axiosPublic.post("/jwt/logout");
      setUser(null);
      toast.success("User logged out successfully");
      return { status: "success", message: "User logged out successfully" };
    } catch (error) {
      console.log(error);

      let errorMessage = "An unexpected error occurred.";
      if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
        errorMessage = "Network error. Please try again later.";
      } else if (error.code === "auth/no-current-user") {
        toast.error("No user is currently logged in.");
        errorMessage = "No user is currently logged in.";
      }

      toast.error(errorMessage);
      return { status: "error", message: errorMessage };
    }
  }

  useEffect(() => {
    setIsAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      try {
        if (currUser) {
          setUser(currUser);
          await axiosPublic.post("/jwt/login", {
            email: currUser.email,
            name: currUser.displayName,
            imageUrl: currUser.photoURL,
          });
        } else {
          setUser(null);
          await axiosPublic.post("/jwt/logout");
        }
      } catch (error) {
        console.error("Error handling authentication state:", error);
      } finally {
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthLoading) return <Loader />;

  const value = {
    registerWithEmail,
    loginWithEmail,
    forgotPassword,
    loginWithGoogle,
    logout,
    isAuthLoading,
    user,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(authContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}
