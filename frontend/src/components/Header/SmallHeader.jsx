import { useState , useEffect , useRef} from "react";
import NotificationsPanel from "./NotificationsPanel";
import { useNotifications } from "./useNotifications";
import ProfilePanel from "./ProfilePanel";
const SmallHeader = () => {


const [now, setNow] = useState(new Date());
const [notifOpen, setNotifOpen] = useState(false)
const [menuOpen, setMenuOpen] = useState(false)
const [profileOpen, setProfileOpen] = useState(false)
const { notifi, unread, handleDelete, handleClearAll, markRead, markAllRead } = useNotifications()

    useEffect(() => {
        let timeoutId;

        const tick = () => {
            const current = new Date();
            setNow(current);
           
            timeoutId = setTimeout(tick, 1000 - current.getMilliseconds());
        };

        tick();
        return () => clearTimeout(timeoutId);
    }, []);

 const rowRef = useRef(null);

     useEffect(() => {
  const handler = (e) => {
    if(rowRef.current && !rowRef.current.contains(e.target)){
      setMenuOpen(false)
    }
  }
  
  document.addEventListener('mousedown', handler)

  return () => document.removeEventListener('mousedown', handler)
}, []
) 
    return(
    <>
        <div className="SmallHeader">
            <button className="OtherBtn"  onClick={() => setMenuOpen(!menuOpen)}>
                <span className="material-symbols-outlined">
menu
</span>{unread > 0 && <span className="Notifi-count-dot"></span>}
            </button>

            <span className="time-small-now">
                 {now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </span>
            
           <ul  ref={rowRef} className={`small-header-ul ${menuOpen ? "open" : ""}`}>
            <li className="small-header-li" onClick={() => setProfileOpen(true)}>
    <span className="material-symbols-outlined">person</span> Profile
</li>
            <li className="small-header-li" onClick={() => setNotifOpen(true)} id="notifi-li">
    <span className="material-symbols-outlined">notifications</span> Notifications
    {unread > 0 && <span className="Notifi-count">{unread}</span>}
</li>
        </ul>

           
        </div>
           
{notifOpen && (
  <NotificationsPanel
    notifi={notifi}
    unread={unread}
    onClose={() => setNotifOpen(false)}
    onDelete={handleDelete}
    onClearAll={handleClearAll}
    onRead={markRead}
    onReadAll={markAllRead}
  />
)}
{profileOpen && <ProfilePanel onClose={() => setProfileOpen(false)} />}
   </>
  
    )
}

export default SmallHeader