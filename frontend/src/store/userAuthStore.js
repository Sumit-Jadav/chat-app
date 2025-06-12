import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
export const userAuthStore = create((set) => ({
  authUser: null, //? EITHER LOGGEDIN USER OR NULL
  isSigningUp: false, //? Is signup page is active
  isSigningIn: false, //? Is signIn page is active
  isUpdatingProfile: false, //?is UpdatePage is active
  isCheckingAuth: true, //? Check for everytime when user reload the page
  checkAuth: async () => {
    //?check user is authenticated or not
    try {
      const response = axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log(`User AuthStore Error : ${error}`);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false }); //?Authentication is complete
    }
  },
}));
