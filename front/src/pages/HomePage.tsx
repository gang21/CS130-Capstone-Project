import { Container, Typography, Paper, Button, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FraudNinja from '../images/FraudNinja.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ padding: 5 }}>
      <Paper
        sx={{
          padding: 3,
          boxShadow: (theme) => `0px 4px 10px ${theme.palette.primary.main}`,
          // backgroundColor: '#f9f9ff',
          backgroundColor: 'black',
          borderRadius: 2,
        }}
      >
        <Grid2 container direction='column' alignItems='center'>
          <img
            src={FraudNinja}
            alt='App Icon'
            style={{ width: 550, height: 250 }}
          />
          <Typography
            variant='h1'
            fontSize={80}
            margin={4}
            align='center'
            color='primary'
          >
            Welcome to the game FraudNinja!
          </Typography>
          <Grid2>
            <Button
              variant='contained'
              size='large'
              onClick={() => navigate('/play')}
              sx={{
                fontSize: '1.5rem',
                padding: '10px 30px',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Play
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default HomePage;
