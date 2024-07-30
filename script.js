document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushButton = document.getElementById('brushButton');
    const eraserButton = document.getElementById('eraserButton');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');

    let drawing = false;
    let currentTool = 'brush';
    let currentColor = '#000000';
    let brushSize = 5;

    // Configurar el canvas
    canvas.width = 600;
    canvas.height = 300;

    // Empezar a dibujar
    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });

    // Dibujar en movimiento del ratón
    canvas.addEventListener('mousemove', draw);

    // Parar de dibujar
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.closePath();
    });
    canvas.addEventListener('mouseout', () => {
        drawing = false;
        ctx.closePath();
    });

    // Cambiar el color del pincel
    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;
    });

    // Seleccionar la herramienta pincel
    brushButton.addEventListener('click', () => {
        currentTool = 'brush';
    });

    // Seleccionar la herramienta goma de borrar
    eraserButton.addEventListener('click', () => {
        currentTool = 'eraser';
    });

    // Guardar el dibujo
    saveButton.addEventListener('click', () => {
        const dataURL = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'dibujo.png';
        link.click();
    });

    // Cargar un dibujo
    loadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    });

    // Función para dibujar
    function draw(e) {
        if (!drawing) return;

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';

        if (currentTool === 'brush') {
            ctx.strokeStyle = currentColor;
        } else if (currentTool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
        }

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
});