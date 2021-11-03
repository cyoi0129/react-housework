// Basic Library
import { VFC, FormEvent, useContext, useState, useEffect } from "react";
import { useAppDispatch } from '../app/hooks';
import { useHistory } from "react-router-dom";
import { langSet, webPath, imgPath } from "../config";

// Models
import { userRegister, changeNavigation } from "../models";
import { registerData, userStatus } from "../models/types";
import { UserContext } from '../App';

// UI
import { createTheme, ThemeProvider, Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Register: VFC = () => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus: userStatus = useContext(UserContext).user;
  const loginError: string = userStatus.error;
  const [showError, setShowError] = useState<boolean>(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerInfo:registerData = {username: String(data.get('user')), email: String(data.get('email')), password1: String(data.get('password')), password2: String(data.get('password_confirm'))};
    dispatch(userRegister(registerInfo));
  };

  const toLogin = (event: any) => {
    event.preventDefault();
    history.push(webPath + 'login');
  };

  useEffect(() => {
    if (userStatus.isLogined) {
      history.push(webPath + 'account');
      dispatch(changeNavigation(3));
    }
    if (userStatus.error === '') {
      setShowError(false);
    } else {
      setShowError(true);
    }
  }, [dispatch, userStatus]);

  return (
    <Box sx={{ 
        backgroundImage: `url('${imgPath}login.jpg')`,
        backgroundPosition: 'bottom center',
        minHeight: '100vh',
        pt: 12
      }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, .8)',
              borderRadius: '4px'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {langSet.register.title}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label={langSet.register.user}
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={langSet.register.email}
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={langSet.register.password1}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirm"
                label={langSet.register.password2}
                type="password"
                id="password_confirm"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {langSet.register.create}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={toLogin}>
                  {langSet.register.already}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Snackbar open={showError} autoHideDuration={3000} onClose={() => setShowError(false)} sx={{ zIndex: 30, width: '90%' }}>
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>{langSet.common.error.register}</Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;