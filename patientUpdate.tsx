import "./patientUpdate.css";
import axios, { AxiosError } from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Button, Header, Icon } from "semantic-ui-react";
import { ApiResponse, PatientDto } from "../../../constants/types";
import { routes } from "../../../routes/config";
import { useParams } from "react-router-dom";
import { restElement } from "@babel/types";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type UpdatePatientRequest = Omit<PatientDto, "user" | "id">;

type UpdatePatientResponse = ApiResponse<PatientDto>;

type FormValues = UpdatePatientRequest;

export const PatientUpdate = () => {
    let { id } = useParams<{id: string}>();
    const history = useHistory();
    const [result, setResult] = useState<any>();
    
    useEffect(()=> {
        axios
        .get(`${baseUrl}/api/patients/${id}`)
        .then((response) => {
            if (response.data.data){
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
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            sex: "",
        }),
        []
    );

    if(result !== undefined) {
        initialValues.firstName = result.firstName;
        initialValues.lastName = result.lastName;
        initialValues.dateOfBirth = result.dateOfBirth;
        initialValues.sex = result.sex;
        initialValues.height = result.height;
        initialValues.weight = result.weight;
    }

    const submitCreate = (values: UpdatePatientRequest) => {
        if (baseUrl === undefined) {
            return;
        }

        values.height = Number(values.height);
        values.weight = Number(values.weight);

        axios
            .put<UpdatePatientResponse>(`${baseUrl}/api/patients/${id}`, values)
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
            .catch(({ response, ...rest }: AxiosError<UpdatePatientResponse>) => {
                if (response?.data.hasErrors) {
                    response?.data.errors.forEach((err) => {
                        console.log(err.message);
                    });
                    alert(response?.data.errors[0].message);
                } else{
                    alert('there was an error updating the Patient');
                }
                console.log(rest.toJSON());
            });
    };

    const routeChange = () =>{
        let path = 'patientListing';
        history.push(routes.patientListing);
    }
    
    return (
        <div className="flex-box-centered-content-create-class">
            <div className="create-class-form">
            <Header> <Icon name = "bed"></Icon>Edit Patient</Header>
                <Formik initialValues={initialValues} onSubmit={submitCreate}>
                    <Form>
                        <div>
                            <div>
                                <div className="field-label">
                                    <label htmlFor="firstName">First Name {id}</label>
                                </div>
                                <Field className="field" id="firstName" name="firstName" />
                            </div>
                            <div>
                                <div className="field-label">
                                    <label htmlFor="lastName">Last Name</label>
                                </div>
                                <Field className="field" id="lastName" name="lastName" />
                            </div>
                            <div>
                                <div className="field-label">
                                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                                </div>
                                <Field className="field" id="dateOfBirth" name="dateOfBirth" />
                            </div>
                            <div>
                                <div className="field-label">
                                    <label htmlFor="height">Height in inches</label>
                                </div>
                                <Field className="field" id="height" name="height" />
                            </div>
                            <div>
                                <div className="field-label">
                                    <label htmlFor="weight">Weight in lbs</label>
                                </div>
                                <Field className="field" id="weight" name="weight" />
                            </div>
                            <br />
                            <div className="button-container-create-class">
                                <Button className="create-button" primary size="tiny" type="submit">Update</Button>
                                <Button className="cancel-button"  size="tiny" onClick = {routeChange}>Cancel</Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};