// Basic Library
import { VFC } from "react";
import { useHistory } from 'react-router-dom';

// Models
import { masterObject } from "../models/Master";

// UI
import { Grid, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, Divider, ListItemButton } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BathtubIcon from '@mui/icons-material/Bathtub';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import HotelIcon from '@mui/icons-material/Hotel';
import WashIcon from '@mui/icons-material/Wash';
import TaskIcon from '@mui/icons-material/Task';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { langSet } from "../config";

export type Props = {
  master: masterObject;
}

const iconList = [
  {
    name: 'cook',
    display: langSet.common.category.cook,
    icon: <OutdoorGrillIcon />
  },
  {
    name: 'bath',
    display: langSet.common.category.bath,
    icon: <BathtubIcon />
  },
  {
    name: 'delivery',
    display: langSet.common.category.delivery,
    icon: <EscalatorWarningIcon />
  },
  {
    name: 'clean',
    display: langSet.common.category.clean,
    icon: <CleaningServicesIcon />
  },
  {
    name: '‎laundry',
    display: langSet.common.category.laundry,
    icon: <DryCleaningIcon />
  },
  {
    name: 'sleep',
    display: langSet.common.category.sleep,
    icon: <HotelIcon />
  },
  {
    name: 'wash',
    display: langSet.common.category.wash,
    icon: <WashIcon />
  },
  {
    name: 'child',
    display: langSet.common.category.child,
    icon: <ChildCareIcon />
  },
  {
    name: 'others',
    display: langSet.common.category.others,
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
  const findDisplayName = (name: string) => {
    const targetDisplayName = iconList.find(icon => icon.name === name);
    const resultDisplayName = targetDisplayName ? targetDisplayName.display : langSet.common.category.others;
    return resultDisplayName;
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
              <ListItemText primary={master.name} secondary={findDisplayName(master.type)} />
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