import React, { useEffect } from "react";
import withdrawal from "../../assets/svg/withdrawalSvg.svg";
import svg46 from "../../assets/svg/svg46.svg";
import { useActionData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../../features/billing/billingSlice";
import { Skeleton } from "antd";
import { cashConverter } from "../../utils";

function WithdrawalHeader() {
  const navigate =  useNavigate()
  const dispatch = useDispatch()

   const handleWithdraw = ()=>{
    navigate('/withdrawal-page')
   }
   const {loading,billsData} =  useSelector((state)=>state.billing) 
 


  async function fetchBillsData() {
    await dispatch(fetchBills());
  }

  useEffect(() => {
    fetchBillsData();
  }, []);
  return (
    <div className="report-card  h-auto w-full p-3 mt-3">
      <div className="product_sub !text-[18px]">Available Amount</div>
      <div className="flex items-center justify-between mt-2">
        {
          loading ? (
            <Skeleton  paragraph={{ rows: 1, width: '50px' }} />
          ) : (
            <div className="text-[#222222] font-[600] text-[25px]">
              {billsData?.[0]?.walAmount ? cashConverter(billsData?.[0]?.walAmount) :"KES 0"}
          </div>
          )
        }
   
        <div className="w-[230px]">
          <button
            key="submit"
            type="submit"
            className="cstm-btn flex items-center gap-x-2 !rounded-[10px]"
            style={{ boxShadow: "0 4px 0 0 #2A662C" }}
            onClick={handleWithdraw}
          >
            <img src={withdrawal} alt="withdrawal" /> Withdraw Earnings
          </button>
        </div>
      </div>
      <div className="mt-5 bg-[#F5F5F5] p-2 rounded-[8px] flex items-center gap-x-2">
        <img src={svg46} alt="svg46" />
        Earnings update is expected within 30 to 60 min following the users
        purchase of the product
      </div>
    </div>
  );
}

export default WithdrawalHeader;
