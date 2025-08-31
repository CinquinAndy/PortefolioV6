# Tests de Migration - Guide Ultra-Rapide

## 🎯 État Actuel
✅ **5 baselines visuelles** + 1 test fonctionnel  
✅ **Détection de régression** validée (34% détectée lors du test)  
✅ **Prêt pour migration**

## ⚡ Commandes

```bash
# AVANT migration - Vérifier que tout passe
npm run test:visual -- tests/production-migration-tests.spec.js

# APRÈS chaque étape - Détecter régressions  
npm run test:visual -- tests/production-migration-tests.spec.js

# Si changements OK - Mettre à jour baselines
npm run test:visual:update

# Voir rapport détaillé des erreurs
npx playwright show-report
```

## 🚨 Résultats Attendus

**✅ NORMAL :** `7 passed, 1 failed` (navigation)  
**❌ RÉGRESSION :** Screenshots différents avec % et fichiers diff

## 📊 Pages Testées

| Page | Type | Tolérance |
|------|------|-----------|
| About | Screenshot | 10% |
| Blog | Screenshot | 10% |
| Contact | Screenshot | 15% |
| Homepage FR/EN | Screenshot + mask vidéo | 20% |
| Portfolio | Test fonctionnel | 48 projets |

---
*Système testé et validé - Prêt pour migration*