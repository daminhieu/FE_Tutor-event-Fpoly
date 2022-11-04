import { Button, Input, Switch, Table } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';
import { FaReply } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetAttendanceLessonListStudentQuery, useUpdateAttendanceStudentStatusMutation } from '../../../../app/api/attendanceApiSlice';
import Spinner from '../../../../components/Spinner';

const AttendanceStudentList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectCode } = location.state;
  const { lessonId } = useParams();
  const [studentsStatus, setStudentsStatus] = React.useState([]);
  const currentTime = moment().format('YYYY-MM-DD HH:mm');

  const {
    data,
    isLoading,
    error,
  } = useGetAttendanceLessonListStudentQuery(lessonId);
  const isDisabledAttendance = currentTime > moment(data?.lesson?.end_time).format('YYYY-MM-DD HH:mm')
    && data?.lesson?.attended === 1
  const [updateStatusAtendance,
    {
      isLoading: isUpdateLoading,
      error: updateError,
      isSuccess: updateSuccess,
    }
  ] = useUpdateAttendanceStudentStatusMutation();

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Sinh viên',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: 'Email',
      dataIndex: 'studentEmail',
      key: 'studentEmail',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch
          key={record.student_code}
          className='tw-max-w-md tw-px-1 sm:tw-min-w-[50px] md:tw-min-w-[80px]'
          checkedChildren='Có mặt'
          unCheckedChildren='Vắng mặt'
          defaultChecked={status}
          disabled={isDisabledAttendance}
          loading={isUpdateLoading}
          onChange={(value) => handleSwitch(value, record)}
        />
      ),
    },

    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (note, record) => (
        <Input placeholder='Ghi chú' value={note} size="small" className='tw-rounded-md' />
      )
    }
  ];

  const dataStudent = data?.data?.map((item, index) => {
    return {
      key: index + 1,
      id: item.id,
      studentCode: item.student_code,
      studentName: item.student_name,
      studentEmail: item.student_email,
      note: item.note,
      status: item.status,
    };
  });


  const handleSwitch = (value, record) => {
    const newStudentsStatus = studentsStatus.map((item) => {
      if (item.student_email === record.studentEmail) {
        return {
          ...item,
          status: value ? 1 : 0,
        };
      }
      return item;
    });
    setStudentsStatus(newStudentsStatus);

  };

  const handleUpdateStatus = (studentsStatus, lessonId) => {
    updateStatusAtendance({
      data: {
        data: studentsStatus,
      },
      lessonId
    },);
  };

  useEffect(() => {
    setStudentsStatus(
      data?.data?.map((item) => ({
        student_email: item.student_email,
        status: item.status,
      }))
    )
  }, [data]);


  useEffect(() => {
    if (updateSuccess) {
      toast.success('Điểm danh thành công');
    }
    if (updateError) {
      toast.error('Điểm danh thất bại');
    }
  }, [updateSuccess, updateError]);



  return (
    <>
      <Helmet>
        <title>Điểm danh</title>
      </Helmet>
      <div className='tw-w-full'>
        <div className='tw-border-b-2 tw-flex tw-justify-between '>
          <span className='tw-text-[15px] dark:tw-text-slate-100 '>
            Điểm danh
          </span>
          <div className="tw-pb-1">
            <button
              onClick={() => navigate(-1)}
              className="tw-flex tw-items-center tw-text-blue-500 hover:tw-text-blue-700 hover:tw-bg-transparent"
            >
              <FaReply className="tw-mr-1" /> Trở lại
            </button>
          </div>
        </div>
        {error && (
          <div className='tw-mt-6 tw-flex tw-h-full tw-items-center tw-justify-center'>
            <p className='tw-text-lg tw-text-red-500'>
              {error?.message || error?.data?.message || 'Đã có lỗi xảy ra'}
            </p>
          </div>
        )}
        {!error && (
          <>
            <h2 className='tw-mt-2 dark:tw-text-white'>Môn học: {subjectCode}</h2>
            <div className='tw-mt-6'>
              <Table
                loading={{
                  indicator: <Spinner />,
                  spinning: isLoading,
                }}
                pagination={false}
                columns={columns}
                dataSource={dataStudent}
                tableLayout='auto'
                rowKey='key'
                className='attendance-table tw-shadow'
                scroll={{ y: 400 }}
              />
              {/* <textarea
            className='tw-mt-[15px] tw-w-full tw-rounded-[5px] tw-border tw-pt-[5px] '
            placeholder='Ghi chú về buổi tutors'
            name=''
            rows='3'
          /> */}

              {
                data?.lesson?.start_time < currentTime && data?.lesson?.end_time > currentTime && (
                  <Button
                    type='primary'
                    loading={isUpdateLoading}
                    disabled={data?.data?.length === 0}
                    className='tw-mt-[15px] tw-h-[40px] tw-w-full tw-text-white tw-border-transparent tw-rounded-[5px] tw-bg-[#0DB27F]'
                    onClick={() => handleUpdateStatus(studentsStatus, lessonId)}
                  >
                    Lưu điểm danh
                  </Button>
                )
              }


            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AttendanceStudentList