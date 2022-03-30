import "./diagnoses-create.css";
import axios, { AxiosError } from "axios";
import React, { useMemo } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Header, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { ApiResponse, DiagnosisDto } from "../../../constants/types";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type CreateDiagnosisRequest = Omit<DiagnosisDto, "id">;

type CreateDiagnosisResponse = ApiResponse<DiagnosisDto>;

type FormValues = CreateDiagnosisRequest;

export const DiagnosisCreatePage = () => {
    const history = useHistory();
    const initialValues = useMemo<FormValues>(
        () => ({
            name: "",
            code: "",
            description: "",
        }),
        []
    );

    const submitCreate = (values: CreateDiagnosisRequest) => {
        if (baseUrl == undefined) {
            return;
        }

        axios
            .post<CreateDiagnosisResponse>(`${baseUrl}/api/diagnoses`, values)
            .then((response) => {
                if(response.data.hasErrors) {
                    response.data.errors.forEach((err) => {
                        console.error(`${err.property}: ${err.message}`);
                    });
                    alert("There was an Error");
                    return;
                }
                console.log("Successfully Created Diagnosis");
                alert("Successfully Created");
                history.push(routes.diagnoses);
            })
            .catch(({ response, ...rest }: AxiosError<CreateDiagnosisResponse>) => {
                if(response?.data.hasErrors) {
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

    return (
        <div className="flex-box-centered-content-create-class">
          <div className="create-class-form">
          <Header><Icon name = "stethoscope"></Icon>Create Item</Header>
            <Formik initialValues={initialValues} onSubmit={submitCreate}>
              <Form>
                <div>
                  <div>
                    <div className="field-label">
                      <label htmlFor="name">Name</label>
                    </div>
                    <Field className="field" id="name" name="name" />
                  </div>
                  <div>
                    <div className="field-label">
                      <label htmlFor="code">Code</label>
                    </div>
                    <Field className="field" id="code" name="code" />
                  </div>
                  <div>
                    <div className="field-label">
                      <label htmlFor="description">Description</label>
                    </div>
                    <Field className="field" id="description" name="description" />
                  </div>
                  <div className="button-container-create-class">
                    <Button primary size="tiny" type="submit">
                      Create
                    </Button>
                    <Button size="tiny" onClick = {() => {history.push(routes.diagnoses)}}>
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