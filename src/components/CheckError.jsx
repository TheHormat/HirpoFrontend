import { useNavigate } from "react-router-dom";

function checkError(error) {
    const nav = useNavigate();
console.log(error)
  if (error === 401 || error === 403) {
    nav("/"); // Yetkilendirme hatası olduğunda "/login" sayfasına yönlendir
  }
}

export default checkError;
