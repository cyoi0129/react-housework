import { VFC, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { changeNavigation, selectNavigation } from '../models/Navigator';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';

const Footer: VFC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPage: number = useAppSelector(selectNavigation).currentPage;
  const [index, setIndex] = useState(currentPage);
  const path = ["/", "/tasks", "/task", "/masters"];
  
  useEffect(()=>{
    setIndex(currentPage)
  },[currentPage]);

  return (
    <Box>
      <BottomNavigation
        sx={{
          background: "#efefef",
          position: "fixed",
          width: "100%",
          bottom: 0,
          paddingBottom: 3,
          height: 80,
          zIndex: 10,
        }}
        showLabels
        value={index}
        onChange={(event, newIndex) => {
        setIndex(newIndex);
        dispatch(changeNavigation(newIndex));
        history.push(path[newIndex]);
      }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Summary" icon={<AssessmentIcon />} />
        <BottomNavigationAction label="Task" icon={<EditIcon />} />
        <BottomNavigationAction label="Master" icon={<CategoryIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Footer;