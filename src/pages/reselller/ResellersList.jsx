import React, { useEffect, useState } from "react";
import InsideHeader from "../../components/InsideHeader";
import svg23 from "../../assets/svg/svg23.svg";
import svg25 from "../../assets/svg/svg25.svg";
import svg26 from "../../assets/svg/svg26.svg";
import ResellerAddModal from "./ResellerAddModal";
import { fetchReseller } from "../../features/reseller/resellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { addSpaces, formatMoney } from "../../utils";
import { setResellerId } from "../../features/global/globalSlice";

function ResellersList() {
  const { resellerData, loading } = useSelector((state) => state.reseller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [prodd, setProdd] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [preview, setPreview] = useState(null);

  function fetchResellerData() {
    dispatch(fetchReseller());
  }

  const handleAdd = async () => {
    await setProdd("");
    await showModal();
    await setPreviewUrl("");
    await setPreview(null);
  };
  const handleEdit = async () => {
    showModal();
  };

  const handleRequest = async (item) => {
    await dispatch(setResellerId(item));
    await navigate("/product-request-list");
  };

  useEffect(() => {
    fetchResellerData();
  }, []);

  return (
    <>
      <div className="w-full overflow-y-scroll h-full">
        <InsideHeader
          title="Resellers"
          subtitle="Create and manage your resellers ready applications."
          back={false}
        />

        <div className="lg:px-10 px-3">
          <div className="mt-10 flex flex-col">
            <div className="product_request_title !text-[31px]">Resellers</div>
            <div className="product_sub  mt-[0.5rem]">
              Use this page to create and manage your resellers.
            </div>
          </div>

          {loading ? (
            <Skeleton />
          ) : (
            <div className="mt-[1rem] flex flex-shrink flex-wrap w-full gap-y-[1rem] gap-x-[1rem]">
              {resellerData?.length > 0 &&
                resellerData?.map((item) => (
                  <div
                    onClick={() => setProdd(item)}
                    className="cursor-pointer"
                  >
                    <div
                      className="product-card  min-h-[6.125rem] lg:w-[550px] w-full"
                      // onClick={()=>handleRequest(item?.rsId)}
                    >
                      <div className="flex justify-between p-[.875rem]">
                        <div className="flex items-center gap-x-5">
                          <div className="w-[3.875rem] h-[3.875rem] flex justify-center items-center bg-darkGreen rounded-full">
                            <img src={svg23} alt={svg23} />
                          </div>

                          <div className="flex flex-col  ">
                            <div className="reseller_card_title">
                              {item?.rsCompanyName}
                            </div>
                            <div className="reseller_card_sub_title">
                              + {addSpaces(item?.rsPhoneNumber)}
                            </div>
                            <div className="reseller_card_sub_title">
                              Unit price: {formatMoney(item?.rsSmsUnitPrice)} -
                              Balance:{formatMoney(item?.rsMsgBal)}
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

          <div
            className="product-card !border-dashed mt-[1.875rem] mb-[1.875rem] min-h-[6.125rem] lg:w-[550px] w-full bg-[#f4f4f5] cursor-pointer"
            onClick={handleAdd}
          >
            <div className="flex items-center gap-x-5  p-[.875rem]">
              <div className="w-[3.875rem] h-[3.875rem] flex justify-center items-center bg-darkGreen rounded-full">
                <img src={svg25} alt={"svg25"} />
              </div>

              <div className="reseller_card_title">New Reseller</div>
            </div>
          </div>
        </div>
      </div>
      <ResellerAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        prodd={prodd}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        preview={preview}
        setPreview={setPreview}
      />
    </>
  );
}

export default ResellersList;
