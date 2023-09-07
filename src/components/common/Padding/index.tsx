/** @jsxImportSource @emotion/react */
import { HTMLAttributes, ReactNode } from "react";
import { css } from "@emotion/react";
interface PaddingProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size: PaddingSize
  fullWidth?: boolean;
}

export type PaddingSize =
  | number
  | [number, number]
  | [number, number, number, number]

/**
 * @param size
 * number: 상﹒하﹒좌﹒우 패딩값 설정
 * [number, number] : 상﹒하, 좌﹒우 패딩값 설정
 * [number, number, number, number] : 상, 우, 하, 좌 패딩값 설정
 * @param fullWidth true로 설정할 경우, width가 100%로 설정됩니다.
 */

const Padding = ({
  children,
  size = [12, 24],
  fullWidth = false,
  ...props
}: PaddingProps) => {
  return (
    <div
      css={css`
        padding: ${typeof size === 'number' ?
          `${size}px`
          : size.length === 2
            ? `${size[0]}px ${size[1]}px` :
            `${size[0]}px ${size[1]}px ${size[2]}px ${size[3]}px`};
        box-sizing: border-box;
        ${fullWidth && 'width: 100%;'}
      `}
      {...props}>
      {children}
    </div>
  )
}

export default Padding