import { useSelector } from "react-redux";
import { allEmails, Emails, localEmails } from "../Reducer/emailSlice";
import Email from "./Email";

const Read = () => {
  const emailLists = useSelector(allEmails);
  const LocalEmails = useSelector(localEmails);

  let count: number = 0;

  return (
    <div className="emaillist">
      {emailLists.map((email: Emails, index: number) => {
        if (LocalEmails[parseInt(email.id)]?.isRead) {
          count += 1;
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
        } else if (count === 0) {
          return <div className="no__emails">No emails read yet!</div>;
        }
      })}
    </div>
  );
};

export default Read;
