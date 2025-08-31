# 🚀 PLAN DE MIGRATION - Portfolio v6 vers v7

## ✅ Phase 0 : Sécurisation (TERMINÉE)

- ✅ **Playwright installé et configuré**
- ✅ **Tests visuels créés** dans `tests/migration-tests.spec.js`
- ✅ **Baselines partielles créées** (About, Blog fonctionnels)

## 📋 Commandes Essentielles

```bash
# Créer les baselines AVANT migration
npm run test:visual -- tests/migration-tests.spec.js --update-snapshots

# Vérifier après chaque étape
npm run test:visual -- tests/migration-tests.spec.js

# Mettre à jour les baselines si changements acceptés
npm run test:visual:update

# Tests en mode visible pour debug
npm run test:visual:headed
```

## 🎯 Ordre de Migration Recommandé

### **Phase 1 : TypeScript (Migration Douce)**
```bash
# 1. Configuration TS permissive
echo '{"compilerOptions":{"allowJs":true,"checkJs":false,"strict":false}}' > tsconfig.json

# 2. Migration fichier par fichier
# Commencer par: utils → components → pages
```

**Stratégie TS :**
- ✅ Mélange JS/TS autorisé avec `allowJs: true`
- ✅ Migration progressive : `.js` → `.ts` un par un
- ✅ Pas de vérification stricte au début

### **Phase 2 : Tailwind 4 (CRITIQUE)**
```bash
# ⚠️ AVANT : Vérifier compatibilité navigateurs
# Tailwind 4 nécessite : Safari 16.4+, Chrome 111+, Firefox 128+

# 1. Backup complet
git add . && git commit -m "backup before tailwind 4"

# 2. Migration automatique
npx @tailwindcss/upgrade@next

# 3. Tests visuels immédiatement après
npm run test:visual
```

**Points critiques Tailwind 4 :**
- ❌ Plus de configuration JS (`tailwind.config.js` → CSS)
- ❌ Plus de `@tailwind` directives  
- ❌ Certaines classes renommées
- ✅ Outil de migration automatique disponible

### **Phase 3 : Next.js (Optionnel)**
Ta version 15.2.4 est récente, **ne pas toucher** sauf besoin spécifique.

### **Phase 4 : Strapi (Dernier)**
```bash
# Strapi V4 supporté jusqu'en avril 2026 - Pas pressé
npx @strapi/export  # Backup
npx @strapi/upgrade minor  # v4 latest
# Plus tard : npx @strapi/upgrade major  # v5
```

## 🛡️ Protocole de Sécurité

### Avant chaque étape majeure :
1. **Commit Git** : `git add . && git commit -m "before [étape]"`
2. **Tests visuels** : `npm run test:visual`
3. **Backup Strapi** : `npx @strapi/export` (si applicable)

### Après chaque étape :
1. **Tests visuels** : `npm run test:visual`
2. **Si ça passe** → continuer
3. **Si ça échoue** → analyser avec `npx playwright show-report`
4. **Si accepté** → `npm run test:visual:update`
5. **Si refusé** → rollback et corriger

## 🚨 Points d'Attention

### **Tailwind 4 - Vérifications OBLIGATOIRES :**
1. **Analytics navigateurs** : % d'utilisateurs sur navigateurs anciens ?
2. **SCSS/SASS** : Tu en utilises ? (incompatible TW4)
3. **Plugins Tailwind** : Lesquels ? (compatibilité ?)

### **TypeScript - Stratégie :**
1. Commencer par `src/utils/` (plus simple)
2. Puis `src/components/Global/` 
3. Enfin `src/app/[locale]/`
4. Garder `allowJs: true` pendant toute la transition

## 📊 État Actuel des Tests

### Tests Fonctionnels ✅
- **About page** : Stable, baseline créée
- **Blog page** : Stable, baseline créée  
- **Smoke tests** : Tous passent

### Tests Problématiques ⚠️
- **Homepage** : Animations vidéo background → masquage nécessaire
- **Portfolio** : Effets hover → protection anti-hover nécessaire
- **Contact** : Quasi-stable (4-16 pixels de différence)

## 🎯 Prochaines Étapes

1. **Maintenant** : Lancer `npm run test:visual:update` pour finaliser les baselines
2. **TypeScript** : Commencer la migration douce
3. **Tailwind 4** : Vérifier analytics navigateurs AVANT
4. **Strapi** : Pas pressé, v4 supportée jusqu'en 2026

**Tu veux qu'on commence par quelle étape ?**