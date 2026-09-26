import './Header.css'
import { useState, useRef, useEffect} from 'react';
import {notifications} from '../Arrays.jsx';
import deleteBtn from "../../assets/Header/delete.svg"

 const Notifications = () => {
    const [open, setOpen] = useState(false)
    
    const [notifi, setNotifi] = useState(notifications)


    const handleDelete = (id) => {
        setNotifi(prev => prev.filter(n => n.id !== id))
    }

    const handleClearAll = () => {
  setNotifi([]);
};    

        const rowRef = useRef(null);


    const markRead = (id) => {
        setNotifi(prev => 
            prev.map(n => 
            n.id === id ? {...n, isRead: true} : n))
    }


    const markAllRead = () => {
        setNotifi(prev => prev.map(n => ({...n, isRead: true}) ))
    }


    const markedDivs = notifi.filter(n => !n.isRead).length




    useEffect(() => {
  const handler = (e) => {
    if(rowRef.current && !rowRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  
  document.addEventListener('mousedown', handler)

  return () => document.removeEventListener('mousedown', handler)
}, []
) 

    return(
        <div className="Notifications-div" ref={rowRef} > <div onClick={() => setOpen(!open)}><span className="material-symbols-outlined" id="notifications">notifications</span> {markedDivs !== 0 && <span className="Notifications-count">{markedDivs}</span>}  </div>
        
         <div className={`Notifications-list ${open ? 'open' : ''}`}><div className='Notifications-items'> {notifi.length === 0 ? (<div className="Notifications-empty">No notifications yet</div>) : notifi.map((e) => (
            <div key={e.id} onClick={() => markRead(e.id)} className='Notifications-item'>
                <div className='Notifications-text-div'><span className='Notifications-text'>{e.text}</span></div><div className='button-div'>{!e.isRead &&  <span className='dot'></span>}<img src={deleteBtn} alt='delete' draggable={false} onClick={(ev) => {ev.stopPropagation(); handleDelete(e.id)}} className='delete-notifi'/></div>
            </div>
            ))} </div><div className='notifi-btns'>{notifi.length !== 0 && <div className='Clear' onClick={handleClearAll}>Clear all</div>}{markedDivs !== 0 && <div className='Clear' onClick={markAllRead}>Read all</div>}</div>
            </div>
        
        </div>
    )
}


export default Notifications