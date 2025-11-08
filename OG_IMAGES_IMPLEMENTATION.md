# Open Graph Images - Documentation d'implémentation

## Vue d'ensemble

Ce document décrit l'implémentation du système d'Open Graph images dynamiques pour le site portfolio d'Andy Cinquin.

## Architecture

### Fichiers créés

#### 1. Utilitaires (`src/lib/og-utils.tsx`)

Fichier contenant les fonctions et styles réutilisables pour générer les OG images :

- `OG_IMAGE_SIZE` : Dimensions standard (1200x630px)
- `getOgBackgroundImage()` : Charge le background `/public/og_bg.webp` en base64
- `getOgBackgroundStyle()` : Retourne le style de fond avec l'image ou un gradient de fallback
- `titleStyle` : Style pour les titres (simule Tailwind CSS)
- `subtitleStyle` : Style pour les sous-titres
- `containerStyle` : Style de conteneur

#### 2. OG Images par route

Treize fichiers `opengraph-image.tsx` ont été créés :

1. **Landing page** : `src/app/[locale]/opengraph-image.tsx`
   - Affiche le titre de la page d'accueil depuis le CMS

2. **Blog** :
   - Liste : `src/app/[locale]/blog/opengraph-image.tsx`
   - Article : `src/app/[locale]/blog/[slug]/opengraph-image.tsx`
     - Affiche le titre et la description de l'article

3. **Portfolio** :
   - Liste : `src/app/[locale]/portefolio/opengraph-image.tsx`
   - Projet : `src/app/[locale]/portefolio/[slug]/opengraph-image.tsx`
     - Affiche le titre et la description du projet
   - Image du projet : `src/app/[locale]/portefolio/[slug]/[image]/opengraph-image.tsx`

4. **Cours** :
   - Liste : `src/app/[locale]/course/opengraph-image.tsx`
   - Cours parent : `src/app/[locale]/course/[parentCourseSlug]/opengraph-image.tsx`
   - Chapitre : `src/app/[locale]/course/[parentCourseSlug]/[chapterSlug]/opengraph-image.tsx`
   - Leçon : `src/app/[locale]/course/[parentCourseSlug]/[chapterSlug]/[lessonSlug]/opengraph-image.tsx`

5. **Pages statiques** :
   - About : `src/app/[locale]/about/opengraph-image.tsx`
   - Contact : `src/app/[locale]/contact/opengraph-image.tsx`
   - CGU : `src/app/[locale]/cgu/opengraph-image.tsx`

## Caractéristiques techniques

### Format des images
- **Dimensions** : 1200x630px (standard OG)
- **Type** : PNG
- **Génération** : Dynamique avec Next.js `ImageResponse` et Satori

### Background
- **Gradient CSS** : `radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #020617 100%)`
- **Note** : Satori (le moteur de génération d'images de Next.js) ne supporte pas les images WebP, même via URL absolue
- Le gradient radial imite l'effet fumée bleu foncé de l'image de fond originale
- Pour utiliser une vraie image, voir le guide `OG_IMAGE_BACKGROUND_GUIDE.md`

### Contenu dynamique
- **Titre** : Récupéré depuis le CMS Strapi pour chaque page
- **Description** : Affichée sur les pages de contenu (articles, projets, cours)
- **Limite de caractères** : 120 caractères pour la description (avec "..." si tronquée)

### Styles
Les styles utilisent des propriétés CSS inline (compatible avec Satori) correspondant au design du site :
- **Titre** : 96px, font-weight 600, letter-spacing 0.1em, uppercase (comme le h1 du Nav)
- **Sous-titre** : 32px, font-weight 400
- **Couleur** : Blanc avec text-shadow pour le contraste
- **Alignement** : Centré verticalement et horizontalement
- **Padding** : 80px sur tous les côtés

## Intégration avec Next.js

Chaque fichier `opengraph-image.tsx` exporte :
- `size` : Dimensions de l'image
- `contentType` : Type MIME ('image/png')
- `alt` : Texte alternatif
- `default` : Fonction async qui génère l'ImageResponse

Next.js génère automatiquement les métadonnées Open Graph correspondantes :
```html
<meta property="og:image" content="<generated>" />
<meta property="og:image:alt" content="..." />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## Gestion des locales

Le système est compatible avec l'internationalisation (i18n) :
- Français (`fr`) et Anglais (`en`)
- Les titres sont récupérés dans la langue appropriée depuis Strapi
- Les OG images sont générées pour chaque locale

## Performance

### Cache et revalidation
- Les images sont mises en cache par Next.js
- Revalidation automatique toutes les 60 secondes (conformément à `revalidate = 60`)
- Compatible avec l'ISR (Incremental Static Regeneration)

### Optimisations
- Chargement asynchrone du background image
- Utilisation de base64 pour éviter les requêtes réseau supplémentaires
- Styles inline pour minimiser le overhead

## Tests

### Vérification TypeScript
```bash
npm run tsc
```
✅ Aucune erreur TypeScript

### Test en développement
```bash
npm run dev
```
Puis visiter les URLs suivantes pour voir les OG images générées :
- `http://localhost:3000/fr/opengraph-image`
- `http://localhost:3000/fr/blog/opengraph-image`
- `http://localhost:3000/fr/portefolio/opengraph-image`
- etc.

### Test en production
```bash
npm run build
npm start
```

## Validation

Pour valider les OG images, vous pouvez utiliser :
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Maintenance

### Modifier le background
Le background utilise actuellement un gradient CSS radial bleu foncé. Pour le modifier, éditez la fonction `getOgBackgroundStyle()` dans `src/lib/og-utils.tsx`.

**Pour utiliser votre image personnalisée** : Consultez le guide détaillé `OG_IMAGE_BACKGROUND_GUIDE.md`

**Formats supportés** :
- ✅ PNG, JPEG, GIF
- ❌ WebP, AVIF, SVG (limité)

### Modifier les styles
Éditez `src/lib/og-utils.tsx` pour ajuster :
- Les couleurs
- Les tailles de police
- Les espacements
- Le gradient de fallback

### Ajouter une nouvelle page
1. Créez `opengraph-image.tsx` dans le dossier de la route
2. Importez les utilitaires depuis `@/lib/og-utils`
3. Récupérez les données dynamiques nécessaires
4. Retournez un `ImageResponse` avec le contenu approprié

## Exemple de code

```tsx
import { ImageResponse } from 'next/og'
import { OG_IMAGE_SIZE, getOgBackgroundStyle, titleStyle } from '@/lib/og-utils'

export const alt = 'Ma page'
export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { locale } = await params
  const backgroundStyle = await getOgBackgroundStyle()

  return new ImageResponse(
    (
      <div style={{ ...backgroundStyle, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
        <div style={titleStyle}>Titre de ma page</div>
      </div>
    ),
    { ...size }
  )
}
```

## Notes importantes

- **Satori ne supporte pas Tailwind CSS directement** : Utilisez des styles inline
- **Les images doivent être en base64 ou URL absolues** : Pas de chemins relatifs
- **Limite de taille** : Les images OG ne doivent pas dépasser 8 MB
- **Fonts personnalisées** : Possibilité d'ajouter des polices custom via l'option `fonts` de `ImageResponse`

## Ressources

- [Next.js OG Image Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Vercel OG Image Playground](https://og-playground.vercel.app/)
- [Satori Documentation](https://github.com/vercel/satori)
