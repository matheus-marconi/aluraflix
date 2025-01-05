import styles from "../Header/Header.module.css";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { HiMenuAlt2 } from "react-icons/hi";
import styled from "styled-components";

const CustomMenu = styled.section`

  background-color: var(--black-color);
  position: absolute;
  color: white;
  height: 10rem;
  width: 100%;
  top: 7rem;
  left: 0;
  z-index: 1;
  transform: ${({ $isvisible }) => ($isvisible ? "translateX(0)" : "translateX(-100%)")};
  opacity: ${({ $isvisible }) => ($isvisible ? "1" : "0")};
  transition: all 0.6s ease-in-out;


  .button__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding: 0 3rem;
    margin-top: 2rem;


    & Button {
      width: 100%;      
    }
 }
  
`;

const Header = () => {

  const { reiniciarErrores, toggleMenu, menu } = useContext(GlobalContext);

  return (
    <>
      <header className={styles.header}>
        <img src="../../img/aluraflix.png" alt="Aluraflix" />
        <div className={styles.button_container}>
          <Link to="/" style={{ textDecoration: "none" }} onClick={() => reiniciarErrores()}>
            <Button color="var(--red-color)" borde="2px solid blue" boxShadow={true} >
              Home
            </Button>
          </Link>
          <Link to="/novovideo" style={{ textDecoration: "none" }}>
            <Button>Novo Video</Button>
          </Link>
        </div>
        <HiMenuAlt2 className={styles.menu} onClick={toggleMenu} />
        <CustomMenu $isvisible={menu}>
          <div className="button__container">
            <Link to="/" style={{ textDecoration: "none" }} onClick={() => reiniciarErrores()}>
              <Button color="var(--red-color)" borde="2px solid blue" boxShadow={true}>
                Home
              </Button>
            </Link>
            <Link to="/novovideo" style={{ textDecoration: "none" }}>
              <Button>Novo Video</Button>
            </Link>
          </div>
        </CustomMenu>
      </header>
    </>
  );
};

export default Header;