import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { getEmails, setLocalEmails } from "./Reducer/emailSlice";
import MainContent from "./components/MainContent";

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

    let response: any = localStorage.getItem("emails");
    let emails = JSON.parse(response);
    console.log(emails);

    dispatch(setLocalEmails(emails == null ? {} : emails));
  };

  useEffect(() => {
    fetchEmailLists();
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
