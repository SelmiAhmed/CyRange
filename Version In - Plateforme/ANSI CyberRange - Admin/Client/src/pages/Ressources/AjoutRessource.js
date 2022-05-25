import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button,ButtonGroup, Breadcrumb } from '@themesberg/react-bootstrap';
import { ResInfoForm } from "../../components/Forms";
import { FileUploader } from "../../components/Forms";

export default () => {
    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI AdminSpace</Breadcrumb.Item>
            <Breadcrumb.Item active>Ajouter Ressource</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Ajouter Ressource</h4>
          <p className="mb-0">
            Dozens of reusable components built to provide buttons, alerts, popovers, and more.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={faEye} className="me-2" /> Voir Liste
        </Button>
         </div>

        </div>
  <div>
            <ResInfoForm />
            <FileUploader />

        </div>
      </>
    );
  };
  