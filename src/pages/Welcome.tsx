import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message="HRS人事系统，已经发布。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          欢迎使用HRS人事系统
        </Typography.Text>
      </Card>
    </PageContainer>
  );
};
