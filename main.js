/* Nombre del alumno: Sofia Nava García  00531263*/
/* Actividad: Sitio web interactivo utilizando un plugin de jQuery */
/* Materia: Programación para internet */
/* Fecha: Lunes 5 de Octubre del 2026 */
/* Nombre del archivo: main.js */

$(document).ready(function(){

    // =========================================================================
    // RELOJ / FECHA Y HORA ACTUAL
    // =========================================================================
    function actualizarReloj() {
        var ahora = new Date();
        var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        var fechaFormateada = ahora.toLocaleString('es-MX', opciones);
        $('#reloj').text(fechaFormateada);
    }
    setInterval(actualizarReloj, 1000);
    actualizarReloj();

    // =========================================================================
    // BOTÓN "IR ARRIBA"
    // =========================================================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#btn-arriba').fadeIn();
        } else {
            $('#btn-arriba').fadeOut();
        }
    });

    $('#btn-arriba').click(function() {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

    // =========================================================================
    // MODO OSCURO / MODO CLARO
    // =========================================================================
    $('#btn-tema').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('dark-mode');
        
        if($('body').hasClass('dark-mode')){
            $(this).text('☀ Modo Claro');
        } else {
            $(this).text('🌙 Modo Oscuro');
        }
    });

    // =========================================================================
    // PLUGIN JQUERY: bxSlider 
    // =========================================================================
    try {
        $('.slider-sobre-mi').bxSlider({
            pause: 3000,
            controls: false,
            pager: true,
            minSlides: 1,
            maxSlides: 2, 
            slideWidth: 480, 
            slideMargin: 20,
            responsive: true
        });
    } catch(e) {
        console.log("Error al cargar bxSlider:", e);
    }

    // =========================================================================
    // MANIPULACIÓN DOM Y EFECTOS // GALERÍA TIPO VISOR CON JQUERY
    // =========================================================================
    $('.miniatura').on('click', function(){
        // Si la imagen ya está activa, no hace nada
        if($(this).hasClass('activa')) {
            return;
        }
        
        $('.miniatura').removeClass('activa');
        $(this).addClass('activa');
        
        // Obtenemos la ruta de la imagen miniatura usando attr()
        var nuevaImagen = $(this).attr('src');
        
        // Efecto fadeOut() al visor grande, cambia el src, y luego fadeIn()
        $('#img-visor').fadeOut(250, function(){
            $(this).attr('src', nuevaImagen).fadeIn(250);
        });
    });

    // =========================================================================
    // VALIDACIÓN DEL FORMULARIO CON JAVASCRIPT / JQUERY
    // =========================================================================
    $('#nombre').on('keyup', function(){
        var nombreUsuario = $(this).val();
        var categoriaElegida = $('#categoria').val();
        if(nombreUsuario.trim() !== ""){
            $('#vista-previa-form').text('Hola ' + nombreUsuario + ', estás por recomendar una ' + categoriaElegida + '.');
        } else {
            $('#vista-previa-form').text('Escribe tu nombre para ver la vista previa...');
        }
    });

    $('#categoria').on('change', function(){
        var categoriaElegida = $(this).val();
        var nombreUsuario = $('#nombre').val() || 'lector(a)';
        $('#vista-previa-form').text('Categoría actualizada: ' + nombreUsuario + ' recomendará una ' + categoriaElegida + '.');
    });

    $('#form-recomendacion').on('submit', function(e){
        e.preventDefault(); 
        
        var nombre = $('#nombre').val().trim();
        var correo = $('#correo').val().trim();
        var asunto = $('#asunto').val().trim();
        var mensaje = $('#mensaje').val().trim();
        var categoria = $('#categoria').val();
        var msjError = $('#error-msg');

        if(nombre === "" || correo === "" || asunto === "" || mensaje === "") {
            msjError.text('⚠️ Por favor, llena todos los campos para continuar.').slideDown();
            return false;
        }

        if(correo.indexOf('@') === -1 || correo.indexOf('.') === -1) {
            msjError.text('⚠ Por favor, ingresa un correo electrónico válido.').slideDown();
            return false;
        }

        if(mensaje.length < 5) {
            msjError.text('⚠️ Tu reseña es muy corta, cuéntanos un poquito más.').slideDown();
            return false;
        }

        msjError.slideUp();
        alert('¡Gracias por tu recomendación, ' + nombre + '! Mensaje de asunto "' + asunto + '" enviado.');
        
        this.reset();
        $('#vista-previa-form').text('Escribe tu nombre para ver la vista previa...');
    });

    // =========================================================================
    // BOTONES (Selectores, Efectos, DOM)
    // =========================================================================
    $('h2').css({ 'letter-spacing': '0.5px' });

    $('.parrafo-gustos').css({
        'border-left': '3px solid var(--accent-color)',
        'padding-left': '10px'
    });

    $('#tarjeta-destacada').css({
        'border': '2px solid var(--accent-color)'
    });

    $('.btn-toggle-sidebar').on('click', function(){
        $(this).prev('.contenido-sidebar').toggle(500);
    });

    $('.boton-info').on('click', function(){
        var parrafoInfo = $(this).prev('.info-tarjeta');
        if (parrafoInfo.is(':visible')) {
            parrafoInfo.hide(400);
            $(this).text('Mostrar info');
        } else {
            parrafoInfo.show(400);
            $(this).text('Ocultar / Mostrar info');
        }
    });

    $('#btn-fade-pelis').on('click', function(){
        $('#contenedor-peliculas').find('.tarjeta').fadeOut(600).fadeIn(600);
    });

    $('#btn-slide-series').on('click', function(){
        $('#contenedor-series').children('.tarjeta').slideUp(600).slideDown(600);
    });

    $('#btn-dom-pelis').on('click', function(){
        $('#contenedor-peliculas .tarjeta').first().css({'border': '2px solid var(--accent-color)'});
        $('#contenedor-peliculas .tarjeta').last().css({'border': '2px solid var(--accent-color)'});
    });

    $('#btn-dom-eq').on('click', function(){
        var segundaSerie = $('#contenedor-series .tarjeta').eq(1);
        segundaSerie.css({'border': '2px solid var(--accent-color)'});
    });

    $('#btn-reset').on('click', function(){
        $('.tarjeta').css({'border': '1px solid var(--border-color)'});
        $('.info-tarjeta').show(300);
        $('.contenido-sidebar').show(300);
    });

    $('#btn-reset-series').on('click', function(){
        $('#contenedor-series .tarjeta').css({'border': '1px solid var(--border-color)'});
        $('#contenedor-series .info-tarjeta').show(300);
    });

    $('.tarjeta').on('mouseenter', function(){
        $(this).css({ 'transform': 'translateY(-8px)', 'box-shadow': '0 14px 28px var(--card-shadow)' });
    });
    $('.tarjeta').on('mouseleave', function(){
        $(this).css({ 'transform': 'translateY(0)', 'box-shadow': '0 8px 20px var(--card-shadow)' });
    });

    $('.tarjeta').on('dblclick', function(){
        $(this).siblings('.tarjeta').fadeOut(400).fadeIn(400);
    });
});