import logo from "../../public/assets/img/logo.png"
import { Button, Container } from '@mui/material'
import { Link } from 'react-router'
import { COLORS } from '../constants/color'

export default function Header() {


    return (
       <nav className="bg-white shadow-sm">
        <Container maxWidth="lg">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
             <img src={logo} width={100} height={50} style={{objectFit:"contain"}}/>
            </div>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outlined" style={{ color: COLORS.primary, borderColor: COLORS.primary }}>
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained" style={{ backgroundColor: COLORS.primary }}>
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </nav>


    )
}
