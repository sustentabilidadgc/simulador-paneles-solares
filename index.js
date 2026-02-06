document.addEventListener('DOMContentLoaded', () => {
    const btnCalcular = document.getElementById('Calculadora');
    const btnLimpiar = document.getElementById('limpiar');

    // Botón Calcular
    btnCalcular.addEventListener('click', (e) => {
        e.preventDefault();
        calcularSimulacion();
    });

    // Botón Limpiar
    btnLimpiar.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('form-1').reset();
        document.getElementById('vida').reset();
        
        // Limpiar textos de resultados
        document.getElementById('resultado').innerText = "";
        document.getElementById('sugerencia').innerText = "";
        document.getElementById('sinProyecto').innerText = "";
        document.getElementById('conProyecto').innerText = "";
    });

    function calcularSimulacion() {
        // 1. OBTENER DATOS
        const potenciaW = parseFloat(document.getElementById('kwp').value) || 0;
        
        // Sumar consumo de los meses
        const mesesIds = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        let consumoAnual = 0;

        mesesIds.forEach(id => {
            let val = parseFloat(document.getElementById(id).value) || 0;
            consumoAnual += val;
        });

        // 2. CÁLCULOS
        // Generación estimada: Potencia * 4.5 horas sol * 30 días * 0.8 eficiencia / 1000
        const generacionMensualPromedio = (potenciaW * 4.5 * 30 * 0.80) / 1000;
        const generacionAnual = generacionMensualPromedio * 12;

        let porcentajeAhorro = 0;
        if (consumoAnual > 0) {
            porcentajeAhorro = (generacionAnual / consumoAnual) * 100;
            if (porcentajeAhorro > 100) porcentajeAhorro = 100;
        }

        // Estimación económica
        const tarifaPromedio = 3.0; 
        const pagoAnualActual = consumoAnual * tarifaPromedio;
        const pagoAnualNuevo = (consumoAnual - generacionAnual) * tarifaPromedio;
        const pagoFinal = pagoAnualNuevo < 600 ? 600 : pagoAnualNuevo; 

        // 3. MOSTRAR RESULTADOS
        document.getElementById('resultado').innerText = `Generación Est: ${generacionAnual.toFixed(0)} kWh/año`;
        document.getElementById('sugerencia').innerText = `Cobertura solar estimada: ${porcentajeAhorro.toFixed(1)}%`;
        document.getElementById('sinProyecto').innerText = `Gasto anual actual (est): $${pagoAnualActual.toFixed(2)}`;
        document.getElementById('conProyecto').innerText = `Gasto anual con paneles (est): $${pagoFinal.toFixed(2)}`;
    }
});
