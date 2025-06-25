import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
      <MainNav2Logged />
    </div>
  );
};

export default HeaderLogged;
import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";
import CartDropdown from "./CartDropdown";
import AvatarDropdown from "./AvatarDropdown";

export interface HeaderLoggedProps {}

const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
      <MainNav2Logged />
    </div>
  );
};

export default HeaderLogged;