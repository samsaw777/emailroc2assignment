const Header = () => {
  return (
    <nav className="header">
      <span>Filter By:</span>
      <div className="options">
        <span className="active">Unread</span>
        <span className="active">Read</span>
        <span className="active">Favrouite</span>
      </div>
    </nav>
  );
};

export default Header;
