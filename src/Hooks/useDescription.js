import { useState } from 'react'


export const useDescription = (initialState) => {
    const [description, setDescription] = useState(initialState)


    const handleDescription = ({ target }) => {
        description[target.name] = target.value
        console.log(description)

        
    }


    return [description,handleDescription];
}
