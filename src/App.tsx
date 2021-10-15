import { VFC, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Cookies from 'js-cookie';
import { Home, Login, Masters, Master, Tasks, Task, Register, Account } from "./pages";
import { Header, Footer, ScrollToTop } from './components';
import './App.css';
import { getUserData, selectUser } from "./models/User";
import { getMasterList, selectMaster } from "./models/Master";

const App: VFC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(selectUser);
  const masterStatus = useAppSelector(selectMaster);
  const isLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;

  useEffect(() => {
    if (isLogined) {
      dispatch(getUserData());
      dispatch(getMasterList());
      history.push("/");
    }
  }, [isLogined, dispatch]);
  
  return (
    <>
      <ScrollToTop />
      <Header isLogined={isLogined} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={Account} />
        <Route path="/masters" component={Masters} />
        <Route path="/master/:masterID" component={Master} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/task" component={Task} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
