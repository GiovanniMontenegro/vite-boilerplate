import { type ThemeConfig, theme } from 'antd';

export enum COLOR {
  PRIMARY = '#66FCF1',
  DARK_PRIMARY = '#2b6762',
  WHITE = '#fff',
  DISABLED = '#fff7',
  BLACK = '#000',
  TEXT_PRIMARY_WHITE_THEME = '#161616',
  HOVER = '#f1f1f1',
  ERROR = '#ff7875',
  BACKGROUND = '#282828',
  WARNING = '#ffc34b',
}

export const LIGHT_THEME: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  cssVar: true,
  token: {
    colorPrimary: COLOR.PRIMARY,
    colorTextLightSolid: COLOR.TEXT_PRIMARY_WHITE_THEME,
    colorWarning: COLOR.WARNING,
    fontFamily: 'Inter, sans-serif',
    colorTextPlaceholder: 'rgba(0, 0, 0, 0.45)',
  },
};

export const DARK_THEME: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  cssVar: true,
  token: {
    colorPrimary: COLOR.PRIMARY,
    colorWarning: COLOR.WARNING,
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    Collapse: {
      contentPadding: 0,
      headerPadding: 0,
    },
    Layout: {
      colorBgHeader: COLOR.BLACK,
    },
    Menu: {
      darkItemBg: COLOR.BLACK,
      darkItemSelectedBg: COLOR.PRIMARY,
      darkItemSelectedColor: COLOR.BLACK,
      darkItemColor: COLOR.WHITE,
      darkItemDisabledColor: COLOR.DISABLED,
    },
  },
};
