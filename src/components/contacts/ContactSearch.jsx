import {PURPLE} from '../../helpers/color'
import {useContext} from "react";
import {ContactContext} from '../../context/ContactContex'

const ContactSearch = () => {
    const { searchContact} = useContext(ContactContext)
    return (
        <div className='input-group mx-2 w-75' dir='ltr'>
           <span className='input-group-text' id='basic-addon1'
                 style={{backgroundColor: PURPLE}}>

                                <i className="fas fa-search"></i>
              </span>
            <input
                dir='rtl'
                type='text'
                className='form-control'
                onChange={event => searchContact(event.target.value)}
                placeholder='جست و جو'
                aria-label='search'
                aria-describedby='basic-addon1'/>
        </div>
    )
}
export default ContactSearch;