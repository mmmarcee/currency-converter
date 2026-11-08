import { useState } from 'react'
import { notifications } from '../Arrays.jsx'

export const useNotifications = () => {
  const [notifi, setNotifi] = useState(notifications)

  const handleDelete = (id) =>
    setNotifi(prev => prev.filter(n => n.id !== id))

  const handleClearAll = () => setNotifi([])

  const markRead = (id) =>
    setNotifi(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)))

  const markAllRead = () =>
    setNotifi(prev => prev.map(n => ({ ...n, isRead: true })))

  const unread = notifi.filter(n => !n.isRead).length

  return { notifi, unread, handleDelete, handleClearAll, markRead, markAllRead }
}