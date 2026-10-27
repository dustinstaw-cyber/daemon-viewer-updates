<p align="center"><img src="assets/daemon-logo.png" width="144" alt="Daemon Viewer"></p>

# Daemon Viewer

**by Daemon · Windows · Anthrazit-Gold-Werkstatt**

Viewer für Modelle, Texturen, Effekte und Metin2-Karten mit Grau-Gold-Werkstatt.

[**Aktuellen Windows-Installer herunterladen**](https://github.com/dustinstaw-cyber/daemon-viewer-updates/releases/latest)

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
