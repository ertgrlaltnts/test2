import React from "react";
import UsePanel from "./UserPanel";
import {Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Dashboard = () => {
  document.title = "Ana Sayfa | ER2 Studio";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="ER2 Studio" breadcrumbItem="Ana Sayfa" />
          <UsePanel />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
