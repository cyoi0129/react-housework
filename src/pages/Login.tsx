// Basic Library
import { VFC, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useHistory } from "react-router-dom";
import { langSet } from "../config";

// Models
import { loginData, selectUser, userLogin } from "../models/User";

// UI
import { createTheme, ThemeProvider, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login: VFC = () => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(selectUser);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginInfo:loginData = {username: String(data.get('user')), password: String(data.get('password'))};
    dispatch(userLogin(loginInfo));
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
              Login
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={toRegister}>
                    {"Create an account"}
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

export default Login;