import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEye} from '@fortawesome/free-solid-svg-icons';
import { CoursInfoForm } from "../../components/Forms";
import { FileUploader } from "../../components/Forms";
import { Ressource } from "../../components/Forms";

import { QuestionForm } from "../../components/QuestionForm";
import { Formik, Form, Field, FieldArray, ErrorMessage,useFormik } from 'formik';
import * as Yup from 'yup';
import { Col, Row, Card, Button, InputGroup,Modal,Breadcrumb } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import  axios  from 'axios';

export default () => {
  const initialValues = {
    numberOfQuestions: '',
    questions: []
};


const validationSchema = Yup.object().shape({
    numberOfQuestions: Yup.string()
        .required('Number of questions is required'),
        questions: Yup.array().of(
        Yup.object().shape({
          Contenu: Yup.string()
                .required('Name is required'),
                Reponse: Yup.string()
                .required('reponse is required'),
                TypeQ: Yup.string()
                .required('type is required'),
                Score: Yup.string()
                .required('score is required')

        })
    )
});

const onChangeQuestions= (e, field, values, setValues) =>{
    // update dynamic form
    const questions = [...values.questions];
    const numberOfQuestions = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < numberOfQuestions) {
        for (let i = previousNumber; i < numberOfQuestions; i++) {
          questions.push({ Contenu: '', Reponse: '' ,Options:'',Hint:'',TypeQ:'',Score:''});
    } }
    else {
        for (let i = previousNumber; i >= numberOfQuestions; i--) {
          questions.splice(i, 1);
        }
    }
    setValues({ ...values, questions });

    // call formik onChange method
    field.onChange(e);
    localStorage.setItem('questions',values);

}
const API_URL2 = "http://localhost:8081/api/questions/";
const NomCours = localStorage.getItem('nomcours');
const [UserList, setUserList] = useState([]);
const getUser = (NomCours) => {
  axios.get(`http://localhost:8081/api/cours/train/${NomCours}`).then((response) => {
    setUserList(response.data);
    console.log(UserList);

  });

};

const [OneTraining, setTrainList] = useState([]);
const getTrainID = () => {
  axios.get(`http://localhost:8081/api/cours/stat/last`).then((response) => {
    setTrainList(response.data.IDCours);
});
  };
  getTrainID();

const onSubmit=(fields)=> {
  var questions 

    // display form field values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    console.log('questions20',fields.numberOfQuestions);

    const questions20 = localStorage.getItem('questions');
    getUser(NomCours);

    for( let i = 0; i < fields.numberOfQuestions; i++){

    try{
        

    axios.post(API_URL2,{ 
      Contenu: fields.questions[i].Contenu,
      Reponse: fields.questions[i].Reponse,
      Options: fields.questions[i].Options,
      TypeQ: fields.questions[i].TypeQ,
      Hint: fields.questions[i].Hint,
      Score: fields.questions[i].Score,
      IDTraining: OneTraining
   }).then((res)=>{
     console.log(res.data)

   });

 

} 
catch(err){
  console.log(API_URL2)

  console.log(err)

}

}

}
    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>ANSI AdminSpace</Breadcrumb.Item>
            <Breadcrumb.Item active>Ajouter Training</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Ajouter Training</h4>
          <p className="mb-0">
          </p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
        <Button variant="primary" size="sm">
            <FontAwesomeIcon icon={faEye} className="me-2" /> Voir Liste
        </Button>
         </div>

        </div>
  <div>
            <CoursInfoForm />
            <Ressource />

            <FileUploader />

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="bg-white shadow-sm mb-4">
                        <h5 className="card-header">Add Questions</h5>
                        <div className="card-body border-bottom">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Number of Questions</label>
                                    <Field name="numberOfQuestions">
                                    {({ field }) => (
                                        <select {...field} className={'form-control' + (errors.numberOfQuestions && touched.numberOfQuestions ? ' is-invalid' : '')} onChange={e => onChangeQuestions(e, field, values, setValues)}>
                                            <option value=""></option>
                                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                    </Field>
                                    <ErrorMessage name="numberOfQuestions" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                        </div>
                        <FieldArray name="questions">
                        {() => (values.questions.map((question, i) => {
                            const questionsErrors = errors.questions?.length && errors.questions[i] || {};
                            const questionTouched = touched.questions?.length && touched.questions[i] || {};
                            return (
                                <div key={i} className="list-group list-group-flush">
                                    <div className="list-group-item">
                                        <h5 className="card-title">Question {i + 1}</h5>
                                        <div className="form-row">
                                        <Row>
            <Col sm={6} className="mb-3">

                                                <label>Scénario</label>
                                                <Field name={`questions.${i}.Contenu`} as="textarea" className={'form-control' + (questionsErrors.Contenu && questionTouched.Contenu ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`questions.${i}.Contenu`} component="div" className="invalid-feedback" />
                                            </Col>
                                            <Col sm={6} className="mb-3">

    <label>Reponse</label>
    <Field name={`questions.${i}.Reponse`} as="textarea" className={'form-control' + (questionsErrors.Reponse && questionTouched.Reponse ? ' is-invalid' : '' )} />
    <ErrorMessage name={`questions.${i}.Reponse`} component="div" className="invalid-feedback" />
</Col>
</Row>
<Row>
            <Col sm={6} className="mb-3">

                                                <label>Options</label>
                                                <Field name={`questions.${i}.Options`} type="text" className={'form-control' + (questionsErrors.Options && questionTouched.Options ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`questions.${i}.Options`} component="div" className="invalid-feedback" />
                                            </Col>
                                            <Col sm={6} className="mb-3">

                                            <label>TypeQ</label>
                                    <Field name={`questions.${i}.TypeQ`}>
                                    {({ field }) => (
                                        <select {...field} className={'form-control' + (questionsErrors.TypeQ && questionTouched.TypeQ ? ' is-invalid' : '' )} >
                                            <option value=""></option>
                                            {["Complet","Seul Choix","Choix Multiple"].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                    </Field>
                                    <ErrorMessage name={`questions.${i}.TypeQ`} component="div" className="invalid-feedback" />
</Col>

</Row>


<Row>
<Col sm={6} className="mb-3">

<label>Hint</label>
<Field name={`questions.${i}.Hint`} type="text" className={'form-control' + (questionsErrors.Hint && questionTouched.Hint ? ' is-invalid' : '' )} />
<ErrorMessage name={`questions.${i}.Hint`} component="div" className="invalid-feedback" />
</Col>

                                            <Col sm={6} className="mb-3">
                                            <label>Score</label>
                                    <Field name={`questions.${i}.Score`}>
                                    {({ field }) => (
                                        <select {...field} className={'form-control' + (questionsErrors.Score && questionTouched.Score ? ' is-invalid' : '' )} >
                                            <option value=""></option>
                                            {[5,10,15,16].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                    </Field>
                                    <ErrorMessage name={`questions.${i}.Score`} component="div" className="invalid-feedback" />

</Col>
</Row>


                                        </div>
                                    </div>
                                </div>
                            );
                        }))}
                        </FieldArray>
                        <div className="card-footer text-center border-top-0">
                            <button type="submit" className="btn btn-primary mr-1">
                                Save Questions
                            </button>
                            <button className="btn btn-secondary mr-1" type="reset">Reset</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>

        </div>
      </>
    );
  };
  