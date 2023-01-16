import EmailList from "../components/EmailList";
import FavouriteList from "../components/Faavrouit";
import ReadEmail from "../components/ReadEmails";
import Unread from "../components/Unread";

export enum ComponentName {
  UNREAD = "unread",
  READ = "read",
  FAVOURITE = "favorite",
}

const renderComponents = (componentName: string) => {
  switch (componentName) {
    case ComponentName.UNREAD:
      return <Unread />;
    case ComponentName.READ:
      return <ReadEmail />;
    case ComponentName.FAVOURITE:
      return <FavouriteList />;
    default:
      return <EmailList />;
  }
};

export default renderComponents;
