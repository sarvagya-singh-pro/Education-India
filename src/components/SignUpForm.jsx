import { Button, Stack, TextField, Typography, colors } from '@mui/material';
import React from 'react';
import { ScreenMode } from '../app/login/page';
import axios from "axios";
import { useState } from "react";

const SignupForm = ({ onSwitchMode }) => {
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [name, SetName] = useState("")

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your validation logic here
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Invalid email format");
            return;
        }

        // Clear form after successful signup
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

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
                        Hello👋
                    </Typography>
                </Stack>
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <Typography
                            color={colors.grey[800]}
                            value={name}
                            onChange={
                                (e) => {
                                    SetName(e.target.value)
                                }
                            }
                        >
                            Name
                        </Typography>
                        <TextField
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography
                            color={colors.grey[800]}
                            onChange={
                                (e) => {
                                    SetEmail(e.target.value)
                                }
                            }
                        >
                            Email
                        </Typography>
                        <TextField
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography
                            color={colors.grey[800]}
                            onChange={
                                (e) => {
                                    SetPassword(e.target.value)
                                }
                            }
                        >
                            Password
                        </Typography>
                        <TextField
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography color={colors.grey[800]}>Confirm Password</Typography>
                        <TextField
                            name='confirmPassword'
                            type='password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </Stack>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={handleSubmit}
                        onClick={() => {
                            axios.post('/api/users/signup', {
                                name,
                                email,
                                password
                            })
                        }}
                        sx={{
                            bgcolor: colors.grey[800],
                            "&:hover": {
                                bgcolor: colors.grey[600]
                            }
                        }}
                    >
                        Sign up
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography>Already have an account?</Typography>
                    <Typography
                        onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
                        fontWeight={600}
                        sx={{
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        Sign in
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default SignupForm;