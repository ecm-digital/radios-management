# Persony Użytkowników - Radiance Network Management

Ten dokument przedstawia persony użytkowników dla systemu Radiance. Persony to fikcyjne postacie reprezentujące kluczowe typy użytkowników, które pomagają zrozumieć ich cele, motywacje i frustracje.

---

## Persona 1: Adam "Admin" Nowak



-   **Rola:** Administrator Sieci (Network Administrator)
-   **Wiek:** 38 lat
-   **Doświadczenie:** 12 lat w zarządzaniu sieciami korporacyjnymi i ISP.
-   **Motto:** "Sieć musi działać stabilnie i wydajnie. Konfiguracja to fundament."

### O Adamie:
Adam jest doświadczonym inżynierem sieciowym. Odpowiada za architekturę, wdrażanie nowych urządzeń i zaawansowaną konfigurację sieci. Jest technicznie biegły, ceni sobie kontrolę i precyzję. Chce narzędzi, które automatyzują powtarzalne zadania, ale jednocześnie dają mu wgląd w szczegóły techniczne.

### Cele:
-   Szybkie i masowe wdrażanie nowych urządzeń sieciowych zgodnie ze standardami firmy.
-   Utrzymanie spójnej i udokumentowanej konfiguracji w całej sieci.
-   Optymalizacja wydajności sieci bezprzewodowej poprzez precyzyjne dostrajanie parametrów radiowych.
-   Minimalizacja czasu potrzebnego na ręczną konfigurację.

### Frustracje:
-   Ręczne logowanie się do każdego urządzenia z osobna w celu wprowadzenia zmian.
-   Brak centralnego narzędzia do zarządzania konfiguracją, co prowadzi do błędów i niespójności.
-   Narzędzia, które są zbyt "magiczne" i nie dają wglądu w to, co dzieje się "pod maską".
-   Spędzanie godzin na powtarzalnych zadaniach konfiguracyjnych zamiast na projektowaniu i optymalizacji sieci.

### Jak używa Radiance NMS:
-   Głównie korzysta z **Device Wizard**, aby masowo konfigurować nowe punkty dostępowe i routery.
-   Szczegółowo ustawia parametry w kroku **Radio Provisioning**, aby zapewnić optymalne pokrycie i wydajność.
-   Regularnie przegląda **Network Map**, aby weryfikować topologię sieci.

---

## Persona 2: Ewa "Operator" Kowalska



-   **Rola:** Operator Sieci (NOC Operator)
-   **Wiek:** 27 lat
-   **Doświadczenie:** 3 lata w centrum operacji sieciowych (NOC).
-   **Motto:** "Muszę szybko wiedzieć, co się dzieje i gdzie jest problem."

### O Ewie:
Ewa pracuje na pierwszej linii wsparcia. Jej głównym zadaniem jest monitorowanie stanu sieci, reagowanie na alerty i rozwiązywanie bieżących problemów zgłaszanych przez użytkowników. Potrzebuje przejrzystego interfejsu, który szybko dostarcza kluczowych informacji i pozwala na natychmiastową reakcję.

### Cele:
-   Szybkie identyfikowanie problemów w sieci, zanim wpłyną one na dużą liczbę użytkowników.
-   Posiadanie centralnego pulpitu do monitorowania stanu całej sieci.
-   Efektywne zarządzanie alertami i ich priorytetyzacja.
-   Dostęp do danych historycznych, aby analizować trendy i powtarzające się problemy.

### Frustracje:
-   Przełączanie się między wieloma narzędziami do monitorowania różnych aspektów sieci.
-   Zbyt duża ilość nieistotnych alertów ("szum informacyjny"), które utrudniają znalezienie prawdziwych problemów.
-   Brak czytelnych wizualizacji, które pomogłyby szybko zlokalizować źródło awarii.

### Jak używa Radiance NMS:
-   Jej głównym ekranem jest **Dashboard** i strona **Alerts**.
-   Używa strony **Analytics**, aby sprawdzić historyczną wydajność danego segmentu sieci, gdy użytkownicy zgłaszają problemy.
-   Sprawdza **Network Map**, aby wizualnie zlokalizować problematyczne urządzenie.

---

## Persona 3: Piotr "SysAdmin" Zieliński



-   **Rola:** Administrator Systemu (System Administrator)
-   **Wiek:** 45 lat
-   **Doświadczenie:** 20 lat w administracji systemami IT.
-   **Motto:** "System musi być bezpieczny, stabilny i łatwy w zarządzaniu."

### O Piotrze:
Piotr zarządza całą infrastrukturą IT, w tym systemem Radiance NMS. Nie zajmuje się codzienną konfiguracją sieci, ale dba o to, aby samo narzędzie działało poprawnie, było bezpieczne i aby odpowiednie osoby miały do niego dostęp.

### Cele:
-   Zarządzanie cyklem życia użytkowników systemu (dodawanie, usuwanie, zmiana uprawnień).
-   Zapewnienie zgodności z politykami bezpieczeństwa firmy.
-   Konfiguracja globalnych ustawień systemu, takich jak integracja z serwerem pocztowym do wysyłania powiadomień.
-   Regularne tworzenie kopii zapasowych konfiguracji systemu.

### Frustracje:
-   Narzędzia, które nie mają granularnego systemu uprawnień.
-   Skomplikowane procesy aktualizacji i utrzymania.
-   Brak możliwości integracji z innymi systemami IT w firmie.

### Jak używa Radiance NMS:
-   Pracuje głównie w sekcjach **User Management** i **System Settings**.
-   Dodaje nowych administratorów i operatorów, przypisując im odpowiednie role.
-   Konfiguruje serwer **SMTP**, aby Ewa i Adam otrzymywali powiadomienia e-mail o krytycznych alertach.
-   Ustawia polityki **retencji danych**, aby zarządzać rozmiarem bazy danych.
