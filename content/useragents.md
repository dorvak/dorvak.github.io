Title: User-Agents and URL-Resolvers
Date: 2013-12-03
Category: Blog 
Authors: Till Keyling
Summary: Caveats of Useragents & WebScraping

While resolving the (usually shortened) URL's from Tweets, I noticed some
errors using Python [Requests]("http://docs.python-requests.org/en/latest/").
Actually, it's not a Requests "Error", but a 403 ("Forbidden")-Response from
some Webservers, who don't like user-agents like Apache or the standard
Requests-User-Agent.

Consider the follwing example:

```python

import requests as rq

url="user_agent = {'User-agent': 'Mozilla/5.0'}" #This URL has some redirects,
and doesn't like some User-Agents.

#Lets try a simple head-request (which is recommended resolving the url due to
a drastically #lower network-load, especially when resolving thousands of urls
at once)

exmpl = rq.head(url) 
```

This example will result in an 403-Response code, mainly because of the
standard-headers that Requests is delivering:

```python 
'User-Agent': 'python-requests/1.2.3 CPython/2.7.3 Linux/3.2.0-23-generic'}
```

Other
[Response-Codes]("http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html") may
be thrown, f.e. 405 when a head-Request is forbidden. This may be handled via
Exceptions, or using Curl ord PyCurl directly (which isn't under active
development any more). 

As a workaround, which "fakes" the user-agent of the request and should work
for the most webservers or endpoints of an request, one could & should simply
pass another user-agent (f.e. user_agent = {'User-agent': 'Mozilla/5.0'}). This
methods allows to resolve most of the shortened URL's posted on Twitter.

To reduce the number of redirects when consuming Tweets from the Streaming API,
one should use the "expanded_url"-Value of the delivered JSON. Beware of the
fact that these "expansion" is not complete: Redirects, shortened Short-URL's
and alike are not expanded by that method!
