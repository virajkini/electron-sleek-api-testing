import Styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    box-sizing: border-box;
    color: rgb(68, 68, 68);
  }

  body {
    margin: 0;
    background-color: white;
    -ms-overflow-style: scrollbar;
    -webkit-app-region:drag;


    input[type="submit"],
    input[type="reset"],
    input[type="button"],
    input[type="text"],
    button,
    textarea {
      -webkit-app-region: no-drag;
    }

    h1, h2, h3, h4, h5, h6 {
      -webkit-user-select: none;
    }
  }
`;

export const Container = Styled.div`
  padding: 32px;
  max-width: 1280px;

  .title {
    font-weight: 700;
    margin-bottom: 32px;
  }


  .row {
    padding: 16px;
    border-top: 1px solid #eee;

    display: flex;
    align-items: center;

    > div {
      width: 200px;
      display: flex;
      justify-content: flex-start:
      align-items: center;
    }

    button {
      border: 0;
      background-color: transparent;
      color: #1B72F9;

      &:hover {
        color: #1E6AD9;
        cursor: pointer;
      }
    }

    &.header {
      border: none;
    }
  }

  .header {
    font-weight: 700;
  }
`;

export const QuestionnaireContainer = Styled.div`
  padding: 32px;
  background-color: white;

  h2 {
    font-weight: 700;
    margin-bottom: 32px;
  }

  select {
    width: 200px;
    margin-bottom: 32px;
  }

  button {
    &:disabled {
      cursor: not-allowed;
    }

    border: none;
    background: none;

    background-color: #1B72F9;
    color: white;
    padding: 6px 12px;
  }
`;
