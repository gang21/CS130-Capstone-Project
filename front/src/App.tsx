import { Container, AppBar, Typography } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Container>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          FraudNinja
        </Typography>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Container>
    </Container>
  );
}

export default App;
