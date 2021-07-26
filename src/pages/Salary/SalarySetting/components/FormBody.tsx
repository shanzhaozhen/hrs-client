import React from 'react';
import { ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Col, Divider, Row } from 'antd';
import { monthOptions } from '@/utils/options';

interface FormProps {
  viewState?: boolean;
}

const FormBody: React.FC<FormProps> = (props) => {
  const { viewState } = props;

  return (
    <>
      <ProFormText name="id" label="调动记录id" hidden={true} />
      <Divider orientation="left">基数相关</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="accumulationFundRate"
            label="公积金基数比例"
            rules={[{ required: true, message: '请输入公积金基数比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={12}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="endowmentInsuranceRate"
            label="养老保险基数比例"
            rules={[{ required: true, message: '请输入养老保险基数比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={8}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="unemploymentInsuranceRate"
            label="失业保险基数比例"
            rules={[{ required: true, message: '请输入失业保险基数比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={0.2}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="medicalInsuranceRate"
            label="医疗保险基数比例"
            rules={[{ required: true, message: '请输入医疗保险基数比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={2}
            readonly={viewState}
          />
        </Col>
      </Row>
      <Divider orientation="left">绩效相关</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritSalary"
            label="绩效工资基数"
            rules={[{ required: true, message: '请输入绩效工资基数' }]}
            initialValue={1500}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritA"
            label="绩效A发放比例"
            rules={[{ required: true, message: '请输入绩效A发放比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={120}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritB"
            label="绩效B发放比例"
            rules={[{ required: true, message: '请输入绩效B发放比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={110}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritC"
            label="绩效C发放比例"
            rules={[{ required: true, message: '请输入绩效C发放比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={100}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritD"
            label="绩效D发放比例"
            rules={[{ required: true, message: '请输入绩效D发放比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={90}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritE"
            label="绩效E发放比例"
            rules={[{ required: true, message: '请输入绩效E发放比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={80}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="meritF"
            label="绩效F发放比例"
            rules={[{ required: true, message: '请输入绩效F发放比例' }]}
            fieldProps={{
              formatter: (value) => `${value}%`,
              parser: (value: any) => value.replace('%', ''),
            }}
            initialValue={60}
            readonly={viewState}
          />
        </Col>
      </Row>
      <Divider orientation="left">交通补贴</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowanceOwnA"
            label="交通补贴（自行到达）A（元/月）"
            rules={[{ required: true, message: '请输入交通补贴（自行到达）A（元/月）' }]}
            initialValue={2000}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowanceOwnB"
            label="交通补贴（自行到达）B（元/月）"
            rules={[{ required: true, message: '请输入交通补贴（自行到达）B（元/月）' }]}
            initialValue={1400}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowanceOwnC"
            label="交通补贴（自行到达）C（元/月）"
            rules={[{ required: true, message: '请输入交通补贴（自行到达）C（元/月）' }]}
            initialValue={600}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowanceBusA"
            label="交通补贴（乘坐接驳车）A（元/月）"
            rules={[{ required: true, message: '请输入交通补贴（乘坐接驳车）A（元/月）' }]}
            initialValue={1800}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowanceBusB"
            label="交通补贴（乘坐接驳车）B（元/月）"
            rules={[{ required: true, message: '请输入交通补贴（乘坐接驳车）B（元/月）' }]}
            initialValue={1200}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="trafficAllowanceBusC"
            label="交通补贴（乘坐接驳车）C（元/月）"
            rules={[{ required: true, message: '请输入交通补贴（乘坐接驳车）C（元/月）' }]}
            initialValue={400}
            readonly={viewState}
          />
        </Col>
      </Row>
      <Divider orientation="left">安全岗位津贴</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="safetyAllowanceA"
            label="安全岗岗位津贴A"
            rules={[{ required: true, message: '请输入安全岗岗位津贴A' }]}
            initialValue={320}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="safetyAllowanceB"
            label="安全岗岗位津贴B"
            rules={[{ required: true, message: '请输入安全岗岗位津贴B' }]}
            initialValue={320}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="safetyAllowanceC"
            label="安全岗岗位津贴C"
            initialValue={320}
            rules={[{ required: true, message: '请输入安全岗岗位津贴C' }]}
            readonly={viewState}
          />
        </Col>
      </Row>
      <Divider orientation="left">高温津贴</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="hotWeatherStartMonth"
            label="高温津贴开始生效月份"
            rules={[{ required: true, message: '请选择高温津贴开始生效月份' }]}
            options={monthOptions}
            initialValue={6}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormSelect
            width="md"
            name="hotWeatherEndMonth"
            label="高温津贴结束生效月份"
            rules={[{ required: true, message: '请选择高温津贴结束生效月份' }]}
            options={monthOptions}
            initialValue={10}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="hotWeatherAllowanceA"
            label="高温津贴A标准"
            rules={[{ required: true, message: '请输入高温津贴A标准' }]}
            initialValue={300}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="hotWeatherAllowanceB"
            label="高温津贴B标准"
            rules={[{ required: true, message: '请输入高温津贴B标准' }]}
            initialValue={150}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="hotWeatherAllowanceC"
            label="高温津贴C标准"
            rules={[{ required: true, message: '请输入高温津贴C标准' }]}
            initialValue={0}
            readonly={viewState}
          />
        </Col>
      </Row>
      <Divider orientation="left">值班费</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyWeekFee"
            label="工作日（元/天）"
            rules={[{ required: true, message: '请输入工作日（元/天）' }]}
            initialValue={100}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyBeforeWeekFee"
            label="休息日前一天（元/天）"
            rules={[{ required: true, message: '请输入休息日前一天（元/天）' }]}
            initialValue={150}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyBeforeFestivalFee"
            label="法定节假日前一天（元/天）"
            rules={[{ required: true, message: '请输入法定节假日前一天（元/天）' }]}
            initialValue={150}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyWeekendFee"
            label="休息日（元/天）"
            rules={[{ required: true, message: '请输入休息日（元/天）' }]}
            initialValue={200}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyFestivalFee"
            label="法定节假日（春节假期除外）（元/天）"
            rules={[{ required: true, message: '请输入法定节假日（春节假期除外）（元/天）' }]}
            initialValue={300}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyOutSpringFee"
            label="春节假期（不含除夕、初一、初二）（元/天）"
            rules={[{ required: true, message: '请输入春节假期（不含除夕、初一、初二）（元/天）' }]}
            initialValue={500}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="dutyInSpringFee"
            label="春节假期（除夕、初一、初二）（元/天）"
            rules={[{ required: true, message: '请输入春节假期（除夕、初一、初二）（元/天）' }]}
            initialValue={800}
            readonly={viewState}
          />
        </Col>
      </Row>
      <Divider orientation="left">其他</Divider>
      <Row gutter={24}>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="fullAttendanceAllowance"
            label="全勤津贴标准（元/月）"
            rules={[{ required: true, message: '请输入全勤津贴标准（元/月）' }]}
            readonly={viewState}
            initialValue={200}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="mealAllowance"
            label="就餐补贴（元/月）"
            rules={[{ required: true, message: '请输入就餐补贴（元/月）' }]}
            initialValue={0}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="oneChildAllowance"
            label="独生子女津贴标准（元/月）"
            rules={[{ required: true, message: '请输入独生子女津贴标准（元/月）' }]}
            initialValue={5}
            readonly={viewState}
          />
        </Col>
        <Col xl={8} lg={12} md={24}>
          <ProFormDigit
            width="md"
            name="unionFees"
            label="工会费"
            rules={[{ required: true, message: '请输入工会费' }]}
            initialValue={12.5}
            readonly={viewState}
          />
        </Col>
        <Col xl={24} lg={24} md={24}>
          <ProFormTextArea name="remarks" label="备注" readonly={viewState} />
        </Col>
      </Row>
    </>
  );
};

export default FormBody;
