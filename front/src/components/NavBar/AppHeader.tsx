import type React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hook';
import NavButton from './NavButton';
import HamburgerMenu from './HamburgerMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import FraudNinjaLogo from '../../images/FraudNinjaLogo.jpeg';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  onSignOutClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onSignOutClick }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { isLoggedIn } = useAppSelector((state) => state.session);
  const navigate = useNavigate();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
        >
          <IconButton onClick={() => navigate('/')}>
            <img
              src={FraudNinjaLogo}
              alt='App Icon'
              style={{ width: 160, height: 50 }}
            />
          </IconButton>
          {isLoggedIn && (
            <LogoutIcon onClick={onSignOutClick} sx={{ cursor: 'pointer' }} />
          )}
        </Typography>

        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <NavButton href='/play' label='Play Game' />
            <NavButton href='/resources' label='Resources' />
            <NavButton href='/Leaderboard' label='Leaderboard' />
          </div>
        )}

        {isLoggedIn && (
          <>
            <HamburgerMenu
              onSignOutClick={onSignOutClick}
              userInfo={userInfo}
            />
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>{userInfo.username}</Typography>
              <Typography sx={{ ml: 1, mr: 1 }}>
                <strong>{userInfo.overallScore}</strong>
              </Typography>
              <Typography>
                {userInfo.graduated && (
                  <SchoolIcon
                    sx={{ ml: 0.5, color: '#c2b5d9', verticalAlign: 'middle' }}
                  />
                )}
              </Typography>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
