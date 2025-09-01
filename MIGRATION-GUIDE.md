# Guide de Migration TypeScript

## ✅ Complété

### Configuration de base
- [x] `tsconfig.json` configuré
- [x] Types de base créés (`src/types/`)
- [x] Configuration Next.js et PostCSS
- [x] Dépendances TypeScript installées

### Services migrés
- [x] `src/services/localesConstant.ts`
- [x] `src/services/utils.ts` 
- [x] `src/services/getContentWebsite.ts`

### Utilitaires migrés
- [x] `src/lib/utils.ts`
- [x] `src/utils/cn.ts`

### Infrastructure
- [x] `src/middleware.ts`
- [x] `src/pages/api/sendMail.ts`
- [x] `src/pages/sitemap.xml.ts`

### Composants UI de base
- [x] `src/components/ui/badge.tsx`
- [x] `src/components/ui/button.tsx`

## 🔄 À migrer progressivement

### 1. Étapes suivantes prioritaires

**Corriger les types React manquants :**
```bash
# Ajouter au tsconfig.json
"types": ["react", "react-dom", "next"]
```

**Migrer les composants Global un par un :**
1. Commencer par les plus simples (sans props complexes)
2. Ajouter les interfaces pour les props
3. Corriger les types `any` implicites

### 2. Types à créer pour les composants

```typescript
// src/types/components.ts
export interface ArticleProps {
  articles: Article[]
  locale: Locale
  slice?: boolean
  isHome?: boolean
  content_website?: ContentWebsite
}

export interface RealisationProps {
  realisations: Realisation[]
  locale: Locale
  content_website?: ContentWebsite
}

export interface ContactFormProps {
  content_website?: ContentWebsite
}
```

### 3. Corrections communes nécessaires

**Pour les erreurs JSX :**
```typescript
// Ajouter en haut des fichiers .tsx
import React from 'react'
```

**Pour les paramètres implicites :**
```typescript
// Au lieu de :
const handleClick = (item, index) => {}

// Utiliser :
const handleClick = (item: any, index: number) => {}
```

**Pour les props de composants :**
```typescript
// Au lieu de :
export default function Component({ prop1, prop2 }) {

// Utiliser :
interface ComponentProps {
  prop1: string
  prop2?: number
}

export default function Component({ prop1, prop2 }: ComponentProps) {
```

### 4. Ordre de migration recommandé

1. **Composants simples d'abord :**
   - `ArrowUp.tsx`
   - `Signature.tsx`
   - `BackButton.component.tsx`

2. **Composants avec props basiques :**
   - `Cta.tsx`
   - `Pagination.tsx`
   - `TechnologyIcon.tsx`

3. **Composants complexes :**
   - `ContactForm.tsx`
   - `Nav.tsx`
   - `Articles.tsx`
   - `Realisations.tsx`

### 5. Commandes utiles

```bash
# Vérifier la compilation TypeScript
npm run tsc

# Build avec vérification de types
npm run build

# Linting TypeScript
npm run lint

# Formater le code
npm run prettier
```

### 6. Scripts utiles pour la migration

```bash
# Renommer tous les .js en .tsx dans un dossier
find src/components -name "*.js" -exec sh -c 'mv "$1" "${1%.js}.tsx"' _ {} \;

# Chercher les fichiers avec des interfaces TypeScript dans des .js
grep -r "interface " src/ --include="*.js"
```

## 📋 Prochaines étapes

1. **Immédiat :** Corriger les imports React manquants
2. **Court terme :** Migrer 3-5 composants simples par session
3. **Moyen terme :** Compléter tous les composants Global
4. **Long terme :** Migrer les pages App Router restantes

## 🐛 Problèmes connus

- Quelques composants ont déjà des interfaces TypeScript dans des fichiers .js
- Le module `special-card` nécessite des types personnalisés
- Certains composants utilisent des types `any` qui devront être affinés
- Les erreurs JSX peuvent être résolues en important React explicitement

## 💡 Conseils

- Migrer progressivement, composant par composant
- Tester la compilation après chaque migration
- Utiliser `// @ts-ignore` temporairement pour les types complexes
- Garder le mode `allowJs: true` pendant la transition
- Commiter fréquemment pour pouvoir revenir en arrière si nécessaire