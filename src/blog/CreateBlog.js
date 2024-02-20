import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Modal from 'react-modal';

const URI = 'http://localhost:8000/blogs/';

// Establecemos la referencia para React Modal
Modal.setAppElement('#root');

const CompCreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(''); // validacion
    const [success, setSuccess] = useState(false); // mensaje receta añadida
    const navigate = useNavigate();

    // Controla la visibilidad del modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // función para abrir el modal solo si no hay errores
    const store = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!title || !content || !ingredients || !instructions || !imageUrl) {
            setError('Todos los campos son obligatorios');
            return; // Evita enviar la solicitud si hay errores
        }

        // Validar la ruta de la imagen
        if (!imageUrl.startsWith('https://')) {
            setError('Ruta de imagen no válida. Debe empezar con "https://"');
            return;
        }

        // Limpiar el error en caso de éxito
        setError('');

        try{

        // Si no hay errores se envía
        await axios.post(URI, {
            title: title,
            content: content,
            ingredients: ingredients,
            instructions: instructions,
            imageUrl: imageUrl
        });

        // Limpia los campos después de enviar
        setTitle('');
        setContent('');
        setIngredients('');
        setInstructions('');
        setImageUrl('');

       

     // Muestra el mensaje de éxito
     setSuccess(true);

     // Redirige a la página principal después de 3 segundos
            setTimeout(() => {
                setSuccess(false);
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error al guardar la receta:', error);
            setError('Hubo un error al guardar la receta. Inténtalo de nuevo.');
        }

    };

    return (
        <section className='create mt-5'>
            <main title='main-container'>
                <h3>Añadir nueva Receta</h3>
                <form onSubmit={store}>
                    <div className='mb-3 mt-3'>
                        <label className='form-label fs-6'>Nombre de la receta</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type='text'
                            className='form-control'
                            maxLength={5}
                            pattern='[^>/^>]+'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label fs-6'>Tipo de Receta</label>
                        <div className='select-container'>
                            <select
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className='select-content form-select fs-6'
                                    
                                >
                                    <option selected>Elige una opción</option>
                                    <option>Ensalada</option>
                                    <option>Pasta</option>
                                    <option>Pescado</option>
                                    <option>Arroz</option>
                                    <option>Vegetariana</option>
                                    <option>Salsas</option>
                                    <option>Otros</option>
                                </select>
                        </div>
                        
                    </div>

                    <div className='mb-3'>
                        <label className='form-label fs-6'>Ingredientes</label>
                        <textarea
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            type='text'
                            className='form-control'
                            maxLength={100}
                            pattern='[^>/^>]+'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label fs-6'>Instrucciones</label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            type='text'
                            className='form-control'
                            maxLength={300}
                            pattern='[^>/^>]+'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label fs-6'>Imagen</label>
                        <textarea
                            value={imageUrl}
                            placeholder='Pega aquí la ruta de tu imagen'
                            onChange={(e) => setImageUrl(e.target.value)}
                            type='text'
                            className='form-control'
                            maxLength={100}
                            pattern='[^>/^>]+'
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                           store(e);
                        }}
                        type='button'  // Cambié el tipo a 'button' para evitar el envío del formulario
                        className='btn btn-info'
                    >
                        Añadir
                    </button>

                    {error && <div className='alert-message-create alert alert-danger mt-2'>{error}</div>}
                    {success && <div className='alert-message-create alert alert-success mt-2'>¡Receta añadida! 🎉</div>}
                </form>
            </main>

            {/* Modal Receta Añadida */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={false}
                shouldCloseOnOverlayClick={false}
                style={{
                    content: {
                        maxWidth: '450px',
                        height: '180px',
                        top: '50%',
                        margin: 'auto',
                        marginTop: '20px',
                        transform: 'translateY(-50%)',
                        // Otros estilos según sea necesario
                    },
                }}
            >
                {/* Contenido del modal de éxito */}
                <article>
                    <button
                        className='btn-close'
                        onClick={() => {
                            console.log('Cerrando modal desde el botón');
                            setModalIsOpen(false);
                        }}
                    ></button>
                    <h3 className='mt-3 text-center display-7 fs-5'>¡Receta añadida!🎉</h3>

                    <div className='button-modal mt-3'>
                        <button
                            type='button'
                            className='button-thanks btn btn-info'
                            onClick={() => setModalIsOpen(false)}
                            aria-label='Ver recetas'
                        >
                            Ver recetas
                        </button>
                    </div>
                </article>
            </Modal>
        </section>
    );
};

export default CompCreateBlog;
