import './App.css';
import Navbar from "./components/Navbar";
import {Contacts, AddContact, EditContact, ViewContact} from "./components";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import {confirmAlert} from 'react-confirm-alert'
import {getContacts, getGroups, createContact, deleteContact} from './services/contactService'
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE} from "./helpers/color";
import {ContactContext} from './context/ContactContex'
import {useImmer} from 'use-immer'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
    const [contacts, setContacts] = useImmer([])
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)
    const [filteredContacts, setFilteredContacts] = useImmer([])
    const [contact, setContact] = useState({})
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    let setTimeoutFilter = [];
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: contactData} = await getContacts()
                const {data: groupData} = await getGroups()
                setContacts(contactData)
                setFilteredContacts(contactData)
                setGroups(groupData)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }

        }
        fetchData()

    }, []);
    const onContactChange = (event) => {
        setContact({...contact, [event.target.name]: event.target.value})
    }
    const setCreateNewContact = async values => {
        try {
            setLoading((perv) => !perv)
            // await contactSchema.validate(contact, {abortEarly:false});
            const {status, data} = await createContact(values);

            if (status === 201) {
                setContacts([])
                //const allContacts = [...contacts, data];
                setContacts((draft) => {
                    draft.push(data)
                })
                setFilteredContacts((draft) => {
                    draft.push(data)
                })
                // setContacts(allContacts)
                // setFilteredContacts(allContacts)
                setLoading((perv) => !perv)
                setContact({})
                setErrors([])
                navigate('/contacts')
                toast.success('با موفقیت ذخیره شد...')
            }
        } catch (err) {
            console.log(err)
            console.log(err.message)
            console.log(err.inner)
            setErrors(err.inner)
            setLoading((perv) => !perv)
        }
    }
    const removeContact = async (contactId) => {
        try {
            debugger
            setLoading(true)
            const response = await deleteContact(contactId)
            if (response) {
                const {data: contactData} = await getContacts()
                setContacts(contactData)
                setFilteredContacts(contactData)

                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert(
            {
                customUI: ({onClose}) => {
                    return (
                        <div dir='rtl'
                             style=
                                 {{
                                     backgroundColor: CURRENTLINE,
                                     border: `1px solid ${PURPLE}`,
                                     borderRadius: '1em',
                                     width: '500px'
                                 }}
                             className='p-4'
                        >
                            <h3 style={{color: FOREGROUND}}>پاک کردن مخاطب</h3>
                            <p>آیا مخوای {contactFullName} پاک کنی ؟</p>
                            <button className="btn mx-2" style={{backgroundColor: PURPLE}} onClick={() => {
                                removeContact(contactId)
                                onClose()
                            }}> مطمعن هستم
                            </button>
                            <button onClick={onClose} className="btn" style={{backgroundColor: COMMENT}}>انصراف</button>
                        </div>)
                }
            }
        );
    }
    const searchContact = (query) => {

        clearTimeout(setTimeoutFilter);
        if (!query) return setFilteredContacts(...contacts)
        setTimeout(() => {
            setFilteredContacts(contacts.filter((contact) => {
                return contact.fullname.toString().toLowerCase().includes(query.toLowerCase())
            }))
        }, 1000)


    }

    return (
        <ContactContext.Provider value={{
            loading: loading,
            setLoading: setLoading,
            contact: contact,
            setContact: setContact,
            errors: errors,
            contacts: contacts,
            setContacts: setContacts,
            filteredContacts: filteredContacts,
            setFilteredContacts: setFilteredContacts,
            groups: groups,
            onContactChange: onContactChange,
            deleteContact: confirmDelete,
            createContact: setCreateNewContact,
            searchContact: searchContact
        }}>
            <div className="App">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                    <Route path="/contacts/view/:contactId" element={<ViewContact/>}/>>
                </Routes>

            </div>
        </ContactContext.Provider>

    );
}

export default App;
