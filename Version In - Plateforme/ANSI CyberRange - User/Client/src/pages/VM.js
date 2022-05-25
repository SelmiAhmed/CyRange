import React from "react";
import { Breadcrumb, Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default () => {
    return (
        <>
       <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    <div className="mb-4 mb-lg-0">
        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI</Breadcrumb.Item>
            <Breadcrumb.Item active>Mes Cours</Breadcrumb.Item>
        </Breadcrumb>
        <h4>VM</h4>
    </div>
</div>
<Card border="light" className="table-wrapper table-responsive shadow-sm">
    <Card.Body>
    </Card.Body>
</Card>

        </>
    );
};
