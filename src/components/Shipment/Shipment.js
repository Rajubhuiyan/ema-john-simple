import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    console.log(watch("example"));

    return (

        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.name} placeholder="Enter Your Name" {...register("nameRequired", { required: true })} />
            {errors.nameRequired && <span className='error'>Name is required</span>}

            <input defaultValue={loggedInUser.email} placeholder="Enter Your Email" {...register("email", { required: true })} />
            {errors.email && <span className='error'>Email is required</span>}

            <input placeholder="Enter Shipping Address" {...register("address", { required: true })} />
            {errors.address && <span className='error'>Address is required</span>}

            <input placeholder="Enter Your Phone Number" {...register("phone", { required: true })} />
            {errors.phone && <span className='error'>Phone Number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;