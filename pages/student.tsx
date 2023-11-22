import React, { useState } from 'react';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/student.module.css';
import { FormValuesStudent } from '../interfaces';

const StudentRegistration: React.FC = () => {
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const [columnMapping, setColumnMapping] = useState<Record<string, string>>({
        email: 'student_email',
    });
    const validationSchema = yup.object().shape({

        email: yup.string().email('Invalid email').required('Email is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValuesStudent>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit: SubmitHandler<FormValuesStudent> = async (data) => {
        try {
            const mappedData = Object.keys(data).reduce((acc, key) => {
                const columnName = columnMapping[key] || key;
                acc[columnName] = data[key];
                return acc;
            }, {});

            const response = await fetch('api/postData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table: 'swu_intern_student',
                    data: mappedData,
                }),
            });

            if (response.ok) {
                const resData = await response.json();
                console.log('API Response:', resData);
                setApiResponse(JSON.stringify(resData, null, 2));
            } else {
                console.error('API Error:', response.statusText);
                setApiResponse(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            setApiResponse(String(error));
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.heading}>Student</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.content}>

                    <label htmlFor="email">Email</label>
                    <input type="text" {...register('email')} />
                    <p>{errors.email?.message}</p>

                </div>

                <button className={styles.button} type="submit">Submit</button>
                <button className={styles.button} type="button" onClick={() => window.history.back()}>Cancel</button>

                {apiResponse && (
                    <div>
                        <h2>API Response:</h2>
                        <pre>{apiResponse}</pre>
                    </div>
                )}
            </form>
        </div>
    );
};

export default StudentRegistration;
