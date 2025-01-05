import styled from "styled-components";
import styles from "../Banner/Banner.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const CustomsText = styled.div`
  max-width: 40%;
  max-height: 60%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  overflow: auto;

  & h1 {
    font-family: roboto;
    font-size: 48px;
    font-weight: 800;
    color: white;
    align-self: center;
    background-color: ${(props) => props.$color || "#2271D1"};
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 5px 10px ${(props) => props.$color || "#2271D1"};
    text-align: center;
  }

  @keyframes subirBajar {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  & h2 {
    font-family: roboto;
    color: white;
    font-weight: 400;
    font-size: 46px;
  }

  & h3 {
    font-family: roboto;
    color: white;
    font-weight: 300;
    white-space: pre-wrap;
    font-size: 20px;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 9px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--red-color);
    border-radius: 10px;
  }
`;

// eslint-disable-next-line react/prop-types
const Banner = ({ img, color }) => {
  const { currentVideo } = useContext(GlobalContext);

  const categoryColors = {
    "front end": "#6BD1FF",
    "back end": "#00C86F",
    "mobile": "#FFBA05",
  };

  const categoryColor = categoryColors[currentVideo?.categoria?.toLowerCase()] || "#2271D1";

  const imagenConvertida = (imagen) => {
    if (!imagen) return "";
    return imagen.replaceAll(" ", "");
  };

  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: currentVideo
          ? `url(/img/banner-${imagenConvertida(currentVideo.categoria)}.jpg)`
          : `url(/img/banner-${img}.jpg)`,
      }}
    >
      <div className={styles.gradient} style={{ background: color }} />

      {currentVideo && (
        <div className={styles.container}>
          <CustomsText $color={categoryColor}>
            <h1>{currentVideo.categoria}</h1>
            <h2>{currentVideo.titulo}</h2>
            <h3>{currentVideo.descripcion}</h3>
          </CustomsText>
          <a href={currentVideo.enlaceVideo} target="_blank" rel="noopener noreferrer">
            <img src={currentVideo.imagen} alt="imagen" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Banner;
