import React,{useState} from "react";
import { Breadcrumb, Button, ButtonGroup,Modal, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  axios  from 'axios';

import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH,faTrash } from '@fortawesome/free-solid-svg-icons';

export default () => {
    const componentDidMount = () => {
        this.getUsers();
      
      }
    
    const [usersList, setUsersList] = useState([]);
    const getUsers = () => {
      axios.get("http://localhost:8081/api/users/").then((response) => {
        setUsersList(response.data);
      });

    };
    const deleteUser = (id) => {
      axios.delete(`http://localhost:8081/api/users/${id}`).then((response) => {
        setUsersList(
            usersList.filter((training) => {
            return training.id != id;
          })
        );
        const IdUser = id;
        axios.delete(`http://localhost:8081/api/inscription/user/${IdUser}`).then((response) => {
        });
  
      });
    };
  
    getUsers();
    const [showNotification, setShowNotification] = useState(false);
    const handleClose = () => setShowNotification(false);
    
    return (
        <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">

        <React.Fragment>

<Modal centered show={showNotification} className="modal-secondary" onHide={handleClose}>
  <Modal.Header>
    <Modal.Title>
      <p className="mb-0 pe-3 pe-md-0">
Error        </p>
    </Modal.Title>
    <Button variant="close" aria-label="Close" onClick={handleClose} />
  </Modal.Header>
  <Modal.Body>
    <div className="py-3 text-center">

      <Modal.Title className="h4 my-3">Verifier Vos données!</Modal.Title>
    </div>
    <Button variant="outline-primary" size="sm"  onClick={handleClose} />

  </Modal.Body>
</Modal>
</React.Fragment>

          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI AdminSpace</Breadcrumb.Item>
            <Breadcrumb.Item active>Liste des Users</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Liste des Users</h4>
          <p className="mb-0">
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Ajouter User
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
                            <option value="All">All</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option></select>
                            </div>
                            <div class="d-flex align-items-center ps-0 col-auto"></div>
                            </label></div><div class="dataTable-search"><label for="search-bar-0" class="search-label">
                                <span id="search-bar-0-label" class="sr-only">Search this table</span><input id="search-bar-0" type="text" aria-labelledby="search-bar-0-label" class="form-control " placeholder="Search..." value=""></input>
                                    </label></div></div><div class="react-bootstrap-table"></div>
                                    <div class="react-bootstrap-table">
                                        <table class="table table-bordered table-flush dataTable-table"><thead class="thead-light">
                                        <tr>
                    <th className="border-bottom">Username</th>
                    <th className="border-bottom">Email</th>
                    <th className="border-bottom">Etat</th>
                    <th className="border-bottom">User Created at</th>
                </tr>

                                        </thead><tbody >

                                        {                         usersList.map((User, key) => (
                            <tr>
                <td><span class="fw-normal" >{User.Username}</span></td>
                <td><span class="fw-normal">{User.Email}</span></td>
                <td><span class="fw-bold">Active</span></td>  
                <td>

 <Card.Link  className="text-primary fw-bold">
 <Button  variant="danger"                   onClick={() => {
                   deleteUser(User.IdUser);
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
