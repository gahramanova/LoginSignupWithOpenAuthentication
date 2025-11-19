import { useEffect, useState } from 'react'
import DynamicLayout from '../layout/DynamicLayout'
import { Link, useNavigate } from 'react-router'
import loginAuth from "../../public/assets/img/loginAuth.png"
import { doCreateUserWithEmailandPassword } from '../firebase/auth'
import { useAuth } from '../context/authContext'

export default function Register() {

    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState<any>(null)
    const [password, setPassword] = useState<any>(null)
    const [confirmPassword, setConfirmPassword] = useState<any>(null)
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const formSubmit = async (e: any) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true)


            try {
                await doCreateUserWithEmailandPassword({ email, password })
                navigate("/")
            } catch (err: any) {
                console.log(err.code)
                switch (err.code) {
                    case "auth/email-already-in-use":
                        setErrorMessage("This email is already registered.");
                        break;
                    case "auth/invalid-email":
                        setErrorMessage("Invalid email format.");
                        break;
                    case "auth/weak-password":
                        setErrorMessage("Password is too weak.");
                        break;
                    default:
                        setErrorMessage("Something went wrong. Please try again.");
                }
            }
        }
    }

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (userLoggedIn) {
    //         navigate("/"); // Home səhifəsinə yönləndir
    //     }
    // }, [userLoggedIn, navigate]);
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
                        <form onSubmit={formSubmit}>
                            <div className="p-8 w-96 text-center">
                                <h2 className="text-3xl text-[#407BFF] font-semibold mb-3">Register to Deeply</h2>
                                <div className="w-full mb-5">
                                    <input
                                        type="text"
                                        placeholder="Enter your email address"
                                        required
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border text-left border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-[#407BFF] focus:border-[#407BFF]"
                                    />
                                    <input
                                        type="password"
                                        required
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full border text-left border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-[#407BFF] focus:border-[#407BFF] mt-2"
                                    />
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full border text-left border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-[#407BFF] focus:border-[#407BFF] mt-2"
                                    />

                                    {errorMessage && (
                                        <span className="text-red-600 font-normal">{errorMessage}</span>
                                    )}
                                </div>
                                <button type="submit" className="w-full text-white border border-gray-300 rounded-md py-2 bg-[#7AA3FF]">{isRegistering ? "Registering" : "Register"}</button>
                                <hr className="mt-3 border border-gray-300" />

                                <p className="text-sm text-gray-400 mt-4">Already have an account? <Link to={"/login"} className="text-blue-500">Sign up</Link></p>
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
