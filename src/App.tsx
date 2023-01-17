import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getEmails, setLocalEmails, pageNumber } from "./Reducer/emailSlice";
import MainContent from "./components/MainContent";

function App() {
  const dispatch = useDispatch();
  const Page = useSelector(pageNumber);

  const fetchEmailLists = async () => {
    await axios
      .get(`https://flipkart-email-mock.now.sh/?page=${Page}`)
      .then((response) => {
        dispatch(getEmails(response.data.list));
        console.log(response.data.total / 5);
      })
      .catch((error) => {
        console.log(error);
      });

    let response: any = localStorage.getItem("emails");
    let emails = JSON.parse(response);

    dispatch(setLocalEmails(emails == null ? {} : emails));
  };

  useEffect(() => {
    fetchEmailLists();
  }, [Page]);

  return (
    <div className="app">
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
