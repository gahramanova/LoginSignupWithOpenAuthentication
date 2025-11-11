import logo from "../../public/assets/img/logo.png"
import { Button, Container } from '@mui/material'
import { Link } from 'react-router'
import { COLORS } from '../constants/color'
import { useAuth } from "../context/authContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  const { userLoggedIn, currentUser } = useAuth();
  const shortName = currentUser?.email?.split("@")[0] || "";
  const formattedName = shortName.charAt(0).toUpperCase() + shortName.slice(1);


  return (
    <nav className="bg-white shadow-sm">
      <Container maxWidth="lg">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={logo} width={100} height={50} style={{ objectFit: "contain" }} />
          </div>
          <div className="flex gap-4">
            {userLoggedIn ? (
              <div className="flex items-center gap-1">
                <AccountCircleIcon style={{ color: "#377CD4", width: "35px", height: "35px" }} />
                <span className="text-gray-700">Hi, {formattedName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-blue-500">Sign in</Link>
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
