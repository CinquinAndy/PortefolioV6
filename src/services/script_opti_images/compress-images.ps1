# Chemin du dossier contenant les images � convertir
$cheminDossierImages = "C:\Users\andyq\DocumentsAndy\ProjetPro2022_2023\my-makeup\public\assets\illustrations"

# Construction de la commande pour convertir l'image en WebP avec 75% de qualit�
# $commande = "C:\Users\andyq\libwebp-1.3.0-windows-x64\bin\cwebp.exe -q 75"
$commande = "C:\Users\andyq\Documents\libwebp-1.3.0-windows-x64\bin\cwebp.exe -q 75"

# Obtention de la liste des fichiers d'images dans le dossier
$images = Get-ChildItem -Path $cheminDossierImages -File | Where-Object {
    $_.Extension -match "^(.jpg|.jpeg|.png|.gif)$"
}

# Parcours de chaque fichier d'image
foreach ($image in $images) {
    # Chemin du fichier source
    $cheminFichierSource = $image.FullName

    # Chemin du fichier de destination en WebP
    $cheminFichierDestination = [System.IO.Path]::ChangeExtension($cheminFichierSource, "webp")

    # Ex�cution de la commande
    $process = Invoke-Expression "$commande `"$cheminFichierSource`" -o `"$cheminFichierDestination`""
}
