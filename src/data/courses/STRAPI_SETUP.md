# Configuration Strapi pour le système de cours

Ce document explique comment configurer les collections Strapi pour le système de cours.

## Structure des Collections

### 1. Collection `courses` (Module de cours)

**Content-Type: `course`**

Champs :

- `slug` (Text, unique, required)
- `title` (Text, required)
- `description` (Text, required)
- `order` (Number, required)
- `thumbnail` (Media - Single image)
- `duration_total` (Number) - Durée totale en secondes
- `is_published` (Boolean, default: false)
- `featured` (Boolean, default: false)
- `category` (Text, required)

- `seo` (Component - Single)
- `tags` (Component - Repeatable)
- `lessons` (Relation - HasMany Lesson)

**i18n activé** : Oui

---

### 2. Collection `lessons` (Leçons)

**Content-Type: `lesson`**

Champs :

- `slug` (Text, unique, required)
- `title` (Text, required)
- `description` (Text, required)
- `order` (Number, required)
- `content` (Rich Text / Markdown) - Contenu de la leçon
- `attachments` (Media - Multiple files)

**i18n activé** : Oui
