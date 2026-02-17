const cuestionario = document.getElementById("Calculadora");
const clean = document.getElementById("limpiar");
const corrida = document.getElementById("flujo");
const energetica = document.getElementById("energia");

clean.addEventListener("click", limpiar);
cuestionario.addEventListener("click", candidatos);
cuestionario.addEventListener("click", energia);
cuestionario.addEventListener("click", render);
cuestionario.addEventListener("click", flujoFinanciero);
//corrida.addEventListener("click", flujoFinanciero);
//energetica.addEventListener("click", energia);
//energetica.addEventListener("click", render);
//------------------------------------------
//Precios por numeros de paneles agregar el precio del proveedor Green Republic - watt y watts son las listas con los precios de paneles
var watt = [0,0,25619.24,
    37593.46,
    49585.63,
    56228.13,
    67473.76,
    78719.38,
    89965.01,
    97487.80,
    108319.78,
    119151.76,
    129983.74,
    137852.00,
    148456.00,
    152068.35,
    169692.99,
    178202.30,
    188684.79,
    199167.28
    ];
let paneles = 550; //colocar el tamaño de los paneles disponibles por el proveedor
function limpiar(event){
    window.location.href = window.location.href;
}


function candidatos(event){
    //console.log({event}); para detener el reset es preventDefault.
    //event.preventDefault();

    //const nombre = document.getElementById('nombre').value;
    //const FDE = parseFloat(document.getElementById('FDE').value);
    const FDT = parseFloat(document.getElementById('FDT').value);
    //const dolar = parseFloat(document.getElementById('dolar').value);
    const kwp = parseFloat(document.getElementById('kwp').value);
    const prestamos = ((parseFloat(document.getElementById('prestamos').value)+1)/100);
    const CC = parseFloat(document.getElementById('CC').value);
    const autocop = parseFloat(document.getElementById('autocop').value);
    const bruto = parseFloat(document.getElementById('bruto').value);
    const neto = parseFloat(document.getElementById('neto').value);
    const fecha = (document.getElementById('fecha').value);
    const directivo = document.getElementById('directivo');
    const FDTT = FDT - CC - autocop;
    let sfv = (watt[(kwp/paneles)]); //Precio del sistema solar
    //var antiguedad = document.getElementById('fecha'); //por definir
    //let mes = antiguedad.getMonth(); //por definir

    //fecha de ingreso
    const anio = parseInt(String(fecha).substring(0,4));
    const mes = parseInt(String(fecha).substring(5,7));

    //fecha en vida real
    let date = new Date();
    let yyyy = parseInt(date.getFullYear());
    let mm = parseInt(date.getMonth()+1);
    var antiguedad = 0;

    if ((mm-mes) <= 0){
        antiguedad = ((mm-mes)+(yyyy-anio)*12);
        console.log("meses pasados1: "+ antiguedad);

    }else if (mm-mes >0){
        antiguedad = ((mm-mes)+(yyyy-anio)*12);
        console.log("meses pasados2: "+ antiguedad);
    }

    if (directivo.checked){
        if (antiguedad<=12){
            var antiguedad = 0;
            var rendimientos = 0;
        } else if (antiguedad>12 & antiguedad <=60){
            var rendimientos = 0.08;
        } else if (antiguedad>60){
            var rendimientos = 0.13;
        }
    } else if (antiguedad<=12){
        var antiguedad = 0;
        var rendimientos =0;
    } else if (antiguedad>12 & antiguedad <=60){
        var rendimientos = 0.07;
    } else if (antiguedad>60 & antiguedad <=120){
        var rendimientos = 0.12;
    } else if (antiguedad>120){
        var rendimientos = 0.13;
    } else console.log("Error, no cae en ningun caso de antiguedad");

    console.log(rendimientos);

    //Calculo de la prima seguros HDI
    var prima = sfv*0.014;

    if (prima < 1000){
        var prima = 1000;
    };

    if (prima>= 0 & prima <=1000){
        var gasto = 150;
    }else if (prima>=1000.01 & prima <= 2500 ){
        var gasto = 270;
    }else if (prima>=2500.01 & prima <= 10000 ){
        var gasto = 500;
    }else if (prima>=10000.01 & prima <= 50000 ){
        var gasto = 660;
    }else if (prima>=50000.01 ){
        var gasto = 900;
    }

    prima = (prima+gasto)*1.16;
    console.log("PRIMO: " + prima);

    // fin calculo de prima HDI
    /*
    if (sfv>= 0 & sfv <=25053){
        var prima = 696;
    }else if (sfv>=25053.1 & sfv <= 37759 ){
        var prima = 696;
    }else if (sfv>=37759.1 & sfv <= 50106 ){
        var prima = 696;
    }else if (sfv>=50106.1 & sfv <= 62632 ){
        var prima = 755.23;
    }else if (sfv>=62632.1 & sfv <= 75159){
        var prima = 900.53;
    }else if (sfv>=75159.1 & sfv <= 87685){
        var prima = 1045.84;
    }else if (sfv>=87685.1 & sfv <= 100211){
        var prima = 1191.15;
    }else if (sfv>=100211.1 & sfv <= 112738){
        var prima = 1336.45;
    }else if (sfv>=112738.1){
        var prima = 1481.76;
    } else alert("Ingresa un valor correcto");
    //console.log("prima es:" + prima);
    */
    let subprestamo = sfv;
    //console.log("subprestamo es: " + subprestamo);
    var mensualidad = 0;

    if ((0.05*bruto)>(prestamos*subprestamo)){
        mensualidad = (0.05*bruto);
        var meses = Math.round((subprestamo/mensualidad));
        var periodo = Math.ceil(meses/12);
        var prestamo = (subprestamo+(prima*2))*1; //es 0.9 porque es el 90% que se saca del fondo de ahorro, el 10% es de su bolsillo, el 2 es porque son 2 años, reemplazar 2 -> periodo si quiere cubrir los paneles por todo el prestamo. 
        var credito = Math.round((prestamo/mensualidad)*1.1); // tiempo estimado de meses 1.1 es por la diferencia entre el fondo de ahorrrrro y sus rendimientos

    } else var mensualidad = subprestamo*prestamos;
        var meses = Math.round((subprestamo/mensualidad));
        var periodo = Math.ceil(meses/12);
        var prestamo = (subprestamo+(prima*2))*1;
        var credito = Math.round((prestamo/mensualidad)*1.1);
        console.log("prima total: "+prima*periodo);

    //console.log("periodo en años es: "+periodo);
    //console.log("periodo en primas es: "+periodo*prima);

    if (FDTT >= prestamo){
        const subtotal=neto-mensualidad;
        if ((subtotal) > (bruto*0.4)){
            document.getElementById('resultado').innerHTML= "Felicidades tienes posibilidades de un prestamo de <b>$"+ prestamo.toFixed(2) +"</b> pesos, con una mensualidad de <b>$"+ mensualidad.toFixed(2) +"</b> pesos. El precio ya incluye un seguro por <b>$" + (prima*2).toFixed(0)+ "</b> pesos por una vigencia de 2 años."; //el tiempo de tu prestamo es de <b>"+ credito +" meses </b> aproximadamente,
        } else document.getElementById('resultado').innerText= "Lo siento, no cumples con los requisitos.";
    }
    else document.getElementById('resultado').innerText= "Lo siento, no cumples con los requisitos.";
    //console.log(mensualidad);
    return 0;
}

var factura = [];
var facturaNormal = [];

function energia(event){

    const ene = Math.ceil(document.getElementById("ene").value);
    const feb = Math.ceil(document.getElementById("feb").value);
    const mar = Math.ceil(document.getElementById("mar").value);
    const abr = Math.ceil(document.getElementById("abr").value);
    const may = Math.ceil(document.getElementById("may").value);
    const jun = Math.ceil(document.getElementById("jun").value);
    const jul = Math.ceil(document.getElementById("jul").value);
    const ago = Math.ceil(document.getElementById("ago").value);
    const sep = Math.ceil(document.getElementById("sep").value);
    const oct = Math.ceil(document.getElementById("oct").value);
    const nov = Math.ceil(document.getElementById("nov").value);
    const dic = Math.ceil(document.getElementById("dic").value);
    //const dolar = parseFloat(document.getElementById('dolar').value);


    var meses = [ene,feb,mar,abr,may,jun,jul,ago,sep,oct,nov,dic];
    var dias = [31,28,31,30,31,30,31,31,30,31,30,31];
    var hsp = [4.32,4.32,4.32,4.32,4.32,4.32,4.32,4.32,4.32,4.32,4.32,4.32]; //factor de planta al 18% minimo, (365*24hrs*18%)= 4.32 HSP

    //Actualizar las tarifas para el año que acaba de pasar.

    //--1F
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    //--1E
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    //--1D
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    //--1C
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    //--1B
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    //--1A
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    //--1
    //var tarifaBase = [0.882,0.887,0.892,0.897,0.669,0.673,0.677,0.681,0.685,0.689,0.933,0.939];
    //var tarifaInterbajo = [1.073,1.079,1.085,1.091,0.835,0.84,0.845,0.85,0.855,0.86,1.139,1.146];
    //var tarifaInteralto = [0,0,0,0,2.032,2.044,2.056,2.068,2.08,2.092,0,0];
    //var tarifaExcedente = [3.134,3.153,3.172,3.191,3.210,3.229,3.248,3.267,3.286,3.306,3.326,3.346];
    
    //var factura = [];
    //var facturaNormal = [];

    let tir=[];
    let watts=[0,0,25619.24,
        37593.46,
        49585.63,
        56228.13,
        67473.76,
        78719.38,
        89965.01,
        97487.80,
        108319.78,
        119151.76,
        129983.74,
        137852.00,
        148456.00,
        152068.35,
        169692.99,
        178202.30,
        188684.79,
        199167.28
        ];
    //precios de sistemas solares
    //----------empezar el ciclo for aqui for (kwp= 0.550; kwp<10.8; kwp+0.550)---------
    for (var r=2 ; r<21 ; r++ ){
        var n = r * 0.55
        kwp = n;
        var totalsumado = 0;
        var totalsumado2 = 0;
        var totalsumado3 = 0;

        var totalsumadoNormal = 0;
        var totalsumado2Normal = 0;
        var totalsumado3Normal = 0;

        var totalgeneracion = 0;
        let totaldemanda = 0;

        var extra = 0;
    var tarifa = document.getElementById("tarifa").value
    if (tarifa === "1"){
        //tarifa 1F 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.767,0.77,0.773,0.776,0.779,0.782,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,0.955,0.958,0.961,0.964,0.967,0.97,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,2.322,2.33,2.338,2.346,2.354,2.362,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin
    console.log("exc con paneles:" +excedente+" "+ nombreMeses[i]);

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    console.log("base sp:" + base1);
    console.log("interbajo sp:" +interbajo1);
    console.log("exc sin paneles:" +excedente1);

    //console.log("subtotal sp:" +subtotal1);
    console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>300){
        var base = 300*tarifaBase[i];
        if((facturacion-300)>900){
            var interbajo = 900*tarifaInterbajo[i];
            if ((facturacion-1200)>1300){
                var interalto = 1300*tarifaInteralto[i];
                if ((facturacion-2500)>0){
                    var excedente = ((facturacion-2500)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-1200)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-1200)*tarifaInteralto[i])


        }else if((facturacion-300)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-300)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin
    console.log("exc con paneles:" +excedente+" "+ nombreMeses[i]);

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>300){
        var base1 = 300*tarifaBase[i];
        if((facturacionNormal-300)>900){
            var interbajo1 = 900*tarifaInterbajo[i];
            if ((facturacionNormal-1200)>1300){
                var interalto1 = 1300*tarifaInteralto[i];
                if ((facturacionNormal-2500)>0){
                    var excedente1 = ((facturacionNormal-2500)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-1200)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-1200)*tarifaInteralto[i])


        }else if((facturacionNormal-300)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-300)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    console.log("base sp:" + base1);
    console.log("interbajo sp:" +interbajo1);
    console.log("interalto sp:" +interalto1);
    console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin
    console.log("exc con paneles:" +excedente+" "+ nombreMeses[i]);
    
    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    console.log("base sp:" + base1);
    console.log("interbajo sp:" +interbajo1);
    console.log("exc sp para 1F:" +excedente1);

    //console.log("subtotal sp:" +subtotal1);
    console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "2"){
        //tarifa 1E 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.767,0.77,0.773,0.776,0.779,0.782,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,0.955,0.958,0.961,0.964,0.967,0.97,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,1.24,1.244,1.248,1.252,1.256,1.26,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>300){
        var base = 300*tarifaBase[i];
        if((facturacion-300)>450){
            var interbajo = 450*tarifaInterbajo[i];
            if ((facturacion-750)>150){
                var interalto = 150*tarifaInteralto[i];
                if ((facturacion-900)>0){
                    var excedente = ((facturacion-900)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-750)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-750)*tarifaInteralto[i])


        }else if((facturacion-300)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-300)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>300){
        var base1 = 300*tarifaBase[i];
        if((facturacionNormal-300)>450){
            var interbajo1 = 450*tarifaInterbajo[i];
            if ((facturacionNormal-750)>150){
                var interalto1 = 150*tarifaInteralto[i];
                if ((facturacionNormal-900)>0){
                    var excedente1 = ((facturacionNormal-900)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-750)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-750)*tarifaInteralto[i])


        }else if((facturacionNormal-300)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-300)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "3"){
        //tarifa 1D 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,1.375,1.38,1.385,1.39,1.395,1.4,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>175){
        var base = 175*tarifaBase[i];
        if((facturacion-175)>225){
            var interbajo = 225*tarifaInterbajo[i];
            if ((facturacion-400)>200){
                var interalto = 200*tarifaInteralto[i];
                if ((facturacion-600)>0){
                    var excedente = ((facturacion-600)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-400)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-400)*tarifaInteralto[i])


        }else if((facturacion-175)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-175)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>175){
        var base1 = 175*tarifaBase[i];
        if((facturacionNormal-175)>225){
            var interbajo1 = 225*tarifaInterbajo[i];
            if ((facturacionNormal-400)>200){
                var interalto1 = 200*tarifaInteralto[i];
                if ((facturacionNormal-600)>0){
                    var excedente1 = ((facturacionNormal-600)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-400)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-400)*tarifaInteralto[i])


        }else if((facturacionNormal-175)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-175)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "4"){
        //tarifa 1C 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,1.375,1.38,1.385,1.39,1.395,1.4,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>100){
                var interbajo = 100*(tarifaInterbajo[i]);
                if ((facturacion-175)>0){
                    var excedente = ((facturacion-175)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>100){
            var interbajo1 = 100*(tarifaInterbajo[i]);
              if ((facturacionNormal-175)>0){
                  var excedente1 = ((facturacionNormal-175)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>150){
        var base = 150*tarifaBase[i];
        if((facturacion-150)>150){
            var interbajo = 150*tarifaInterbajo[i];
            if ((facturacion-300)>150){
                var interalto = 150*tarifaInteralto[i];
                if ((facturacion-450)>0){
                    var excedente = ((facturacion-450)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-300)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-300)*tarifaInteralto[i])


        }else if((facturacion-150)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-150)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>150){
        var base1 = 150*tarifaBase[i];
        if((facturacionNormal-150)>150){
            var interbajo1 = 150*tarifaInterbajo[i];
            if ((facturacionNormal-300)>150){
                var interalto1 = 150*tarifaInteralto[i];
                if ((facturacionNormal-450)>0){
                    var excedente1 = ((facturacionNormal-450)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-300)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-300)*tarifaInteralto[i])


        }else if((facturacionNormal-150)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-150)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>100){
            var interbajo = 100*(tarifaInterbajo[i]);
              if ((facturacion-175)>0){
                  var excedente = ((facturacion-175)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>100){
            var interbajo1 = 100*(tarifaInterbajo[i]);
              if ((facturacionNormal-175)>0){
                  var excedente1 = ((facturacionNormal-175)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "5"){
        //tarifa 1B 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,0,0,0,0,0,0,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
             //ene-dic 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 12 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>100){
                var interbajo = 100*(tarifaInterbajo[i]);
                if ((facturacion-175)>0){
                    var excedente = ((facturacion-175)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>100){
            var interbajo1 = 100*(tarifaInterbajo[i]);
              if ((facturacionNormal-175)>0){
                  var excedente1 = ((facturacionNormal-175)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);
    }else if (tarifa === "6"){
        //tarifa 1A 2023
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,0,0,0,0,0,0,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-dic 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 12 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>75){
                var interbajo = 75*(tarifaInterbajo[i]);
                if ((facturacion-150)>0){
                    var excedente = ((facturacion-150)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>75){
            var interbajo1 = 75*(tarifaInterbajo[i]);
              if ((facturacionNormal-150)>0){
                  var excedente1 = ((facturacionNormal-150)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);

    }else{//tarifa 1 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,0,0,0,0,0,0,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];

        //ene-dic 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 12 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>65){
                var interbajo = 65*(tarifaInterbajo[i]);
                if ((facturacion-140)>0){
                    var excedente = ((facturacion-140)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>65){
            var interbajo1 = 65*(tarifaInterbajo[i]);
              if ((facturacionNormal-140)>0){
                  var excedente1 = ((facturacionNormal-140)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);  //consumo de excedente en tarifa 1
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };
    };
    //------ciclo for fin ------
    var conProyecto = (totalsumado + totalsumado2 + totalsumado3);
    var sinProyecto = (totalsumadoNormal + totalsumado2Normal + totalsumado3Normal);
    var ahorro = sinProyecto-conProyecto;
    var tiempo = (((watts[r]))/ahorro).toFixed(2); //Watts es el precio de los sistemas solares y sobre los ahorros se obtiene el tiempo de recuperación 
    tir.push(Number(tiempo));

}
console.log("Retorno: " + tir);
//console.log("tipo de valor: " + typeof(dolar));
var minimo = Math.min(...tir);
    console.log("Valor minimo: "+ minimo);
    var mejorOpcion = tir.indexOf(minimo) + 2;
    console.log("Mejor opcion: " + mejorOpcion);

        var totalsumado = 0;
        var totalsumado2 = 0;
        var totalsumado3 = 0;

        var totalsumadoNormal = 0;
        var totalsumado2Normal = 0;
        var totalsumado3Normal = 0;

        var totalgeneracion = 0;
        let totaldemanda = 0;

        var extra = 0;
    var kwp = document.getElementById("kwp").value/1000;
    var tarifa = document.getElementById("tarifa").value
    if (tarifa === "1"){
        //tarifa 1F 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.767,0.77,0.773,0.776,0.779,0.782,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,0.955,0.958,0.961,0.964,0.967,0.97,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,2.322,2.33,2.338,2.346,2.354,2.362,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>300){
        var base = 300*tarifaBase[i];
        if((facturacion-300)>900){
            var interbajo = 900*tarifaInterbajo[i];
            if ((facturacion-1200)>1300){
                var interalto = 1300*tarifaInteralto[i];
                if ((facturacion-2500)>0){
                    var excedente = ((facturacion-2500)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-1200)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-1200)*tarifaInteralto[i])


        }else if((facturacion-300)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-300)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>300){
        var base1 = 300*tarifaBase[i];
        if((facturacionNormal-300)>900){
            var interbajo1 = 900*tarifaInterbajo[i];
            if ((facturacionNormal-1200)>1300){
                var interalto1 = 1300*tarifaInteralto[i];
                if ((facturacionNormal-2500)>0){
                    var excedente1 = ((facturacionNormal-2500)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-1200)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-1200)*tarifaInteralto[i])


        }else if((facturacionNormal-300)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-300)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "2"){
        //tarifa 1E 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.767,0.77,0.773,0.776,0.779,0.782,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,0.955,0.958,0.961,0.964,0.967,0.97,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,1.24,1.244,1.248,1.252,1.256,1.26,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>300){
        var base = 300*tarifaBase[i];
        if((facturacion-300)>450){
            var interbajo = 450*tarifaInterbajo[i];
            if ((facturacion-750)>150){
                var interalto = 150*tarifaInteralto[i];
                if ((facturacion-900)>0){
                    var excedente = ((facturacion-900)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-750)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-750)*tarifaInteralto[i])


        }else if((facturacion-300)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-300)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>300){
        var base1 = 300*tarifaBase[i];
        if((facturacionNormal-300)>450){
            var interbajo1 = 450*tarifaInterbajo[i];
            if ((facturacionNormal-750)>150){
                var interalto1 = 150*tarifaInteralto[i];
                if ((facturacionNormal-900)>0){
                    var excedente1 = ((facturacionNormal-900)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-750)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-750)*tarifaInteralto[i])


        }else if((facturacionNormal-300)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-300)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "3"){
        //tarifa 1D 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,1.375,1.38,1.385,1.39,1.395,1.4,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>175){
        var base = 175*tarifaBase[i];
        if((facturacion-175)>225){
            var interbajo = 225*tarifaInterbajo[i];
            if ((facturacion-400)>200){
                var interalto = 200*tarifaInteralto[i];
                if ((facturacion-600)>0){
                    var excedente = ((facturacion-600)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-400)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-400)*tarifaInteralto[i])


        }else if((facturacion-175)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-175)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>175){
        var base1 = 175*tarifaBase[i];
        if((facturacionNormal-175)>225){
            var interbajo1 = 225*tarifaInterbajo[i];
            if ((facturacionNormal-400)>200){
                var interalto1 = 200*tarifaInteralto[i];
                if ((facturacionNormal-600)>0){
                    var excedente1 = ((facturacionNormal-600)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-400)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-400)*tarifaInteralto[i])


        }else if((facturacionNormal-175)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-175)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "4"){
        //tarifa 1C 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,1.375,1.38,1.385,1.39,1.395,1.4,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>100){
                var interbajo = 100*(tarifaInterbajo[i]);
                if ((facturacion-175)>0){
                    var excedente = ((facturacion-175)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>100){
            var interbajo1 = 100*(tarifaInterbajo[i]);
              if ((facturacionNormal-175)>0){
                  var excedente1 = ((facturacionNormal-175)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>150){
        var base = 150*tarifaBase[i];
        if((facturacion-150)>150){
            var interbajo = 150*tarifaInterbajo[i];
            if ((facturacion-300)>150){
                var interalto = 150*tarifaInteralto[i];
                if ((facturacion-450)>0){
                    var excedente = ((facturacion-450)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-300)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-300)*tarifaInteralto[i])


        }else if((facturacion-150)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-150)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>150){
        var base1 = 150*tarifaBase[i];
        if((facturacionNormal-150)>150){
            var interbajo1 = 150*tarifaInterbajo[i];
            if ((facturacionNormal-300)>150){
                var interalto1 = 150*tarifaInteralto[i];
                if ((facturacionNormal-450)>0){
                    var excedente1 = ((facturacionNormal-450)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-300)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-300)*tarifaInteralto[i])


        }else if((facturacionNormal-150)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-150)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>100){
            var interbajo = 100*(tarifaInterbajo[i]);
              if ((facturacion-175)>0){
                  var excedente = ((facturacion-175)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>100){
            var interbajo1 = 100*(tarifaInterbajo[i]);
              if ((facturacionNormal-175)>0){
                  var excedente1 = ((facturacionNormal-175)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };
    }else if (tarifa === "5"){
        //tarifa 1B 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,0,0,0,0,0,0,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
             //ene-dic 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 12 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>100){
                var interbajo = 100*(tarifaInterbajo[i]);
                if ((facturacion-175)>0){
                    var excedente = ((facturacion-175)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>100){
            var interbajo1 = 100*(tarifaInterbajo[i]);
              if ((facturacionNormal-175)>0){
                  var excedente1 = ((facturacionNormal-175)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);
    }else if (tarifa === "6"){
        //tarifa 1A 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,0,0,0,0,0,0,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];
            //ene-dic 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 12 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>75){
                var interbajo = 75*(tarifaInterbajo[i]);
                if ((facturacion-150)>0){
                    var excedente = ((facturacion-150)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>75){
            var interbajo1 = 75*(tarifaInterbajo[i]);
              if ((facturacionNormal-150)>0){
                  var excedente1 = ((facturacionNormal-150)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);

    }else{//tarifa 1 2024
        var tarifaBase = [1.015,1.019,1.023,1.027,0.921,0.924,0.927,0.93,0.933,0.936,1.055,1.059];
        var tarifaInterbajo = [1.239,1.243,1.247,1.251,1.067,1.071,1.075,1.079,1.083,1.087,1.28,1.285];
        var tarifaInteralto = [0,0,0,0,0,0,0,0,0,0,0,0];
        var tarifaExcedente = [3.62,3.633,3.646,3.659,3.672,3.685,3.698,3.711,3.724,3.737,3.75,3.763];

        //ene-dic 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 12 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>65){
                var interbajo = 65*(tarifaInterbajo[i]);
                if ((facturacion-140)>0){
                    var excedente = ((facturacion-140)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>65){
            var interbajo1 = 65*(tarifaInterbajo[i]);
              if ((facturacionNormal-140)>0){
                  var excedente1 = ((facturacionNormal-140)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };
    };
    /*
    //ene-abr 3 ESCALONES DE TARIFAS
    for (i=0 ; i < 4 ; i++ ){
        //console.log("ciclo 1,consumo del mes: "+ meses[i]);

        //var eficiencia = 0.82;
        var generacion = (dias[i])*(hsp[i])*kwp; //se elimino (*eficiencia)
        var facturacion = (meses[i])-generacion + extra;
        var facturacionNormal = (meses[i]);
        var base =0;
        var interbajo = 0;
        var interalto = 0;
        var excedente = 0;
        var base1 =0;
        var interbajo1 = 0;
        var interalto1 = 0;
        var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else {extra = 0;
            console.log("no hay extra");}


        //facturacion con paneles inicio
        if(facturacion>75){
            var base = 75*tarifaBase[i];
            if((facturacion-75)>125){
                var interbajo = 125*(tarifaInterbajo[i]);
                if ((facturacion-200)>0){
                    var excedente = ((facturacion-200)*tarifaExcedente[i])
                    }else var excedente = 0
            }else if((facturacion-75)<0){
                var interbajo = 0;
            }else interbajo= (facturacion-75)*tarifaInterbajo[i]
        }else if (facturacion<25){
                base= 25*tarifaBase[i]
            } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon sin paneles
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))


    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i]+" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado = totalsumado + total;
    totalsumadoNormal = totalsumadoNormal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" "+ extra);
    };

    //console.log("-----Pago acumulado de: " + totalsumadoNormal);
    console.log("generacion acumulada part1: " + totalgeneracion);
    console.log("Demanda acumulada part1: " + totaldemanda);



    //mayo-oct  4 ESCALONES DE TARIFAS
    for (i=4 ; i < 10 ; i++ ){
        //console.log("ciclo 2, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

    //condicional para generacion extra
    if (facturacion < 0){
        extra = extra + (meses[i]-generacion)
    } else {extra = 0;
    console.log("no hay extra");}


    //facturacion con paneles inicio
    if(facturacion>300){
        var base = 300*tarifaBase[i];
        if((facturacion-300)>900){
            var interbajo = 900*tarifaInterbajo[i];
            if ((facturacion-1200)>1300){
                var interalto = 1300*tarifaInteralto[i];
                if ((facturacion-2500)>0){
                    var excedente = ((facturacion-2500)*tarifaExcedente[i])
                }else var excedente = 0
            }else if ((facturacion-1200)<0){
                var interalto = 0;
            }else var interalto = ((facturacion-1200)*tarifaInteralto[i])


        }else if((facturacion-300)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-300)*tarifaInterbajo[i]


    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*tarifaBase[i];

    var subtotal = base + interbajo + interalto + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio, el problema esta en excedentes
    if(facturacionNormal>300){
        var base1 = 300*tarifaBase[i];
        if((facturacionNormal-300)>900){
            var interbajo1 = 900*tarifaInterbajo[i];
            if ((facturacionNormal-1200)>1300){
                var interalto1 = 1300*tarifaInteralto[i];
                if ((facturacionNormal-2500)>0){
                    var excedente1 = ((facturacionNormal-2500)*tarifaExcedente[i])
                }else var excedente1 = 0
            }else if ((facturacionNormal-1200)<0){
                var interalto1 = 0;
            }else var interalto1 = ((facturacionNormal-1200)*tarifaInteralto[i])


        }else if((facturacionNormal-300)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-300)*tarifaInterbajo[i]


    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*tarifaBase[i];


    var subtotal1 = (base1 + interbajo1 + interalto1 + excedente1);
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("interalto sp:" +interalto1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: "+ total);
    //console.log("Pago sin paneles: "+ totalNormal);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    totalsumado2 = totalsumado2 + total;
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado2Normal = totalsumado2Normal + totalNormal;
    console.log("Generacion extra: "+nombreMeses[i] +" " + extra);
    };

    //console.log("-----Pago acumulado de: "+ totalsumado2Normal);
    console.log("generacion acumulada part2: " + totalgeneracion);
    console.log("Demanda acumulada part2: " + totaldemanda);


    console.log("Generacion antes de nov: " + extra);
    //nov-dic 3 ESCALONES DE TARIFAS
    for (i=10 ; i < 12 ; i++ ){
        //console.log("ciclo 3, consumo del mes: "+ meses[i]);

    //var eficiencia = 0.82;
    var generacion = (dias[i])*(hsp[i])*kwp; //se saco eficiencia
    var facturacion = (meses[i])-generacion + extra;
    var facturacionNormal = (meses[i]);
    var base =0;
    var interbajo = 0;
    var interalto = 0;
    var excedente = 0;
    var base1 =0;
    var interbajo1 = 0;
    var interalto1 = 0;
    var excedente1 = 0;

        //condicional para generacion extra
        if (facturacion < 0){
            extra = extra + (meses[i]-generacion)
        } else { extra = 0;
            console.log("no hay extra");}

    //facturacion con paneles inicio
    if(facturacion>75){
        var base = 75*tarifaBase[i];
        if((facturacion-75)>125){
            var interbajo = 125*(tarifaInterbajo[i]);
              if ((facturacion-200)>0){
                  var excedente = ((facturacion-200)*tarifaExcedente[i])
                }else var excedente = 0
        }else if((facturacion-75)<0){
            var interbajo = 0;

        }else interbajo= (facturacion-75)*tarifaInterbajo[i]
    }else if (facturacion<25){
        base= 25*tarifaBase[i]
    } else base = facturacion*(tarifaBase[i]);

    var subtotal = base + interbajo + excedente;
    var total = Math.round(subtotal*1.16);
    //facturacion con paneles fin

    //facturacion normal inicio
    if(facturacionNormal>75){
        var base1 = 75*tarifaBase[i];
        if((facturacionNormal-75)>125){
            var interbajo1 = 125*(tarifaInterbajo[i]);
              if ((facturacionNormal-200)>0){
                  var excedente1 = ((facturacionNormal-200)*tarifaExcedente[i])
                }else var excedente1 = 0
        }else if((facturacionNormal-75)<0){
            var interbajo1 = 0;

        }else interbajo1= (facturacionNormal-75)*tarifaInterbajo[i]
    }else if (facturacionNormal<25){
        base1= 25*tarifaBase[i]
    } else base1 = facturacionNormal*(tarifaBase[i]);

    var subtotal1 = base1 + interbajo1 + excedente1;
    var totalNormal = Math.round(subtotal1*1.16);
    //facturacion normal fin

    //pagos de cada escalon
    //console.log("base sp:" + base1);
    //console.log("interbajo sp:" +interbajo1);
    //console.log("exc sp:" +excedente1);
    //console.log("subtotal sp:" +subtotal1);
    //console.log("total sp:" +(1.16*(base1+interbajo1+interalto1+excedente1)))

    console.log("generacion: "+ generacion);
    console.log("demanda: "+ nombreMeses[i] +" "+ meses[i]);
    //console.log("Pago con paneles: " + total);
    //console.log("Pago sin paneles: " + total);

    totalgeneracion = totalgeneracion + generacion;
    totaldemanda = totaldemanda + meses[i];

    factura.splice(i,1,total);
    //factura.push(total);
    facturaNormal.splice(i,1,totalNormal);
    //facturaNormal.push(totalNormal);
    totalsumado3 = totalsumado3 + total;
    totalsumado3Normal = totalsumado3Normal + totalNormal;
    console.log("Generacion extra: "+ nombreMeses[i] +" " + extra);
    };

    */
    //console.log("-----Pago acumulado de: "+ totalsumado3Normal);
    //console.log("generacion acumulada part3: " + totalgeneracion);
    //console.log("Demanda acumulada part3: " + totaldemanda);


    //valores para mostrar
    var conProyecto = (totalsumado + totalsumado2 + totalsumado3);
    var sinProyecto = (totalsumadoNormal + totalsumado2Normal + totalsumado3Normal);
    var cobertura = ((totalgeneracion/totaldemanda)*100).toFixed(2);
    var coberturaEconomica = ((1-(conProyecto/sinProyecto))*100).toFixed(2);

    // aqui colocar el retorno de inversion como push, tir.push(retorno) var retorno = (prestamo/(sinProyecto-conProyecto));
    // tir.push(retorno);

    /*console.log("total sumado: "+ totalsumado);
    console.log("total sumado2: "+ totalsumado2);
    console.log("total sumado3: "+ totalsumado3);
    console.log("total sumadoGLOBAL con paneles: "+ (totalsumado + totalsumado2 + totalsumado3) );
    console.log(factura);
    console.log("total sumado: "+ totalsumadoNormal);
    console.log("total sumado2: "+ totalsumado2Normal);
    console.log("total sumado3: "+ totalsumado3Normal);
    console.log("total sumadoGLOBAL sin paneles: "+ (totalsumadoNormal + totalsumado2Normal + totalsumado3Normal) );
    console.log(facturaNormal);*/


    //respuestas de las simulaciones ---------------------------
    var sugerencia = (((totaldemanda/(4.32*365)))*1000/paneles).toFixed(2);
    document.getElementById('sugerencia').innerHTML= "<b> Sugerencias </b><br> Para cubrir el 100% de tu recibo necesitas: " + sugerencia + " paneles de "+paneles+" W. <br> Se sugiere un sistema del 65% el cual es: "+ (sugerencia*0.65).toFixed(2)+" paneles.";
    document.getElementById('sinProyecto').innerHTML= "<b>Resultados de "+ ((kwp)*1000)/paneles +" paneles</b><br>Sin paneles pagarías: $" + sinProyecto;
    document.getElementById('conProyecto').innerHTML = `Con paneles pagarías: $${conProyecto}<br>
    Ahorro ($): $${sinProyecto-conProyecto}<br>
    Energía generada (kWh): ${totalgeneracion.toFixed(0)}<br>
    Energía que paga (kWh): ${totaldemanda.toFixed(0)}<br>
    <span class="importante">Ahorro energético: <b style="color: rgb(0, 0, 0);">${cobertura}%</b></span><br>
    Ahorro económico: ${coberturaEconomica}%<br>
    <i>Los valores son anuales.</i>`;
}
    //grafica en canvas por JS
    var nombreMeses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre", "Noviembre","Diciembre"];
    var names = nombreMeses;
    var facturaGrafica = factura;
    var facturaNormalGrafica = facturaNormal;
    //color de las letras en el Chart
    Chart.defaults.color= "black";

    //informacion
    let data = {
        labels: names,
        datasets: [{
            label: 'Pago mensual con paneles',
            data: facturaGrafica,
            backgroundColor:[
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)',
                'rgba(255,221,47,0.8)'
            ],
            borderColor: [
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)',
                'rgba(255,221,47,1)'
            ],
            borderWidth: 2,
            hoverBackgroundColor:'rgba(255,221,47,1)',
            hoverBorderWidth: 0,
        },
        {
            label: 'Pago mensual sin paneles',
            data: facturaNormalGrafica,
            backgroundColor:[
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)',
                'rgba(2,102,174,0.5)'
            ],
            borderColor: [
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)',
                'rgba(2,102,174,1)'
            ],
            borderWidth: 2,
            hoverBackgroundColor:'rgba(2,102,174,1)',
            hoverBorderWidth: 0,
        }
    ]
    }

    //configuracion del canvas
    let config = {
        type: 'bar',
        data,
        options: {
            responsive: true,
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                        return parseFloat(tooltipValue).toLocaleString();
                    }
                }
            }
        }
    }

    //init canvas (render)
    //myChart.destroy();
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
//}

function render(){
    console.log("valor de facturas: " + factura);
    myChart.destroy();
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}


function flujoFinanciero(event){
        //document.getElementById('flujo').remove('flujo');
        var FDE = parseFloat(document.getElementById('FDE').value);
        var FDT = parseFloat(document.getElementById('FDT').value);
        //var dolar = parseFloat(document.getElementById('dolar').value);
        var kwp = parseFloat(document.getElementById('kwp').value);
        var prestamos = ((parseFloat(document.getElementById('prestamos').value)+1)/100);
        var bruto = parseFloat(document.getElementById('bruto').value);
        var fecha = (document.getElementById('fecha').value);
        var directivo = document.getElementById('directivo');
        var cetes = 0.09;
        //var cetes = parseFloat(document.getElementById('cetes').value)/100;
        let sfv = (watt[(kwp/paneles)]);
        //var antiguedad = document.getElementById('fecha'); //por definir
        //let mes = antiguedad.getMonth(); //por definir

        //fecha de ingreso
        const anio = parseInt(String(fecha).substring(0,4));
        const mes = parseInt(String(fecha).substring(5,7));

        //fecha en vida real
        let date = new Date();
        let yyyy = parseInt(date.getFullYear());
        let mm = parseInt(date.getMonth()+1);
        var antiguedad = 0;

        if ((mm-mes) <= 0){
            antiguedad = ((mm-mes)+(yyyy-anio)*12);
            console.log("meses pasados1: "+ antiguedad);

        }else if (mm-mes >0){
            antiguedad = ((mm-mes)+(yyyy-anio)*12);
            console.log("meses pasados2: "+ antiguedad);
        }

        if (directivo.checked){
            if (antiguedad<=12){
                var antiguedad = 0;
                var rendimientos = 0;
            } else if (antiguedad>12 & antiguedad <=60){
                var rendimientos = 0.08;
            } else if (antiguedad>60){
                var rendimientos = 0.13;
            }
        } else if (antiguedad<=12){
            var antiguedad = 0;
            var rendimientos =0;
        } else if (antiguedad>12 & antiguedad <=60){
            var rendimientos = 0.07;
        } else if (antiguedad>60 & antiguedad <=120){
            var rendimientos = 0.12;
        } else if (antiguedad>120){
            var rendimientos = 0.13;
        } else console.log("Error, no cae en ningun caso de antiguedad");

        console.log(rendimientos);

        //calculo de prima HDI
        var prima = sfv*0.014;

        if (prima < 1000){
        var prima = 1000;
        };

        if (prima>= 0 & prima <=1000){
            var gasto = 150;
        }else if (prima>=1000.01 & prima <= 2500 ){
            var gasto = 270;
        }else if (prima>=2500.01 & prima <= 10000 ){
            var gasto = 500;
        }else if (prima>=10000.01 & prima <= 50000 ){
            var gasto = 660;
        }else if (prima>=50000.01 ){
            var gasto = 900;
        }

        prima = (prima+gasto)*1.16;

        //fin calculo de prima HDI
        /*
        if (sfv>= 0 & sfv <=25053){
            var prima = 696;
        }else if (sfv>=25053.1 & sfv <= 37759 ){
            var prima = 696;
        }else if (sfv>=37759.1 & sfv <= 50106 ){
            var prima = 696;
        }else if (sfv>=50106.1 & sfv <= 62632 ){
            var prima = 755.23;
        }else if (sfv>=62632.1 & sfv <= 75159){
            var prima = 900.53;
        }else if (sfv>=75159.1 & sfv <= 87685){
            var prima = 1045.84;
        }else if (sfv>=87685.1 & sfv <= 100211){
            var prima = 1191.15;
        }else if (sfv>=100211.1 & sfv <= 112738){
            var prima = 1336.45;
        }else if (sfv>=112738.1){
            var prima = 1481.76;
        } else alert("Ingresa un valor correcto");
        //console.log("prima es:" + prima);
        */

        let subprestamo = sfv;
        //console.log("subprestamo es: " + subprestamo);
        var mensualidad = 0;

        if ((0.05*bruto)>(prestamos*subprestamo)){
            mensualidad = (0.05*bruto);
            var meses = Math.round((subprestamo/mensualidad));
            var periodo = Math.ceil(meses/12);
            var prestamo = (subprestamo+(prima*2))*1; //Porcentaje del prestamo
            //var credito = Math.round((prestamo/mensualidad));

        } else var mensualidad = subprestamo*prestamos;
        var meses = Math.round((subprestamo/mensualidad));
        var periodo = Math.ceil(meses/12);
        var prestamo = (subprestamo+(prima*2))*1; //Porcentaje del prestamo
        //var credito = Math.round((prestamo/mensualidad)+2);
        //console.log("prestamo total: "+prestamo);
        var deuda = prestamo;
        console.log(FDE);
        console.log(FDT);
        console.log(rendimientos);
        console.log(prestamo);
        console.log(deuda);
        console.log(mensualidad);
        var m =0;
        var pagos = 0;
        FDT = FDT - deuda;
        console.log(FDT)
        i = deuda

        //document.getElementsByClassName("form-tercero").destroy //para elimiar el boton

        var list = document.getElementsByClassName("hijos1");
        var b = document.getElementById("col1");
        var elemento = document.createElement("div");
        b.insertAdjacentElement("beforeend", elemento);
        //elemento.insertAdjacentText("beforeend", col1);
        elemento.classList.add("hijos1");

        var list2 = document.getElementsByClassName("hijos2");
        var b2 = document.getElementById("col2");
        var elemento2 = document.createElement("div");
        b2.insertAdjacentElement("beforeend", elemento2);
        //elemento.insertAdjacentText("beforeend", col1);
        elemento2.classList.add("hijos2");

        var list3 = document.getElementsByClassName("hijos3");
        var b3 = document.getElementById("col3");
        var elemento3 = document.createElement("div");
        b3.insertAdjacentElement("beforeend", elemento3);
        //elemento.insertAdjacentText("beforeend", col1);
        elemento3.classList.add("hijos3");

        var list4 = document.getElementsByClassName("hijos4");
        var b4 = document.getElementById("col4");
        var elemento4 = document.createElement("div");
        b4.insertAdjacentElement("beforeend", elemento4);
        //elemento.insertAdjacentText("beforeend", col1);
        elemento4.classList.add("hijos4");

        var list5 = document.getElementsByClassName("hijos5");
        var b5 = document.getElementById("col5");
        var elemento5 = document.createElement("div");
        b5.insertAdjacentElement("beforeend", elemento5);
        //elemento.insertAdjacentText("beforeend", col1);
        elemento5.classList.add("hijos5");

        while(list.length > 0){
            b.removeChild(list[0]);
            b2.removeChild(list2[0]);
            b3.removeChild(list3[0]);
            b4.removeChild(list4[0]);
            b5.removeChild(list5[0]);
        }
        //contador del ciclo financiero 
        while ( (((FDE-FDT)> mensualidad) && (37>m)) ){ //(FDE-FDT)> mensualidad
            //console.log("mes "+ m + ": deuda: "+ i.toFixed(2) +" FDE:"+FDE.toFixed(2)+" FDT:"+ FDT.toFixed(2) + " Pagos: " +pagos.toFixed(2))
            //lista = "mes "+ m + ": deuda: "+ i.toFixed(2) +"----FDE:"+FDE.toFixed(2)+"----FDT:"+ FDT.toFixed(2) + "   Pagos: " +pagos.toFixed(2) + "<br>"
            col1 = "Mes "+ m +":" + "<br>"

            var elemento = document.createElement("div");
            var padre = document.getElementById("col1");
            padre.insertAdjacentElement("beforeend", elemento);
            elemento.insertAdjacentHTML("beforeend", col1);
            elemento.classList.add("hijos1");


            var numb2= i.toFixed(0);
            var str2 = numb2.toString().split(".");
            str2[0] = str2[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            str2.join(".");
            col2 = "Deuda: $"+ str2+ "<br>"

            var elemento2 = document.createElement("div");
            var padre2 = document.getElementById("col2");
            padre2.insertAdjacentElement("beforeend", elemento2);
            elemento2.insertAdjacentHTML("beforeend", col2);
            elemento2.classList.add("hijos2");

            var numb3= FDE.toFixed(0);
            var str3 = numb3.toString().split(".");
            str3[0] = str3[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            str3.join(".");
            col3 = "FRE: $"+str3+ "<br>"

            var elemento3 = document.createElement("div");
            var padre3 = document.getElementById("col3");
            padre3.insertAdjacentElement("beforeend", elemento3);
            elemento3.insertAdjacentHTML("beforeend", col3);
            elemento3.classList.add("hijos3");

            var numb4= FDT.toFixed(0);
            var str4 = numb4.toString().split(".");
            str4[0] = str4[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            str4.join(".");
            col4 = "FRT: $"+ str4+ "<br>"

            var elemento4 = document.createElement("div");
            var padre4 = document.getElementById("col4");
            padre4.insertAdjacentElement("beforeend", elemento4);
            elemento4.insertAdjacentHTML("beforeend", col4);
            elemento4.classList.add("hijos4");

            var numb5= pagos.toFixed(0);
            var str5 = numb5.toString().split(".");
            str5[0] = str5[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            str5.join(".");
            //col5 = "Pagos: $" +pagos.toFixed(0)+ "<br>"
            col5 = "Pagos: $" + str5 + "<br>"

            var elemento5 = document.createElement("div");
            var padre5 = document.getElementById("col5");
            padre5.insertAdjacentElement("beforeend", elemento5);
            elemento5.insertAdjacentHTML("beforeend", col5);
            elemento5.classList.add("hijos5");


            //document.getElementById('col1').insertAdjacentHTML("beforeend",col1)
            //document.getElementById('col2').insertAdjacentHTML("beforeend",col2)
            //document.getElementById('col3').insertAdjacentHTML("beforeend",col3)
            //document.getElementById('col4').insertAdjacentHTML("beforeend",col4)
            //document.getElementById('col5').insertAdjacentHTML("beforeend",col5)
            //document.getElementById('corridaFinanciera').insertAdjacentHTML("beforeend",lista)
            m= m+1

            pagos = pagos + mensualidad
            FDT = FDT  + mensualidad + ((cetes*FDT)/12) + (bruto*rendimientos)
            FDE = FDE + ((cetes*FDE)/12) + (bruto*rendimientos)
            i = FDE-FDT - mensualidad
            if (i < mensualidad){
                    i = FDE-FDT
                    if (i<mensualidad){
                        console.log("final 2")

                        mensualidad = i
                        pagos = pagos + mensualidad
                        FDT = FDT  + mensualidad + ((cetes*FDT)/12) + (bruto*rendimientos)
                        FDE = FDE + ((cetes*FDE)/12) + (bruto*rendimientos)
                        //lista = "mes "+ m + ": deuda: "+ i.toFixed(2) +"----FDE:"+FDE.toFixed(2)+"----FDT:"+ FDT.toFixed(2) + "   Pagos: " +pagos.toFixed(2) + "<br>"
                        //document.getElementById('corridaFinanciera').insertAdjacentHTML("beforeend",lista)
                        col1 = " Mes "+ m +": " + "<br>"

                        var elemento = document.createElement("div");
                        var padre = document.getElementById("col1");
                        padre.insertAdjacentElement("beforeend", elemento);
                        elemento.insertAdjacentHTML("beforeend", col1);
                        elemento.classList.add("hijos1");

                        var numb2= i.toFixed(0);
                        var str2 = numb2.toString().split(".");
                        str2[0] = str2[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        str2.join(".");
                        col2 = "Deuda: $"+ str2+ "<br>"

                        var elemento2 = document.createElement("div");
                        var padre2 = document.getElementById("col2");
                        padre2.insertAdjacentElement("beforeend", elemento2);
                        elemento2.insertAdjacentHTML("beforeend", col2);
                        elemento2.classList.add("hijos2");

                        var numb3= FDE.toFixed(0);
                        var str3 = numb3.toString().split(".");
                        str3[0] = str3[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        str3.join(".");
                        col3 = "FRE: $"+ str3+ "<br>"

                        var elemento3 = document.createElement("div");
                        var padre3 = document.getElementById("col3");
                        padre3.insertAdjacentElement("beforeend", elemento3);
                        elemento3.insertAdjacentHTML("beforeend", col3);
                        elemento3.classList.add("hijos3");

                        var numb4= FDT.toFixed(0);
                        var str4 = numb4.toString().split(".");
                        str4[0] = str4[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        str4.join(".");
                        col4 = "FRT: $"+ str4+ "<br>"

                        var elemento4 = document.createElement("div");
                        var padre4 = document.getElementById("col4");
                        padre4.insertAdjacentElement("beforeend", elemento4);
                        elemento4.insertAdjacentHTML("beforeend", col4);
                        elemento4.classList.add("hijos4");

                        var numb5= pagos.toFixed(0);
                        var str5 = numb5.toString().split(".");
                        str5[0] = str5[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        str5.join(".");
                        //col5 = "Pagos: $" +pagos.toFixed(0)+ "<br>"
                        col5 = "Pagos: $" + str5 + "<br>"

                        var elemento5 = document.createElement("div");
                        var padre5 = document.getElementById("col5");
                        padre5.insertAdjacentElement("beforeend", elemento5);
                        elemento5.insertAdjacentHTML("beforeend", col5);
                        elemento5.classList.add("hijos5");

                        //document.getElementById('col1').insertAdjacentHTML("beforeend",col1)
                        //document.getElementById('col2').insertAdjacentHTML("beforeend",col2)
                        //document.getElementById('col3').insertAdjacentHTML("beforeend",col3)
                        //document.getElementById('col4').insertAdjacentHTML("beforeend",col4)
                        //document.getElementById('col5').insertAdjacentHTML("beforeend",col5)
                    }else mensualidad=mensualidad
            }else mensualidad = mensualidad
        }
    var advertencia = "<br> <strong> ADVERTENCIA </strong> <br><br> La simulación del préstamo esta diseñada para un máximo de 3 años y en caso de superar este período, <br> la deuda del mes 36 se dividirá en 3, eso sera tu pago adicional cada año. <br> La generación de los paneles inicia en enero, sí los paneles fueron instalados e interconectados en otro mes, <br> la simulación no dará resultados iguales. <br><br> La tasa de rendimiento anual del fondo de ahorro se contempla que sea del 9%.<br> Deuda: Es la diferencia entre el fondo de ahorro de la empresa y trabajador. <br> FRE y FRT: Son el fondo de ahorro de empresa y trabajador. <br> Pagos: Son los pagos acumulados. <br><br> Los datos mostrados son solo una simulación y esto no asegura los mismos resultados. <br><br> Última actualización: 23/09/2024"
    document.getElementById('ad').innerHTML = advertencia;
    //console.log("Hijos es: " + list.length)
}


//pendiente hacer nueva version estetica.
