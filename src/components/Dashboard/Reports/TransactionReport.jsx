import React, { useState } from "react";
import Button from "../../ui/Button";
import CardWithHeaders from "../../ui/CardWithHeader";
import CheckButton from "../../ui/CheckButton";
import Input from "../../ui/Input";
import KeyValue from "../../ui/KeyValue";
import Modal from "../../ui/Modal";
import Select from "../../ui/Select";

const TransactionReport = (props) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [payPointChecked, togglePayPointCheck] = useState(true);
  const [frequencyMonthly, setFrequencyMonthly] = useState(true);
  const [frequencyWeekly, setFrequencyWeekly] = useState(true);
  const [status, setStatus] = useState("all");
  const [showModal, changeShowModal] = useState(false);
  const [current, setCurrent] = useState("");
  const [searchValue, searchChange] = useState("");

  const [birthdate, setBirthdate] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(false);
  const [legalStatus, setLegalStatus] = useState(false);
  const [nric, setNric] = useState(false);
  const [nationality, setNationality] = useState(false);
  const [prDate, setPrDate] = useState(false);
  const [fin, setFin] = useState(false);
  const [malaysiaIc, setMalaysiaIc] = useState(false);
  const [passportNumber, setPassportNumber] = useState(false);
  const [gender, setGender] = useState(false);
  const [race, setRace] = useState(false);
  const [religion, setReligion] = useState(false);
  const [sdlExempt, setSdlExempt] = useState(false);
  const [cpfExempt, setCpfExempt] = useState(false);
  const [email, setEmail] = useState(false);
  const [number, setNumber] = useState(false);
  const [historicPayPoint, setHistoricPayPoint] = useState(false);
  const [jobTitle, setJobTitle] = useState(false);

  const [annualBonus, setAnnualBonus] = useState(false);
  const [basicSalary, setBasicSalary] = useState(false);
  const [nonMonthlyCommission, setNonMonthlyCommission] = useState(false);
  const [leavePaidOut, setLeavePaidOut] = useState(false);
  const [incomePaid, setIncomePaid] = useState(false);

  const [CDAC, setCDAC] = useState(false);
  const [cpfEmployee, setCpfEmployee] = useState(false);
  const [ECF, setECF] = useState(false);
  const [MBMF, setMBMF] = useState(false);
  const [pension, setPension] = useState(false);
  const [savingsDeduction, setSavingsDeduction] = useState(false);
  const [shareEmployee, setShareEmployee] = useState(false);
  const [SINDA, setSINDA] = useState(false);
  const [incomeWithheld, setIncomeWithheld] = useState(false);

  const [cpfEmployer, setCpfEmployer] = useState(false);
  const [fwl, setFwl] = useState(false);
  const [sdl, setSdl] = useState(false);
  const [shareEmployer, setShareEmployer] = useState(false);

  const [grossRenumeration, setGrossRenumeration] = useState(false);

  const [nettPay, setNettPay] = useState(false);
  const [normalRate, setNormalRate] = useState(false);

  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const setShowModal = (val, current) => {
    changeShowModal(val);
    setCurrent(current);
  };

  const toggleChecks = (all) => {
    if (all) {
      setBirthdate(true);
      setAppointmentDate(true);
      setLegalStatus(true);
      setNric(true);
      setNationality(true);
      setPrDate(true);
      setFin(true);
      setMalaysiaIc(true);
      setPassportNumber(true);
      setGender(true);
      setReligion(true);
      setSdlExempt(true);
      setCpfExempt(true);
      setEmail(true);
      setNumber(true);
      setHistoricPayPoint(true);
      setJobTitle(true);
    } else {
      setBirthdate(false);
      setAppointmentDate(false);
      setLegalStatus(false);
      setNric(false);
      setNationality(false);
      setPrDate(false);
      setFin(false);
      setMalaysiaIc(false);
      setPassportNumber(false);
      setGender(false);
      setReligion(false);
      setSdlExempt(false);
      setCpfExempt(false);
      setEmail(false);
      setNumber(false);
      setHistoricPayPoint(false);
      setJobTitle(false);
    }
  };

  const toggleIncomeChecks = (all) => {
    if (all) {
      setAnnualBonus(true);
      setBasicSalary(true);
      setNonMonthlyCommission(true);
      setLeavePaidOut(true);
      setIncomePaid(true);
    } else {
      setAnnualBonus(false);
      setBasicSalary(false);
      setNonMonthlyCommission(false);
      setLeavePaidOut(false);
      setIncomePaid(false);
    }
  };

  const toggleDeductionChecks = (all) => {
    if (all) {
      setCDAC(true);
      setCpfEmployee(true);
      setECF(true);
      setMBMF(true);
      setPension(true);
      setSavingsDeduction(true);
      setShareEmployee(true);
      setSINDA(true);
      setIncomeWithheld(true);
    } else {
      setCDAC(false);
      setCpfEmployee(false);
      setECF(false);
      setMBMF(false);
      setPension(false);
      setSavingsDeduction(false);
      setShareEmployee(false);
      setSINDA(false);
      setIncomeWithheld(false);
    }
  };

  const toggleEmployerContributionChecks = (all) => {
    if (all) {
      setCpfEmployer(true);
      setFwl(true);
      setSdl(true);
      setShareEmployer(true);
    } else {
      setCpfEmployer(false);
      setFwl(false);
      setSdl(false);
      setShareEmployer(false);
    }
  };

  const toggleSummaryCheck = (all) => {
    if (all) {
      setGrossRenumeration(true);
    } else {
      setGrossRenumeration(false);
    }
  };

  const toggleOtherChecks = (all) => {
    if (all) {
      setNettPay(true);
      setNormalRate(true);
    } else {
      setNettPay(false);
      setNormalRate(false);
    }
  };

  const toggleTransactionChecks = (all) => {
    toggleIncomeChecks(all);
    toggleDeductionChecks(all);
    toggleEmployerContributionChecks(all);
    toggleSummaryCheck(all);
    toggleOtherChecks(all);
  };

  let modalContent;
  switch (current) {
    case "point":
      modalContent = (
        <>
          <h1>Filter Pay Points</h1>
          <hr />
          <CheckButton
            title="Unassigned"
            checked={payPointChecked}
            toggleCheck={() => togglePayPointCheck(!payPointChecked)}
          />
        </>
      );
      break;
    case "frequency":
      modalContent = (
        <>
          <h1>Filter Pay Frequency</h1>
          <hr />
          <CheckButton
            title="Monthly, ending on the 31st"
            checked={frequencyMonthly}
            toggleCheck={() => setFrequencyMonthly(!frequencyMonthly)}
          />
          <CheckButton
            title="Weekly, ending on Wednesday"
            checked={frequencyWeekly}
            toggleCheck={() => setFrequencyWeekly(!frequencyWeekly)}
          />
        </>
      );
      break;
    default:
      modalContent = (
        <>
          <h1>Filter By Status</h1>
          <hr />
          <Select
            data={["all", "active", "inactive"]}
            value={status}
            onChange={(val) => setStatus(val)}
          />
        </>
      );
  }

  return (
    <div className="LeaveReport">
      <CardWithHeaders header="Transaction History Report">
        <h2>Date Range</h2>
        <div className="DateFilter">
          <div>
            <KeyValue key_="From:">
              <Input
                noHeader
                type="date"
                value={fromDate}
                onChange={(val) => setFromDate(val)}
              />
            </KeyValue>
          </div>
          <div>
            <KeyValue key_="To:">
              <Input
                noHeader
                type="date"
                value={toDate}
                onChange={(val) => setToDate(val)}
              />
            </KeyValue>
          </div>
        </div>
        <hr />
        <h2>Filters</h2>
        <Modal show={showModal} close={() => changeShowModal(false)}>
          {modalContent}
        </Modal>
        <div className="Filter">
          <Button
            title="Pay Point"
            onClick={() => setShowModal(true, "point")}
          />
          <Button
            title="Pay Frequency"
            onClick={() => setShowModal(true, "frequency")}
          />
          <Button title="Status" onClick={() => setShowModal(true, "status")} />
          <Input
            placeHolder="Search"
            noHeader
            onChange={(val) => searchChange(val)}
            value={searchValue}
            type="text"
          />
        </div>
        <hr />
        <h2>Employees</h2>
        <p>All (11) employees selected</p>
        <hr />
        <h2>Additional Fields</h2>
        <div className="RLists">
          <div>
            <span className="AllNone" onClick={() => toggleChecks(true)}>
              All
            </span>
            ,{" "}
            <span className="AllNone" onClick={() => toggleChecks(false)}>
              None
            </span>
          </div>
          <CheckButton
            checked={birthdate}
            toggleCheck={() => setBirthdate(!birthdate)}
            title="Birthdate"
          />
          <CheckButton
            checked={appointmentDate}
            toggleCheck={() => setAppointmentDate(!appointmentDate)}
            title="Appointment Date"
          />
          <CheckButton
            checked={legalStatus}
            toggleCheck={() => setLegalStatus(!legalStatus)}
            title="Legal Status"
          />
          <CheckButton
            checked={nric}
            toggleCheck={() => setNric(!nric)}
            title="Nric"
          />
          <CheckButton
            checked={nationality}
            toggleCheck={() => setNationality(!nationality)}
            title="Nationality"
          />
          <CheckButton
            checked={prDate}
            toggleCheck={() => setPrDate(!prDate)}
            title="Pr Date"
          />
          <CheckButton
            checked={fin}
            toggleCheck={() => setFin(!fin)}
            title="Fin"
          />
          <CheckButton
            checked={malaysiaIc}
            toggleCheck={() => setMalaysiaIc(!malaysiaIc)}
            title="Malaysia Ic"
          />
          <CheckButton
            checked={passportNumber}
            toggleCheck={() => setPassportNumber(!passportNumber)}
            title="Passport Number"
          />
          <CheckButton
            checked={gender}
            toggleCheck={() => setGender(!gender)}
            title="Gender"
          />
          <CheckButton
            checked={race}
            toggleCheck={() => setRace(!race)}
            title="Race"
          />
          <CheckButton
            checked={religion}
            toggleCheck={() => setReligion(!religion)}
            title="Religion"
          />
          <CheckButton
            checked={sdlExempt}
            toggleCheck={() => setSdlExempt(!sdlExempt)}
            title="Sdl Exempt"
          />
          <CheckButton
            checked={cpfExempt}
            toggleCheck={() => setCpfExempt(!cpfExempt)}
            title="Cpf Exempt"
          />
          <CheckButton
            checked={email}
            toggleCheck={() => setEmail(!email)}
            title="Email"
          />
          <CheckButton
            checked={number}
            toggleCheck={() => setNumber(!number)}
            title="Number"
          />
          <CheckButton
            checked={historicPayPoint}
            toggleCheck={() => setHistoricPayPoint(!historicPayPoint)}
            title="Historic Pay Point"
          />
          <CheckButton
            checked={jobTitle}
            toggleCheck={() => setJobTitle(!jobTitle)}
            title="Job Title"
          />
        </div>
        <hr />
        <div className="Transactions">
          <div className="TransactionsHeader">
            <h2>Transactions</h2>
            <div>
              <span
                className="AllNone"
                onClick={() => toggleTransactionChecks(true)}
              >
                All
              </span>
              ,{" "}
              <span
                className="AllNone"
                onClick={() => toggleTransactionChecks(false)}
              >
                None
              </span>
            </div>
          </div>
          <h3>Income</h3>
          <div className="RLists">
            <div>
              <span
                className="AllNone"
                onClick={() => toggleIncomeChecks(true)}
              >
                All
              </span>
              ,{" "}
              <span
                className="AllNone"
                onClick={() => toggleIncomeChecks(false)}
              >
                None
              </span>
            </div>
            <CheckButton
              checked={annualBonus}
              toggleCheck={() => setAnnualBonus(!annualBonus)}
              title="Annual Bonus"
            />
            <CheckButton
              checked={basicSalary}
              toggleCheck={() => setBasicSalary(!basicSalary)}
              title="Basic Salary"
            />
            <CheckButton
              checked={nonMonthlyCommission}
              toggleCheck={() => setNonMonthlyCommission(!nonMonthlyCommission)}
              title="Non Monthly Commission"
            />
            <CheckButton
              checked={leavePaidOut}
              toggleCheck={() => setLeavePaidOut(!leavePaidOut)}
              title="Leave Paid Out"
            />
            <CheckButton
              checked={incomePaid}
              toggleCheck={() => setIncomePaid(!incomePaid)}
              title="Income Paid Out After Tax Clearance"
            />
          </div>
          <h3>Deduction</h3>
          <div className="RLists">
            <div>
              <span
                className="AllNone"
                onClick={() => toggleDeductionChecks(true)}
              >
                All
              </span>
              ,{" "}
              <span
                className="AllNone"
                onClick={() => toggleDeductionChecks(false)}
              >
                None
              </span>
            </div>
            <CheckButton
              checked={CDAC}
              toggleCheck={() => setCDAC(!CDAC)}
              title="CDAC"
            />
            <CheckButton
              checked={cpfEmployee}
              toggleCheck={() => setCpfEmployee(!cpfEmployee)}
              title="CPF - Employee"
            />
            <CheckButton
              checked={ECF}
              toggleCheck={() => setECF(!ECF)}
              title="ECF"
            />
            <CheckButton
              checked={MBMF}
              toggleCheck={() => setMBMF(!MBMF)}
              title="MBMF"
            />
            <CheckButton
              checked={pension}
              toggleCheck={() => setPension(!pension)}
              title="Pension / Provident Outside Singapore - Employee"
            />
            <CheckButton
              checked={savingsDeduction}
              toggleCheck={() => setSavingsDeduction(!savingsDeduction)}
              title="Savings Deduction"
            />
            <CheckButton
              checked={shareEmployee}
              toggleCheck={() => setShareEmployee(!shareEmployee)}
              title="SHARE - Employee"
            />
            <CheckButton
              checked={SINDA}
              toggleCheck={() => setSINDA(!SINDA)}
              title="SINDA"
            />
            <CheckButton
              checked={incomeWithheld}
              toggleCheck={() => setIncomeWithheld(!incomeWithheld)}
              title="Income Withheld Pending Tax Clearance"
            />
          </div>
          <h3>Employer Contribution</h3>
          <div className="RLists">
            <div>
              <span
                className="AllNone"
                onClick={() => toggleEmployerContributionChecks(true)}
              >
                All
              </span>
              ,{" "}
              <span
                className="AllNone"
                onClick={() => toggleEmployerContributionChecks(false)}
              >
                None
              </span>
            </div>
            <CheckButton
              checked={cpfEmployer}
              toggleCheck={() => setCpfEmployer(!cpfEmployer)}
              title="CPF - Employer"
            />
            <CheckButton
              checked={fwl}
              toggleCheck={() => setFwl(!fwl)}
              title="FWL"
            />
            <CheckButton
              checked={sdl}
              toggleCheck={() => setSdl(!sdl)}
              title="SDL"
            />
            <CheckButton
              checked={shareEmployer}
              toggleCheck={() => setShareEmployer(!shareEmployer)}
              title="SHARE - Employer"
            />
          </div>
          <h3>Summary</h3>
          <div className="RLists">
            <div>
              <span
                className="AllNone"
                onClick={() => toggleSummaryCheck(true)}
              >
                All
              </span>
              ,{" "}
              <span
                className="AllNone"
                onClick={() => toggleSummaryCheck(false)}
              >
                None
              </span>
            </div>
            <CheckButton
              checked={grossRenumeration}
              toggleCheck={() => setGrossRenumeration(!grossRenumeration)}
              title="Gross Remuneration"
            />
          </div>
          <h3>Other</h3>
          <div className="RLists">
            <div>
              <span className="AllNone" onClick={() => toggleOtherChecks(true)}>
                All
              </span>
              ,{" "}
              <span
                className="AllNone"
                onClick={() => toggleOtherChecks(false)}
              >
                None
              </span>
            </div>
            <CheckButton
              checked={nettPay}
              toggleCheck={() => setNettPay(!nettPay)}
              title="Nett Pay"
            />
            <CheckButton
              checked={normalRate}
              toggleCheck={() => setNormalRate(!normalRate)}
              title="Normal Rate"
            />
          </div>
        </div>
        <hr />
        <div className="ReportBtns">
          <Button title="Show Excel" />
          <Button onClick={e => {
            e.preventDefault()
            props.history.push('/transaction-history-pdf')
          }} title="Show PDFs" />
        </div>
      </CardWithHeaders>
    </div>
  );
};
export default TransactionReport;
