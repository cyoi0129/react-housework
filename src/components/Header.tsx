// Basic Library
import { VFC } from "react";
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { langSet } from "../config";

// Models
import { changeNavigation } from '../models/Navigator';

// UI
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export type Props = {
  isLogined: boolean;
}

const Header: VFC<Props> = (Props) => {
  const { isLogined } = Props;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const toLogin = () => {
    history.push("/login");
    dispatch(changeNavigation(3));
  }
  const toAccount = () => {
    history.push("/account");
    dispatch(changeNavigation(3));
  }
  return (
    <Box sx={{
      flexGrow: 1,
      position: "fixed",
      width: "100%",
      top: 0,
      zIndex: 10,
    }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <CleaningServicesIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {langSet.common.site}
          </Typography>
          {
            isLogined ? <IconButton size="large" color="inherit" aria-label="login" onClick={toAccount}>
              <AccountCircleIcon />
            </IconButton>
              :
              <IconButton size="large" color="inherit" aria-label="login" onClick={toLogin}>
                <LockOpenIcon /></IconButton>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;