import loginAuth from "../../public/assets/img/loginAuth.png"
import DynamicLayout from "../layout/DynamicLayout"
import { SiGithub } from "react-icons/si";

export default function Login() {
    return (
        <>
            <DynamicLayout>
                <div className="flex h-full">
                    <div className="w-1/2 flex items-center justify-center text-white text-2xl">
                        <div className=" flex">
                            <img src={loginAuth} width={600} height={600} />
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center text-white text-2xl">
                        <div className="p-10 w-96 text-center">
                            <h2 className="text-3xl text-[#407BFF] font-semibold mb-2">Welcome back!</h2>
                            <p className="text-gray-500 text-lg mb-6">Login to continue with your GitHub account</p>
                            <button className="relative flex items-center justify-center w-full border border-gray-300 rounded-md py-5 hover:bg-gray-50 transition">
                                <SiGithub className="absolute left-4 text-black text-xl" />
                            </button>

                            <p className="text-sm text-gray-400 mt-4">Don’t have a GitHub account? <a href="https://github.com/signup" className="text-blue-500">Sign up</a></p>
                            <footer className="text-xs text-gray-400 mt-6">
                                Secure OAuth 2.0 authentication powered by Firebase
                            </footer>
                        </div>
                    </div>
                </div>
            </DynamicLayout>

        </>
    )
}
