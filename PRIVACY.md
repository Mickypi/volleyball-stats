# Politique de confidentialité — Volley-Ball, My Team Simple Stats

*Dernière mise à jour : mai 2025*

---

## 1. Introduction

La présente Politique de confidentialité décrit comment l'application **Volley-Ball, My Team Simple Stats** (ci-après "l'Application") collecte, utilise et protège vos informations personnelles.

Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles de manière transparente, conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation française en vigueur.

---

## 2. Données collectées

### 2.1 Données fournies par Pi Network
Lors de l'authentification via Pi Network, nous accédons aux données suivantes :
- **Nom d'utilisateur Pi** (username) — utilisé uniquement pour afficher votre identité dans l'Application
- **Identifiant unique Pi** (uid) — utilisé pour identifier votre session

Nous **ne collectons pas** votre adresse email, numéro de téléphone, wallet Pi ou toute autre donnée personnelle au-delà de ce qui est strictement nécessaire.

### 2.2 Données de match
Les données de match (noms des équipes, joueurs, statistiques) sont stockées **uniquement sur votre appareil** via le mécanisme `localStorage` du navigateur. Ces données :
- Ne sont **jamais transmises** à nos serveurs
- Ne sont **pas partagées** avec des tiers
- Restent **sous votre contrôle** total et peuvent être supprimées à tout moment

### 2.3 Données de paiement
Lors d'un paiement en Pi, les informations suivantes transitent par nos serveurs :
- L'identifiant du paiement Pi (`paymentId`)
- L'identifiant de transaction blockchain (`txid`)

Ces données sont traitées uniquement pour valider et compléter le paiement via l'API Pi Network. Elles ne sont pas conservées au-delà de la transaction.

---

## 3. Finalités du traitement

Vos données sont utilisées pour :
- **Authentification** : vérifier votre identité via Pi Network
- **Personnalisation** : afficher votre nom d'utilisateur dans l'interface
- **Traitement des paiements** : valider les transactions Pi pour l'export PDF
- **Fonctionnement de l'Application** : sauvegarder vos matchs localement

---

## 4. Base légale du traitement

Le traitement de vos données repose sur :
- **L'exécution d'un contrat** : pour le traitement des paiements Pi
- **Votre consentement** : pour l'authentification via Pi Network
- **Notre intérêt légitime** : pour assurer le bon fonctionnement de l'Application

---

## 5. Partage des données

Nous ne vendons, ne louons et ne partageons pas vos données personnelles avec des tiers, à l'exception de :
- **Pi Network** : pour l'authentification et le traitement des paiements, conformément à leur propre politique de confidentialité disponible sur [https://minepi.com/privacy](https://minepi.com/privacy)
- **Vercel** : notre hébergeur, qui peut traiter les données transitant par nos serveurs conformément à leur politique de confidentialité

---

## 6. Conservation des données

- **Données d'authentification** : non conservées au-delà de votre session
- **Données de paiement** : conservées le temps de la transaction uniquement
- **Données de match** : stockées localement sur votre appareil jusqu'à suppression manuelle

---

## 7. Vos droits

Conformément au RGPD, vous disposez des droits suivants :
- **Droit d'accès** : obtenir une copie de vos données
- **Droit de rectification** : corriger vos données inexactes
- **Droit à l'effacement** : supprimer vos données (les données de match peuvent être supprimées directement depuis l'Application via "Mes Matchs")
- **Droit à la portabilité** : recevoir vos données dans un format structuré
- **Droit d'opposition** : vous opposer au traitement de vos données

Pour exercer ces droits, contactez-nous via le Pi Browser en consultant la page de l'Application sur le Pi Network App Studio.

---

## 8. Sécurité

Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
- Toutes les communications transitent via **HTTPS**
- L'API Key Pi Network est stockée comme variable d'environnement sécurisée (jamais exposée côté client)
- Aucune donnée sensible n'est enregistrée dans des logs persistants

---

## 9. Cookies et stockage local

L'Application utilise **localStorage** (stockage local du navigateur) pour sauvegarder vos matchs. Ce mécanisme est strictement local à votre appareil. Vous pouvez effacer ces données à tout moment en supprimant les matchs depuis l'Application ou en vidant le cache de votre navigateur.

L'Application n'utilise **pas de cookies** de traçage ou publicitaires.

---

## 10. Modifications de la politique

Nous nous réservons le droit de modifier la présente politique à tout moment. Toute modification sera publiée dans l'Application et prendra effet dès sa mise en ligne.

---

## 11. Contact

Pour toute question relative à cette politique de confidentialité ou à l'exercice de vos droits, contactez-nous via le Pi Browser sur la page de l'Application dans le Pi Network App Studio.
