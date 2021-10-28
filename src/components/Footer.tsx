// Basic Library
import { VFC, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Cookies from 'js-cookie';
import { langSet } from "../config";

// Models
import { changeNavigation, selectNavigation } from '../models';

// UI
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

const Footer: VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPage: number = useAppSelector(selectNavigation).currentPage;
  const [index, setIndex] = useState(currentPage);
  const path = ["/", "/task", "/masters", "/account"];
  const isLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;
  
  useEffect(()=>{
    setIndex(currentPage)
  },[currentPage]);

  const changePage = (targetPage: number) => {
    if (isLogined) {
      setIndex(targetPage);
      dispatch(changeNavigation(targetPage));
      history.push(path[targetPage]);
    } else {
      setIndex(3);
      dispatch(changeNavigation(3));
      history.push('/login');
    }
  }

  return (
    <Box>
      <BottomNavigation
        sx={{
          background: "#efefef",
          position: "fixed",
          width: "100%",
          bottom: 0,
          minHeight: 80,
          zIndex: 10,
        }}
        showLabels
        value={index}
        onChange={(event, newIndex) => changePage(newIndex)}
      >
        <BottomNavigationAction label={langSet.common.menu.home} icon={<HomeIcon />} />
        <BottomNavigationAction label={langSet.common.menu.task} icon={<EditIcon />} />
        <BottomNavigationAction label={langSet.common.menu.master} icon={<CategoryIcon />} />
        <BottomNavigationAction label={langSet.common.menu.account} icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Footer;