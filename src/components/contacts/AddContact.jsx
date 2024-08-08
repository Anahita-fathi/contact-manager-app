import {COMMENT, PURPLE} from "../../helpers/color";
import AddNew from "../../assets/AddNew.png";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from '../../context/ContactContex'
import {useFormik, Formik, Form, Field, ErrorMessage} from 'formik'
import {contactSchema} from "../../valdations/contactValidation";

const AddContact = () => {
    const {groups, createContact, errors} = useContext(ContactContext)
    /*    const formik = useFormik({
            initialValues: {
                fullname: '',
                photo: '',
                mobile: '',
                email: '',
                job: '',
                group: ''
            },
            validationSchema: contactSchema,
            onSubmit: values => {
                console.log(values)
                createContact(values)
            }
        })*/
    return (
        <div>
            <div className='row align-items-center justify-content-center  my-4'>
                <h2 style={{color: PURPLE}}> ساخت مخاطب جدید </h2>
            </div>
            <div className='row align-items-center justify-content-center'>
                <div className='col mx-5'>
                    {/*            <div className='col-md-4'>
                        {errors?.map((error, index) => (
                            <p className='text-danger' key={index}>
                                {error?.message}
                            </p>
                        ))}

                    </div>*/}
                    <Formik
                        initialValues={{
                            fullname: '',
                            photo: '',
                            mobile: '',
                            email: '',
                            job: '',
                            group: ''
                        }}
                        validationSchema={contactSchema}
                        onSubmit={values => {
                            console.log(values)
                            createContact(values)
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
                                value="ساخت مخاطب"

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
                        src={AddNew}
                        alt='add New'
                        className='d-block m-auto'
                        style={{objectFit: 'contain', width: '600px'}}

                    />
                </div>
            </div>
        </div>
    )

}
export default AddContact;