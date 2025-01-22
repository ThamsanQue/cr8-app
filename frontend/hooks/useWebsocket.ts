import useUserStore from "@/store/userStore";
import { useEffect, useRef, useState, useCallback } from "react";

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const websocketRef = useRef<WebSocket | null>(null);
  const userInfo = useUserStore((store) => store.userInfo);
  const blend_file = "PHOTOSHOOT.blend";

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8000/ws/${userInfo?.username}/browser/${blend_file}`
    );
    websocketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
      ws.send(JSON.stringify({ status: "Connected" }));
      ws.send(JSON.stringify({ command: "get_template_controls" }));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const requestTemplateControls = useCallback(() => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(
        JSON.stringify({ command: "get_template_controls" })
      );
    }
  }, []);

  return {
    websocket: websocketRef.current,
    isConnected,
    requestTemplateControls,
  };
};
