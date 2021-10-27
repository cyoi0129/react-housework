// Basic Library
import { VFC } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { langSet } from "../config";

// Models
import { userStatus, selectUser, userLogout } from "../models/User";

// UI
import { Typography, Container, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Acount: VFC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus: userStatus = useAppSelector(selectUser);
  const userInfo = userStatus.userData;
  const logout = () => {
    dispatch(userLogout());
    history.push("/");
  }

  return (
    <Container sx={{ pb: 20, pt: 10 }}>
      {userInfo? 
        <>
          <h1></h1>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Welcome {userInfo.username} !
          </Typography>
          <Typography variant="h6" component="p" sx={{ flexGrow: 1, my: 4, px: 2 }}>
            Email: {userInfo.email}
          </Typography>
          <Button variant="contained" startIcon={<LogoutIcon />} sx={{ m:1, p: 1, width: 120 }} onClick={logout}>Logout</Button>
        </>
      : null}
    </Container>
  )
}
export default Acount;