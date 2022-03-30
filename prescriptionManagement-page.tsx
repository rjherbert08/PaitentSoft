import React, { useState } from "react";
import { Header, Input } from "semantic-ui-react";

//This is the bare minimum needed to make a page.
export const PrescriptionManagementPage = () => {
  const name = "test";
  return (
    <div className="prescriptionManagementPage">
      <h1>Prescription Management Page</h1>
      <CustomHeader description={name} />
    </div>
  );
};

type CustomHeaderProps = {
  description: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = (props) => {
  const [state, setState] = useState("Default");
  return(
    <div>
      <h1 className="custom-header-h1">{props.description} Header</h1>
      <Header>{state}</Header>
      <Input
        label="state"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  )
};
