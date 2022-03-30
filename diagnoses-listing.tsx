import "./diagnoses-listing.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ApiResponse, DiagnosisDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const DiagnosisListingPage = () => {
  const history = useHistory();
  const [diagnoses, setDiagnoses] = useState<ApiResponse<DiagnosisDto[]>>();

  useEffect(() => {
    axios
      .get<ApiResponse<DiagnosisDto[]>>(`${baseUrl}/api/diagnoses`)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
        }
        setDiagnoses(response.data);
      });
    //This empty array is important to ensure this only runs once on page load
    //Otherwise this will cause an infinite loop since we are setting State
  }, []);

  const prescriptionsToShow = diagnoses?.data;
  return (
    <>
      <div className="flex-box-centered-content-listing">
        <Header><Icon name = "stethoscope"></Icon>Diagnoses</Header>
        {prescriptionsToShow &&
          prescriptionsToShow.map((x: DiagnosisDto) => {
            return (
              <div className="flex-row-fill-listing">
                <Segment className="listing-segments">
                  <div>{`Name: ${x.name}`}</div>
                  <div>{`Code: ${x.code}`}</div>
                  <div>{`Description: ${x.description}`}</div>
                  <br/>
                  <Button primary size="tiny" onClick={() => {
                    history.push(routes.diagnosesUpdate.replace(':id', `${x.id}`))
                  }}>Edit</Button>
                  <Button size="tiny" onClick={() => {
                    history.push(routes.diagnosesDelete.replace(':id', `${x.id}`))
                  }}>Delete</Button>
                </Segment>
              </div>
            );
          })}
          <Button primary className = "button-container" onClick = {() => {history.push(routes.diagnosesCreate)}}>
            <Icon className = "button-add" name="plus"></Icon>
          </Button>
      </div>
    </>
  );
};
