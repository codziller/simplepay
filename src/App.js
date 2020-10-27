import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Header from "./components/ui/Header";
import MobileSideNav from "./components/ui/MobileSideNav";
import './App.css';

function App() {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  // const a = true;

  return (
    <div className="App">
      <Header openSideNav={() => setOpenSideDrawer(true)} />
      <MobileSideNav
        close={() => setOpenSideDrawer(false)}
        show={openSideDrawer}
      />
      <div className="Body">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
