# User Flows - Radiance Network Management

Ten dokument opisuje przepływy użytkowników (User Flows) dla kluczowych zadań w systemie Radiance. Każdy przepływ przedstawia sekwencję kroków, które użytkownik wykonuje, aby osiągnąć określony cel.

---

## Przepływ 1: Konfiguracja nowego urządzenia sieciowego

**Aktor:** Administrator Sieci

**Cel:** Szybkie i poprawne dodanie oraz skonfigurowanie nowego urządzenia w sieci.

**Kroki:**

1.  **Logowanie do systemu:** Użytkownik loguje się do panelu Radiance.
2.  **Nawigacja do kreatora:** Z paska bocznego (`AppSidebar`) użytkownik klika w link "Device Wizard".
3.  **Krok 1: Wybór Urządzeń:**
    *   System wyświetla listę dostępnych, nieskonfigurowanych urządzeń.
    *   Użytkownik zaznacza jedno lub więcej urządzeń do konfiguracji.
    *   Użytkownik klika przycisk "Next".
4.  **Krok 2: Ustawienia Podstawowe (Założenie):**
    *   Użytkownik nadaje urządzeniom nazwy (np. z użyciem wzorca) i przypisuje je do lokalizacji.
    *   Użytkownik klika "Next".
5.  **Krok 3: Konfiguracja Radia:**
    *   Użytkownik wybiera pasmo częstotliwości (np. 5 GHz).
    *   Użytkownik konfiguruje parametry kanału, szerokości kanału i mocy.
    *   Użytkownik dodaje jedno lub więcej SSID, definiując ich nazwy, hasła i inne ustawienia.
    *   Użytkownik klika "Next".
6.  **Krok 4: Podsumowanie i Zastosowanie:**
    *   System wyświetla podsumowanie wszystkich wprowadzonych ustawień.
    *   Użytkownik weryfikuje poprawność danych.
    *   Użytkownik klika przycisk "Apply Configuration".
7.  **Zakończenie:** System rozpoczyna proces provisioningu urządzeń i wyświetla status operacji. Użytkownik jest przekierowywany do widoku listy urządzeń lub pulpitu głównego.

---

## Przepływ 2: Sprawdzanie i reagowanie na alerty krytyczne

**Aktor:** Operator Sieci

**Cel:** Szybkie zidentyfikowanie i potwierdzenie przyjęcia krytycznego alertu.

**Kroki:**

1.  **Otrzymanie powiadomienia:** Użytkownik zauważa wskaźnik z liczbą alertów na ikonie dzwonka w pasku bocznym.
2.  **Nawigacja do alertów:** Użytkownik klika w link "Alerts" w pasku bocznym.
3.  **Identyfikacja alertu:**
    *   System wyświetla listę alertów, posortowaną od najnowszych.
    *   Użytkownik identyfikuje alert oznaczony jako "Critical" (czerwona etykieta).
4.  **Analiza problemu:** Użytkownik czyta treść alertu, aby zrozumieć problem (np. "Core router offline").
5.  **Podjęcie działań zewnętrznych:** Użytkownik rozpoczyna procedurę naprawczą (np. kontaktuje się z technikiem w terenie).
6.  **Potwierdzenie alertu:**
    *   Użytkownik klika w menu akcji przy alercie i wybiera "Acknowledge".
    *   Status alertu zmienia się na "Acknowledged".

---

## Przepływ 3: Dodawanie nowego użytkownika systemu

**Aktor:** Administrator Systemu

**Cel:** Nadanie dostępu do systemu nowemu członkowi zespołu.

**Kroki:**

1.  **Nawigacja do zarządzania użytkownikami:** Użytkownik klika w link "User Management" w pasku bocznym.
2.  **Inicjowanie dodawania:** Użytkownik klika przycisk "Invite User".
3.  **Wypełnienie formularza:**
    *   System wyświetla formularz (np. w modalu).
    *   Użytkownik wprowadza adres e-mail nowego użytkownika.
    *   Użytkownik wybiera rolę z listy rozwijanej (np. "Operator").
4.  **Wysłanie zaproszenia:** Użytkownik klika "Send Invitation".
5.  **Weryfikacja:**
    *   System wysyła e-mail z zaproszeniem na podany adres.
    *   Nowy użytkownik pojawia się na liście ze statusem "Pending".

---

## Przepływ 4: Zmiana globalnej strefy czasowej systemu

**Aktor:** Administrator Systemu

**Cel:** Dostosowanie wyświetlania czasu we wszystkich logach i raportach do lokalnej strefy czasowej.

**Kroki:**

1.  **Nawigacja do ustawień:** Użytkownik klika w link "System Settings" w pasku bocznym.
2.  **Lokalizacja ustawienia:** Użytkownik odnajduje sekcję "General Settings" i pole "Timezone".
3.  **Zmiana wartości:** Użytkownik klika na listę rozwijaną i wybiera nową strefę czasową (np. "UTC+1 (Central European Time)").
4.  **Zapisanie zmian:** Użytkownik przewija na dół strony i klika przycisk "Save Changes".
5.  **Potwierdzenie:** System wyświetla komunikat o pomyślnym zapisaniu ustawień. Wszystkie znaczniki czasu w interfejsie są od teraz wyświetlane w nowej strefie czasowej.
