import { useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = (onEventReceived) => {
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/events", (message) => {
        if (message.body) {
          const event = JSON.parse(message.body);
          onEventReceived(event);
        }
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, [onEventReceived]);
};

export default useWebSocket;
