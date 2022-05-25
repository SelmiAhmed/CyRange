import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes,faPlus, faChartArea, faChartBar,faSignOutAlt,faSignInAlt,faHome, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card,ButtonGroup, Dropdown, Button, Breadcrumb, Form } from '@themesberg/react-bootstrap';
import  axios  from 'axios';
import { Link, useHistory } from "react-router-dom";

export default () => {
  const componentDidMount = () => {
    getEnrolledTrainings(id);
    getUser(mail);
  }

  const mail = localStorage.getItem('email');
  const [TrainingsList, setTrainingsList] = useState([]);
  const getUser = (mail) => {
    axios.get(`http://localhost:8080/api/users/user/${mail}`).then((response) => {
      setTrainingsList(response.data);
    });

  };


  const [EnrolledTrainingsList, setEnrolledTrainingsList] = useState([]);
const id = TrainingsList. map((training, key) => (training.IdUser));
localStorage.setItem('idc',id);
  const getEnrolledTrainings = (id) => {
    axios.get(`http://localhost:8080/api/inscription/${id}`).then((response) => {
      setEnrolledTrainingsList(response.data);
    });
  //}
  };
  const score = EnrolledTrainingsList. map((ins, key) => (ins.Score));

  const [IDList, setIDList] = useState([]);
  const [EnrolledTrainingsList2, setEnrolledTrainingsList2] = useState([]);
  const EnrolledTrainingsList20 =[]
  const getIDs = () => {
    for(let i = 0; i < EnrolledTrainingsList.length; i++) {
      setIDList(EnrolledTrainingsList[i].IdCours)
    }
  }
  const id5 = IDList. map((training2, key) => (training2.IdCours));
      const getEnrolledTrainings2 = (id) => {
         axios.get(`http://localhost:8080/api/cours/name/${id}`).then((response) => {
          setEnrolledTrainingsList2(response.data.NomCours);
        })
}
const name=localStorage.getItem("enroll");
        const deleteInscription = (IdUser,IdCours) => {
          axios.delete(`http://localhost:8080/api/inscription/${IdUser}/${IdCours}`).then((response) => {
            setEnrolledTrainingsList(
              EnrolledTrainingsList.filter((inscription) => {
                return inscription.IdCours != IdCours;
              })
            );
          });
        }
        const history = useHistory();

        const openInscription = (IdCours) => { 
          localStorage.setItem('training', IdCours);
          history.push("/CoursInscrit");
        }

        

        componentDidMount();

 return (
        <>
<div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    <div className="mb-4 mb-lg-0">
        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI</Breadcrumb.Item>
            <Breadcrumb.Item active>Mes Cours</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Mes Cours</h4>
        <p className="mb-0"></p>
    </div>
    
</div>
<div className="table-settings mb-4">
    <Row className="justify-content-between align-items-center">
        <Col xs={9} lg={4} className="d-flex">
            <Form.Select className="w-25">
                <option defaultChecked>All</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
                <option value="3">Pending</option>
                <option value="3">Canceled</option>
            </Form.Select>
        </Col>
    </Row>
</div>



            <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
          <div>
            <h6><FontAwesomeIcon icon={faGlobeEurope} className="icon icon-xs me-3" /> Liste des Cours Inscrits</h6>
          </div>
          <div>
            <Card.Link href="#" className="text-primary fw-bold">
              #2 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
            </Card.Link>
          </div>
        </div>
<Row>
{EnrolledTrainingsList. map((training, key) => (
        <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
          <div>

            <h6 className="mb-0"><FontAwesomeIcon icon={faFlagUsa} className="icon icon-xs me-3" />          {training.NomTraining}            </h6>
         
         <div className="small card-stats">
            { training.Score = 100 ?
            <div>
                           <label>Completed</label><FontAwesomeIcon icon={faCheck} className="icon icon-xs text-success ms-2" />
            </div>
            :
            <div>
                           <label>Not Completed</label><FontAwesomeIcon icon={faTimes} className="icon icon-xs text-success ms-2" />
            </div>

            }  
            </div>
          </div>
          <div>
            <Card.Link  className="text-primary fw-bold">
            <Button  variant="tertiary" onClick={() => {
                    openInscription(training.IdCours);
                    localStorage.setItem('score',training.Score);

                  }} >
            <FontAwesomeIcon icon={faSignInAlt} className="mb-0" /> Ouvrir
        </Button>            </Card.Link>
        <Card.Link  className="text-primary fw-bold">
            <Button  variant="quaternary"   onClick={() => {
                    deleteInscription(training.IdUser,training.IdCours);
                  }}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mb-0" /> Désabonner
        </Button>            </Card.Link>

          </div>
        </div>  
        
       ))
      } 
        </Row> 
        
                 
          </Card.Body>
    </Card>

        
        </>
    );
};
