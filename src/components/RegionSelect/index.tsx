import React, {useEffect, useState} from 'react';
import {Cascader, Input} from 'antd';
import type {CascaderOptionType, CascaderValueType} from "antd/es/cascader";
import { getRegionTreeByLevel } from "@/services/region/region";
import type { RegionVO } from "@/services/region/typings";
import type { SizeType } from "antd/es/config-provider/SizeContext";


interface RegionSelectProps {
  size?: SizeType,
  level: number,
  hasDetail?: boolean,
  customValue?: CascaderValueType,
}

const RegionSelect: React.FC<RegionSelectProps> = (props) => {
  const { size, level, hasDetail, customValue } = props;

  const [regionOptions, setRegionOptions] = useState<CascaderOptionType[]>([]);

  const loopRegionOptions = (regionData: RegionVO[]): CascaderOptionType[] =>
    regionData.map(({ name, children }) => ({
      value: name,
      label: name,
      children: children && loopRegionOptions(children),
    }));

  useEffect(() => {
    getRegionTreeByLevel(level, -1).then(res => {
      setRegionOptions(loopRegionOptions(res))
    })
  }, []);

  const onChange = (value: any, selectedOptions: any) => {
    console.log(value, selectedOptions);
  };

  return (
    <>
      {
        hasDetail ? (
          <Input.Group compact>
            <Cascader style={{ width: '45%' }} size={size} options={regionOptions} defaultValue={customValue} onChange={onChange} />
            <Input style={{ width: '55%' }} placeholder="请输入详细地址" />
          </Input.Group>
        ) : (
          <Cascader size={size} options={regionOptions} defaultValue={customValue} onChange={onChange} />
        )
      }
    </>
  );
};

export default RegionSelect;
