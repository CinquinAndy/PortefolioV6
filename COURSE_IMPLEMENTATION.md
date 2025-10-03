# Implémentation du système de cours

## 📁 Structure créée

```
src/
├── app/[locale]/course/
│   ├── layout.tsx                          # Layout de base (pass-through)
│   ├── page.tsx                            # Liste de tous les cours (existait déjà)
│   ├── [courseSlug]/
│   │   ├── layout.tsx                      # Layout avec sidebar pour navigation
│   │   ├── page.tsx                        # Détails d'un cours + liste des leçons
│   │   └── [lessonSlug]/
│   │       └── page.tsx                    # Affichage d'une leçon individuelle
│
├── components/course/
│   ├── Breadcrumbs.tsx                     # Navigation fil d'Ariane (existait)
│   ├── ContentLink.tsx                     # Lien vers leçon/cours (existait)
│   ├── PageSection.tsx                     # Section de page (existait)
│   ├── SidebarLayout.tsx                   # ✨ Nouveau: Layout avec sidebar
│   ├── NextPageLink.tsx                    # ✨ Nouveau: Lien "Suivant"
│   ├── TableOfContents.tsx                 # ✨ Nouveau: Table des matières
│   └── icons/                              # Icônes (existaient)
│       ├── BookIcon.tsx
│       ├── ClockIcon.tsx
│       ├── LessonsIcon.tsx
│       ├── PlayIcon.tsx
│       └── CirclePlayIcon.tsx
```

## 🎨 Design et Architecture

### Inspiration compass-ts
Le système s'inspire du template TailwindUI "compass-ts" mais adapté pour:
- ✅ Utiliser les données Strapi au lieu de MDX statique
- ✅ Respecter le design sombre (dark theme) de votre portfolio
- ✅ Utiliser les couleurs cyan comme accent (au lieu de gray/blue)
- ✅ Intégrer avec votre système de navigation existant

### Niveaux de navigation

1. **`/[locale]/course`** - Vue d'ensemble
   - Liste tous les cours disponibles
   - Statistiques globales (nombre de cours, leçons, durée)
   - Utilise Nav et Footer globaux
   - **Pas de sidebar** (vue marketing)

2. **`/[locale]/course/[courseSlug]`** - Page de cours
   - Détails du cours (titre, description, niveau)
   - Liste complète des leçons
   - **Avec sidebar** pour navigation entre cours
   - Breadcrumbs pour orientation

3. **`/[locale]/course/[courseSlug]/[lessonSlug]`** - Page de leçon
   - Vidéo de la leçon (si disponible)
   - Contenu markdown/HTML
   - Table des matières (sur grand écran)
   - Lien vers leçon suivante
   - **Avec sidebar** pour navigation

## 🔧 Composants créés

### SidebarLayout.tsx
Composant inspiré de compass-ts avec:
- Navigation sidebar collapsible (desktop)
- Dialog mobile pour navigation
- Liste des cours avec leurs leçons
- Indication de la page active
- Thème sombre avec accents cyan

**Utilisation:**
```tsx
<SidebarLayout modules={modules} locale={locale}>
  {children}
</SidebarLayout>
```

### NextPageLink.tsx
Lien vers la prochaine leçon/page:
- Style card avec hover effect
- Affiche titre et description
- Icône chevron right

### TableOfContents.tsx
Table des matières interactive:
- Détecte automatiquement les h2/h3 dans le contenu
- Suit la position de scroll
- Met en évidence la section active
- Sticky positioning

## 📊 Intégration Strapi

Le système utilise les services existants:

### getCourses.ts
Fonctions utilisées:
- `getCourses(locale)` - Liste tous les cours
- `getCourseBySlug(slug, locale)` - Détails d'un cours
- `getLessonBySlug(slug, locale)` - Détails d'une leçon
- `getNextLesson(currentSlug, locale)` - Leçon suivante

### Structure des données
Basée sur `src/types/course.ts`:
```typescript
Course {
  slug, title, description, order
  thumbnail, category, level
  duration_total, lessons[]
  is_published, featured
  ...
}

Lesson {
  slug, title, description, order
  content (HTML/Markdown)
  video, video_thumbnail, video_duration
  attachments[], quiz
  ...
}
```

## 🎯 Fonctionnalités

### Page de cours individuel
- ✅ Header avec image de fond (thumbnail)
- ✅ Gradient overlay cyan
- ✅ Stats (nombre de leçons, durée, niveau)
- ✅ Bouton CTA "Commencer"
- ✅ Liste numérotée des leçons
- ✅ Navigation sidebar

### Page de leçon
- ✅ Lecteur vidéo HTML5 avec poster
- ✅ Support des sous-titres (captions)
- ✅ Rendu du contenu HTML/Markdown
- ✅ Liste des pièces jointes
- ✅ Table des matières (h2/h3)
- ✅ Navigation vers leçon suivante
- ✅ Breadcrumbs complets

### Navigation
- ✅ Sidebar avec tous les cours et leçons
- ✅ Highlight de la leçon active
- ✅ Version mobile (dialog)
- ✅ Collapsible sur desktop
- ✅ Breadcrumbs sur toutes les pages

## 🎨 Styling

### Thème
- **Background**: slate-900/slate-950 avec effets de blur
- **Accent**: cyan-400/cyan-500
- **Text**: slate-50 (titres), slate-300 (corps)
- **Borders**: slate-50/10 pour subtilité

### Composants UI
- Boutons avec transitions smooth
- Cards avec hover effects (bg-slate-50/10)
- Gradients animés sur hero sections
- Backdrop blur pour profondeur

## 🚀 Prochaines étapes possibles

1. **Système de progression**
   - Tracker les leçons complétées
   - Barre de progression du cours
   - Certificat de complétion

2. **Quiz interactifs**
   - Utiliser les données `quiz` de Strapi
   - Validation des réponses
   - Score et feedback

3. **Recherche et filtres**
   - Recherche dans les cours
   - Filtres par catégorie/niveau
   - Tags

4. **Vidéo améliorée**
   - Marqueurs de progression
   - Speed control
   - Notes temporelles

5. **Social**
   - Commentaires par leçon
   - Ratings
   - Partage social

## 📝 Notes techniques

### Layouts imbriqués
- Le layout `/course/layout.tsx` est un pass-through
- Le vrai layout avec sidebar est dans `/course/[courseSlug]/layout.tsx`
- Cela permet d'avoir la page overview sans sidebar

### Performance
- Pages générées statiquement quand possible
- Images optimisées via Next.js Image
- Lazy loading du contenu vidéo

### Accessibilité
- Navigation au clavier supportée
- ARIA labels sur les composants
- Breadcrumbs sémantiques
- Headings hiérarchiques

## 🔗 Références

- Template inspiré de: `compass-ts/` (TailwindUI)
- Types: `src/types/course.ts`
- Services: `src/services/getCourses.ts`
- Documentation Strapi: `src/data/courses/STRAPI_SETUP.md`
