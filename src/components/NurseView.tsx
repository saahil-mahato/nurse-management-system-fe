import { useState, useEffect } from 'react';

import { Table, notification, FloatButton, Tag } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';

import '../styles/NurseView.css';

import NurseForm from './NurseForm';

import { NurseData, NurseTableData } from '../constants/Interfaces';

import { getAllNurses } from '../services/NurseService';

import openNotification from '../utils/Notifications';
import { timestampToTime } from '../utils/DateTime';

const renderDays = (workingDays: Array<string>) => (
  <>
    {workingDays.map((workingDay: any) => (
      <Tag style={{ margin: 2 }} color="blue" key={workingDay}>
        {workingDay}
      </Tag>
    ))}
  </>
);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: 'Working Days',
    dataIndex: 'workingDays',
    key: 'workingDays',
    render: renderDays,
  },
  {
    title: 'Duty Start Time',
    dataIndex: 'dutyStartTime',
    key: 'dutyStartTime',
  },
  {
    title: 'Duty End Time',
    dataIndex: 'dutyEndTime',
    key: 'dutyEndTime',
  },
];

const refactorNursesData = (
  nurses: Array<NurseData>,
): Array<NurseTableData> => {
  const nurseTableData = nurses.map((nurse: NurseData) => ({
    key: nurse._id,
    name: nurse.firstName.concat(
      ' ',
      nurse.middleName || '',
      ' ',
      nurse.lastName,
    ),
    email: nurse.email,
    contact: nurse.contactNumber,
    workingDays: nurse.workingDays,
    dutyStartTime: timestampToTime(nurse.dutyStartTime),
    dutyEndTime: timestampToTime(nurse.dutyEndTime),
  }));

  return nurseTableData;
};

function NurseView() {
  const [nurses, setNurses] = useState<Array<NurseTableData>>([]);
  const [isNurseFormOpen, setIsNurseFormOpen] = useState<boolean>(false);
  const [isNursesLoading, setIsNursesLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  /**
   * Function to open the nurse dialog.
   */
  const openNurseDialog = () => {
    setIsNurseFormOpen(true);
  };

  /**
   * Function to close the nurse dialog.
   */
  const closeNurseDialog = () => {
    setIsNurseFormOpen(false);
  };

  useEffect(() => {
    setIsNursesLoading(true);
    getAllNurses()
      .then(response => {
        const nurseTableData = refactorNursesData(response.data);
        setNurses([...nurseTableData]);
      })
      .catch(() => {
        openNotification(
          api,
          'error',
          'Error',
          'Could not fetch nurses',
          'bottomLeft',
        );
      })
      .finally(() => {
        setIsNursesLoading(false);
      });
  }, []);

  return (
    <>
      {contextHolder}
      <div className="header">
        <h1>Nurses</h1>
      </div>
      <div className="body">
        <Table
          className="table"
          columns={columns}
          dataSource={nurses}
          bordered
          loading={isNursesLoading}
          sticky
        />
      </div>
      <FloatButton
        icon={<PlusCircleOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={openNurseDialog}
      />
      <NurseForm
        isNurseFormOpen={isNurseFormOpen}
        closeNurseDialog={closeNurseDialog}
        isEditMode={false}
      />
    </>
  );
}

export default NurseView;
