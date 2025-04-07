import React, { useRef, useState } from "react";
import InsideHeader from "../../components/InsideHeader";
import { Form, Spin, Table } from "antd";
import uplooadSimple from "../../assets/svg/UploadSimple.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveSmsCsv } from "../../features/save/saveSlice";


function ExcelSms() {
  const dataSource = [
    {
      key: "1",
      mobile: "0712345678",
      message:
        "Jingle bells, jingle bells, Jingle all the way.Wish you, all the best and joy always",
    },
    {
      key: "2",
      mobile: "0700000000",
      message:
        "’m sending you warm bear hugs, loving kisses and earnest wishes for the wonderful occasion of Christmas.May you have a splendid Christmas filled with lights, songs, and cheer. Merry Christmas and A Happy New Year to you.",
    },
    {
      key: "3",
      mobile: "0799999999",
      message:
        "I look forward to Christmas every year.It is a time to reach out to those we have missed through the year.May this message find you in good health and spirits.",
    },
  ];

  const columns = [
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];
  const [form] = Form.useForm();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saving } = useSelector((state) => state.save);

  const [fileUrl, setfileUrl] = useState();

  async function handleCancelFile() {
    await setfileUrl();
  }

  async function handleUpload(e) {
    setfileUrl(e.target.files[0]);
  }

  async function handleOpenFIle() {
    document.getElementById("file").click();
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("file", fileUrl);

    const res = await dispatch(saveSmsCsv(formData));
    if (res?.payload?.success) {
      await toast.success(res?.payload?.messages?.message);
      await navigate("/sent-sms");
      await form.resetFields();
    } else {
      toast.error(res?.payload?.messages?.message);
    }
  };

  return (
    <div className="w-full overflow-y-scroll h-full">
      <InsideHeader
        title="Excel SMS"
        subtitle="Upload contact and message information"
        back={false}
      />

      <div className="lg:px-10 px-3">
        <div className="mt-10 flex flex-col">
        <div className="dash-title font-[700] text-[24px] text-black1 ">Excel-SMS</div>
       
          <Form
            layout="vertical"
            ref={formRef}
            name="control-ref"
            onFinish={onFinish}
            className="mt-5"
            style={{
              maxWidth: "100%",
            }}
            form={form}
          >
            <Form.Item
              extra={"Upload file .excel"}
              rules={[
                {
                  required: true,
                  message: "Upload file  .excel",
                },
              ]}
              name={"gdcFileUrl"}
              label="Attach file"
              className="lg:w-[50%] w-[100%]"
            >
              {fileUrl?.name ? (
                <>
                  <div className="text-blueDark w-full flex justify-between items-center h-auto px-3 input truncate">
                    <span className="text-[18px]">{fileUrl?.name}</span>

                    <button
                      type="button"
                      onClick={handleCancelFile}
                      className="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M9.5 13H15.5C15.7652 13 16.0196 12.8946 16.2071 12.7071C16.3946 12.5196 16.5 12.2652 16.5 12C16.5 11.7348 16.3946 11.4804 16.2071 11.2929C16.0196 11.1054 15.7652 11 15.5 11H9.5C9.23478 11 8.98043 11.1054 8.79289 11.2929C8.60536 11.4804 8.5 11.7348 8.5 12C8.5 12.2652 8.60536 12.5196 8.79289 12.7071C8.98043 12.8946 9.23478 13 9.5 13ZM21.5 2H3.5C3.23478 2 2.98043 2.10536 2.79289 2.29289C2.60536 2.48043 2.5 2.73478 2.5 3V21C2.5 21.2652 2.60536 21.5196 2.79289 21.7071C2.98043 21.8946 3.23478 22 3.5 22H21.5C21.7652 22 22.0196 21.8946 22.2071 21.7071C22.3946 21.5196 22.5 21.2652 22.5 21V3C22.5 2.73478 22.3946 2.48043 22.2071 2.29289C22.0196 2.10536 21.7652 2 21.5 2ZM20.5 20H4.5V4H20.5V20Z"
                          fill="#147CBC"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="input relative" onClick={handleOpenFIle}>
                    <input
                      className="!hidden"
                      accept=".xls, .xlsx"
                      id="file"
                      name="file"
                      onChange={(e) => handleUpload(e)}
                      type="file"
                    />
                    <div className="absolute inset-0 flex items-center justify-end pointer-events-none px-3">
                      <img src={uplooadSimple} alt="uploadSimple" />
                    </div>
                  </div>
                </>
              )}
            </Form.Item>

            
            <div className="dash-title font-[700] text-[20px] text-black1 mt-[0.5rem]">
              Your excel should be in the format below
            </div>

            <div className="mt-[0.5rem]">
              <Table
                rowSelection={false}
                className="mt-[1px] w-full"
                scroll={{
                  x: 800,
                }}
                rowKey={(record) => record?.key}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
            </div>

            <div className="flex justify-between mt-[156px] mb-[48px]">
              <div className="justify-start"></div>
              <div className="justify-end flex items-center gap-x-2">
                <div className="w-[150px]">
                  <button
                    key="back"
                    type="button"
                    onClick={handleCancel}
                    className="cstm-btn !bg-white !text-[#388E3C] !border !border-[#388E3C]"
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-[132px]">
                  <button
                    key="submit"
                    type="submit"
                    className="cstm-btn"
                    disabled={saving}
                  >
                    {saving ? <Spin /> : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ExcelSms;
