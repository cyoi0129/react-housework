// Basic Library
import { VFC, FormEvent, useState } from "react";
import { useAppDispatch } from '../app/hooks';
import { useHistory } from "react-router-dom";
import { langSet } from "../config";

// Components
import { Overlay, Notification } from "../components"

// Models
import { userRegister } from "../models";
import { registerData } from "../models/types";

// UI
import { createTheme, ThemeProvider, Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Register: VFC = () => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerInfo:registerData = {username: String(data.get('user')), email: String(data.get('email')), password1: String(data.get('password')), password2: String(data.get('password_confirm'))};
    dispatch(userRegister(registerInfo));
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      <Overlay isDisplay={loading} />
      <Notification isDisplay={snackBar} />
    </Box>
  );
}

export default Register;