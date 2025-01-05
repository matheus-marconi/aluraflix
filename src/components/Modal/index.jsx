import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TextField from '@mui/material/TextField';
import Button from "../Button/index";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const DialogEstilizado = styled.dialog`

  background-color: var(--black-color);
  position: fixed;
  transform: translate(-0%, -105%);
  max-height: 90vh;
  overflow-y: auto; 
  z-index: 1000 !important;
  padding: 4rem 6rem;
  top: 100%;
  left: 25%;
  border-radius: 1rem;
  width: 50%;
  max-width: 50%;
  z-index: 1;
  border: 2px solid var(--red-color);
  box-shadow: 0 0 20px var(--red-color), 0 0 10px var(--red-color), 0 0 20px var(--red-color),0 0 10px var(--red-color);

 .close-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: var(--red-color);
    height: 2rem;
    width: 2rem;
    cursor: pointer;
 }

 @media (max-width: 1400px) {
    padding: 4rem 3rem;
    left: 15%;
    width: 70%;
    max-width: 70%;
  }

  @media (max-width: 800px) {
    padding: 4rem 2rem;
    left: 6%;
    width: 90%;
    max-width: 90%;
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

const CustomForm = styled.form`

    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 3rem;

    & h1 {
    color: var(--red-color);
    font-family: var(--Montserrat);
    font-weight: 600;
    }

    & .buttons-container {
    display: flex;
    justify-content: center;
    gap: 6rem;
  }

  @media (max-width: 900px) {

    & .buttons-container {
     flex-direction: column; 
     gap: 1rem;
  }

  & .buttons-container Button {
    align-self: center;
    min-width: 50%
  }

 }

  .form-label {
    margin: 0.5rem;   
  }

  .select-form {   
    padding: 5px 0.5rem 0 0.5rem;
    border-radius: 1rem;
    border: 2px solid var(--red-color);
    box-shadow: 0 0 5px var(--red-color), 0 0 5px var(--red-color), 0 0 5px var(--red-color),0 0 5px var(--red-color);
  }

  & .MuiFormLabel-root {
    color: var(--red-color);
    font-family: var(--Montserrat);
  }

  & .MuiFormLabel-root.Mui-focused {
    color: var(--red-color);
  }

`;

const CustomTextField = styled(TextField)`

  & .MuiFilledInput-root {
    color: var(--red-color);
    font-family: var(--Montserrat);
    font-weight: 600;
    font-size: 1.2rem;
    border-radius: 1rem;
  }

  & .MuiFilledInput-underline {
    border: 2px solid var(--red-color);
    box-shadow: 0 0 5px var(--red-color), 0 0 5px var(--red-color), 0 0 5px var(--red-color),0 0 5px var(--red-color);
  }

  & .MuiFilledInput-underline:after {
    border: none;
  }

  & .MuiFilledInput-underline:before {
    display: none;
  }

  .custom-helper-text {
    font-family: var(--Montserrat);
    font-size: 1rem;
    margin-top: 0.5rem;
  }

`;

const CustomNativeSelect = styled(NativeSelect)`

  & select {
    font-family: var(--Montserrat);
    font-size: 1.2rem;
    color: var(--red-color);
    font-weight: 600;
  }

  & select option {
    background: var(--black-color) !important;
  }

  &::before,
  &::after {
    border: none !important;
  }

  & .MuiNativeSelect-icon {
  color: var(--red-color);
  font-size: 1.5rem;}
`;




const Modal = () => {

  const { isModalOpen, closeModal, errors, handleBlur, infoCard,
    setInfoCard, EditarTarjeta, handleReset, validarEspacios } = useContext(GlobalContext);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const hayErrores = Object.values(errors).some(error => error.error);

    if (hayErrores) {
      alert('Por favor, corrija os erros.');
      return;
    }

    const card = {
      id: infoCard.id,
      titulo: document.getElementById('titulo').value,
      categoria: document.getElementById('categoria').value,
      imagen: document.getElementById('imagen').value,
      enlaceVideo: document.getElementById('video').value,
      descripcion: document.getElementById('descripcion').value
    };
    await EditarTarjeta(card);
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <>
          <Overlay />
          <DialogEstilizado open>
            <IoMdCloseCircle className="close-icon" onClick={closeModal} />
            <CustomForm onSubmit={handleSubmit} autoComplete="off">
              <h1>Editar Card</h1>
              <CustomTextField required type="text" id="titulo" value={infoCard.titulo} onChange={(e) => setInfoCard({ ...infoCard, titulo: e.target.value })}
                label="Titulo" variant="filled" error={errors.nombre.error}
                helperText={errors.nombre.message ? errors.nombre.message : ''}
                onBlur={(e) => handleBlur('nombre', validarEspacios(e.target.value))}
                slotProps={{ formHelperText: { className: 'custom-helper-text' }, }} />
              <FormControl required className="select-form">
                <InputLabel className="form-label" variant="standard">Categoria</InputLabel>
                <CustomNativeSelect id="categoria" value={infoCard.categoria} onChange={(e) => setInfoCard({ ...infoCard, categoria: e.target.value })}>
                  <option value='FRONT END'>Front end</option>
                  <option value='BACK END'>Back end</option>
                  <option value='MOBILE'>Mobile</option>
                </CustomNativeSelect>
              </FormControl>
              <CustomTextField required id="imagen" value={infoCard.imagen} onChange={(e) => setInfoCard({ ...infoCard, imagen: e.target.value })} error={errors.imagen.error} helperText={errors.imagen.message ? errors.imagen.message : ''}
                onBlur={(e) => handleBlur('imagen', e.target.value)}
                type="url" label="Imagen" variant="filled"
                slotProps={{
                  formHelperText: {
                    className: 'custom-helper-text'
                  },
                }} />
              <CustomTextField required id="video" value={infoCard.enlaceVideo} onChange={(e) => setInfoCard({ ...infoCard, enlaceVideo: e.target.value })} error={errors.video.error} helperText={errors.video.message ? errors.video.message : ''}
                onBlur={(e) => handleBlur('video', e.target.value)}
                type="url" label="Video" variant="filled"
                slotProps={{ formHelperText: { className: 'custom-helper-text' }, }} />
              <CustomTextField id="descripcion" value={infoCard.descripcion} onChange={(e) => setInfoCard({ ...infoCard, descripcion: e.target.value })}
                multiline minRows={6} maxRows={8} variant="filled" type="text" label="Descripcion"
                error={errors.descripcion.error} helperText={errors.descripcion.message ? errors.descripcion.message : ''} onBlur={(e) => handleBlur('descripcion', validarEspacios(e.target.value))}
                slotProps={{ formHelperText: { className: 'custom-helper-text' }, }} />
              <div className="buttons-container">
                <Button color='var(--red-color)' borde='2px solid var(--red-color)' boxShadow={true}>Salvar</Button>
                <Button type='button' onClick={handleReset}>Limpar</Button>
              </div>
            </CustomForm>
          </DialogEstilizado>
        </>
      )
      }
    </>
  );
}

export { Modal, CustomTextField, CustomNativeSelect, CustomForm };