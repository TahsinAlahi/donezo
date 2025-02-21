import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAxiosSecure() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
    params: { email: user?.email },
  });

  useEffect(() => {
    const secureResponse = axiosSecure.interceptors.request.use(
      (response) => response,
      async (err) => {
        if ([401, 403].includes(err.response.status)) {
          await logout();
          console.error("token expired");
          navigate("/");
        }
        return Promise.reject(err);
      }
    );

    return () => axiosSecure.interceptors.request.eject(secureResponse);
  }, []);

  return axiosSecure;
}

export default useAxiosSecure;
