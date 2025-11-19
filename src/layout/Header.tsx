import logo from "../../public/assets/img/logo.png"
import { Button, Container } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import { COLORS } from '../constants/color'
import { useAuth } from "../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";

export default function Header() {
  const { userLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const shortName = currentUser?.email?.split("@")[0] || "";
  const formattedName = shortName.charAt(0).toUpperCase() + shortName.slice(1);

  const handleLogout = () => {
    logout(); // useAuth içindəki logout funksiyasını çağıırıq
    navigate("/login");
    setDropdownOpen(false)
  };

   useEffect(() => {
    if (!userLoggedIn) {
      setDropdownOpen(false);
    }
  }, [userLoggedIn]);


  return (
    <nav className="bg-white shadow-sm">
      <Container maxWidth="lg">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to={"/"}> <img src={logo} width={100} height={50} style={{ objectFit: "contain" }} /></Link>
          </div>
          <div className="flex gap-4 relative">
            {userLoggedIn ? (
              <div className="flex items-center gap-1 relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <AccountCircleIcon style={{ color: "#377CD4", width: "35px", height: "35px" }} />
                  <span className="text-gray-700 ml-1">Hi, {formattedName}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white border-[1px] border-gray-200 rounded-md shadow-xl w-40 h-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-center text-red-500 px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-blue-500 border-blue-500 border-[1px] px-4 py-2 rounded">
                  Sign in
                </Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>


  )
}
