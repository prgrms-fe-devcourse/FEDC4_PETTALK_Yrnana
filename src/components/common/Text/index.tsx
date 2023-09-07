import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';
import { theme } from '@/styles/theme';
import { TextType } from '@/styles/theme';
/**
 * @param as Text 컴포넌트의 종류 : 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
 * @param typo Typo theme 선택
 * @param color Palette theme 선택
 */

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  typo: TextType["typo"];
  color?: TextType["color"];
  children: ReactNode;
}

export type TextPropsKey = 'typo' | 'color';

export const Text = ({
  typo = 'Body_16',
  as = 'h1',
  color,
  children,
  ...props
}: TextProps) => {
  return (
    <StyledText typoKey={typo} as={as} colorKey={color} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.span<{ typoKey: TextType["typo"]; colorKey?: TextType["color"] }>`
  white-space: pre-wrap;
  ${({ typoKey }) => theme.typo[typoKey]};
  color: ${({ colorKey }) => { return (colorKey && theme.palette[colorKey]) }};
`;