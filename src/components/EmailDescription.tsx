import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  emailId,
  emailSender,
  setEmailId,
  localEmails,
  setLocalEmails,
} from "../Reducer/emailSlice";

const EmailDescription = () => {
  const id = useSelector(emailId);
  const sender = useSelector(emailSender);
  const date = new Date(sender.date);
  const dispatch = useDispatch();
  const LocalEmails = useSelector(localEmails);

  const [emailDescription, setEmailDescription] = useState<{
    id: string;
    body: string;
  }>({ id: "", body: "" });

  const FetchEmailDetails = async () => {
    await axios
      .get(`https://flipkart-email-mock.now.sh/?id=${parseInt(id)}`)
      .then((response) => setEmailDescription(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    FetchEmailDetails();
  }, [id]);

  const makeFavourite = () => {
    const newLocalEmails = JSON.parse(JSON.stringify(LocalEmails));
    newLocalEmails[id].isFavourite = true;

    localStorage.setItem("emails", JSON.stringify(newLocalEmails));

    dispatch(setLocalEmails(newLocalEmails));
  };

  const removeFavourites = () => {
    const newLocalEmails = JSON.parse(JSON.stringify(LocalEmails));

    newLocalEmails[id].isFavourite = false;

    localStorage.setItem("emails", JSON.stringify(newLocalEmails));

    dispatch(setLocalEmails(newLocalEmails));
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
                  LocalEmails[id] && LocalEmails[id].isFavourite
                    ? () => removeFavourites()
                    : () => makeFavourite()
                }
              >
                {LocalEmails[id] && LocalEmails[id].isFavourite
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
