import { useSelector, useDispatch } from "react-redux";
import { emails, Emails, isEmailOpen, setEmailId } from "../Reducer/emailSlice";
import EmailDescription from "./EmailDescription";
import { useEffect, useState } from "react";

const EmailList = () => {
  const emailLists = useSelector(emails);
  const dispatch = useDispatch();
  const isOpen = useSelector(isEmailOpen);
  let response: any = localStorage.getItem("emails");
  let Emails = JSON.parse(response);

  const [localEmails, setLocalEmails] = useState<any>({});

  useEffect(() => {
    setLocalEmails({ ...Emails });
  }, [Emails]);

  return (
    <div className={`${isOpen && "emailOpen"} emailList`}>
      <div className="emaillist">
        {emailLists.map((email: Emails, index: number) => {
          const date = new Date(email.date);
          if (localEmails[email.id]) {
            return (
              <div
                key={index}
                className="emailCard"
                onClick={() =>
                  dispatch(
                    setEmailId({
                      isEmailOpen: true,
                      emailId: email.id,
                      sender: {
                        id: email.id,
                        name: email.from.name,
                        date: email.date,
                      },
                    })
                  )
                }
              >
                <span className="emailProfile">
                  {email.from.name.charAt(0).toUpperCase()}
                </span>
                <section className="emailBody">
                  <p>
                    <span>
                      From:{" "}
                      <span>
                        {email.from.name} {email.from.email}
                      </span>
                    </span>
                    <span>
                      Subject: <span>{email.subject}</span>
                    </span>
                  </p>
                  <p>
                    <span>{email.short_description} ...</span>
                    <span className="date">
                      <span className="time">
                        {date.toLocaleDateString("en-GB")}
                      </span>
                      <span>
                        {date.toLocaleTimeString([], { timeStyle: "short" })}
                      </span>
                    </span>
                  </p>
                </section>
              </div>
            );
          }
        })}
      </div>
      {isOpen && <EmailDescription />}
    </div>
  );
};

export default EmailList;
