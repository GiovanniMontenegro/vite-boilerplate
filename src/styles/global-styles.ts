import { createGlobalStyle } from "styled-components";
import { COLOR } from "./theme";

export const GlobalStyle = createGlobalStyle<{
	theme: { colorText: string; colorBgContainer: string };
}>`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0px;
  }
  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
  
  p {
    color: ${(p) => p.theme.colorText}
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

input:-webkit-autofill,
input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
}
input[data-autocompleted] {
    background-color: transparent !important;
}

.ant-btn > span {
  display: inline-flex;
}

.ant-tooltip-inner {
    color: #fff !important;
}

.ant-menu-dark.ant-menu-horizontal{
  background-color: ${COLOR.BLACK};
  & >.ant-menu-item-selected {
    color: ${COLOR.PRIMARY};
    font-size: 16px;
    background-color:  ${COLOR.BLACK};
    border-bottom: 1px solid ${COLOR.PRIMARY};
    border-radius: 2px;
    &:hover{
      background-color: ${COLOR.BLACK};
      color: ${COLOR.WHITE} !important;
    }
  }
  & >.ant-menu-item:not(.ant-menu-item-selected):hover {
      background-color: ${COLOR.BLACK};
      color: ${COLOR.PRIMARY} !important;
  }
}

.adm-list-item.adm-plain-anchor.adm-collapse-panel-header{
 &:hover{
 color: ${COLOR.WHITE}
}
}
`;
