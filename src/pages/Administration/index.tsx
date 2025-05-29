import { Tabs, type TabsProps } from "antd";
import { useState } from "react";
import Creators from "./pages/creator";


const Administration = (): React.ReactElement => {
	const [activeKey, setActiveKey] = useState('1')

	const onChange = (key: string) => {
		setActiveKey(key)
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Creators',
			children: <Creators />,
		},
		{
			key: '2',
			label: 'Tab 2',
			children: 'Content of Tab Pane 2',
		},
		{
			key: '3',
			label: 'Tab 3',
			children: 'Content of Tab Pane 3',
		},
	];
	return (
		<div>
			<Tabs defaultActiveKey="1" activeKey={activeKey} items={items} onChange={onChange} />
		</div>
	);
};

export default Administration