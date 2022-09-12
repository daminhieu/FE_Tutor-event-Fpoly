import { Button, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useState } from 'react';
import {
  PieChartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { BsFillCircleFill } from 'react-icons/bs';
import Logo from './../../assets/images/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AppAside = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = (data) => {
    navigate(data.key);
  };


  // navigate by key value of menu item
  const items = [
    getItem(
      <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752]'}`}>
        Thông báo và tin tức
      </div>,
      '/',
      <BellOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    ),
    getItem(
      <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752]'}`}>
        Sự kiện
      </div>,
      'sub1',
      <PieChartOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />,
      [
        getItem(
          <div className='tw-text-[#313752]'>Sự kiện</div>,
          '3',
          !collapsed && (
            <BsFillCircleFill className='tw-text-[4px]  tw-text-[#C4CFF9]' />
          )
        ),
        getItem(
          <div className='tw-text-[#313752]'>Sự kiện</div>,
          '4',
          !collapsed && (
            <BsFillCircleFill className='tw-text-[4px]   tw-text-[#C4CFF9]' />
          )
        ),
        getItem(
          <div className='tw-text-[#313752]'>Sự kiện</div>,
          '/test',
          !collapsed && (
            <BsFillCircleFill className='tw-text-[4px]   tw-text-[#C4CFF9]' />
          )
        ),
      ]
    ),
    getItem(
      <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752]'}`}>
        Sự kiện
      </div>,
      '/crclass',
      <PieChartOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    ),
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      breakpoint='lg'
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
      width={256}
      collapsedWidth={62.5}
      collapsed={collapsed}
      className='tw-overflow-auto tw-h-screen tw-sticky tw-left-0 tw-bg-white tw-shadow-xl tw-drop-shadow-xl tw-top-0 tw-bottom-0'
    >
      <div className='tw-flex tw-items-center tw-gap-x-2 tw-justify-center tw-px-2'>
        {!collapsed && (
          <div className='logo tw-ml-4 tw-flex-1 tw-mb-5 tw-mt-2'>
            <Link to='/'>
              <img src={Logo} alt='logo' width={'80%'} />
            </Link>
          </div>
        )}
        <Button
          className='tw-my-2  hover:tw-bg-transparent hover:text-blue-500 tw-bg-transparent tw-border-none tw-text-blue-400'
          shape='none'
          type='text'
          onClick={() => setCollapsed(!collapsed)}
          icon={
            collapsed ? (
              <DoubleRightOutlined className='tw-text-xl' />
            ) : (
              <DoubleLeftOutlined className='tw-text-xl' />
            )
          }
        ></Button>
      </div>
      <Menu
        // theme='dark'
        className='app-sidebar'
        onClick={(e) => onClickHandler(e)}
        mode='inline'
        inlineCollapsed={collapsed}
        selectedKeys={[window.location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default AppAside;
