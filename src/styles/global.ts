import { css } from '@emotion/react'
import emotionReset from 'emotion-reset'

export const globalStyle = css`
  ${emotionReset}

  @font-face {
    font-family: 'InkLipquid';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    box-sizing: border-box;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  div {
    box-sizing: border-box;
  }
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  input:focus {
    outline: none;
  }
  textarea:focus {
    outline: none;
  }
  .wave {
    animation: complete 2s;
    opacity: 0;
  }

  @keyframes complete {
    0% {
      opacity: 1;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 0;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .fade-out {
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }
`
