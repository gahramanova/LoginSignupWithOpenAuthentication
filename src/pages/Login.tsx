import loginAuth from "../../public/assets/img/loginAuth.png"
import DynamicLayout from "../layout/DynamicLayout"
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

export default function Login() {
    return (
        <>
            <DynamicLayout>
                <div className="flex h-full">
                    <div className="w-1/2 flex items-center justify-center text-white text-2xl">
                        <div className=" flex">
                            <img src={loginAuth} width={600} height={650} />
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <form>
                            <div className="p-8 w-96 text-center">
                            <h2 className="text-3xl text-[#407BFF] font-semibold mb-3">Log in to Deeply</h2>
                            <div className="w-full mb-5">
                                <input
                                    type="text"
                                    placeholder="Enter your email address"
                                    className="w-full border text-left border-gray-300 rounded-md pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="w-full text-white border border-gray-300 rounded-md py-2 bg-[#7AA3FF]">Continue with Email</button>
                            <hr className="mt-3 border border-gray-300"/>
                            <button className="w-full flex items-center justify-center text-white border border-gray-300 rounded-md py-2 bg-[#407BFF] mb-3 mt-5">
                            <FcGoogle className="text-xl mx-1"/>
                            Continue with Google</button>
                            <button className="w-full flex items-center justify-center text-white border border-gray-300 rounded-md py-2 bg-[#407BFF]">
                            <SiGithub className="text-xl mx-1"/>
                            Continue with Github</button>

                            <p className="text-sm text-gray-400 mt-4">Don’t have an account? <a href="https://github.com/signup" className="text-blue-500">Sign up</a></p>
                            <footer className="text-xs text-gray-400 mt-6">
                                Secure OAuth 2.0 authentication powered by Firebase
                            </footer>
                        </div>
                        </form>
                    </div>
                </div>
            </DynamicLayout>

        </>
    )
}
