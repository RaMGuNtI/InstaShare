import "./index.css"
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"10px"}}>
      <img src="https://res.cloudinary.com/dez8wfcvn/image/upload/v1751859556/erroring_1_ti7yvi.png" />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button onClick={() => navigate('/')}>Home Page</button>
    </div>
  );
}

export default PageNotFound