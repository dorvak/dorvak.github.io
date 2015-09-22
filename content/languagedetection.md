Title: YouTube Language-Detection
Summary: Language detection on YouTube by video-titles & summaries
Author: Till Keyling
Tags: YouTube, R, Python
Date: 2012
Category: Blog

Due to the lack of a language-tag in the YouTube-API, which would be
extremely helpful determining the language of a videoclip (precisely:
the language of the title and description; language detection in
audiovisual content requires much more effort and cpu-power), i ran a
quick test with python´s [guess-language](https://bitbucket.org/spirit/guess_language/) module
I think it´s a simple but pretty reliable algorithm for language
detection tasks, based on a trigram detection and the enchant-library
for over 60 languages.

In our project about political communication on [YouTube](http://www.fgpk.de/en/teilprojekte/#Teilprojekt1)
we stumbled upon a large amount of non-german videoclips (sampling from
the feed for the most-viewed videos in the “news & politics” - category
in germany). To get an overview of the linguistic diversity on the
german version on YouTube, I conducted a language-detection test on a
small subsample of our data (350 videoclips).

[![image](https://dl.dropbox.com/u/20490817/lang_barplot.png)](https://dl.dropbox.com/u/20490817/lang_barplot.png)

First of all, just about 50% of the recent videos (“top viewed in
news..”) have a german description (30 of them have a title in another
language; a detection solely based on the (usually short) titles seems
to be unreliable), followed by clips with an english-speaking
description. The amount of an unsuccessful classification task
(“UNKNOWN”) is noteworthy, but may be reduced by a combination with the
title-classification. In line with the results of our manual-coding
approach, a significant amount of descriptions and titles are in an
arabic language. Furthermore, the results of the automatic
language-detection could be combined with videoclip-metadata.
[![image](https://dl.dropbox.com/u/20490817/lang_jitter.png)](https://dl.dropbox.com/u/20490817/lang_jitter.png)
For example, videoclips with a german description are obviously less
successful than those with an arabic or english description. At the
moment, i´m validating the classification results with a manual coding
of the titles and descriptions, but this approach might be a starting
point to reduce/filter the sample-size of audiovisual material, esp. in
preparation of a manual content analysis or simply to get an overview of
a huge amount of user-generated-content).
