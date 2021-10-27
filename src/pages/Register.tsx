// Basic Library
import { VFC, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useHistory } from "react-router-dom";
import { langSet } from "../config";

// Models
import { selectUser, userRegister, registerData } from "../models/User";

// UI
import { createTheme, ThemeProvider, Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Register: VFC = () => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(selectUser);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerInfo:registerData = {username: String(data.get('user')), email: String(data.get('email')), password1: String(data.get('password')), password2: String(data.get('password_confirm'))};
    dispatch(userRegister(registerInfo));
  };

  const toLogin = (event: any) => {
    event.preventDefault();
    history.push('/login');
  }
  return (
    <Box sx={{ 
        backgroundImage: "url('/login.jpg')",
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
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="User"
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password_confirm"
                label="Password Confirm"
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
                Create
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={toLogin}>
                    {"Already have an account"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export default Register;