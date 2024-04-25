<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $images = $_FILES['cfiles'];
    $allowedTypes = ['image/jpeg', 'image/png'];
    $maxSize = 5 * 1024 * 1024; // 5 MB en bytes
    $zip = new ZipArchive();
    $zipName = __DIR__ . "/../converted/images_" . date('YmdHis') . ".zip";
    $zipRelName = "converted/images_" . date('YmdHis') . ".zip";

    if ($zip->open($zipName, ZipArchive::CREATE) !== TRUE) {
        exit("No se puede abrir <$zipName>\n");
    }

    foreach ($images['name'] as $index => $name) {
        if ($images['size'][$index] <= $maxSize && in_array($images['type'][$index], $allowedTypes)) {
            $imagePath = $images['tmp_name'][$index];
            $newFileName = uniqid() . ".webp";

            if (convertToWebP($imagePath, __DIR__ . "/../converted/" . $newFileName)) {
                $zip->addFile(__DIR__ . "/../converted/" . $newFileName, $newFileName);
            }
        }
    }

    $zip->close();

    echo "<a href='$zipRelName' download>Descargar conversión</a><br>";
} else {
    echo "No se han podido convertir las imágenes";
}

function convertToWebP($source, $destination) {
    $info = getimagesize($source);

    if ($info['mime'] == 'image/jpeg') {
        $image = imagecreatefromjpeg($source);
    } elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source);
    } else {
        return false;
    }

    imagewebp($image, $destination, 90); // Calidad de 90
    imagedestroy($image);
    return true;
}
?>
