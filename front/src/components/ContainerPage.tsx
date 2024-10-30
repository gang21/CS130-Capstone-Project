import { Typography, Container } from "@mui/material";
import { ReactNode } from "react";
import BackButton from "./BackButton";
import React from "react";

interface ContainerPageProps {
  title: string;
  children: ReactNode;
}

function ContainerPage({ title, children }: ContainerPageProps) {
  return (
    <>
      <BackButton />
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {children}
      </Container>
    </>
  );
}

export default ContainerPage;
