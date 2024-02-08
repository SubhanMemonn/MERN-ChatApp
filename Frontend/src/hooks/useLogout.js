import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post("/api/users/logout", {
                headers: { "Content-Type": "application/json" }
            })

            if (data) {
                localStorage.removeItem("user")
                toast.success(data.message)
                setAuthUser(null)
            }

        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return { loading, logout }
}
export default useLogout;