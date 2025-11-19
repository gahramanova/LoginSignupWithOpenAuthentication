import { useState } from "react";
import loginAuth from "../../public/assets/img/loginAuth.png"
import DynamicLayout from "../layout/DynamicLayout"
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/authContext";
import { doSignInWithEmailandPassword, doSignWithGoogle } from "../firebase/auth";
import { Link, useNavigate } from "react-router";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<any>(null);
    const [password, setPassword] = useState<any>(null);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState({
        email: false,
        google: false,
        github: false
    });

    const formSubmit = async (e: any) => {
        e.preventDefault();
        setLoading({ email: true, google: false, github: false });
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Please fill in both email and password fields.");
            setLoading({ email: false, google: false, github: false });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setLoading({ email: false, google: false, github: false });
            return;
        }

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailandPassword({ email, password });
                navigate("/");
            } catch (err: any) {
                console.log(err.code);
                switch (err.code) {
                    case "auth/invalid-credential":
                        setErrorMessage("User not found. Please try again.");
                        break;
                    default:
                        setErrorMessage("Login failed. Please try again.");
                        break;
                }
                setIsSigningIn(false);
                setLoading({ email: false, google: false, github: false });
            }
        }
    };

    const onGoogleSignIn = async (e: any) => {
        e.preventDefault();
        setLoading({ email: false, google: true, github: false });

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignWithGoogle();
                // ✅ Google ilə login uğurlu olduqda yönləndir
                navigate("/");
            } catch (err) {
                console.log(err);
                setIsSigningIn(false);
                setLoading({ email: false, google: false, github: false });
            }
        }
    };

    return (
        <DynamicLayout>
            <div className="flex h-full">
                <div className="w-1/2 flex items-center justify-center text-white text-2xl">
                    <div className="flex">
                        <img src={loginAuth} width={600} height={650} />
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <form onSubmit={formSubmit}>
                        <div className="p-8 w-96 text-center">
                            <h2 className="text-3xl text-[#407BFF] font-semibold mb-3">Log in to Deeply</h2>
                            <div className="w-full mb-5">
                                <input
                                    type="text"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border text-left border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-[#407BFF] focus:border-[#407BFF]"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full border text-left border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-[#407BFF] focus:border-[#407BFF] mt-2"
                                />
                                {errorMessage && (
                                    <span className="text-red-600 font-normal">{errorMessage}</span>
                                )}
                            </div>
                            <button type="submit" className="w-full text-white border border-gray-300 rounded-md py-2 bg-[#7AA3FF]">
                                {loading.email ? "Signing in..." : "Continue with email"}
                            </button>
                            <hr className="mt-3 border border-gray-300" />

                            <button
                                className="w-full flex items-center justify-center text-white border border-gray-300 rounded-md py-2 bg-[#407BFF] mb-3 mt-5"
                                disabled={isSigningIn}
                                onClick={(e) => onGoogleSignIn(e)}
                            >
                                <FcGoogle className="text-xl mx-1" />
                                {loading.google ? "Signing in..." : "Continue with Google"}
                            </button>

                            <p className="text-sm text-gray-400 mt-4">
                                Don’t have an account?{" "}
                                <Link to={"/register"} className="text-blue-500">Sign up</Link>
                            </p>
                            <footer className="text-xs text-gray-400 mt-6">
                                Secure OAuth 2.0 authentication powered by Firebase
                            </footer>
                        </div>
                    </form>
                </div>
            </div>
        </DynamicLayout>
    );
}
