import { useContext } from "react";
import styles from "../Categoria/Categoria.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import Card from "../Card";
import hexToRgba from 'hex-to-rgba';
import PropTypes from 'prop-types';


const Categoria = ({ children, nombre, color }) => {
  const { filtrarVideosPorCategoria } = useContext(GlobalContext);

  const videosFiltrados = filtrarVideosPorCategoria(nombre);

  const titleColors = {
    "front end": "#6BD1FF",
    "back end": "#00C86F",
    "mobile": "#FFBA05",
  };

  const titleColor = titleColors[nombre?.toLowerCase()] || "#2271D1";

  const obj = {
    backgroundColor: hexToRgba(color),
    boxShadow: `0 0 15px ${titleColor}, 0 0 5px ${titleColor}, 0 0 15px ${titleColor}, 0 0 5px ${titleColor}`
  };

  return (
    <section className={styles.categoria_container} style={obj}>
      <h1 style={{ backgroundColor: titleColor }}>
        {children}
      </h1>
      <div className={styles.videos_container}>
        {videosFiltrados.map((video, index) => (
          <Card color={color} key={index} {...video} />
        ))}
      </div>
    </section>
  );
};


Categoria.propTypes = {
  children: PropTypes.node.isRequired,
  nombre: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Categoria;
