import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("newMessage")
    }, [messages, socket, setMessages, selectedConversation?._id])
}
export default useListenMessages