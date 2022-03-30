import "./patientDelete.css";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const PatientDelete = () => {
    let { id }: any = useParams();
    const history = useHistory();

    const [result, setResult] = useState<any>();
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
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        sex: "",
        height: "",
        weight: "",
    };

    if (result !== undefined) {
        values = result;
    }

    const onClickHandler = () => {
        if (baseUrl === undefined) {
            return;
        }
        axios
            .delete(`${baseUrl}/api/patients/${id}`)
            .then((response) => {
                console.log(response.status);
                history.push(routes.patientListing);
            })
            .catch((e) => console.log('something went wrong!', e));
    };

    return (
        <div>
            <div className="flex-box-centered-content-listing">
                <Header><Icon name="bed"></Icon>Delete This Patient?</Header>
                <div className="flex-row-fill-listing">
                    <Segment className="listing-segments">
                        <div>{`First Name: ${values.firstName}`}</div>
                        <div>{`Last Name: ${values.lastName}`}</div>
                        <div>{`Date of Birth:  ${values.dateOfBirth}`}</div>
                        <div>{`Sex:  ${values.sex}`}</div>
                        <div>{`Height: ${values.height}`}ins</div>
                        <div>{`Weight:  ${values.weight}`}lbs</div>
                        <br />
                        <Button className="delete-button" primary size="tiny" onClick={onClickHandler}>CONFIRM</Button>
                        <Button className="cancel-button" size="tiny" onClick={() =>
                            history.push(routes.patientListing)
                        }>Cancel</Button>
                    </Segment>
                </div>
            </div>
        </div>
    );
};