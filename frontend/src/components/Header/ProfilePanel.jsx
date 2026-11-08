import { useState } from 'react'
import { currentUser } from '../Arrays.jsx'
import './Header.css'

const ProfilePanel = ({ onClose }) => {
  const [copied, setCopied] = useState(false)



  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(String(currentUser.id))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="prof">
      <header className="prof-header">
        <button className="prof-back" onClick={onClose} aria-label="Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="prof-title">Profile</h1>
      </header>

      <div className="prof-content">
        <div className="prof-avatar" />

        <button className="prof-id" onClick={copyId} aria-label="Copy user ID">
          <span>{currentUser.id}</span>
          <span className="material-symbols-outlined">
            {copied ? 'check' : 'content_copy'}
          </span>
        </button>

        <div className="prof-username">{currentUser.username}</div>

        <div className="prof-email">
          <span className="material-symbols-outlined">alternate_email</span>
          <div className="prof-email-info">
            <div className="prof-email-label">Email</div>
            <div className="prof-email-value">{currentUser.email}</div>
          </div>
        </div>

        <div className="prof-line" />

        <a href="settings" className="prof-btn">
          <span className="material-symbols-outlined">account_circle</span>
          Account Info
        </a>
        <a href="login" className="prof-btn">
          <span className="material-symbols-outlined">logout</span>
          Log out
        </a>
      </div>
    </div>
  )
}

export default ProfilePanel