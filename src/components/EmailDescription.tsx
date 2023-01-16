import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { emailId, emailSender, setEmailId } from "../Reducer/emailSlice";

const EmailDescription = () => {
  const id = useSelector(emailId);
  const sender = useSelector(emailSender);
  const date = new Date(sender.date);
  const dispatch = useDispatch();
  let response: any = localStorage.getItem("emails");
  let emails = JSON.parse(response);

  const [emailDescription, setEmailDescription] = useState<{
    id: string;
    body: string;
  }>({ id: "", body: "" });
  const [localEmails, setLocalEmails] = useState<any>({});

  const FetchEmailDetails = async () => {
    await axios
      .get(`https://flipkart-email-mock.now.sh/?id=${parseInt(id)}`)
      .then((response) => setEmailDescription(response.data))
      .catch((error) => {
        console.log(error);
      });

    setLocalEmails({ ...emails });
  };

  useEffect(() => {
    FetchEmailDetails();
  }, [id]);

  const makeFavourite = () => {
    let favrouiteList: any = {};

    if (!emails[id]) {
      favrouiteList = { ...emails, [id]: { isFavourite: true, isRead: true } };

      localStorage.setItem("emails", JSON.stringify(favrouiteList));

      response = localStorage.getItem("emails");
      emails = JSON.parse(response);
      setLocalEmails({ ...emails });
    } else if (emails[id] && emails[id].isFavourite) {
      return;
    }
  };

  const removeFavourites = () => {
    delete emails[id];

    localStorage.setItem("emails", JSON.stringify(emails));

    response = localStorage.getItem("emails");
    emails = JSON.parse(response);
    setLocalEmails({ ...emails });
  };

  return (
    <div className="emailFull">
      <section className="emailHeader">
        <span className="emailProfile-title">
          {sender.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="emailTitle">
            <span>{sender.name}</span>
            <span>
              <span
                className="favourite"
                onClick={
                  localEmails[id] && localEmails[id].isFavourite
                    ? () => removeFavourites()
                    : () => makeFavourite()
                }
              >
                {localEmails[id] && localEmails[id].isFavourite
                  ? "Remove from favourite"
                  : "Mark as favourite"}
              </span>
              <span
                className="cancel"
                onClick={() =>
                  dispatch(
                    setEmailId({
                      isEmailOpen: false,
                      emailId: "",
                      sender: {
                        id: "",
                        name: "",
                        date: 0,
                      },
                    })
                  )
                }
              >
                Cancel
              </span>
            </span>
          </p>
          <span className="date">
            <span className="time">{date.toLocaleDateString("en-GB")}</span>
            <span>{date.toLocaleTimeString([], { timeStyle: "short" })}</span>
          </span>
          <section
            className="emailDescription"
            dangerouslySetInnerHTML={{ __html: emailDescription.body }}
          ></section>
        </div>
      </section>
    </div>
  );
};

export default EmailDescription;
