
import React ,{useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card,Form,Modal,Button, Image, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import BadgeB from "../../assets/img/technologies/beginner.jpeg";
import BadgeE from "../../assets/img/technologies/expert.jpeg";
import  axios  from 'axios';

export default () => {
 const componentDidMount = () => {
  getUser(data);
  getInsN(id);
  getScore(id);
 }


const data = localStorage.getItem('email');
const [UserList, setUserList] = useState([]);
const getUser = (mail) => {
  axios.get(`http://localhost:8080/api/users/user/${mail}`).then((response) => {
    setUserList(response.data);
  });

};


const [OneIns, setInsList] = useState([]);
const id = UserList. map((user, key) => (user.IdUser));
const getInsN = (id) => {
  axios.get(`http://localhost:8080/api/inscription/ins/${id}`).then((response) => {
    setInsList(response.data);

    return response;

}); };

const [OneScore, setScoreList] = useState([]);
const getScore = (id) => {
  axios.get(`http://localhost:8080/api/inscription/a/b/c/${id}`).then((response) => {
    setScoreList(response.data);

    return response;

}); };

componentDidMount();
return (
    <>
       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
  
      </div>

      <Row className="justify-content-md-center">
       
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Nb de Questions"
            title={Object.entries(OneIns)[0]}
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Score"
            title={Object.entries(OneScore)[0]}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Nombre des Cours"
            data={trafficShares} />
        </Col>
     
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
               

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>
{/*  <Col xs={12} className="mb-4">
                  <PageVisitsTable />
      </Col>*/}
                <Col xs={12} lg={6} className="mb-4">
                <Card border="light" className="shadow-sm">
      <Card.Body>
        <h5>My Achievements</h5>
        <p>Tells you where your visitors originated from, such as search engines, social networks or website referrals.</p>
        <div className="d-block">
          <div className="d-flex align-items-center pt-3">
            <div className="icon icon-shape icon-sm icon-shape-quaternary rounded me-3">
            </div>
            <div className="d-block align-items-center">
            <Row>
<Col xs={12} lg={10} xl={6}>
            <Image src={BadgeB} className="rounded-circle" /></Col>
            <Col xs={12} lg={10} xl={6}>

            <Image src={BadgeE} className="rounded-circle" />
            </Col></Row>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
                </Col>

              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>

                <Col xs={12} xl={4} className="px-0">
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
