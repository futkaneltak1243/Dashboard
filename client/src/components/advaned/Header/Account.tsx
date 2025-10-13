import { Settings, LogOut, Github, Linkedin } from "lucide-react"
import { AccountMenu } from "../../AccountMenu"
import useFetch from "../../../hooks/useFetch/useFetch"

type User = {
    id: number;
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
    avatar: string
}

type Data = {
    data: User
}


const Account = () => {

    const { data } = useFetch<Data>('/super-admin')

    const userData = data?.data

    const handleLinkedin = () => {
        window.open("https://www.linkedin.com/in/furkan-eltakriti-043687316/", "_blank")
    }

    const handleGithub = () => {
        window.open("https://github.com/futkaneltak1243/Dashboard", "_blank")
    }

    const handleManageAccount = () => {
        window.location.href = "/settings" // or navigate("/profile") if using React Router
    }
    return (
        <AccountMenu avatar={userData?.avatar || ""} name={userData?.fullname || "no name"} role={userData?.role || "user"} className="md:mr-[31px] mr-3">
            <AccountMenu.Item label="Visit my profile" Icon={Linkedin} onClick={handleLinkedin} iconClass="text-[#0A66C2]" />
            <AccountMenu.Item label="Give me a star" Icon={Github} onClick={handleGithub} iconClass="text-gray-800 dark:text-gray-200" />
            <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={handleManageAccount} iconClass="text-amber-500" />
            <AccountMenu.Item label="Logout" Icon={LogOut} onClick={() => null} iconClass="text-rose-500" />
        </AccountMenu>
    )
}

export default Account