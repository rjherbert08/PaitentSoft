import "./class-listing.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { ApiResponse, ClassDto } from "../../../constants/types";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const ClassListing = () => {
  const [classes, setClasses] = useState<ApiResponse<ClassDto[]>>();

  useEffect(() => {
    axios
      .get<ApiResponse<ClassDto[]>>(`${baseUrl}/api/classes`)
      .then((response) => {
        if (response.data.hasErrors) {
          response.data.errors.forEach((err) => {
            console.error(`${err.property}: ${err.message}`);
          });
        }
        setClasses(response.data);
      });
    //This empty array is important to ensure this only runs once on page load
    //Otherwise this will cause an infinite loop since we are setting State
  }, []);

  const classesToShow = classes?.data;
  return (
    <div className="flex-box-centered-content-class-listing">
      {classesToShow &&
        classesToShow.map((x: ClassDto) => {
          return (
            <div className="flex-row-fill-class-listing">
              <Segment className="class-listing-segments">
                <div>{`Subject: ${x.subject}`}</div>
                <div>{`Capacity: ${x.capacity}`}</div>
                <div>{`User First Name: ${x.user.firstName}`}</div>
                <div>{`User Last Name: ${x.user.lastName}`}</div>
              </Segment>
            </div>
          );
        })}
    </div>
  );
};
