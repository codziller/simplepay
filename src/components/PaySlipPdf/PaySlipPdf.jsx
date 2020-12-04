import React, { useEffect, useState } from "react";
import Preview from "./Preview";
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
 //   const search = props.history.location.search;
    setLoading(true);
    axios
      .get(BASE_URL + "/api/view-payslip-by-date/", {
        // headers: {
        //   Authorization:
        //     user && user.access_token ? `Bearer ${user.access_token}` : "",
        // },
        params: {
          date: "2020-11-04",
          timeframe: "weekly",
          is_finalized: "True",
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      });
    // axios.get(BASE_URL + "/api/view-payrun-by-date/" + search).then((res) => {
    //   setLoading(false);
    //   setData(res.data);
    // });
  };
  useEffect(() => {
    loadData();
  }, []);
  let content;
  if (loading) {
    content = <Loading />;
  } else if (data) {
    console.log(data);
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
        <div ref={ref} className="slip_pdf_file_container">
          <h1 style={{ textAlign: "center" , marginBottom:"10px"}}>{data[0].company_name}</h1>

          {data.map((item, i) => {
            return (
              <Preview
                key={"preview" + i}
                name={item.employee_name}
                period={item.period}
                nric={item.nric}
                job={item.job_title}
                date={item.employment_date}
                companyAddress={item.company_address}
                leaveType={"Annual"}
                balance={item.annual_balance}
                adjmt={item.annual_adjustments}
                taken={item.annual_taken}
                sched={item.annual_schedule}
              />
            );
          })}
        </div>
      </>
    );
  }
  return <div className="">{content}</div>;
};

export default withRouter(MyDocument);
