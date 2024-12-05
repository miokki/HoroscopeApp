# HoroscopeApp

HoroscopeApp to aplikacja umożliwiająca obliczanie i wizualizację horoskopów na podstawie danych urodzeniowych użytkownika, takich jak data, czas i miejsce urodzenia.

## Funkcje

- **Kalkulacja horoskopu**: Oblicza pozycje planet, domów astrologicznych, aspekty i konfiguracje planetarne.
- **Wizualizacja wykresu**: Prezentuje interaktywny wykres horoskopu z symbolami planet, domów i znaków zodiaku.
- **Faza Księżyca**: Wyświetla aktualną fazę Księżyca bazując na danych urodzeniowych.
- **Stellia**: Identyfikuje i prezentuje stellia w horoskopie użytkownika.

## Technologie

### Backend

- **Python**: Logika serwera i obliczenia astrologiczne.
- **Flask**: Framework do tworzenia API RESTful.
- **swisseph**: Biblioteka do precyzyjnych obliczeń pozycji ciał niebieskich.
- **geopy**: Umożliwia geokodowanie lokalizacji na podstawie nazwy miejsca.
- **pytz**: Obsługa stref czasowych w Pythonie.

### Frontend

- **React**: Budowa interfejsu użytkownika.
- **TypeScript**: Statyczne typowanie w kodzie JavaScript.
- **Tailwind CSS**: Stylowanie komponentów z wykorzystaniem utilitarnej biblioteki CSS.
- **SVG**: Generowanie skalowalnych grafik wykresu horoskopu.
- **D3.js**: Biblioteka do tworzenia dynamicznych i interaktywnych wizualizacji danych.

## Struktura projektu

- `/HoroscopeApp`
  - `/backend`
    - `app.py`: Główny plik aplikacji backendowej.
    - `/ephe`: Pliki efemeryd potrzebne do obliczeń astrologicznych.
      - `seas_18.se1`
      - `semo_18.se1`
      - `sepl_18.se1`
    - `/venv`
  - `/frontend`
    - `package-lock.json`
    - `package.json`
    - `postcss.config.js`
    - `tailwind.connfig.js`
    - `tsconfig.json`
    - `/public`
      - `favicon.ico`
      - `index.html`
      - `logo192.png`
      - `logo512.png`
      - `manifest.json`
      - `robots.txt`
    - `/node_modules`
    - `/src`
      - `/assets`
        - `/icons`: Ikony planet używane w wykresie.
          - `jupiter.svg`
          - `mars.svg`
          - `mercury.svg`
          - `moon.svg`
          - `neptune.svg`
          - `pluto.svg`
          - `saturn.svg`
          - `sun.svg`
          - `uranus.svg`
          - `venus.svg`
          - `default.svg`
      - `/components`: Komponenty React odpowiedzialne za różne części aplikacji (formularze, wykresy, itp.).
        - `/chart`
          - `AspectLine.tsx`
          - `ChartContainer.tsx`
          - `HoroscopeChart.tsx`
          - `HouseLabel.tsx`
          - `Houses.tsx`
          - `MoonPhase.tsx`
          - `Planet.tsx`
          - `PlanetIcon.tsx`
          - `PlanetTooltip.tsx`
          - `ZodiacCircle.tsx`
        - `/form`
            - `HoroscopeForm.tsx`
            - `LocationInput.tsx`
       - `/constants`: Stałe wartości używane w aplikacji frontendowej.
         - `chart.ts`
       - `/hooks`: Własne hooki React ułatwiające interakcję z wykresem.
         - `useChartInteraction.ts`
       - `/utils`: Funkcje pomocnicze używane w aplikacji.
         - `chart.ts`
       - `App.tsx`: Główny komponent aplikacji frontendowej.
       - `App.css`
       - `index.tsx`
       - `index.css`
       - `react-app-env.d.ts`
       - `reportWebVitals.ts`
       - `setupTests.ts`    
     - `tailwind.config.js`: Konfiguracja Tailwind CSS.

## Instalacja i uruchomienie

### Backend

1. Przejdź do katalogu `/backend`.
2. Stwórz i aktywuj wirtualne środowisko:
     ```bash
     python -m venv venv
     # Aktywacja środowiska:
     # Windows:
     venv\Scripts\activate
     # Linux/MacOS:
     source venv/bin/activate
     ```
3. Zainstaluj wymagane zależności:
     ```bash
     pip install -r requirements.txt
     ```
4. Uruchom aplikację backendową:
     ```bash
     python app.py
     ```

### Frontend

1. Przejdź do katalogu `/frontend`.
2. Zainstaluj zależności:
     ```bash
     npm install
     ```
3. Uruchom aplikację frontendową:
     ```bash
     npm start
     ```
4. Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Sposób obsługi

1. Uruchom zarówno backend, jak i frontend aplikacji.
2. W przeglądarce przejdź do `http://localhost:3000`.
3. Wprowadź swoje dane urodzeniowe w formularzu (data, czas, miejsce).
4. Kliknij przycisk **Oblicz horoskop**.
5. Przeglądaj wygenerowany wykres horoskopu i dodatkowe informacje.

## Licencja

Projekt jest dostępny na licencji MIT. Szczegóły znajdują się w pliku `LICENSE`.
