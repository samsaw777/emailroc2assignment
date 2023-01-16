import { useSelector } from "react-redux";
import { emails, Emails } from "../Reducer/emailSlice";
import Email from "./Email";

const EmailList = () => {
  const emailLists = useSelector(emails);

  return (
    <div className="emaillist">
      {emailLists.map((email: Emails, index: number) => {
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
              isFavorite={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
