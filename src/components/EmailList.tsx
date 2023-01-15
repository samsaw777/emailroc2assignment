import { useSelector } from "react-redux";
import { emails, Emails } from "../Reducer/emailSlice";

const EmailList = () => {
  const emailLists = useSelector(emails);

  return (
    <div className="emailList">
      <div>
        {emailLists.map((email: Emails, index: number) => {
          const date = new Date(email.date);
          console.log(date);
          return (
            <div key={index} className="emailCard">
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
                    <p>{date.toLocaleDateString("en-GB")}</p>
                    <p>{date.toLocaleTimeString([], { timeStyle: "short" })}</p>
                  </span>
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmailList;
