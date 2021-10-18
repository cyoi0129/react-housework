import { VFC, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Switch, Route } from 'react-router';
import { userStatus, selectUser, userLogout } from "../models/User";
import { Grid, Typography, Container, Paper, Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';

// export type Props = {
//   user: userStatus;
// }

const Acount: VFC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;
  const userStatus: userStatus = useAppSelector(selectUser);
  const userInfo = userStatus.userData;
  const logout = () => {
    dispatch(userLogout());
    history.push("/");
  }

  useEffect(() => {
    if (!isLogined) {
      history.push("/login");
    }
  }, [userStatus]);

  return (
    <Container sx={{ pb: 20, pt: 10 }}>
      {userInfo? 
        <>
          <h1>Account: {userInfo.username}</h1>
          <Button variant="contained" startIcon={<LogoutIcon />} sx={{ m:1, p: 1, width: 120 }} onClick={logout}>Logout</Button>
        </>
      : null}
    </Container>
  )
}
export default Acount;