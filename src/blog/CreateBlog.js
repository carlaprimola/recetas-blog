import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Modal from 'react-modal'

const URI = 'http://localhost:8000/blogs/'

const CompCreateBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('') // validacion
    const navigate = useNavigate()    
    
    //Abrir o cerrar un modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    console.log(selectedBlog)

   
     
    
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
            <main>
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
                 <button onClick={() => {
                    console.log('Abriendo modal de gracias')
                    setModalIsOpen(true)}} 
                 type='submit' 
                 className='btn btn-info'
                 data-bs-toggle="modal" 
                 data-bs-target="#staticBackdrop">
                    Añadir
                    </button>    

                 {error && <div className="alert-message-create alert alert-danger mt-2">{error}</div>}
           
           </form>
            </main>

            {/* Modal Receta Añadida */}
                <Modal isOpen={modalIsOpen} onRequestClose={() => {
                    setModalIsOpen(false)}} 
                    style={{ content: {
                        maxWidth: '450px',
                        height: '180px',
                        top: '50%',
                        margin: 'auto',
                        marginTop: '20px',
                        transform: 'translateY(-50%)',
                        className: 'modal fade',
                        id:'staticBackdrop',
                        databsbackdrop:'static',
                         databskeyboard:'false',
                          tabindex:-'1',
                           arialabelledby:'staticBackdropLabel', ariahidden:'true'
                    }}}>
                        <article>
                            <button className='btn-close' onClick={() => { 
                                console.log('Cerrando modal desde el botón')
                                setModalIsOpen(false)}}>
                                    
                                </button>
                            <h3 className='mt-3 text-center display-7 fs-5'>
                                ¡Receta añadida!🎉</h3>

                            <div className='button-modal mt-3'>
                            <button type="button" className="button-thanks btn btn-info" onClick={() => setModalIsOpen(false)}  aria-label="Ver recetas">Ver recetas</button>
                            </div>    
                            
                        </article>
            </Modal>

           
        </section>
    )
}

export default CompCreateBlog