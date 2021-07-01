import {useEffect, useState} from "react";
import type {MenuVO} from "@/services/menu/typings";
import {getResourceTree} from "@/services/resource/resource";

const loopResourcesData = (menuData: MenuVO[]): any =>
  menuData.map(({ id, name, children }) => ({
    title: name,
    key: id,
    children: children && loopResourcesData(children),
  }));

export const useResourcesTree = () => {
  const [resourcesTree, setResourcesTree] = useState<[]>();
  useEffect(() => {
    getResourceTree().then(({ data }) => {
      setResourcesTree(loopResourcesData(data || []))
    });

    return () => setResourcesTree([]);
  }, []);
  return resourcesTree
}
