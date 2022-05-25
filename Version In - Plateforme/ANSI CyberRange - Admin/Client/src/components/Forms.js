
import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Card, Form, Button, InputGroup,Modal } from '@themesberg/react-bootstrap';
import { faCalendarAlt,faHome, faPlus, faEye, faTrash, faEdit, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import  axios  from 'axios';
import { useFormik,Field } from "formik";
import * as Yup from 'yup';
import CoursDataService from "../pages/services/TrainingService";
import CustomSelect from './CustomSelect'
import { Link, useHistory } from 'react-router-dom';
import { toast} from 'react-toastify';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';


export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Also your last name" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" placeholder="+12-345 678 910" />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};



export const CoursInfoForm = () => {
  const [birthday, setBirthday] = useState("");
  const [showSubscribe, setShowSubscribe] = useState(false);
  const handleClose = () => setShowSubscribe(false);
  const [showSubscribe2, setShowSubscribe2] = useState(false);
  const handleClose2 = () => setShowSubscribe2(false);
  const [showSubscribe3, setShowSubscribe3] = useState(false);
  const handleClose3 = () => setShowSubscribe3(false);
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Contenu: "", Reponse: "", Options: "", TypeQ: "", Hint: "", Score: "" }]);
  };
  const optionsCat = [
    { value: 'attack', label: 'Attack' },
    { value: 'defense', label: 'Defense' },
    { value: 'pentest', label: 'PenTest' }
  
  ]
  const optionsType = [
    { value: 'Facile', label: 'Facile' },
    { value: 'Moyenne', label: 'Moyenne' },
    { value: 'Difficile', label: 'Difficile' }
  
  ]
   /* let options = RessourcesList.map(function (RessourcesList) {
      return { value: RessourcesList.NomeRes, label: RessourcesList.NomeRes };
    })
   const renderList = () => {
      return (RessourcesList.map(data =>({label:RessourcesList.NomRes,value:RessourcesList.NomRes})))
     }
//console.log(RessourcesList);  };*/

//console.log(RessourcesList);


  const optionsScore = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' }
  
  ]

  const validationSchema = Yup.object().shape({
    NomCours: Yup.string().min(3).required("required"),
    NbQuestions: Yup.number().min(2).positive().required("required"),
    Description: Yup.string().required("required"),
    Temps: Yup.string().required("required"),
    Type: Yup.string().required("required"),
    Categorie: Yup.string().required("required"),
  });
    
    const API_URL = "http://localhost:8081/api/cours/";
    const API_URL2 = "http://localhost:8081/api/notif/";

    const history = useHistory();

  const  formik = useFormik({
    initialValues: {
      NomCours: "",
      NbQuestions: 0,
      Description: "",
      Temps: "",
      Type: "",
      Categorie: "",

    },
    validationSchema,
    onSubmit (values) {
      console.log('Logeddin');
      console.log({formik});
      try{
        axios.post(API_URL,{ 
         NomCours: formik.values.NomCours,
         Description: formik.values.Description,
         Categorie: formik.values.Categorie,
         Type: formik.values.Type,
         Temps: formik.values.Temps,
         NbQuestions: formik.values.NbQuestions

      }).then((res)=>{
        console.log(res)
        toast.success('Training Info ajouté');

        localStorage.setItem('nomcours', formik.values.NomCours);


      });

     /* axios.post(API_URL2,{ 
        Contenu: formik.values.NomCours,

     }).then((res)=>{
       console.log(res.data)

     });*/
      
  }
catch(err){
          console.log(err)   
  }

    }
  });

  const tags = ["one", "two", "three"];
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Informations</h5>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Nom du cours</Form.Label>
                <Form.Control  id="NomCours" name="NomCours" onChange={formik.handleChange}
            value={formik.values.NomCours} 
 required   type="text" placeholder="Enter le nom du cours" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Nombre des questions</Form.Label>
                <Form.Control   id="NbQuestions" name="NbQuestions" onChange={formik.handleChange}
            value={formik.values.NbQuestions} 
 required   type="number" placeholder="Enter le nombre des questions" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={9} className="mb-3">
            <Form.Group className="mb-3">
    <Form.Label>Description</Form.Label>
    <Form.Control   id="Description" name="Description"  onChange={formik.handleChange}
            value={formik.values.Description} 
   as="textarea" />
  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group >
                <Form.Label>Temps estimé</Form.Label>
                <Form.Control id="Temps" name="Temps" onChange={formik.handleChange}
            value={formik.values.Temps}  required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
          <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Difficulté</Form.Label>
                      <CustomSelect
        className='input' id="Type" name="Type"
        onChange={value=>formik.setFieldValue('Type',value.value)}
        value={formik.values.Type}
        options={optionsType}
        />          

              </Form.Group>
            </Col>

             <Col md={6} className="mb-3">
              <Form.Group >
                <Form.Label>Catégorie</Form.Label>

                <CustomSelect
        className='input' id="Categorie" name="Categorie"
        onChange={value=>formik.setFieldValue('Categorie',value.value)}
        value={formik.values.Categorie}
          options={optionsCat}
         
        />   
         

              </Form.Group>
            </Col>
          </Row>

          <Row>
          <Col sm={0} className="mb-3">
            <Button variant="tertiary" type="submit" >Confirmer</Button>
          </Col>
</Row>

      </Form>

          </Card.Body>

    </Card>
  );
};


export const Ressource = () => {

  const [RessourcesList, setRessourcesList] = useState([]);
  const [selectOptions,setState] = useState([]);
  const optionsRes = RessourcesList. map((res) => [
    { value: res.NomRes}
  ])
  const getressources = () => {
   return axios.get("http://localhost:8081/api/ressources/").then((response) => {
      setRessourcesList(response.data);
      const res =  response.data;
      return res;});
  };


  const getOptions2 = () =>{
    return axios.get("http://localhost:8081/api/ressources/").then((response) => {
      setRessourcesList(response.data);
      const res =  response.data;
    const options = res.map(d => ({
      "value" : d.NomRes,
      "label" : d.NomRes
    }))
    setState({selectOptions: options})
  });
  }
  const getOptions = async () =>{
    const res = await axios.get("http://localhost:8081/api/ressources/")
    const data = res.data

    const options = data.map(d => ({
      "value" : d.NomRes,
      "label" : d.NomRes
    }))
    setState({selectOptions: options})

  };
  const optionsRess = [
    { value: 'kali', label: 'Kali Linux' },
    { value: 'windows', label: 'Windows 10' },
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'IOS' }
  
  ]
  const API_URL = "http://localhost:8081/api/utilisation/";

  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange2 = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }
  const [OneTraining, setTrainList] = useState([]);
  const getTrainID = () => {
    axios.get(`http://localhost:8081/api/cours/stat/last`).then((response) => {
      setTrainList(response.data.IDCours);
  });
    };
    getTrainID();


  const onSubmit = () => {
    try{
      console.log(selectedValue);
      axios.post(API_URL,{ 
        IdCours: OneTraining,
        IdRes: selectedValue.IDRes,
        DateUtil: new Date(),
        Performance: 50

     }).then((res)=>{
       toast.success('utilisation ajouté');
     });
        }
          catch(e){

          }
  };

  
  return (
      <form method="post" >
                        <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
      <h5 className="my-4">Ressources</h5>
          <Row>
            <Col sm={9} className="mb-3">
            <Form.Group >
                
       <AsyncSelect
               cacheOptions
               defaultOptions  
               className='input' id="machine" name="machine"    
        value={selectedValue}
        getOptionLabel={e => e.NomRes}
       getOptionValue={e => e.NomRes}
        loadOptions={getressources}
        onInputChange={handleInputChange2}
        onChange={handleChange}
      />
              </Form.Group>
              </Col>
              <Col sm={2} className="mb-3">
            <Button onClick={onSubmit}>Submit</Button>
            </Col>

          </Row>
          
          </Card.Body></Card>

      </form>
  )
};










export const ResInfoForm = () => {
  const optionsRes = [
    { value: 'kali', label: 'Kali Linux' },
    { value: 'windows', label: 'Windows 10' },
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'IOS' }
  
  ]

  const validationSchema = Yup.object().shape({
    NomRes: Yup.string().required("required"),
   // OS: Yup.string().required("required"),
   // Description: Yup.string().required("required"),
   // Size: Yup.number().required("required"),
  });    
    const API_URL = "http://localhost:8081/api/ressources/";
    const history = useHistory();

  const  formik = useFormik({
    initialValues: {
      NomRes: "",
      Description: "",
      os: "",
      Size: 0
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit (values) {
      try{
        console.log('Logeddin');
        console.log({formik});
  
        axios.post(API_URL,{ 
         NomRes: formik.values.NomRes,
         Description: formik.values.Description,
         Size: formik.values.Size,
         OS: formik.values.OS

      }).then((res)=>{
        toast.success('ressource ajouté');
        history.push("/Ressources/ListeRessource");
      });
    
  }
catch(err){
          console.log(API_URL)
          console.log(err) 
  }
  }
  });

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Informations</h5>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={9} className="mb-3">
              <Form.Group id="NomCours">
                <Form.Label>Nom du Ressource</Form.Label>
                <Form.Control id="NomRes" name="NomRes" onChange={formik.handleChange}
            value={formik.values.NomRes} type="text" placeholder="Enter le nom du cours" />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="Temps">
                <Form.Label>Size</Form.Label>
                <Form.Control id="Size" name="Size" onChange={formik.handleChange}
            value={formik.values.Size} required type="number" placeholder="No." />
              </Form.Group>
            </Col>
         </Row><Row>
            <Col sm={12} className="mb-3">
            <Form.Group  className="mb-3">
    <Form.Label>Description</Form.Label>
    <Form.Control id="Description" name="Description" onChange={formik.handleChange}
            value={formik.values.Description} as="textarea" />
  </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center">
          <Col md={6} className="mb-3">
              <Form.Group id="Type">
                <Form.Label>OS</Form.Label>
                <CustomSelect
        className='input' id="OS" name="OS"
        onChange={value=>formik.setFieldValue('OS',value.value)}
        value={formik.values.os}
        options={optionsRes}
        />          
              </Form.Group>
            </Col>

          </Row>


          <Row>
          <Col sm={2} className="mb-3">
            <Button variant="tertiary" type="submit">Confirmer</Button>
          </Col>
</Row>

        </Form>

      </Card.Body>
    </Card>
  );
};


export const FileUploader = ({onSuccess}) => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
      setFiles(e.target.files)
  };
  const [OneTraining, setTrainList] = useState([]);
  const getTrainID = () => {
    axios.get(`http://localhost:8081/api/cours/stat/last`).then((response) => {
      setTrainList(response.data.IDCours);
  });
    };
    getTrainID();

  const onSubmit = (e) => {
      e.preventDefault();

      const data = new FormData();
      //const idt = axios.get("//localhost:8081/api/files/",).then();
      for(let i = 0; i < files.length; i++) {
          data.append('file', files[i]);
          console.log(files[i]);
          console.log(OneTraining);

          axios.post("//localhost:8081/api/files/",{ 
            Name: files[i].name,
            Size: files[i].size,
           // Path: files[i].Path,
            IDTraining: OneTraining,
   
         }).then((res)=>{
           console.log(res)
   
       //history.push("/dashboard/overview");
   
         });
   
      }
try{
      axios.post('//localhost:8081/upload', data).then((response) => {
              toast.success('Upload Success');
              onSuccess(response.data);
              console.log(response.data)

          }).catch((e) => {
              toast.error('Upload Error')
          })
          console.log('2',files);

        }
          catch(e){

          }
  };

  return (
      <form method="post"  onSubmit={onSubmit}>
                        <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
      <h5 className="mb-4">Upload Your Files</h5>

          <Row>
          <Col sm={10} className="mb-3">

          <div className="form-group files">
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       accept='.jpg,.png,.doc' multiple/>
            </div></Col>
            <Col sm={2} className="mb-3">
            <Button onClick={onSubmit}>Submit</Button>
            </Col>
          </Row></Card.Body></Card>

      </form>
  )
};


export const Preview = ({files}) => {
    return files.map((file) => <img style={{maxWidth: '200px'}} src={`//localhost:8081/api/${file.Name}`} alt={file.originalname}/>);
};
