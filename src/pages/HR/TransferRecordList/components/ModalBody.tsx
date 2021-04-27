import React, { useRef } from 'react';
import type {Dispatch, SetStateAction} from 'react';
import TransferRecordListBody from "@/pages/HR/TransferRecordList/components/ListBody";
import type { ActionType } from "@ant-design/pro-table";
import { Modal } from "antd";

interface TransferRecordProps {
  transferRecordModalVisible: boolean;
  handleTransferRecordModalVisible: Dispatch<SetStateAction<boolean>>;
  staffId?: number;
}

const TransferRecordModal: React.FC<TransferRecordProps> = (props) => {
  const { transferRecordModalVisible, handleTransferRecordModalVisible, staffId } = props;

  const actionRef = useRef<ActionType>();

  return (
    <Modal
      title="调动记录"
      width={980}
      visible={transferRecordModalVisible}
      onCancel={() => {
        handleTransferRecordModalVisible(false);
        actionRef.current?.clearSelected?.();
      }}
      footer={null}
    >
      <TransferRecordListBody staffId={staffId} />
    </Modal>
  );
};

export default TransferRecordModal;
