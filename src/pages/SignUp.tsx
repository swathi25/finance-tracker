import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Validation
  const validate = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!name.trim()) return "Name is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    if (mobile.length !== 10 || !/^\d+$/.test(mobile))
      return "Mobile must be 10 digits";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save extra user info in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        username: name,
        email,
        mobile,
      });

      console.log("User registered successfully");
      navigate("/login"); // go to login after signup
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("User already exists, redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // redirect after 2s
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create <span style={{ color: "#2575fc" }}>Account</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Sign up to start tracking your expenses
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: 2, mt: 3 }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, borderRadius: 2, py: 1.2 }}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <span
              style={{ color: "#2575fc", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
