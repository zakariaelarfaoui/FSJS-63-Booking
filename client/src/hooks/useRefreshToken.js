import jwt_decode from "jwt-decode";

import axios from "../api/axios";

import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh-token", {
      withCredentials: true,
    });
    const payload = jwt_decode(response.data.accessToken);
    setAuth(payload)
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
