import { useSelector } from "react-redux";
import renderComponents from "../Helper/renderComponents";
import { isEmailOpen } from "../Reducer/emailSlice";
import EmailDescription from "./EmailDescription";
import { currentMenu } from "../Reducer/emailSlice";

const MainContent = () => {
  const activeMenu = useSelector(currentMenu);

  const isOpen = useSelector(isEmailOpen);
  return (
    <div className={`${isOpen && "emailOpen"} emailList`}>
      {renderComponents(activeMenu.toString())}
      {isOpen && <EmailDescription />}
    </div>
  );
};

export default MainContent;
