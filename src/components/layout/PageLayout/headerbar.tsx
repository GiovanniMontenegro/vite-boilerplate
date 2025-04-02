
import { APP_THEME } from '@/common/constants';
import useAppStore from '@/store/app.store';
import { GithubOutlined } from '@ant-design/icons';
import { Layout, Switch } from 'antd';
const { Header } = Layout;

const Headerbar = (props: { colorBgContainer: string }): React.ReactElement => {
    const { setTheme } = useAppStore()

    return (
        <Header title='React Admin Dashboard' style={{ padding: 0, background: props.colorBgContainer }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: "0 20px", justifyContent: 'space-between' }}>
                <h2>React Admin Dashboard</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked onChange={(checked) => { setTheme(checked ? APP_THEME.LIGHT : APP_THEME.DARK); }} />
                    <p style={{ marginRight: 10 }}>Yujian Xue</p>
                    <img src="https://avatars.githubusercontent.com/u/48818060?s=48&v=4" alt="avatar" style={{ width: 40, height: 40 }} />
                    <GithubOutlined style={{ fontSize: 30 }} onClick={() => window.open('https://github.com/larry-xue/react-admin-dashboard')} />
                </div>
            </div>
        </Header>
    )
}

export default Headerbar