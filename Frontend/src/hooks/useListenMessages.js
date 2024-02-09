import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log(newMessage);
            const sound = new Audio(notificationSound);
            sound.play();
            if (selectedConversation?._id === newMessage.senderId) {
                setMessages([...messages, newMessage])
            }
        })

        return () => {
            socket?.off("newMessage");
            // setMessages([])
        }
    }, [messages, socket, setMessages, selectedConversation])
}
export default useListenMessages