// src/pages/Creators.tsx
import { CreatorProvider, type Creator } from '@/models/creator.model';
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Switch,
    Table,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCreatorsStore, { type CreateCreatorRequest, type UpdateCreatorRequest } from './store/creator.store';


const { Option } = Select;

const Creators: React.FC = () => {
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();

    const {
        creators,
        loading,
        getCreators,
        createCreator,
        updateCreator,
        deleteCreator,
    } = useCreatorsStore();
    console.log("🚀 ~ creators:", creators)
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [current, setCurrent] = useState<Creator | null>(null);
    const [form] = Form.useForm<Partial<CreateCreatorRequest>>();

    useEffect(() => {
        getCreators();
    }, [getCreators]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openCreate = () => {
        setEditing(false);
        setCurrent(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEdit = (record: Creator) => {
        setEditing(true);
        setCurrent(record);
        form.setFieldsValue({ ...record });
        setModalOpen(true);
    };

    const handleOk = async (): Promise<void> => {
        try {
            const values = await form.validateFields();
            if (isEditing && current) {
                await updateCreator(current.id, values as UpdateCreatorRequest);
                messageApi.success(t('creators.updated'));
            } else {
                await createCreator(values as CreateCreatorRequest);
                messageApi.success(t('creators.created'));
            }
            setModalOpen(false);
            form.resetFields();
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : t('creators.error');
            messageApi.error(msg);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDelete = async (id: string) => {
        try {
            await deleteCreator(id);
            messageApi.success(t('creators.deleted'));
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : t('creators.error');
            messageApi.error(msg);
        }
    };

    const handleToggle = async (record: Creator) => {
        try {
            await updateCreator(record.id, { enabled: !record.enabled });
            messageApi.success(t('creators.statusToggled'));
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : t('creators.error');
            messageApi.error(msg);
        }
    };

    const columns: ColumnsType<Creator> = [
        {
            title: t('creators.channelName'),
            dataIndex: 'channelName',
            key: 'channelName',
        },
        {
            title: t('creators.name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('creators.email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('creators.provider'),
            dataIndex: 'provider',
            key: 'provider',
            render: (prov: CreatorProvider) => prov,
        },
        {
            title: t('creators.cron'),
            dataIndex: 'cron',
            key: 'cron',
        },
        {
            title: t('creators.gracePeriod'),
            dataIndex: 'gracePeriod',
            key: 'gracePeriod',
        },
        {
            title: t('creators.enabled'),
            dataIndex: 'enabled',
            key: 'enabled',
            render: (_, record) => (
                <Switch checked={record.enabled} onChange={() => handleToggle(record)} />
            ),
        },
        {
            title: t('actions'),
            key: 'actions',
            render: (_, record) => {
                return (
                    <>
                        <Button type="link" onClick={() => { openEdit(record) }}>
                            {t('edit')}
                        </Button>
                        {/*                         <Popconfirm
                            title={t('creators.confirmDelete')}
                            onConfirm={() => handleDelete(record.id)}
                        >
                            <Button type="link" danger>
                                {t('delete')}
                            </Button>
                        </Popconfirm> */}
                    </>
                );
            },
        },
    ];

    return (
        <>
            {contextHolder}
            {/*             <Button type="primary" onClick={openCreate} style={{ marginBottom: 16 }}>
                {t('creators.add')}
            </Button> */}
            <Table<Creator>
                rowKey="id"
                dataSource={creators}
                columns={columns}
                loading={loading}
            />

            <Modal
                title={isEditing ? t('creators.editTitle') : t('creators.addTitle')}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => { setModalOpen(false) }}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="channelName"
                        label={t('creators.channelName')}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label={t('creators.name')}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="telegramId"
                        label={t('creators.telegramId')}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="provider"
                        label={t('creators.provider')}
                        rules={[{ required: true }]}
                    >
                        <Select>
                            {Object.values(CreatorProvider).map((p) => (
                                <Option key={p} value={p}>
                                    {p}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={t('creators.email')}
                        rules={[{ required: true, type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="cron" label={t('creators.cron')}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gracePeriod"
                        label={t('creators.gracePeriod')}
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        name="enabled"
                        label={t('creators.enabled')}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Creators;
