import { GlobalStyle } from '@/styles/global-styles';
import { theme } from 'antd';


const SharedStyle = (): React.ReactElement => {
  const {
    token: { colorText, colorBgContainer },
  } = theme.useToken();

  return <GlobalStyle theme={{ colorText, colorBgContainer }} />;
};

export default SharedStyle;
