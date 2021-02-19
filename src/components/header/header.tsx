import React from "react";

interface NavbarProps {
}
const Header: React.FC<NavbarProps> = () => {

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Monthly salary</span>
        </div>
      </nav>
    </header>
  );
};
export default Header;
