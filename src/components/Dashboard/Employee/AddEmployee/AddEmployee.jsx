import React, { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import CheckButton from "../../../ui/CheckButton";
import Input from "../../../ui/Input";
import KeyValue from "../../../ui/KeyValue";
import Select from "../../../ui/Select";
import "./AddEmployee.css";
import { countryData } from "./CountryData";
import { BASE_URL } from "../../../../helpers/API_CONFIG";
import axios from "axios";
import { withRouter } from "react-router-dom";

const AddEmployee = (props) => {
  const [payFrequency, setPayFrequency] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [legalStatus, setLegalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [religion, setReligion] = useState("");
  const [sdlExempt, setSdlExempt] = useState(false);
  const [cpfExempt, setCpfExempt] = useState(false);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [addressType, setAddressType] = useState("Local residential address");
  const [blockNumber, setBlockNumber] = useState("");
  const [levelNumber, setLevelNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [nextPage, setNextPage] = useState(false);

  const [hourlyPaid, setHourlyPaid] = useState(false);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [schedule, setSchedule] = useState("");

  const [mondayChecked, setMondayChecked] = useState(true);
  const [mondayNormalPartial, setMondayNormalPartial] = useState("Normal Day");
  const [mondayHours, setMondayHours] = useState(8);
  const [tuesdayChecked, setTuesdayChecked] = useState(true);
  const [tuesdayNormalPartial, setTuesdayNormalPartial] = useState(
    "Normal Day"
  );
  const [tuesdayHours, setTuesdayHours] = useState(8);
  const [wednesdayChecked, setWednesdayChecked] = useState(true);
  const [wednesdayNormalPartial, setWednesdayNormalPartial] = useState(
    "Normal Day"
  );
  const [wednesdayHours, setWednesdayHours] = useState(8);
  const [thursdayChecked, setThursdayChecked] = useState(true);
  const [thursdayNormalPartial, setThursdayNormalPartial] = useState(
    "Normal Day"
  );
  const [thursdayHours, setThursdayHours] = useState(8);
  const [fridayChecked, setFridayChecked] = useState(true);
  const [fridayNormalPartial, setFridayNormalPartial] = useState("Normal Day");
  const [fridayHours, setFridayHours] = useState(8);
  const [saturdayChecked, setSaturdayChecked] = useState(false);
  const [saturdayNormalPartial, setSaturdayNormalPartial] = useState(
    "Normal Day"
  );
  const [saturdayHours, setSaturdayHours] = useState(8);
  const [sundayChecked, setSundayChecked] = useState(false);
  const [sundayNormalPartial, setSundayNormalPartial] = useState("Normal Day");
  const [sundayHours, setSundayHours] = useState(8);

  const [fullDaysPerWeek, setFullDaysPerWeek] = useState(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [bankData, setBankValues] = useState([]);

  const submitEmployee = () => {
    let legal = "";
    switch (legalStatus) {
      case "Citizen":
        legal = "citizen";
        break;
      case "Permanent Resident":
        legal = "permanent_resident";
        break;
      case "Foreigner (except Work Permit)":
        legal = "foreigner_except_work_permit";
        break;
      case "Foreigner (Work Permit)":
        legal = "foreigner_work_permit";
        break;
      case "Foreign Director (Malaysia)":
        legal = "foreign_director_malaysia";
        break;
      default:
        legal = "foreign_director_other";
    }
    let aType = "";
    switch (addressType) {
      case "Local residential address":
        aType = "local_residential_address";
        break;
      case "Foreign address":
        aType = "foreign_address";
        break;
      case "Local C/O address":
        aType = "local_c/o_address";
        break;
      default:
        aType = "not_available";
    }
    const data = {
      user: {
        email: email,
        first_name: firstname,
        last_name: lastname,
        username: email,
        password: "password",
      },
      bank: parseInt(bank.split("-")[0]),
      basic_salary: 0,
      pay_frequency:
        payFrequency === "Weekly, ending on Wednesday" ? "weekly" : "monthly",
      date_of_birth: dob,
      date_of_appointment: appointmentDate,
      legal_status: legal,
      // nric: "122455",
      gender: gender === "Male" ? "male" : "female",
      race: race,
      religion: religion,
      sdl_exempt: sdlExempt,
      cpf_exempt: cpfExempt,
      payment_method: "cash",
      account_number: accountNumber,
      branch_code: branchCode,
      address_type: aType,
      block_no: blockNumber,
      street_name: streetName,
      level_no: levelNumber,
      unit_no: unitNumber,
      post_code: postalCode,
      job_title: jobTitle,
      monday_active: mondayChecked,
      monday_normal_partial:
        mondayNormalPartial === "Normal Day" ? "normal" : "partial",
      monday_hours: mondayHours,
      tuesday_active: tuesdayChecked,
      tuesday_normal_partial:
        tuesdayNormalPartial === "Normal Day" ? "normal" : "partial",
      tuesday_hours: tuesdayHours,
      wednesday_active: wednesdayChecked,
      wednesday_normal_partial:
        wednesdayNormalPartial === "Normal Day" ? "normal" : "partial",
      wednesday_hours: wednesdayHours,
      thursday_active: thursdayChecked,
      thursday_normal_partial:
        thursdayNormalPartial === "Normal Day" ? "normal" : "partial",
      thursday_hours: thursdayHours,
      friday_active: fridayChecked,
      friday_normal_partial:
        fridayNormalPartial === "Normal Day" ? "normal" : "partial",
      friday_hours: fridayHours,
      saturday_active: saturdayChecked,
      saturday_normal_partial:
        saturdayNormalPartial === "Normal Day" ? "normal" : "partial",
      saturday_hours: saturdayHours,
      sunday_active: sundayChecked,
      sunday_normal_partial:
        sundayNormalPartial === "Normal Day" ? "normal" : "partial",
      sunday_hours: sundayHours,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const url = BASE_URL + "/api/employees/";
    setLoading(true);
    setError(false);
    axios.post(url, data, { headers: headers }).then((res) => {
      setLoading(false);
      props.history.push("/employee/" + res.data.id);
    });
  };

  const fetchBank = () => {
    const url = BASE_URL + "/api/banks/";
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    };
    axios.get(url, { headers: headers }).then((res) => {
      setBankValues(res.data);
    });
  };

  useEffect(() => {
    fetchBank();
  }, []);

  useEffect(() => {
    const fullDaysCalculation = () => {
      const days = [
        mondayHours,
        tuesdayHours,
        wednesdayHours,
        thursdayHours,
        fridayHours,
        saturdayHours,
        sundayHours,
      ];
      if (!mondayChecked) {
        days[0] = 0;
      }
      if (!tuesdayChecked) {
        days[1] = 0;
      }
      if (!wednesdayChecked) {
        days[2] = 0;
      }
      if (!thursdayChecked) {
        days[3] = 0;
      }
      if (!fridayChecked) {
        days[4] = 0;
      }
      if (!saturdayChecked) {
        days[5] = 0;
      }
      if (!sundayChecked) {
        days[6] = 0;
      }
      let total = 0;
      let totalWorkDays = 0;
      for (let item of days) {
        if (item > 0) {
          totalWorkDays += 1;
        }
        total += item;
      }
      let average;
      if (totalWorkDays === 0) {
        average = 0;
      } else {
        average = total / 8;
      }
      setFullDaysPerWeek(average.toFixed(2));
    };
    fullDaysCalculation();
  }, [
    mondayHours,
    tuesdayHours,
    wednesdayHours,
    thursdayHours,
    fridayHours,
    saturdayHours,
    sundayHours,
  ]);

  let addEmployeeContent = (
    <>
      <h3>Essentials</h3>
      <form onSubmit={() => setNextPage(true)}>
        <KeyValue key_="Pay Frequency">
          <Select
            onChange={(val) => setPayFrequency(val)}
            value={payFrequency}
            data={[
              "Weekly, ending on Wednesday",
              "Monthly, ending on the 31st",
            ]}
            required
          />
        </KeyValue>
        <KeyValue key_="First name">
          <Input
            value={firstname}
            onChange={(val) => setFirstname(val)}
            required
            noHeader
            type="text"
            placeHolder="First name"
          />
        </KeyValue>
        <KeyValue key_="Last name">
          <Input
            value={lastname}
            onChange={(val) => setLastname(val)}
            required
            noHeader
            type="text"
            placeHolder="Last name"
          />
        </KeyValue>
        <KeyValue key_="Date of Birth">
          <Input
            value={dob}
            onChange={(val) => setDob(val)}
            required
            noHeader
            type="date"
            placeHolder="Date of Birth"
          />
        </KeyValue>
        <KeyValue key_="Date of Appointment">
          <Input
            value={appointmentDate}
            onChange={(val) => setAppointmentDate(val)}
            required
            noHeader
            type="date"
            placeHolder="Date of Appointment"
          />
        </KeyValue>
        <KeyValue key_="Legal Status">
          <Select
            onChange={(val) => setLegalStatus(val)}
            value={legalStatus}
            data={[
              "Citizen",
              "Permanent Resident",
              "Foreigner (except Work Permit)",
              "Foreigner (Work Permit)",
              "Foreign Director (Malaysia)",
              "Foreign Director (Others)",
            ]}
            required
          />
        </KeyValue>
        <KeyValue key_="Gender">
          <Select
            onChange={(val) => setGender(val)}
            value={gender}
            data={["Male", "Female"]}
            required
          />
        </KeyValue>
        <KeyValue key_="Race">
          <Select
            onChange={(val) => setRace(val)}
            value={race}
            data={["chinese", "indian", "malay", "eurasian", "other"]}
            required
          />
        </KeyValue>
        <KeyValue key_="Religion">
          <Select
            onChange={(val) => setReligion(val)}
            value={religion}
            data={["buddhist", "christian", "hindu", "muslim", "other"]}
            required
          />
        </KeyValue>
        <div>
          <CheckButton
            title="SDL Exempt"
            checked={sdlExempt}
            toggleCheck={() => setSdlExempt(!sdlExempt)}
          />
        </div>
        <div>
          <CheckButton
            title="CPF Exempt"
            checked={cpfExempt}
            toggleCheck={() => setCpfExempt(!cpfExempt)}
          />
        </div>
        <KeyValue key_="Email">
          <Input
            value={email}
            onChange={(val) => setEmail(val)}
            required
            noHeader
            type="email"
            placeHolder="Email Address"
          />
        </KeyValue>
        <KeyValue key_="Payment Method">
          <Select
            onChange={(val) => setPaymentMethod(val)}
            value={paymentMethod}
            data={["cash", "cheque", "GIRO"]}
            required
          />
        </KeyValue>
        <h3>Bank Account Details</h3>
        <KeyValue key_="Bank">
          <Select
            onChange={(val) => setBank(val)}
            value={bank}
            data={bankData}
            required
          />
        </KeyValue>
        <KeyValue key_="Account Number">
          <Input
            value={accountNumber}
            onChange={(val) => setAccountNumber(val)}
            required
            noHeader
            type="text"
            placeHolder="Account Number"
          />
        </KeyValue>
        <KeyValue key_="Branch Code">
          <Input
            value={branchCode}
            onChange={(val) => setBranchCode(val)}
            required
            noHeader
            type="text"
            placeHolder="Branch Code"
          />
        </KeyValue>
        <h3>Address</h3>
        <KeyValue key_="Type">
          <Select
            onChange={(val) => setAddressType(val)}
            value={addressType}
            data={[
              "Local residential address",
              "Foreign address",
              "Local C/O address",
              "Not Available",
            ]}
            required
          />
        </KeyValue>
        {addressType === "Local residential address" ? (
          <>
            <div className="ResidentialGrid">
              <KeyValue key_="Block No.">
                <Input
                  value={blockNumber}
                  onChange={(val) => setBlockNumber(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Block Number"
                />
              </KeyValue>
              <KeyValue key_="Street Name">
                <Input
                  value={streetName}
                  onChange={(val) => setStreetName(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Street Name"
                />
              </KeyValue>
              <KeyValue key_="Level No.">
                <Input
                  value={levelNumber}
                  onChange={(val) => setLevelNumber(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Level No."
                />
              </KeyValue>
              <KeyValue key_="Unit No.">
                <Input
                  value={unitNumber}
                  onChange={(val) => setUnitNumber(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Unit No."
                />
              </KeyValue>
              <KeyValue key_="Postal Code">
                <Input
                  value={postalCode}
                  onChange={(val) => setPostalCode(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Postal Code"
                />
              </KeyValue>
            </div>
          </>
        ) : null}
        {addressType === "Foreign address" ? (
          <>
            <KeyValue key_="Address line1">
              <Input
                value={addressLine1}
                onChange={(val) => setAddressLine1(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line1"
              />
            </KeyValue>
            <KeyValue key_="Address line2">
              <Input
                value={addressLine2}
                onChange={(val) => setAddressLine2(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line2"
              />
            </KeyValue>
            <KeyValue key_="Address line3">
              <Input
                value={addressLine3}
                onChange={(val) => setAddressLine3(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line3"
              />
            </KeyValue>
            <KeyValue key_="Postal Code">
              <Input
                value={postalCode}
                onChange={(val) => setPostalCode(val)}
                required
                noHeader
                type="text"
                placeHolder="Postal Code"
              />
            </KeyValue>
            <KeyValue key_="Country Code">
              <Select
                onChange={(val) => setCountryCode(val)}
                value={countryCode}
                data={countryData}
                required
              />
            </KeyValue>
          </>
        ) : null}
        {addressType === "Local C/O address" ? (
          <>
            <KeyValue key_="Address line1">
              <Input
                value={addressLine1}
                onChange={(val) => setAddressLine1(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line1"
              />
            </KeyValue>
            <KeyValue key_="Address line2">
              <Input
                value={addressLine2}
                onChange={(val) => setAddressLine2(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line2"
              />
            </KeyValue>
            <KeyValue key_="Address line3">
              <Input
                value={addressLine3}
                onChange={(val) => setAddressLine3(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line3"
              />
            </KeyValue>
            <KeyValue key_="Postal Code">
              <Input
                value={postalCode}
                onChange={(val) => setPostalCode(val)}
                required
                noHeader
                type="text"
                placeHolder="Postal Code"
              />
            </KeyValue>
          </>
        ) : null}
        <h3>Other Statutory Info</h3>
        <KeyValue key_="Job Title">
          <Input
            value={jobTitle}
            onChange={(val) => setJobTitle(val)}
            required
            noHeader
            type="text"
            placeHolder="Job Title"
          />
        </KeyValue>
        <Button type="submit" title="Next" />
      </form>
    </>
  );

  if (nextPage) {
    addEmployeeContent = (
      <>
        <CheckButton
          title="Hourly paid"
          checked={hourlyPaid}
          toggleCheck={() => setHourlyPaid(!hourlyPaid)}
        />
        <br />
        <KeyValue key_="Hours per day">
          <Input
            value={hoursPerDay}
            onChange={(val) => setHoursPerDay(val)}
            required
            noHeader
            type="number"
            placeHolder="Hours per day"
          />
        </KeyValue>
        <KeyValue key_="Schedule">
          <Select
            onChange={(val) => setSchedule(val)}
            value={schedule}
            data={["Fixed", "Casual / Temp"]}
            required
          />
        </KeyValue>
        <h3>Regular Working Days</h3>

        <div className="WorkingDays">
          <CheckButton
            checked={mondayChecked}
            toggleCheck={() => setMondayChecked(!mondayChecked)}
            title="Mon"
          />
          {mondayChecked ? (
            <Select
              onChange={(val) => setMondayNormalPartial(val)}
              value={mondayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {mondayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={mondayHours}
                onChange={(val) => {
                  setMondayHours(parseInt(val));
                }}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <div className="WorkingDays">
          <CheckButton
            checked={tuesdayChecked}
            toggleCheck={() => setTuesdayChecked(!tuesdayChecked)}
            title="Tue"
          />
          {tuesdayChecked ? (
            <Select
              onChange={(val) => setTuesdayNormalPartial(val)}
              value={tuesdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {tuesdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={tuesdayHours}
                onChange={(val) => setTuesdayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <div className="WorkingDays">
          <CheckButton
            checked={wednesdayChecked}
            toggleCheck={() => setWednesdayChecked(!wednesdayChecked)}
            title="Wed"
          />
          {wednesdayChecked ? (
            <Select
              onChange={(val) => setWednesdayNormalPartial(val)}
              value={wednesdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {wednesdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={wednesdayHours}
                onChange={(val) => setWednesdayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <div className="WorkingDays">
          <CheckButton
            checked={thursdayChecked}
            toggleCheck={() => setThursdayChecked(!thursdayChecked)}
            title="Thu"
          />
          {thursdayChecked ? (
            <Select
              onChange={(val) => setThursdayNormalPartial(val)}
              value={thursdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {thursdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={thursdayHours}
                onChange={(val) => setThursdayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <div className="WorkingDays">
          <CheckButton
            checked={fridayChecked}
            toggleCheck={() => setFridayChecked(!fridayChecked)}
            title="Fri"
          />
          {fridayChecked ? (
            <Select
              onChange={(val) => setFridayNormalPartial(val)}
              value={fridayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {fridayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={fridayHours}
                onChange={(val) => setFridayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <div className="WorkingDays">
          <CheckButton
            checked={saturdayChecked}
            toggleCheck={() => setSaturdayChecked(!saturdayChecked)}
            title="Sat"
          />
          {saturdayChecked ? (
            <Select
              onChange={(val) => setSaturdayNormalPartial(val)}
              value={saturdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {saturdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={saturdayHours}
                onChange={(val) => setSaturdayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <div className="WorkingDays">
          <CheckButton
            checked={sundayChecked}
            toggleCheck={() => setSundayChecked(!sundayChecked)}
            title="Sun"
          />
          {sundayChecked ? (
            <Select
              onChange={(val) => setSundayNormalPartial(val)}
              value={sundayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {sundayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={sundayHours}
                onChange={(val) => setSundayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <KeyValue key_="Full days per week">{fullDaysPerWeek}</KeyValue>
        <Button title="Submit" onClick={submitEmployee} />
      </>
    );
  }

  return (
    <div className="AddEmployee">
      <h1>Add New Employee</h1>
      <br />
      {addEmployeeContent}
    </div>
  );
};

export default withRouter(AddEmployee);
