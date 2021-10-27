// Basic Library
import { VFC, useContext } from "react";
import { useAppSelector } from '../app/hooks';
import { useRouteMatch } from "react-router";
import { langSet } from "../config";

// Components
import { MasterEdit } from '../components';

// Models
import { selectMaster, masterObject } from "../models/Master";
import { userStatus } from "../models/User";
import { UserContext } from "../App";

// UI
import { Container } from '@mui/material';

const Master: VFC = () => {
  const match = useRouteMatch();
  const masterList = useAppSelector(selectMaster);
  const userStatus: userStatus = useContext(UserContext).user;
  const currentUserID = userStatus.userData? userStatus.userData.pk : 0;
  const masters: masterObject[] = masterList.masters;
  const { masterID } = match.params as { masterID: string };
  const targetMaster = masters.find(master => master.id === Number(masterID));
  const newMaster: masterObject = {
    id: null,
    user: currentUserID,
    type: '',
    name: '',
    point: 0
  }
  const masterData: masterObject = targetMaster? targetMaster : newMaster
  return (
    <Container maxWidth="sm" sx={{mt: 10}}>
      <MasterEdit master={masterData} />
    </Container>
  )
}
export default Master;