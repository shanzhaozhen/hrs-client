import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import StaffChangeList from "@/pages/HR/StaffChange/components/StaffChangeList";

const StaffChange: React.FC = () => {

  return (
    <PageContainer>
      <StaffChangeList />
    </PageContainer>
  );
};

export default StaffChange;
