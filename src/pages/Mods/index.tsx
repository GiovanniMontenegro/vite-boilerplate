// src/pages/Mods/index.tsx

import type { Moderator } from '@/models/moderator.model';
import {
	Button,
	Form,
	Input,
	message,
	Modal,
	Popconfirm,
	Space,
	Switch,
	Table,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useModeratorsStore, {
	type CreateModeratorRequest,
	type UpdateModeratorRequest,
} from './store/mods.store';

const Mods: React.FC = () => {
	const { t } = useTranslation();
	const {
		moderators,
		loading,
		error,
		getModerators,
		addModerator,
		updateModerator,
		deleteModerator,
	} = useModeratorsStore();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editing, setEditing] = useState<Moderator | null>(null);
	const [form] = Form.useForm<Partial<CreateModeratorRequest>>();

	// nuovo message hook
	const [messageApi, contextHolder] = message.useMessage();

	// carica i moderatori
	useEffect(() => {
		void getModerators();
	}, [getModerators]);

	// mostra eventuali errori
	useEffect(() => {
		if (error) {
			void messageApi.error(error);
		}
	}, [error, messageApi]);

	const openCreate = (): void => {
		setEditing(null);
		form.resetFields();
		setIsModalVisible(true);
	};

	const openEdit = (mod: Moderator): void => {
		setEditing(mod);
		form.setFieldsValue({
			telegramUsername: mod.telegramUsername,
			broadcaster: mod.broadcaster,
			enabled: mod.enabled,
		});
		setIsModalVisible(true);
	};

	const handleOk = async (): Promise<void> => {
		try {
			const values = await form.validateFields();
			if (editing) {
				await updateModerator(
					editing.id,
					values as UpdateModeratorRequest
				);
				void messageApi.success(t('moderators.updateSuccess'));
			} else {
				await addModerator(
					values as CreateModeratorRequest
				);
				void messageApi.success(t('moderators.createSuccess'));
			}
			setIsModalVisible(false);
		} catch {
			void messageApi.error(t('moderators.saveError'));
		}
	};

	const handleCancel = (): void => {
		setIsModalVisible(false);
	};

	const handleDelete = async (id: string): Promise<void> => {
		try {
			await deleteModerator(id);
			void messageApi.success(t('moderators.deleteSuccess'));
		} catch {
			void messageApi.error(t('moderators.deleteError'));
		}
	};

	const handleToggle = async (mod: Moderator): Promise<void> => {
		try {
			await updateModerator(mod.id, { enabled: !mod.enabled });
			void messageApi.success(
				mod.enabled
					? t('moderators.disableSuccess')
					: t('moderators.enableSuccess')
			);
		} catch {
			void messageApi.error(t('moderators.toggleError'));
		}
	};

	const columns = [
		{
			title: t('moderators.table.username'),
			dataIndex: 'telegramUsername',
			key: 'telegramUsername',
		},
		{
			title: t('moderators.table.broadcaster'),
			dataIndex: 'broadcaster',
			key: 'broadcaster',
		},
		{
			title: t('moderators.table.enabled'),
			dataIndex: 'enabled',
			key: 'enabled',
			render: (_: unknown, record: Moderator) => (
				<Switch
					checked={record.enabled}
					loading={loading}
					onChange={() => void handleToggle(record)}
				/>
			),
		},
		{
			title: t('moderators.table.actions'),
			key: 'actions',
			render: (_: unknown, record: Moderator) => (
				<Space>
					<Button type="link" onClick={() => { openEdit(record) }}>
						{t('moderators.actions.edit')}
					</Button>
					<Popconfirm
						title={t('moderators.confirmDelete')}
						onConfirm={() => void handleDelete(record.id)}
					>
						<Button type="link" danger>
							{t('moderators.actions.delete')}
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			{contextHolder}
			<Button
				type="primary"
				onClick={openCreate}
				style={{ marginBottom: 16 }}
			>
				{t('moderators.create')}
			</Button>

			<Table<Moderator>
				rowKey="id"
				loading={loading}
				columns={columns}
				dataSource={moderators}
			/>

			<Modal
				title={editing ? t('moderators.editTitle') : t('moderators.createTitle')}
				open={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical">
					<Form.Item
						name="telegramUsername"
						label={t('moderators.form.telegramUsername')}
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="enabled"
						label={t('moderators.form.enabled')}
						valuePropName="checked"
					>
						<Switch />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Mods;
