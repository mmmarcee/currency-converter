import down from "../../assets/Header/keyboard_arrow_down_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
import { useState, useRef, useEffect} from "react"
import {currentUser} from '../Arrays.jsx';



const Profile = () => {

 const [open , setOpen] = useState(false)
    function copyText(text) {
  navigator.clipboard.writeText(text);
}

 const rowRef = useRef(null);

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
    return (
        <div className="Profile_div" ref={rowRef} >
         <span className="Avatar"/><span className="Online"/> <img src={down} alt="svgfile" className="down" onClick={() => setOpen(!open)} ></img>
         
         <div className={`profile-list ${open ? 'open' : ''}` }>
            <div className="Avatar-list"></div>
           <div className="userId-div" onClick={copyText(currentUser.id)}> <div className="userId">{currentUser.id}</div><span id="copy" className="material-symbols-outlined">content_copy</span></div>
           <div className="username" >{currentUser.username}</div>
           <div className="email-div">
            <div className="emailIcon"><span className="material-symbols-outlined" id="emailIco">alternate_email</span></div>
           <div className="email-info"> <div className="email-label">Email</div><div>{currentUser.email}</div></div>
           </div>
           <div className="line"/>
           <a href="#" className="account-btn"><span className="material-symbols-outlined">account_circle</span><span className="account-label">Account Info</span></a>
            <a href="#" className="account-btn"><span className="material-symbols-outlined">logout</span><span className="account-label">Log out</span></a>
        </div>

         </div>
    )
}

export default Profile