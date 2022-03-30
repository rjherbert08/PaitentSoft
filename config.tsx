import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage } from "../pages/not-found";
import { useUser } from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { ClassListing } from "../pages/classes-page/listing-page/class-listing";
import { ClassCreatePage } from "../pages/classes-page/create-page/class-create";
import { AddPatientPage } from "../pages/patients-page/addPatient-page/addPatient-page";
import { PrescriptionManagementPage } from "../pages/prescriptionManagement-page/prescriptionManagement-page";
import { NursesPage } from "../pages/nurses-page/nurses-page";
import { PatientListing } from "../pages/patients-page/patientListing/patientListing-page";
import { PatientDelete } from "../pages/patients-page/patientDelete/patientDelete";
import { PrescriptionListing } from "../pages/prescriptions-page/listing-page/prescription-listing";
import { PrescriptionCreatePage } from "../pages/prescriptions-page/create-page/prescription-create";
import { PatientUpdate } from "../pages/patients-page/patientUpdate-page/patientUpdate";
import { PrescriptionUpdatePage } from "../pages/prescriptions-page/update-page/prescription-update";
import { PrescriptionDeletePage } from "../pages/prescriptions-page/delete-page/prescription-delete";
import { DiagnosisListingPage } from "../pages/diagnoses-page/listing-page/diagnoses-listing";
import { DiagnosisCreatePage } from "../pages/diagnoses-page/create-page/diagnoses-create";
import { DiagnosisUpdatePage } from "../pages/diagnoses-page/update-page/diagnoses-update";
import { DiagnosisDeletePage } from "../pages/diagnoses-page/delete-page/diagnoses-delete";
import { PrescribeListingPage } from "../pages/prescribe-page/listing-page/prescribe-listing";
import { PrescribeViewPage } from "../pages/prescribe-page/view-page/prescribe-view";
import { PrescribePrescriptionPage } from "../pages/prescribe-page/prescribe-page/prescribe-prescription";
import { DiagnoseListingPage } from "../pages/diagnose-page/listing-page/diagnose-listing";
import { DiagnoseViewPage } from "../pages/diagnose-page/view-page/diagnose-view";
import { DiagnoseDiagnosisPage } from "../pages/diagnose-page/diagnose-page/diagnose-diagnosis";

//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  user: `/user`,
  nurses: '/nurses',
  addPatient: '/addPatient',
  patientListing: '/patientListing',
  patientDelete: '/patientDelete/:id',
  patientUpdate: `/patient/update/:id`,
  patientsPrescribeListing: `/prescribe`,
  patientsPrescribeView: `/prescribe/view/:id`,
  patientsPrescribe: `/prescribe/:id`,
  patientsDiagnoseListing: `/diagnose`,
  patientsDiagnoseView: `/diagnose/view/:id`,
  patientsDiagnose: `/diagnose/:id`,
  prescriptionManagement: '/prescriptionManagement',
  classes: `/classes`,
  classesCreate: `/classes/create`,
  prescriptions: `/prescriptions`,
  prescriptionsCreate: `/prescriptions/create`,
  prescriptionsUpdate: `/prescriptions/update/:id`,
  prescriptionsDelete: `/prescriptions/delete/:id`,
  diagnoses: `/diagnoses`,
  diagnosesCreate: `/diagnoses/create`,
  diagnosesUpdate: `/diagnoses/update/:id`,
  diagnosesDelete: `/diagnoses/delete/:id`,
};

//This is where you will tell React Router what to render when the path matches the route specified.
export const Routes = () => {
  //Calling the useUser() from the use-auth.tsx in order to get user information
  const user = useUser();
  return (
    <>
      {/* The page wrapper is what shows the NavBar at the top, it is around all pages inside of here. */}
      <PageWrapper user={user}>
        <Switch>
          {/* When path === / render LandingPage */}
          <Route path={routes.home} exact>
            <LandingPage />
          </Route>
          {/* When path === /iser render UserPage */}
          <Route path={routes.user} exact>
            <UserPage />
          </Route>
          <Route path={routes.patientsPrescribeListing} exact>
            <PrescribeListingPage />
          </Route>
          <Route path={routes.patientsPrescribeView} exact>
            <PrescribeViewPage />
          </Route>
          <Route path={routes.patientsPrescribe} exact>
            <PrescribePrescriptionPage />
          </Route>
          <Route path={routes.patientsDiagnoseListing} exact>
            <DiagnoseListingPage />
          </Route>
          <Route path={routes.patientsDiagnoseView} exact>
            <DiagnoseViewPage />
          </Route>
          <Route path={routes.patientsDiagnose} exact>
            <DiagnoseDiagnosisPage />
          </Route>
          <Route path={routes.nurses} exact>
            <NursesPage />
          </Route>
          <Route path={routes.addPatient} exact>
            <AddPatientPage />
          </Route>
          <Route path={routes.patientListing} exact>
            <PatientListing />
          </Route>
          <Route path={routes.patientDelete} exact>
            <PatientDelete />
          </Route>
          <Route path={routes.patientUpdate} exact>
            <PatientUpdate />
          </Route>
          <Route path={routes.prescriptionManagement} exact>
            <PrescriptionManagementPage />
          </Route>
          <Route path={routes.classes} exact>
            <ClassListing />
          </Route>
          <Route path={routes.classesCreate} exact>
            <ClassCreatePage />
          </Route>
          <Route path={routes.prescriptions} exact>
            <PrescriptionListing />
          </Route>
          <Route path={routes.prescriptionsCreate} exact>
            <PrescriptionCreatePage />
          </Route>
          <Route path = {routes.prescriptionsUpdate} exact>
            <PrescriptionUpdatePage />
          </Route>
          <Route path = {routes.prescriptionsDelete} exact>
            <PrescriptionDeletePage />
          </Route>
          <Route path = {routes.diagnoses} exact>
            <DiagnosisListingPage />
          </Route>
          <Route path = {routes.diagnosesCreate} exact>
            <DiagnosisCreatePage />
          </Route>
          <Route path = {routes.diagnosesUpdate} exact>
            <DiagnosisUpdatePage />
          </Route>
          <Route path = {routes.diagnosesDelete} exact>
            <DiagnosisDeletePage />
          </Route>
          {/* Going to route "localhost:5001/" will go to homepage */}
          <Route path={routes.root} exact>
            <Redirect to={routes.home} />
          </Route>
          {/* This should always come last.  
            If the path has no match, show page not found */}
          <Route path="*" exact>
            <NotFoundPage />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
};
