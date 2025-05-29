// src/pages/Dashboard/index.tsx

import useDeviceDetection, { DEVICE } from '@/hooks/useDeviceDetection';

import { Card, Col, Row } from 'antd';
import { useEffect } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useStatisticsStore } from './store/dashboard.store';

const Dashboard: React.FC = () => {
	const {
		weekly,
		monthly,
		daily,
		lastDay,
		loading,
		error,
		fetchWeekly,
		fetchMonthly,
		fetchDaily,
		fetchLastDay,
	} = useStatisticsStore();

	const deviceInfo = useDeviceDetection();
	const isMobile = deviceInfo.deviceType === DEVICE.MOBILE;

	useEffect(() => {

			fetchWeekly();
			fetchMonthly();
			fetchDaily();
			fetchLastDay();
		
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div style={{ padding: 24 }}>
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<Card title="Subs giornaliere">
						<div style={{ fontSize: 32, fontWeight: 600, textAlign: 'center' }}>
							{lastDay}
						</div>
					</Card>
				</Col>

				<Col span={24}>
					<Card title="Andamento ultimi 14 giorni">
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={daily}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="count" />
							</LineChart>
						</ResponsiveContainer>
					</Card>
				</Col>

				<Col span={isMobile ? 24 : 12}>
					<Card title="Andamento settimanale">
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={weekly}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="count" />
							</LineChart>
						</ResponsiveContainer>
					</Card>
				</Col>

				<Col span={isMobile ? 24 : 12}>
					<Card title="Andamento mensile">
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={monthly}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="count" />
							</LineChart>
						</ResponsiveContainer>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
