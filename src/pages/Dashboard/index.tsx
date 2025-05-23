// src/pages/Dashboard/index.tsx

import { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useStatisticsStore } from '@/store/statistics.store';
import useAppStore from '@/store/app.store';
import useDeviceDetection, { DEVICE } from '@/hooks/useDeviceDetection';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts';

const Dashboard: React.FC = () => {
	const broadcasterId = useAppStore((state) => state.broadcasterId);
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
		if (broadcasterId) {
			fetchWeekly(broadcasterId);
			fetchMonthly(broadcasterId);
			fetchDaily(broadcasterId);
			fetchLastDay(broadcasterId);
		}
	}, [broadcasterId]);

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
