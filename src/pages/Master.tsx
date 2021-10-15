import { VFC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useRouteMatch } from "react-router";
import { MasterEdit } from '../components';
import { Container } from '@mui/material';
import { getMasterList, selectMaster, masterObject } from "../models/Master";
import { selectUser } from "../models/User";

const Master: VFC = () => {
  const match = useRouteMatch();
  const masterList = useAppSelector(selectMaster);
  const userStatus = useAppSelector(selectUser);
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