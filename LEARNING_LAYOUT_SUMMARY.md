# 📚 Layout d'apprentissage - Style Compass-TS

## ✅ Corrections effectuées

### 1. **Erreur IntersectionObserver corrigée**
- ❌ `rootMargin: '-${...}px 0px 0px'` (syntaxe invalide)
- ✅ `rootMargin: '-80px 0px 0px 0px'` (valeur fixe en pixels)

### 2. **Nouveau layout complet style Compass-TS**

Structure créée dans le groupe de routes `(learning)` :

```
src/app/[locale]/(learning)/
├── layout.tsx                          # Layout global (bg-white, dark:bg-gray-950)
└── course/
    ├── layout.tsx                      # Import course-typography.css
    ├── page.tsx                        # Page overview des cours
    └── [chapterSlug]/
        ├── layout.tsx                  # Sidebar avec tous les chapitres
        └── [lessonSlug]/
            └── page.tsx                # Page de leçon
```

### 3. **Composants avec style Compass-TS (-learning)**

Tous les composants utilisent maintenant les couleurs **gray** du template original :

#### `SidebarLayout-learning.tsx`
- ✅ Couleurs gray au lieu de cyan/slate
- ✅ IconButton et SidebarIcon intégrés
- ✅ Structure identique au template
- ✅ Border `border-gray-950/10 dark:border-white/10`
- ✅ Text `text-gray-950 dark:text-white`
- ✅ Hover `hover:text-gray-950 dark:hover:text-white`

#### `Breadcrumbs-learning.tsx`
- ✅ `text-gray-950 hover:text-gray-700`
- ✅ `dark:text-white dark:hover:text-gray-400`

#### `NextPageLink-learning.tsx`
- ✅ "Up next" au lieu de "Suivant"
- ✅ Couleurs gray complètes

#### `TableOfContents-learning.tsx`
- ✅ "On this page" heading
- ✅ Border et hover styles gray
- ✅ IntersectionObserver corrigé

### 4. **Styles CSS**

#### `course-typography.css`
Styles prose adaptés de Tailwind CSS v4 :
- ✅ Headers `text-gray-950 dark:text-white`
- ✅ Body text `text-gray-700 dark:text-gray-400`
- ✅ Links avec underline decoration
- ✅ Code blocks avec border
- ✅ Tables, lists, images stylés

## 🎨 Design exactement comme Compass-TS

### Couleurs principales
- **Background**: `bg-white dark:bg-gray-950`
- **Text**: `text-gray-950 dark:text-white`
- **Text secondaire**: `text-gray-700 dark:text-gray-400`
- **Borders**: `border-gray-950/10 dark:border-white/10`
- **Hover**: `hover:bg-gray-950/4 dark:hover:bg-white/5`

### Sidebar
- Fixed left sidebar
- Width: `w-2xs` (288px)
- Collapsible sur desktop
- Mobile dialog sur xl breakpoint
- Navigation par chapitres → leçons

### Layout de page
- Sticky navbar avec breadcrumbs
- Content max-width `max-w-2xl`
- Table of contents à droite (hidden sur < lg)
- Prose typography pour le contenu

## 🚀 URLs

Toutes identiques grâce au groupe de routes `(learning)` :

```
/fr/course                               → Overview
/fr/course/js/0-setup                    → Leçon
/fr/course/react/hooks                   → Leçon
```

## 📝 Différences avec l'ancien layout

### Ancien (cyan/slate)
- Couleurs accent cyan
- Background slate-900
- Style portfolio custom

### Nouveau (gray)
- ✅ Couleurs gray comme template
- ✅ Background white/gray-950
- ✅ UI identique compass-ts
- ✅ Tous composants -learning

## 🔧 Composants utilisés

Dans `[lessonSlug]/page.tsx` :
```tsx
import { Breadcrumb, BreadcrumbHome, Breadcrumbs, BreadcrumbSeparator }
  from '@/components/course/Breadcrumbs-learning'
import { NextPageLink }
  from '@/components/course/NextPageLink-learning'
import { SidebarLayoutContent }
  from '@/components/course/SidebarLayout-learning'
import TableOfContents
  from '@/components/course/TableOfContents-learning'
```

## ✨ Fonctionnalités

- ✅ Sidebar navigation complète
- ✅ Breadcrumbs hiérarchiques
- ✅ Table of contents avec scroll tracking
- ✅ Next lesson link
- ✅ Dark mode support
- ✅ Mobile responsive
- ✅ Prose typography
- ✅ Attachments display

## 🎯 Résultat

Le layout est maintenant **identique au template Compass-TS** avec :
- Structure exacte
- Couleurs originales (gray)
- Composants matching
- Styles cohérents
- Fonctionnalités complètes

Seules les **données** proviennent de Strapi au lieu de fichiers MDX statiques !
