Title: YouTube-Kanäle von deutschen Parteien
Author: Till Keyling
Category: Blog
Date: 2013
Tags: YouTube, Bundestagswahl, DFG
Summary: YouTube.Kanäle deutscher Parteien

Im Rahmen der Erfassung der Bundestagswahlen auf YouTube durch das [Teilprojekt1](http://www.fgpk.de/teilprojekte/#Teilprojekt1) speichern wir auch die Kanäle der 38 zur Bundestagswahl zugelassen Parteien, wovon ja letztlich nur [34 Parteien](http://www.bundeswahlleiter.de/de/bundestagswahlen/BTW_BUND_13/presse/W13011_Wahlteilnahme_Parteien.html) teilnehmen werden. 

Zum Teil schwierig gestaltet sich dabei eine genaue Zuordnung der Kanäle von Parteien, insbesondere der Kleinparteien. Hier existieren unzählige Kanäle von Parteiverbänden auf Landesebene, von einzelnen Politikern (wobei wir ebenfalls die YouTube-Kanäle aller MdB abfragen). Bei den Volksparteien haben wir zudem noch die Kanäle der jeweiligen Fraktion im Bundestag aufgenommen. Gerade die Plattform [pluragraph.de](http://www.pluragraph.de) ist bei der Erhebung solcher Daten sehr hilfreich (auch wenn eine eigene API a'la OffenesParlament hilfreich wäre), eine eigene Recherche auf dein jeweiligen Homepages von Parteien und Politiker aber leider unumgänglich. 

### Klickzahlen von YouTube-Kanälen

Eine Auflistung der YouTube-Nutzung nach Fraktionen findet sich ja bereits unter [hamburg-wahlbeobachter.de](http://www.hamburger-wahlbeobachter.de/2013/07/social-media-in-der-politik-90-prozent.html), wobei hier die Existenz eines eigenen Kanals noch längst keine Nutzung, geschweige denn Reichweite garantiert. Daher haben wir uns zunächst die Kanäle der Volksparteien auf YouTube (und deren Fraktionen) näher angeschaut und deren Entwicklung im letzten Monat visualisiert.

#### CDU/CSU-Fraktionskanal

Der Kanal _cducsu_ besteht seit 2006-10-30 und erreicht mit seinen __169 Videos__ insgesamt __145.724 Klicks__. 
Die Kanalhomepage selbst wurde bisher 52.887-mal besucht, 378 User haben den Kanal abonniert und 2-mal favorisiert. 
Das letzte Update fand am 2013-07-30 statt.

![Kanal der CDU/CSU-Fraktion im Bundestag]({filename}/images/cducsu.svg)

#### CSUMedia (CSU)

Der Kanal _csumedia_ besteht seit 2008-02-11 und erreicht mit seinen __274 Videos__ insgesamt __919.616 Klicks__. 
Die Kanalhomepage selbst wurde bisher 157.006-mal besucht, 559 User haben den Kanal abonniert und 1-mal favorisiert. 
Das letzte Update fand am 2013-08-08 statt.

![Kanal der CSU]({filename}/images/csumedia.svg)

#### CDU-TV (CDU)

Der Kanal _cdutv_ besteht seit 2008-08-05 und erreicht mit seinen __662 Videos__ insgesamt __2.403.688 Klicks__. 
Die Kanalhomepage selbst wurde bisher 796.529-mal besucht, 3205 User haben den Kanal abonniert und 4-mal favorisiert. 
Das letzte Update fand am 2013-08-07 statt.


![Kanal der CDU]({filename}/images/cdutv.svg)


#### Linksfraktion (Die Linke)

Der Kanal _linksfraktion_ besteht seit 2008-01-05 und erreicht mit seinen __2.250 Videos__ insgesamt __6.705.403 Klicks__. 
Die Kanalhomepage selbst wurde bisher 1.510.743-mal besucht, 9.352 User haben den Kanal abonniert und 13-mal favorisiert. 
Das letzte Update fand am 2013-08-07 statt

![Kanal der Linksfraktion]({filename}/images/linksfraktion.svg)

#### Die Linke

Der Kanal _dielinke_ besteht seit 2006-09-20 und erreicht mit seinen __533 Videos__ insgesamt __1.352.618 Klicks__. 
Die Kanalhomepage selbst wurde bisher 284.492-mal besucht, 4.437 User haben den Kanal abonniert und 20-mal favorisiert. 
Das letzte Update fand am 2013-08-05 statt

![Kanal der Linken]({filename}/images/dielinke.svg)

#### SPDVision (SPD)
Der Kanal _spdvision_ besteht seit 2007-10-17 und erreicht mit seinen __688 Videos__ insgesamt __2.414.547 Klicks__. 
 Die Kanalhomepage selbst wurde bisher 540.936-mal besucht, 3.836 User haben den Kanal abonniert und 7-mal favorisiert. 
 Das letzte Update fand am 2013-08-09 statt

![Kanal der SPDVisione]({filename}/images/spdvision.svg)

#### SPDFraktion (SPD)

Der Kanal _spdfraktion_ besteht seit 2009-09-17 und erreicht mit seinen __263 Videos__ insgesamt __1.629.82 Klicks__. 
Die Kanalhomepage selbst wurde bisher 28.827-mal besucht, 541 User haben den Kanal abonniert und 0-mal favorisiert. 
Das letzte Update fand am 2013-07-30 statt

![Kanal der SPD-fraktion]({filename}/images/spdfraktion.svg)

#### FDP

Der Kanal _fdp_ besteht seit 2006-02-16 und erreicht mit seinen __1186 Videos__ insgesamt __2.877.713 Klicks__. 
Die Kanalhomepage selbst wurde bisher 1.374.048-mal besucht, 2.628 User haben den Kanal abonniert und 11-mal favorisiert. 
Das letzte Update fand am 2013-08-04 statt

![Kanal der FDP-Fraktion]({filename}/images/fdp.svg)

#### FDPPArtei (FDP)

Der Kanal _fdppartei_ besteht seit 2009-09-02 und erreicht mit seinen __4 Videos__ insgesamt __1243 Klicks__. 
Die Kanalhomepage selbst wurde bisher 14.074-mal besucht, 190 User haben den Kanal abonniert und 1-mal favorisiert. 
Das letzte Update fand am 2013-07-30 statt

![Kanal der FDP]({filename}/images/fdppartei.svg)



###Übersicht über die Parteikanäle aller zur Bundestagswahl zugelassenen Parteien

    #!python 

    import pandas as pd
    df=pd.read_html(URLOFTHISPOST)[0]
    #erste und einzige Tabelle als Datensatz

    #Views plotten; matplotlib etc. vorrausgesetzt
    plot(df[2])
    #etc...

|Username|Seit|Videos|Video-Views kumuliert|Channel-Views|Subscriber|Favorites|Updated|Views/Video|
|--------|--------|------|---------------------|-------------|----------|---------|-------|-----------|
| linksfraktion | 2008-01-05 12:12:08 | 2250 | 6705403 | 1510743 | 9352 | 13 | 2013-08-07 09:26:16 |2980|
| spdvision | 2007-10-17 20:42:17 | 688 | 2414547 | 540936 | 3836 | 7 | 2013-08-09 07:58:28 |3509|
| buesojugend | 2008-07-23 13:46:30 | 852 | 1342025 | 92498 | 2342 | 9 | 2013-08-08 18:55:09 |1575|
| dielinke | 2006-09-20 09:23:15 | 533 | 1352618 | 284492 | 4437 | 20 | 2013-08-05 12:06:02 |2537|
| csumedia | 2008-02-11 15:03:14 | 274 | 919616 | 157006 | 559 | 1 | 2013-08-08 06:56:48 |3356|
| cdutv | 2008-08-05 14:51:56 | 662 | 2403688 | 796529 | 3205 | 4 | 2013-08-07 12:28:26 |3630|
| videoprodeutschland | 2010-07-01 20:27:17 | 51 | 110032 | 16814 | 257 | 0 | 2013-07-30 00:19:59 |2157|
| piratenpartei | 2007-03-13 23:03:57 | 144 | 356198 | 178778 | 4979 | 4220 | 2013-08-09 10:10:23 |2473|
| gruene | 2006-05-25 14:01:08 | 1324 | 2929485 | 369752 | 3890 | 19 | 2013-08-09 08:28:04 |2212|
| spdfraktion | 2009-09-17 07:57:53 | 263 | 162982 | 28827 | 541 | 0 | 2013-07-30 02:25:47 |619|
| fdp | 2006-02-16 00:30:55 | 1186 | 2877713 | 1374048 | 2628 | 11 | 2013-08-04 15:57:27 |2426|
| wahlalternative2013 | 2012-09-25 18:59:25 | 25 | 99268 | 14512 | 997 | 2 | 2013-08-07 15:33:20 |3970|
| alternativefuerde | 2013-03-19 00:44:14 | 25 | 101648 | 444 | 1124 | 6 | 2013-07-30 01:30:05 |4065|
| cducsu | 2006-10-30 13:52:47 | 169 | 145724 | 52887 | 378 | 2 | 2013-07-30 01:04:55 |862|
| fdppartei | 2009-09-02 16:36:19 | 4 | 1243 | 14074 | 190 | 1 | 2013-07-30 01:37:05 |310|
| neinidee | 2012-04-06 16:12:04 | 15 | 9252 | 1124 | 43 | 2 | 2013-07-30 01:15:37 |616|
| 0sul | 2007-04-09 19:17:21 | 52 | 154565 | 6578 | 89 | 117 | 2013-07-30 01:58:23 |2972|
| mlpdde | 2009-05-28 17:57:30 | 55 | 72335 | 36050 | 367 | 6 | 2013-07-30 02:13:10 |1315|
| bigdeutschland | 2010-03-31 09:09:03 | 11 | 44356 | 2215 | 32 | 0 | 2013-06-26 06:25:59 |4032|
| oedptv | 2011-05-31 17:00:48 | 28 | 3086 | 837 | 23 | 0 | 2013-08-07 20:58:59 |110|
| republikanertv | 2008-01-07 00:44:51 | 122 | 341072 | 140993 | 340 | 16 | 2013-07-30 01:50:28 |2795|
| kommunistentv | 2009-02-02 11:56:32 | 10 | 21031 | 51377 | 484 | 0 | 2013-07-30 01:46:50 |2103|
| pbcbuero | 2009-05-07 18:38:01 | 3 | 84040 | 2495 | 52 | 4 | 2013-07-30 02:49:19 |28013|
| bayernparteitv | 2009-08-16 13:32:40 | 29 | 40317 | 13595 | 117 | 0 | 2013-07-30 00:57:05 |1390|
| dietierschutzpartei | 2009-03-24 11:08:28 | 7 | 44851 | 15384 | 197 | 12 | 2013-07-30 00:33:53 |6407|
| dieparteidervernunft | 2011-05-18 20:30:04 | 89 | 341738 | 34847 | 1293 | 83 | 2013-08-03 23:06:55 |3839|
| violettenpresse | 2009-08-23 13:00:26 | 2 | 65215 | 842 | 19 | 1 | 2013-06-26 15:12:35 |32607|
| familienwahl | 2009-01-31 03:32:33 | 12 | 15946 | 551 | 4 | 1 | 2013-06-26 15:29:39 |1328|
| familienpartei | 2007-12-02 08:05:49 | 3 | 1988 | 676 | 7 | 2 | 2013-06-22 11:24:21 |662|
| christlichemitte | 2011-06-21 15:13:40 | 42 | 1515 | 603 | 4 | 6 | 2013-07-30 03:02:59 |36|
| gleichheittv | 2009-04-08 09:57:44 | 22 | 48727 | 8629 | 69 | 0 | 2013-07-30 02:09:13 |2214|
| neuemitte | 2009-12-29 17:49:32 | 8 | 24316 | 3563 | 711 | 1 | 2013-08-07 19:54:55 |3039|
