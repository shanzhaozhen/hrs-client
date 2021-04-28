import { useEffect, useState } from "react";
import type { DepartmentVO } from "@/services/department/typings";
import { getAllDepartments, getDepartmentTree } from "@/services/department/department";
import type { DataNode } from "rc-tree/lib/interface";

export const loopDepartmentData = (departmentList: DepartmentVO[]): any => (
  departmentList.map(({ id, name, children }) => ({
    value: id,
    title: name,
    children: children && loopDepartmentData(children),
  }))
);

export const useDepartmentList = () => {
  const [departmentList, setDepartmentList] = useState<DepartmentVO[]>([]);
  useEffect(() => {
    getAllDepartments()
      .then(({ data }) => {
        setDepartmentList(data || []);
      })
      .catch(() => {
        setDepartmentList([]);
      });
  }, []);
  return departmentList;
}

export const useDepartmentTree = () => {
  const [departmentTree, setDepartmentTree] = useState<DataNode[]>([]);
  useEffect(() => {
    getDepartmentTree()
      .then(({ data }) => {
        setDepartmentTree(loopDepartmentData(data || []));
      })
      .catch(() => {
        setDepartmentTree([]);
      });
  }, []);
  return departmentTree;
}


