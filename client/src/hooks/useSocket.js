import { useEffect } from "react";
import { io } from "socket.io-client";

const url = process.env.REACT_APP_API_ENDPOINT;

const useSocket = () => {
  const socket = io?.connect(`${url}`);

  useEffect(() => {
    return () => {
      socket?.disconnect(); // Disconnect when the component unmounts
    };
  }, []);

  return socket;
};

export default useSocket;
