import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Emails,
  setEmailId,
  localEmails,
  setLocalEmails,
} from "../Reducer/emailSlice";

interface Props {
  emailInfo: Emails;
  isFavorite?: boolean;
}

const Email = ({
  emailInfo: {
    id,
    date,
    subject,
    short_description,
    from: { email, name },
  },
  isFavorite,
}: Props) => {
  const dateFormat = new Date(date);
  const dispatch = useDispatch();
  const LocalEmails = useSelector(localEmails);

  const markReadEmail = () => {
    if (!LocalEmails[id]) {
      let newLocalEmails = {
        ...LocalEmails,
        [id]: { isRead: true, isFavourite: false },
      };
      localStorage.setItem("emails", JSON.stringify(newLocalEmails));

      dispatch(setLocalEmails(newLocalEmails));
    }
    dispatch(
      setEmailId({
        isEmailOpen: true,
        emailId: id,
        sender: {
          id: id,
          name: name,
          date: date,
        },
      })
    );
  };

  return (
    <div className="emailCard" onClick={() => markReadEmail()}>
      <span className="emailProfile">{name.charAt(0).toUpperCase()}</span>
      <section className="emailBody">
        <p>
          <span>
            From:{" "}
            <span>
              {name} {email}
            </span>
          </span>
          <span>
            Subject: <span>{subject}</span>
          </span>
        </p>
        <p>
          <span>{short_description} ...</span>
          <span className="date">
            <span className="time">
              {dateFormat.toLocaleDateString("en-GB")}
            </span>
            <span>
              {dateFormat.toLocaleTimeString([], { timeStyle: "short" })}
            </span>
            {isFavorite && <span className="isFavourite">Favourite</span>}
          </span>
        </p>
      </section>
    </div>
  );
};

export default Email;
