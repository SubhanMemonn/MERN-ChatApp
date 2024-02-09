import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    console.log(selectedConversation._id);
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            if (selectedConversation?._id == newMessage.receiverId ||
                newMessage.senderId) {
                setMessages([...messages, newMessage])
            }
        })

        return () => socket?.off("newMessage")
    }, [messages, socket, setMessages, selectedConversation])
}
export default useListenMessages