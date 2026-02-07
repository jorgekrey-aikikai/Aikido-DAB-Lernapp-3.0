# Aikido App 3.0.1 – Kritische Updates

## ✅ Implementierte Korrekturen

### 1. Prüfungsordnung DAB
**Änderung:** Video-Links entfernt
- ❌ Keine Videos mehr in der Prüfungsordnung
- ✅ Nur noch: Technik + Angriffsform + Variation

### 2. Lernkarten - Komplette Neustrukturierung

#### A) Lernkarten Angriffe (NEU)
**Tab:** "Angriffe üben"
**System:** Spaced Repetition (wie AnkiDroid)

**Features:**
- ✅ Vorderseite: Japanischer Angriffsname
- ✅ Rückseite: Deutsche Übersetzung
- ✅ Spaced Repetition Algorithmus:
  - Richtig → Intervall verdoppelt (10min → 25min → 62.5min...)
  - Falsch → Sofort wieder (nach 1 Min)
  - Falsch beantwortete Karten kommen in Review-Queue
- ✅ Fortschrittsanzeige:
  - Gelernt: X / Y (3x richtig = gelernt)
  - In Wiederholung: Z Karten
- ✅ Persistierung via LocalStorage (`aikido_attack_stats`)
- ✅ 15 Angriffskarten verfügbar

**Algorithmus:**
```javascript
Intervalle:
- Neu: 0 (sofort fällig)
- 1. richtig: 10 Minuten
- 2. richtig: 25 Minuten  
- 3. richtig: 62.5 Minuten
- etc. (Faktor 2.5)

Bei falsch: Interval = 0, Review in 1 Minute
```

#### B) Lernkarten Techniken (Überarbeitet)
**Tab:** "Techniken üben"
**Neu:** Berichtsfunktion

**Features:**
- ✅ Wie bisher: Kyu-Filter, Flashcards, Selbstbewertung
- ✅ **NEU: Bericht-Button** (📊 Bericht anzeigen)

**Bericht-Inhalte:**
1. **"Kann ich nicht"** (😓)
   - Alle Techniken mit Bewertung "Schwer"
   - Farbe: Rot (var(--error-color))

2. **"Verbessern"** (😐)
   - Alle Techniken mit Bewertung "Geht so"
   - Farbe: Orange (var(--warning-color))

3. **Hinweis für Lehrer:**
   > 💡 Dieser Bericht zeigt deine selbst bewerteten Schwächen. 
   > Zeige ihn deinem Lehrer, um gezielt an diesen Techniken zu arbeiten.

**Bericht-Modal:**
- Overlay mit schließbarem Modal
- Scrollbar bei vielen Einträgen
- Dark-Mode-kompatibel

### 3. Navigation
**Änderung:** 4 → 5 Tabs

**Alt:**
1. Prüfungsordnung
2. Techniken
3. Angriffe
4. Lernkarten

**Neu:**
1. Prüfungsordnung
2. Techniken
3. Angriffe
4. **Angriffe üben** ← NEU
5. **Techniken üben** ← Umbenannt

## 📊 Technische Details

### Neue Variablen
```javascript
let attackCards = [];           // 15 Angriffskarten
let attackCardQueue = [];       // Hauptqueue
let attackReviewQueue = [];     // Falsch beantwortete
let attackStats = {};          // Stats per Angriff
let currentAttackCard = null;  // Aktuelle Karte
let isAttackFlipped = false;   // Flip-Status
```

### Neue Funktionen
```javascript
initAttackCards()          // Angriffs-Lernkarten starten
showNextAttackCard()       // Nächste Karte
renderAttackCard()         // Karte rendern
flipAttackCard()           // Karte umdrehen
answerAttackCard(correct)  // Antwort bewerten
updateAttackProgress()     // Fortschritt updaten

showTechnikenBericht()     // Bericht anzeigen
closeTechnikenBericht()    // Bericht schließen
```

### LocalStorage
```javascript
aikido_attack_stats = {
  "Katate Tori - Aihanme": {
    correct: 2,
    wrong: 1,
    lastReview: 1707334567890,
    nextReview: 1707335167890,
    interval: 600000  // 10 Min in ms
  },
  // ...
}

aikido_ratings = {
  "Shiho_Nage_Katate_Tori_-_Aihanme_IRIMI": "hard",
  "Ikkyo_Shomen-uchi_IRIMI": "ok",
  "Nikyo_Katate_Tori_-_Gyakuhanme_TENKAN": "good"
}
```

## 🎯 Zusammenfassung

| Bereich | Status | Änderung |
|---------|--------|----------|
| Prüfungsordnung | ✅ | Videos entfernt |
| Angriffe üben | ✅ NEU | Spaced Repetition System |
| Techniken üben | ✅ | Berichtsfunktion hinzugefügt |
| Navigation | ✅ | 5 Tabs statt 4 |

## 📱 Dateigrößen
- index.html: 55 KB (war 43 KB)
- aikido_data.json: 55 KB (unverändert)
- manifest.json: 10 KB (unverändert)
- sw.js: 0.8 KB (unverändert)

## 🔧 Installation
1. Alle 4 Dateien ersetzen
2. Browser-Cache leeren (Strg+F5)
3. Fertig!

---

**Version:** 3.0.1  
**Datum:** Februar 2026  
**Änderungen:** Prüfungsordnung Videos entfernt, Angriffs-Lernkarten mit Spaced Repetition, Techniken-Bericht
