import { Settings } from "lucide-react"
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
    return (
        <AccountMenu avatar={userData?.avatar || ""} name={userData?.fullname || "no name"} role={userData?.role || "user"} className="md:mr-[31px] mr-3">
            <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
            <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
            <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
            <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
        </AccountMenu>
    )
}

export default Account