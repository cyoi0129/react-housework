// Basic Library
import { VFC, useEffect, createContext } from "react";
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Cookies from 'js-cookie';

// Pages & Components
import { Home, Login, Masters, Master, Task, Register, Account } from "./pages";
import { Header, Footer, ScrollToTop } from './components';
import { webPath } from './config';

// Models
import { getUserData, selectUser, setLoginStatus, getMasterList, changeNavigation } from "./models";
import { userStatus } from './models/types';

// UI
import './App.css';

export const UserContext = createContext({} as {
  user: userStatus;
})

const App: VFC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userStatus: userStatus = useAppSelector(selectUser);
  const isLogined: boolean = Cookies.get('isLogined') === '1' ? true : false;

  useEffect(() => {
    if (isLogined) {
      dispatch(getUserData());
      dispatch(getMasterList());
      dispatch(setLoginStatus());
      history.push(webPath);
      dispatch(changeNavigation(0));
    } else {
      history.push(webPath + 'login');
      dispatch(changeNavigation(3));
    }
  }, [isLogined, dispatch]);

  return (
    <>
      <UserContext.Provider value={{ user: userStatus }}>
        <ScrollToTop />
        <Header isLogined={isLogined} />
        <Switch>
          <Route exact path={webPath} component={Home} />
          <Route path={webPath + 'login'}  component={Login} />
          <Route path={webPath + 'register'} component={Register} />
          <Route path={webPath + 'account'} component={Account} />
          <Route path={webPath + 'masters'} component={Masters} />
          <Route path={webPath + 'master/:masterID'} component={Master} />
          <Route path={webPath + 'task'} component={Task} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
