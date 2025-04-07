import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAccountBalance, fetchResellerBalance, fetchTopBalance } from '../../features/menu/menuSlice';

function DashboardMain() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
 

  async function fetchBalanceData() { 
    console.log("dash-----")
    if (user?.layer === "RESELLER") { 
      dispatch(fetchResellerBalance());
    }
    if (user?.layer === "ACCOUNT") { 
      dispatch(fetchAccountBalance());
    }
    if (user?.layer === "TOP") { 
      dispatch(fetchTopBalance());
    }
    
  }

  useEffect(() => {
    if (user?.layer === "RESELLER") {
      navigate("/dashboard-reseller");
    }
    if (user?.layer === "ACCOUNT") {
      navigate("/dashboard-account");
    }
    if (user?.layer === "TOP") {
      navigate("/dashboard");
    }
  }, [user]);

  useEffect(()=>{
    fetchBalanceData()
  },[user])
  
  return (
    <div>DashboardMain</div>
  )
}

export default DashboardMain