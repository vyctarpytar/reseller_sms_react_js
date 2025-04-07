import { Badge, Dropdown, Skeleton, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InsideHeader from "../../components/InsideHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import svg32 from "../../assets/svg/svg32.svg";
import MaterialIcon from "material-icons-react";
import { fetchSentSms } from "../../features/sms-request/smsRequestSlice";
import { addSpaces, cashConverter, dateForHumans, formatDate, formatDateTime } from "../../utils";
import noCon from "../../assets/img/noCon.png";
import svg38 from "../../assets/svg/svg38.svg";
import FilterModal from "./FilterModal";
import {
  downloadExcel,
  fetchScheduledSms,
  save,
} from "../../features/save/saveSlice";
import toast from "react-hot-toast";

function ScheduledSmsList() {
  const [notOpen, setnotOpen] = useState(false);
  const { loading } = useSelector((state) => state.sms);
  const { user } = useSelector((state) => state.auth);
  const { scheduledSmsData, loadingSms, scheduledSmsCount } = useSelector(
    (state) => state.save
  );

  const [formData, setFormData] = useState({});
  const handleOpenChange = () => {
    setnotOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  const hasResellerName = scheduledSmsData?.some(
    (item) =>
      item?.msgResellerName !== null && item?.msgResellerName !== undefined && user?.layer === "TOP"
  );
 

  const columns = [ 
    {
      title: "Created By Name",  
      dataIndex: "schCreatedByName",
    },
    {
      title: "Created Date",
      render: (item) => {
        return <div>{formatDateTime(item)}</div>;
      },
      dataIndex: "schCreatedOn", 
    },
    {
      title: "Sender Name",
      width: "10%",
      dataIndex: "schMessage", 
    }, 
    {
      title: "Release Time", 
      dataIndex: "schReleaseTime", 
    }, 
    {
      title: "Sender ID", 
      dataIndex: "schSenderid", 
    }, 
    {
      title: "Phone Number", 
      dataIndex: "schPhoneNumber", 
    }, 
    
    {
      title: "Status",
      render: (item) => {
        return (
          <div
            className={`${
              item?.schStatus == "SENT"
                ? "text-[#8884d8]"
                : item?.schStatus == "DeliveredToTerminal"
                ? "text-[#388E3C]"
                : item?.schStatus == "Exception sending "
                ? "text-[#ffa500]"
                : item?.schStatus == "InvalidMsisdn"
                ? "text-[#ff0000]"
                : item?.schStatus == "DeliveryImpossible"
                ? "text-[#808080]"
                : "text-blk14"
            }  
         font-[700] flex items-center justify-center text-center`}
          >
            {item?.schStatus}
          </div>
        );
      },
      
    },
    
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendSms = () => {
    navigate("/outbox");
  };

  const handleClearFilters = async () => {
    await setFormData({});
    const res = await dispatch(
      fetchScheduledSms({
        url: "api/v2/schedule",
        schUsrId: null,
        schAccId: null,
        schGrpId: null, 
      })
    );
  };

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  async function fetchscheduledSmsData(page, size) {
    const res = await dispatch(
      fetchScheduledSms({
        url: "api/v2/schedule",
        limit: size ?? pageSize,
        start: page ?? pageIndex,
        schUsrId: formData?.schUsrId,
        schAccId: formData?.schAccId,
        schGrpId: formData?.schGrpId, 
      })
    );
  }

 

  const handleClick = async (item) => {
    
  };

  useEffect(() => {
    fetchscheduledSmsData();
  }, []);

  return (
    <>
      <div className="w-full overflow-y-scroll h-full">
        <InsideHeader
          title="Scheduled SMS"
          subtitle="This is a list of all sms you have scheduled"
          back={false}
        />

        <div className="lg:px-10 px-3">
          <div className="flex flex-col">
            <div className="mt-[1.31rem] flex justify-between items-center gap-x-10">
              <div className="flex justify-start gap-x-10">
                {user?.layer === "ACCOUNT" && (
                  <div className={`w-[250px]`}>
                    <button
                      className={`cstm-btn  !rounded-[4px] !bg-[#A3A2A7] !text-[.75rem] flex items-center gap-x-3`}
                      onClick={handleSendSms}
                    >
                      <img src={svg32} alt="svg32" />
                      Send New Message
                    </button>
                  </div>
                )}

                <div className="flex items-center">
                  <span>
                    {" "}
                    <button
                      onClick={showModal}
                      type="button"
                      className={`bg-transparent flex items-center gap-x-'1' ${
                        Object?.keys(formData)?.length > 0
                          ? "!text-[#5688E5]"
                          : "inherit"
                      }`}
                    >
                      <MaterialIcon color="#141414" icon="filter_list" />
                      Filters
                    </button>
                  </span>
                  {Object?.keys(formData)?.length > 0 && (
                    <span className="flex items-center text-[#5688E5] cursor-pointer ml-1">
                      :{Object?.keys(formData)?.length}
                      <img
                        src={svg38}
                        alt="svg38"
                        onClick={handleClearFilters}
                      />
                    </span>
                  )}
                </div>
              </div>
 
             
            </div>
            <div className="ml-[20%]"></div>
          </div>
          {loadingSms ? (
            <Skeleton />
          ) : (
            <div>
              {scheduledSmsData && scheduledSmsData?.length > 0 ? (
                <Table
                  className="mt-[1.31rem] w-full mb-10"
                  scroll={{
                    // x: "max-content",
                    x: 1600,
                  }}
                  pagination={{
                    position: ["bottomCenter"],
                    current: pageIndex + 1,
                    total: scheduledSmsCount,
                    pageSize: pageSize,
                    onChange: (page, size) => {
                      setPageIndex(page - 1);
                      setPageSize(size);
                      fetchscheduledSmsData(page - 1, size);
                    },
                    showSizeChanger: false,
                    hideOnSinglePage: true,
                  }}
                  rowKey={(record) => record?.schId}
                  columns={columns}
                  dataSource={scheduledSmsData}
                  loading={loadingSms}
                />
              ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                  <img src={noCon} alt="noCon" />
                  <span className="text-black21 text-[18px] font-normal leading-[24px] font-dmSans">
                    No Sms Found
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <FilterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
}

export default ScheduledSmsList;
