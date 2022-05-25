import React, { useState } from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table,Modal, FormGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Profile1 from "../assets/img/technologies/logo1.PNG";
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Badge,ProgressBar } from '@themesberg/react-bootstrap';
import  axios  from 'axios';
import { toast} from 'react-toastify';
import ReactFileReader from 'react-file-reader';
import FileDownload  from "js-file-download";
import { useFormik,Field } from "formik";
import * as Yup from 'yup';

export default () => {
  const componentDidMount = () => {
    getTraining(id);
    getQuestions(id);
   // getFiles(id);

  }
  const  formik = useFormik({
    initialValues: {
      Answer: "",
      Answer2: "",
      Answer3: []
    },
    onSubmit (values) {
      console.log('Logeddin');
      console.log({values});
      console.log(values.Answer);
      console.log(QuestionsList2);

      VerifReponse(QuestionsList2,values.Answer);
         }
  });


  const id = localStorage.getItem('training');
  const idc= localStorage.getItem('idc');
  const score= localStorage.getItem("score");
  const getValues = valueField => console.log(valueField);

  const [TrainingList, setTrainingList] = useState([]);
  const getTraining = (id) => {
    axios.get(`http://localhost:8080/api/cours/${id}`).then((response) => {
      setTrainingList(response.data);
    });

  };
  
  const [ReponseList, setReponseList] = useState([]);
  const [QuestionsList2, setQuestionsList2] = useState([]);


  const VerifReponse = (reponse,data) => {
    if (reponse == data) {
      toast.success('bonne reponse')
          }      
    else {
        toast.error('try again')

        }
      }
 const getQuestions2 = (id) => {
   axios.get(`http://localhost:8080/api/questions/train/${id}`).then((response) => {
     setQuestionsList2(response.data);
   });

 };
  const [QuestionsList, setQuestionsList] = useState([]);
  const getQuestions = (id) => {
    axios.get(`http://localhost:8080/api/questions/${id}`).then((response) => {
      setQuestionsList(response.data);
    });

  };
  const [FilesList, setFilesList] = useState([]);
  const getFiles = (id) => {
    axios.get(`http://localhost:8080/api/files/${id}`).then((response) => {
      setFilesList(response.data);
      setShowNotification(true)
    });

  };

  const handleFiles = (FilesList) => {
    console.log(FilesList);
  }
  const download = (e) => {
    e.preventDefault();
    axios({
      url:`http://localhost:8080/api/files/download/`,
      method:"GET",
      responseType:"blob"

    }).then((res) =>{
      console.log(res);

      FileDownload(res.data,"download.txt");
    })
  };
  const [showNotification,setShowNotification] = useState(false);

  const handleClose = () => setShowNotification(false);

  function splitStr(str) {
var string = str.split(",");
return string}
const customHandleChange = e => {
  const { value } = e.target;

  formik.setFieldValue('Answer', value);
}
const [inputFields, setInputFields] = useState([{
  Answer:'',
} ]);
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
    
 
 
}
const Answer3 = ["one", "two", "three","Four","Five"];

const handleChange2 = (e) => {
  const { checked, name } = e.target;
  if (checked) {
    formik.setFieldValue("Answer3", [...formik.values.Answer3, name]);
  } else {
    formik.setFieldValue(
      "Answer3",
      formik.values.Answer3.filter((v) => v !== name)
    );
  }
};
const handleChange3 = (e) => {
  const { checked, name } = e.target;
  if (checked) {
    formik.setFieldValue("Answer2", [...formik.values.Answer3, name]);
  } else {
    formik.setFieldValue(
      "Answer2",
      formik.values.Answer3.filter((v) => v !== name)
    );
  }
};
const [inputList, setInputList] = useState([{ Answer: ""}]);

// handle input change
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};
function handleChanges(evt) {
  const value = evt.target.value;
  formik.setFieldValue({
    ...'Answer',
    [evt.target.name]: value
  });
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
    </div></div>

<Row >
{TrainingList. map((training, key) => (

<Col xs={10} xl={12}>
<div class="px-0 mb-4 col-12">
<div class="shadow card border-0">
<div class="card-body">
<div class="d-flex align-items-center ">
<Card.Img src={Profile1}  className="user-avatar medium-avatar rounded-circle mb-3" />
<h3 class="fs-3 fw-bold px-6 mb-3">{training.NomCours}
</h3>

</div>

<div class="d-block">
<Row> 
<p>{training.Description}
</p>

<Col xs={3} xl={3}>
<div class="d-flex align-items-center me-5">

<FontAwesomeIcon icon={faPlus} className="mb-0" />
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
<Col xs={3} xl={3}>
<div class="d-flex align-items-center me-5">

<FontAwesomeIcon icon={faPlus} className="mb-0" /><div class="d-block"><label class="mb-0">Nb Questions</label>
<h4 class="mb-0">{training.NbQuestions}</h4>
</div></div>
</Col>  
<Col xs={4} xl={4}>
<div class="d-flex align-items-center me-5">

<FontAwesomeIcon icon={faPlus} className="mb-0" />
<div class="d-block"><label class="mb-0">Nb Inscrits</label>
<h4 class="mb-0">{training.NbUsers}</h4>
</div></div>
</Col>  

<Col xs={2} xl={2}>
&nbsp; &nbsp; &nbsp; <Button target="_blank" href="/VM" className="fs-10 mb-5" variant="secondary" >
<FontAwesomeIcon icon={faPlus} className="mb-0" /> Ouvrir VM     
</Button>
&nbsp; &nbsp; &nbsp; <Button className="fs-10 mb-5" variant="primary"
   onClick={() => {
    getFiles(id);
  }}
 >
&nbsp;   <FontAwesomeIcon icon={faPlus} className="mb-0" /> Voir Fichiers    
</Button>
</Col>


<Col>
          <div className="progress-wrapper">
            <div className="progress-info">
              <h6 className="mb-0">Score:{score}</h6>
              <small className="fw-bold text-dark">

              </small>
            </div>
            <ProgressBar variant="info" now={score} min={0} max={100} />
          </div>
        </Col>

</Row>

</div>

</div>

</div>

</div>
</Col>


                                        ))}

</Row>
<React.Fragment>

<Modal centered show={showNotification}  className="modal-secondary" onHide={handleClose}>
  <Modal.Header>
    <Modal.Title>
      <p className="mb-0 pe-3 pe-md-0">
Info        </p>
    </Modal.Title>
    <Button variant="close" aria-label="Close" onClick={handleClose} />
  </Modal.Header>
  <Modal.Body>
  <Card border="light" className="shadow-sm">
            <Card.Body>
            <table class="table table-bordered table-flush dataTable-table"><thead class="thead-light">
                                        <tr>
                    <th className="border-bottom">FileName</th>
                    <th className="border-bottom">Action</th>
                </tr>

                                        </thead><tbody >


{FilesList. map((training, key) => (
                            <tr>
                <td><span class="fw-normal" >{training.Name}</span></td>
                <td>

 <Card.Link  className="text-primary fw-bold">
 {/*<Button onClick={(e)=>download(e)} variant="secondary"><FontAwesomeIcon icon={faAngleDown} className="mb-0" />Download </Button> */}
 <a href={`../../../../ANSI CyberRange - Admin/Server/public/${training.Name}`} download={training.Name}><Button variant="secondary"><FontAwesomeIcon icon={faAngleDown} className="mb-0" />Download</Button></a>
 </Card.Link>     
 </td>

             </tr>  
          ))}
</tbody ></table>
</Card.Body></Card>
  </Modal.Body>
</Modal>
</React.Fragment>


            <Card border="light" className="shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
                <div>
                  <h6><FontAwesomeIcon icon={faGlobeEurope} className="icon icon-xs me-3" /> Liste des Questions</h6>
                </div>
                <div>
                  <Card.Link href="#" className="text-primary fw-bold">
                    #2 <FontAwesomeIcon icon={faChartLine} className="ms-2" />
                  </Card.Link>
                </div>
              </div>
              <div className="border-bottom border-light py-3">
              <Form onSubmit={formik.handleSubmit}>

              {QuestionsList.map((question, key) => (

              <Row>

              <h6 className="mb-4">Question #{key}: {question.Contenu}</h6>
            <Col xs={10} xl={10} className="mb-3">

            {
question.TypeQ === "Complet" ?

<Form.Group >
<Form.Control id="Answer"                                   
   onChange={formik.handleChange}
   name={formik.values.Answer[key]} 
  // onChange={formik.handleChange}
            value={formik.values.Answer[key]} 
            type="text" placeholder="Enter vos reponses" />
       
</Form.Group>

: question.TypeQ === "Seul Choix" ?
<fieldset >

<Form.Check
type="radio"
label={splitStr(question.Options.toString())[0]} 
defaultValue="option1"

            htmlFor="radio1"
            id="Answer2" name={splitStr(question.Options.toString())[0]}     value={formik.values.Answer2}             onChange={handleChange3}

/>

<Form.Check
type="radio"
label={splitStr(question.Options.toString())[1]}         
            htmlFor="radio2"
            id="Answer2" name={splitStr(question.Options.toString())[1]}     value={formik.values.Answer2}             onChange={handleChange3}
/>

<Form.Check
type="radio"
label={splitStr(question.Options.toString())[2]}         
id="Answer2" name={splitStr(question.Options.toString())[2]}    value={formik.values.Answer2}             onChange={handleChange3}
 htmlFor="radio3"
/>
<Form.Check
type="radio"
label={splitStr(question.Options.toString())[3]}            
            htmlFor="radio4"
            id="Answer2" name={splitStr(question.Options.toString())[3]}     value={formik.values.Answer2}             onChange={handleChange3}
/>
<Form.Check
type="radio"
label={splitStr(question.Options.toString())[4]}          
id="Answer2" name={splitStr(question.Options.toString())[4]}     value={formik.values.Answer2}                     onChange={handleChange3}
            htmlFor="radio5" 
/>

 </fieldset>

:<FormGroup  >
  <Form.Check label={splitStr(question.Options.toString())[0]}                id="Answer3"
            type="checkbox"
            name={splitStr(question.Options.toString())[0]}
            onChange={handleChange2}
            value={formik.values.Answer3}

  htmlFor="checkbox1" />
  <Form.Check  label={splitStr(question.Options.toString())[1]}              id="Answer3"
            type="checkbox"
            name={splitStr(question.Options.toString())[1]}
            onChange={handleChange2}
            value={formik.values.Answer3}

 htmlFor="checkbox2" />
  <Form.Check  label={splitStr(question.Options.toString())[2]}              id="Answer3"
            type="checkbox"
            name={splitStr(question.Options.toString())[2]}
            onChange={handleChange2}
            value={formik.values.Answer3}
 htmlFor="checkbox3" />
  <Form.Check label={splitStr(question.Options.toString())[3]}              id="Answer3"
            type="checkbox"
            name={splitStr(question.Options.toString())[3]}
            onChange={handleChange2}
            value={formik.values.Answer3}

 htmlFor="checkbox4" />
  <Form.Check label={splitStr(question.Options.toString())[4]}              id="Answer3"
            type="checkbox"
            name={splitStr(question.Options.toString())[4]}
            onChange={handleChange2}
            value={formik.values.Answer3}

htmlFor="checkbox5" />
</FormGroup>

}
            </Col>
            <Col xs={1} xl={2}  className="mb-5">
            <Button variant="tertiary" 
            onClick={(values)=>{
              console.log(formik.values);
              console.log((formik.values.Answer));
              console.log((score));

              if(question.TypeQ ==="Complet" ){
              if (question.Reponse === formik.values.Answer) {
                axios.put(`http://localhost:8080/api/inscription/${idc}/${id}`,{ 
                  Score:score+question.Score,
               }).then((res)=>{
                toast.success("Bonne Reponse");
   
               }).catch((e)=>     { console.log(e)
               })
              }
              else {
                toast.error("Try Again");

              }
            }
            else if(question.TypeQ ==="Seul Choix" ){
              if (question.Reponse === (formik.values.Answer2)[0]) {
                toast.success("Bonne Reponse");

              }
              else {
                toast.error("Try Again");

              }
            }
            else {
              if (question.Reponse === (formik.values.Answer3).toString()) {
                toast.success("Bonne Reponse");

              }
              else {
                toast.error("Try Again");

              }
            }
          }}
            
            >Confirm</Button>

            <Button variant="warning" onClick={()=>{
              if (question.Hint === null) {
                toast.info("Pas de Hint disponible pour ce question");

              }
              else {
                toast.info(question.Hint);

              }
            }
              }>Hint</Button>
            </Col>

          </Row>
                                        ))}
                                        </Form>

              </div>
            
                </Card.Body>
          </Card>
      
      
    </>
    );
};
