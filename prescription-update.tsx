import "./prescription-update.css";
import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Header, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { ApiResponse, PrescriptionDto } from "../../../constants/types";
import { routes } from "../../../routes/config";
import { useParams } from "react-router-dom"

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type UpdatePrescriptionRequest = Omit<PrescriptionDto, "id">;

type UpdatePrescriptionResponse = ApiResponse<PrescriptionDto>;

type FormValues = UpdatePrescriptionRequest;

export const PrescriptionUpdatePage = () => {
    let { id } = useParams<{id: string}>();
    const history = useHistory();
    
    const [result, setResult] = useState<any>();
    useEffect(() => {
      axios
      .get(`${baseUrl}/api/prescriptions/${id}`)
      .then((response) => {
        if(response.data.data) {
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

    var initialValues = useMemo<FormValues>(
      () => ({
          name: "",
          code: "",
          description: "",
      }),
      []
    );

    if(result !== undefined) {
      initialValues.name = result.name;
      initialValues.code = result.code;
      initialValues.description = result.description;
    }

    const submitCreate = (values: UpdatePrescriptionRequest) => {
        if (baseUrl === undefined) {
            return;
        }
        axios
            .put<UpdatePrescriptionResponse>(`${baseUrl}/api/prescriptions/${id}`, values)
            .then((response) => {
                if(response.data.hasErrors) {
                    response.data.errors.forEach((err) => {
                        console.error(`${err.property}: ${err.message}`);
                    });
                    alert("There was an Error");
                    return;
                }
                console.log("Successfully Updated Prescription");
                alert("Successfully Updated");
                history.push(routes.prescriptions);
            })
            .catch(({ response, ...rest }: AxiosError<UpdatePrescriptionResponse>) => {
                if(response?.data.hasErrors) {
                    response?.data.errors.forEach((err) => {
                        console.log(err.message);
                    });
                    alert(response?.data.errors[0].message);
                } else {
                    alert(`There was an error updating the prescription`);
                }
                console.log(rest.toJSON());
            });
    };

    return (
        <div className="flex-box-centered-content-create-class">
          <div className="create-class-form">
            <Header><Icon name = "pills"></Icon>Edit </Header>
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
                      Update
                    </Button>
                    <Button size="tiny" onClick = {() => {history.push(routes.prescriptions)}}>
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