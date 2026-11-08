import './Header.css'
import deleteBtn from "../../assets/Header/delete.svg"

const NotificationsPanel = ({ notifi, unread, onClose, onDelete, onClearAll, onRead, onReadAll }) => (
  <div className="notif">
    <header className="notif-header">
      <button className="notif-back" onClick={onClose} aria-label="Back">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="notif-title">Notifications</h1>
      {unread > 0 && <span className="notif-count">{unread} new</span>}
    </header>

    <ul className="notif-list">
      {notifi.length === 0 ? (
        <li className="notif-empty">No notifications yet</li>
      ) : (
        notifi.map((n) => (
          <li
            key={n.id}
            className={`notif-card ${n.isRead ? 'is-read' : ''}`}
            onClick={() => onRead(n.id)}
          >
            <span className="notif-dot" aria-hidden="true" />
            <span className="notif-text">{n.text}</span>
            <button
              className="notif-delete"
              aria-label="Delete notification"
              onClick={(ev) => { ev.stopPropagation(); onDelete(n.id) }}
            >
              <img src={deleteBtn} alt="" draggable={false} />
            </button>
          </li>
        ))
      )}
    </ul>

    {notifi.length > 0 && (
      <footer className="notif-bar">
        <button className="notif-btn notif-btn--secondary" onClick={onClearAll}>Clear all</button>
        {unread > 0 && (
          <button className="notif-btn notif-btn--primary" onClick={onReadAll}>Read all</button>
        )}
      </footer>
    )}
  </div>
)

export default NotificationsPanel