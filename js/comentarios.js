let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

function mostrarComentarios() {
    try {
        const divComentarios = document.getElementById('comentarios');
        divComentarios.innerHTML = '<h2>Comentarios:</h2>';
        comentarios.forEach((comentario, index) => {
            divComentarios.innerHTML += `<p>${index + 1}. ${comentario}</p>`;
        });
    } catch (error) {
        Toastify({
            text: "Error al mostrar comentarios. Intenta de nuevo más tarde.",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #FF4B2B, #FF416C)"
            }
        }).showToast();
        console.error('Error mostrando comentarios:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('agregarComentario').addEventListener('click', () => {
        document.getElementById('formularioComentario').classList.remove('hidden');
    });

    document.getElementById('guardarComentario').addEventListener('click', () => {
        try {
            const nuevoComentario = document.getElementById('nuevoComentario').value;
            if (nuevoComentario) {
                comentarios.push(nuevoComentario);
                localStorage.setItem('comentarios', JSON.stringify(comentarios));
                document.getElementById('formularioComentario').classList.add('hidden');
                document.getElementById('nuevoComentario').value = '';
                mostrarComentarios();
            } else {
                Toastify({
                    text: "Por favor, escribe un comentario antes de guardar.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #FF4B2B, #FF416C)"
                    }
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: "Error al guardar el comentario. Intenta de nuevo más tarde.",
                duration: 3000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #FF4B2B, #FF416C)"
                }
            }).showToast();
            console.error('Error guardando comentario:', error);
        }
    });

    document.getElementById('cancelarComentario').addEventListener('click', () => {
        document.getElementById('formularioComentario').classList.add('hidden');
    });

    mostrarComentarios();
});