import type React from 'react';

import { Layout, theme } from 'antd';
import PageContent from './contentbar';
import Headerbar from './headerbar';
import { Footer } from './pageLayout.styled';
import PageSidebar from './sidebar';

const PageLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageSidebar />
      <Layout>
        <Headerbar colorBgContainer={colorBgContainer} />
        <PageContent />
        <Footer>
          Managram ©{new Date().getFullYear()} Created by Giovanni Montenegro
        </Footer>
      </Layout>
    </Layout>
  );
};



export default PageLayout;