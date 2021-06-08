import "./App.css";
import { useEffect, useState } from "react";
import CallPage from "./Components/CallPage";
import CreateCall from "./Components/CreateCall";
import service from "./Services/api"

const axios = require("axios");


function App() {

  const defaultData = {
    name: "",
    countryCodeFrom: "+91",
    countryCodeTo: "+91",
    from: "+425334523435", 
    to: "",
    time: 30,
  };

  
  const [userDetails, setUserDetails] = useState(defaultData);

  const [showCreateCall, setCreateCall] = useState(true);

  const refreshSession = () => {
    setCreateCall(true);
    setUserDetails(defaultData);
  };

  const makeCall = async (data) => {
    service.postApi('/plivio/callAPI', data)
      .then((response) => {
        console.log(response);
        setCreateCall(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=> {
    debugger;
  }, [userDetails])

  return (
    <div className="App">
      <header className="App-header">
    <div className="container">
      {showCreateCall ? (
        <CreateCall
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          makeCall={makeCall}
        />
      ) : (
        <CallPage userDetails={userDetails} refreshSession={refreshSession} />
      )}
    </div>
     </header>
    </div>
  );
}

export default App;
