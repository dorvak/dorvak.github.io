#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Till Keyling'
SITENAME = u"Till Keyling's Homepage"
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = u'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Me @LMU München','http://www.ls1.ifkw.uni-muenchen.de/personen/wiss_ma/keyling_till/index.html'),)

#Theme
THEME = '/usr/local/lib/python2.7/site-packages/pelican/themes/Flex'
# Social widget
SOCIAL = (('twitter','https://twitter.com/tkeyling'),
          ('github','https://github.com/dorvak'),("stack-overflow","http://stackoverflow.com/users/872535/dorvak"))

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True


#FLEX THEME Specific Stuff
SITETITLE = "Till Keyling"
OG_LOCALE = "de_DE"
SITELOGO = "https://pbs.twimg.com/profile_images/646087603415072768/H821Gw0Q.jpg"
ROBOTS = 'index, follow'
COPYRIGHT_YEAR = 2015
MAIN_MENU = True
