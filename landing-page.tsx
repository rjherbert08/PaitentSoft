import "./landing-page.css";
import React from "react";

//This is the bare minimum needed to make a page.
export const LandingPage = () => {
  return (
    <div className="home-page">
      <div className="titleHeader"></div>
        <div className="body-page">
          <div>
          <img src={require('../../assets/doctor2.jpg')
          .default} alt="Doctor image" height={500} width={700}/>
          </div>
          <div>
            <div className="body-page-Title">
              <div className="headerOne"><b>Medic Manager</b></div>
              <br />
              <div className="headerTwo"><b>Patient Management Made Easy</b></div>
            </div>
            <div className="body-page-text">Bringing Patient Management to the Next Level.
            Delivers high-quality service that helps you 
            organizes all your patient data in one place,
            so you can deliver exceptional patient experiences while always keeping the 
            patients first.
            </div>
          </div>
        </div>
      <div className="titleFooter"></div>
    </div>
  );
};