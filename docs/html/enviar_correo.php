<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = $_POST["nombre"];
  $email = $_POST["email"];
  $mensaje = $_POST["mensaje"];

  $destinatario = "valenciam.sc@gmail.com";
  $asunto = "Nuevo mensaje de formulario";
  $cuerpo = "Nombre: " . $nombre . "\nEmail: " . $email . "\nMensaje: " . $mensaje;

  $cabeceras = "From: " . $email;

  if (mail($destinatario, $asunto, $cuerpo, $cabeceras)) {
    echo "Correo enviado con éxito.";
  } else {
    echo "Error al enviar el correo.";
  }
}
?>