import { css } from '@emotion/react'

export const calcRem = (px: number) => `${px / 16}rem`
export const typo = {
  Headline_25: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(25)};
    font-weight: 600;
  `,
  Headline_23: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(23)};
    font-weight: 600;
  `,
  Headline_20: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(20)};
    font-weight: 600;
  `,
  SubHead_18: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(18)};
    font-weight: 600;
  `,
  SubHead_14: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(14)};
    font-weight: 600;
  `,
  SubHead_12: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(12)};
    font-weight: 500;
  `,
  Body_20: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(20)};
    font-weight: 500;
  `,
  Body_16: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(16)};
    font-weight: 400;
  `,
  Body_13: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(13)};
    font-weight: 400;
  `,
  Body_12: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(12)};
    font-weight: 400;
  `,
  Body_10: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(10)};
    font-weight: 400;
  `,
  Caption_11: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(11)};
    font-weight: 400;
  `,
  Caption_9: css`
    font-family: 'Pretendard';
    font-size: ${calcRem(9)};
    font-weight: 500;
  `,
} as const
