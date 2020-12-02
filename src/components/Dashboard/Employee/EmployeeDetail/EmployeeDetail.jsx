import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import TabHeader from "../../../ui/TabHeader";
import AddEmployee from "../AddEmployee/AddEmployee";
import "./EmployeeDetail.css";
import Payroll from "./Payroll/Payroll";
import { BASE_URL } from "../../../../helpers/API_CONFIG";
import axios from "axios";
import EditEmployee from "../AddEmployee/EditEmployee";
import Feedback from "../../../ui/Feedback";

const EmployeeDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [data, setData] = useState(null);

  const fetchEmployee = () => {
    const id = props.match.params.id;
    console.log(id);
    setLoading(true);
    setError(false);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const url = BASE_URL + `/api/employees/${id}/`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        setData(res.data);
        let feq = res.data.pay_frequency;
        if (feq === "weekly") {
          setPayFrequency("Weekly, ending on Wednesday");
        } else {
          setPayFrequency("Mothly, ending on the 31st");
        }
        setFirstname(res.data.user.first_name);
        setLastname(res.data.user.last_name);
        setDob(res.data.date_of_birth);
        setAppointmentDate(res.data.date_of_appointment);
        let legal = "";
        switch (res.data.legal_status) {
          case "citizen":
            legal = "Citizen";
            break;
          case "permanent_resident":
            legal = "Permanent Resident";
            break;
          case "foreigner_except_work_permit":
            legal = "Foreigner (except Work Permit)";
            break;
          case "foreigner_work_permit":
            legal = "Foreigner (Work Permit)";
            break;
          case "foreign_director_malaysia":
            legal = "Foreign Director (Malaysia)";
            break;
          default:
            legal = "Foreign Director (Others)";
        }
        setLegalStatus(legal);
        setGender(res.data.gender === "male" ? "Male" : "Female");
        setRace(res.data.race);
        setReligion(res.data.religion);
        setSdlExempt(res.data.sdl_exempt);
        setCpfExempt(res.data.cpf_exempt);
        setEmail(res.data.user.email);
        setPaymentMethod(res.data.payment_method);
        setBank(res.data.bank.id + "-" + res.data.bank.name);
        setAccountNumber(res.data.account_number);
        setBranchCode(res.data.branch_code);
        let aType = "";
        switch (res.data.address_type) {
          case "local_residential_address":
            aType = "Local residential address";
            break;
          case "foreign_address":
            aType = "Foreign address";
            break;
          case "local_c/o_address":
            aType = "Local C/O address";
            break;
          default:
            aType = "Not Available";
        }
        setAddressType(aType);
        setBlockNumber(res.data.block_no);
        setLevelNumber(res.data.level_no);
        setPostalCode(res.data.postal_code);
        setStreetName(res.data.street_name);
        setUnitNumber(res.data.unit_no);
        setAddressLine1(res.data.address_line_1);
        setAddressLine2(res.data.address_line_2);
        setAddressLine3(res.data.address_line_3);
        setCountryCode(res.data.country_code);
        setJobTitle(res.data.job_title);
        setHourlyPaid(res.data.hourly_paid);
        setSchedule(res.data.schedule);
        setMondayChecked(res.data.monday_active);
        setMondayNormalPartial(res.data.monday_normal_partial);
        setMondayHours(res.data.monday_hours);
        setTuesdayChecked(res.data.tuesday_active);
        setTuesdayNormalPartial(res.data.tuesday_normal_partial);
        setTuesdayHours(res.data.tuesday_hours);
        setWednesdayChecked(res.data.wednesday_active);
        setWednesdayNormalPartial(res.data.wednesday_normal_partial);
        setWednesdayHours(res.data.wednesday_hours);
        setThursdayChecked(res.data.thursday_active);
        setThursdayNormalPartial(res.data.thursday_normal_partial);
        setThursdayHours(res.data.thursday_hours);
        setFridayChecked(res.data.friday_active);
        setFridayNormalPartial(res.data.friday_normal_partial);
        setFridayHours(res.data.friday_hours);
        setSaturdayChecked(res.data.saturday_active);
        setSaturdayNormalPartial(res.data.saturday_normal_partial);
        setSaturdayHours(res.data.saturday_hours);
        setSundayChecked(res.data.sunday_active);
        setSundayNormalPartial(res.data.sunday_normal_partial);
        setSundayHours(res.data.sunday_hours);
      })
      .catch(() => {
        console.log("error...");
      });
  };

  const headerData = [
    { key_: "payroll", title: "Payroll" },
    {
      key_: "edit",
      title: (
        <>
          Edit Info <i className="fas fa-sort-up"></i>
        </>
      ),
    },
    {
      key_: "leave",
      title: (
        <>
          Leave <i className="fas fa-sort-up"></i>
        </>
      ),
    },
    { key_: "end", title: "End Service" },
    { key_: "notes", title: "Notes" },
    { key_: "delete", title: "Delete" },
  ];

  const [current, setCurrent] = useState("payroll");

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

  const [bankData, setBankValues] = useState([]);

  const toggleFeedback = (errorRes) => {
    setError(errorRes);
    if (errorRes) {
      setFeedbackMessage("something weng wrong...");
    } else {
      setFeedbackMessage("Employee has been updated successfully...");
    }
    setShowFeedback(true);
  };

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
        // email: email,
        first_name: firstname,
        last_name: lastname,
        // password: "password",
      },
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
      bank: parseInt(bank.split("-")[0]),
      account_number: accountNumber,
      branch_code: branchCode,
      address_type: aType,
      block_no: blockNumber,
      street_name: streetName,
      level_no: levelNumber,
      unit_no: unitNumber,
      postal_code: postalCode,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      address_line_3: addressLine3,
      country_code: countryCode,
      job_title: jobTitle,
      hourly_paid: hourlyPaid,
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

    // const newData = new FormData();
    // newData.append("user.first_name", "saddd");

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const url = BASE_URL + "/api/employees/" + props.match.params.id + "/";
    setLoading(true);
    setError(false);
    axios
      .patch(url, data, { headers: headers })
      .then((res) => {
        setLoading(false);
        toggleFeedback(false);
        setTimeout(() => {
          setShowFeedback(false);
        }, 3000);
        // props.history.push("/employee/" + res.data.id);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        toggleFeedback(false);
        setTimeout(() => {
          setShowFeedback(false);
        }, 3000);
      });
  };

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

  useEffect(() => {
    const fetchBank = () => {
      const url = BASE_URL + "/api/banks/";
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      };
      axios.get(url, { headers: headers }).then((res) => {
        setBankValues(res.data);
      });
    };
    fetchBank();
    fetchEmployee();
  }, []);

  return (
    <div className="EmployeeDetail">
      <div className="EmployeeDetailHeader">
        <h1>
          {data ? data.user.last_name + " , " + data.user.first_name : null}
        </h1>
        <Feedback show={showFeedback} message={feedbackMessage} error={error} />
        <TabHeader
          data={headerData}
          setCurrent={(current) => setCurrent(current)}
          current={current}
        />

        {current === "payroll" ? (
          <Payroll
            chartData={data ? data.salary_detail.all_pay_slips : null}
            paymentMethod="Cash"
            payFrequency="Weekly, ending on Wednesday"
            number="0008"
            loading={loading}
            error={error}
            data={data}
          />
        ) : null}
        {current === "edit" ? (
          <EditEmployee
            payFrequency={payFrequency}
            setPayFrequency={(val) => setPayFrequency(val)}
            firstname={firstname}
            setFirstname={(val) => setFirstname(val)}
            lastname={lastname}
            setLastname={(val) => setLastname(val)}
            dob={dob}
            setDob={(val) => setDob(val)}
            appointmentDate={appointmentDate}
            setAppointmentDate={(val) => setAppointmentDate(val)}
            legalStatus={legalStatus}
            setLegalStatus={(val) => setLegalStatus(val)}
            gender={gender}
            setGender={(val) => setGender(val)}
            race={race}
            setRace={(val) => setRace(val)}
            religion={religion}
            setReligion={(val) => setReligion(val)}
            sdlExempt={sdlExempt}
            setSdlExempt={(val) => setSdlExempt(val)}
            cpfExempt={cpfExempt}
            setCpfExempt={(val) => setCpfExempt(val)}
            email={email}
            setEmail={(val) => setEmail(val)}
            paymentMethod={paymentMethod}
            setPaymentMethod={(val) => setPaymentMethod(val)}
            bank={bank}
            bankData={bankData}
            setBank={(val) => setBank(val)}
            accountNumber={accountNumber}
            setAccountNumber={(val) => setAccountNumber(val)}
            branchCode={branchCode}
            setBranchCode={(val) => setBranchCode(val)}
            addressType={addressType}
            setAddressType={(val) => setAddressType(val)}
            blockNumber={blockNumber}
            setBlockNumber={(val) => setBlockNumber(val)}
            levelNumber={levelNumber}
            setLevelNumber={(val) => setLevelNumber(val)}
            postalCode={postalCode}
            setPostalCode={(val) => setPostalCode(val)}
            streetName={streetName}
            setStreetName={(val) => setStreetName(val)}
            unitNumber={unitNumber}
            setUnitNumber={(val) => setUnitNumber(val)}
            addressLine1={addressLine1}
            setAddressLine1={(val) => setAddressLine1(val)}
            addressLine2={addressLine2}
            setAddressLine2={(val) => setAddressLine2(val)}
            addressLine3={addressLine3}
            setAddressLine3={(val) => setAddressLine3(val)}
            countryCode={countryCode}
            setCountryCode={(val) => setCountryCode(val)}
            jobTitle={jobTitle}
            setJobTitle={(val) => setJobTitle(val)}
            nextPage={nextPage}
            setNextPage={(val) => setNextPage(val)}
            hourlyPaid={hourlyPaid}
            setHourlyPaid={(val) => setHourlyPaid(val)}
            hoursPerDay={hoursPerDay}
            setHoursPerDay={(val) => setHoursPerDay(val)}
            schedule={schedule}
            setSchedule={(val) => setSchedule(val)}
            mondayChecked={mondayChecked}
            setMondayChecked={(val) => setMondayChecked(val)}
            mondayNormalPartial={mondayNormalPartial}
            setMondayNormalPartial={(val) => setMondayNormalPartial(val)}
            mondayHours={mondayHours}
            setMondayHours={(val) => setMondayHours(val)}
            tuesdayChecked={tuesdayChecked}
            setTuesdayChecked={(val) => setTuesdayChecked(val)}
            tuesdayNormalPartial={tuesdayNormalPartial}
            setTuesdayNormalPartial={(val) => setTuesdayNormalPartial(val)}
            tuesdayHours={tuesdayHours}
            setTuesdayHours={(val) => setTuesdayHours(val)}
            wednesdayChecked={wednesdayChecked}
            setWednesdayChecked={(val) => setWednesdayChecked(val)}
            wednesdayNormalPartial={wednesdayNormalPartial}
            setWednesdayNormalPartial={(val) => setWednesdayNormalPartial(val)}
            wednesdayHours={wednesdayHours}
            setWednesdayHours={(val) => setWednesdayHours(val)}
            thursdayChecked={thursdayChecked}
            setThursdayChecked={(val) => setThursdayChecked(val)}
            thursdayNormalPartial={thursdayNormalPartial}
            setThursdayNormalPartial={(val) => setThursdayNormalPartial(val)}
            thursdayHours={thursdayHours}
            setThursdayHours={(val) => setThursdayHours(val)}
            fridayChecked={fridayChecked}
            setFridayChecked={(val) => setFridayChecked(val)}
            fridayNormalPartial={fridayNormalPartial}
            setFridayNormalPartial={(val) => setFridayNormalPartial(val)}
            fridayHours={fridayHours}
            setFridayHours={(val) => setFridayHours(val)}
            saturdayChecked={saturdayChecked}
            setSaturdayChecked={(val) => setSaturdayChecked(val)}
            saturdayNormalPartial={saturdayNormalPartial}
            setSaturdayNormalPartial={(val) => setSaturdayNormalPartial(val)}
            saturdayHours={saturdayHours}
            setSaturdayHours={(val) => setSaturdayHours(val)}
            sundayChecked={sundayChecked}
            setSundayChecked={(val) => setSundayChecked(val)}
            sundayNormalPartial={sundayNormalPartial}
            setSundayNormalPartial={(val) => setSundayNormalPartial(val)}
            sundayHours={sundayHours}
            setSundayHours={(val) => setSundayHours(val)}
            fullDaysPerWeek={fullDaysPerWeek}
            setFullDaysPerWeek={(val) => setFullDaysPerWeek(val)}
            submitEmployee={submitEmployee}
            edit={true}
          />
        ) : null}
      </div>
    </div>
  );
};
export default withRouter(EmployeeDetail);
