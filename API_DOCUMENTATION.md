S# 📖 API Documentation - Frameworks JavaScript

Documentation complète pour consommer l'API Strapi des cours Frameworks JavaScript.

---

## 🔗 Base URL

```
https://api.andy-cinquin.fr
```

---

## 🔐 Authentification

Toutes les requêtes nécessitent un token API dans le header :

```http
Authorization: Bearer YOUR_API_TOKEN
```

---

## 📚 Structure Hiérarchique

```
Cours Parent (1)
  └── Chapitres (24)
      └── Leçons (66)
          └── Attachments (PDFs, images)
```

---

## 🎯 Endpoints Principaux

### 1. Récupérer le Cours Parent avec Chapitres

**GET** `/api/courses/83?populate=chapters`

Récupère le cours parent "Frameworks JavaScript" avec la liste de ses 24 chapitres.

#### Paramètres Query

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `populate` | Relations à inclure | `chapters`, `lessons`, `tags`, `seo` |
| `sort` | Tri des résultats | `order:asc`, `createdAt:desc` |
| `pagination[page]` | Page (pour les chapitres si > 25) | `1`, `2`, `3` |
| `pagination[pageSize]` | Éléments par page | `10`, `25`, `100` |

#### Réponse

Voir: [`examples/course-parent-with-chapters.json`](#example-1-course-parent-with-chapters)

---

### 2. Récupérer un Chapitre avec ses Leçons

**GET** `/api/courses/{chapter_id}?populate=lessons`

Récupère un chapitre spécifique avec toutes ses leçons.

#### Exemple

```http
GET /api/courses/85?populate=lessons
```

#### Réponse

Voir: [`examples/chapter-with-lessons.json`](#example-2-chapter-with-lessons)

---

### 3. Récupérer une Leçon avec Attachments

**GET** `/api/lessons/{lesson_id}?populate=attachments`

Récupère une leçon spécifique avec ses fichiers attachés (PDFs, images).

#### Exemple

```http
GET /api/lessons/215?populate=attachments
```

#### Réponse

Voir: [`examples/lesson-with-attachments.json`](#example-3-lesson-with-attachments)

---

### 4. Structure Complète (Parent → Chapitres → Leçons)

**GET** `/api/courses/83?populate[chapters][populate]=lessons`

Récupère toute la structure hiérarchique en une seule requête.

⚠️ **Attention** : Cette requête est lourde (25 cours + 66 leçons). Utilisez la pagination ou les endpoints séparés pour les performances.

#### Réponse

Voir: [`examples/full-hierarchy.json`](#example-4-full-hierarchy)

---

### 5. Lister Tous les Chapitres

**GET** `/api/courses?populate=parent_course&filters[parent_course][id][$eq]=83`

Liste tous les chapitres du cours parent.

#### Paramètres

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
| `filters[parent_course][id][$eq]` | Filtrer par cours parent | `83` |
| `sort` | Tri | `order:asc` |
| `pagination[pageSize]` | Éléments par page | `25`, `50`, `100` |

#### Réponse

Voir: [`examples/list-chapters.json`](#example-5-list-chapters)

---

### 6. Rechercher des Leçons

**GET** `/api/lessons?filters[title][$contains]=React&populate=attachments`

Recherche des leçons par titre avec leurs attachments.

#### Paramètres de Filtrage

| Filtre | Opérateur | Exemple |
|--------|-----------|---------|
| `$eq` | Égal | `filters[slug][$eq]=js` |
| `$ne` | Différent | `filters[order][$ne]=1` |
| `$contains` | Contient | `filters[title][$contains]=React` |
| `$gt` | Supérieur | `filters[order][$gt]=5` |
| `$gte` | Supérieur ou égal | `filters[order][$gte]=5` |
| `$lt` | Inférieur | `filters[order][$lt]=10` |
| `$lte` | Inférieur ou égal | `filters[order][$lte]=10` |

---

## 📋 Schémas de Données

### Course (Cours Parent)

```typescript
interface Course {
  id: number;
  attributes: {
    slug: string;                    // Ex: "frameworks-javascript"
    title: string;                   // Ex: "Frameworks JavaScript - Formation Complète"
    description: string;             // Texte long
    order: number;                   // 0 pour le parent
    thumbnail: MediaData | null;     // Image du cours (null pour le parent actuellement)
    duration_total: number | null;   // Durée totale en minutes
    is_published: boolean;           // true
    featured: boolean;               // true pour le parent, false pour les chapitres
    category: string | null;         // "Web Development" pour le parent, null pour les chapitres
    createdAt: string;               // ISO 8601 date
    updatedAt: string;               // ISO 8601 date
    publishedAt: string;             // ISO 8601 date
    tags: Tag[];                     // Array de tags (vide pour les chapitres)
    seo: SEO;                        // Métadonnées SEO
    lessons: RelationData<Lesson>;   // Leçons directes (vide pour le parent)
    parent_course: RelationData<Course>; // Cours parent (null pour le parent, 83 pour les chapitres)
    chapters: RelationData<Course>;  // Sous-cours (24 pour le parent, vide pour les chapitres)
  };
}
```

### Chapter (Chapitre = Cours Enfant)

```typescript
interface Chapter {
  id: number;
  attributes: {
    slug: string;                    // Ex: "js", "react", "typescript"
    title: string;                   // Ex: "JS", "React", "TypeScript"
    description: string;             // Ex: "Chapitre 2: JS de la formation Frameworks JavaScript"
    order: number;                   // 1-24
    thumbnail: null;                 // Toujours null
    duration_total: null;            // Toujours null
    is_published: boolean;           // true
    featured: boolean;               // false
    category: null;                  // Toujours null
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tags: [];                        // Toujours vide
    seo: SEO;                        // SEO contextualisé
    lessons: RelationData<Lesson>;   // Liste des leçons du chapitre
    parent_course: RelationData<Course>; // Référence au parent (ID: 83)
    chapters: RelationData<Course>;  // Toujours vide
  };
}
```

### Lesson (Leçon)

```typescript
interface Lesson {
  id: number;
  attributes: {
    slug: string;                    // Ex: "setup", "variables", "hooks"
    title: string;                   // Ex: "Setup", "Variables", "Hooks"
    description: string;             // Extrait du contenu markdown
    order: number;                   // Position dans le chapitre (1-N)
    content: string;                 // Contenu markdown complet
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    attachments: RelationData<Media>; // Fichiers PDF, images liés
  };
}
```

### SEO

```typescript
interface SEO {
  id: number;
  title: string;                     // Meta title
  description: string;               // Meta description
  h1: string;                        // H1 de la page
  canonical: string;                 // URL canonique
}
```

### Tag

```typescript
interface Tag {
  id: number;
  name: string;                      // Ex: "JavaScript", "React", "TypeScript"
}
```

### Media

```typescript
interface Media {
  id: number;
  attributes: {
    name: string;                    // Nom du fichier
    alternativeText: string | null;  // Texte alternatif
    caption: string | null;          // Légende
    width: number | null;            // Largeur (images)
    height: number | null;           // Hauteur (images)
    formats: object | null;          // Formats d'image (thumbnail, small, medium, large)
    hash: string;                    // Hash unique
    ext: string;                     // Extension (.pdf, .png, .jpg)
    mime: string;                    // Type MIME
    size: number;                    // Taille en Ko
    url: string;                     // URL de téléchargement
    previewUrl: string | null;       // URL de prévisualisation
    provider: string;                // Fournisseur de stockage
    createdAt: string;
    updatedAt: string;
  };
}
```

### RelationData (Type Générique)

```typescript
interface RelationData<T> {
  data: T | T[] | null;
}
```

---

## 📦 Exemples de Réponses JSON

### Example 1: Course Parent with Chapters

**GET** `/api/courses/83?populate=chapters&sort[chapters][order]=asc`

```json
{
  "data": {
    "id": 83,
    "attributes": {
      "slug": "frameworks-javascript",
      "title": "Frameworks JavaScript - Formation Complète",
      "description": "Formation complète sur JavaScript et ses frameworks modernes. De la découverte de JavaScript aux frameworks comme React, Angular, Vue et Next.js, en passant par TypeScript, les tests, la sécurité, les performances et le déploiement.",
      "order": 0,
      "duration_total": 0,
      "is_published": true,
      "featured": true,
      "category": "Web Development",
      "createdAt": "2025-10-03T22:15:30.000Z",
      "updatedAt": "2025-10-03T22:15:30.000Z",
      "publishedAt": "2025-10-03T22:15:30.000Z",
      "thumbnail": {
        "data": null
      },
      "tags": [
        { "id": 1, "name": "JavaScript" },
        { "id": 2, "name": "React" },
        { "id": 3, "name": "Vue" },
        { "id": 4, "name": "Angular" },
        { "id": 5, "name": "Next.js" },
        { "id": 6, "name": "TypeScript" },
        { "id": 7, "name": "Testing" },
        { "id": 8, "name": "Performance" },
        { "id": 9, "name": "Security" }
      ],
      "seo": {
        "id": 1,
        "title": "Formation Complète Frameworks JavaScript | React, Vue, Angular, Next.js",
        "description": "Apprenez JavaScript et ses frameworks (React, Vue, Angular, Next.js) avec cette formation complète de 24 chapitres couvrant TypeScript, les tests, la sécurité et les performances.",
        "h1": "Formation Complète Frameworks JavaScript",
        "canonical": "/courses/frameworks-javascript"
      },
      "lessons": {
        "data": []
      },
      "parent_course": {
        "data": null
      },
      "chapters": {
        "data": [
          {
            "id": 84,
            "attributes": {
              "slug": "hello",
              "title": "Hello",
              "order": 1,
              "is_published": true
            }
          },
          {
            "id": 85,
            "attributes": {
              "slug": "js",
              "title": "JS",
              "order": 2,
              "is_published": true
            }
          }
          // ... 22 autres chapitres
        ]
      }
    }
  },
  "meta": {}
}
```

---

### Example 2: Chapter with Lessons

**GET** `/api/courses/85?populate=lessons&sort[lessons][order]=asc`

```json
{
  "data": {
    "id": 85,
    "attributes": {
      "slug": "js",
      "title": "JS",
      "description": "Chapitre 2: JS de la formation Frameworks JavaScript",
      "order": 2,
      "duration_total": null,
      "is_published": true,
      "featured": false,
      "category": null,
      "createdAt": "2025-10-03T22:15:45.000Z",
      "updatedAt": "2025-10-03T22:15:45.000Z",
      "publishedAt": "2025-10-03T22:15:45.000Z",
      "thumbnail": {
        "data": null
      },
      "tags": [],
      "seo": {
        "id": 2,
        "title": "JS | Frameworks JavaScript",
        "description": "Chapitre 2: JS de la formation complète Frameworks JavaScript. 16 leçons pour maîtriser ce sujet.",
        "h1": "JS",
        "canonical": "/courses/frameworks-javascript/js"
      },
      "lessons": {
        "data": [
          {
            "id": 215,
            "attributes": {
              "slug": "0-setup",
              "title": "0 Setup",
              "description": "Vous pouvez setup votre projet !",
              "order": 1,
              "createdAt": "2025-10-03T22:15:38.000Z",
              "updatedAt": "2025-10-03T22:15:38.000Z",
              "publishedAt": "2025-10-03T22:15:38.000Z"
            }
          },
          {
            "id": 216,
            "attributes": {
              "slug": "1-variables",
              "title": "1 Variables",
              "description": "let message; // déclaration de la variable message",
              "order": 2,
              "createdAt": "2025-10-03T22:15:39.000Z",
              "updatedAt": "2025-10-03T22:15:39.000Z",
              "publishedAt": "2025-10-03T22:15:39.000Z"
            }
          }
          // ... 14 autres leçons
        ]
      },
      "parent_course": {
        "data": {
          "id": 83,
          "attributes": {
            "slug": "frameworks-javascript",
            "title": "Frameworks JavaScript - Formation Complète"
          }
        }
      },
      "chapters": {
        "data": []
      }
    }
  },
  "meta": {}
}
```

---

### Example 3: Lesson with Attachments

**GET** `/api/lessons/215?populate=attachments`

```json
{
  "data": {
    "id": 215,
    "attributes": {
      "slug": "0-setup",
      "title": "0 Setup",
      "description": "Vous pouvez setup votre projet !",
      "order": 1,
      "content": "# Setup JavaScript\\n\\nVous pouvez setup votre projet !\\nPour ça, tout simplement, vous pouvez créer un fichier [nom_du_fichier].js\\nL'ouvrir dans votre IDE préféré, et exécuter en terminal la commande :\\n\\n```js\\nnode [nom_du_fichier].js\\n```\\n\\nÇa va exécuter le fichier et vous verrez le résultat dans la console\\nN'oubliez pas d'ajouter les console.log() pour voir les retours dans la console !\\n",
      "createdAt": "2025-10-03T22:15:38.000Z",
      "updatedAt": "2025-10-03T22:15:38.000Z",
      "publishedAt": "2025-10-03T22:15:38.000Z",
      "attachments": {
        "data": [
          {
            "id": 1250,
            "attributes": {
              "name": "exemple-setup.pdf",
              "alternativeText": "0 Setup - exemple-setup.pdf",
              "caption": "exemple-setup.pdf",
              "width": null,
              "height": null,
              "formats": null,
              "hash": "exemple_setup_abc123",
              "ext": ".pdf",
              "mime": "application/pdf",
              "size": 245.67,
              "url": "/uploads/exemple_setup_abc123.pdf",
              "previewUrl": null,
              "provider": "local",
              "createdAt": "2025-10-03T22:15:37.000Z",
              "updatedAt": "2025-10-03T22:15:37.000Z"
            }
          }
        ]
      }
    }
  },
  "meta": {}
}
```

---

### Example 4: Full Hierarchy

**GET** `/api/courses/83?populate[chapters][populate]=lessons&populate[chapters][sort][0]=order:asc`

⚠️ **Attention** : Réponse très volumineuse (~1-2 MB). Utilisez avec parcimonie.

```json
{
  "data": {
    "id": 83,
    "attributes": {
      "slug": "frameworks-javascript",
      "title": "Frameworks JavaScript - Formation Complète",
      "description": "Formation complète...",
      "chapters": {
        "data": [
          {
            "id": 84,
            "attributes": {
              "slug": "hello",
              "title": "Hello",
              "order": 1,
              "lessons": {
                "data": [
                  {
                    "id": 212,
                    "attributes": {
                      "slug": "step-0-0-intro",
                      "title": "Step 0.0   Intro",
                      "order": 1,
                      "content": "# Introduction\\n\\n..."
                    }
                  }
                  // ... autres leçons
                ]
              }
            }
          }
          // ... autres chapitres
        ]
      }
    }
  }
}
```

---

### Example 5: List Chapters

**GET** `/api/courses?populate=parent_course&filters[parent_course][id][$eq]=83&sort=order:asc&pagination[pageSize]=25`

```json
{
  "data": [
    {
      "id": 84,
      "attributes": {
        "slug": "hello",
        "title": "Hello",
        "description": "Chapitre 1: Hello de la formation Frameworks JavaScript",
        "order": 1,
        "is_published": true,
        "parent_course": {
          "data": {
            "id": 83,
            "attributes": {
              "slug": "frameworks-javascript",
              "title": "Frameworks JavaScript - Formation Complète"
            }
          }
        }
      }
    },
    {
      "id": 85,
      "attributes": {
        "slug": "js",
        "title": "JS",
        "description": "Chapitre 2: JS de la formation Frameworks JavaScript",
        "order": 2,
        "is_published": true,
        "parent_course": {
          "data": {
            "id": 83
          }
        }
      }
    }
    // ... 22 autres chapitres
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 24
    }
  }
}
```

---
