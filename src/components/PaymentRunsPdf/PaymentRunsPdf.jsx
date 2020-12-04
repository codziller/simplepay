import React, { useEffect, useState } from "react";
import "./PaymentRunsPdf.css";
import Pdf from "react-to-pdf";
import Preview from "./Preview";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../../helpers/API_CONFIG";
import Loading from "../ui/Loading";

const PaymentRunsPdf = () => {
  const ref = React.createRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const loadData = () => {
    //  const search = props.history.location.search;
    setLoading(true);
    axios
      .get(BASE_URL + "/api/view-payrun-by-date/", {
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
      <div style={{ overflowX: "scroll" }}>
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
          <Preview
            companyName={data[0].company_name}
            periodEnding={data[0].period_ending}
            payFreq={data[0].pay_frequency}
            payMethod={data[0].payment_method}
            payPoint={data[0].pay_point}
            name={data[1].name}
            number={data[1].number}
            netPay={data[1].net_pay}
            bank={data[1].bank}
            acctType={"Bond"}
            acctNumber={data[1].account_no}
            branchCode={"681"}
          />
        </div>
      </div>
    );
  }
  return <div className="">{content}</div>;
};

export default withRouter(PaymentRunsPdf);
