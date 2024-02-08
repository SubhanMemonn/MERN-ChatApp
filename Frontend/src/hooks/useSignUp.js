import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast";
import axios from "axios"

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, gender, password }) => {
        const success = checkInput({ fullName, username, gender, password })
        if (!success) return;
        setLoading(true)
        try {
            const { data } = await axios.post("/api/users/signup", {
                fullName, username, password, gender
            }, {
                headers: { "Content-Type": "application/json" }
            })
            console.log(data);
            if (data) {
                toast.success(data.message)
                setAuthUser(data.data.user)
                localStorage.setItem("user", JSON.stringify(data.data.user))
            }

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }

    }
    return { loading, signup }
}
function checkInput({ fullName, username, gender, password }) {
    if (!fullName || !username || !password || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true
}
export default useSignup;