import {Icon, Message} from "zarm";
import type {ReactNode} from "react";

/**
 * 封装zarm中Cell组件的help
 * @param errors
 * @param currentField
 */
export const customHelp = (errors: any, currentField: string | number) => {
  return (
    <>
      {
        errors && errors[currentField] ? (
          <Message
            theme="danger"
            icon={<Icon type="warning-round" size="sm" />}
          >
            {errors[currentField] ? errors[currentField] : '输入有误'}
          </Message>
        ) : null
      }
    </>
  )
}

/**
 * Zarm中的Cell添加必填样式
 * @param title
 */
export const requiredTitle = (title?: ReactNode) => {
  return (
    <>
      <span style={{color: "red"}}>*</span>
      {title}
    </>
  );
}
