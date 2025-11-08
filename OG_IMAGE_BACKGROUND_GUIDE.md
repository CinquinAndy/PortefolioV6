# Guide : Utiliser l'image de fond personnalisée pour les OG Images

## Problème

Satori (le moteur de Next.js pour générer les OG images) **ne supporte pas le format WebP**, même via URL absolue.

Erreur observée :
```
Can't load image https://r2-andycinquin.andy-cinquin.fr/cinquinandy_dark_blue_smoky_background_fantasy_elements_deep_an_3b3174ec_948f_42a3_a02c_c6d9f17f5706_b9f9b43502.webp: Unsupported image type: image/webp
```

## Solution actuelle

Un gradient CSS qui imite l'image de fond bleu foncé avec effet fumée :
```css
radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #020617 100%)
```

## Solution pour utiliser l'image réelle

Si vous voulez absolument utiliser votre image de fond, vous devez la **convertir en PNG ou JPEG**.

### Option 1 : Convertir et héberger sur R2 (Recommandé)

1. **Convertir l'image WebP en PNG** :
   ```bash
   # Avec ImageMagick
   magick og_bg.webp og_bg.png

   # Ou avec ffmpeg
   ffmpeg -i og_bg.webp og_bg.png

   # Ou en ligne : https://cloudconvert.com/webp-to-png
   ```

2. **Uploader sur R2** :
   Uploadez `og_bg.png` sur votre bucket R2 au même endroit que l'image WebP.

3. **Mettre à jour le code** :
   Dans `src/lib/og-utils.tsx`, remplacez :
   ```tsx
   export function getOgBackgroundStyle(): CSSProperties {
     return {
       backgroundImage: 'url(https://r2-andycinquin.andy-cinquin.fr/og_bg.png)',
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
       width: '100%',
       height: '100%',
     }
   }
   ```

### Option 2 : Utiliser base64 (Non recommandé pour les grandes images)

1. **Convertir en PNG et encoder en base64** :
   ```bash
   # Convertir
   magick og_bg.webp og_bg.png

   # Encoder en base64
   base64 og_bg.png > og_bg_base64.txt
   ```

2. **Mettre à jour le code** :
   ```tsx
   export function getOgBackgroundStyle(): CSSProperties {
     const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANS...' // Votre base64 ici
     return {
       backgroundImage: `url(${base64Image})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
       width: '100%',
       height: '100%',
     }
   }
   ```

   ⚠️ **Attention** : Cette approche peut augmenter significativement la taille du bundle.

### Option 3 : Optimiser le gradient (Recommandé si pas d'image)

Ajustez les couleurs du gradient pour mieux correspondre à votre image :

```tsx
export function getOgBackgroundStyle(): CSSProperties {
  return {
    // Gradient radial (effet fumée centrale)
    background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #020617 100%)',

    // Ou gradient linéaire
    // background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 50%, #020617 100%)',

    // Ou plusieurs gradients superposés pour plus de profondeur
    // background: `
    //   radial-gradient(ellipse at top left, rgba(30, 58, 138, 0.5), transparent),
    //   radial-gradient(ellipse at bottom right, rgba(15, 23, 42, 0.5), transparent),
    //   linear-gradient(180deg, #020617 0%, #0f172a 100%)
    // `,

    width: '100%',
    height: '100%',
  }
}
```

## Formats d'images supportés par Satori

✅ **Supportés** :
- PNG
- JPEG/JPG
- GIF (premier frame seulement)

❌ **Non supportés** :
- WebP
- SVG (limité)
- AVIF

## Recommandations

1. **Pour la performance** : Utilisez un gradient CSS (solution actuelle)
2. **Pour le branding** : Convertissez votre image WebP en PNG et hébergez-la sur R2
3. **Pour la qualité** : PNG non compressé (mais fichier plus lourd)
4. **Pour la taille** : JPEG avec compression ~80% (bon compromis)

## Test de l'image

Après modification, testez avec :
```bash
npm run dev
```

Puis visitez :
```
http://localhost:3000/fr/opengraph-image
```

Ou vérifiez les logs du serveur pour voir si l'image se charge sans erreur.
