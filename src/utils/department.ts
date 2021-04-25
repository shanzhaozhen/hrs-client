import type { DepartmentVO } from "@/services/department/typings";

export const loopDepartmentData = (departmentList: DepartmentVO[]): any => (
  departmentList.map(({ id, name, children }) => ({
    value: id,
    title: name,
    children: children && loopDepartmentData(children),
  }))
);
