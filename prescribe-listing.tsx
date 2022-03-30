import "./prescribe-listing.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ApiResponse, PatientDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const PrescribeListingPage = () => {
  const history = useHistory();
  const [prescriptions, setPrescriptions] = useState<ApiResponse<PatientDto[]>>();

  useEffect(() => {
    axios
      .get<ApiResponse<PatientDto[]>>(`${baseUrl}/api/patients`)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
        }
        setPrescriptions(response.data);
      });
    //This empty array is important to ensure this only runs once on page load
    //Otherwise this will cause an infinite loop since we are setting State
  }, []);

  const prescriptionsToShow = prescriptions?.data;
  return (
    <>
      <div className="flex-box-centered-content-listing">
        <Header><Icon name = "bed"></Icon>Patients</Header>
        {prescriptionsToShow &&
          prescriptionsToShow.map((x: PatientDto) => {
            return (
              <div className="flex-row-fill-listing">
                <Segment className="listing-segments">
                    <div>{`FirstName: ${x.firstName}`}</div>
                    <div>{`LastName: ${x.lastName}`}</div>
                    <div>{`DateOfBirth: ${x.dateOfBirth}`}</div>
                    <div>{`Sex: ${x.sex}`}</div>
                    <div>{`Height: ${x.height}`}</div>
                    <div>{`Weight: ${x.weight}`}</div>
                    <br/>
                  <Button primary size="tiny" onClick = {() => {history.push(routes.patientsPrescribe.replace(`:id`, `${x.id}`))}}>Prescribe</Button>
                  <Button size="tiny" onClick = {() => {history.push(routes.patientsPrescribeView.replace(`:id`, `${x.id}`))}}>View</Button>
                </Segment>
              </div>
            );
          })}
      </div>
    </>
  );
};
