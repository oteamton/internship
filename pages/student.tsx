import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValuesStudent = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const StudentRegistration: React.FC = () => {
    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValuesStudent>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit: SubmitHandler<FormValuesStudent> = (data) => {
        // Handle form submission logic here
        console.log('Form data submitted:', data);
    };

    return (
        <div>
            <h1>Student Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" {...register('username')} />
                    <p>{errors.username?.message}</p>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" {...register('email')} />
                    <p>{errors.email?.message}</p>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" {...register('password')} />
                    <p>{errors.password?.message}</p>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" {...register('confirmPassword')} />
                    <p>{errors.confirmPassword?.message}</p>
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => window.history.back()}>Cancel</button>
            </form>
        </div>
    );
};

export default StudentRegistration;
