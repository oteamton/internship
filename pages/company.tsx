import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/company.module.css';
import { FormValuesCompany } from '../interfaces';
import { connToDatabase, disconnFromDB } from '../utils/db';

const CompanyRegistration: React.FC = () => {
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const validationSchema = yup.object().shape({
        companyName: yup.string().required('Company name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        companyCertificate: yup.mixed().required('Company certificate is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValuesCompany>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit: SubmitHandler<FormValuesCompany> = async (data) => {
        try {
            // Convert img file to buffer
            const companyCertificate = data.companyCertificate[0];
            const imgBuffer = Buffer.from(await companyCertificate.arrayBuffer());

            // Create a new obj with img budffer
            const dataWithImg = {
                ...data,
                companyCertificate: imgBuffer,
            };

            // Post to serverless function
            const response = await fetch('api/postData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table: 'swu_intern_company',
                    data: dataWithImg,
                }),
            });

            if (response.ok) {
                const resData = await response.json();
                console.log('API Response:', resData);
                setApiResponse(JSON.stringify(resData, null, 2));
            } else {
                console.error('API Error:', response.statusText);
                setApiResponse('API Request Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setApiResponse('Error');
        }
    };

    return (
        <div className={styles.section}>
            <h1 className={styles.heading}>Company</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.content}>
                    <label htmlFor="username">Company name</label>
                    <input type="text" {...register('companyName')} />
                    <p>{errors.companyName?.message}</p>

                    <label htmlFor="email">Email</label>
                    <input type="text" {...register('email')} />
                    <p>{errors.email?.message}</p>

                    <label htmlFor="companyCertificate">Company Certificate</label>
                    <input type="file" {...register('companyCertificate')} />
                    <p>{errors.companyCertificate?.message}</p>

                </div>

                <button className={styles.button} type="submit" >Submit</button>
                <button className={styles.button} type="button" onClick={() => window.history.back()} >Cancel</button>

                {apiResponse && (
                    <div>
                        <h2>API Response:</h2>
                        <pre>{apiResponse}</pre>
                    </div>
                )}
            </form>
        </div>
    );
}

export default CompanyRegistration;