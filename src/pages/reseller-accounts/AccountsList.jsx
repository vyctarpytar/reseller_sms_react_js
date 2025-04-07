import React, { useEffect, useState } from "react";
import InsideHeader from "../../components/InsideHeader";
import svg23 from "../../assets/svg/svg23.svg";
import svg25 from "../../assets/svg/svg25.svg";
import svg26 from "../../assets/svg/svg26.svg";
import { fetchReseller } from "../../features/reseller/resellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Skeleton } from "antd";
import { addSpaces, cashConverter, formatMoney } from "../../utils";
import AccountAddModal from "./AccountAddModal";
import { fetchResellerAccounts } from "../../features/reseller-account/resellerAccountSlice";
import { setResellerId } from "../../features/global/globalSlice";

function AccountsList() {
  const { resellerAccountData, loading } = useSelector(
    (state) => state.resellerAccount
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [prodd, setProdd] = useState();
  const [searchText, setSearchText] = useState("");

  const filteredData = searchText
  ? resellerAccountData?.filter((item) =>
      item?.accName?.toLowerCase().includes(searchText.toLowerCase())
    )
  : resellerAccountData;


  function fetchResellerAccountData() {
    dispatch(fetchResellerAccounts());
  }

  const handleAdd = async () => {
    await setProdd("");
    await showModal();
  };
  const handleEdit = async () => {
    showModal();
  };

  const handleRequest = async (item) => {
    // if (user?.layer === "ACCOUNT") {
    // } else {
    //   await dispatch(setResellerId(item));
    //   await navigate(-1);
    // }
  };

  useEffect(() => {
    fetchResellerAccountData();
  }, []);

  return (
    <>
      <div className="w-full overflow-y-scroll h-full">
        <InsideHeader
          title="Accounts"
          subtitle="Create and manage your accounts ready applications."
          back={false}
        />

        <div className="lg:px-10 px-3">
          <div className="mt-10 flex flex-col">
            <div className="product_request_title !text-[31px]">Accounts</div>
            <div className="product_sub  mt-[0.5rem] flex lg:flex-row flex-col justify-between">
              <span>Create and manage your accounts ready applications.</span> 
              <div className="flex items-center lg:w-[23%] w-full justify-end">
                    <Input
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search account name"
                      className="text-[16px] font-[400] flex-row-reverse"
                      prefix={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.2508 3.75C7.50609 3.75 4.47041 6.93997 4.47041 10.875C4.47041 14.81 7.50609 18 11.2508 18C14.9955 18 18.0312 14.81 18.0312 10.875C18.0312 6.93997 14.9955 3.75 11.2508 3.75ZM3.04297 10.875C3.04297 6.11154 6.71773 2.25 11.2508 2.25C15.7838 2.25 19.4586 6.11154 19.4586 10.875C19.4586 15.6385 15.7838 19.5 11.2508 19.5C6.71773 19.5 3.04297 15.6385 3.04297 10.875Z"
                            fill="#333333"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16.045 15.913C16.3237 15.6201 16.7756 15.6201 17.0543 15.913L21.3902 20.4693C21.6689 20.7622 21.6689 21.237 21.3902 21.5299C21.1115 21.8228 20.6596 21.8228 20.3809 21.5299L16.045 16.9737C15.7663 16.6808 15.7663 16.2059 16.045 15.913Z"
                            fill="#333333"
                          />
                        </svg>
                      }
                    />
                  </div>

            </div>
          </div>

          {loading ? (
            <Skeleton />
          ) : (
            <div className="mt-[1rem] flex flex-shrink flex-wrap w-full gap-y-[1rem] gap-x-[1rem]">
              {filteredData?.length > 0 &&
                filteredData?.map((item) => (
                  <div
                    onClick={() => setProdd(item)}
                    className="cursor-pointer"
                  >
                    <div className="product-card  min-h-[7.125rem] lg:w-[550px] w-full">
                      <div className="flex justify-between p-[.875rem]">
                        <div
                          className="flex items-center gap-x-5"
                          onClick={() => handleRequest(item?.accId)}
                        >
                          <div className={`w-[3.875rem] h-[3.875rem] flex justify-center items-center ${item?.accMsgBal < 50 ? 'bg-red' :'bg-darkGreen' }  rounded-full`}>
                            <img src={svg23} alt={svg23} />
                          </div>

                          <div className="flex flex-col  ">
                            <div className="reseller_card_title">
                              {item?.accName}
                            </div>
                            <div className="reseller_card_sub_title">
                              +{addSpaces(item?.accAdminMobile)}
                            </div>
                            <div className="reseller_card_sub_title">
                              {cashConverter(item?.accSmsPrice)} - Sms Bal:{" "}
                              {cashConverter(item?.accMsgBal)}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end" onClick={showModal}>
                          <img src={svg26} alt="svg26" />
                        </div>
                      </div>

                      <div className="bg-[#f4f4f5] p-[.875rem] flex flex-col">
                        <div className="reseller_card_title !text-[16px]">
                          Apps
                        </div>
                        <div className="reseller_card_sub_title">
                          This reseller has no apps
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {user?.layer != "ACCOUNT" && (
            <div
              className="product-card mb-10 !border-dashed mt-[1.875rem] min-h-[6.125rem] lg:w-[550px] w-full bg-[#f4f4f5] cursor-pointer"
              onClick={handleAdd}
            >
              <div className="flex items-center gap-x-5  p-[.875rem]">
                <div className="w-[3.875rem] h-[3.875rem] flex justify-center items-center bg-darkGreen rounded-full">
                  <img src={svg25} alt={"svg25"} />
                </div>

                <div className="reseller_card_title">New Account</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AccountAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        prodd={prodd}
      />
    </>
  );
}

export default AccountsList;
