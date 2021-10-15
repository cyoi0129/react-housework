import { VFC, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Grid, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, Divider, ListItemButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { masterObject } from "../models/Master";
import BathtubIcon from '@mui/icons-material/Bathtub';  // bath
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';  // delivery
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';  // clean
import DryCleaningIcon from '@mui/icons-material/DryCleaning';  // laundry
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';  // cook
import HotelIcon from '@mui/icons-material/Hotel';  // sleep
import WashIcon from '@mui/icons-material/Wash';  // wash
import TaskIcon from '@mui/icons-material/Task';  // others
import ChildCareIcon from '@mui/icons-material/ChildCare';  // child

export type Props = {
  master: masterObject;
}

const iconList = [
  {
    name: 'cook',
    icon: <OutdoorGrillIcon />
  },
  {
    name: 'bath',
    icon: <BathtubIcon />
  },
  {
    name: 'delivery',
    icon: <EscalatorWarningIcon />
  },
  {
    name: 'clean',
    icon: <CleaningServicesIcon />
  },
  {
    name: '‎laundry',
    icon: <DryCleaningIcon />
  },
  {
    name: 'sleep',
    icon: <HotelIcon />
  },
  {
    name: 'wash',
    icon: <WashIcon />
  },
  {
    name: 'child',
    icon: <ChildCareIcon />
  },
  {
    name: 'others',
    icon: <TaskIcon />
  }
]

const MasterView: VFC<Props> = (Props) => {
  const history = useHistory();
  const { master } = Props;
  const findIcon = (name: string) => {
    const targetIcon = iconList.find(icon => icon.name === name);
    const resultIcon = targetIcon ? targetIcon.icon : <TaskIcon />;
    return resultIcon;
  }
  const toMaster = () => {
    history.push(`/master/${master.id}`);
  }
  return (
    <>
      <ListItem sx={{ pt: 2, pb: 2 }}>
        <ListItemButton component="a" onClick={toMaster}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <ListItemAvatar>
                <Avatar>
                  {findIcon(master.type)}
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item xs={6}>
              <ListItemText primary={master.name} secondary={master.type} />
            </Grid>
            <Grid item xs={1}>
              <ListItemIcon sx={{ pt: 2 }}>
                <LocalParkingIcon />
              </ListItemIcon>
            </Grid>
            <Grid item xs={3}>
              <ListItemText primary={master.point} sx={{ pt: 2 }} />
            </Grid>
          </Grid>
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default MasterView;