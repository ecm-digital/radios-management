# Requirements Document

## Introduction

System Zarządzania Siecią Radiance (Radiance Network Management System) to kompleksowe rozwiązanie do monitorowania, konfiguracji i zarządzania urządzeniami radiowymi w sieci. System umożliwia administratorom sieci efektywne zarządzanie infrastrukturą bezprzewodową, monitorowanie stanu urządzeń, konfigurację parametrów radiowych oraz analizę wydajności sieci. Głównym celem systemu jest zapewnienie stabilnej i wydajnej pracy sieci bezprzewodowej poprzez intuicyjny interfejs użytkownika i zaawansowane funkcje zarządzania.

## Requirements

### Requirement 1: Monitorowanie urządzeń sieciowych

**User Story:** Jako administrator sieci, chcę mieć możliwość monitorowania stanu wszystkich urządzeń sieciowych w czasie rzeczywistym, aby szybko reagować na problemy i zapewnić ciągłość działania sieci.

#### Acceptance Criteria

1. WHEN użytkownik przegląda pulpit (dashboard) THEN system SHALL wyświetlać liczbę aktywnych urządzeń, urządzeń offline oraz urządzeń w stanie ostrzeżenia.
2. WHEN użytkownik przegląda pulpit THEN system SHALL wyświetlać procentowy czas działania sieci (uptime).
3. WHEN urządzenie zmienia swój stan THEN system SHALL aktualizować dane na pulpicie w czasie rzeczywistym.
4. WHEN użytkownik przegląda feed aktywności THEN system SHALL wyświetlać chronologiczną listę zdarzeń sieciowych z informacją o typie zdarzenia, urządzeniu, czasie i statusie.
5. WHEN zdarzenie sieciowe zostanie wykryte THEN system SHALL dodać je do feedu aktywności.

### Requirement 2: Konfiguracja urządzeń radiowych

**User Story:** Jako technik sieci, chcę mieć możliwość konfiguracji parametrów radiowych dla wielu urządzeń jednocześnie, aby efektywnie zarządzać siecią bezprzewodową.

#### Acceptance Criteria

1. WHEN użytkownik wybiera urządzenia do konfiguracji THEN system SHALL umożliwić wybór wielu urządzeń jednocześnie.
2. WHEN użytkownik konfiguruje parametry radiowe THEN system SHALL umożliwić wybór pasma częstotliwości, kanału, szerokości kanału, mocy nadawania, trybu pracy i protokołu radiowego.
3. WHEN użytkownik konfiguruje SSID THEN system SHALL umożliwić włączenie/wyłączenie SSID, ustawienie nazwy SSID, wybór opcji rozgłaszania SSID, wybór zabezpieczeń i ustawienie hasła.
4. WHEN użytkownik konfiguruje urządzenia THEN system SHALL umożliwić dodanie wielu SSID do jednego urządzenia.
5. WHEN użytkownik zapisuje konfigurację THEN system SHALL zastosować ustawienia do wszystkich wybranych urządzeń.
6. WHEN użytkownik chce zapisać konfigurację jako szablon THEN system SHALL umożliwić zapisanie i późniejsze wykorzystanie szablonu.

### Requirement 3: Wizualizacja sieci

**User Story:** Jako administrator sieci, chcę mieć dostęp do mapy sieci, aby wizualnie monitorować rozmieszczenie i stan urządzeń w infrastrukturze.

#### Acceptance Criteria

1. WHEN użytkownik przegląda mapę sieci THEN system SHALL wyświetlać graficzną reprezentację wszystkich urządzeń sieciowych.
2. WHEN użytkownik przegląda mapę sieci THEN system SHALL oznaczać urządzenia kolorami odpowiadającymi ich statusowi (aktywne, offline, ostrzeżenie).
3. WHEN użytkownik klika na urządzenie na mapie THEN system SHALL wyświetlać szczegółowe informacje o urządzeniu.
4. WHEN użytkownik przegląda mapę sieci THEN system SHALL wyświetlać połączenia między urządzeniami.

### Requirement 4: Analityka i raportowanie

**User Story:** Jako menedżer IT, chcę mieć dostęp do analityki i raportów dotyczących wydajności sieci, aby optymalizować jej działanie i planować rozwój infrastruktury.

#### Acceptance Criteria

1. WHEN użytkownik przegląda sekcję analityki THEN system SHALL wyświetlać wykresy i statystyki dotyczące wydajności sieci.
2. WHEN użytkownik wybiera zakres czasowy THEN system SHALL filtrować dane analityczne zgodnie z wybranym zakresem.
3. WHEN użytkownik generuje raport THEN system SHALL umożliwić eksport danych w formatach PDF, CSV lub Excel.
4. WHEN użytkownik przegląda analitykę THEN system SHALL wyświetlać trendy w wykorzystaniu sieci i wydajności urządzeń.

### Requirement 5: Zarządzanie alertami

**User Story:** Jako administrator sieci, chcę otrzymywać powiadomienia o problemach w sieci, aby szybko reagować na incydenty i minimalizować przestoje.

#### Acceptance Criteria

1. WHEN wystąpi problem z urządzeniem THEN system SHALL generować alert z odpowiednim poziomem priorytetu.
2. WHEN użytkownik przegląda sekcję alertów THEN system SHALL wyświetlać listę aktywnych alertów posortowanych według priorytetu.
3. WHEN użytkownik potwierdza alert THEN system SHALL oznaczać alert jako potwierdzony i rejestrować użytkownika, który go potwierdził.
4. WHEN użytkownik rozwiązuje problem THEN system SHALL umożliwić oznaczenie alertu jako rozwiązanego.
5. WHEN użytkownik konfiguruje powiadomienia THEN system SHALL umożliwić wybór kanałów powiadomień (email, SMS, powiadomienia w aplikacji) dla różnych typów alertów.

### Requirement 6: Zarządzanie użytkownikami i uprawnieniami

**User Story:** Jako administrator systemu, chcę zarządzać kontami użytkowników i ich uprawnieniami, aby zapewnić bezpieczny dostęp do systemu zgodnie z rolami w organizacji.

#### Acceptance Criteria

1. WHEN administrator tworzy nowe konto użytkownika THEN system SHALL umożliwić przypisanie roli (administrator, technik, obserwator).
2. WHEN użytkownik loguje się do systemu THEN system SHALL weryfikować jego uprawnienia i udostępniać funkcje zgodnie z przypisaną rolą.
3. WHEN administrator edytuje uprawnienia użytkownika THEN system SHALL natychmiast aktualizować dostępne funkcje dla tego użytkownika.
4. WHEN administrator resetuje hasło użytkownika THEN system SHALL generować tymczasowe hasło i wymuszać jego zmianę przy następnym logowaniu.

### Requirement 7: Ustawienia systemowe

**User Story:** Jako administrator systemu, chcę mieć możliwość konfiguracji globalnych ustawień systemu, aby dostosować jego działanie do potrzeb organizacji.

#### Acceptance Criteria

1. WHEN administrator przegląda ustawienia systemowe THEN system SHALL wyświetlać opcje konfiguracji dla całego systemu.
2. WHEN administrator zmienia ustawienia systemowe THEN system SHALL zapisywać zmiany i stosować je globalnie.
3. WHEN administrator konfiguruje kopie zapasowe THEN system SHALL umożliwić ustawienie harmonogramu automatycznych kopii zapasowych.
4. WHEN administrator przywraca kopię zapasową THEN system SHALL przywracać stan systemu z wybranej kopii zapasowej.