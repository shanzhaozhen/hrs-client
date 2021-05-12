import React, { useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';
import type { ActionType } from '@ant-design/pro-table';

interface JobViewProps {
  jobViewVisible: boolean;
  handleJobViewVisible: Dispatch<SetStateAction<boolean>>;
  resumeId: number;
}

const JobView: React.FC<JobViewProps> = (props) => {
  const { jobViewVisible, handleJobViewVisible } = props;

  const actionRef = useRef<ActionType>();

  return (
    <Modal
      title="求职申请表"
      width={"100%"}
      visible={jobViewVisible}
      onCancel={() => {
        handleJobViewVisible(false);
        actionRef.current?.clearSelected?.();
      }}
      footer={null}
    >
      <div>sdfd</div>
    </Modal>
  );
};

export default JobView;
