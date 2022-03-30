import "./prescription-delete.css";
import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Icon, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { ApiResponse, PrescriptionDto } from "../../../constants/types";
import { routes } from "../../../routes/config";
import { useParams } from "react-router-dom"
import { Header } from "semantic-ui-react";
import { resourceLimits } from "worker_threads";

const baseUrl = process.env.REACT_APP_API_BASE_URL;



export const PrescriptionDeletePage = () => {
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

var values = {
    name: "",
    code: "",
    description: ""
};

if(result !== undefined) {
    values = result;
}

    const onClickHandler = () => {
        if (baseUrl == undefined) {
            return;
        }
        axios
        .delete(`${baseUrl}/api/prescriptions/${id}`)
        .then((response) => {
            console.log(response.status);
            history.push(routes.prescriptions);
            })
        .catch((e) => console.log('something went wrong!', e));
    };

    return (
        <div>
            <div className="flex-box-centered-content-listing">
            <Header><Icon name = "pills"></Icon>Delete This item?</Header>
            <div className="flex-row-fill-listing">
                <Segment className="listing-segments">
                    <div>{`Name: ${values.name}`}</div>
                    <div>{`Code: ${values.code}`}</div>
                    <div>{`Description: ${values.description}`}</div>
                    <br/>
                    <Button primary size="tiny" onClick = {onClickHandler}>Delete</Button>
                    <Button size="tiny" onClick = {() => {
                    history.push(routes.prescriptions)
                    }}>Cancel</Button>
                </Segment>
                </div>
            </div>
        </div>
    );
};