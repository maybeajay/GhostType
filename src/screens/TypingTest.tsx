import { useEffect } from "react"
import MainComp from "../components/MainComp"
import useSessionStorage from "../hooks/useSessionStorage";
import { useNavigate } from "react-router";

const TypingTest = () => {
  const {retriveFromSession} = useSessionStorage();
  const userTime = retriveFromSession('userTime');
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userTime){
      navigate("/", {replace: true})
    } 
  }, [])
  return (
    <MainComp />
  )
}

export default TypingTest