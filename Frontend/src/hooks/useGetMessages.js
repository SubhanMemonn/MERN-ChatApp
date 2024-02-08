import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import axios from "axios"
import toast from "react-hot-toast"



const useGetMessages = () => {
    const [loading, setLoding] = useState(false)
    const { selectedConversation, messages, setMessages } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoding(true)
            try {
                const { data } = await axios.get(`/api/messages/${selectedConversation._id}`)
                // console.log(data);
                if (data.data) {
                    setMessages(data.data)

                }
            } catch (error) {
                setMessages([])
                if (error.messages) toast.error(error.messages)
            } finally {
                setLoding(false)
            }
        }
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages }
}
export default useGetMessages;