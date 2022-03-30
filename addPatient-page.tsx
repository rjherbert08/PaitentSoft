import "./addPatient-page.css";
import React, { useMemo } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Header, Icon, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { ApiResponse, PatientDto,} from "../../../constants/types";
import axios, { AxiosError } from "axios";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type PatientToCreateRequest = Omit<PatientDto, "user" | "id">;

type PatientToCreateResponse = ApiResponse<PatientDto>;

type FormValues = PatientToCreateRequest;

export const AddPatientPage = () => {
  const history = useHistory();
  const initialValues = useMemo<FormValues>(
    () => ({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      sex: "",
      userId: 0,
      user: "",
    }),
    []
  );

  const submitCreate = (values: PatientToCreateRequest) => {
    if (baseUrl === undefined) {
      return;
    }
    values.height = Number(values.height)
    values.weight = Number(values.weight)
    console.log("Values: ", values);

    axios
      .post<PatientToCreateResponse>(`${baseUrl}/api/patients/create`, values)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: S{err.message}`);
          });
          alert("There was an Error");
          return;
        }
        history.push(routes.patientListing);
      })
      .catch(({ response, ...rest }: AxiosError<PatientToCreateResponse>) => {
        if (response?.data.hasErrors) {
          response?.data.errors.forEach((err) => {
            console.log(err.message);
          });
          alert(response?.data.errors[0].message);
        } else{
          alert('there was an error adding the Patient');
        }
        console.log(rest.toJSON());
      });
  };

  return (
    <div className="flex-box-centered-content-create-class">
      <div className="create-class-form">
      <Header><Icon name = "bed"></Icon>Create Patient</Header>
        <Formik initialValues={initialValues} onSubmit={submitCreate}>
          <Form>
            <div>
              <div>
                <div className="field-label">
                  <label htmlFor="firstName">First Name</label>
                </div>
                <Field className="field" id="firstName" name="firstName" placeHolder="John" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <Field className="field" id="lastName" name="lastName" placeHolder="Smith" />
                  {({ field }: any) => (
                    <Input label="lastname" placeholder="Smith" />
                  )}
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="dateOfBirth">Date Of Birth</label>
                </div>
                <Field className="field" id="dateOfBirth" name="dateOfBirth" placeHolder="YYYY-MM-DD" />
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="sex">Sex</label>
                </div>
                <Field className="field" id="sex" name="sex" placeHolder="Male/Female"/>
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="height">Height in inches</label>
                </div>
                <Field className="field" id="height" name="height" placeHolder="72"/>
              </div>
              <div>
                <div className="field-label">
                  <label htmlFor="weight">Weight in lbs</label>
                </div>
                <Field className="field" id="weight" name="weight" placeHolder="200"/>
              </div>
              <div className="button-container-create-class">
                <Button primary size="tiny" type="submit">
                  Create
                </Button>
                <Button size="tiny" onClick = {() => {history.push(routes.patientListing)}}>
                  Cancel
                </Button>

              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};




