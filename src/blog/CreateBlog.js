import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const URI = 'http://localhost:8000/blogs/'

const CompCreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('') // validacion
    const navigate = useNavigate()    
    
    //procedimiento guardar
    const store = async (e) => {
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
        await axios.post(URI, {
            title: title, 
            content: content,
            ingredients: ingredients,
            instructions: instructions,
            imageUrl: imageUrl
        })
        navigate('/');
    }

    return (
        <section className='create mt-5'>
           <h3>Añadir nueva Receta</h3>
           <form onSubmit={store}>
                <div className='mb-3 mt-3'>
                    <label className='form-label fs-6'>Nombre de la receta</label>
                    <input
                        value={title}
                        onChange={ (e)=> setTitle(e.target.value)} 
                        type="text"
                        className='form-control'
                    />
                 </div>   
                 <div className='mb-3'>
                     <label className='form-label fs-6'>Tipo de Receta</label>
                    <textarea
                        value={content}
                        placeholder='Ej. Ensalada'
                        onChange={ (e)=> setContent(e.target.value)} 
                        type="text"
                        className='form-control'
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

export default CompCreateBlog