import React,{ useState } from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table,Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faEye, faTrash, faEdit, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import  axios  from 'axios';
import { Link, useHistory } from 'react-router-dom';
import CoursDataService from  "../services/TrainingService";
import { useFormik,Field,Formik } from "formik";
import { toast} from 'react-toastify';

import * as Yup from 'yup';

export default () => {

  const componentDidMount = () => {
    this.gettrainings();
  
  }

        const [TrainingList, setTrainingList] = useState([]);
        const gettrainings = () => {
          axios.get("http://localhost:8081/api/cours/").then((response) => {
            setTrainingList(response.data);
          });

        };
        const deleteEmployee = (id) => {
          axios.delete(`http://localhost:8081/api/cours/${id}`).then((response) => {
            setTrainingList(
              TrainingList.filter((training) => {
                return training.id != id;
              })
            );
            const IdTraining = id;
            axios.delete(`http://localhost:8081/api/questions/training/${IdTraining}`).then((response) => {
            });
        axios.delete(`http://localhost:8081/api/files/${IdTraining}`).then((response) => {
        });
        axios.delete(`http://localhost:8081/api/utilisation/train/${IdTraining}`).then((response) => {
        });
        axios.delete(`http://localhost:8081/api/inscription/training/${IdTraining}`).then((response) => {
        });

          });
        };
        const UPDATEEmployee = (id) => {
          axios.put(`http://localhost:8081/api/cours/${id}`,{ 
            NomCours: formik.values.NomCours,
            Description: formik.values.Description,
            Categorie: formik.values.Categorie,
            Type: formik.values.Type,
            Temps: formik.values.Temps,
            NbQuestions: formik.values.NbQuestions
   
         }).then((res)=>{
           console.log(res.data)
       history.push("/dashboard/overview");
   
         });   
        };

  const [OneTraining, setTrainList] = useState([]);

  const getOneTraining = (id) => {
    axios.get(`http://localhost:8081/api/cours/${id}`).then((response) => {
      setTrainList(response.data);
      setShowNotification(true);
    });
  };
  const getOneTraining2 = (id) => {
    axios.get(`http://localhost:8081/api/cours/${id}`).then((response) => {
      setTrainList(response.data);
      setShowNotification2(true);
    });
  };
  const [showNotification,setShowNotification] = useState(false);
  const [showNotification2,setShowNotification2] = useState(false);
const handleClose = () => setShowNotification(false);
const handleClose2 = () => setShowNotification2(false);

   const API_URL = "http://localhost:8081/api/cours/";

   const history = useHistory();
   const validationSchema = Yup.object().shape({
    NomCours: Yup.string().required("required"),
    NbQuestions: Yup.number().required("required"),
    Description: Yup.string().required("required"),
    Temps: Yup.string().required("required"),
    Type: Yup.string().required("required"),
    Categorie: Yup.string().required("required"),
  });

   const  formik = useFormik({
    initialValues: {

    },
    enableReinitialize: true,
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit (id) {
      console.log('Logeddin');
      console.log({formik});
      try{
        axios.put(API_URL,id,{ 
         NomCours: formik.values.NomCours,
         Description: formik.values.Description,
         Categorie: formik.values.Categorie,
         Type: formik.values.Type,
         Temps: formik.values.Temps,
         NbQuestions: formik.values.NbQuestions

      }).then((res)=>{
        console.log(res.data)
    history.push("/dashboard/overview");

      });   
  }
catch(err){
          console.log(API_URL)
          console.log(err)     
  }    
    }
  });
  gettrainings();

    return (
      
        <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <React.Fragment>

<Modal centered show={showNotification} className="modal-secondary" onHide={handleClose}>
  <Modal.Header>
    <Modal.Title>
      <p className="mb-0 pe-3 pe-md-0">
Info        </p>
    </Modal.Title>
    <Button variant="close" aria-label="Close" onClick={handleClose} />
  </Modal.Header>
  <Modal.Body>
    <div className="py-3 text-center">

      <Modal.Title className="h4 my-3">Training Details</Modal.Title>
      {OneTraining.map((training, key) => (
                            <tr>
                <h2><span class="fw-normal" >Lab Name:{training.NomCours}</span></h2>
                <h2><span class="fw-normal">Nombre of Questions:{training.NbQuestions}</span></h2>
                <h2><span class="fw-normal">Nombre of Users:{training.NbUsers}</span></h2>
                <h2><span class="fw-normal">Estimated Time:{training.Temps}</span></h2>
                <h2>Level Type:<span class="fw-normal text-success">{training.Type}</span></h2>
                <h2><span class="fw-normal">Lab Categorie:{training.Categorie}</span></h2>
                <h2><span class="fw-normal">Used Machine: Kali</span></h2>  

             </tr>  
            ))}
    </div>
  </Modal.Body>
</Modal>
</React.Fragment>


<React.Fragment>

<Modal centered show={showNotification2} className="modal-secondary" onHide={handleClose2}>
  <Modal.Header>
    <Modal.Title>
      <p className="mb-0 pe-3 pe-md-0">
Update Info        </p>
    </Modal.Title>
    <Button variant="close" aria-label="Close" onClick={handleClose2} />
  </Modal.Header>
  <Modal.Body>
    <div className="py-3 text-center">

      <Modal.Title className="h4 my-3">Training Details</Modal.Title>
      {OneTraining.map((training, key) => (
        
                            <Form >
                <Form.Group>
    <Form.Label>Lab Name: </Form.Label>
    <Form.Control id="NomCours" as="textarea" name="NomCours"  onChange={formik.handleChange}
            value={formik.values.NomCours||training.NomCours}  required  />
  </Form.Group>
              <Form.Group id="Description">
                <Form.Label>Lab Description:</Form.Label>
                <Form.Control id="Description" name="Description" onChange={formik.handleChange}
            value={formik.values.Description||training.Description}  required as="textarea"  />
              </Form.Group>
              <Form.Group >
                <Form.Label>Nombre of Questions:</Form.Label>
                <Form.Control   id="NbQuestions" name="NbQuestions" onChange={formik.handleChange}
            value={formik.values.NbQuestions||training.NbQuestions} 
 required   type="number"  />              </Form.Group>

                          <Form.Group >
                <Form.Label>Estimated Time:</Form.Label>
                <Form.Control id="Temps" name="Temps" onChange={formik.handleChange}
           value={formik.values.Temps||training.Temps}  required type="number"  />
              </Form.Group>
              <Form.Group >
                <Form.Label>Level:</Form.Label>
                <Form.Control id="Type" name="Type" onChange={formik.handleChange}
            value={formik.values.Type||training.Type}  required type="text"  />
              </Form.Group>
              <Form.Group >
                <Form.Label>Category:</Form.Label>
                <Form.Control id="Categorie" name="Categorie" onChange={formik.handleChange}
            value={formik.values.Categorie||training.Categorie}  required type="text"  />
              </Form.Group>
              <Form.Group >

              <Button variant="tertiary" className="md-3"  onClick={() => {
                    UPDATEEmployee(training.IDCours);
                  }}>Update</Button>
              </Form.Group>


             </Form>  
            ))}
    </div>
  </Modal.Body>
</Modal>
</React.Fragment>












        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI AdminSpace</Breadcrumb.Item>
            <Breadcrumb.Item active>Liste des Trainings</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Liste des Trainings</h4>
          <p className="mb-0">
            Dozens of reusable components built to provide buttons, alerts, popovers, and more.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Ajouter Nouveau Training
        </Button>
        <ButtonGroup className="ms-3">
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
         </div>

      </div>        <div class="card d-block mb-4 mb-xl-0">

            <div class="table-responsive py-4">
            <div class="dataTable-top">
                <div class="dataTable-dropdown">
                    <label class="row">
                        <div class="col-auto"><select class="pe-5 form-select">
                            <option value="10">10</option><option value="25">25</option><option value="30">30</option><option value="50">50</option></select>
                            </div>
                            <div class="d-flex align-items-center ps-0 col-auto">entries per page</div>
                            </label></div><div class="dataTable-search"><label for="search-bar-0" class="search-label">
                                <span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control " placeholder="Search..." value=""></input>
                                    </label></div></div><div class="react-bootstrap-table"></div>
                                    <div class="react-bootstrap-table">
                                        <table class="table table-bordered table-flush dataTable-table">
                                          <thead class="thead-light">
                                            <tr>
                          
                                        <th tabindex="0">Nom Training</th><th tabindex="0">Nombre des questions</th><th tabindex="0">Users</th>
                                        <th tabindex="0">Temps Estimé</th><th tabindex="0">Dificuilité</th><th tabindex="0">Ressources</th>
                                        <th tabindex="0">Actions</th></tr>
                                        </thead>
                                        <tbody >
                          {                         TrainingList.map((training, key) => (
                            <tr>
                <td><span class="fw-normal" >{training.NomCours}</span></td>
                <td><span class="fw-normal">{training.NbQuestions}</span></td>
                <td><span class="fw-normal">{training.NbUsers}</span></td>
                <td><span class="fw-normal">{training.Temps}</span></td>
                <td>{
                  training.Type === "Facile" ?

                  <span class="fw-bold text-success">{training.Type}</span>:
                  training.Type === "moyenne" ?
<span class="fw-bold text-warning">{training.Type}</span>:
<span class="fw-bold text-danger">{training.Type}</span>
                  }</td>
                <td><span class="fw-bold">Kali</span></td>  
                <td>

<Card.Link  className="text-primary fw-bold">
 <Button  variant="tertiary" onClick={() => {
                    getOneTraining(training.IDCours);
                  }}
  ><FontAwesomeIcon icon={faEye}  className="mb-0"  /> </Button> 
 </Card.Link>      
 <Card.Link  className="text-primary fw-bold">
 <Button  variant="warning" onClick={() => {
                    getOneTraining2(training.IDCours);
                  }} ><FontAwesomeIcon icon={faEdit} className="mb-0" /> </Button> 
 </Card.Link>  
 <Card.Link  className="text-primary fw-bold">
 <Button  variant="danger"                   onClick={() => {
                    deleteEmployee(training.IDCours);
                  }}
 ><FontAwesomeIcon icon={faTrash} className="mb-0" /> </Button> 
 </Card.Link>     
 </td>

             </tr>  
            ))}





                                                                    </tbody></table></div><div class="dataTable-bottom"><div class="dataTable-info"><div>Showing 1 to 10 of 27 entries</div></div><div class="dataTable-pagination"><ul class="pagination react-bootstrap-table-page-btns-ul"><li class="disabled page-item" title="previous page"><a class="page-link">&lt;</a></li><li class="active page-item" title="1"><a class="page-link">1</a></li><li class="page-item" title="2"><a class="page-link">2</a></li><li class="page-item" title="3"><a class="page-link">3</a></li><li class="page-item" title="next page"><a  class="page-link">&gt;</a></li></ul></div></div></div></div>
   </>
    );
};
