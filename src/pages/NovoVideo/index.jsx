import styles from '../NovoVideo/NovoVideo.module.css';
import { CustomForm, CustomTextField, CustomNativeSelect } from '../../components/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '../../components/Button';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const NovoVideo = () => {
    const { errors, handleBlur, AgregarTarjeta, Limpiar, validarEspacios } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hayErrores = Object.values(errors).some(error => error.error);

        if (hayErrores) {
            alert('Por favor, corrija os erros.');
            return;
        }

        // Gera um ID único numérico baseado no timestamp
        const card = {
            id: Date.now().toString(),
            titulo: document.getElementById('titulo').value,
            categoria: document.getElementById('categoria').value,
            imagen: document.getElementById('imagen').value,
            enlaceVideo: document.getElementById('video').value,
            descripcion: document.getElementById('descripcion').value
        };

        await AgregarTarjeta(card);
    };

    return (
        <section className={styles.container}>
            <h1>Adicionar novo vídeo</h1>
            <CustomForm onSubmit={handleSubmit} className={styles.formulario} autoComplete="off">
                <CustomTextField 
                    required 
                    type="text" 
                    id="titulo" 
                    label="Titulo" 
                    variant="filled" 
                    error={errors.nombre.error}
                    helperText={errors.nombre.message || ''}
                    onBlur={(e) => handleBlur('nombre', validarEspacios(e.target.value))}
                    slotProps={{ formHelperText: { className: 'custom-helper-text' } }} 
                />

                <FormControl required className="select-form">
                    <InputLabel className="form-label" variant="standard">Categoria</InputLabel>
                    <CustomNativeSelect id="categoria">
                        <option value="FRONT END">Front end</option>
                        <option value="BACK END">Back end</option>
                        <option value="MOBILE">Mobile</option>
                    </CustomNativeSelect>
                </FormControl>

                <CustomTextField 
                    required 
                    error={errors.imagen.error} 
                    id="imagen" 
                    helperText={errors.imagen.message || ''}
                    onBlur={(e) => handleBlur('imagen', e.target.value)}
                    type="url" 
                    label="Imagem" 
                    variant="filled"
                    slotProps={{ formHelperText: { className: 'custom-helper-text' } }} 
                />

                <CustomTextField 
                    required 
                    error={errors.video.error} 
                    id="video" 
                    helperText={errors.video.message || ''}
                    onBlur={(e) => handleBlur('video', e.target.value)}
                    type="url" 
                    label="Video" 
                    variant="filled"
                    slotProps={{ formHelperText: { className: 'custom-helper-text' } }} 
                />

                <CustomTextField 
                    required 
                    label="Descrição" 
                    id="descripcion" 
                    multiline 
                    minRows={6} 
                    maxRows={8} 
                    variant="filled" 
                    type="text"
                    error={errors.descripcion.error} 
                    helperText={errors.descripcion.message || ''}
                    onBlur={(e) => handleBlur('descripcion', validarEspacios(e.target.value))} 
                    slotProps={{ formHelperText: { className: 'custom-helper-text' } }} 
                />

                <div className="buttons-container">
                    <Button type="submit" color="var(--red-color)" borde="2px solid blue" boxShadow={true}>Salvar</Button>
                    <Button type="button" onClick={Limpiar}>Limpar</Button>
                </div>
            </CustomForm>
        </section>
    );
};

export default NovoVideo;
