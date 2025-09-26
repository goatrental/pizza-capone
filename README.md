# Pizza Capone - Webová stránka restaurace

Moderní webová aplikace pro pizzerii Capone vytvořená v React + TypeScript s Vite a Tailwind CSS.

## 🚀 Spuštění projektu

### Předpoklady
Ujistěte se, že máte nainstalované:
- [Node.js](https://nodejs.org/) (verze 16 nebo vyšší)
- npm (obvykle se instaluje s Node.js)
- Git

### Instalace a spuštění

1. **Klonování repozitáře**
   ```bash
   git clone git@github.com:michalvarys/pizza-capone.git
   cd pizza-capone
   ```

2. **Instalace závislostí**
   ```bash
   npm install
   ```

3. **Spuštění vývojového serveru**
   ```bash
   npm run dev
   ```
   
   Aplikace se spustí na `http://localhost:5173`

### Dostupné příkazy

- `npm run dev` - Spustí vývojový server
- `npm run build` - Vytvoří produkční build
- `npm run preview` - Náhled produkčního buildu
- `npm run lint` - Spustí ESLint kontrolu kódu

## 📁 Struktura projektu

```
src/
├── components/     # React komponenty
├── data/          # Data a konfigurace
├── hooks/         # Custom React hooks
├── types/         # TypeScript definice typů
├── App.tsx        # Hlavní komponenta
├── main.tsx       # Entry point
└── index.css      # Globální styly
```

## 🔧 Technologie

- **React 18** - UI knihovna
- **TypeScript** - Typovaný JavaScript
- **Vite** - Build nástroj a dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Ikony
- **Supabase** - Backend služby

## 📚 Git - Základní příkazy

### Aktualizace kódu (stažení změn)
```bash
# Stáhne nejnovější změny z remote repozitáře
git pull origin main
```

### Přidání změn
```bash
# Přidá konkrétní soubor do staging area
git add nazev-souboru.txt

# Přidá všechny změněné soubory
git add .

# Přidá všechny soubory v aktuální složce
git add *
```

### Commit (uložení změn)
```bash
# Vytvoří commit s popisnou zprávou
git commit -m "Popis změn"

# Přidá všechny změny a vytvoří commit najednou
git commit -am "Popis změn"
```

### Nahrání změn na server
```bash
# Nahraje commity na remote repozitář
git push origin main
```

### Užitečné git příkazy

```bash
# Zobrazí stav repozitáře (změněné soubory)
git status

# Zobrazí historii commitů
git log

# Zobrazí rozdíly v souborech
git diff

# Zobrazí informace o remote repozitářích
git remote -v

# Zobrazí všechny větve
git branch -a

# Přepne na jinou větev
git checkout nazev-vetve

# Vytvoří novou větev a přepne na ni
git checkout -b nova-vetev
```

### Typický workflow

1. **Před začátkem práce** - stáhni nejnovější změny:
   ```bash
   git pull origin main
   ```

2. **Během práce** - průběžně přidávej změny:
   ```bash
   git add .
   git commit -m "Popis toho, co jsem udělal"
   ```

3. **Po dokončení práce** - nahraj změny:
   ```bash
   git push origin main
   ```

## 🐛 Řešení problémů

### Port je již používán
Pokud je port 5173 obsazen, Vite automaticky použije další dostupný port.

### Chyby při instalaci
```bash
# Vymaž node_modules a package-lock.json, pak reinstaluj
rm -rf node_modules package-lock.json
npm install
```

### Git konflikty
```bash
# Zobraz konfliktní soubory
git status

# Po vyřešení konfliktů
git add .
git commit -m "Vyřešeny konflikty"
```

## 📞 Kontakt

Pro otázky a podporu kontaktujte vývojový tým.
