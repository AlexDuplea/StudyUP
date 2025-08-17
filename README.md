# studyUP - Sito Web Ripetizioni

Sito web professionale per servizio di ripetizioni STEM e Lingue a Cerveteri.

## 🚀 Deployment su GitHub Pages

### Setup Iniziale

1. **Crea un repository su GitHub**
   - Vai su https://github.com e crea un nuovo repository
   - Nome consigliato: `studyup-website` o simile
   - NON inizializzare con README

2. **Carica i file**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - studyUP website"
   git branch -M main
   git remote add origin https://github.com/TUO-USERNAME/NOME-REPO.git
   git push -u origin main
   ```

3. **Attiva GitHub Pages**
   - Vai su Settings → Pages nel tuo repository
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Clicca Save

4. **Il sito sarà disponibile su:**
   `https://TUO-USERNAME.github.io/NOME-REPO/`

## 📝 Configurazioni da Completare

### 1. Contatti (IMPORTANTE!)
Modifica in `index.html`:
- Linea ~440: Sostituisci `39XXXXXXXXX` con il numero WhatsApp reale
- Linea ~447: Sostituisci `info@studyup.it` con email reale
- Linea ~453: Sostituisci `+39 XXX XXX XXXX` con numero telefono reale

### 2. Form di Contatto
Opzioni per il form:

**Opzione A: Formspree (Consigliato - Gratuito fino a 50 invii/mese)**
1. Registrati su https://formspree.io
2. Crea un nuovo form
3. Sostituisci `YOUR_FORM_ID` alla linea ~462 con il tuo ID Formspree

**Opzione B: EmailJS (Gratuito fino a 200 invii/mese)**
1. Registrati su https://www.emailjs.com
2. Segui la documentazione per configurare

**Opzione C: Netlify Forms (Se usi Netlify per hosting)**
Aggiungi `netlify` all'attributo del form

### 3. Analytics (Opzionale ma Consigliato)
Aggiungi prima del tag `</head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. SEO & Social Media
Modifica in `index.html`:
- Linea ~14-20: Aggiorna meta tags con URL finale
- Linea ~22-27: Aggiorna Open Graph tags con URL finale
- Sostituisci `tuousername` con il tuo username GitHub

## 🎨 Personalizzazioni

### Colori
Modifica le variabili CSS in `css/styles.css` (linee 10-30)

### Font
Puoi cambiare i font modificando:
1. Il link Google Fonts in `index.html` (linea ~35)
2. Le variabili font in `css/styles.css` (linee 25-27)

### Immagini
Aggiungi immagini reali in `assets/images/`:
- Logo (formato SVG o PNG)
- Foto dello studio
- Foto del team (opzionale)
- Hero image

## 📱 Responsive Design
Il sito è ottimizzato per:
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🔧 Manutenzione

### Come aggiornare i prezzi
Modifica in `index.html` le sezioni:
- `.pricing-card` (linee ~380-420)

### Come aggiungere/rimuovere membri del team
Modifica in `index.html` la sezione:
- `.team-card` (linee ~310-350)

### Come modificare le materie
Modifica in `index.html`:
- Select delle materie (linea ~475-485)
- Cards del team con le materie

## 📄 File Structure
```
studyUP/
├── index.html          # Pagina principale
├── css/
│   ├── styles.css      # Stili principali
│   ├── animations.css  # Animazioni
│   └── normalize.css   # Reset CSS
├── js/
│   └── main.js         # JavaScript principale
├── assets/
│   ├── images/         # Immagini
│   └── icons/          # Icone
└── README.md           # Documentazione
```

## 🚨 Checklist Pre-Launch

- [ ] Sostituire tutti i placeholder dei contatti
- [ ] Configurare il form di contatto
- [ ] Aggiungere Google Analytics
- [ ] Verificare tutti i link
- [ ] Testare su mobile/tablet/desktop
- [ ] Aggiungere favicon reale
- [ ] Ottimizzare immagini (max 200KB per immagine)
- [ ] Verificare SEO con Google PageSpeed Insights
- [ ] Configurare Google My Business (per local SEO)

## 📞 Supporto

Per assistenza tecnica o modifiche, contattare:
[Il tuo contatto qui]

## 📜 Licenza

© 2024 studyUP - Tutti i diritti riservati
