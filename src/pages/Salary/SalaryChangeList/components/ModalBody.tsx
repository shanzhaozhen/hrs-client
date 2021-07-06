import React, { useRef } from 'react';
import type {Dispatch, SetStateAction} from 'react';
import SalaryChangeListBody from "@/pages/Salary/SalaryChangeList/components/ListBody";
import type { ActionType } from "@ant-design/pro-table";
import { Modal } from "antd";

interface SalaryChangeProps {
  staffChangeModalVisible: boolean;
  handleSalaryChangeModalVisible: Dispatch<SetStateAction<boolean>>;
  staffId?: number;
}

const SalaryChangeModal: React.FC<SalaryChangeProps> = (props) => {
  const { staffChangeModalVisible, handleSalaryChangeModalVisible, staffId } = props;

  const actionRef = useRef<ActionType>();

  return (
    <Modal
      title="调薪记录"
      width={980}
      destroyOnClose
      visible={staffChangeModalVisible}
      onCancel={() => {
        handleSalaryChangeModalVisible(false);
        actionRef.current?.clearSelected?.();
      }}
      footer={null}
    >
      <SalaryChangeListBody staffId={staffId} />
    </Modal>
  );
};

export default SalaryChangeModal;
