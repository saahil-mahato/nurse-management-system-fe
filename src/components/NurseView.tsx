import { useState, useRef, useEffect } from 'react';

import dayjs from 'dayjs';

import type { MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Table, notification, FloatButton, Tag, Button, Dropdown } from 'antd';

import { PlusCircleOutlined, MenuOutlined } from '@ant-design/icons';

import '../styles/NurseView.css';

import NurseForm from './NurseForm';

import { NurseData, NurseTableData } from '../constants/Interfaces';

import { getAllNurses } from '../services/NurseService';

import { timestampToTime } from '../utils/DateTime';
import openNotification from '../utils/Notifications';

function NurseView() {
  const [nurses, setNurses] = useState<Array<NurseTableData>>([]);
  const [isNurseFormOpen, setIsNurseFormOpen] = useState<boolean>(false);
  const [isNursesLoading, setIsNursesLoading] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<object | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const originalNursesData = useRef<Array<NurseData>>([]);
  const selectedNurse = useRef<any>(undefined);

  /**
   * Function to open the nurse dialog.
   */
  const openNurseDialog = (editMode: boolean) => {
    setIsEditMode(editMode);
    setIsNurseFormOpen(true);
  };

  /**
   * Function to close the nurse dialog.
   */
  const closeNurseDialog = () => {
    setIsNurseFormOpen(false);
    setIsEditMode(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Edit',
      onClick: () => {
        setEditValues(selectedNurse.current);
        openNurseDialog(true);
      },
    },
    {
      key: '1',
      label: 'Delete',
    },
  ];

  const menuClick = (event: any, record: any) => {
    event.preventDefault();
    selectedNurse.current = originalNursesData.current?.find(
      nurse => nurse._id === record.key,
    );
    selectedNurse.current = {
      ...selectedNurse.current,
      dutyStartTime: dayjs(
        new Date(selectedNurse.current?.dutyStartTime || ''),
      ),
      dutyEndTime: dayjs(new Date(selectedNurse.current?.dutyEndTime || '')),
    };
  };

  const renderDropdownMenu = (_: any, record: any) => (
    <Dropdown menu={{ items }} trigger={['click']} arrow>
      <Button
        shape="circle"
        icon={<MenuOutlined />}
        onClick={e => menuClick(e, record)}
      />
    </Dropdown>
  );

  const renderDays = (workingDays: Array<string>) => (
    <>
      {workingDays.map((workingDay: any) => (
        <Tag style={{ margin: 2 }} color="blue" key={workingDay}>
          {workingDay}
        </Tag>
      ))}
    </>
  );

  const columns: ColumnsType<NurseTableData> = [
    {
      title: '',
      key: 'operation',
      width: 65,
      render: renderDropdownMenu,
    },
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
    nursesData: Array<NurseData>,
  ): Array<NurseTableData> => {
    const nurseTableData = nursesData.map((nurse: NurseData) => ({
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

  /**
   * Function to show success notification.
   */
  const openSuccessNotification = (editMode: boolean) => {
    openNotification(
      api,
      'success',
      'Success',
      `Nurse successfully ${editMode ? 'updated' : 'added'}`,
      'bottomLeft',
    );
  };

  /**
   * Function to fetch all nurses.
   */
  const fetchAllNurses = () => {
    setIsNursesLoading(true);
    getAllNurses()
      .then(response => {
        originalNursesData.current = [...response.data];
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
  };

  useEffect(fetchAllNurses, []);

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
        onClick={() => openNurseDialog(false)}
      />
      {isNurseFormOpen && (
        <NurseForm
          isNurseFormOpen={isNurseFormOpen}
          closeNurseDialog={closeNurseDialog}
          isEditMode={isEditMode}
          initialValues={editValues}
          fetchAllNurses={fetchAllNurses}
          openSuccessNotification={openSuccessNotification}
        />
      )}
    </>
  );
}

export default NurseView;
