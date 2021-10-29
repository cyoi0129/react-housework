// Basic Library
import { VFC, useEffect, createContext } from "react";
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Cookies from 'js-cookie';

// Pages & Components
import { Home, Login, Masters, Master, Task, Register, Account } from "./pages";
import { Header, Footer, ScrollToTop } from './components';

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
      history.push("/");
      dispatch(changeNavigation(0));
    } else {
      history.push("/login");
      dispatch(changeNavigation(3));
    }
  }, [isLogined, dispatch]);

  return (
    <>
      <UserContext.Provider value={{ user: userStatus }}>
        <ScrollToTop />
        <Header isLogined={isLogined} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={Account} />
          <Route path="/masters" component={Masters} />
          <Route path="/master/:masterID" component={Master} />
          <Route path="/task" component={Task} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
