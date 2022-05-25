import React,{useState} from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import ctf from "../assets/img/technologies/logo1.PNG";
import web from "../assets/img/web.jpeg";
import  axios  from 'axios';

import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@themesberg/react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { toast} from 'react-toastify';

export default () => {
    const componentDidMount = () => {
        getTrainings();
        getUser(mail);

      }
      const mail = localStorage.getItem('email');
      const [UserList, setUserList] = useState([]);
      const getUser = (mail) => {
        axios.get(`http://localhost:8080/api/users/user/${mail}`).then((response) => {
          setUserList(response.data);
        });
    
      };
    
      const id = UserList. map((user, key) => (user.IdUser));
    const [TrainingsList, setTrainingsList] = useState([]);
    const getTrainings = () => {
      axios.get("http://localhost:8080/api/cours/").then((response) => {
        setTrainingsList(response.data);
      });

    };

    const enrollTraining = (iduser,idcours,nomtraining) => {
        
        axios.post("http://localhost:8080/api/inscription/",{ 
            IdUser: iduser,
            IdCours: idcours,
            NomTraining:nomtraining
         }).then((res)=>{
          toast.info('Inscrire avec succes');

         })
      };

    componentDidMount();
    return (
        <>
<div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    <div className="mb-4 mb-lg-0">
        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI</Breadcrumb.Item>
            <Breadcrumb.Item active>Liste des cours</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Liste des cours</h4>
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
        <Col xs={3} lg={8} className="text-end">
            <Dropdown as={ButtonGroup} className="me-2">
                <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                    <span className="icon icon-sm icon-gray">
                        <FontAwesomeIcon icon={faSlidersH} />
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                    <Dropdown.Item className="d-flex fw-bold">
                        10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                    </Dropdown.Item>
                    <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                    <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    </Row>
</div>

<Row >
{TrainingsList.map((training, key) => (

                                        <Col xs={8} xl={6}>
<div class="px-0 mb-4 col-12">
    <div class="shadow card border-0">
        <div class="card-body">

        <div class="d-flex align-items-center justify-content-between">

        <Card.Img src={ctf}  className="user-avatar medium-avatar rounded-circle mb-3" />
        <h2 class="fs-3 fw-bold mb-3">{training.NomCours}</h2>

</div>

            <div class="d-block">
<Row> 
<p>{training.Description}
</p>

    <Col xs={8} xl={6}>
                <div class="d-flex align-items-center me-5">

                    <div class="icon-shape icon-sm icon-shape-danger rounded me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clip-rule="evenodd"></path></svg>
                            </div>
                            <div class="d-block"><label class="mb-0">Temps Estimé</label>
                            <h4 class="mb-0">{training.Temps}</h4>
                            {
training.Type === "Facile" ?

<Badge class="mb-0" bg="success" className="me-1">{training.Type}</Badge>
: training.Type === "moyenne" ?
<Badge class="mb-0" bg="warning" className="me-1">{training.Type}</Badge>
:<Badge class="mb-0" bg="danger" className="me-1">{training.Type}</Badge>
}
                            </div></div>
                            </Col>  
                            <Col xs={8} xl={6}>
                            &nbsp; &nbsp; &nbsp; <Button className="fs-10 mb-5" variant="secondary" type="submit"  onClick={() => {
enrollTraining(id[0],training.IDCours,training.NomCours); 
}}  >
            <FontAwesomeIcon icon={faPlus} className="mb-0" /> S'inscrire au Cours
        </Button>


                                        </Col>
                                        </Row>

                                        </div>

                                        </div>

                                        </div>

                                        </div>
                      
                                        </Col> 
                                        
                                        ))}
                                      
                                        </Row>




</>
    );
};