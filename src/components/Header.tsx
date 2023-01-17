import { useSelector, useDispatch } from "react-redux";
import { currentMenu, setCurrentMenu } from "../Reducer/emailSlice";

const menus = [
  { id: 0, menu: "Inbox" },
  { id: 1, menu: "Unread" },
  { id: 2, menu: "Read" },
  { id: 3, menu: "Favourite" },
];

const Header = () => {
  const dispatch = useDispatch();
  const activeMenu = useSelector(currentMenu);

  return (
    <nav className="header">
      <span>Filter By:</span>
      <div className="options">
        {menus.map((menu: { id: number; menu: string }, index: number) => (
          <span
            key={index}
            className={`${activeMenu === menu.id && "active"} menu`}
            onClick={() => dispatch(setCurrentMenu(menu.id))}
          >
            {menu.menu}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Header;
