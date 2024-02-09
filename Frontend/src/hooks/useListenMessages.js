import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation"
import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    console.log("selected id", selectedConversation._id);
    console.log("Auth user", authUser._id);
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