import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const Application = () => {
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Add logic to submit data to the server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input type="text" name="firstName" ref={register({ required: 'First name is required' })} />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label>Last Name:</label>
      <input type="text" name="lastName" ref={register({ required: 'Last name is required' })} />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label>Email:</label>
      <input type="text" name="email" ref={register({ required: 'Email is required', pattern: /^\S+@\S+$/i })} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Age:</label>
      <input type="number" name="age" ref={register({ required: 'Age is required', min: 18 })} />
      {errors.age && <p>{errors.age.message}</p>}

      {/* Add other form fields similarly */}
      
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default Application;
