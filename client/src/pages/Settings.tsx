import { Input } from "../components/Input"
import { Dropdown } from "../components/Dropdown"
import { useTheme } from "../contexts/theme-context/ThemeContextProvider"
import { LaptopMinimal, Sun, MoonStar } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/Button"
const Settings = () => {

    const { theme, setTheme } = useTheme()
    const [avatar, setAvatar] = useState<string | null>(null);


    return (

        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">General Settings</h1>

            <div className="w-full rounded-xl bg-items-light dark:bg-items-dark mt-[45px] pb-[40px]">
                <h2 className="text-text-light dark:text-text-dark text-xl pt-5 pl-5">Account</h2>
                <div className="h-35 w-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-gray-300">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                    Avatar
                                </div>
                            )}
                        </div>

                        {/* Upload text */}
                        <label className="mt-2 text-blue-500 cursor-pointer hover:underline text-sm">
                            Upload Avatar
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-[15px] sm:gap-[30px] lg:gap-[50px]  w-11/12 lg:w-8/12">
                        <div>
                            <p className="text-sm dark:text-lightgray text-darkgray mb-[11px]">Name</p>
                            <Input size="md" placeholder="Name" />
                        </div>
                        <div>
                            <p className="text-sm dark:text-lightgray text-darkgray mb-[11px]">Username</p>
                            <Input size="md" placeholder="Username" />
                        </div>
                        <div>
                            <p className="text-sm dark:text-lightgray text-darkgray mb-[11px]">Email</p>
                            <Input size="md" placeholder="Email" />
                        </div>


                    </div>

                </div>
                <h2 className="text-text-light dark:text-text-dark text-xl pt-10 pl-5">Appearance</h2>
                <div className="flex items-center justify-center">
                    <div className=" pt-7 w-11/12 lg:w-8/12">
                        <Dropdown>
                            <Dropdown.Button
                                Icon={theme === "system" ? LaptopMinimal : theme === "light" ? Sun : MoonStar}
                                label={theme}
                            />
                            <Dropdown.Menu>
                                <Dropdown.MenuItem Icon={LaptopMinimal} label="system" onClick={() => setTheme("system")}></Dropdown.MenuItem>
                                <Dropdown.MenuItem Icon={Sun} label="light" onClick={() => setTheme("light")}></Dropdown.MenuItem>
                                <Dropdown.MenuItem Icon={MoonStar} label="dark" onClick={() => setTheme("dark")}></Dropdown.MenuItem>

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>
                <div className="w-full flex items-center justify-center mt-10">
                    <Button size="base">Save</Button>
                </div>


            </div>

        </div>
    )
}

export default Settings