import ContactSearch from "./contacts/ContactSearch";
import {useLocation} from 'react-router-dom'
// Colors
import {BACKGROUND, PURPLE} from '../helpers/color.js'

const Navbar = () => {
    const location = useLocation()
    return (
        <nav className='navbar navbar-dark navbar-expand-sm shadow-lg' style={{backgroundColor: BACKGROUND}}>
            <div className='container'>
                <div className='row w-100'>
                    <div className='col'>
                        <div className='navbar-brand'>
                            <i className='fas fa-id-badge' style={{color: PURPLE}}/>{" "}
                            اپ مخاطبین {" "}
                            <span style={{color: PURPLE}}>مخاطبین</span>
                        </div>

                    </div>
                    {location.pathname === '/contacts' ? <div className='col'>
                        <ContactSearch />

                    </div> : null}


                </div>
            </div>
        </nav>
    )
}
export default Navbar;