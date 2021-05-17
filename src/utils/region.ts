import {useEffect, useState} from "react";
import type { CascaderOptionType } from "antd/es/cascader";
import {getRegionTreeByLevel} from "@/services/region/region";
import type { RegionVO } from "@/services/region/typings";


const loopRegionOptions = (regionData: RegionVO[]): CascaderOptionType[] =>
  regionData.map(({ name, children }) => ({
    value: name,
    label: name,
    children: children && loopRegionOptions(children),
  }));

export const useRegionOptions = (level: number) => {
  const [regionOptions, setRegionOptions] = useState<CascaderOptionType[]>([]);
  useEffect(() => {
    getRegionTreeByLevel(level, -1).then(({ data }) => {
      setRegionOptions(loopRegionOptions(data || []))
    });

    return () => setRegionOptions([]);
  }, []);
  return regionOptions
}
