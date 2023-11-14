import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/company.module.css';

type FormValuesCompany = {
    companyName: string;
    email: string;
    companyCertificate: FileList;
};

const CompanyRegistration: React.FC = () => {
    const validationSchema = yup.object().shape({
        companyName: yup.string().required('Company name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        companyCertificate: yup.mixed().required('Company certificate is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValuesCompany>({
        resolver: yupResolver(validationSchema) as any,
    });

    const onSubmit: SubmitHandler<FormValuesCompany> = (data) => {
        // Handle form submission logic here
        console.log('Form data submitted:', data);
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

                <button type="submit" className={styles.button}>Submit</button>
                <button type="button" onClick={() => window.history.back()} className={styles.button}>Cancel</button>
            </form>
        </div>
    );
}

export default CompanyRegistration;