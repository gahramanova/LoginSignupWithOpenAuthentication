import { useSocketContext } from "../context/socketContext";

const useSocket = () => {
  const { socket } = useSocketContext();

  const joinRoom = (roomId: string) => {
    socket?.emit("joinRoom", roomId);
  };

  const sendMessage = (msg: any, ack?: (res: any) => void) => {
    socket?.emit("sendMessage", msg, ack);
  };

  const onReceiveMessage = (cb: (msg: any) => void) => {
    socket?.on("receiveMessage", cb);
    return () => socket?.off("receiveMessage", cb);
  };

  return {
    socket,
    joinRoom,
    sendMessage,
    onReceiveMessage,
  };
};

export default useSocket;
