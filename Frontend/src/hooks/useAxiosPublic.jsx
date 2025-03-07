import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

function useAxiosPublic() {
  return axiosPublic;
}
export default useAxiosPublic;
