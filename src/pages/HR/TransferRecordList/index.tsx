import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import TransferRecordListBody from "@/pages/HR/TransferRecordList/components/ListBody";

const TransferRecordList: React.FC = () => {

  return (
    <PageContainer>
      <TransferRecordListBody />
    </PageContainer>
  );
};

export default TransferRecordList;
