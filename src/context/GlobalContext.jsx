import { createContext } from "react";
import { useState, useEffect } from "react";
import { agregarVideo, editarVideo, eliminarVideo } from "../api";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
const GlobalContextProvider = ({ children }) => {

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  }

  const [categorias] = useState([
    { nombre: "FRONT END", color: "#000000"},
    { nombre: "BACK END", color: "#000000" },
    { nombre: "MOBILE", color: "#000000" },
  ]);

  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const fetchVideos = async () => {

      try {

        const response = await fetch('http://localhost:3001/videos');
        const data = await response.json();

        setVideos(data);

      } catch (error) {
        alert('Erro ao conectar com o servidor', error)
      }
    };

    fetchVideos();

  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isAutoChanging, setIsAutoChanging] = useState(true);

  useEffect(() => {

    if (!isAutoChanging || !videos || videos.length === 0) return;

    if (videos.length === 1) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * videos.length);
        } while (newIndex === prevIndex);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);

  }, [isAutoChanging, videos]);

  useEffect(() => {
    if (videos && videos.length > 0) {
      const validIndex = Math.min(currentIndex, videos.length - 1);
      setCurrentIndex(validIndex);
      setCurrentVideo(videos[validIndex]);
    } else {
      setCurrentVideo(null);
    }
  }, [currentIndex, videos]);

  useEffect(() => {

    const handleResize = () => {

      const width = window.innerWidth;

      if (width > 843) {

        setIsAutoChanging(true);
        setMenu(false);

        if (!currentVideo && videos && videos.length > 0) {
          const validIndex = Math.min(currentIndex, videos.length - 1);
          setCurrentIndex(validIndex);
          setCurrentVideo(videos[validIndex]);
        }
      } else {
        setIsAutoChanging(false);
        setCurrentVideo(null);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [videos, currentIndex, currentVideo]);

  const cambiarColorCategoria = (nombreCategoria) => {

    const colorCategoria =
      categorias.find(categoria => categoria.nombre === nombreCategoria)

    return colorCategoria ? colorCategoria.color : 'transparent';
  }

  const AgregarTarjeta = async (card) => {

    try {

      const confirm = await agregarVideo(card);

      if (confirm) {
        alert('Video adicionado');
        setVideos((prevVideos) => [...prevVideos, card]);
        Limpiar();
      }

    } catch (error) {
      alert('Erro ao adicionar video', error);
    }
  };

  const EditarTarjeta = async (card) => {

    try {

      const confirm = await editarVideo(card);

      if (confirm) {

        alert('Video editado!');

        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.id === card.id ? { ...video, ...card } : video
          ));
      }

    } catch (error) {
      alert('Erro ao editar video', error);
    }
  }

  const EliminarTarjeta = async (id) => {

    try {

      const confirmar = confirm('Tem certeza que deseja apagar o video?');

      if (confirmar) {

        const success = await eliminarVideo(id);

        if (success) {
          alert('Video apagado!');
          setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
        }
      }

    } catch (error) {
      alert('Erro ao apagar video', error);
    }
  }

  const handleReset = () => {
    setInfoCard({
      titulo: '',
      categoria: 'Front end',
      imagen: '',
      enlaceVideo: '',
      descripcion: '',
    });
  };

  const Limpiar = () => {
    document.getElementById('titulo').value = '';
    document.getElementById('categoria').value = 'FRONT END';
    document.getElementById('imagen').value = '';
    document.getElementById('video').value = '';
    document.getElementById('descripcion').value = '';
  }

  const obtenerCategoriasConVideos = () => {
    return categorias.filter((categoria) =>
      videos.some(
        (video) =>
          video.categoria.toUpperCase() === categoria.nombre
      )
    );
  };

  const filtrarVideosPorCategoria = (nombreCategoria) => {
    return videos.filter(
      (video) => video.categoria.toUpperCase() === nombreCategoria
    );
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const [infoCard, setInfoCard] = useState({});

  const openModal = (props) => {

    // eslint-disable-next-line react/prop-types
    const { id, titulo, categoria, imagen, enlaceVideo, descripcion } = props;

    setInfoCard({ id, titulo, categoria, imagen, enlaceVideo, descripcion });

    setModalOpen(true);
  };


  const closeModal = () => {

    setModalOpen(false);

    reiniciarErrores();
  };

  const reiniciarErrores = () => {
    setErrors({
      nombre: { error: false, message: '' },
      imagen: { error: false, message: '' },
      video: { error: false, message: '' },
      descripcion: { error: false, message: '' }
    });
  }

  const [errors, setErrors] = useState({
    nombre: { error: false, message: '' },
    imagen: { error: false, message: '' },
    video: { error: false, message: '' },
    descripcion: { error: false, message: '' }
  });

  const validarEspacios = (texto) => {
    return texto.replaceAll(" ", "");
  }

  const validarNombre = (nombre) => {

    if (nombre.length >= 3) {
      return { error: false, message: '' }
    } else {
      return { error: true, message: 'Deve ter pelo menos 3 caracteres' }
    }
  }

  const validarImg = (imagen) => {

    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif', '.webp', 'img', 'images', 'imagen', 'image'];

    // eslint-disable-next-line react/prop-types
    const esValida = extensionesValidas.some(extension => imagen.toLowerCase().includes(extension));

    // eslint-disable-next-line react/prop-types
    if (imagen.startsWith('http') && esValida) {
      return { error: false, message: '' };
    } else {
      return { error: true, message: 'URL de imagem invalida' };
    }
  };

  const validarVideo = (video) => {
    if (video.startsWith('http') && video.includes('youtube.com')) {
      return { error: false, message: '' };
    } else {
      return { error: true, message: 'Deve ser uma URL do youtube' };
    }
  };

  const validarDescripcion = (texto) => {

    if (texto.length >= 10) {
      return { error: false, message: '' }
    } else {
      return { error: true, message: 'Deve ter pelo menos 10 caracteres' }
    }
  }

  const handleBlur = (campo, valor) => {

    let validacion;

    if (campo === 'nombre') {
      validacion = validarNombre(valor);
    } else if (campo === 'imagen') {
      validacion = validarImg(valor);
    } else if (campo === 'video') {
      validacion = validarVideo(valor);
    } else if (campo === 'descripcion') {
      validacion = validarDescripcion(valor);
    }

    setErrors((prev) => ({
      ...prev,
      [campo]: validacion,
    }));
  };

  return (
    <GlobalContext.Provider value={{
      categorias, videos,
      obtenerCategoriasConVideos, filtrarVideosPorCategoria,
      openModal, closeModal, isModalOpen, validarEspacios, errors, setErrors,
      reiniciarErrores, validarNombre, validarImg, validarVideo, handleBlur,
      infoCard, setInfoCard, AgregarTarjeta, EditarTarjeta,
      EliminarTarjeta, handleReset, Limpiar, toggleMenu,
      menu, currentVideo, cambiarColorCategoria
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;