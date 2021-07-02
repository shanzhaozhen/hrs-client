import React, { useRef } from 'react';
import type {Dispatch, SetStateAction} from 'react';
import StaffChangeListBody from "@/pages/HR/StaffChangeList/components/ListBody";
import type { ActionType } from "@ant-design/pro-table";
import { Modal } from "antd";

interface StaffChangeProps {
  staffChangeModalVisible: boolean;
  handleStaffChangeModalVisible: Dispatch<SetStateAction<boolean>>;
  staffId?: number;
}

const StaffChangeModal: React.FC<StaffChangeProps> = (props) => {
  const { staffChangeModalVisible, handleStaffChangeModalVisible, staffId } = props;

  const actionRef = useRef<ActionType>();

  return (
    <Modal
      title="调动记录"
      width={980}
      destroyOnClose
      visible={staffChangeModalVisible}
      onCancel={() => {
        handleStaffChangeModalVisible(false);
        actionRef.current?.clearSelected?.();
      }}
      footer={null}
    >
      <StaffChangeListBody staffId={staffId} />
    </Modal>
  );
};

export default StaffChangeModal;
