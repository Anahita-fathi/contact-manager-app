import {COMMENT, PURPLE} from "../../helpers/color";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getContact, updateContact} from "../../services/contactService";
import {useContext} from "react";
import {ContactContext} from '../../context/ContactContex'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import {contactSchema} from "../../valdations/contactValidation";


const EditContact = () => {
    const {contacts, setFilteredContacts, setContacts, setLoading, groups} = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const navigate = useNavigate();
    const {contactId} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const {data: contactData} = await getContact(contactId)
                setLoading(false)
                setContact(contactData)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        fetchData();
    }, []);


    const setUpdateContact = async values => {
       // event.preventDefault()
        try {
            const {data} = await updateContact(contactId, values);
            setLoading(true)
            if (data) {
                setLoading(false)
                const allContacts = [...contacts]
                const updatedContactIndex = allContacts.findIndex(c => c.id === parseInt(contactId))
                allContacts[updatedContactIndex] = {...contact}
                setContacts(allContacts)
                setFilteredContacts(allContacts)
                navigate('/contacts')
            }

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <div>
            <div className='row align-items-center justify-content-center  my-4'>
                <h2 style={{color: PURPLE}}> ویرایش مخاطب  </h2>
                <h2 style={{color: PURPLE}}> {contact.fullname} </h2>
            </div>
            <div className='row align-items-center justify-content-center'>
                <div className='col mx-5'>
                    <Formik
                        enableReinitialize
                        initialValues={contact}
                        validationSchema={contactSchema}
                        onSubmit={values => {
                            console.log(values)
                            setUpdateContact(values)
                        }}
                    >
                        <Form>
                            <Field
                                name="fullname"
                                type="text"
                                className="form-control mb-3"
                                placeholder="نام و نام خانوادگی"
                                // required={true}
                            />
                            <ErrorMessage
                                name="fullname"
                                render={(msg) => (
                                    <div className='text-danger'>{msg}</div>
                                )}
                            />
                            <Field
                                name="photo"
                                type="text"
                                className="form-control mb-3"
                                placeholder="آدرس تصویر"
                                // required={true}
                            />
                            <ErrorMessage
                                name="photo"
                                render={(msg) => (
                                    <div className='text-danger'>{msg}</div>
                                )}
                            />

                            <Field
                                name="mobile"
                                type="number"
                                className="form-control mb-3"
                                placeholder="شماره موبایل"
                                // required={true}
                            />
                            <ErrorMessage
                                name="mobile"
                                render={(msg) => (
                                    <div className='text-danger'>{msg}</div>
                                )}
                            />
                            <Field
                                type="email"
                                name="email"
                                className="form-control mb-3"
                                //required={true}
                                placeholder="آدرس ایمیل"
                            />
                            <ErrorMessage
                                name="email"
                                render={(msg) => (
                                    <div className='text-danger'>{msg}</div>
                                )}
                            />
                            <Field                                id='job'
                                                                  type="text"
                                                                  name="job"
                                                                  className="form-control mb-3"
                                // required={true}
                                                                  placeholder="شغل"
                            />
                            <ErrorMessage
                                name="job"
                                render={(msg) => (
                                    <div className='text-danger'>{msg}</div>
                                )}
                            />
                            <Field
                                name="group"
                                as="select"
                                className="form-control mb-3">
                                >
                                <option value=''>انتخاب گروه</option>
                                {groups.length > 0 &&
                                    groups.map((group) => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage
                                name="group"
                                render={(msg) => (
                                    <div className='text-danger'>{msg}</div>
                                )}
                            />

                            {/*     <button type='submit' className='btn mx-2' style={{backgroundColor: PURPLE}}>افزودن
                            <i className='fa fa-plus-circle mx-2'></i>
                        </button>*/}
                            <input
                                type="submit"
                                className="btn"
                                style={{backgroundColor: PURPLE}}
                                value="ویرایش مخاطب"

                            >

                            </ input>
                            <Link
                                to={"/contacts"}
                                className="btn mx-2"
                                style={{backgroundColor: COMMENT}}
                            >
                                انصراف
                            </Link>
                        </Form>
                    </Formik>
                </div>
                <div className='col'>
                    <img
                        src={contact.photo}
                        alt='add New'
                        className='d-block m-auto'
                        style={{objectFit: 'contain', width: '400px'}}

                    />
                </div>
            </div>
        </div>
    )
}
export default EditContact;