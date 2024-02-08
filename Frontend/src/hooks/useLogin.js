import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios"

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        if (!username || !password) { return toast.error("Username or password are required"); }
        setLoading(true)
        try {
            const { data } = await axios.post("/api/users/login", {
                username, password
            }, {

                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(data);
            if (data.data) {
                localStorage.setItem("user", JSON.stringify(data.data.user))
                setAuthUser(data.data.user)
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }


    }
    return { loading, login }
}

export default useLogin;