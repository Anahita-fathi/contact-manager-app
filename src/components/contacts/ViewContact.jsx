import {Link, useParams} from "react-router-dom";
import {BACKGROUND, CURRENTLINE, FOREGROUND, PURPLE} from "../../helpers/color";
import {useEffect, useState} from "react";
import {getContact, getGroup} from '../../services/contactService'
import contact from "./Contact";
import Spinner from "../Spinner";


const ViewContact = () => {
    const [state, setState] = useState({
        contact: {},
        group: {},
        loading: false
    })
    const {contactId} = useParams();
    useEffect(() => {
        const fetechData = async () => {
            setState({...state, loading: true})
            try {
                const {data: contactData} = await getContact(contactId)
                const {data: groupData} = await getGroup(contactData.group)
                setState({...state, contact: contactData, group: groupData, loading: false})

            } catch (err) {
                console.log(err)
                setState({...state, loading: false})

            }
        }
        fetechData();
    }, []);
    const {contact, group, loading} = state;

    return (

        <div>
            <div className='container'>
                <div className="row justify-content-start">
                    <div className='col-3 my-4'>
                        <Link to='/contacts' className="btn my-1" style={{backgroundColor: PURPLE}}>
                            <i className="fa fa-arrow-circle-right"/> بازگشت
                        </Link>
                    </div>
                </div>
                {loading ? <Spinner/> :
                    Object.keys(contact).length > 0 && (<div className="row justify-content-start p-3" style={{
                        backgroundColor: CURRENTLINE,
                        border: `1px solid ${PURPLE}`,
                        borderRadius: '1rem'
                    }}>
                        <div className='col-4 mb-2'>
                            <h3 style={{color: FOREGROUND}}> اطلاعات مخاطب</h3>

                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <img
                                    src={contact.photo}
                                    alt={contact.fullname}
                                    className="img-fluid rounded"
                                />
                            </div>
                            <div className='col-8'>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <span>نام و نام خانوادگی: </span>
                                        <span>{contact.fullname}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span>موبایل: </span>
                                        <span>{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span>ایمیل: </span>
                                        <span>{contact.email}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span> شغل:</span>
                                        <span>{contact.job}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span>گروه:</span>
                                        <span>{group.name}</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>)
                }
            </div>
        </div>

    )
}
export default ViewContact;