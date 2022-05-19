function AgregadorDePalabra(){
    document.getElementById('EscribirPalabra').style.display = 'inline';
    document.getElementById('AgregarPalabra').style.display = 'inline';
    document.getElementById('CancelBoton').style.display = 'inline';
    document.getElementById("inicio").style.display = "inline";
    PalabraNueva.style.display = "none";
    startButton.style.display = "none";
    footer.style.display = "none";
}

PalabraNueva.addEventListener("click",AgregadorDePalabra);

AgregarPalabra.addEventListener("click",function(event){
    event.preventDefault();
    words.push(EscribirPalabra.value.toUpperCase());
    EscribirPalabra.value = "1";
    EscribirPalabra.focus();
})