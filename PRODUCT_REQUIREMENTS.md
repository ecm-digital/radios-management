# Product Requirements Document (PRD): Radio Configuration Wizard

**Wersja:** 1.0
**Data:** 20.07.2025

---

## 1. Wprowadzenie i Wizja Produktu

**Wizja:** Stworzenie intuicyjnego i potężnego narzędzia do zarządzania sieciami radiowymi, które upraszcza proces konfiguracji urządzeń, monitorowania stanu sieci i analizy danych. Aplikacja ma na celu zminimalizowanie czasu potrzebnego na wdrożenie i utrzymanie sieci, jednocześnie zapewniając administratorom pełną kontrolę i wgląd w jej działanie.

**Problem:** Konfiguracja urządzeń radiowych (punktów dostępowych) jest często skomplikowana, czasochłonna i podatna na błędy, zwłaszcza w dużych sieciach. Administratorzy potrzebują narzędzia, które prowadzi ich przez ten proces krok po kroku, oferując jednocześnie zaawansowane opcje dla bardziej doświadczonych użytkowników.

**Rozwiązanie:** Aplikacja webowa "Radio Configuration Wizard" z centralnym panelem zarządzania, która oferuje:
*   **Kreator Konfiguracji Urządzeń:** Prowadzi użytkownika przez proces konfiguracji, od wyboru urządzeń po ustawienia radiowe i zabezpieczenia.
*   **Panel Główny (Dashboard):** Zapewnia szybki przegląd stanu sieci.
*   **Zaawansowane Funkcje:** Analityka, mapa sieci, zarządzanie użytkownikami i alerty.

## 2. Docelowi Użytkownicy

*   **Administratorzy Sieci:** Odpowiedzialni za konfigurację, zarządzanie i utrzymanie infrastruktury sieciowej.
*   **Technicy IT:** Realizujący wdrożenia i rozwiązywanie problemów w terenie.
*   **Menedżerowie IT:** Potrzebujący wglądu w wydajność i stan sieci do celów planowania i raportowania.

## 3. Kluczowe Funkcje (Epiki)

### 3.1. Kreator Konfiguracji Urządzeń (Device Wizard) - MVP

Jest to kluczowa funkcja aplikacji. Kreator prowadzi użytkownika przez 4 główne kroki.

**Krok 1: Wybór Urządzeń (Device Selection)**
*   **Wymagania:**
    *   Wyświetlanie listy dostępnych urządzeń z informacjami: Nazwa, Model, Adres MAC, Adres IP, Status.
    *   Możliwość wyboru jednego lub wielu urządzeń do konfiguracji.
    *   Wyszukiwanie i filtrowanie urządzeń na liście.

**Krok 2: Podstawowa Konfiguracja (Basic Setup)**
*   **Wymagania:**
    *   Możliwość nadania/zmiany nazwy urządzenia.
    *   Ustawienie lokalizacji (np. "Piętro 1, Biuro 101").
    *   Możliwość przypisania urządzenia do grupy.

**Krok 3: Konfiguracja Radiowa (Radio Provisioning)**
*   **Wymagania:**
    *   Osobne sekcje konfiguracyjne dla pasm 2.4GHz, 5GHz i 6GHz.
    *   Dla każdego pasma możliwość włączenia/wyłączenia.
    *   Ustawienia dla każdego pasma: Kanał (Channel), Szerokość kanału (Channel Width), Moc nadawania (Transmit Power).
    *   Konfiguracja SSID:
        *   Włączanie/wyłączanie SSID.
        *   Ustawienie nazwy sieci (SSID Name).
        *   Wybór trybu zabezpieczeń (WPA3, WPA2, Open).
        *   Wprowadzenie hasła dla sieci zabezpieczonych.
    *   Możliwość dodania wielu SSID.

**Krok 4: Potwierdzenie (Confirmation)**
*   **Wymagania:**
    *   Wyświetlenie podsumowania wszystkich planowanych zmian.
    *   Podział na sekcje (Urządzenia, Ustawienia podstawowe, Ustawienia radiowe).
    *   Możliwość powrotu do poprzednich kroków w celu dokonania korekty.
    *   Przycisk "Zastosuj" (Apply) do wdrożenia konfiguracji na wybranych urządzeniach.

**Funkcje dodatkowe kreatora:**
*   **Kopiuj z szablonu (Copy from Template):** Możliwość załadowania predefiniowanej konfiguracji.
*   **Eksportuj ustawienia (Export Settings):** Zapisanie bieżącej konfiguracji do pliku.
*   **Zapisz jako wersję roboczą (Save as Draft):** Możliwość zapisania postępów i powrotu do konfiguracji później.

### 3.2. Panel Główny (Dashboard)
*   **Wymagania:**
    *   Widżety pokazujące kluczowe wskaźniki (KPIs): liczba podłączonych urządzeń, status urządzeń (online/offline), liczba klientów.
    *   Wykresy pokazujące wykorzystanie pasma w czasie rzeczywistym.
    *   Lista ostatnich alertów.

### 3.3. Analityka (Analytics)
*   **Wymagania:**
    *   Historyczne dane dotyczące wydajności sieci.
    *   Raporty dotyczące liczby klientów, zużycia danych, siły sygnału.
    *   Możliwość filtrowania danych według daty, urządzenia, SSID.

### 3.4. Mapa Sieci (Network Map)
*   **Wymagania:**
    *   Wizualna reprezentacja topologii sieci.
    *   Możliwość umieszczania urządzeń na planie budynku/mapie.
    *   Wyświetlanie statusu urządzeń i połączeń między nimi.

### 3.5. Zarządzanie Systemem i Użytkownikami
*   **Wymagania:**
    *   **Ustawienia Systemowe:** Konfiguracja globalnych parametrów aplikacji (np. serwer NTP, ustawienia alertów).
    *   **Zarządzanie Użytkownikami:** Tworzenie, edycja, usuwanie kont użytkowników. Przypisywanie ról i uprawnień.

## 4. Wymagania Niefunkcjonalne

*   **Wydajność:** Aplikacja musi działać płynnie, a operacje takie jak ładowanie listy urządzeń czy stosowanie konfiguracji nie powinny trwać dłużej niż kilka sekund.
*   **Bezpieczeństwo:** Zabezpieczenie przed atakami (XSS, CSRF), szyfrowanie haseł, bezpieczna komunikacja z urządzeniami.
*   **Skalowalność:** Architektura powinna pozwalać na zarządzanie od kilku do kilkuset urządzeń.
*   **Użyteczność:** Interfejs musi być intuicyjny i responsywny (RWD), dostosowany do urządzeń mobilnych i desktopowych.

## 5. Zakres Poza Wersją 1.0 (Future Scope)

*   Integracja z systemami zewnętrznymi (np. Active Directory, Syslog).
*   Automatyczna optymalizacja kanałów radiowych oparta na AI.
*   Zaawansowane raportowanie i automatyczne wysyłanie raportów na e-mail.
*   Aplikacja mobilna dla techników terenowych.
