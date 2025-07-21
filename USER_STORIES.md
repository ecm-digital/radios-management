# User Stories - Radiance Network Management

Ten dokument zawiera historyjki użytkowników (User Stories) dla kluczowych funkcjonalności aplikacji. Każda historyjka opisuje potrzebę z perspektywy użytkownika i zawiera kryteria akceptacji, które muszą być spełnione, aby uznać ją za zrealizowaną.

---

## Epic: Konfiguracja Urządzeń (Device Wizard)

### Historyjka 1: Prowadzenie przez proces konfiguracji

**Jako** Administrator Sieci,
**Chcę** używać kreatora krok po kroku do konfiguracji nowych urządzeń sieciowych,
**Aby** móc je szybko i bezbłędnie skonfigurować.

**Kryteria Akceptacji:**
- **Given** jestem na stronie kreatora urządzeń,
- **When** przechodzę przez kolejne kroki (wybór urządzeń, ustawienia podstawowe, konfiguracja radia, podsumowanie),
- **Then** interfejs prowadzi mnie przez każdy etap w logicznej kolejności.
- **And** nie mogę przejść do następnego kroku, jeśli wymagane pola w bieżącym kroku nie są wypełnione.

### Historyjka 2: Konfiguracja parametrów radia

**Jako** Administrator Sieci,
**Chcę** konfigurować parametry radiowe, takie jak pasmo częstotliwości, tryb pracy i protokół,
**Aby** zoptymalizować wydajność i zgodność sieci bezprzewodowej.

**Kryteria Akceptacji:**
- **Given** jestem w kroku konfiguracji radia,
- **When** wybieram pasmo częstotliwości (np. 2.4 GHz, 5 GHz),
- **Then** formularz dynamicznie dostosowuje dostępne opcje (np. kanały, szerokość kanału).
- **When** dodaję nowe SSID,
- **Then** pojawia się nowy formularz do konfiguracji nazwy sieci, hasła i trybu broadcast.
- **And** mogę dynamicznie dodawać i usuwać konfiguracje SSID.

---

## Epic: Zarządzanie Użytkownikami

### Historyjka 3: Przeglądanie listy użytkowników

**Jako** Administrator Systemu,
**Chcę** widzieć listę wszystkich użytkowników systemu wraz z ich rolą i statusem,
**Aby** móc zarządzać ich dostępem.

**Kryteria Akceptacji:**
- **Given** jestem na stronie "User Management",
- **When** strona się ładuje,
- **Then** widzę tabelę z kolumnami: Użytkownik (imię i email), Rola, Status, Ostatnie Logowanie.
- **And** przy każdym użytkowniku znajduje się menu akcji (np. Edytuj, Usuń).

### Historyjka 4: Zarządzanie rolami użytkowników

**Jako** Administrator Systemu,
**Chcę** przypisywać role (np. Administrator, Operator, Przeglądający) do użytkowników,
**Aby** kontrolować ich poziom uprawnień w systemie.

**Kryteria Akceptacji:**
- **Given** edytuję istniejącego użytkownika lub tworzę nowego,
- **When** otwieram formularz edycji,
- **Then** widzę pole (np. lista rozwijana) pozwalające na wybór roli.
- **And** po zapisaniu zmian, nowa rola jest widoczna na liście użytkowników.

---

## Epic: Analityka i Monitoring

### Historyjka 5: Szybki przegląd stanu sieci

**Jako** Operator Sieci,
**Chcę** widzieć pulpit analityczny z kluczowymi wskaźnikami wydajności (KPI),
**Aby** móc szybko ocenić ogólny stan sieci.

**Kryteria Akceptacji:**
- **Given** jestem na stronie "Analytics",
- **When** strona się ładuje,
- **Then** widzę karty (Cards) z metrykami: Całkowita Przepustowość, Aktywni Klienci, Czas Pracy Sieci.
- **And** widzę miejsce na główny wykres (np. Przepustowość w czasie).

---

## Epic: Alerty Systemowe

### Historyjka 6: Monitorowanie alertów

**Jako** Operator Sieci,
**Chcę** widzieć listę wszystkich alertów systemowych posortowaną od najnowszych,
**Aby** być na bieżąco z problemami i ważnymi zdarzeniami w sieci.

**Kryteria Akceptacji:**
- **Given** jestem na stronie "Alerts",
- **When** strona się ładuje,
- **Then** widzę tabelę z alertami, zawierającą: Poziom Ważności, Wiadomość, Czas wystąpienia i Status.
- **And** poziom ważności jest oznaczony kolorową etykietą (Badge) dla łatwej identyfikacji (np. Czerwony dla krytycznych).

---

## Epic: Ustawienia Systemowe

### Historyjka 7: Konfiguracja globalnych parametrów

**Jako** Administrator Systemu,
**Chcę** konfigurować globalne ustawienia, takie jak strefa czasowa czy serwer SMTP,
**Aby** dostosować działanie systemu do wymagań mojej organizacji.

**Kryteria Akceptacji:**
- **Given** jestem na stronie "System Settings",
- **When** przeglądam formularz,
- **Then** widzę sekcje do konfiguracji: Ustawień Ogólnych (strefa czasowa), Konfiguracji SMTP i Retencji Danych.
- **When** zmieniam wartość w polu i klikam "Zapisz Zmiany",
- **Then** system potwierdza zapisanie nowych ustawień (w przyszłej implementacji).
