import { useEffect } from "react";
import { postFetchData } from "../api/api";

const signout = () => {
  const callData = async () => {
    try {
      const response = await postFetchData(
        "http://localhost:8080/api/v1/signOut"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callData();
  }, []);
  return <div>signing you out...</div>;
};

export default signout;
