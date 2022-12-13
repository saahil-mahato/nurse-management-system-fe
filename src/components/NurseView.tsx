import { useState, useEffect } from 'react';

import { Table } from 'antd';

import '../styles/NurseView.css';

import { NurseData, NurseTableData } from '../constants/Interfaces';

import { getAllNurses } from '../services/NurseService';

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
  const newNurseData = nurses.map((nurse: NurseData) => ({
    name: nurse.firstName.concat(
      ' ',
      nurse.middleName || '',
      ' ',
      nurse.lastName,
    ),
    email: nurse.email,
    contact: nurse.contactNumber,
    workingDays: nurse.workingDays.join(', '),
    dutyStartTime: nurse.dutyStartTime,
    dutyEndTime: nurse.dutyEndTime,
  }));

  return newNurseData;
};

function NurseView() {
  const [nurses, setNurses] = useState<Array<NurseTableData>>([]);

  useEffect(() => {
    getAllNurses().then(response => {
      const newNurseData = refactorNursesData(response.data);
      setNurses([...newNurseData]);
    });
  }, []);

  return (
    <>
      <div className="header">
        <h1>Nurses</h1>
      </div>
      <div className="body">
        <Table className="table" columns={columns} dataSource={nurses} />
      </div>
    </>
  );
}

export default NurseView;
