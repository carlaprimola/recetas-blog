import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/blogs/'

const CompEditBlog = () => {
    const [title, setTitle] = useState('')    
    const [content, setContent] = useState('') 
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('') // validacion   
    const navigate = useNavigate()
    const {id} = useParams()

    //procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()

         //Validaciones
         if (!title || !content || !ingredients || !instructions || !imageUrl) {
            setError('Todos los campos son obligatorios')
            return; // Evitar enviar la solicitud si hay errores
        }

        // Validar la ruta de la imagen
        if (!imageUrl.startsWith('https://')) {
            setError('Ruta de imagen no válida. Debe empezar con "https://"')
            return;
        }

        // Limpiar el error en caso de éxito
        setError('');

        //Si no hay errores se envia
        await axios.put(URI+id, {
            title: title,
            content: content,
            ingredients: ingredients,
            instructions: instructions,
            imageUrl: imageUrl
        })
        navigate('/')
    }

    useEffect( ()=>{
        getBlogById()
    },[])

    const getBlogById = async () => {
        const res = await axios.get(URI+id)
        setTitle(res.data.title)
        setContent(res.data.content)
    }

    return (
        <section className="edit mt-5">
        <h3>Modificar Receta</h3>
        <form onSubmit={update}>
            <div className="mb-3 mt-3">
                <label className="form-label fs-6">Nombre de la receta</label>
                <input
                    value={title}
                    onChange={ (e)=> setTitle(e.target.value)}
                    type="text"
                    className="form-control"                        
                />
            </div>
            <div className="mb-3">
                <label  className="form-label">Tipo de Receta</label>
                <textarea
                    value={content}
                    placeholder='Ej. Ensalada'
                    onChange={ (e)=> setContent(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div> 
            <div className='mb-3'>
                     <label className='form-label fs-6'>Ingredientes</label>
                    <textarea
                        value={ingredients}
                        onChange={ (e)=> setIngredients(e.target.value)} 
                        type="text"
                        className='form-control'
                    />                 
                 </div>

                 <div className='mb-3'>
                     <label className='form-label fs-6'>Instrucciones</label>
                    <textarea
                        value={instructions}
                        onChange={ (e)=> setInstructions(e.target.value)} 
                        type="text"
                        className='form-control'
                    />                 
                 </div>

                 <div className='mb-3'>
                     <label className='form-label fs-6'>Imagen</label>
                    <textarea
                        value={imageUrl}
                        placeholder='Pega aquí la ruta de tu imagen'
                        onChange={ (e)=> setImageUrl(e.target.value)} 
                        type="text"
                        className='form-control'
                    /> 
                                    
                 </div>
                 <button type='submit' className='btn btn-info'>Añadir</button>                  
                 {error && <div className="alert-message-create alert alert-danger mt-2">{error}</div>}           
           
        </form>
    </section>
    )

}

export default CompEditBlog