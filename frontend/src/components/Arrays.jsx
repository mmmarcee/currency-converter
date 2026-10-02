import usa from "../assets/Converter/usa.png"
import ru from "../assets/Converter/ru.png"
import au from "../assets/Converter/au.png"
import gb from "../assets/Converter/gb.png"
import ca from "../assets/Converter/ca.png"
import cn from "../assets/Converter/cn.png"
import eu from "../assets/Converter/eu.png"
import nz from "../assets/Converter/nz.png"
import ch from "../assets/Converter/ch.png"
import jp from "../assets/Converter/jp.png"




export const currencies = [
{ code: 'USD', img: usa, symbol: '$' },
  { code: 'RUB', img: ru, symbol: '₽' },
  { code: 'AUD', img: au, symbol: 'A$' },
  { code: 'GBP', img: gb, symbol: '£' },
  { code: 'CAD', img: ca, symbol: 'C$' },
  { code: 'CNY', img: cn, symbol: '¥' },
  { code: 'EUR', img: eu, symbol: '€' },
  { code: 'NZD', img: nz, symbol: 'N$' },
  { code: 'CHF', img: ch, symbol: 'Fr' },
  { code: 'JPY', img: jp, symbol: '¥' },
];


export const notifications = [
{ id: 1 , text: "USD rose above 95₽" , isRead: false },
{ id: 2, text: "EUR fell below 100₽", isRead: false },
{ id: 3, text: "BTC broke through $70,000", isRead: false },
{ id: 4, text: "CNY reached 13₽", isRead: false },
{ id: 5, text: "Gold hit a new high of $2,400", isRead: false },
{ id: 6, text: "Oil dropped below $80 per barrel", isRead: false },
{ id: 7, text: "ETH climbed above $3,500", isRead: false },
{ id: 8, text: "S&P 500 closed above 5,200", isRead: false },
{ id: 9, text: "Natural gas fell below $1.80", isRead: false },
{ id: 10, text: "Silver rose above $28", isRead: false },
{ id: 11, text: "Nikkei 225 surpassed 40,000", isRead: false }
];




export const currentUser = {
  id: 1938298,
  username: 'mmmarcee',
  email: '67xqi@example.com',
};





export const users = [
  {
    id: 1,
    name: 'Иван Иванов',
    username: 'ivan_dev',
    email: 'ivan@example.com',
    avatar: 'https://example.com/avatars/1.png',
    status: 'online',           
    role: 'admin',              
    isVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastSeen: '2025-09-26T14:00:00Z',
  },
  {
    id: 2,
    name: 'Мария Петрова',
    username: 'masha_p',
    email: 'maria@example.com',
    avatar: 'https://example.com/avatars/2.png',
    status: 'offline',
    role: 'user',
    isVerified: false,
    createdAt: '2024-03-22T15:45:00Z',
    lastSeen: '2025-09-25T18:20:00Z',
  },
  {
    id: 3,
    name: 'Пётр Сидоров',
    username: 'petr_s',
    email: 'petr@example.com',
    avatar: 'https://example.com/avatars/3.png',
    status: 'away',
    role: 'user',
    isVerified: true,
    createdAt: '2024-06-10T09:00:00Z',
    lastSeen: '2025-09-26T12:15:00Z',
  },
];