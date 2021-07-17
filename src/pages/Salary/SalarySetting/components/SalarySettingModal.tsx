import React, { useRef} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import { Modal } from 'antd';
import type {ActionType} from '@ant-design/pro-table';
import SalarySettingList from "@/pages/Salary/SalarySetting/components/SalarySettingList";


interface SalarySettingListProps {
  salarySettingListModalVisible: boolean;
  handleSalarySettingListModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SalarySettingModal: React.FC<SalarySettingListProps> = (props) => {
  const { salarySettingListModalVisible, handleSalarySettingListModalVisible } = props;

  const actionRef = useRef<ActionType>();

  return (
    <Modal
      title="修改记录"
      width={980}
      destroyOnClose
      visible={salarySettingListModalVisible}
      onCancel={() => {
        handleSalarySettingListModalVisible(false);
        actionRef.current?.clearSelected?.();
      }}
      footer={null}
    >
      <SalarySettingList
        actionRef={actionRef}
        salarySettingListModalVisible={salarySettingListModalVisible}
        handleSalarySettingListModalVisible={handleSalarySettingListModalVisible}/>
    </Modal>
  );
};

export default SalarySettingModal;
