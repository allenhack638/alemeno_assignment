// hooks/useSocket.js
import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../globalVariables";
import { updateLikeCount } from "../redux/slices/coursesSlice";
import { useDispatch } from "react-redux";

const useSocket = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  // Memoize the socket instance to prevent re-creation
  const socketInstance = useMemo(
    () => io(SOCKET_URL, { autoConnect: false }),
    []
  );

  useEffect(() => {
    // Establish the socket connection
    socketInstance.connect();
    setSocket(socketInstance);

    // Event listeners for socket connection status
    socketInstance.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("updateLikesCount", (data) => {
      dispatch(
        updateLikeCount({
          id: data.courseId,
          likes: data.likes,
        })
      );
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
      socketInstance.off();
    };
  }, [socketInstance]);

  return { socket, isConnected };
};

export default useSocket;
