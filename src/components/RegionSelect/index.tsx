import React, {useEffect, useState} from 'react';
import {Cascader, Input} from 'antd';
import type {CascaderOptionType, CascaderValueType} from "antd/es/cascader";
import { getRegionTreeByLevel } from "@/services/region/region";
import type {RegionType, RegionVO} from "@/services/region/typings";
import type { SizeType } from "antd/es/config-provider/SizeContext";


interface RegionSelectProps {
  size?: SizeType,
  level: number,
  hasDetail?: boolean,
  customValue?: RegionType,
  disabled?: boolean,
  onChange?: (value: any) => void;
}

const RegionSelect: React.FC<RegionSelectProps> = (props) => {
  const { size, level, hasDetail, customValue, disabled, onChange } = props;

  const [regionOptions, setRegionOptions] = useState<CascaderOptionType[]>([]);
  const [currentValue, setCurrentValue] = useState<RegionType>({});
  const [selectValue, setSelectValue] = useState<CascaderValueType>([]);
  const [inputValue] = useState<string | number | undefined>(customValue?.detail);

  const loopRegionOptions = (regionData: RegionVO[]): CascaderOptionType[] =>
    regionData.map(({ name, children }) => ({
      value: name,
      label: name,
      children: children && loopRegionOptions(children),
    }));

  useEffect(() => {
    getRegionTreeByLevel(level, -1).then(res => {
      setRegionOptions(loopRegionOptions(res))
    });

    if (customValue) {
      if (customValue.province && customValue.city && customValue.area) {
        setSelectValue([customValue.province, customValue.city, customValue.area]);
      }
      // if (hasDetail) {
      //   setInputValue(customValue?.detail)
      // }

    }
  }, []);

  const onRegionChange = (changeValue: CascaderValueType) => {
    setCurrentValue(data => ({
      ...data,
      province: changeValue[0],
      city: changeValue[1],
      area: changeValue[2],
    }));
    onChange?.(currentValue);
  };

  const onDetailChange = (e: any) => {
    setCurrentValue(data => ({
      ...data,
      detail: e.target.value,
    }));
    onChange?.(currentValue);
  };

  return (
    <>
      {
        hasDetail ? (
          <Input.Group compact>
            <Cascader style={{ width: '45%' }} disabled={disabled} size={size} options={regionOptions} defaultValue={selectValue} onChange={onRegionChange} />
            <Input style={{ width: '55%' }} placeholder="请输入详细地址" onChange={onDetailChange} defaultValue={inputValue} disabled={disabled} />
          </Input.Group>
        ) : (
          <Cascader size={size} options={regionOptions} defaultValue={selectValue} onChange={onRegionChange} disabled={disabled} />
        )
      }
    </>
  );
};

export default RegionSelect;
