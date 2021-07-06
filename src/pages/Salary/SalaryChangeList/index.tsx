import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import SalaryChangeListBody from "@/pages/Salary/SalaryChangeList/components/ListBody";

const SalaryChangeList: React.FC = () => {

  return (
    <PageContainer>
      <SalaryChangeListBody />
    </PageContainer>
  );
};

export default SalaryChangeList;
