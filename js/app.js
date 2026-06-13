// Función para procesar los datos del formulario y armar la factura visual
function generarFactura() {
    // Captura de datos ingresados
    const nombre = document.getElementById('clienteNombre').value;
    const email = document.getElementById('clienteEmail').value;
    const fecha = document.getElementById('fechaOperacion').value;
    const pago = document.getElementById('metodoPago').value;

    const cantAvena = parseInt(document.getElementById('cantAvena').value) || 0;
    const precioAvena = parseFloat(document.getElementById('precioAvena').value) || 0;
    
    const cantQuinoa = parseInt(document.getElementById('cantQuinoa').value) || 0;
    const precioQuinoa = parseFloat(document.getElementById('precioQuinoa').value) || 0;

    // Validación: Si falta un campo obligatorio, frena el proceso
    if (!nombre || !email || !fecha) {
        alert("Por favor, completa los campos obligatorios: Nombre, Mail y Fecha.");
        return;
    }

    // Cálculos de precios totales por sabor y total general
    const totalAvena = cantAvena * precioAvena;
    const totalQuinoa = cantQuinoa * precioQuinoa;
    const totalGeneral = totalAvena + totalQuinoa;

    // Formatear la fecha de la operación a formato DD/MM/AAAA
    const fechaFormateada = fecha.split('-').reverse().join('/');

    // Inyectar datos en la factura visual ("Imagen")
    document.getElementById('facturaCliente').innerText = nombre;
    document.getElementById('facturaEmail').innerText = email;
    document.getElementById('facturaFecha').innerText = fechaFormateada;
    document.getElementById('facturaPago').innerText = pago;

    // Construcción de las filas de la tabla de la factura
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

    // En caso de que no se ponga ninguna cantidad
    if (cantAvena === 0 && cantQuinoa === 0) {
        tablaHTML = `<tr><td colspan="4" style="text-align:center;">No se seleccionaron productos comerciales.</td></tr>`;
    }

    // Dibujar la tabla y el total general en pantalla
    document.getElementById('facturaDetalle').innerHTML = tablaHTML;
    document.getElementById('facturaTotal').innerText = totalGeneral.toFixed(2);
    
    alert("¡Factura generada con éxito abajo!");
}

// Función vinculada a Gmail Web para mandar los datos consolidados por correo electrónico
function enviarPorMail() {
    const email = document.getElementById('clienteEmail').value;
    const nombre = document.getElementById('clienteNombre').value;
    const total = document.getElementById('facturaTotal').innerText;
    
    if (!email || total === "0.00") {
        alert("Primero debés rellenar los datos del cliente y hacer clic en 'Generar Factura'.");
        return;
    }

    // REEMPLAZÁ EL TEXTO EN MAYÚSCULAS CON EL NOMBRE DE TU MARCA PARA EL ASUNTO DEL MAIL
    const asunto = encodeURIComponent(`Tu factura de Pro-bar`);
    
    // Cuerpo del correo redactado automáticamente con saltos de línea (\n)
    // REEMPLAZÁ LOS TEXTOS EN MAYÚSCULAS AL FINAL DEL CUERPO CON TU INFORMACIÓN COMERCIAL
    const cuerpo = encodeURIComponent(
        `Hola ${nombre},\n\n` +
        `Muchas gracias por elegirnos. Tu factura ya fue generada en nuestro sistema de manera exitosa.\n\n` +
        `El total neto de tu operación es de: $${total}.\n\n` +
        `¡Que disfrutes mucho de tus barritas saludables!\n\n` +
        `Atentamente,\n` +
        `Pro-bar\n` +
        `Instagram: @probar.oficial\n` +
        `WhatsApp: 9 11 2174-7888`
    );

    // Genera el enlace directo para abrir en tu cuenta activa de Gmail Web en el navegador
    const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${asunto}&body=${cuerpo}`;
    
    // Abre el correo listo en una pestaña nueva
    window.open(urlGmail, '_blank');
}