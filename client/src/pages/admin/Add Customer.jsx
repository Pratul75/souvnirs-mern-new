import React, { useState } from 'react'
import { Header } from '../../components'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import API_WRAPPER from '../../api'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../routes/paths'

const AddCustomer = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const createCustomer = async (e) => {
        e.preventDefault();
        const response = await API_WRAPPER.post("/auth/register/customer", formData)
        if (response.status === 200) {
            navigate(PATHS.adminCustomer)
        }

    }
    console.log('Add Customer.jsx', formData);
    return (
        <div><Header heading="Customer creation Panel " subheading="this is for admin to create customers" />

            <div className='mt-4 flex grid-cols-4 gap-5 w-full justify-center'>
                <form className='flex flex-col w-2/4 gap-5'>
                    <div className='flex gap-5'>

                        <div className='form-control w-full'>
                            <label className='label'>
                                first name
                            </label>
                            <input onChange={handleInputChange} name='firstName' className='input input-accent' type="text" />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                Last Name
                            </label>
                            <input onChange={handleInputChange} name="lastName" className='input input-accent' type="text" />
                        </div>
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            email
                        </label>
                        <input onChange={handleInputChange} name="email" className='input input-accent' type="email" />
                    </div>
                    <div className='flex gap-5'>

                        <div className='form-control relative w-full'>
                            <label className='label'>
                                Password
                            </label>
                            <input onChange={handleInputChange} name="password" className='input input-accent relative' type={showPassword ? "text" : "password"} />

                            <button onClick={() => {
                                setShowPassword(prev => !prev)
                            }} type="button" className=' btn btn-accent absolute top-1/2 right-0 focus:outline-none"'><AiFillEye /></button>
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                mobile
                            </label>
                            <input onChange={handleInputChange} name='mobile' className='input input-accent' type="number" />
                        </div>
                    </div>

                    <div className='form-control w-full'>
                        <label className='label'>
                            Organizaion Name
                        </label>
                        <input onChange={handleInputChange} name='organizationName' className='input input-accent' type="text" />
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            Organizaion Type
                        </label>
                        <input onChange={handleInputChange} name='organizationType' className='input input-accent' type="text" />
                    </div>
                    <div className='form-control w-full'>
                        <label className='label'>
                            Country
                        </label>
                        <input onChange={handleInputChange} name='country' className='input input-accent' type="text" />
                    </div>
                    <div className='flex gap-5'>

                        <div className='form-control w-full'>
                            <label className='label'>
                                City
                            </label>
                            <input onChange={handleInputChange} name='city' className='input input-accent' type="text" />
                        </div>
                        <div className='form-control w-full'>
                            <label className='label'>
                                Pincode                        </label>
                            <input onChange={handleInputChange} name='pincode' className='input input-accent' type="number" />
                        </div>
                    </div>
                    <button onClick={createCustomer} className='btn btn-accent self-end w-48'>Create User</button>
                </form>
            </div>
        </div>
    )
}

export default AddCustomer