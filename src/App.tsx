import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { getEmails } from "./Reducer/emailSlice";
import EmailList from "./components/EmailList";

function App() {
  const dispatch = useDispatch();

  const fetchEmailLists = async () => {
    await axios
      .get("https://flipkart-email-mock.vercel.app/")
      .then((response) => {
        dispatch(getEmails(response.data.list));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEmailLists();
  }, []);

  return (
    <div className="app">
      <Header />
      <EmailList />
    </div>
  );
}

export default App;
