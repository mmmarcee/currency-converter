import './Header.css'
import { useState } from 'react';
import {notifications} from '../Arrays.jsx';
import deleteBtn from "../../assets/Header/delete.svg"

 const Notifications = () => {
    const [open, setOpen] = useState(false)
    
    const [notifi, setNotifi] = useState(notifications)


    const handleDelete = (id) => {
        setNotifi(prev => prev.filter(n => n.id !== id))
    }

    return(
        <div className="Notifications-div" > <div onClick={() => setOpen(!open)}><span className="material-symbols-outlined" id="notifications">notifications</span> <span className="Notifications-count">{notifi.length}</span>  </div>
        
        {open && (<div className='Notifications-list'><div className='Notifications-items'>{notifi.map((e) => (
            <div key={e.id} className='Notifications-item'>
                <div className='Notifications-text-div'><span className='Notifications-text'>{e.text}</span></div><div className='button-div'><span className='dot'></span><img src={deleteBtn} alt='delete' onClick={() => handleDelete(e.id)} className='delete-notifi'/></div>
            </div>
            ))} </div></div>)}
        
        </div>
    )
}


export default Notifications