import "./prescription-listing.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { ApiResponse, PrescriptionDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const PrescriptionListing = () => {
  const history = useHistory();
  const [prescriptions, setPrescriptions] = useState<ApiResponse<PrescriptionDto[]>>();

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
        <Header><Icon name = "pills"></Icon>Pharmaceuticals</Header>
        {prescriptionsToShow &&
          prescriptionsToShow.map((x: PrescriptionDto) => {
            return (
              <div className="flex-row-fill-listing">
                <Segment className="listing-segments">
                  <div>{`Name: ${x.name}`}</div>
                  <div>{`Code: ${x.code}`}</div>
                  <div>{`Description: ${x.description}`}</div>
                  <br/>
                  <Button primary size="tiny" onClick={() => {
                    history.push(routes.prescriptionsUpdate.replace(':id', `${x.id}`))
                  }}>Edit</Button>
                  <Button size="tiny" onClick={() => {
                    history.push(routes.prescriptionsDelete.replace(':id', `${x.id}`))
                  }}>Delete</Button>
                </Segment>
              </div>
            );
          })}
          <br />
          <Button primary className = "button-container" onClick = {() => {history.push(routes.prescriptionsCreate)}}>
            <Icon className = "button-add" name="plus"></Icon>
          </Button>
      </div>
    </>
  );
};
