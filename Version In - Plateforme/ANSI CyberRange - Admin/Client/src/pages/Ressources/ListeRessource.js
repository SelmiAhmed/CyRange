
import React,{useState} from "react";
import { Breadcrumb, Button, ButtonGroup, ProgressBar, Card, Table,Form,Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faEye, faTrash, faEdit, faMemory } from '@fortawesome/free-solid-svg-icons';
import  axios  from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { PageTrafficTable } from "../../components/Tables";
import { useFormik,Field,Formik } from "formik";
import { toast} from 'react-toastify';

import * as Yup from 'yup';


export default () => {

  const componentDidMount = () => {
    getressources();
  
  }


  const [RessourcesList, setRessourcesList] = useState([]);
  const getressources = () => {
    axios.get("http://localhost:8081/api/ressources/").then((response) => {
      setRessourcesList(response.data);
    });

  };
  const deleteRes = (id) => {
    axios.delete(`http://localhost:8081/api/ressources/${id}`).then((response) => {
      setRessourcesList(
        RessourcesList.filter((ressource) => {
          return ressource.id != id;
        })
      );
    });
  };
  const UPDATERes = (id) => {
    axios.put(`http://localhost:8081/api/ressources/${id}`,{ 
      NomRes: formik.values.NomRes,
      Description: formik.values.Description,
      OS: formik.values.OS,
      Size: formik.values.Size

   }).then((res)=>{
     console.log(res.data)
 history.push("/dashboard/overview");

   });   
  };

const [OneRes, setResList] = useState([]);

const getOneRes = (id) => {""
axios.get(`http://localhost:8081/api/ressources/${id}`).then((response) => {
  setResList(response.data);
setShowNotification(true);
});
};
const getOneRes2 = (id) => {
axios.get(`http://localhost:8081/api/ressources/${id}`).then((response) => {
  setResList(response.data);
setShowNotification2(true);
});
};
const [showNotification,setShowNotification] = useState(false);
const [showNotification2,setShowNotification2] = useState(false);
const handleClose = () => setShowNotification(false);
const handleClose2 = () => setShowNotification2(false);

const API_URL = "http://localhost:8081/api/ressources/";

const history = useHistory();
const validationSchema = Yup.object().shape({
NomRes: Yup.string().required("required"),
Description: Yup.string().required("required"),
OS: Yup.string().required("required"),
Size: Yup.string().required("required"),
});
var i;

const  formik = useFormik({
initialValues: {

},
enableReinitialize: true,
validationSchema,
onSubmit (id) {
console.log('Logeddin');
console.log({formik});
try{
  axios.put(API_URL,id,{ 
   NomRes: formik.values.NomRes,
   Description: formik.values.Description,
   OS: formik.values.OS,
   Size: formik.values.Size

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



















componentDidMount();







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

      <Modal.Title className="h4 my-3">Ressource Details</Modal.Title>
      {OneRes.map((ressource, key) => (
                            <tr>
                <h2><span class="fw-normal" >Ressource Name:{ressource.NomRes}</span></h2>
                <h2><span class="fw-normal">Description:{ressource.Description}</span></h2>
                <h2><span class="fw-normal">Size:{ressource.Size}</span></h2>
                <h2><span class="fw-normal">OS:{ressource.OS}</span></h2>

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

      <Modal.Title className="h4 my-3">Ressource Details</Modal.Title>
      {OneRes.map((ressource, key) => (
        
                            <Form >
                <Form.Group>
    <Form.Label>Ressource Name: </Form.Label>
    <Form.Control id="NomRes" as="textarea" name="NomRes"  onChange={formik.handleChange}
            value={formik.values.NomRes||ressource.NomRes}  required  />
  </Form.Group>
              <Form.Group id="Description">
                <Form.Label>Ressource Description:</Form.Label>
                <Form.Control id="Description" name="Description" onChange={formik.handleChange}
            value={formik.values.Description||ressource.Description}  required as="textarea"  />
              </Form.Group>
              <Form.Group >
                <Form.Label>Size:</Form.Label>
                <Form.Control   id="Size" name="Size" onChange={formik.handleChange}
            value={formik.values.Size||ressource.Size} 
 required   type="number"  />              </Form.Group>

                          <Form.Group >
                <Form.Label>OS:</Form.Label>
                <Form.Control id="OS" name="OS" onChange={formik.handleChange}
           value={formik.values.OS||ressource.OS}  required type="input"  />
              </Form.Group>
              <Form.Group >

              <Button variant="tertiary" className="md-3"  onClick={() => {
                    UPDATERes(ressource.IDRes);
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
            <Breadcrumb.Item active>Liste des ressources</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Liste des ressources</h4>
          <p className="mb-0">
            Dozens of reusable components built to provide buttons, alerts, popovers, and more.
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Ajouter Ressource
        </Button>
        <ButtonGroup className="ms-3">
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
         </div>

      </div>
      <div class="card d-block mb-4 mb-xl-0">

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
                            <table class="table table-bordered table-flush dataTable-table"><thead class="thead-light">
                                <tr>
              
                            <th tabindex="0">Nom Ressource</th><th tabindex="0">Size</th><th tabindex="0">Système d'exploitation</th><th tabindex="0">Nombre de Cours Utilisés</th><th tabindex="0">Performance</th><th tabindex="0">Actions</th></tr>
                            </thead>
                            <tbody >
                            {RessourcesList.map((ressource, key) => (
                            <tr class="border-bottom">
                            <td><a class="fw-bold card-link" href="#/examples/invoice">{ressource.NomRes}</a></td>
                            <td><span class="fw-normal">{ressource.Size}</span></td>
                            <td><span class="fw-normal">{ressource.OS}</span></td>
                            <td><span class="fw-normal">2</span></td>
                            <td>
                              <Card >
                            <ProgressBar class="mb-0" icon={faMemory} variant="primary" now={60} min={0} max={100} />
                            </Card>

                            </td>

                            <td>
                            <Card.Link  className="text-primary fw-bold">
 <Button  variant="tertiary" onClick={() => {
                    getOneRes(ressource.IDRes);
                  }}
  ><FontAwesomeIcon icon={faEye}  className="mb-0"  /> </Button> 
 </Card.Link>      
 <Card.Link  className="text-primary fw-bold">
 <Button  variant="warning" onClick={() => {
                    getOneRes2(ressource.IDRes);
                  }} ><FontAwesomeIcon icon={faEdit} className="mb-0" /> </Button> 
 </Card.Link>  
 <Card.Link  className="text-primary fw-bold">
 <Button  variant="danger"                   onClick={() => {
                    deleteRes(ressource.IDRes);
                  }}
><FontAwesomeIcon icon={faTrash} className="mb-0" /> </Button> 
 </Card.Link>     
 </td>

             </tr>  
            ))}
                                                                    </tbody>
                                                                    </table></div><div class="dataTable-bottom"><div class="dataTable-info"><div>Showing 1 to 10 of 27 entries</div></div><div class="dataTable-pagination"><ul class="pagination react-bootstrap-table-page-btns-ul"><li class="disabled page-item" title="previous page"><a class="page-link">&lt;</a></li><li class="active page-item" title="1"><a class="page-link">1</a></li><li class="page-item" title="2"><a class="page-link">2</a></li><li class="page-item" title="3"><a class="page-link">3</a></li><li class="page-item" title="next page"><a  class="page-link">&gt;</a></li></ul></div></div></div></div>
</>
  );
};
