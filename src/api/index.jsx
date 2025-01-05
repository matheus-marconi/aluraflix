const agregarVideo = async (card) => {

    try {

        const conexion = await fetch('http://localhost:3001/videos', {

            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: card.id,
                titulo: card.titulo,
                categoria: card.categoria,
                imagen: card.imagen,
                enlaceVideo: card.enlaceVideo,
                descripcion: card.descripcion
            })
        });

        if (!conexion.ok) {
            alert('Erro ao adicionar video');
        }

        const res = await conexion.json();

        return res;

    } catch (error) {
        alert('Erro ao adicionar video', error);
    }
};

const editarVideo = async (card) => {

    try {

        const conexion = await fetch(`http://localhost:3001/videos/${card.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                titulo: card.titulo,
                categoria: card.categoria,
                imagen: card.imagen,
                enlaceVideo: card.enlaceVideo,
                descripcion: card.descripcion
            })
        });

        if (!conexion.ok) {
            alert('Erro ao editar video');
        }

        const res = await conexion.json();

        return res;

    } catch (error) {
        alert('Erro ao editar video', error);
    }
};

const eliminarVideo = async (id) => {
    try {
        const conexion = await fetch(`http://localhost:3001/videos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        });

        if (!conexion.ok) {
            throw new Error(`Erro ao apagar vídeo. Status: ${conexion.status}`);
        }

        return true;
    } catch (error) {
        alert(`Erro ao apagar vídeo: ${error.message}`);
        return false;
    }
};


export { agregarVideo, editarVideo, eliminarVideo }