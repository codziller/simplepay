import React, { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import CheckButton from "../../../ui/CheckButton";
import Input from "../../../ui/Input";
import KeyValue from "../../../ui/KeyValue";
import Select from "../../../ui/Select";
import "./AddEmployee.css";
import { countryData } from "./CountryData";
import { withRouter } from "react-router-dom";
import Loading from "../../../ui/Loading";

const AddEmployee = (props) => {
  console.log(props);

  let addEmployeeContent = (
    <>
      {props.loading ? <Loading /> : null}
      <h3>Essentials</h3>
      <form onSubmit={() => props.setNextPage(true)}>
        <KeyValue key_="Pay Frequency">
          <Select
            onChange={(val) => props.setPayFrequency(val)}
            value={props.payFrequency}
            data={[
              "Weekly, ending on Wednesday",
              "Monthly, ending on the 31st",
            ]}
            required
          />
        </KeyValue>
        <KeyValue key_="First name">
          <Input
            value={props.firstname}
            onChange={(val) => props.setFirstname(val)}
            required
            noHeader
            type="text"
            placeHolder="First name"
          />
        </KeyValue>
        <KeyValue key_="Last name">
          <Input
            value={props.lastname}
            onChange={(val) => props.setLastname(val)}
            required
            noHeader
            type="text"
            placeHolder="Last name"
          />
        </KeyValue>
        <KeyValue key_="Date of Birth">
          <Input
            value={props.dob}
            onChange={(val) => props.setDob(val)}
            required
            noHeader
            type="date"
            placeHolder="Date of Birth"
          />
        </KeyValue>
        <KeyValue key_="Date of Appointment">
          <Input
            value={props.appointmentDate}
            onChange={(val) => props.setAppointmentDate(val)}
            required
            noHeader
            type="date"
            placeHolder="Date of Appointment"
          />
        </KeyValue>
        <KeyValue key_="Legal Status">
          <Select
            onChange={(val) => props.setLegalStatus(val)}
            value={props.legalStatus}
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
            onChange={(val) => props.setGender(val)}
            value={props.gender}
            data={["Male", "Female"]}
            required
          />
        </KeyValue>
        <KeyValue key_="Race">
          <Select
            onChange={(val) => props.setRace(val)}
            value={props.race}
            data={["chinese", "indian", "malay", "eurasian", "other"]}
            required
          />
        </KeyValue>
        <KeyValue key_="Religion">
          <Select
            onChange={(val) => props.setReligion(val)}
            value={props.religion}
            data={["buddhist", "christian", "hindu", "muslim", "other"]}
            required
          />
        </KeyValue>
        <div>
          <CheckButton
            title="SDL Exempt"
            checked={props.sdlExempt}
            toggleCheck={() => props.setSdlExempt(!props.sdlExempt)}
          />
        </div>
        <div>
          <CheckButton
            title="CPF Exempt"
            checked={props.cpfExempt}
            toggleCheck={() => props.setCpfExempt(!props.cpfExempt)}
          />
        </div>
        <KeyValue key_="Email">
          <Input
            value={props.email}
            onChange={(val) => props.setEmail(val)}
            required
            noHeader
            type="email"
            placeHolder="Email Address"
          />
        </KeyValue>
        <KeyValue key_="Payment Method">
          <Select
            onChange={(val) => props.setPaymentMethod(val)}
            value={props.paymentMethod}
            data={["cash", "cheque", "GIRO"]}
            required
          />
        </KeyValue>
        <h3>Bank Account Details</h3>
        <KeyValue key_="Bank">
          <Select
            onChange={(val) => props.setBank(val)}
            value={props.bank}
            data={props.bankData}
            required
          />
        </KeyValue>
        <KeyValue key_="Account Number">
          <Input
            value={props.accountNumber}
            onChange={(val) => props.setAccountNumber(val)}
            required
            noHeader
            type="text"
            placeHolder="Account Number"
          />
        </KeyValue>
        <KeyValue key_="Branch Code">
          <Input
            value={props.branchCode}
            onChange={(val) => props.setBranchCode(val)}
            required
            noHeader
            type="text"
            placeHolder="Branch Code"
          />
        </KeyValue>
        <h3>Address</h3>
        <KeyValue key_="Type">
          <Select
            onChange={(val) => props.setAddressType(val)}
            value={props.addressType}
            data={[
              "Local residential address",
              "Foreign address",
              "Local C/O address",
              "Not Available",
            ]}
            required
          />
        </KeyValue>
        {props.addressType === "Local residential address" ? (
          <>
            <div className="ResidentialGrid">
              <KeyValue key_="Block No.">
                <Input
                  value={props.blockNumber}
                  onChange={(val) => props.setBlockNumber(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Block Number"
                />
              </KeyValue>
              <KeyValue key_="Street Name">
                <Input
                  value={props.streetName}
                  onChange={(val) => props.setStreetName(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Street Name"
                />
              </KeyValue>
              <KeyValue key_="Level No.">
                <Input
                  value={props.levelNumber}
                  onChange={(val) => props.setLevelNumber(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Level No."
                />
              </KeyValue>
              <KeyValue key_="Unit No.">
                <Input
                  value={props.unitNumber}
                  onChange={(val) => props.setUnitNumber(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Unit No."
                />
              </KeyValue>
              <KeyValue key_="Postal Code">
                <Input
                  value={props.postalCode}
                  onChange={(val) => props.setPostalCode(val)}
                  required
                  noHeader
                  type="text"
                  placeHolder="Postal Code"
                />
              </KeyValue>
            </div>
          </>
        ) : null}
        {props.addressType === "Foreign address" ? (
          <>
            <KeyValue key_="Address line1">
              <Input
                value={props.addressLine1}
                onChange={(val) => props.setAddressLine1(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line1"
              />
            </KeyValue>
            <KeyValue key_="Address line2">
              <Input
                value={props.addressLine2}
                onChange={(val) => props.setAddressLine2(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line2"
              />
            </KeyValue>
            <KeyValue key_="Address line3">
              <Input
                value={props.addressLine3}
                onChange={(val) => props.setAddressLine3(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line3"
              />
            </KeyValue>
            <KeyValue key_="Postal Code">
              <Input
                value={props.postalCode}
                onChange={(val) => props.setPostalCode(val)}
                required
                noHeader
                type="text"
                placeHolder="Postal Code"
              />
            </KeyValue>
            <KeyValue key_="Country Code">
              <Select
                onChange={(val) => props.setCountryCode(val)}
                value={props.countryCode}
                data={countryData}
                required
              />
            </KeyValue>
          </>
        ) : null}
        {props.addressType === "Local C/O address" ? (
          <>
            <KeyValue key_="Address line1">
              <Input
                value={props.addressLine1}
                onChange={(val) => props.setAddressLine1(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line1"
              />
            </KeyValue>
            <KeyValue key_="Address line2">
              <Input
                value={props.addressLine2}
                onChange={(val) => props.setAddressLine2(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line2"
              />
            </KeyValue>
            <KeyValue key_="Address line3">
              <Input
                value={props.addressLine3}
                onChange={(val) => props.setAddressLine3(val)}
                required
                noHeader
                type="text"
                placeHolder="Address line3"
              />
            </KeyValue>
            <KeyValue key_="Postal Code">
              <Input
                value={props.postalCode}
                onChange={(val) => props.setPostalCode(val)}
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
            value={props.jobTitle}
            onChange={(val) => props.setJobTitle(val)}
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

  if (props.nextPage) {
    addEmployeeContent = (
      <>
        <CheckButton
          title="Hourly paid"
          checked={props.hourlyPaid}
          toggleCheck={() => props.setHourlyPaid(!props.hourlyPaid)}
        />
        <br />
        <KeyValue key_="Hours per day">
          <Input
            value={props.hoursPerDay}
            onChange={(val) => props.setHoursPerDay(val)}
            required
            noHeader
            type="number"
            placeHolder="Hours per day"
          />
        </KeyValue>
        <KeyValue key_="Schedule">
          <Select
            onChange={(val) => props.setSchedule(val)}
            value={props.schedule}
            data={["Fixed", "Casual / Temp"]}
            required
          />
        </KeyValue>
        <h3>Regular Working Days</h3>

        <div className="WorkingDays">
          <CheckButton
            checked={props.mondayChecked}
            toggleCheck={() => props.setMondayChecked(!props.mondayChecked)}
            title="Mon"
          />
          {props.mondayChecked ? (
            <Select
              onChange={(val) => props.setMondayNormalPartial(val)}
              value={props.mondayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.mondayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.mondayHours}
                onChange={(val) => {
                  props.setMondayHours(parseInt(val));
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
            checked={props.tuesdayChecked}
            toggleCheck={() => props.setTuesdayChecked(!props.tuesdayChecked)}
            title="Tue"
          />
          {props.tuesdayChecked ? (
            <Select
              onChange={(val) => props.setTuesdayNormalPartial(val)}
              value={props.tuesdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.tuesdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.tuesdayHours}
                onChange={(val) => props.setTuesdayHours(parseInt(val))}
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
            checked={props.wednesdayChecked}
            toggleCheck={() =>
              props.setWednesdayChecked(!props.wednesdayChecked)
            }
            title="Wed"
          />
          {props.wednesdayChecked ? (
            <Select
              onChange={(val) => props.setWednesdayNormalPartial(val)}
              value={props.wednesdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.wednesdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.wednesdayHours}
                onChange={(val) => props.setWednesdayHours(parseInt(val))}
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
            checked={props.thursdayChecked}
            toggleCheck={() => props.setThursdayChecked(!props.thursdayChecked)}
            title="Thu"
          />
          {props.thursdayChecked ? (
            <Select
              onChange={(val) => props.setThursdayNormalPartial(val)}
              value={props.thursdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.thursdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.thursdayHours}
                onChange={(val) => props.setThursdayHours(parseInt(val))}
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
            checked={props.fridayChecked}
            toggleCheck={() => props.setFridayChecked(!props.fridayChecked)}
            title="Fri"
          />
          {props.fridayChecked ? (
            <Select
              onChange={(val) => props.setFridayNormalPartial(val)}
              value={props.fridayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.fridayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.fridayHours}
                onChange={(val) => props.setFridayHours(parseInt(val))}
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
            checked={props.saturdayChecked}
            toggleCheck={() => props.setSaturdayChecked(!props.saturdayChecked)}
            title="Sat"
          />
          {props.saturdayChecked ? (
            <Select
              onChange={(val) => props.setSaturdayNormalPartial(val)}
              value={props.saturdayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.saturdayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.saturdayHours}
                onChange={(val) => props.setSaturdayHours(parseInt(val))}
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
            checked={props.sundayChecked}
            toggleCheck={() => props.setSundayChecked(!props.sundayChecked)}
            title="Sun"
          />
          {props.sundayChecked ? (
            <Select
              onChange={(val) => props.setSundayNormalPartial(val)}
              value={props.sundayNormalPartial}
              data={["Normal Day", "Partial Day"]}
              required
            />
          ) : null}
          {props.sundayNormalPartial === "Partial Day" ? (
            <div className="Hours">
              <span>Hours</span>
              <Input
                value={props.sundayHours}
                onChange={(val) => props.setSundayHours(parseInt(val))}
                required
                noHeader
                type="number"
                placeHolder="Hours per day"
              />
            </div>
          ) : null}
        </div>
        <KeyValue key_="Full days per week">{props.fullDaysPerWeek}</KeyValue>
        <Button title="Submit" onClick={props.submitEmployee} />
      </>
    );
  }

  return (
    <div className="AddEmployee">
      <h1>{!props.edit ? "Add New Employee" : "Edit Employee"}</h1>
      <br />
      {addEmployeeContent}
    </div>
  );
};

export default withRouter(AddEmployee);
