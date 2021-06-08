import React, { useEffect, useState, Fragment } from "react";

function CallPage({ userDetails, refreshSession }) {
  const [counter, setCounter] = useState(userDetails.time);

  useEffect(() => {
    let setTimeoutId = null;
    if (counter === 0) {
      refreshSession();
    }
    if (counter > 0) {
      setTimeoutId = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    return () => {
      if (!setTimeoutId) clearTimeout(setTimeoutId);
    };
  }, [counter]);

  return (
    <Fragment>
      Hi {userDetails.username}, You are now speaking to {userDetails.to} This
      Call will End in : {counter} Seconds
    </Fragment>
  );
}

export default CallPage;
