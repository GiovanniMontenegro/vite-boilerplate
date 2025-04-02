import type React from 'react';

import { Layout, theme } from 'antd';
import PageContent from './contentbar';
import Headerbar from './headerbar';
import PageSidebar from './sidebar';

const { Footer } = Layout;

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
        <Footer style={{ textAlign: 'center' }}>
          React Admin Dashboard ©{new Date().getFullYear()} Created by Yujian Xue
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;