<p align="center"><img src="assets/daemon-logo.png" width="144" alt="Daemon Viewer"></p>

# Daemon Viewer

**by Daemon · Windows · Anthrazit-Gold-Werkstatt**

Viewer für Modelle, Texturen, Effekte und Metin2-Karten mit Grau-Gold-Werkstatt.

[**Aktuellen Windows-Installer herunterladen**](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/latest)

**Ab 1.7.12 startet eine frische Installation ohne eigene Lizenz als Free-Version.**






## Neu in 1.7.21: Prisma-Objekte und direkte Mausnavigation

Prisma-Kartenobjekte und ihre verfügbaren Materialtexturen sind standardmäßig unter **Karten → Objekte** enthalten, in zwölf Untergruppen für Vegetation, Felsen, Bauwerke, Ruinen, Lampen, Schiffe und Dekoration. Der gemeinsame Katalog zeigt 5.413 Modelle. Prisma-Maps werden nicht mitinstalliert. Bereits vorhandene identische Modelle und Texturen werden wiederverwendet.

**Rechte Maustaste halten und bewegen** verschiebt die Kamera im Objektmodus direkt, ohne Alt oder Umschalt. Die Bereichsauswahl nutzt den eigenen Knopf **Bereich markieren** und einen Rahmen mit der linken Taste. Fehlende Miniaturen werden aus echten GR2- und SpeedTree-Modellen erzeugt und gespeichert.

Ein vorzeitiger Start während einer laufenden Installation wartet nun außerhalb des Viewers, bis alle Dateien fertig eingespielt sind. Die Programmdateien werden vor dem Laden geprüft. Getestet sind 136 automatisierte Prüfungen, native Mausbedienung und Miniaturen, Texturverweise sowie das Upgrade von 1.7.20. Einzelne bereits im Prisma-Quellpaket fehlerhafte Modelle oder fehlende Texturen sind in den Versionshinweisen aufgeführt.

[Installer und Versionshinweise 1.7.21](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.21)

## Neu in 1.7.20: SpeedTree, Ashura-Kartenobjekte und schärfere Böden

Originale SpeedTree-Bäume mit Stamm, Ästen und kameragerechten Blattflächen sind im Kartenbereich verfügbar. Zentrale Property-Indizes und Karteneffekte werden geladen; die Testkarte metin2_map_b1 zeigt alle 1.911 Objektplatzierungen.

Ashura-Objekte und ihre Materialien sind unter **Karten → Objekte** einsortiert. 661 Ashura-Böden sowie 25 Regen- und Pfützentexturen stehen unter **Terrain** bereit. Terrainmaterialien nutzen je nach Palette bis zu 2.048 Pixel, anisotrope Filterung und ein dezentes Oberflächenrelief. Die Zoomkorrektur hält die Geschwindigkeit auch nach wiederholtem Heranzoomen aufrecht.

Geprüft mit 132 automatisierten Tests, nativer Kartenprüfung, Baumplatzierung/Skalierung/Export sowie dem Upgrade von 1.7.19. Einzelne im Quellarchiv fehlende Materialien und eine nicht lesbare GR2-Quelldatei sind in den Versionshinweisen ausgewiesen.

[Installer und Versionshinweise 1.7.20](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.20)

## Neu in 1.7.19: Kostüm-Werkstatt und abgerundete Bedienelemente

**Assets → Kostüm-Werkstatt** zeigt die geladenen Assets mit Suche und Kategorien und verwendet echte GR2-Modelle und Materialtexturen. Umfärben, Bereichsmarkierung, Kopierstempel mit Alt-Klick-Quelle, Originalpinsel, Undo/Redo, Originalvergleich, UV-Netz und Alpha-Vorschau sind angeschlossen. Retusche erfolgt manuell; eine automatische KI-Rekonstruktion wird nicht behauptet.

In der Vollversion werden Varianten als neue Ordnerkopie mit unverändertem Modell und den Texturen gespeichert. DDS wird als unkomprimiertes RGBA8 exportiert; die übrigen unterstützten Bildtypen behalten ihren Dateityp. Originale bleiben erhalten. Gespeicherte Varianten lassen sich wieder importieren. Free behält die vorhandenen Asset- und Exportgrenzen.

Buttons und Auswahlfelder haben jetzt einheitliche 8-Pixel-Ecken, einschließlich kleiner Symbolbuttons. Die gebaute Fassung wurde über 20 Bereiche geprüft: Assets, Karten und deren Bibliotheken, Extractor, Shop, Programmmenüs, Updates, Tickets, Adminbereich und Werkstatt. Neue Texturadressen verhindern veraltete Bilder beim Wechsel zwischen gleich benannten Dateien aus unterschiedlichen Quellen.

Geprüft mit 125 automatisierten Tests sowie nativen Prüfungen für Bearbeitung, Export und Wiederimport, Free-Grenzen, privaten Adminzugang und das Upgrade von 1.7.18. Der Ticketsupport arbeitet weiterhin lokal.

[Installer und Versionshinweise 1.7.19](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.19)

## Neu in 1.7.18: Nachtgold für Adminbereich und Ticket-Center

Die gewählten Ansichten sind jetzt direkt eingebaut: D-Logo, lokale Cinzel-Schrift, Anthrazittextur, goldene Navigation und echte Ticketzahlen mit Profil und Edition. Das Ticket-Center verbindet Posteingang und Statusfilter mit dem Formular für neue Anliegen sowie dem vorhandenen Ticketgespräch. Dezenter Goldschimmer, ein Lichtlauf und kurzes Partikelfeedback ergänzen die Oberfläche; reduzierte Animationen werden berücksichtigt.

Der Adminbereich bleibt nur auf privat eingerichteten Rechnern sichtbar und verlangt weiterhin die echte Anmeldung. Der öffentliche Installer enthält keine Admin-Zugangsdaten oder Beispieltickets. Vorhandene Profile und Tickets bleiben gespeichert. **Der Ticketsupport arbeitet weiterhin lokal; eine zentrale Online-Anbindung ist noch nicht eingerichtet.**

[Installer und Versionshinweise 1.7.18](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.18)

## Neu in 1.7.17: lokaler Adminbereich

Der private Adminbereich enthält jetzt echte Anmeldung mit Passwortprüfung, eine Übersicht sowie Tickets, Benutzer, Lizenzen und Einstellungen. Ein Klick auf ein Ticket öffnet den Gesprächsverlauf; Antworten, Status und interne Notizen bleiben gespeichert. Interne Notizen werden nicht über die Benutzeransicht ausgeliefert. Der lokale Ticket-Wartungsmodus blockiert Benutzereingaben. Abmelden, Sitzungsablauf und Passwortwechsel sperren die geschützten Funktionen.

**Der Admin-Button erscheint nur nach privater Einrichtung auf dem Rechner des Erstellers. Der öffentliche Installer enthält keine Admin-Zugangsdaten und keinen freigeschalteten Account.** Lizenzpaket oder Master-Key vergeben keine Adminrechte. Die bestehende Oberfläche bleibt erhalten.

Die Verwaltung nutzt tatsächliche lokale Profil- und Lizenzdaten. Für Nutzer und Tickets anderer Rechner ist weiterhin ein zentraler Online-Dienst erforderlich; dieses Update eröffnet keinen öffentlichen Server. Die Speicherung und Anmeldung laufen direkt im Viewer, ohne zusätzliches Python-, Browser- oder Konsolenfenster.

Geprüft mit 118 automatisierten Tests und nativen Prüfungen für privaten Adminzugang sowie eine normale Installation ohne Admin.

[Installer und Versionshinweise 1.7.17](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.17)

## Neu in 1.7.16

- **Fluid Lab:** zusätzliche Wasser-/Lava-Materialregler unter Karten → Werkstatt → Terrain, direkt auf der echten Kartengeometrie. Materialwerte unterstützen Undo/Redo und bleiben über Speichern/Wiederöffnen erhalten. Die Spielclient-Darstellung benötigt eine eigene Anbindung.
- **Tickets:** eigener Knopf neben Updates, Liste und Gesprächsverlauf bei Klick. Fester lokaler Benutzername und gespeicherte Entwürfe. **Noch kein Supportserver: Nachrichten werden nicht versendet; Adminzugang bleibt gesperrt.** Lizenzpaket, Master-Key und HWID vergeben keine Adminrechte. Zugangsdaten des Prototyps werden nicht ausgeliefert.
- **Extractor:** Ordner oder ZIP analysieren, Kategorien auswählen und mit Originalpfaden/Prüfmanifest als Ordner oder ZIP exportieren. RAR benötigt WinRAR. Client-Skripte werden nie ausgeführt. Ungeprüfte Binärreferenzen und fehlende Dateien werden ausgewiesen; der strenge Modus blockiert solche Exporte.
- **Updates minimieren:** Knopf im Update-Dialog; laufender Download bleibt aktiv. Das ursprüngliche Design bleibt erhalten.

Geprüft mit 114 automatisierten Tests, nativer Programmprüfung und Hintergrundupgrade von 1.7.15 auf 1.7.16. Frische Installation bleibt Free.

[Installer und Versionshinweise 1.7.16](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.16)

## Installation und Updates

1. Lade den Installer aus dem neuesten Release herunter und installiere den Viewer.
2. Wähle beim ersten Start deinen eigenen entpackten Client- oder Map-Ordner.
3. Ab Version 1.6 sucht das Programm beim Start und alle sechs Stunden automatisch nach stabilen Updates und lädt sie herunter.
4. Über **Updates → Aktualisieren & neu starten** startest du die Aktualisierung. Speichere vorher deine Kartenänderungen.

Unter **Updates** kannst du auch manuell prüfen und die automatische Suche ausschalten. Updates werden vor der Installation mit der von GitHub gelieferten SHA-256-Prüfsumme verglichen. Einstellungen und eigene Dateien bleiben erhalten. Ab Version 1.7.6 läuft der geprüfte Installer ohne eigenes Setupfenster; zum Austausch der EXE schließt sich der Viewer kurz und startet automatisch neu. Beim Wechsel aus einer älteren Fassung auf 1.7.6 kann deren bisheriges Setupfenster noch einmal erscheinen.

**Version 1.5 und ältere Fassungen benötigen einmalig den neuen Installer.** Nutzer brauchen für Downloads und Updates kein GitHub-Konto.


## Startanimation

Ab Version 1.6.1 erscheint beim Start das goldene D auf transparentem Hintergrund, begleitet von Goldnebel, feinen Funken und einem schimmernden Schriftzug. Die Animation läuft während des Ladens in 8-Sekunden-Schleifen. Enter oder Escape überspringt sie, sobald der Viewer bereit ist. Grafiken und die Schriftart Cinzel werden lokal mitgeliefert. Seit Version 1.6.2 ist die gesamte Startanimation um 50 Prozent vergrößert; auf kleinen Bildschirmen passt sie sich an den verfügbaren Arbeitsbereich an.

## Voraussetzungen

Windows 10 ab Build 17763 oder Windows 11, 64 Bit. Eigene Clientdateien und Maps werden lokal ausgewählt. Die unten beschriebenen Kartenmaterialien werden mitgeliefert. Für die automatische Update-Suche und Downloads ist eine Internetverbindung erforderlich.

## Darstellung

GR2-Modelle werden in statischer Restpose angezeigt. Die Effektvorschau bildet nicht die vollständige Spiel-Engine nach. Seit Version 1.7.0 werden Kartenobjekte mit aufgelösten GR2-Properties als Modelle dargestellt. Nicht aufgelöste Properties und nicht unterstützte Modelltypen bleiben Positionsmarkierungen.

Dieses öffentliche Repository dient ausschließlich der Verteilung von Installern und Versionshinweisen. Das Projekt-Repository bleibt privat.

## Goldgestaltung

Version 1.6.3 verstärkt die Goldakzente an Rahmen, Schaltflächen, Symbolen und Auswahlzuständen. Eine dunkle Titelleiste mit goldenen Windows-Bedienelementen ergänzt das Schwarz-Gold-Design. Die große transparente Startanimation bleibt erhalten.

## Manuelle Wiedergabe

Ab Version 1.6.4 startet die Asset-Vorschau pausiert bei 0,00 Sekunden, auch nach einem Dateiwechsel. Wiedergabe beginnt erst durch Klick auf „Abspielen“ oder Betätigung der Leertaste. Die goldene Oberfläche und die transparente Startanimation bleiben erhalten.

## Karten-Objektbibliothek

Ab Version 1.6.8 gibt es unter **Karten → Objektbibliothek** einen eigenen Katalog für Mapping-Modelle. Er bietet sieben Hauptkategorien, Untergruppen, Suche, natürliche Sortierung, Vorschaubilder und eine interaktive 3D-Vorschau. ZIP-Pakete werden dort lokal über **Modellpaket hinzufügen** importiert und beim nächsten Start wiederhergestellt. Modellpfade lassen sich kopieren und die Paketdateien im Explorer öffnen. Die importierten Kartenmodelle werden nicht der Asset-Galerie hinzugefügt.

Das Alturi-HD-Paket wurde mit 226 Modellen in 16 Untergruppen geprüft; alle Modell- und Texturreferenzen sind auflösbar. Der Installer enthält keine Clientdateien. Seit Version 1.7.0 ist die Bibliothek direkt in die Karten-Werkstatt integriert; geeignete GR2-Modelle können auf der Karte platziert und bearbeitet werden.

## Karten-Werkstatt 1.7.0

Die neue Grau-Gold-Oberfläche bietet Terrain und Objekte als Werkstatt-Reiter sowie eine Material-/Objektablage unter der Kartenansicht. GR2-Objekte können platziert, ausgewählt, verschoben, gedreht, dupliziert und gelöscht werden – mit 3D-Transformationswerkzeugen, Zahlenfeldern, Raster, Zufallsdrehung und Undo/Redo. W verschiebt, E dreht, F fokussiert und Entf löscht das ausgewählte Objekt.

Gespeicherte Kartenkopien enthalten neu platzierte Modelle, Texturen, Properties und vorhandene zugehörige MDATR-Dateien. Originaldateien bleiben erhalten. Es wird kein externer World Editor eingebunden.

**Dieses Update ist noch kein vollständiger World-Editor-Ersatz.** SpeedTree, vollständige Umgebungs-, Effekt- und Skripteditoren, Kollisionsbearbeitung sowie Schatten-, Minimap- und server_attr-Erzeugung stehen noch aus. Vorhandene MDATR-Dateien werden kopiert; neue Kollisionen werden nicht berechnet.

[Versionshinweise und Installer für 1.7.0](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.0)

## Korrekturupdate 1.7.1: Platzieren und Böden

Eine Modellkarte auswählen aktiviert direkt den Platzierungsmodus. Anschließend auf die Map klicken oder eine Modellkarte auf das Gelände ziehen. F fokussiert ein platziertes Objekt; Escape beendet die Platzierung. Lade- und Fehlerhinweise stehen über der Objektablage.

Unter **Terrain** sind jetzt neun eigene Standardböden direkt verfügbar: Graswiese, trockenes Gras, Moos, Erde, Waldboden, Sand, Kies, Fels und Pflaster. Neue Karten ohne eigenes TextureSet beginnen mit einer Graswiese. Bestehende Karten behalten ihre Materialien. Verwendete Böden werden in Kartenkopien gespeichert. Eigene Texturordner und ZIP-Texturpakete können zusätzlich importiert werden.

Die Standardböden sind eigens erzeugte Materialien; private Client-, Modellpaket- und Map-Dateien werden weiterhin nicht mitgeliefert.

[Installer und Versionshinweise für 1.7.1](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.1)

## Kartenmaterialien 1.7.2

Unter **Karten → Objekte → Schiffswracks** ist ein rekonstruiertes Schiffswrack mit Modelltextur und vorhandener MDATR-Datei enthalten. Modell wählen und auf das Gelände klicken; gespeicherte Kartenkopien übernehmen die benötigten Ressourcen.

Unter **Terrain** stehen 22 zusätzliche Böden bereit: Gras/Moos, Waldboden, Erde/Schlamm, Sand, Kies, Stein/Pflaster, Schnee/Eis und Lava. Drei weitere statische Wasseroberflächen findest du unter **Terrain → Texturbibliothek öffnen → Wasser**. Die Pakete sind im Installer enthalten und müssen nicht separat importiert werden.

Geprüft wurden Platzierung per Mausklick, DDS-Darstellung aller 25 Materialien, Bodenmalen mit Undo/Redo, Speichern und Wiederladen sowie die Installation über Version 1.7.1.

[Installer und Versionshinweise für 1.7.2](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.2)

## Objekte greifen und Map begehen – 1.7.3

Vorhandene Modelle lassen sich in **Ansicht** direkt anklicken. Nach dem Platzieren wird zur Bearbeitung gewechselt. **W** aktiviert Verschieben, **E** Drehen und **R** die gleichmäßige Größenänderung. Griffe und Prozentfeld erzeugen eine eigene native Modellkopie; unterstützte vorhandene MDATR-Kollisionen und Höhenflächen werden mit skaliert. Die Kopie wird mit der Map gespeichert. Originale bleiben erhalten. Nicht unterstützte Formate werden mit einer Fehlermeldung abgewiesen.

**Doppelklick oder F** fokussiert das Modell. **Begehen** öffnet eine bodennahe Ansicht mit 1,80 m Augenhöhe: WASD gehen, Umschalt schneller, rechte Maustaste zum Umsehen, Escape zurück. Größere Maps beginnen in einer näheren Bearbeitungsansicht. Die Übersicht bleibt über das Rahmensymbol erreichbar. Die Vorschau nutzt die Kartenmaße, simuliert jedoch keine Objektkollisionen und nicht die vollständige Spielbeleuchtung.

Geprüft wurden echtes Anklicken und Ziehen aller drei Grifftypen, native Skalierung, Undo/Redo, Speichern und Wiederladen mit identischen Abmessungen sowie das Update von 1.7.2 auf 1.7.3.

[Installer und Versionshinweise für 1.7.3](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.3)

## Bereichsauswahl für Objekte – 1.7.4

Im Reiter **Objekte** die rechte Maustaste gedrückt halten und einen Rahmen aufziehen. Links erscheint **Objekte im Bereich** mit Namen, Nummern und Positionen der Treffer. Ein Klick auf einen Listeneintrag wählt dieses Objekt mit Verschiebegriffen aus. W verschiebt, E dreht, R ändert die Größe, F fokussiert.

**Alle Objekte** zeigt sämtliche Kartenobjekte in der Liste; **Liste leeren** entfernt die Trefferliste. Escape bricht einen laufenden Rahmen ab. **Alt + Rechtsziehen** verschiebt im Objektmodus die Kamera. Die Bereichsauswahl lässt sich rechts in der Werkstatt ausschalten. Im Terrain- und Begehen-Modus bleibt die bisherige Maussteuerung verfügbar. Die Liste dient zur Auswahl einzelner Objekte, nicht zum gleichzeitigen Verschieben aller Treffer.

Geprüft wurden echte Mausbedienung, beide Ziehrichtungen, Auswahl über die Liste, Löschen/Undo, Kartenwechsel, kleine Fenster und die Installation über Version 1.7.3.

[Installer und Versionshinweise für 1.7.4](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.4)

## Anthrazit und Gold – 1.7.5

Die Oberfläche orientiert sich an der freigegebenen Referenz: dunkle Anthrazitflächen mit dezenter Metalltextur, kräftigere goldene Kanten und Auswahlflächen sowie ein klassischer Daemon-Viewer-Schriftzug mit gerahmtem D. Die Studio-Vorschau verwendet einen neutralen Anthrazitverlauf.

In der Karten-Werkstatt stehen **Terrain und Objekte nebeneinander**. Formen, Wasser und Laufattribute sind Werkzeugmenüs; Texturen, Objekte und Ansicht bleiben direkt erreichbar. Die Pinselwerte befinden sich rechts im Terrainbereich. Die Materialablage bleibt unter der Kartenansicht.

Geprüft wurden die Werkzeugmenüs, Pinselposition, Mindestfenster 1080 × 720, Bereichsauswahl, Verschieben/Drehen/Skalieren per Maus, Begehen und die Installation von 1.7.4 auf 1.7.5. Das Designupdate fügt keine neuen Landschaftsinhalte hinzu.

[Installer und Versionshinweise für 1.7.5](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.5)

## Daemon-Emblem und Hintergrundupdates – 1.7.6

Das ursprüngliche goldene D-Emblem ist wieder in der Kopfzeile. Der Schriftzug verwendet feinere Typografie mit einem hellen Goldverlauf. Updates werden direkt im Viewer bestätigt; eine weitere Windows-Abfrage entfällt. Ungespeicherte Karten blockieren den Neustart weiterhin. Nach dem Neustart erkennt der Viewer den Erfolg anhand seiner tatsächlich gestarteten Version.

Geprüft wurden 74 Tests, die Update-Bedienung einschließlich Schutz ungespeicherter Änderungen und ein Installationswechsel von 1.7.5 auf 1.7.6 mit automatischem Neustart ohne sichtbares Setupfenster. Alle 1.446 installierten Programmdateien wurden mit dem gebauten Paket verglichen. Der unsichtbare Ablauf gilt für Aktualisierungen, die aus 1.7.6 oder neuer gestartet werden.

[Installer und Versionshinweise für 1.7.6](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.6)

## Neues Update-Fenster – 1.7.7

Das Update-Fenster hat einen eigenen Kopfbereich mit dem Schließen-X oben rechts. Ein einzelner durchgehender Goldbalken zeigt den tatsächlichen Download-Prozentwert; eine zweite Schimmerleiste entfällt. Nach vollständigem und geprüftem Download leuchten Leiste und Prozentzahl golden auf, begleitet von einem kurzen Lichtschein über dem Fenster. Suche und Neustart-Vorbereitung verwenden eine laufende Animation ohne erfundene Prozentwerte. Reduzierte Bewegung wird berücksichtigt.

Die Aktualisierung wird weiterhin über **Aktualisieren & neu starten** bestätigt; ungespeicherte Karten blockieren den Neustart. Der Viewer schließt sich für den Dateiaustausch kurz und öffnet sich automatisch wieder. Der Goldabschluss kennzeichnet den geprüften Download, nicht eine bereits abgeschlossene Installation. Das neue Fenster ist nach dem Wechsel auf 1.7.7 verfügbar.

[Installer und Versionshinweise für 1.7.7](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.7)

## Goldanimation in der Kopfzeile – 1.7.8

Das D-Emblem und der Schriftzug **Daemon Viewer** tragen jetzt die freigegebene Goldanimation mit Stärke **1,5**: sanftes Leuchten am Logo und ein zeitversetzter Lichtschimmer über Logo und Schrift. Die Animation wiederholt sich dauerhaft in Sieben-Sekunden-Schleifen in beiden Arbeitsbereichen. Aufbau und lokale Schriftart bleiben erhalten. Bei aktivierter Einstellung für reduzierte Bewegung wird die Kopfzeile statisch dargestellt.

Das Update-Fenster mit einer durchgehenden Goldleiste und Goldabschluss aus 1.7.7 bleibt enthalten. Die Animation ist nach dem Wechsel auf 1.7.8 verfügbar.

[Installer und Versionshinweise für 1.7.8](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.8)

## Nachtgold, Daemon-Menü und Lichtblenden – 1.7.9

Die freigegebene Oberfläche kombiniert **Nachtgold** mit dem animierten **Basalt-D** im Hintergrund der leeren Asset-Vorschau. Das Logo und die Goldanimation oben links bleiben erhalten. Ein Klick auf das D öffnet das goldene Kontrollmenü mit **Hilfe, Beenden, Updates, Versionen und Lizenz**.

Hilfe enthält Einstieg und Tastenkürzel. Updates nutzt den echten Update-Kanal und führt zum bestehenden Update-Fenster. Versionen zeigt den lokalen Verlauf und öffnet die offiziellen Versionshinweise. Die Lizenzansicht enthält die mitgelieferten Texte von Electron, Three.js und Cinzel; eigene Produktbedingungen sind noch nicht festgelegt.

Die Lichtblende begleitet das Öffnen und Schließen des Menüs. Nach der Startanimation öffnet sich auch das Hauptfenster mit Lichtblende; beim manuellen Beenden läuft sie umgekehrt. Das native Fenster-X und Alt+F4 führen direkt zum Schließen, ohne das Daemon-Menü zu öffnen. Ungespeicherte Karten erhalten eine **separate Speicherabfrage**. Abgebrochenes oder fehlgeschlagenes Speichern beendet das Programm nicht. Reduzierte Bewegung wird berücksichtigt.

[Installer und Versionshinweise für 1.7.9](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.9)

## Asset-Import per Drag-and-drop – 1.7.10

Ordner sowie **ZIP-, RAR- und 7z-Archive** können direkt in die linke Asset-Bibliothek gezogen werden. Mehrere Quellen werden ergänzt; vorhandene Assets bleiben erhalten. Archive werden lokal in einen verwalteten Importordner entpackt. Originaldateien bleiben unverändert. Identische Archive und wiederholt hinzugefügte Ordner werden nicht doppelt aufgenommen; ausdrücklich ausgewählte Quellen werden beim nächsten Start wiederhergestellt. Die benötigte 7-Zip-Komponente einschließlich Lizenzhinweisen und Originalquellen wird mitgeliefert.

Das Drop-Ziel wird hervorgehoben, Statusmeldungen begleiten den Import. Unterstützt werden bis zu 20 Quellen und ZIP/RAR/7z bis 8 GB, mit maximal 100.000 Einträgen, 512 MB pro Datei und 16 GB entpacktem Inhalt. Passwortgeschützte oder mehrteilige Archive bitte vorher selbst entpacken. EPK/EIX sind keine unterstützten Asset-Archive.

Die separate Titelleiste oben entfällt. **Minimieren, Maximieren/Wiederherstellen und Schließen** sitzen direkt in der Hauptkopfzeile. Das X verwendet weiterhin die Lichtblende und öffnet kein Menü. Geprüft sind 84 Tests, echte Datei-Drops, Wiederherstellung nach Neustart, Umlaute/Leerzeichen, Kartenbedienung und der Update-Wechsel von 1.7.9 auf 1.7.10.

[Installer und Versionshinweise für 1.7.10](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.10)

## Shop und Studio-Goldeffekt – 1.7.11

Der neue **Shop** ist direkt über die Kopfzeile erreichbar und zeigt Free, Explorer, Creator und Studio mit Monats-/Jahrespreisen. Das goldene D steht im Shop-Kopf und auf den Abo-Karten. Das Studio-D trägt einen pulsierenden Goldschein, einen wandernden Lichtreflex und ein Funkeln in Dauerschleife. Reduzierte Bewegung wird berücksichtigt.

**Käufe, Testaktivierung und Lizenzfreischaltung sind noch nicht verfügbar.** PayPal-Geschäftskonto und Lizenzserver müssen erst eingerichtet werden. Die Anzeige für einen einmaligen 7-Tage-Vollversionstest pro Gerät ist vorbereitet. Die Editionsbeschreibungen zeigen den geplanten Umfang; bestehende Viewer-Funktionen bleiben nutzbar. Es wird kein Abonnement angelegt und keine Zahlung ausgelöst.

Geprüft wurden 87 Tests, Shop-Bedienung, Preise, Fenstersteuerung und das Hintergrundupdate von 1.7.10 auf 1.7.11 mit automatischem Neustart. Alle 1.468 installierten Programmdateien wurden per SHA-256 mit dem Paket verglichen.

[Installer und Versionshinweise für 1.7.11](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.11)

## Free-Start, Lizenzoptionen und Terraintexturen – 1.7.12

**Ohne gültige Vollversion-Aktivierung bleibt Free aktiv.** Frische Installationen enthalten keine voraktivierte Vollversion: maximal 100 Assets und Karten-Vorschau. Erstellen, Bearbeiten, Speichern und PNG-Export benötigen eine Freischaltung; diese Grenzen werden auch im Hauptprozess geprüft.

Unter **Daemon-Menü → Optionen** stehen alle Editionen mit ihrem Status. Die verdeckte Eingabe akzeptiert gültige Lizenzschlüssel, speichert sie Windows-verschlüsselt und zeigt danach nur den Status. Bestehende gültige Aktivierungen bleiben erhalten. Erfolgreiche Aktivierung zeigt einmalig ein goldenes D mit Partikelexplosion; bei falschem Schlüssel oder bloßer Tarifauswahl erscheint kein Erfolgseffekt. Private Schlüssel werden nicht mit dem Installer verteilt.

Unter **Karten → Terrain** sind 13 neue PNGs einsortiert: **Gebirge / Bergwände (6)**, **Felsen / Naturfels (6)** und **Wege / Sandsteinplatten (1)**. Die Originalauflösung beträgt 1254 × 1254 Pixel. Der Standardfilter zeigt alle Formate, sodass PNG und DDS sichtbar sind. Gemalte Materialien werden mit der Kartenkopie gespeichert.

**PayPal-Käufe und der 7-Tage-Test sind weiterhin nicht live.** Weitere Abo-Funktionen sind geplant. Die Kauf-Erfolgsanimation wird erst an eine tatsächlich bestätigte Zahlung und Lizenzfreischaltung angebunden.

Geprüft: 94 Tests, Standardzustand Free einschließlich vorhandener Karte, 100-Asset-Limit, gültige Aktivierung und Neustart, alle neuen Texturvorschauen und Kartenexport sowie das Hintergrundupdate von 1.7.11 auf 1.7.12 ohne sichtbares Setupfenster. Alle 1.497 installierten Programmdateien wurden mit dem Paket verglichen.

[Installer und Versionshinweise für 1.7.12](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.12)

## Kartenwerkzeuge, Standardobjekte und Shop-Demo – 1.7.13

**Shop** und **Warenkorb** stehen als unabhängige Schaltflächen in der Hauptkopfzeile. Das Menü bleibt am D-Logo oben links; Beenden steht unten. Der zusätzliche GitHub-Button in Versionen entfällt.

Unter **Karten → Terrain** enthält die vorhandene Texturbibliothek 20 neue Böden, sortiert in Natur, Pflaster/Tempel und magische Böden. Es gibt keinen zusätzlichen Hauptleisten-Button dafür. Die Objektbibliothek enthält standardmäßig **227 Modelle** mit neu erzeugten neutralen Vorschauen: das Schiffswrack und 226 Modelle des bereitgestellten Mapping-Pakets. Alle Nutzer sehen die Standardressourcen; Kartenbearbeitung benötigt weiterhin eine gültige Freischaltung.

Mit gleichzeitig gehaltener linker und rechter Maustaste lässt sich die Kamera drehen, ohne auf der Map zu malen. Wasser und Lava besitzen animierte Editor-Materialien. Der Flüssigkeitstyp wird zusätzlich in DaemonLiquids.json gespeichert; die Lava-Darstellung im Spiel benötigt weiterhin eine entsprechende Client-Anbindung. Der Radiergummi entfernt Terraintexturen, Flüssigkeiten oder Objekte im Pinselbereich; Rückgängig wird unterstützt.

Die neue Shop-Oberfläche zeigt Tarife, Warenkorb, Zahlungsmethoden und eine goldene Demo-Bestätigung. **Es findet keine Zahlung, kein Abo-Abschluss und keine Test- oder Lizenzaktivierung statt.** Zahlungsanbieter und Testserver sind noch nicht eingerichtet. Eine reine Demo ändert den tatsächlichen Lizenzstatus nicht. Ohne gültige Aktivierung bleibt Free aktiv; bestehende Aktivierungen bleiben erhalten.

Geprüft: 92 automatisierte Tests, native Kartenbedienung einschließlich Speichern/Wiederladen, Shop-Demo ohne Lizenzänderung, Free-Start und gespeicherte Vollversion. Das Hintergrundupdate von 1.7.11 auf 1.7.13 startete ohne sichtbares Setupfenster neu; alle 2.474 installierten Programmdateien stimmen per SHA-256 mit dem Paket überein.

[Installer und Versionshinweise für 1.7.13](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.13)

## Terrain, Nahnavigation und gemeinsamer Shop – 1.7.14

Gemalte Böden und ihre TextureSets werden auch dann wieder gefunden, wenn der gesamte gespeicherte Projektordner geöffnet oder verschoben wurde. Karten mit gleichnamigen TextureSets verwenden ihre eigenen Ressourcen. Neue Karten starten mit leerer Palette und unbemalter Terrainfläche. Das Anklicken eines Materials wählt nur den Pinsel; der Radiergummi setzt bemalte Flächen auf den leeren Grund zurück.

Wasser und Lava können mit **Bis zum Beckenrand** die Überlaufhöhe einer erkannten geschlossenen Absenkung übernehmen. Wird kein Becken erkannt, bleibt die eingestellte Höhe erhalten. Für offene Gewässer lässt sich weiterhin eine feste Höhe wählen. Geändertes Terrain aktualisiert die Uferdarstellung. Lava ist weiterhin ein Editor-Material und benötigt für das Spiel eine entsprechende Client-Anbindung.

Der Mausrad-Nahzoom bleibt auch bei kurzem Kamerazielabstand beweglich. Rechts halten und ziehen verschiebt die Ansicht auch nah an der Map zügig; beide Maustasten drehen weiterhin die Kamera.

Oben gibt es jetzt **einen Button „Shop & Warenkorb“**. Innerhalb desselben Fensters führen Tarife, Warenkorb und Demo-Abschluss durch einen gemeinsamen Ablauf. Eine schmale Anthrazit-Scrollbar mit goldenem Griff ergänzt das Design. **Alle Zahlungsabläufe bleiben Demo und ändern keine Lizenz.** Ohne gültige Aktivierung bleibt Free aktiv. Das Menü öffnet weiterhin über das D-Logo.

Geprüft: **97 automatisierte Tests**, native Mausrad- und Rechtsklick-Eingaben, leere Map trotz Materialwahl, beide Bodentexturen nach Prozessneustart und der gemeinsame Shop. Das Hintergrundupdate von **1.7.13 auf 1.7.14** installierte ohne sichtbares Setupfenster und startete automatisch neu. Alle **2.477 Programmdateien** wurden per SHA-256 mit dem Paket verglichen.

[Installer und Versionshinweise für 1.7.14](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.14)

## Kartenwerkzeuge, Sicherungen und Öffnen mit – 1.7.15

Unter **Karten → Objekte** gibt es echte Mehrfachbearbeitung mit Verschieben und Drehung um den Gruppenmittelpunkt, Bodenausrichtung mit Höhenversatz, Objekt-Reihen mit Anzahl/Abstand/Richtung und die Ebenen **Standard, Vegetation und Bauwerke**. Ebenen können zugewiesen, ausgeblendet und gesperrt werden. Ihre Einstellungen werden in **DaemonEditor.json** mit der Karte gespeichert. Änderungen unterstützen Rückgängig/Wiederholen. Eine sichtbare Leiste auf der Karte bietet Drehringe, Winkelschritte und den Drehmodus; dieser bleibt beim erneuten Auswählen erhalten.

**Sicherungsstände** unter Terrain speichern vollständige Kartenkopien einschließlich vorhandener Modelle und Texturen. Bei Änderungen wird nach 60 Sekunden automatisch gesichert; eine manuelle Sicherung ist ebenfalls möglich. Bis zu fünf Stände pro Karte bleiben erhalten, wobei eine gerade geöffnete ältere Sicherung zusätzlich geschützt wird. Wiederherstellen öffnet eine eigene Kartenkopie. Die Sicherungen liegen im Benutzerprofil von Daemon Viewer.

Ein Rechtsklick auf eine Map bietet den roten Eintrag **Map löschen…**. Nach einer Bestätigung mit Namen und Pfad wird nur ihr Map-Ordner in den Windows-Papierkorb verschoben. Benachbarte Ressourcen bleiben bestehen. **Leeren** oben in der Asset-Bibliothek entfernt die geladenen Quellen, ohne Originaldateien zu löschen.

Nach Installation erscheint Daemon Viewer in **Öffnen mit** für GR2, MSE, MDE, DDS, TGA, PNG, JPG, JPEG und BMP. Die angeklickte Datei wird geladen; weitere Dateianfragen können an das laufende Programm übergeben werden. Bestehende Standard-Apps werden nicht ersetzt. Ob die Auswahl einmalig oder dauerhaft gilt, entscheidet der Nutzer im Windows-Dialog.

Im Shop steht die tatsächlich aktive Edition links am D-Logo in einer goldenen Plakette. Das D erscheint auch im runden Erfolgsbereich. Eine goldene Mausspur blendet nach Bewegung wieder aus und berücksichtigt reduzierte Bewegung. **Zahlungen und Testaktivierung bleiben Demo und ändern keine Lizenz.** Ohne gültige Aktivierung bleibt Free aktiv; Kartenbearbeitung und Sicherungen benötigen eine Freischaltung.

Geprüft: **104 automatisierte Tests**, native Mehrfachwerkzeuge und Ebenen einschließlich Undo und Persistenz, vollständige Sicherung/Wiederherstellung, der echte 60-Sekunden-Timer, zwei einzelne Dateien, Bibliothek leeren, Shop und Hintergrundupdate von **1.7.14 auf 1.7.15**. Die Dateizuordnung wurde in einem isolierten Registry-Bereich geprüft. Alle **2.490 installierten Programmdateien** stimmen per SHA-256 mit dem Paket überein.

[Installer und Versionshinweise für 1.7.15](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/tag/v1.7.15)
