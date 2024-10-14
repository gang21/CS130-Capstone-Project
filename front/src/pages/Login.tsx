import { Formik, Form, FormikHelpers } from "formik";
import { Button, Grid2, Typography } from "@mui/material";
import TextField from "../components/forms/TextField";
import { Credentials } from "@shared_types";
import { login } from "../actions/session";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../redux/hook";

function LoginPage() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");

  const handleOnSubmit = async (
    values: Credentials,
    { setSubmitting }: FormikHelpers<Credentials>
  ) => {
    try {
      const token = await dispatch(login(values));
      if (token) {
        console.log("Logged in successfully");
      }
    } catch (error) {
      console.error("Error when trying to connect", error);
      setError("Mot de passe ou identifiant incorrect");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <Grid2 size={{ xs: 12, md: 6, sm: 8, lg: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Connexion
        </Typography>
        {error && (
          <Typography variant="caption" color="red">
            {error}
          </Typography>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />
              <TextField
                type="password"
                name="password"
                label="Mot de passe"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Se connecter
              </Button>
            </Form>
          )}
        </Formik>

        <Grid2>
          Si vous n'avez pas de compte, cliquez <Link to="/signup">ici</Link>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

export default LoginPage;
