import { useState } from 'react'

const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);
    
    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    }

    return {
        values,
        handleChange
    }
}

export default useForm
