import React, { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import "./SelfService.css";
import SelfServiceTable from "./SelfServiceTable";
import { BASE_URL } from "../../../../helpers/API_CONFIG";
import axios from "axios";
import Modal from "../../../ui/Modal";
import CheckButton from "../../../ui/CheckButton";
import KeyValue from "../../../ui/KeyValue";
import Select from "../../../ui/Select";

const approversData = [
  "No Employees",
  "All Employees",
  "Employees they can approve",
];

const employersOverviewData = [
  "No Employees",
  "All Employees",
  "Employees in their pay point",
];

const convertApproversOverview = (value) => {
  switch (value) {
    case "no_employees":
      return "No Employees";
    case "No Employees":
      return "no_employees";
    case "all_employees":
      return "All Employees";
    case "All Employees":
      return "all_employees";
    case "Employees they can approve":
      return "employees_they_can_approve";
    case "employees_they_can_approve":
      return "Employees they can approve";
  }
};

const convertEmployersOverview = (value) => {
  switch (value) {
    case "no_employees":
      return "No Employees";
    case "No Employees":
      return "no_employees";
    case "all_employees":
      return "All Employees";
    case "All Employees":
      return "all_employees";
    case "Employees in their pay point":
      return "employees_in_their_pay_point";
    case "employees_in_their_pay_point":
      return "Employees in their pay point";
  }
};

const SelfService = () => {
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);

  const [updatedSelfService, setUpdatedSelfService] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState("");

  const [attachPayslip, setAttachPayslip] = useState(false);
  const [allowTax, setAllowTax] = useState(false);
  const [disableLeave, setDisableLeave] = useState(false);
  const [disableInfo, setDisableInfo] = useState(false);
  const [approversOverview, setApproversOverview] = useState("No Employees");
  const [employersOverview, setEmployersOverview] = useState("No Employees");
  const [unpaid, setUnpaid] = useState(true);
  const [infantCare, setInfantCare] = useState(true);
  const [adoption, setAdoption] = useState(true);
  const [paternity, setPaternity] = useState(true);
  const [childCare, setChildCare] = useState(true);
  const [maternity, setMaternity] = useState(true);
  const [sick, setSick] = useState(true);
  const [hospital, setHospital] = useState(true);
  const [annual, setAnnual] = useState(true);

  const [selfServices, setSelfServices] = useState([]);
  const updateSelfService = (val, i) => {
    let newSelfService = [...selfServices];
    newSelfService[i].user.email = val;
    setSelfServices(newSelfService);
    setUpdatedSelfService({ ...updatedSelfService, [i]: true });
  };
  const toggleCheck = (i) => {
    let newSelfService = [...selfServices];
    newSelfService[i].is_selfservice = !selfServices[i].is_selfservice;
    setSelfServices(newSelfService);
    setUpdatedSelfService({ ...updatedSelfService, [i]: true });
  };

  const getEmployees = (aUrl = null) => {
    setLoading(true);
    let url = BASE_URL + "/api/self-service-employees/?limit=20";
    if (aUrl) {
      url = aUrl;
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      setLoading(false);
      setSelfServices(res.data.results);
      setNext(res.data.next);
    });
  };

  const saveSelfService = async () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const data = [];
    for (let i in updatedSelfService) {
      data.push(selfServices[i]);
    }
    const url = BASE_URL + "/api/self-service/";
    await axios
      .post(url, data, { headers: headers })
      .then(() => {});
    await setLoading(false);
    console.log(updatedSelfService);
  };

  const getSelfServiceSettings = () => {
    setLoading(true);
    const url = BASE_URL + "/api/self-service-settings/";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      setAttachPayslip(res.data.attach_payslips);
      setAllowTax(res.data.allow_tax_certificates);
      setDisableLeave(res.data.disable_leave_requests);
      setDisableInfo(res.data.disable_info_update_requests);
      setApproversOverview(
        convertApproversOverview(res.data.approvers_viewing_option)
      );
      setEmployersOverview(
        convertEmployersOverview(res.data.employees_viewing_option)
      );
      setUnpaid(res.data.display_leave_balance_unpaid);
      setInfantCare(res.data.display_leave_balance_infant_care);
      setAdoption(res.data.display_leave_balance_adoption);
      setPaternity(res.data.display_leave_balance_paternity);
      setChildCare(res.data.display_leave_balance_child_care);
      setMaternity(res.data.display_leave_balance_maternity);
      setSick(res.data.display_leave_balance_sick);
      setHospital(res.data.display_leave_balance_hospital);
      setAnnual(res.data.display_leave_balance_annual);
    });
  };

  const updateSelfServiceSettings = () => {
    setLoading(true);
    const url = BASE_URL + "/api/self-service-settings/";
    const data = {
      attach_payslips: attachPayslip,
      allow_tax_certificates: allowTax,
      disable_leave_requests: disableLeave,
      disable_info_update_requests: disableInfo,
      approvers_viewing_option: convertApproversOverview(approversOverview),
      employees_viewing_option: convertEmployersOverview(employersOverview),
      display_leave_balance_unpaid: unpaid,
      display_leave_balance_infant_care: infantCare,
      display_leave_balance_adoption: adoption,
      display_leave_balance_paternity: paternity,
      display_leave_balance_child_care: childCare,
      display_leave_balance_maternity: maternity,
      display_leave_balance_sick: sick,
      display_leave_balance_hospital: hospital,
      display_leave_balance_annual: annual,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.post(url, data, { headers: headers }).then(() => setLoading(false));
  };

  const toggleChecks = (all) => {
    if (all) {
      setAnnual(true);
      setHospital(true);
      setSick(true);
      setMaternity(true);
      setChildCare(true);
      setPaternity(true);
      setAdoption(true);
      setInfantCare(true);
      setUnpaid(true);
      setAdoption(true);
    } else {
      setAnnual(false);
      setHospital(false);
      setSick(false);
      setMaternity(false);
      setChildCare(false);
      setPaternity(false);
      setAdoption(false);
      setInfantCare(false);
      setUnpaid(false);
      setAdoption(false);
    }
  };

  useEffect(() => {
    getSelfServiceSettings();
  }, []);

  const saveGeneralSettings = () => {};

  let modalContent;
  switch (current) {
    case "general":
      modalContent = (
        <>
          <h1>General Self Service Settings</h1>
          <hr />
          <CheckButton
            checked={attachPayslip}
            toggleCheck={() => setAttachPayslip(!attachPayslip)}
            title="Attach payslips to emails on Self-Service release"
          />
          <br />
          <CheckButton
            checked={allowTax}
            toggleCheck={() => setAllowTax(!allowTax)}
            title="Allow tax certificates to be released to Self-Service"
          />
          <h3>Self-Service Request Types</h3>
          <CheckButton
            checked={disableLeave}
            toggleCheck={() => setDisableLeave(!disableLeave)}
            title="Disable Leave requests?"
          />
          <CheckButton
            checked={disableInfo}
            toggleCheck={() => setDisableInfo(!disableInfo)}
            title="Disable Info Update requests?"
          />
          <hr />
          <Button title="Save" onClick={updateSelfServiceSettings} />
        </>
      );
      break;
    case "leave":
      modalContent = (
        <>
          <h1>Leave Settings</h1>
          <KeyValue key_="Approvers can see overview for">
            <Select
              onChange={(val) => setApproversOverview(val)}
              value={approversOverview}
              data={approversData}
            />
          </KeyValue>
          <KeyValue key_="Employees can see overview for">
            <Select
              onChange={(val) => setEmployersOverview(val)}
              value={employersOverview}
              data={employersOverviewData}
            />
          </KeyValue>
          <h3>Display Leave Balance</h3>
          <div className="RLists">
            <div>
              <span onClick={() => toggleChecks(true)}>All</span>,{" "}
              <span onClick={() => toggleChecks(false)}>None</span>
            </div>
            <CheckButton
              checked={annual}
              toggleCheck={() => setAnnual(!annual)}
              title="Annual"
            />
            <CheckButton
              checked={adoption}
              toggleCheck={() => setAdoption(!adoption)}
              title="Adoption"
            />
            <CheckButton
              checked={hospital}
              toggleCheck={() => setHospital(!hospital)}
              title="Hospital"
            />
            <CheckButton
              checked={sick}
              toggleCheck={() => setSick(!sick)}
              title="Sick"
            />
            <CheckButton
              checked={maternity}
              toggleCheck={() => setMaternity(!maternity)}
              title="Maternity"
            />
            <CheckButton
              checked={childCare}
              toggleCheck={() => setChildCare(!childCare)}
              title="Childcare"
            />
            <CheckButton
              checked={paternity}
              toggleCheck={() => setPaternity(!paternity)}
              title="Paternity"
            />
            <CheckButton
              checked={adoption}
              toggleCheck={() => setAdoption(!adoption)}
              title="Adoption"
            />
            <CheckButton
              checked={infantCare}
              toggleCheck={() => setInfantCare(!infantCare)}
              title="Infant care"
            />
            <CheckButton
              checked={unpaid}
              toggleCheck={() => setUnpaid(!unpaid)}
              title="Unpaid"
            />
            <hr />
            <Button onClick={updateSelfServiceSettings} title="Save" />
          </div>
        </>
      );
      break;
    case "approvalLeave":
      modalContent = <></>;
      break;
    default:
      modalContent = <></>;
  }

  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <div className="SelfService">
      <Modal show={showModal} close={() => setShowModal(false)}>
        {modalContent}
      </Modal>
      <h1>Self Service</h1>
      <hr />
      <div className="SelfServiceTab">
        <h3>Settings: </h3>
        <div
          onClick={() => {
            setShowModal(true);
            setCurrent("general");
          }}
        >
          General
        </div>
        <div
          onClick={() => {
            setShowModal(true);
            setCurrent("leave");
          }}
        >
          Leave
        </div>
        {/* <div
          onClick={() => {
            setShowModal(true);
            setCurrent("approvalLeave");
          }}
        >
          Approval Group Leave
        </div>
        <div
          onClick={() => {
            setShowModal(true);
            setCurrent("infoUpdates");
          }}
        >
          Info Updates
        </div> */}
      </div>
      <hr />
      <SelfServiceTable
        services={selfServices}
        onChange={updateSelfService}
        toggleCheck={toggleCheck}
      />
      <hr />
      <Button
        disabled={!next}
        title="Next Page"
        onClick={() => getEmployees(next)}
      />
      <hr />
      <Button title="Save" onClick={saveSelfService} />
    </div>
  );
};

export default SelfService;
