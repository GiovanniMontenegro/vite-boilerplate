// src/pages/Login/index.tsx
import { type AuthState, useAuthStore } from '@/store/auth.store';
import type { LoginRequest } from '@/types/login.type';
import { Button, Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Logo, StyledCard, StyledInput, StyledPassword, Title } from './styled/login.styled';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    // Cast the hook result to AuthState to ensure proper typing
    const { loading, login, resetStore } = useAuthStore() as AuthState;
    const [credentials, setCredentials] = useState<LoginRequest>({ username: '', password: '' });

    useEffect(() => {
        // Reset auth store and clear tokens
        resetStore();
    }, [resetStore]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLogin = async (): Promise<void> => {
        try {
            await login(credentials, navigate);
        } catch (err: unknown) {
            if (err instanceof Error) {
                message.error(err.message);
            } else {
                message.error('Errore durante il login');
            }
        }
    };

    return (
        <Container justify="center" align="middle">
            <Col xs={18} lg={6}>
                <StyledCard>
                    <Row gutter={[16, 24]} justify="center" align="middle">
                        <Col xs={6} lg={5}>
                            <Logo src="/assets/images/logo.png" alt="Logo" />
                        </Col>
                        <Col offset={1}>
                            <Title>Managram</Title>
                        </Col>
                        <Col xs={24}>
                            <StyledInput
                                id="username"
                                placeholder="Username"
                                onChange={handleChange}
                                value={credentials.username}
                            />
                        </Col>
                        <Col xs={24}>
                            <StyledPassword
                                id="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={credentials.password}
                            />
                        </Col>
                        <Col xs={12} lg={6}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                loading={loading}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </StyledCard>
            </Col>
        </Container>
    );
};
