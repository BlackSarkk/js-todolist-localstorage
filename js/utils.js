
const getDate = () => {
  const d = new Date();

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // months 0–11
  const year = String(d.getFullYear()).slice(-2);

  let hours = d.getHours();           // 0–23
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12;           // convert to 1–12
  const hourStr = String(hours);      // no leading zero unless you prefer

  return `${day}/${month}/${year} | ${hourStr}:${minutes} ${ampm}`;
};
export { getDate } 



const STORAGE_KEY = "myNotes";

export function getNotes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}