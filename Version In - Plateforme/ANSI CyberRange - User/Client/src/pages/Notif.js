import React,{useState} from "react";
import { TimelineWidget } from "../components/Widgets";
import { Breadcrumb, Button, ButtonGroup, Row, Col,ListGroup, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrash, faBell, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import  axios  from 'axios';
import { toast} from 'react-toastify';

export default () => {
    const componentDidMount = () => {
        getNotifs();
       }
     
    const [NotifsList, setNotifsList] = useState([]);
    const getNotifs = () => {
      axios.get("http://localhost:8080/api/notifs/").then((response) => {
        setNotifsList(response.data);
      });
    };
    const deleteNotif = (IDNotif) => {
        axios.delete(`http://localhost:8080/api/notifs/${IDNotif}`).then((response) => {
            setNotifsList(
                NotifsList.filter((notif) => {
              return notif.IDNotif != IDNotif;
            })
          );
        });
        toast.success('Supprime avec succes');
          }
          const deleteAllNotif = () => {
            axios.delete(`http://localhost:8080/api/notifs/`).then((response) => {
                setNotifsList(
              );
            });
            toast.success('Tous les notifications sont supprimes avec succes');
              }
    
    componentDidMount();
    return (
        <>
        <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    <div className="mb-4 mb-lg-0">
        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI</Breadcrumb.Item>
            <Breadcrumb.Item active>Notifications</Breadcrumb.Item>
        </Breadcrumb>
    </div>
    
</div>

<Col>
<div class="notification-card shadow card border-0">

<div class="card-body">
<div class="list-group-flush list-group-timeline list-group">
<div class="border-o list-group-item">
<div class="ps-lg-1 row">
<div class="col-auto">
<Row className="align-items-center">
<Col className="col-auto" xs={12} xl={8}>
<h6 class="fs-5 fw-bold mb-0">Notifications</h6>
</Col>
<Col>
<Button className="mb-5"  variant="quaternary"   onClick={() => {
                    deleteAllNotif();
                  }}>
            <FontAwesomeIcon icon={faTrash} className="mb-0" /> 
        </Button> 

</Col></Row>
{NotifsList.map((notif, key) => (

<div class="ms-n2 mb-3 col">
<Row className="align-items-center">
<Col className="col-auto" xs={12} xl={8}>

<h3 class="fs-6 fw-bold mb-1"><FontAwesomeIcon icon={faBell} className="ls-0" /> 
 {notif.Contenu}</h3>
<p class="mb-1 card-text">{notif.DateNotif}
</p></Col>

<Col>
<Button className="mb-5"  variant="quaternary"   onClick={() => {
                    deleteNotif(notif.IDNotif);
                  }}>
            <FontAwesomeIcon icon={faTrash} className="mb-0" /> DEL
        </Button> </Col>  </Row></div>
       
       ))}
</div></div>
</div></div></div></div>
</Col>
      </>
    );
};
