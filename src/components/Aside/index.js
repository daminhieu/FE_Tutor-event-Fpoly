import { Button, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useState } from 'react';
import {
  PieChartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
  UpOutlined,
  BellOutlined,
  CarryOutOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import {
  BsFillCircleFill,
  BsFillCalendarDayFill,
  BsFilePost,
} from 'react-icons/bs';
import { BiCalendarStar } from 'react-icons/bi';
import { SiGoogleclassroom } from 'react-icons/si';
import { IoMdHelpCircle } from 'react-icons/io';
import Logo from './../../assets/images/Logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const onClickHandler = (data) => {
    navigate(data.key);
  };

  // navigate by key value of menu item
  const items = [
    getItem(
      <div
        className={`${
          collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'
        }`}
      >
        Thông báo và tin tức
      </div>,
      '/',
      <BellOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Sự kiện
    //   </div>,
    //   'sub1',
    //   <PieChartOutlined className='tw-text-[18px]  tw-text-[#C4CFF9] '  />,
    //   [
    //     getItem(
    //       <div className='tw-text-[#313752] dark:!tw-text-white '>Sự kiện</div>,
    //       '3',
    //       !collapsed && (
    //         <BsFillCircleFill className='tw-text-[4px]  tw-text-[#C4CFF9]' />
    //       )
    //     ),
    //     getItem(
    //       <div className='tw-text-[#313752] dark:!tw-text-white '>Sự kiện</div>,
    //       '4',
    //       !collapsed && (
    //         <BsFillCircleFill className='tw-text-[4px]   tw-text-[#C4CFF9]' />
    //       )
    //     ),
    //     getItem(
    //       <div className='tw-text-[#313752] dark:!tw-text-white '>Sự kiện</div>,
    //       '/auth',
    //       !collapsed && (
    //         <BsFillCircleFill className='tw-text-[4px]   tw-text-[#C4CFF9]' />
    //       )
    //     ),
    //   ]
    // ),
    getItem(
      <div
        className={`${
          collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'
        }`}
      >
        Import
      </div>,
      '/import-students',
      <FileAddOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Tạo lớp tutors
    //   </div>,
    //   '/crclass',
    //   <PieChartOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),
    getItem(
      <div
        className={`${
          collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'
        }`}
      >
        Điểm danh
      </div>,
      '/diem-danh',
      <CarryOutOutlined className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Lịch tutor
    //   </div>,
    //   '/calendar-tutor',
    //   <BsFillCalendarDayFill className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Danh sách lớp
    //   </div>,
    //   '/list-class',
    //   <SiGoogleclassroom className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Sự kiện
    //   </div>,
    //   '/events',
    //   <BiCalendarStar className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),
    getItem(
      <div
        className={`${
          collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'
        }`}
      >
        Quản lý kỳ học
      </div>,
      '/manage',
      <BiCalendarStar className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    ),
    // getItem(
    //   <div className={`${collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'}`}>
    //     Thêm nội dung học
    //   </div>,
    //   '/add-post',
    //   <BsFilePost className='tw-text-[18px]  tw-text-[#C4CFF9]' />
    // ),
    getItem(
      <div
        className={`${
          collapsed ? 'tw-text-white' : 'tw-text-[#313752] dark:!tw-text-white'
        }`}
      >
        Hỗ trợ
      </div>,
      '',
      <IoMdHelpCircle className='tw-text-[18px]  tw-text-[#C4CFF9]' />
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
      className='tw-sticky tw-left-0 tw-top-0 tw-bottom-0 tw-z-50 tw-hidden tw-h-screen tw-overflow-auto tw-bg-white tw-shadow-xl tw-drop-shadow-xl dark:tw-bg-[#1E2139] dark:tw-shadow-md dark:tw-shadow-slate-400 dark:tw-drop-shadow-2xl md:tw-block  '
    >
      <div className='tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-px-2'>
        {!collapsed && (
          <div className='logo tw-ml-4 tw-mb-5 tw-mt-2 tw-flex-1'>
            <Link to='/'>
              <img src={Logo} alt='logo' width={'80%'} />
            </Link>
          </div>
        )}
        <Button
          className='hover:text-blue-500  tw-my-2 tw-border-none tw-bg-transparent tw-text-blue-400 hover:tw-bg-transparent'
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
        className='app-sidebar dark:tw-bg-[#1E2139] '
        onClick={(e) => onClickHandler(e)}
        mode='inline'
        inlineCollapsed={collapsed}
        selectedKeys={[location.pathname]}
        items={items}
        expandIcon={({ isOpen }) =>
          isOpen ? (
            <UpOutlined className='!tw-text[#313752] tw-text-[11px]' />
          ) : (
            <RightOutlined className='!tw-text[#313752] tw-text-[11px]' />
          )
        }
      />
    </Sider>
  );
};

export default AppAside;
