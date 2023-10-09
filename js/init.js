function Init() {
    // Obtén el elemento por su ID
    //var miElemento = document.querySelector(".intro-heading");
    // Cambia el estilo del elemento
    
    // Obtén el elemento por su ID
    var miElemento = document.querySelector(".inner");
    // Aplica opacidad cero y luego establece display: none después de la transición
    miElemento.style.opacity = 0;

    // Después de la transición, establece display: none
    setTimeout(function() {
        var miElemento = document.querySelector(".inner");
        miElemento.style.display = "none";

        //miElemento.style.display = "none";
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".loading-prompt");
        // Cambia el estilo del elemento
        miElemento.style.display = "block";
        miElemento.style.opacity = 1;
        // Obtén la referencia al medidor de la barra de progreso
        var medidorDeProgreso = document.querySelector(".progress-meter");

        // Establece un temporizador para simular la carga progresiva
        var carga = 0;
        var temporizador = setInterval(function() {
            carga += 5; // Incrementa el valor de carga (puedes ajustar este valor)
            medidorDeProgreso.style.width = carga + "%"; // Actualiza el ancho del medidor

            // Si la carga alcanza el 100%, detén el temporizador
            if (carga >= 100) {
                clearInterval(temporizador);
                Init_end();
            }
        }, 300); // Intervalo de tiempo en milisegundos (puedes ajustar este valor)   300
    }, 800); // Tiempo de la transición en milisegundos (ajusta según sea necesario) 800

}

function Init_end() {
    // Obtén el elemento por su ID
    var miElemento = document.querySelector(".container-main");
    // Cambia el estilo del elemento
    miElemento.style.display = "none";
    // Obtén el elemento por su ID
    var miElemento = document.querySelector(".scene-nav-menu");
    // Cambia el estilo del elemento
    miElemento.style.display = "block";
    // Obtén el elemento por su ID
    var miElemento = document.querySelector(".scene-title");
    // Cambia el estilo del elemento
    miElemento.style.display = "block";
    // Obtén el elemento por su ID
    var miElemento = document.getElementById("moonContainer");
    // Cambia el estilo del elemento
    miElemento.style.display = "block";
    var miElemento = document.getElementById("chat");
    // Cambia el estilo del elemento
    miElemento.style.display = "block";
    
}