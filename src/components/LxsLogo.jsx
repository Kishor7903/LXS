import { useNavigate } from "react-router-dom";
import lxsLogo from "../assets/commonIcons/Logo.png";

function LxsLogo({className}) {
  let navigate = useNavigate();
  return (
    <>
      <img onClick={() => navigate("/shop")} src={lxsLogo} alt="" className={`min-h-2 cursor-pointer ${className}`} />
    </>
  )
}

export default LxsLogo
