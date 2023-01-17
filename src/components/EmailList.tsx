import { useSelector, useDispatch } from "react-redux";
import {
  emails,
  Emails,
  localEmails,
  pageNumber,
  setPageNumber,
} from "../Reducer/emailSlice";
import Email from "./Email";

const EmailList = () => {
  const emailLists = useSelector(emails);
  const LocalEmails = useSelector(localEmails);
  const Page = useSelector(pageNumber);
  const dispatch = useDispatch();

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
              isFavorite={LocalEmails[email.id]?.isFavourite ? true : false}
              isRead={LocalEmails[email.id]?.isRead ? true : false}
            />
          </div>
        );
      })}
      <div className="pagination">
        {[...Array(2)].map((_, index: number) => {
          return (
            <span
              className={`page__number ${Page === index + 1 && "page__active"}`}
              onClick={() => dispatch(setPageNumber(index + 1))}
            >
              {index + 1}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default EmailList;
