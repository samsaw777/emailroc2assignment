import EmailList from "../components/EmailList";
import FavouriteList from "../components/Faavrouit";
import ReadEmail from "../components/ReadEmails";
import Unread from "../components/Unread";

export enum ComponentName {
  ALL = 0,
  UNREAD = 1,
  READ = 2,
  FAVOURITE = 3,
}

const renderComponents = (componentName: string) => {
  switch (componentName) {
    case ComponentName.ALL.toString():
      return <EmailList />;
    case ComponentName.UNREAD.toString():
      return <Unread />;
    case ComponentName.READ.toString():
      return <ReadEmail />;
    case ComponentName.FAVOURITE.toString():
      return <FavouriteList />;
    default:
      return <EmailList />;
  }
};

export default renderComponents;
