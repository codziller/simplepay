import React, { useEffect, useState } from "react";
import Pdf from "react-to-pdf";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../../helpers/API_CONFIG";
import Loading from "../ui/Loading";

// Create Document Component
const MyDocument = (props) => {
  const ref = React.createRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    const search = props.history.location.search;
    setLoading(true);
    axios.get(BASE_URL + "/api/view-payrun-by-date/" + search).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  };
  useEffect(() => {
    loadData()
  }, [])
  let content;
  if (loading) {
    content = <Loading />;
  } else if (data) {
    console.log(data)
    content = (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => (
              <button className="Button" onClick={toPdf}>
                Generate Pdf
              </button>
            )}
          </Pdf>
        </div>
        <div ref={ref} style={{ padding: 20, width: "40%" }}>
          <h2 style={{ textAlign: "center" }}>Demo Company</h2>
          <div style={{ display: "flex" }}>
            <div style={{ width: "75%" }}>
              <div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
                <h4>Employee Name</h4>
                <p>John, Doe</p>
                <h4>Period</h4>
                <p>2020-10-15 to 2020-10-21</p>
                <h4>NRIC</h4>
                <p>S3495507G</p>
                <h4>Job Title</h4>
                <p>Software Engineer</p>
                <h4>Employment Date</h4>
                <p>2020-10-10</p>
              </div>
            </div>
            <div style={{ width: "25%" }}>
              76 North Bridge Rd. #05-07 Bridge Towers Singapore 149281
            </div>
          </div>
          <hr />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "30% auto auto auto auto",
            }}
          >
            <h4>Leave Type</h4>
            <h4>Balance</h4>
            <h4>Adjmt.</h4>
            <h4>Taken</h4>
            <h4>Sched.</h4>
            <p>Annual</p>
            <p>3.10</p>
            <p>0.00</p>
            <p>0.00</p>
            <p>0.00</p>
          </div>
        </div>
      </>
    );
  }
  return <div className="">{content}</div>;
};

export default withRouter(MyDocument);
