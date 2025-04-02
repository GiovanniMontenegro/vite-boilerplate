import type React from 'react';
import { Card } from 'antd';
import { Outlet } from 'react-router';


const PageContent: React.FC = () => {
    return (
        <div style={{ padding: "10px 10px", height: "calc(100vh - 114px)", overflow: "auto" }}>
            <Card style={{ height: "100%", overflow: 'auto' }}>
                <Outlet />
            </Card>
        </div>
    );
};

export default PageContent;