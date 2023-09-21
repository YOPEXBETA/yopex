import { useEffect } from "react";
import { io } from "socket.io-client";

const url = process.env.URL || "https://yopex-api.tabaani.co";

const useSocket = () => {
  const socket = io.connect(`${url}`);

  useEffect(() => {
    return () => {
      socket.disconnect(); // Disconnect when the component unmounts
    };
  }, []);

  return socket;
};

export default useSocket;
