import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast";
const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        const getConversation = async () => {

            setLoading(true)
            try {
                const { data } = await axios.get("/api/users")
                // console.log(data);
                if (data.data) {
                    setConversations(data.data)
                }
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        getConversation();
    }, [])
    return { loading, conversations };
}
export default useGetConversation;