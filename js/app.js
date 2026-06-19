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

    // Cálculos de precios totales por sabor (Precios con IVA incluido)
    const totalAvena = cantAvena * precioAvena;
    const totalQuinoa = cantQuinoa * precioQuinoa;
    
    // El Total General es la suma directa porque los precios ya traen el impuesto
    const totalGeneral = totalAvena + totalQuinoa;

    // --- DESGLOSE DE IVA (MÉTODO 2: El precio ya incluye IVA) ---
    const subtotal = totalGeneral / 1.21;
    const iva = totalGeneral - subtotal;

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

    // Dibujar la tabla en pantalla
    document.getElementById('facturaDetalle').innerHTML = tablaHTML;
    
    // Inyectar los valores discriminados en el HTML
    document.getElementById('facturaSubtotal').innerText = subtotal.toFixed(2);
    document.getElementById('facturaIVA').innerText = iva.toFixed(2);
    document.getElementById('facturaTotal').innerText = totalGeneral.toFixed(2);
    
    doc.save("Factura ${nombre} - Pro-bar.pdf");

    alert("¡Factura generada con éxito abajo!");
}