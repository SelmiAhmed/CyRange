import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";


export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={Profile3}
              />
            </Col>
          </Row>
        </Col>
        <Col>
        <div class="shadow mb-4 mb-xl-0 card border-0">
          <div class="card-body"><h5 class="mb-4">Alerts &amp; Notifications</h5><div class="list-group-flush list-group">
            <div class="d-flex align-items-center justify-content-between px-0 border-bottom list-group-item"><div><p class="h6 mb-1 card-text">Platforme News</p><p class="small pe-4">Get Rocket news, announcements, and product updates</p></div><div><div class="form-switch">
              <input type="checkbox" id="user-notification-1" class="form-check-input"/></div></div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-0 border-bottom list-group-item"><div><p class="h6 mb-1 card-text">Account Activity</p>
            <p class="small pe-4">Get important notifications about you or activity you've missed</p></div><div><div class="form-switch">
              <input type="checkbox" id="user-notification-2" class="form-check-input"/></div></div></div>
              <div class="d-flex align-items-center justify-content-between px-0 border-bottom list-group-item"><div><p class="h6 mb-1 card-text">New Courses</p>
            <p class="small pe-4">Get important notifications about you or activity you've missed</p></div><div><div class="form-switch">
              <input type="checkbox" id="user-notification-2" class="form-check-input"/></div></div></div>

              <div class="d-flex align-items-center justify-content-between px-0  list-group-item"><div><p class="h6 mb-1 card-text">Security</p>
              <p class="small pe-4">Active 2FA</p></div><div><div class="form-switch"><input type="checkbox" id="user-notification-3" class="form-check-input" /></div></div></div></div></div></div>
        </Col>

      </Row>
    </>
  );
};
