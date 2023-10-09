
<?php
if(isset($_POST["submit"])){

     // Verificar que se hayan enviado todos los campos
     $camposObligatorios = array("name", "program", "Agency", "lat", "lng", "date", "web", "info");
     $archivosObligatorios = array("image");
     $error=0;
 
     foreach ($camposObligatorios as $campo) {
         if ($_POST[$campo]) {
         }else{
            echo '<script>alert("Error: The field '.$campo.' is required and has not been provided.");</script>';
            $error=1;
            //die("Error: El campo $campo es obligatorio y no se ha proporcionado.");
         }
     }

     $siteUrl = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"];
     $rutaImage="";
     $ruta3D="";
     if ($error==0){
        $error2=0;

        //Recogemos el archivo enviado por el formulario
        $archivo = $_FILES['image']['name'];
        //Si el archivo contiene algo y es diferente de vacio
        if (isset($archivo) && $archivo != "") {
            //Obtenemos algunos datos necesarios sobre el archivo
            $tipo = $_FILES['image']['type'];
            $tamano = $_FILES['image']['size'];
            $temp = $_FILES['image']['tmp_name'];
            //Se comprueba si el archivo a cargar es correcto observando su extensión y tamaño
            if (!((strpos($tipo, "gif") || strpos($tipo, "jpeg") || strpos($tipo, "jpg") || strpos($tipo, "png")) && ($tamano < 2000000))) {
                echo '<script>alert("Error. The file extension or size is not correct. .gif, .jpg, .png files are allowed. and 200 kb maximum.");</script>';
                $error2=1;
            }
            else {
                //Si la imagen es correcta en tamaño y tipo
                //Se intenta subir al servidor
                $nombreAleatorio = uniqid(pathinfo($_FILES['image']['name'], PATHINFO_FILENAME).'_', true); //genera una cadena única basada en la marca de tiempo y un prefijo específico ('imagen_'). 
                $extensionArchivo = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                $nombreArchivo = $nombreAleatorio . '.' . $extensionArchivo;

                if (move_uploaded_file($temp, 'img/otros/'.$nombreArchivo)) {
                    $rutaImage=$siteUrl.'/img/otros/'.$nombreArchivo;
                    //Cambiamos los permisos del archivo a 777 para poder modificarlo posteriormente
                    chmod('img/otros/'.$nombreArchivo, 0777);
                    //Mostramos el mensaje de que se ha subido co éxito
                    //Mostramos la imagen subida
                }
                else {
                //Si no se ha podido subir la imagen, mostramos un mensaje de error
                echo '<script>alert("An error occurred while uploading the file. Could not be saved.");</script>';
                $error2=1;
                }
            }
        }

        //Recogemos el archivo enviado por el formulario
        $archivo2 = $_FILES['archive']['name'];
        //Si el archivo contiene algo y es diferente de vacio
        if (isset($archivo2) && $archivo2 != "") {
            //Obtenemos algunos datos necesarios sobre el archivo
            $tipo2 = $_FILES['archive']['type'];
            $tamano2 = $_FILES['archive']['size'];
            $temp2 = $_FILES['archive']['tmp_name'];
            //Se comprueba si el archivo a cargar es correcto observando su extensión y tamaño
            if (!((strpos($tipo2, "step") || strpos($tipo2, "step2")) && ($tamano2 < 20000000))) {
                echo '<script>alert("Error. The file extension or size is not correct. .step files are allowed. and 2000 kb maximum.");</script>';
                $error2=1;
            }
            else {
                //Si la imagen es correcta en tamaño y tipo
                //Se intenta subir al servidor
                $nombreAleatorio2 = uniqid(pathinfo($_FILES['archive']['name'], PATHINFO_FILENAME).'_', true); //genera una cadena única basada en la marca de tiempo y un prefijo específico ('imagen_'). 
                $extensionArchivo2 = pathinfo($_FILES['archive']['name'], PATHINFO_EXTENSION);
                $nombreArchivo2 = $nombreAleatorio2 . '.' . $extensionArchivo2;

                if (move_uploaded_file($temp2, 'img/otros/3d/'.$nombreArchivo2)) {
                    $ruta3D=$siteUrl.'/img/otros/3d/'.$nombreArchivo2;
                    //Cambiamos los permisos del archivo a 777 para poder modificarlo posteriormente
                    chmod('img/otros/3d/'.$nombreArchivo2, 0777);
                    //Mostramos el mensaje de que se ha subido co éxito
                    //Mostramos la imagen subida
                }
                else {
                //Si no se ha podido subir la imagen, mostramos un mensaje de error
                echo '<script>alert("An error occurred while uploading the file. Could not be saved.");</script>';
                $error2=1;
                }
            }
        }
        
        
        // Obtener datos del formulario
        $nombre = $_POST['name'];
        $program = $_POST['program'];
        $agency = $_POST['Agency'];
        $lat = $_POST['lat'];
        $lng = $_POST['lng'];
        $date = $_POST['date'];
        $web = $_POST['web'];
        $info = $_POST['info'];

        // Crear arreglo asociativo con los datos
        $nuevoDato = array(
            'name' => $nombre,
            'program' => $program,
            'agency' => $agency,
            'lat' => floatval($lat),
            'lng' => floatval($lng),
            'date' => $date,
            'url' => $web,
            'image' => $rutaImage,
            '3d' => $ruta3D,
            'info' => $info
        );

        
        // Ruta del archivo JSON
        $archivoJson = 'otras_misiones.json';

        // Datos a agregar al archivo JSON
        //$nuevoDato = array(
        //    "name" => "Nuevo Elemento",
        //    "program" => "Nuevo Programa",
        //    "agency" => "Nueva Agencia",
        //    "lat" => 0.0,
        //    "lng" => 0.0,
        //    "date" => "2023-10-09",
        //    "url" => "https://ejemplo.com",
        //    "image" => "",
        //    "3d" => "",
        //    "info" => "Nueva Información"
        //);

        // Leer contenido actual del archivo JSON
        $contenidoActual = file_get_contents($archivoJson);

        // Decodificar JSON existente
        $datosExistente = json_decode($contenidoActual, true);

        // Agregar nuevo dato al array
        $datosExistente[] = $nuevoDato;

        // Codificar datos actualizados a JSON
        $nuevoContenido = json_encode($datosExistente, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        // Escribir en el archivo
        if ($error2==0){
            file_put_contents($archivoJson, $nuevoContenido);
            echo '<script>alert("Form uploaded successfully");</script>';
        }
        
     }
     
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            padding: 20px;
        }

        .form-container {
            max-width: 500px;
            margin: 0 auto;
        }

        .form-group {
            margin-bottom: 20px;
        }
    </style>
    <title>Formulario</title>
</head>
<body>
    <div class="container form-container">
        <form id="myForm" name="myForm" action="" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name">Nombre de mision:</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="program">Program:</label>
                <input type="text" class="form-control" id="program" name="program" required>
            </div>
            <div class="form-group">
                <label for="Agency">Agency:</label>
                <input type="text" class="form-control" id="Agency" name="Agency" required>
            </div>
            <div class="form-group">
                <label for="lat">Latitude:</label>
                <input type="text" class="form-control" id="lat" name="lat" required>
            </div>
            <div class="form-group">
                <label for="lng">Longitude:</label>
                <input type="text" class="form-control" id="lng" name="lng" required>
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="date" class="form-control" id="date" name="date" required>
            </div>
            <div class="form-group">
                <label for="web">Web Site:</label>
                <input type="text" class="form-control" id="web" name="web" required>
            </div>
            <div class="form-group">
                <label for="info">Information:</label>
                <textarea id="info" name="info" class="texto-grande" rows="5" cols="50"></textarea>
            </div>
            <div class="form-group">
                <label for="image">Subir Imagen:</label>
                <input type="file" class="form-control-file" id="image" name="image" accept=".jpg, .png, .gif" required>
            </div>
            <div class="form-group">
                <label for="archivo">Subir 3d:</label>
                <input type="file" class="form-control-file" id="archive" name="archive" accept=".step">
            </div>
            <input class="btn btn-primary" type="submit" name="submit" value="Send">
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.8/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>