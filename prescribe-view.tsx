import "./prescribe-view.css";
import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Icon, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { ApiResponse, PatientDetailDto, PatientPrescriptionDto, PrescriptionDto } from "../../../constants/types";
import { routes } from "../../../routes/config";
import { useParams } from "react-router-dom"
import { Header } from "semantic-ui-react";
import { resourceLimits } from "worker_threads";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const PrescribeViewPage = () => {
    let { id }: any = useParams();
    const history = useHistory();
    const [prescriptions, setPrescriptions] = useState<any>();

    const [result, setResult] = useState<any>();

    useEffect(() => {
        axios
            .get<ApiResponse<PrescriptionDto[]>>(`${baseUrl}/api/patients/${id}/prescriptions`)
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

    const onDeleteHandler = () => {
        axios
            .get(`${baseUrl}/api/patientPrescriptions/${id}`)
            .then((response) => {
                if (response.data.data) {
                    axios
                        .delete(`${baseUrl}/api/patientPrescriptions/${response.data.data.id}`)
                        .then((response) => {
                            console.log(response.status);
                            history.push(routes.patientsPrescribeListing);
                        })
                        .catch((e) => console.log('something went wrong!', e));
                }
            })
    };

    var values = {
        firstName: "",
        lastName: "",
        sex: "",
        height: "",
        weight: "",
        dateOfBirth: ""
    };

    if (result !== undefined) {
        values = result;
    }

    const prescriptionsToShow = prescriptions?.data;
    return (
        <div>
            <br />
            <Button primary onClick={() => { history.push(routes.patientsPrescribeListing) }}>Back</Button>
            <div className="flex-box-centered-content-listing">
                <Header className="view-list-margin"><Icon name="bed"></Icon>Patient</Header>
                <div className="flex-row-fill-listing">
                    <Segment className="listing-segments">
                        <div>{`FirstName: ${values.firstName}`}</div>
                        <div>{`LastName: ${values.lastName}`}</div>
                        <div>{`DateOfBirth: ${values.dateOfBirth}`}</div>
                        <div>{`Sex: ${values.sex}`}</div>
                        <div>{`Height: ${values.height}`}</div>
                        <div>{`Weight: ${values.weight}`}</div>
                    </Segment>
                </div>
            </div>
            <Header><Icon name="pills"></Icon>Prescriptions</Header>
            {prescriptionsToShow &&
                prescriptionsToShow.map((x: PrescriptionDto) => {
                    return (
                        <div className="flex-row-fill-listing">
                            <Segment className="listing-segments">
                                <div>{`Name: ${x.name}`}</div>
                                <div>{`Code: ${x.code}`}</div>
                                <div>{`Description: ${x.description}`}</div>
                                <br />
                                <Button primary onClick={onDeleteHandler}>Delete</Button>
                            </Segment>
                        </div>
                    );
                })}
        </div>
    );
};