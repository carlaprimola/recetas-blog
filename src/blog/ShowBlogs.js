import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import Modal from 'react-modal'

const URI = 'http://localhost:8000/blogs/'


const CompShowBlogs = () => {
    
    const [blogs, setBlog] = useState([])
    const [title, content, ingredients, instructions, imageUrl] = useState('')    
    
     
    //Abrir o cerrar un modal
     const [modalIsOpen, setModalIsOpen] = useState(false);
     const [selectedBlog, setSelectedBlog] = useState(null);
     console.log(selectedBlog)

 
     const OpenModal = (blog) => {
        console.log('Detalles de la receta:', blog)
         setSelectedBlog(blog)
         setModalIsOpen(true)
         
     }
 
     const CloseModal = () => setModalIsOpen(false);


    useEffect( ()=>{
        getBlogs()              
    },[])

    

    //Mostrar todos los blogs
    const getBlogs = async () => {
        try {
          const res = await axios.get(URI);
        //   console.log('Respuesta del servidor:', res)
          
          // Verifica si res.data es un array o si hay un campo que contiene el array.
          const blogsArray = Array.isArray(res.data) ? res.data : res.data.blogs;
          setBlog(blogsArray);
          
          console.log(blogsArray)
         

        } catch (error) {
          console.error('Error al obtener blogs:', error);
        }
      }

    //Eliminar un blog
    const deleteBlog = async (id) => {
       await axios.delete(`${URI}${id}`)
       getBlogs()
    }

   


    return(
        <section className='mt-5'>

            <main className='container'>
                
                <div className='row'>
                    {blogs.map((blog) => (
                        <div key={blog.id} className='col-md-4 mb-4'>
                            <article className='card shadow-sm p-3 mb-5 bg-body rounded'>
                                <figure className='img-container'>
                                    <img src={blog.imageUrl} 
                                    className='card-img-top' 
                                    alt={blog.title} 
                                    style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                </figure>
                                
                                                                
                                <div className='card-body'>
                                    <h5 className='card-title lead'><strong>{blog.title}</strong></h5>
                                    <p className='card-text'>{blog.content}</p>
                                    
                                    <div className='btn-group'>
                                        <Link onClick={() => OpenModal(blog)} className='btn btn-outline-primary'><i className="fa-solid fa-eye"></i></Link>
                                        <Link to={`/edit/${blog.id}`} className='btn btn-outline-primary'><i className="fas fa-edit"></i></Link>
                                        <button onClick={() => deleteBlog(blog.id)} className='btn btn-outline-primary ml-2'><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                    
                                </div>
                            </article>
                            
                        </div>
                    ))}
                    <div className="row xxl card-footer" >
                        <div className="col-sm-6" >
                            <div className="card">
                            <div className="card-body" style={{ content: {width: '500px'}}}>
                                <h5 className="card-title f-3 lead strong"><strong>¿Quieres añadir tus propias recetas?</strong></h5>
                                <p className="card-text fs-5 lead">Colabora en este Blog de Recetas añadiendo las tuyas para que todo el mundo pueda aprovecharlas.💕</p>
                                <Link to="/create" className='btn btn-info mt-2 mb-2 fs-5'>Añadir receta</Link>
                            </div>
                            </div>
                        </div>
                    </div>    

                    
                </div>
            </main>

            {/* Modal */}
                <Modal isOpen={modalIsOpen} onRequestClose={CloseModal} style={{ content: {
                     
                     maxWidth: '700px', 
                     height: '530px',
                     top: '50%',
                     margin: 'auto',
                     marginTop: '20px',
                     transform: 'translateY(-50%)'
                     }}}>
                    <section>
                        {selectedBlog ? (
                            <article>
                                <button className='btn-close' onClick={CloseModal}></button>
                                <h2 className='mt-1 text-center display-7'>{selectedBlog.title}</h2>
                                <img src={selectedBlog.imageUrl} 
                                            className='card-img-top border-top-0 rounded' 
                                            alt={selectedBlog.title} 
                                            style={{ objectFit: 'cover', height: '250px' }}
                                            />
                                <div className='mt-3 '>
                                    <h4 className='text-center fs-4 lead'>{selectedBlog.content}</h4>
                                    <p className='fs-5 lead'>{selectedBlog.ingredients}</p>
                                    <p className='fs-6 lead'>{selectedBlog.instructions}</p>
                                </div>            
                                
                            
                            </article>
                        )}
                    </section>
                    
                </Modal>

    </section>
    )

}

export default CompShowBlogs