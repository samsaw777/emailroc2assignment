import { useSelector } from "react-redux";
import renderComponents from "../Helper/renderComponents";
import { isEmailOpen } from "../Reducer/emailSlice";
import EmailDescription from "./EmailDescription";
import { ComponentName } from "../Helper/renderComponents";

const MainContent = () => {
  const isOpen = useSelector(isEmailOpen);
  return (
    <div className={`${isOpen && "emailOpen"} emailList`}>
      {renderComponents(ComponentName.FAVOURITE)}
      {isOpen && <EmailDescription />}
    </div>
  );
};

export default MainContent;
