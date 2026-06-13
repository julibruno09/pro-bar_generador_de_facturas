// Función para procesar los datos del formulario y mostrarlos en la factura
function generarFactura() {
    // Captura de datos del formulario
    const nombre = document.getElementById('clienteNombre').value;
    const email = document.getElementById('clienteEmail').value;
    const fecha = document.getElementById('fechaOperacion').value;
    const pago = document.getElementById('metodoPago').value;

    const cantAvena = parseInt(document.getElementById('cantAvena').value) || 0;
    const precioAvena = parseFloat(document.getElementById('precioAvena').value) || 0;
    
    const cantQuinoa = parseInt(document.getElementById('cantQuinoa').value) || 0;
    const precioQuinoa = parseFloat(document.getElementById('precioQuinoa').value) || 0;

    // Validación básica
    if (!nombre || !email || !fecha) {
        alert("Por favor, completa los campos obligatorios: Nombre, Email y Fecha.");
        return;
    }

    // Cálculos
    const totalAvena = cantAvena * precioAvena;
    const totalQuinoa = cantQuinoa * precioQuinoa;
    const totalGeneral = totalAvena + totalQuinoa;

    // Formatear la fecha visualmente (de AAAA-MM-DD a DD/MM/AAAA)
    const fechaFormateada = fecha.split('-').reverse().join('/');

    // Inyectar datos en la plantilla de la factura
    document.getElementById('facturaCliente').innerText = nombre;
    document.getElementById('facturaEmail').innerText = email;
    document.getElementById('facturaFecha').innerText = fechaFormateada;
    document.getElementById('facturaPago').innerText = pago;

    // Construir la tabla de productos de forma dinámica
    let tablaHTML = "";
    
    if (cantAvena > 0) {
        tablaHTML += `
            <tr>
                <td>Barrita de Avena</td>
                <td>${cantAvena}</td>
                <td>$${precioAvena.toFixed(2)}</td>
                <td>$${totalAvena.toFixed(2)}</td>
            </tr>
        `;
    }

    if (cantQuinoa > 0) {
        tablaHTML += `
            <tr>
                <td>Barrita de Quinoa Pop</td>
                <td>${cantQuinoa}</td>
                <td>$${precioQuinoa.toFixed(2)}</td>
                <td>$${totalQuinoa.toFixed(2)}</td>
            </tr>
        `;
    }

    if (cantAvena === 0 && cantQuinoa === 0) {
        tablaHTML = `<tr><td colspan="4" style="text-align:center;">No se ingresaron productos</td></tr>`;
    }

    document.getElementById('facturaDetalle').innerHTML = tablaHTML;
    document.getElementById('facturaTotal').innerText = totalGeneral.toFixed(2);
}

// Función para redactar y abrir el mail automáticamente
function enviarPorMail() {
    const email = document.getElementById('clienteEmail').value;
    const nombre = document.getElementById('clienteNombre').value;
    const total = document.getElementById('facturaTotal').innerText;
    
    if (!email) {
        alert("Primero debés generar una factura con un email válido.");
        return;
    }

    // Asunto del correo
    const asunto = encodeURIComponent(`Tu factura de Mis Barritas Proteicas`);
    
    // Cuerpo del correo (usamos %0A para los saltos de línea)
    const cuerpo = encodeURIComponent(
        `Hola ${nombre},\n\n` +
        `Muchas gracias por tu compra.\n` +
        `El detalle de tu factura ya se encuentra listo.\n` +
        `El total de la operación es de: $${total}.\n\n` +
        `Si elegiste Cuenta Corriente, recordá realizar el pago según lo pactado.\n\n` +
        `¡Que disfrutes tus barritas!\n\n` +
        `Contacto: @misbarritas.ok`
    );

    // ENLACE DIRECTO A GMAIL: Esto abre una pestaña nueva en tu Gmail listo para enviar
    const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${asunto}&body=${cuerpo}`;
    
    // Abre el enlace en una pestaña nueva del navegador
    window.open(urlGmail, '_blank');
}