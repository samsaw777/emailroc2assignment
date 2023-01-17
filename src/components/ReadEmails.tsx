import { useSelector } from "react-redux";
import { emails, Emails, localEmails } from "../Reducer/emailSlice";
import Email from "./Email";

const Read = () => {
  const emailLists = useSelector(emails);
  const LocalEmails = useSelector(localEmails);

  console.log(LocalEmails);

  return (
    <div className="emaillist">
      {emailLists.map((email: Emails, index: number) => {
        if (LocalEmails[parseInt(email.id)]?.isRead) {
          return (
            <div key={index}>
              <Email
                emailInfo={{
                  id: email.id,
                  subject: email.subject,
                  short_description: email.short_description,
                  date: email.date,
                  from: email.from,
                }}
                isFavorite={LocalEmails[email.id]?.isFavourite ? true : false}
                isRead={LocalEmails[email.id]?.isRead ? true : false}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Read;
