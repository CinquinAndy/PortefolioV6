# Tests de Régression Visuelle Complets

Ce dossier contient les tests automatisés complets pour détecter les régressions visuelles sur les pages principales du portfolio.

## 🎯 Pages couvertes par les tests

### 📝 Pages de Blog
- **Page principale du blog** (`/fr/blog`, `/en/blog`)
- **Pages d'articles individuels** (test dynamique du premier article disponible)
- **Validation du contenu** et de la structure des articles

### 🚀 Page Portfolio/Réalisations
- **Page principale portfolio** (`/fr/portefolio`, `/en/portefolio`)
- **Tests d'interaction** avec les projets
- **Validation du nombre de projets affichés**

### ⚖️ Pages Légales
- **Conditions Générales d'Utilisation** (`/fr/cgu`, `/en/cgu`)
- **Validation du contenu légal** et de la structure

## 📋 Commandes Disponibles

```bash
# 🔄 Lancer TOUS les tests visuels (blog + portfolio + légales)
npm run test:visual -- tests/visual-regression-tests.spec.js

# 🎨 Lancer les tests avec interface graphique Playwright
npm run test:visual:ui -- tests/visual-regression-tests.spec.js

# 👁️ Lancer les tests en mode visible (voir le navigateur)
npm run test:visual:headed -- tests/visual-regression-tests.spec.js

# 📸 GÉNÉRER LES SCREENSHOTS DE BASE (première fois)
npm run test:visual:update -- tests/visual-regression-tests.spec.js
```

## 🚀 Processus d'utilisation

### 1️⃣ PREMIÈRE EXÉCUTION - Générer les baselines

```bash
npm run test:visual:update -- tests/visual-regression-tests.spec.js
```

→ Crée les 6 screenshots de référence pour toutes les pages

### 2️⃣ EXÉCUTIONS SUIVANTES - Détecter les régressions

```bash
npm run test:visual -- tests/visual-regression-tests.spec.js
```

→ Compare automatiquement avec les références

### 3️⃣ APRÈS MODIFICATIONS ACCEPTÉES

```bash
npm run test:visual:update -- tests/visual-regression-tests.spec.js
```

→ Met à jour les screenshots de référence

## 🔧 Configuration technique

### Paramètres des tests
- **Résolution** : 1920x1080 (Full HD)
- **Seuil de tolérance** : 10% pour les différences acceptables
- **Timeout** : 90s par test (augmenté pour le contenu lourd)
- **Stabilisation** : 6s d'attente + scroll automatique
- **Navigateurs** : Chrome, Firefox, Safari

### Éléments stabilisés/masqués
- ✅ Curseurs personnalisés
- ✅ Animations CSS/Framer Motion/Lottie
- ✅ Vidéos de fond
- ✅ Éléments dynamiques (timestamps, etc.)
- ✅ Transitions et transforms

## 📁 Structure des fichiers générés

```
tests/
├── visual-regression-tests.spec.js              # Tests principaux
├── visual-regression-tests.spec.js-snapshots/   # Screenshots de référence
│   ├── blog-main-fr.png
│   ├── blog-main-en.png
│   ├── blog-article-detail-fr.png
│   ├── blog-article-detail-en.png
│   ├── portfolio-main-fr.png
│   ├── portfolio-main-en.png
│   ├── cgu-main-fr.png
│   └── cgu-main-en.png
├── archive-production-migration-tests.spec.js   # Anciens tests archivés
└── README.md                                    # Cette documentation
```

## 📊 Résultats attendus

Après exécution complète, vous devriez avoir :

### ✅ Tests réussis (12 tests au total)
- **6 tests visuels** : Un screenshot par page/langue
- **4 tests de validation** : Contenu et structure
- **2 tests globaux** : Navigation et chargement

### 📸 Screenshots générés (6 fichiers)
- `blog-main-fr.png` / `blog-main-en.png`
- `portfolio-main-fr.png` / `portfolio-main-en.png`
- `cgu-main-fr.png` / `cgu-main-en.png`

## ⚠️ Points importants

### 🔄 Première exécution
- Génère automatiquement tous les screenshots de base
- **Ne peut pas échouer** (pas de comparaison possible)

### 🔍 Exécutions suivantes
- Compare pixel par pixel avec les références
- **Échoue si différences > 10%** de tolérance
- Utile pour détecter les régressions

### 📝 Contenu dynamique
- Les articles de blog peuvent varier selon Strapi
- Le test s'adapte automatiquement au premier article disponible
- Les screenshots sont nommés de façon générique

## 🐛 Dépannage

### Test qui échoue de façon inattendue ?

1. **Vérifier le rapport** : `npx playwright show-report`
2. **Comparer visuellement** : Différences dans le rapport HTML
3. **Si les différences sont OK** : `npm run test:visual:update`
4. **Si les différences sont KO** : Corriger le code source

### Serveur qui ne démarre pas ?

```bash
# Vérifier le port 3000
lsof -i :3000

# Lancer manuellement d'abord
npm run dev

# Puis lancer les tests dans un autre terminal
npm run test:visual -- tests/visual-regression-tests.spec.js
```

### Contenu qui change trop souvent ?

- Augmenter le seuil de tolérance dans `CONFIG.threshold`
- Exclure certaines zones variables avec `mask` dans Playwright
- Utiliser des tests fonctionnels au lieu de visuels pour le contenu dynamique

## 🎯 Bonnes pratiques

1. **Toujours générer les baselines** avant les modifications importantes
2. **Vérifier les différences** avant de mettre à jour les références
3. **Documenter les changements acceptés** dans le commit
4. **Maintenir les screenshots à jour** régulièrement

## 📈 Maintenance

- **Fréquence** : Après chaque modification visuelle majeure
- **Nettoyage** : Supprimer les anciens résultats régulièrement
- **Archivage** : Les anciens tests sont sauvegardés dans `archive-*`

---

*Tests créés pour couvrir : Blog (principal + articles), Portfolio/Réalisations, et Pages légales (CGU)*
