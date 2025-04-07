import { Dropdown, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateForHumans } from "../../utils";
import { fetchNewProductRequest } from "../../features/product-request/productRequestSlice";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import svg27 from '../../assets/svg/svg27.svg'

function NewTable() {
  const { refetchKey, newData } = useSelector((state) => state.productRequest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [prodd, setProdd] = useState("");
 
  const columns = [
    {
      title: "Reference No",
      dataIndex: "reResellerId", 
    },
    {
      title: "Reseller Name",
      dataIndex: "reName", 
    },
    {
      title: "Telcos",
      dataIndex: "reTelcos", 
    },
    {
      title: "Type",
      dataIndex: "reServiceType", 
    },
    {
      title: "Status",
      dataIndex: "reStatus", 
    },
    {
      title: "Created Date",
      render: (item) => {
        return <div>{dateForHumans(item)}</div>;
      },
      dataIndex: "reCreatedDate", 
    },
   
    {
      title: "Actions",
      render: (item) => (
        <>
          <button onClick={()=>setProdd(item)}>
            <Dropdown
              overlayStyle={{
                width: "150px",
              }}
              trigger={"click"}
              menu={{ items: settingItems }}
              placement="bottom"
            >
              <img src={svg27} alt="svg27"/> 
            </Dropdown>
          </button>
        </>
      ),
    },
  ];
 
 
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const showModalDelete = async () => {
    setIsModalOpenDelete(true);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const showModalEdit = async () => {
    setIsModalOpenEdit(true);
  };

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  function handleRequestView(){
    navigate(`/product-request-view/${prodd?.reId}`)
  }

  const settingItems = [
    {
      key: "0",
      label: (
        <div className=" mb-1 flex text-[16px] font-sans items-center justify-center  text-darkGreen"
        onClick={handleRequestView}>
          View
        </div>
      ),
       
    },
    {
      key: "1",
      label: (
        <div
          className=" flex  text-[16px] font-sans items-center justify-center text-darkGreen" 
        >
         Edit
        </div>
      ),
      
    },
  ];

  const handleDelete=()=>{
 
  }


  return (
    <>
      <Table
        className="mt-[1.31rem] w-full"
        scroll={{
          x: 800,
        }}
        // pagination={{
        //   position: ["bottomCenter"],
        //   current: pageIndex + 1,
        //   total: newCount,
        //   pageSize: pageSize,
        //   onChange: (page, size) => {
        //     setPageIndex(page - 1);
        //     setPageSize(size);
        //     fetchProductRequestData(page - 1, size);
        //   },
        //   showSizeChanger: false,
        //   hideOnSinglePage: true,
        // }}
        rowKey={(record) => record?.reId}
        columns={columns}
        dataSource={newData}
      />

      <DeleteModal
        isModalOpen={isModalOpenDelete}
        setIsModalOpen={setIsModalOpenDelete}
        prodd={prodd}
        handleDelete={handleDelete}
        loading="loading"
        content={`Are you sure you want to delete activity {prodd?.jaaTitle}?`}
      />
    </>
  );
}

export default NewTable;
