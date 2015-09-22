Title: Crowdsourcing und Sampling auf Twitter
Author: Till Keyling
Date: 2012-07-23
Language: de
Category: Blog
Tags: YouTube, Twitter, Bots
Summary: Sampling on YouTube via Twitter

Im Rahmen unseres Forschungsprojekts “Politische Kommunikation auf
Videoplattformen” erfassen wir auch Videos zur Bundestagswahl 2013.
Nicht jetzt erst merken wir, dass die Stichprobenbildung auf
“Folksonomy”-strukturierten Angeboten wie YouTube ein zentrales Problem
bleibt, vermutlich sogar eine DER methodischen Herausforderungen im
Bereich der [digital methods](http://www.univie.ac.at/digitalmethods/)
bleiben wird, weil die Content-Anbieter zwar Zugänge via API anbieten,
aber oft [keine
Zufallsstichproben](https://code.google.com/p/gdata-issues/issues/detail?id=4113)
erlauben (etc. pp.).

Zunächst einmal gibt es ganz offensichtliche und systematische Zugänge
der Stichprobenbildung im politischen Bereich, wobei gerade die
thematische Zentrierung auf die Bundestagswahlen noch einen Glücksfall
darstellen:

1.  Akteurs- oder Channel-basiertes Sampling: In diesem Fall erfassen
    wir die öffentlichen YouTube-Kanäle der aktuellen Mitglieder des
    Bundestages und der großen Volksparteien, die vorher manuell erfasst
    wurden.
2.  Keyword-basiertes Sampling, indem nach Stichworten über die
    YouTube-Suche Videos zum Thema Bundestagswahlen erfasst werden.
    Zudem können Tweets erfasst werden, die bestimmte Stichworte in
    Kombination mit Video-Links enthalten, also ein Sampling über die
    Beobachtung von Anschlusskommunikation auf anderen Netzwerken,
    gerade weil diese “cross-pollination”, d.h. die Diffusion von
    Informationen über SNS-Grenzen hinweg immer wichtiger wird, gerade
    für Content-Plattformen wie YouTube (das werte ich unter anderem in
    meiner Dissertation aus).

Heute ist mir aber noch eine andere Idee gekommen, Stichproben bilden zu
lassen, und zwar per crowd-sourcing, aber im Wortsinn: Nutzer liefern
gezielt Informationen in eine Datenbank oder konstituieren eine
Stichprobe, wobei die Auswahl nach den Relevanzkriterien der Nutzer
erfolgt - damit aber auch bewusstem Missbrauch etc. Tür und Tor geöffnet
werden:

Unter [@btwtube](http://twitter.com/btwtube "BTW Tube") habe ich einen
Bot-Account eingerichtet, an den Nutzer Vorschläge für relevante
YouTube-Videos liefern können, die den aktuellen Status der
Bundestagswahl kommentieren. Setzt jemand einen Tweet an @btwtube oder
mit dem hashtag \#btwtube ab, werden die im Tweet enthaltenen URL´s
geparsed und der Stichprobe hinzugefügt, so sie YouTube-Videos
darstellen. Artig bedankt sich das Programm für die eingereichten
Videos, auch wenn das Dummerchen (noch) nicht zwischen relevanten und
irrelevanten Videoclips differenzieren kann (mit jedem eingehenden Video
wird allerdings ein Stromstoß an einen Hiwi abgesetzt, der diese dann zu
katalogisieren hat).

<a class="twitter-timeline" href="https://twitter.com/btwtube" data-widget-id="646244807480901632">Tweets by @btwtube</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

Soweit zur Logik. Natürlich ist das ganze hochgradig experimentell,
davon abhängig, dass Nutzer aktiv werden und Videos vorschlagen, um so
die Stichprobe zu erweitern. Mir schweben da noch einige
Anwendungsbereiche vor, in denen sich eine solche Art der
Stichprobenbildung sinnvoller einsetzen lässt, um jegliche Anmerkungen
bin ich aber auch dankbar. Im übrigen werden ich die Ergebnisse und die
aktuellen Trends zur Bundestagswahl auf YouTube auch möglichst zeitnah
auf einer Live-Website zur Verfügung stellen, wenn dafür noch Zeit ist.

