import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socket = io.connect("http://localhost:8000");

  useEffect(() => {

    return () => {
      socket.disconnect(); // Disconnect when the component unmounts
    };
  }, []);

  return socket;
};

export default useSocket;
