import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React from 'react';
import { ScreenMode } from '../app/login/page';
import { useState } from "react";
import axios from "axios";

const SigninForm = ({ onSwitchMode }) => {
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                height: "100%",
                color: colors.grey[800]
            }}
        >
            <Stack spacing={5} sx={{
                width: "100%",
                maxWidth: "500px"
            }}>
                <Stack>
                    <Typography variant='h2' fontWeight={600} color={colors.grey[800]}>
                        Hii 👋
                    </Typography>
                    <Typography color={colors.grey[600]}>
                        SignIn to your account
                    </Typography>
                </Stack>

                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Typography
                                color={colors.grey[800]}
                                value={email}
                                onChange={
                                    (e) => {
                                        SetEmail(e.target.value)
                                    }
                                }
                            >
                                Email
                            </Typography>
                            <TextField />
                        </Stack>
                        <Stack spacing={1}>
                            <Typography
                                color={colors.grey[800]}
                                value={password}
                                onChange={
                                    (e) => {
                                        SetPassword(e.target.value)
                                    }
                                }
                            >
                                Password
                            </Typography>
                            <TextField type='password' />
                        </Stack>
                    </Stack>
                    <Button
                        onClick={() => {
                            axios.post('/api/users/login', {
                                email,
                                password
                            })
                        }}
                        variant='contained'
                        size='large'
                        sx={{
                            bgcolor: colors.grey[800],
                            "&:hover": {
                                bgcolor: colors.grey[600]
                            }
                        }}
                    >
                        Sign in
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography>Don't have an account?</Typography>
                    <Typography
                        onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                        fontWeight={600}
                        sx={{
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        Sign up now
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SigninForm;