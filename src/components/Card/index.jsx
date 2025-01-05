import styles from '../Card/Card.module.css';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import PropTypes from 'prop-types';

const Card = (props) => {
    let { id, imagen, enlaceVideo, categoria } = props;

    const { openModal, EliminarTarjeta } = useContext(GlobalContext);

    id = Number(id);

    const categoryColors = {
        "front end": "#6BD1FF",
        "back end": "#00C86F",
        "mobile": "#FFBA05",
    };

    const categoryColor = categoryColors[categoria?.toLowerCase()] || "#2271D1";

    return (
        <div
            className={styles.card_container}
            style={{
                boxShadow: `0px 0px 17px 8px ${categoryColor}`,
            }}
        >
            <header>
                <a href={enlaceVideo} target="_blank" rel="noopener noreferrer">
                    <img src={imagen} alt="imagen" />
                </a>
            </header>
            <footer
                style={{
                    borderColor: categoryColor,
                    boxShadow: `0px -4px 5px 3px ${categoryColor} inset`,
                }}
            >
                <div className={styles.iconContainer}>
                    <button onClick={() => openModal(props)}>
                        <FaEdit className={`${styles.icon}`} />
                        <p>Editar</p>
                    </button>
                </div>
                <div className={styles.iconContainer}>
                    <button onClick={() => EliminarTarjeta(id)}>
                        <MdDeleteForever className={`${styles.icon} ${styles.deleteIcon}`} />
                        <p>Apagar</p>
                    </button>
                </div>
            </footer>
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imagen: PropTypes.string.isRequired,
    enlaceVideo: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
};

export default Card;

