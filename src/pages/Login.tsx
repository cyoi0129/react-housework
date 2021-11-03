// Basic Library
import { VFC, FormEvent, useContext, useState, useEffect } from "react";
import { useAppDispatch } from '../app/hooks';
import { useHistory } from "react-router-dom";
import { langSet, webPath, imgPath } from "../config";

// Models
import { userLogin, changeNavigation } from "../models";
import { loginData, userStatus } from "../models/types";
import { UserContext } from '../App';

// UI
import { createTheme, ThemeProvider, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login: VFC = () => {
  const theme = createTheme();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus: userStatus = useContext(UserContext).user;
  const loginError: string = userStatus.error;
  const [showError, setShowError] = useState<boolean>(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginInfo: loginData = { username: String(data.get('user')), password: String(data.get('password')) };
    dispatch(userLogin(loginInfo));
  };

  const toRegister = (event: any) => {
    event.preventDefault();
    history.push(webPath + 'register');
  }

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
        <Snackbar open={showError} autoHideDuration={3000} onClose={() => setShowError(false)} sx={{ zIndex: 30, width: '90%' }}>
          <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>{langSet.common.error.login}</Alert>
        </Snackbar>
    </Box>
  );
}

export default Login;