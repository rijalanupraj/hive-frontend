import {
  CssBaseline,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../../constants";

const ResetPassword = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get("token");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post(`http://localhost:8000/api/v1/auth/reset/${token}`, {
        password,
      })
      .then((res) => {
        console.log(res);
        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`${BACKEND_API_URL}/auth/reset/${token}`);
        console.log(res);
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    };
    checkToken();
  }, []);

  return (
    <>
      <CssBaseline />
      <main>
        <form onSubmit={onFormSubmit}>
          <Container maxWidth="sm">
            <div>
              <div>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  style={{
                    marginTop: "1rem",
                    fontWeight: "bold",
                    fontFamily: "arial",
                    fontSize: "35px",
                  }}
                >
                  Reset Password
                </Typography>
              </div>

              <div>
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  style={{
                    marginTop: "3vh",
                    fontFamily: "arial",
                    fontSize: "15px",
                    color: "#959696",
                  }}
                >
                  Please enter your new password.
                </Typography>
              </div>

              <div>
                <TextField
                  type="password"
                  fullWidth
                  required
                  label="New Password"
                  id="fullWidth"
                  style={{ marginTop: "2vh" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  type="password"
                  fullWidth
                  required
                  label="Confirm Password"
                  id="fullWidth"
                  style={{ marginTop: "2vh" }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <Alert severity="error" style={{ marginTop: "2vh" }}>
                  {error}
                </Alert>
              )}

              <div>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth={true}
                  style={{
                    padding: "13px",
                    marginTop: "1vh",
                    borderRadius: "10px",
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </Container>
        </form>
      </main>
    </>
  );
};

export default ResetPassword;
