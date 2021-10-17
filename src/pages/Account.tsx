import { VFC, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { userStatus, selectUser } from "../models/User";
import { Grid, Typography, Container, Paper, Box } from '@mui/material';
import Cookies from 'js-cookie';

// export type Props = {
//   user: userStatus;
// }

const Acount: VFC = () => {
  const history = useHistory();
  const isLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;
  const userStatus: userStatus = useAppSelector(selectUser);
  const userInfo = userStatus.userData;

  useEffect(() => {
    if (!isLogined) {
      history.push("/login");
    }
  }, [userStatus]);

  return (
    <Container sx={{ pb: 20, pt: 10 }}>
      {userInfo? <h1>Account: {userInfo.username}</h1>: null}
      </Container>
  )
}
export default Acount;