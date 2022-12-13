import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import '../styles/HomePage.css';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { BookFilled, ProfileFilled } from '@ant-design/icons';

import NurseView from '../components/NurseView';
import UserView from '../components/UserView';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem);

const items: MenuItem[] = [
  getItem(<Link to="/home/nurses">Nurses</Link>, '1', <BookFilled />),
  getItem(<Link to="/home/users">Users</Link>, '2', <ProfileFilled />),
];

function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="sidebar">
        <Menu
          className="menu"
          defaultSelectedKeys={['1']}
          theme="dark"
          items={items}
        />
      </div>
      <div className="view">
        <Routes>
          <Route path="/nurses" element={<NurseView />} />
          <Route path="/users" element={<UserView />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
