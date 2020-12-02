import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../helpers/API_CONFIG";
import TabHeader from "../../ui/TabHeader";
import "./Filing.css";
import Iras from "./Iras/Iras";
import Submission from "./Submission/Submission";
import axios from "axios";
import Loading from "../../ui/Loading";

const convertMonth = (month) => {
  switch (month) {
    case "01":
      return "January";
    case "02":
      return "Feburary";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
  }
};

const headerData = [
  { key_: "submission", title: "Mothly Submission" },
  { key_: "iras", title: "IRAS Filing (IR8A etc" },
];

const Filing = (props) => {
  const [current, setCurrent] = useState("submission");
  const [loading, setLoading] = useState(false);
  const [filings, setFilings] = useState(null);

  const getFilings = () => {
    setLoading(true);
    const url = BASE_URL + "/api/monthly-submission/";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      setLoading(false);
      setFilings(res.data);
    });
  };

  const finalizeFiling = (id) => {
    console.log(id);
    const url = BASE_URL + `/api/monthly-submission/${id}/`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
    const data = {
      date_finalised: new Date(),
      status: "finalised",
    }
    axios.patch(url, data, {headers: headers})
    .then(() => getFilings());
  };

  let filingContent;
  if (loading) {
    filingContent = <Loading />;
  } else if (filings) {
    filingContent = filings.map((data) => (
      <Submission
        key={data.id}
        date={data.date}
        status={data.status}
        date_finalised={data.date_finalised}
        dateTitle={`${convertMonth(data.date.split("-")[1])} ${
          data.date.split("-")[0]
        }`}
        finalise={() => finalizeFiling(data.id, )}
      />
    ));
  }

  useEffect(() => {
    getFilings();
  }, []);
  return (
    <div className="Filing">
      <TabHeader
        current={current}
        setCurrent={(current) => setCurrent(current)}
        data={headerData}
      />
      {current === "submission" ? filingContent : null}
      {current === "iras" ? <Iras /> : null}
    </div>
  );
};

export default Filing;
