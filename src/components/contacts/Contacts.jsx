// Colors
import {ORANGE, PINK} from '../../helpers/color'
import Contact from "./Contact";
import Spinner from "../Spinner";
import {Link} from 'react-router-dom'
import {useContext} from "react";
import {ContactContext} from '../../context/ContactContex'

const Contacts = () => {
    const {contacts,filteredContacts,loading, deleteContact} = useContext(ContactContext)
    return (<>
        <section className='container'>
            <div className='grid my-4'>
                <div className='row'>
                    <div className='col'>
                        <p className='h3 float-end'>
                            <Link to='/contacts/add' className='btn mx-2' style={{backgroundColor: PINK}}>
                                مخاطب جدید
                                <i className='fa fa-plus-circle mx-2'></i>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section className='container'>
            <div className='grid'>
                {loading ? <Spinner/> :

                    <div className='row'>
                        {
                            filteredContacts.length > 0 ? filteredContacts.map((contact) => <Contact
                                key={contact.id}
                                contact={contact}
                                confirmAlertDelete={() => deleteContact(contact.id, contact.fullname)}
                            />) : (
                                <div className='text-center py-5'>
                                    <p className='h3' style={{color: ORANGE}}>
                                        مخاطب یافت نشد
                                    </p>
                                    <img className='w-50' src={require('../../assets/no-found.gif')} alt='Not Fund'/>
                                </div>
                            )
                        }

                    </div>
                }
            </div>
        </section>


    </>)
}
export default Contacts;