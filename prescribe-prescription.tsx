import "./prescribe-prescription.css";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ApiResponse, PrescriptionDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { useParams } from "react-router-dom"

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const PrescribePrescriptionPage = () => {
    const history = useHistory();
    let { id }: any = useParams();
    const [prescriptions, setPrescriptions] = useState<ApiResponse<PrescriptionDto[]>>();

    const [result, setResult] = useState<any>();

    const [prescriptionIdReceived, setPrescriptionIdReceived] = useState<any>();

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
        prescriptionId: prescriptionIdReceived
    }

    const onClickHandler = () => {
        values.prescriptionId = Number(values.prescriptionId);
        values.patientId = Number(values.patientId);

        axios
            .post(`${baseUrl}/api/patientPrescriptions/create/${id}/${values.prescriptionId}`, values)
            .then((response) => {
                if (response.data.hasErrors) {
                    response.data.errors.forEach((err) => {
                        console.error(`${err.property}: ${err.message}`);
                    });
                    alert("There was an Error");
                    return;
                }
                console.log("Successfully Created Prescription");
                alert("Successfully Created");
                history.push(routes.patientsPrescribeListing);
            })
            .catch(({ response, ...rest }: AxiosError<any>) => {
                if (response?.data.hasErrors) {
                    response?.data.errors.forEach((err) => {
                        console.log(err.message);
                    });
                    alert(response?.data.errors[0].message);
                } else {
                    alert(`There was an error creating the prescription`);
                }
                console.log(rest.toJSON());
            });
    };

    useEffect(() => {
        axios
            .get<ApiResponse<PrescriptionDto[]>>(`${baseUrl}/api/prescriptions`)
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
                <Button primary onClick={() => { history.push(routes.patientsPrescribeListing) }}>Back</Button>
                <Header><Icon name="pills"></Icon>Choose a Pharmaceutical to Prescribe</Header>
                {prescriptionsToShow &&
                    prescriptionsToShow.map((x: PrescriptionDto) => {
                        return (
                            <div className="flex-row-fill-listing">
                                <Segment className="listing-segments">
                                    <div>{`Name: ${x.name}`}</div>
                                    <div>{`Code: ${x.code}`}</div>
                                    <div>{`Description: ${x.description}`}</div>
                                    <br />
                                    <Button primary size="tiny" onClick={() => { values.prescriptionId = x.id; onClickHandler(); }}>Prescribe</Button>
                                </Segment>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};