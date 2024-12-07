import { Typography, Container } from '@mui/material';
import type { ReactNode } from 'react';

interface ContainerPageProps {
  title: string;
  children: ReactNode;
}

function ContainerPage({ title, children }: ContainerPageProps) {
  return (
    <>
      <Typography variant='h4' align='center' gutterBottom>
        {title}
      </Typography>
      <Container maxWidth='lg' sx={{ mt: 2 }}>
        {children}
      </Container>
    </>
  );
}

export default ContainerPage;
