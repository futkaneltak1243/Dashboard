import { Input } from "../components/Input";
import { Dropdown } from "../components/Dropdown";
import { useTheme } from "../contexts/theme-context/ThemeContextProvider";
import { LaptopMinimal, Sun, MoonStar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import useFetch from "../hooks/useFetch/useFetch";
import { handleSubmit } from "../utils/handleSubmit";
import { uploadImages } from "../utils/uploadImages"
import toast from "react-hot-toast";

type User = {
    id: number;
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    status: string;
    avatar: string;
};

type Data = {
    data: User;
};

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const { data, refetch } = useFetch<Data>("/super-admin");
    const userData = data?.data;

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Populate inputs when data loads
    useEffect(() => {
        if (userData) {
            setFullname(userData.fullname);
            setUsername(userData.username);
            setEmail(userData.email);
            setAvatar(userData.avatar);
        }
    }, [userData]);

    // Handle avatar upload
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        try {
            setLoading(true);
            const urls = await uploadImages(Array.from(files));
            setAvatar(urls[0]); // assume one avatar image
        } catch (err) {
            console.error(err);
            alert("Failed to upload avatar");
        } finally {
            setLoading(false);
        }
    };

    // Handle Save
    const handleSave = async () => {
        await handleSubmit({
            url: "/super-admin",
            method: "PUT",
            data: { fullname, username, email, status: userData?.status || "active", avatar },
            setLoading,
            onSuccess: () => {
                toast.success("Your account settings have been updated!");
                refetch();
            },
            onError: (err) => toast.error(err),
        });
    };

    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">
                General Settings
            </h1>

            <div className="w-full rounded-xl bg-items-light dark:bg-items-dark mt-[45px] pb-[40px]">
                <h2 className="text-text-light dark:text-text-dark text-xl pt-5 pl-5">
                    Account
                </h2>

                {/* Avatar Section */}
                <div className="h-35 w-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-gray-300">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                    Avatar
                                </div>
                            )}
                        </div>

                        <label className="mt-2 text-blue-500 cursor-pointer hover:underline text-sm">
                            Upload Avatar
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Editable Fields */}
                <div className="w-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-[15px] sm:gap-[30px] lg:gap-[50px]  w-11/12 lg:w-8/12">
                        <div>
                            <p className="text-sm dark:text-lightgray text-darkgray mb-[11px]">Name</p>
                            <Input
                                size="md"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <p className="text-sm dark:text-lightgray text-darkgray mb-[11px]">Username</p>
                            <Input
                                size="md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <p className="text-sm dark:text-lightgray text-darkgray mb-[11px]">Email</p>
                            <Input
                                size="md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <h2 className="text-text-light dark:text-text-dark text-xl pt-10 pl-5">Appearance</h2>
                <div className="flex items-center justify-center">
                    <div className="pt-7 w-11/12 lg:w-8/12">

                        <Dropdown>
                            <Dropdown.Button
                                Icon={theme === "system" ? LaptopMinimal : theme === "light" ? Sun : MoonStar}
                                label={theme}
                            />
                            <Dropdown.Menu z={50}>
                                <Dropdown.MenuItem
                                    Icon={LaptopMinimal}
                                    label="system"
                                    onClick={() => setTheme("system")}>
                                </Dropdown.MenuItem>
                                <Dropdown.MenuItem
                                    Icon={Sun}
                                    label="light"
                                    onClick={() => setTheme("light")}>
                                </Dropdown.MenuItem>
                                <Dropdown.MenuItem
                                    Icon={MoonStar}
                                    label="dark"
                                    onClick={() => setTheme("dark")}>
                                </Dropdown.MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                {/* Save Button */}
                <div className="w-full flex items-center justify-center mt-10">
                    <Button size="base" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
