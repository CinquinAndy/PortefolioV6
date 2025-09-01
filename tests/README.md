# Tests de Régression Visuelle

Ce dossier contient les tests automatisés pour détecter les régressions visuelles lors des migrations.

## 📋 Commandes Disponibles

```bash
# Lancer tous les tests visuels
npm run test:visual

# Lancer les tests avec interface graphique
npm run test:visual:ui

# Lancer les tests en mode visible (voir le navigateur)
npm run test:visual:headed

# Mettre à jour les screenshots de référence
npm run test:visual:update
```

## 🎯 Que testent ces scripts ?

### Pages testées automatiquement

- **Pages statiques** : `/`, `/about`, `/blog`, `/contact`, `/cgu`, `/portefolio`
- **Deux langues** : Français (fr) et Anglais (en)
- **Tests responsive** : Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
- **Pages dynamiques** : Premier article de blog (si disponible)
- **Tests d'accessibilité** : Vérifications de base

### Éléments masqués pour stabilité

- Curseurs personnalisés
- Animations CSS/Framer Motion
- Vidéos et contenus variables
- Gradients animés

## 🚀 Processus de Migration

### 1️⃣ AVANT toute migration

```bash
npm run test:visual
```

→ Crée les screenshots de référence

### 2️⃣ APRÈS chaque étape de migration

```bash
npm run test:visual
```

→ Compare avec les références

### 3️⃣ Si des différences sont acceptables

```bash
npm run test:visual:update
```

→ Met à jour les références

## 🔧 Configuration

- **Seuil de tolérance** : 20% pour les pages statiques, 30% pour le contenu dynamique
- **Timeout** : 120s pour le démarrage du serveur
- **Navigateur** : Chrome/Chromium uniquement (plus stable)
- **Attente** : 2s pour les animations + attente networkidle

## 📁 Structure des Screenshots

```
tests/
├── visual-regression.spec.js-snapshots/
│   ├── about-page-fr-visual-test-chromium-linux.png
│   ├── home-page-fr-visual-test-chromium-linux.png
│   └── ... (tous les autres screenshots)
└── test-results/
    └── (rapports d'erreurs si échecs)
```

## ⚠️ Points d'attention

1. **Première exécution** : Génère les baselines, pas d'échecs
2. **Deuxième exécution** : Compare et peut échouer si différences
3. **Contenu dynamique** : Articles de blog peuvent varier selon Strapi
4. **Animations** : Désactivées mais peuvent parfois fuir

## 🐛 Résolution des problèmes

### Test qui échoue ?

1. Regarder le rapport HTML : `npx playwright show-report`
2. Comparer visuellement les différences
3. Si OK : `npm run test:visual:update`
4. Si KO : Corriger le code et relancer

### Serveur qui ne démarre pas ?

1. Vérifier que le port 3000 est libre
2. Augmenter le timeout dans `playwright.config.js`
3. Lancer `npm run dev` manuellement d'abord
