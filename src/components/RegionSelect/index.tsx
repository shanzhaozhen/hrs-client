import React, {useEffect, useState} from 'react';
import { Cascader } from 'antd';
import type { CascaderOptionType } from "antd/es/cascader";
import { getRegionTreeByLevel } from "@/services/region/region";
import type { RegionVO } from "@/services/region/typings";

interface RegionSelectProps {
  level: number
}

const RegionSelect: React.FC<RegionSelectProps> = (props) => {
  const { level } = props;

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
  })

  return (
    <>
      <Cascader options={regionOptions} changeOnSelect />
    </>
  );
};

export default RegionSelect;
