import "./diagnose-diagnosis.css";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ApiResponse, DiagnosisDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const DiagnoseDiagnosisPage = () => {
  const history = useHistory();
  let { id }: any = useParams();
  const [diagnoses, setDiagnoses] = useState<ApiResponse<DiagnosisDto[]>>();

  const [result, setResult] = useState<any>();

  const [diagnosisIdReceived, setDiagnosisIdReceived] = useState<any>();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/patients/${id}`)
      .then((response) => {
        if (response.data.data) {
          setResult(response.data.data);
        }
      })
      .catch(({ response }: AxiosError<any>) => {
        if (response?.data.hasErrors) {
          alert(JSON.stringify(response.data.errors));
        } else {
          alert("Something went wrong.");
        }
      });
  }, []);

  var values = {
    patientId: id,
    diagnosisId: diagnosisIdReceived,
  };

  const onClickHandler = () => {
    values.diagnosisId = Number(values.diagnosisId);
    values.patientId = Number(values.patientId);

    axios
      .post(
        `${baseUrl}/api/patientDiagnoses/create/${id}/${values.diagnosisId}`,
        values
      )
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
          alert("There was an Error");
          return;
        }
        console.log("Successfully Created Diagnosis");
        alert("Successfully Created");
        history.push(routes.patientsDiagnoseListing);
      })
      .catch(({ response, ...rest }: AxiosError<any>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          alert(response?.data.errors[0].message);
        } else {
          alert(`There was an error creating the diagnosis`);
        }
        console.log(rest.toJSON());
      });
  };

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

  const diagnosesToShow = diagnoses?.data;
  return (
    <>
      <div className="flex-box-centered-content-listing">
        <Button
          primary
          onClick={() => {
            history.push(routes.patientsDiagnoseListing);
          }}
        >
          Back
        </Button>
        <Header>
          <Icon name="stethoscope"></Icon>Choose a Condition to Diagnose
        </Header>
        {diagnosesToShow &&
          diagnosesToShow.map((x: DiagnosisDto) => {
            return (
              <div className="flex-row-fill-listing">
                <Segment className="listing-segments">
                  <div>{`Name: ${x.name}`}</div>
                  <div>{`Code: ${x.code}`}</div>
                  <div>{`Description: ${x.description}`}</div>
                  <br />
                  <Button
                    primary
                    size="tiny"
                    onClick={() => {
                      values.diagnosisId = x.id;
                      onClickHandler();
                    }}
                  >
                    Diagnose
                  </Button>
                </Segment>
              </div>
            );
          })}
      </div>
    </>
  );
};
