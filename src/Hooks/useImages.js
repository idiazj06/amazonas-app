import {useState} from 'react'
import { fileUpload } from '../Helpers/FileUpload'

export const useImages = (initialState) => {
    
    const [imagenes, setImagenes] = useState(initialState)

    const handleFileChange = (e) => {
        console.log(e.target.files.length)
        if (e.target.files.length > 7) {
            console.log('supero la cantidad')
            return
        } else {
            console.log('cantidad permitida')
            const files = e.target.files
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                console.log(i)
                fileUpload(file)
                    .then(resp => {
                        console.log(resp)
                        imagenes[i] = resp
                    }).catch(err => {
                        console.log(err.message)
                    })
            }
            
        }
    }



    return [ imagenes, handleFileChange ];
}
