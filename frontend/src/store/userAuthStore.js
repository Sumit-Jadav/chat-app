import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
export const userAuthStore = create((set) => ({
  authUser: null, //? EITHER LOGGEDIN USER OR NULL
  isSigningUp: false, //? Is signup page is active
  isSigningIn: false, //? Is signIn page is active
  isUpdatingProfile: false, //?is UpdatePage is active
  isCheckingAuth: true, //? Check for everytime when user reload the page
  isLoggingIn: false,
  checkAuth: async () => {
    //?check user is authenticated or not
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log(`User AuthStore Error : ${error}`);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false }); //?Authentication is complete
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out successfully");
    } catch (error) {
      toast.error(response.data.message);
    }
  },

  updateProfilePic: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.log("error in updating profile pic", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
