// Basic Library
import { VFC, FormEvent, useState } from "react";
import { useAppDispatch } from '../app/hooks';
import { useHistory } from "react-router-dom";
import { langSet } from "../config";

// Components
import { Overlay, Notification } from "../components"

// Models
import { userLogin } from "../models";
import { loginData } from "../models/types";

// UI
import { createTheme, ThemeProvider, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login: VFC = () => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginInfo: loginData = { username: String(data.get('user')), password: String(data.get('password')) };
    dispatch(userLogin(loginInfo));
    setLoading(true);
    setTimeout(() => {
      setSnackBar(true);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const toRegister = (event: any) => {
    event.preventDefault();
    history.push('/register');
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {langSet.login.title}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label={langSet.login.user}
                name="user"
                autoComplete="user"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={langSet.login.password}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={langSet.login.remember}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {langSet.login.signin}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {langSet.login.forgot}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={toRegister}>
                    {langSet.login.create}
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

export default Login;