"use client";
import { useState } from "react";
import DataTable from "react-data-table-component";
import WorkedCompaniesEntry from "./WorkedCompaniesEntry";
import { MdAddTask, MdDelete, MdEdit } from "react-icons/md";
import { BsViewList } from "react-icons/bs";
import { Modal, Popconfirm, Tooltip, Tabs, Button, Space } from "antd";
import { workedCompColumns } from "./EntryUtilities/DTColumns";
import apiServices from "../utils/service-calls/apiServices";
import { getPortfolioDetails, showAlertNotice } from "../common/CommonFunction";

const ExperienceEntry = ({ workedCompanies }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalLoading, setAddModalLoading] = useState(false);
  const [isCompEdit, setIsCompEdit] = useState(false);
  const [compEditRecord, setCompEditRecord] = useState(null);

  const columns = [
    ...workedCompColumns,
    {
      name: "Project Details",
      cell: (row) => (
        <Space size="small">
          <Button size="small" icon={<BsViewList />} onClick={() => ""}>
            View
          </Button>
        </Space>
      ),
      ignoreRowClick: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Space size="small">
          <Button
            size="small"
            icon={<MdEdit />}
            onClick={() => {
              setIsCompEdit(true);
              setCompEditRecord(row);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this record?"
            description="Are you sure you want to delete this?"
            onConfirm={() => deleteCompRecord(row)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger icon={<MdDelete />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      ignoreRowClick: true,
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: "Worked Companies",
      children: (
        <WorkedCompaniesEntry
          setShowAddModal={setShowAddModal}
          compEditRecord={compEditRecord}
          isCompEdit={isCompEdit}
          setIsCompEdit={setIsCompEdit}
        />
      ),
    },
    {
      key: "2",
      label: "Worked Projects",
      children: <></>,
    },
  ];

  const deleteCompRecord = (record) => {
    const id = record?.sl_no;
    apiServices.deleteCompRecord(id).then((res) => {
      if (res?.data?.status === "success") {
        showAlertNotice(res?.data?.message, "success").then(() => {
          getPortfolioDetails();
        });
      } else {
        showAlertNotice(res?.data?.message, "error");
      }
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="lead fs-5 m-3">Worked Companies and Projects:</div>
        <div>
          <Tooltip title="Add Company (or) Project">
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setShowAddModal(true);
                setAddModalLoading(true);
                setTimeout(() => {
                  setAddModalLoading(false);
                }, 500);
              }}
              icon={<MdAddTask />}
            >
              ADD
            </Button>
          </Tooltip>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={workedCompanies}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        striped
        highlightOnHover
        pagination
      />

      <Modal
        title={
          addModalLoading ? "Loading..." : "Adding Worked Company or Project"
        }
        width={700}
        open={showAddModal || isCompEdit}
        onCancel={() => {
          setShowAddModal(false);
          setIsCompEdit(false);
        }}
        footer={null}
        destroyOnClose
      >
        <Tabs defaultActiveKey="1" items={tabItems} type="card" />
      </Modal>
    </div>
  );
};

export default ExperienceEntry;
