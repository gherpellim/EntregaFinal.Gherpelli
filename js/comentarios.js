let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

function mostrarComentarios() {
    const divComentarios = document.getElementById('comentarios');
    divComentarios.innerHTML = '<h2>Comentarios:</h2>';
    comentarios.forEach((comentario, index) => {
        divComentarios.innerHTML += `<p>${index + 1}. ${comentario}</p>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('agregarComentario').addEventListener('click', () => {
        document.getElementById('formularioComentario').classList.remove('hidden');
    });

    document.getElementById('guardarComentario').addEventListener('click', () => {
        const nuevoComentario = document.getElementById('nuevoComentario').value;
        if (nuevoComentario) {
            comentarios.push(nuevoComentario);
            localStorage.setItem('comentarios', JSON.stringify(comentarios));
            document.getElementById('formularioComentario').classList.add('hidden');
            document.getElementById('nuevoComentario').value = '';
            mostrarComentarios();
        }
    });

    document.getElementById('cancelarComentario').addEventListener('click', () => {
        document.getElementById('formularioComentario').classList.add('hidden');
    });

    mostrarComentarios();
});