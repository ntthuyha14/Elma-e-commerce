import queryString from 'query-string'

export const formattedNumber = (price) =>
    new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price)

export const formattedDate = (dateString) => {
    const dateNow = new Date(Date.parse(dateString)).toLocaleString('vi-VN', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
    // const s = dateNow.getSeconds();
    // const m = dateNow.getMinutes();
    // const h = dateNow.getHours();
    // const day = dateNow.getDate();
    // const month = dateNow.getMonth() + 1;
    // const year = dateNow.getFullYear();
    // const formattedDate = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} - ${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    return dateNow
}
export const getIdFromUrl = () => {
    const id = queryString.parse(window.location.search)
    return id.id
}
