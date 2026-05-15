# 🏐 Volley-Ball, My Team Simple Stats

> Application mobile de statistiques pour matchs de volley-ball, intégrée à l'écosystème Pi Network.

---

## 📱 Description

**Volley-Ball, My Team Simple Stats** est une application web progressive conçue pour faciliter la prise de statistiques en temps réel pendant un match de volley-ball.

Elle permet à un statisticien de saisir rapidement les actions des joueurs (service, réception, attaque, bloc) et d'obtenir des rapports détaillés par joueur et par set, exportables en PDF.

---

## ✨ Fonctionnalités

- **Authentification Pi Network** — connexion sécurisée via le Pi Browser
- **Configuration du match** — noms des équipes, joueurs (jusqu'à 14), rôles (En jeu / Remplaçant / Libéro), numéros de maillot
- **Saisie rapide** — 3 taps pour enregistrer une action : joueur → type d'action → qualité (++ / + / 0 / −)
- **Gestion du libéro** — zone dédiée, restriction aux réceptions, switch entre 2 libéros
- **Substitutions** — panneau de changement de joueurs pendant le match
- **Gestion des sets** — validation du score avec les règles officielles du volley (25 pts / 2 pts d'écart, tie-break à 15)
- **Statistiques détaillées** — efficience par action et par joueur, récapitulatif global, rapport points/fautes
- **Export PDF** — tableau de statistiques A4 paysage par set (payant via Pi)
- **Sauvegarde des matchs** — jusqu'à 4 matchs sauvegardés localement, reprise possible à tout moment
- **Édition en cours de match** — modification des noms, numéros et rôles des joueurs via le panneau paramètres ⚙️

---

## 💰 Modèle de paiement Pi

| Export | Coût |
|--------|------|
| PDF d'un set | 1 Pi |
| PDF complet (tous les sets) | 3 Pi |

Les paiements sont traités via le SDK Pi Network (U2A — User to App).

---

## 🛠️ Stack technique

- **Frontend** : HTML5 / CSS3 / JavaScript vanilla — fichier unique `index.html`
- **Backend** : Serverless Functions Node.js via Vercel (`/api/approve`, `/api/complete`)
- **Authentification** : Pi Network SDK v2.0
- **Paiements** : Pi Network Payments API
- **Stockage** : localStorage (données sur l'appareil)
- **Hébergement** : Vercel

---

## 📁 Structure du projet

```
volleyball-stats/
├── index.html          # Application frontend complète
├── vercel.json         # Configuration Vercel
├── Logo_Appli_Volley.png  # Logo de l'application
├── api/
│   ├── approve.js      # Endpoint d'approbation des paiements Pi
│   └── complete.js     # Endpoint de complétion des paiements Pi
├── README.md           # Ce fichier
├── TERMS.md            # Conditions d'utilisation
├── PRIVACY.md          # Politique de confidentialité
└── REFUND.md           # Politique de remboursement
```

---

## 🚀 Déploiement

L'application est déployée sur **Vercel** et accessible via le **Pi Browser** à l'adresse :

```
https://volleyball-stats-five.vercel.app
```

### Variables d'environnement requises (Vercel)

| Variable | Description |
|----------|-------------|
| `PI_NETWORK_API_KEY` | Clé API fournie par le Pi Developer Portal / App Studio |

---

## 📋 Règles du volley-ball intégrées

- Sets 1 à 4 : premier à **25 points** avec **2 points d'écart**
- Set 5 (tie-break) : premier à **15 points** avec **2 points d'écart**
- Prolongations gérées automatiquement (26-24, 27-25, etc.)

---

## 📊 Calcul des statistiques

| Indicateur | Formule |
|-----------|---------|
| Efficience (Eff.) | (++ − −) / total × 100 |
| Rapport pts/fautes | (Srv++ + Réc++ + Att++) − (Srv− + Réc− + Att−) + Bloc++ |
| % Points | ++ / total actions |

---

## 👨‍💻 Développement

Application développée avec l'assistance de **Claude (Anthropic)** dans le cadre du programme **Pi Network App Studio**.

---

## 📄 Documents légaux

- [Conditions d'utilisation](TERMS.md)
- [Politique de confidentialité](PRIVACY.md)
- [Politique de remboursement](REFUND.md)
