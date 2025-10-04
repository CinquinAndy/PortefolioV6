# Implémentation du système de cours

## 📁 Structure hiérarchique Strapi

```
Cours Parent (ID: 83 - "Frameworks JavaScript")
  └── Chapitres (24 cours enfants via relation parent_course)
      └── Leçons (66 lessons)
```

## 🗂️ Structure des routes créée

```
src/
├── app/[locale]/course/
│   ├── layout.tsx                          # Layout de base (pass-through)
│   ├── page.tsx                            # Liste des cours parents avec tous les chapitres
│   └── [chapterSlug]/
│       ├── layout.tsx                      # Layout avec sidebar pour navigation
│       ├── page.tsx                        # Détails d'un chapitre + liste des leçons
│       └── [lessonSlug]/
│           └── page.tsx                    # Affichage d'une leçon individuelle
│
├── components/course/
│   ├── Breadcrumbs.tsx                     # Navigation fil d'Ariane
│   ├── ContentLink.tsx                     # Lien vers leçon/chapitre
│   ├── PageSection.tsx                     # Section de page
│   ├── SidebarLayout.tsx                   # Layout avec sidebar
│   ├── NextPageLink.tsx                    # Lien "Suivant"
│   ├── TableOfContents.tsx                 # Table des matières
│   └── icons/                              # Icônes
│
└── services/
    └── getCourses.ts                       # Services adaptés pour parent/chapters/lessons
```

## 🎨 Architecture des pages

### 1. `/[locale]/course` - Vue d'ensemble
- **Affiche**: Tous les cours parents (ex: "Frameworks JavaScript")
- **Structure**: Pour chaque cours parent →
  - Titre et description du cours
  - Liste des chapitres (ex: "Hello", "JS", "React"...)
  - Pour chaque chapitre → liste des leçons
- **Navigation**: Nav et Footer globaux
- **Sidebar**: Pas de sidebar (vue marketing)

### 2. `/[locale]/course/[chapterSlug]` - Page de chapitre
- **Affiche**: Détails d'un chapitre spécifique (ex: `/course/js`)
- **Contenu**:
  - Titre du chapitre (ex: "Chapitre 2: JS")
  - Description
  - Badge du cours parent
  - Liste complète des leçons du chapitre
- **Navigation**: Sidebar avec tous les chapitres et leçons
- **URL Exemple**: `/fr/course/js`

### 3. `/[locale]/course/[chapterSlug]/[lessonSlug]` - Page de leçon
- **Affiche**: Contenu d'une leçon (ex: `/course/js/variables`)
- **Contenu**:
  - Titre et description de la leçon
  - Contenu markdown/HTML
  - Pièces jointes (PDFs, images)
  - Table des matières (h2/h3)
  - Lien vers leçon suivante
- **Navigation**: Sidebar + breadcrumbs + ToC
- **URL Exemple**: `/fr/course/js/variables`

## 🔧 Services créés/adaptés

### getParentCourses(locale)
Récupère tous les cours parents avec leurs chapitres et leçons imbriqués.

**API Call:**
```
/api/courses?populate[chapters][populate]=lessons&filters[parent_course][id][$null]=true
```

**Retourne:**
```typescript
[
  {
    id: 83,
    attributes: {
      slug: "frameworks-javascript",
      title: "Frameworks JavaScript - Formation Complète",
      chapters: {
        data: [
          {
            id: 84,
            attributes: {
              slug: "hello",
              title: "Hello",
              order: 1,
              lessons: { data: [...] }
            }
          },
          // ... 23 autres chapitres
        ]
      }
    }
  }
]
```

### getCourseBySlug(slug, locale)
Récupère un chapitre spécifique avec ses leçons.

**API Call:**
```
/api/courses?populate[lessons][sort][0]=order:asc&populate=parent_course&filters[slug][$eq]=js
```

### getLessonBySlug(slug, locale)
Récupère une leçon avec ses attachments.

**API Call:**
```
/api/lessons?populate=attachments&filters[slug][$eq]=variables
```

### getNextLesson(currentLessonSlug, currentChapterSlug, locale)
Trouve la prochaine leçon (même chapitre ou premier leçon du chapitre suivant).

**Retourne:**
```typescript
{
  lesson: Lesson,
  chapterSlug: string
} | null
```

## 🎯 Flux utilisateur

### Parcours type :

1. **Page d'accueil cours** (`/course`)
   - L'utilisateur voit "Frameworks JavaScript"
   - 24 chapitres avec toutes leurs leçons
   - Clique sur "Commencer" → va à la première leçon

2. **Page de chapitre** (`/course/js`)
   - Voit le chapitre "JS" avec ses 16 leçons
   - Sidebar montrant tous les chapitres
   - Peut naviguer entre chapitres ou commencer les leçons

3. **Page de leçon** (`/course/js/variables`)
   - Lit le contenu de la leçon "Variables"
   - Sidebar pour naviguer vers autres leçons
   - Breadcrumbs pour remonter
   - Table des matières pour sections de la page
   - Bouton "Suivant" → leçon suivante ou prochain chapitre

## 📊 Données Strapi utilisées

### Course Parent
```typescript
{
  id: 83,
  slug: "frameworks-javascript",
  title: "Frameworks JavaScript - Formation Complète",
  description: "Formation complète...",
  order: 0,
  is_published: true,
  featured: true,
  category: "Web Development",
  tags: [...],
  chapters: { data: [24 chapitres] }
}
```

### Chapter (Cours enfant)
```typescript
{
  id: 85,
  slug: "js",
  title: "JS",
  description: "Chapitre 2: JS de la formation...",
  order: 2,
  is_published: true,
  parent_course: { data: { id: 83 } },
  lessons: { data: [16 leçons] }
}
```

### Lesson
```typescript
{
  id: 215,
  slug: "0-setup",
  title: "0 Setup",
  description: "Vous pouvez setup votre projet !",
  order: 1,
  content: "# Setup JavaScript\\n\\n...", // Markdown
  attachments: { data: [...] }
}
```

## 🎨 Composants UI

### SidebarLayout
- Navigation latérale avec liste de tous les chapitres
- Chaque chapitre montre ses leçons
- Highlight de la page active
- Collapsible sur desktop
- Dialog mobile

### ContentLink
Affiche un lien vers une leçon avec :
- Icône Play
- Titre et description
- Durée (si disponible)
- Hover effects

### NextPageLink
Affiche le lien vers la leçon suivante :
- "Suivant" avec icône chevron
- Titre et description de la prochaine leçon
- Style card

### TableOfContents
- Détecte h2/h3 dans le contenu
- Suit la position de scroll
- Sticky positioning

## 🚀 Exemple d'URLs

```
/fr/course
  → Affiche "Frameworks JavaScript" avec 24 chapitres

/fr/course/hello
  → Chapitre 1: Hello

/fr/course/js
  → Chapitre 2: JS (16 leçons)

/fr/course/js/0-setup
  → Leçon "Setup" du chapitre JS

/fr/course/js/1-variables
  → Leçon "Variables" du chapitre JS

/fr/course/react
  → Chapitre "React"

/fr/course/react/hooks
  → Leçon "Hooks" du chapitre React
```

## 🎯 Fonctionnalités

### Page de cours (overview)
- ✅ Liste tous les cours parents
- ✅ Affiche tous les chapitres par cours
- ✅ Stats globales (chapitres, leçons)
- ✅ Navigation hiérarchique (cours → chapitres → leçons)
- ✅ Bouton CTA vers première leçon

### Page de chapitre
- ✅ Détails du chapitre
- ✅ Badge du cours parent cliquable
- ✅ Liste des leçons numérotées
- ✅ Sidebar avec navigation globale
- ✅ Breadcrumbs

### Page de leçon
- ✅ Contenu markdown processsé en HTML
- ✅ Pièces jointes téléchargeables
- ✅ Table des matières interactive
- ✅ Navigation vers leçon suivante (même chapitre ou suivant)
- ✅ Sidebar avec tous les chapitres/leçons
- ✅ Breadcrumbs complets

## 🔄 Navigation entre leçons

La fonction `getNextLesson()` gère intelligemment :

1. **Leçon suivante dans le même chapitre**
   - Si on est sur `/course/js/variables`
   - Et qu'il y a une leçon suivante
   - → Retourne la leçon suivante du même chapitre

2. **Première leçon du chapitre suivant**
   - Si on est sur la dernière leçon d'un chapitre
   - → Trouve le chapitre suivant (par order)
   - → Retourne sa première leçon

3. **Fin du cours**
   - Si on est sur la dernière leçon du dernier chapitre
   - → Retourne null
   - → Affiche lien "Retour aux cours"

## 📝 Notes importantes

### Structure parent_course
- Les cours parents ont `parent_course = null`
- Les chapitres ont `parent_course.id = 83` (ID du parent)
- Filtre Strapi: `filters[parent_course][id][$null]=true` pour les parents

### Ordre d'affichage
- Cours parents: triés par `order`
- Chapitres: triés par `order` (1-24)
- Leçons: triées par `order` dans chaque chapitre

### Performance
- `getParentCourses()` fait 1 requête pour tout charger
- Pagination possible si trop de données
- Markdown processsé côté serveur avec `processMarkdown()`

## 🎨 Styling

### Thème global
- Background: `slate-900/950` avec blur effects
- Accent: `cyan-400/500`
- Text: `slate-50` (titres), `slate-300` (corps)
- Borders: `slate-50/10`

### Highlights
- Chapitre actif dans sidebar: `border-cyan-400`
- Links hover: `text-cyan-300`
- Boutons CTA: `bg-cyan-500`

## 🔗 Références

- API Documentation: `API_DOCUMENTATION.md`
- Types: `src/types/course.ts`
- Services: `src/services/getCourses.ts`
- Template inspiré de: `compass-ts/` (TailwindUI)
