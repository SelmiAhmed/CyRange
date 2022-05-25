
import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faDesktop, faMobileAlt, faTabletAlt, faFighterJet, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import axios from "axios";
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { Link, useHistory } from 'react-router-dom';

export default () => {
  const componentDidMount = () => {
    getTrainN();
    getusersN();
    getResN();
    gettrainA();
    gettrainP();
    gettrainD();
  }

  const [OneTraining, setTrainList] = useState([]);
  const getTrainN = () => {
    axios.get(`http://localhost:8081/api/cours/stat/stat`).then((response) => {
      setTrainList(response.data);
      return response;

  }
  );
    };
    const [Oneuser, setuserList] = useState([]);
    const getusersN = () => {
      axios.get(`http://localhost:8081/api/users/stat/stat`).then((response) => {
        setuserList(response.data);
        return response;
  
    }
    );
      };

      const [OneRes, setResList] = useState([]);
      const getResN = () => {
        axios.get(`http://localhost:8081/api/ressources/stat/stat`).then((response) => {
          setResList(response.data);
          return response;
    
      }
      );
        };




      const [OneTrainA, setTrainAList] = useState([]);
      const gettrainA = () => {
        axios.get(`http://localhost:8081/api/cours/a/att`).then((response) => {
          setTrainAList(response.data);
          return response;
    
      }
      );
        };
        const [OneTrainP, setTrainPList] = useState([]);
        const gettrainP = () => {
          axios.get(`http://localhost:8081/api/cours/a/pen`).then((response) => {
            setTrainPList(response.data);
            return response;
      
        }
        );
          };
          const [OneTrainD, setTrainDList] = useState([]);
          const gettrainD = () => {
            axios.get(`http://localhost:8081/api/cours/a/def`).then((response) => {
              setTrainDList(response.data);
              return response;
        
          }
          );
            };
componentDidMount();
    function splitStr(obj) {
      
      var string = obj.split(":");

  return string}

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>

      <Row className="justify-content-md-center">
       
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Users"
            title={Object.entries(Oneuser)[0]}
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Ressources"
            title={Object.entries(OneRes)[0]}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title={"Nombre de Cours:" + Object.entries(OneTrainA)[0]}
            data ={ [
              { id: 1, label: "Training Offensive:", value:{"" : ((Object.entries(OneTrainA)[0]*100)/10)}, color: "secondary", icon: faFighterJet },
              { id: 2, label: "Training Defensive", value: {"" : Object.entries(OneTrainD)[0]}, color: "primary", icon: faDesktop },
              { id: 3, label: "Training Pentest", value: {"": Object.entries(OneTrainP)[0]}, color: "tertiary", icon: faTabletAlt }
          ]} />
        </Col>
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value" 
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
