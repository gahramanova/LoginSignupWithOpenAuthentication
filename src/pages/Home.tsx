import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Message, 
  Security, 
  Group, 
  Speed,
  Smartphone 
} from '@mui/icons-material';
import { Button, Container, Grid, Card, CardContent } from '@mui/material';
import { COLORS } from '../constants/color';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <h1 className="text-5xl font-bold mb-6 text-gray-800">
                Modern <span style={{ color: COLORS.primary }}>Chat</span> Experience
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Stay connected with a fast, secure, and convenient chat app. Enjoy real-time messaging.
              </p>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button 
                    variant="contained" 
                    size="large"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Let's start!
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outlined" 
                    size="large"
                    style={{ color: COLORS.primary, borderColor: COLORS.primary }}
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="bg-white rounded-2xl shadow-xl p-6 border" style={{ borderColor: COLORS.secondary }}>
                {/* Chat app preview */}
                <div className="bg-gray-50 rounded-lg p-4 border" style={{ borderColor: COLORS.accent }}>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full mr-3" style={{ backgroundColor: COLORS.accent }}></div>
                    <div>
                      <div className="font-semibold">Narmin Gahramanova</div>
                      <div className="text-sm text-green-600">Online</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                        Hey, how are you?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="text-white rounded-lg p-3 max-w-xs" style={{ backgroundColor: COLORS.primary }}>
                        Fine, thanks! 🎉
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why <span style={{ color: COLORS.primary }}>Deeply</span>?
          </h2>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Speed style={{ fontSize: 48, color: COLORS.primary }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Fast</h3>
                  <p className="text-gray-600">
                    Communicate instantly with real-time messaging
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Security style={{ fontSize: 48, color: COLORS.primary }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Secure</h3>
                  <p className="text-gray-600">
                    Secure chat experience with end-to-end encryption
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Smartphone style={{ fontSize: 48, color: COLORS.primary }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Responsive</h3>
                  <p className="text-gray-600">
                    Responsive design that works perfectly on all devices
                  </p>
                </CardContent>
              </Card>
            </Grid>
                <Grid item xs={12} md={4}>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Smartphone style={{ fontSize: 48, color: COLORS.primary }} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-2">User-friendly</h3>
                  <p className="text-gray-600">
                    Responsive design that works perfectly on all devices
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: COLORS.primary }}>
        <Container maxWidth="lg">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
            Let's join now!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users and discover the modern chat experience
            </p>
            <Link to="/register">
              <Button 
                variant="contained" 
                size="large"
                style={{ 
                  backgroundColor: 'white', 
                  color: COLORS.primary,
                  fontWeight: 'bold'
                }}
              >
                Sign up for free!
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <Container maxWidth="lg">
          <div className="text-center">
            <p>&copy; 2024 Deeply. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;