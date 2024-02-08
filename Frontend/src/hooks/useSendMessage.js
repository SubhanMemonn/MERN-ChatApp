import { useState } from "react"
import useConversation from "../zustand/useConversation"
import axios from "axios"
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/api/messages/${selectedConversation?._id}`, { message }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.data) {
                setMessages([...messages, data.data])
            }
        } catch (error) {
            if (error.message) {
                toast.error(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage }
}
export default useSendMessage;