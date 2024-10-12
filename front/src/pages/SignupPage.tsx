import { Formik, Form, FormikHelpers } from "formik";
import { Button, Grid2, Typography } from "@mui/material";
import TextField from "../components/forms/TextField";
import { Credentials } from "@shared_types";
import { signup } from "../actions/session";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function SignupPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (
    values: Credentials,
    { setSubmitting }: FormikHelpers<Credentials>
  ) => {
    try {
      await signup(values);

      enqueueSnackbar("Compte créé avec succès !", {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error when trying to create the account", error);
      enqueueSnackbar(
        "Une erreur s'est produite durant la création de votre compte",
        {
          variant: "error",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid2 container justifyContent="center">
      <Grid2 size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Créer un compte
        </Typography>
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
                S'inscrire
              </Button>
            </Form>
          )}
        </Formik>
      </Grid2>
    </Grid2>
  );
}

export default SignupPage;
