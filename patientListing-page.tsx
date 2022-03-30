import "./patientListing-page.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ApiResponse, PatientDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const PatientListing = () => {
    const history = useHistory();
    const handleRoute = () =>{
        history.push('/patientDelete');
    }
    const [patients, setPatientListing] = useState<ApiResponse<PatientDto[]>>();

    useEffect(() => {
        axios
            .get<ApiResponse<PatientDto[]>>(`${baseUrl}/api/patients`)
            .then((response) => {
                if (response.data.hasErrors) { 
                    response.data.errors.forEach((err) => { 
                        console.error(`${err.property}: ${err.message}`);
                    });
                }
                setPatientListing(response.data);
            });
    }, []);

    const patientsToShow = patients?.data;
    return (
        <>
            <div className="flex-box-centered-content-Listing">
            <Header> <Icon name = "bed"></Icon>Patients</Header>
                {patientsToShow &&
                    patientsToShow.map((x: PatientDto) => {
                        return(
                            <div className="flex-row-fill-Listing">
                                <Segment className="Listing-segments">
                                    <div>{`Name: ${x.firstName} ${x.lastName}`}</div>
                                    <div>{`DateOfBirth: ${x.dateOfBirth}`}</div>
                                    <div>{`Sex: ${x.sex}`}</div>
                                    <div>{`Height: ${x.height} ins`}</div>
                                    <div>{`Weight: ${x.weight} lbs`}</div>
                                    <br />
                                    <div>
                                        <Button className="edit-button" primary size="tiny" onClick={() => {
                                            history.push(routes.patientUpdate.replace(`:id`,`${x.id}`))
                                        }}>EDIT</Button>
                                        <Button className="delete-button" size="tiny" onClick={() => {
                                            history.push(routes.patientDelete.replace(`:id`,`${x.id}`))
                                        }}>DELETE</Button>
                                    </div>
                                </Segment>
                            </div>
                        );
                    })}
                    <br />
                    <Button primary className = "button-container" onClick = {() => {history.push(routes.addPatient)}}>
                        <Icon className = "button-add" name="plus"></Icon>
                    </Button>
            </div>
        </>
    );
};