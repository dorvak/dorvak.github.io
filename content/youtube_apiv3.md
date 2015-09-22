Title: Facepager and the YouTube API v3 - a quick tutorial
Category: Blog
Date: 2015-06-01
Authors: Till Keyling
Summary: Quick tutorial for the YouTube APIv3 using Facepager

Almost two years ago, I collected lots of information from the YouTube-API (+scraping Referrer-Data) for my PhD-Thesis (basically mapping the view-dynamic for political videos on YouTube on an individual basis over time). While the scale and design of this data-collection was beyond Facapagers capability, the tools itself is well suited for generic API-requests, such as to the YouTube-API (or reddit, f.e.). 
In the meantime, the YouTube-API underwent significant changes: Besides a necessary "upgrade" to JSON-based response bodies (instead of a somewhat obscure XML-Format in v2), there is now a precise quota-system and error-handling as well. Although some endpoints have been closed, the API and it's documentation improved a lot when compared to it preceding versions. 

Recently, Bernhard Rieder developed the [YouTube Data Tools]( http://thepoliticsofsystems.net/2015/05/exploring-youtube/), a great approach and furthermore open sourced/public available (although I strongly disagree that YouTube is understudied; this might be the case in the social science due to the preference for textual rather than visual entities (see [Vis, 2013](http://firstmonday.org/ojs/index.php/fm/article/view/4878/3755)), but there is a long research tradition in the information systems and alike when it comes to YouTube). Bernhard’s new tool reminded me to update the YouTube-Presets for the Facepager, enabling it to communicate with the most recent API-version. While Bernhard’s YTDT focusses on some specific analysis task and is easier to use, the approach of the Facepager is more “low-level”, yet probably more generic (I’ll explain the “low-level”-philosophy of our tools in a follow-up post).

Because there is no generic OAuth-Dialog in the Facepager yet (it's on the to-do list), some steps are necessary before you can start fetching data from the API:

1. Obtain an API-Key: The v3-API is OAuth-based, by default. OAuth is a secure, yet [difficult](http://img.izifunny.com/pics/2013/20130211/original/izifunny-gifdump-feb-12-2013-25-gifs_3.gif) authentication procedure that involves multiple "question-and-answer"-steps, basically to prove the existence and credibility of a user (or an app etc.). As long as you don't need to access private API-endpoints (i.e. your own YouTube-account or an account on behalf of others) and only want to obtain public available information, you should stick to the public API access key that Google provides to every developer). 

2. To get such a key, you must register as a [Google Developer](https://developers.google.com/) and create an app/project that uses the YouTube-API. See the [Developer Console](https://console.developers.google.com/) for more information about how to create an project, it's simple and straightforward. *Note*: You need to activate/enable the YouTube-API before you generate a browser key (a server key would work as well and is more appropriate, leave referrers/allowed IP-adresses blank)
![Enable YouTube-API]({filename}/images/enable_youtube_api.PNG) 
![Generate Server/Browser Key]({filename}/images/create_key.PNG)

3. Once you created an app and activated the YouTube-API for that app, you have to obtain the public API-access key to authenticate your requests with the Facepager (as you would do if you login with your Facebook or Twitter-credentials). The key is located in the "credentials"-section:
![API Key location]({filename}/images/api_key.jpg)

4. Copy the public API access key

5. Load the "YouTube API v3" presets in the Facepager & paste the key in the parameter field (as you might guess, as a value of the "key"-parameter, "XY" by default). See the screenshot below, esp. the critical "parameters"-section in the lower left part of the tool.

6. You're now ready to start gathering data using the YouTube-API. The current preset collects information about a video clip (["list"-method](https://developers.google.com/youtube/v3/docs/videos/list)), namely it's title, author etc. ("snippet"-part) and the typical usage-statistics ("statistics"-part). The only information you need to provide is the ID of a YouTube-Video ("https://www.youtube.com?v=HEREISTHEID" ; paste it as a new node using the"Add Node"-Button, you may copy multiples ID's in here as well).

7. Note that each request and each part withdraw "units" from your API-quota (there is a handy [quota-calculator](https://developers.google.com/youtube/v3/determine_quota_cost)), in this case 5 units from your daily free-account of 50.000.000 units. You might check your quotas in the aforementioned Developer Console, it will decrease for every additional request you make. 

There is much more information available via the API - check out either the [API-Explorer](https://developers.google.com/apis-explorer/#p/youtube/v3/) or the Reference-Guide in the documentation of the v3-API. For example, you could retrieve comments via the "commentThreads"-endpoint (in this case, specify a "videoId"-parameter!). 
![Statistics and Comments]({filename}/images/comments_youtube.PNG). 

The API provides really interesting information, f.e. one might map the location of a video (or the recording, usually tagged via GPS). Although such metadata is only available for a small share of YouTube-clips, it provides additional insights on how users use YouTube - f.e. clips uploaded in the german "news & politics"-section of the platform deal with the conflicts in the middle east quite often, which can be seen not only by analyzing the clips itself, but also by mapping their geolocation. 

![Geolocation YouTube]({filename}/images/geolocation_germany.jpg)

Have fun playing with the API!

**DOWNLOAD** [YouTube API v3 Preset](https://gist.githubusercontent.com/dorvak/fb5b54296084512684f6/raw/d78bc5bb75f86a4867459e135d33b7466e710681/YouTube_API_v3_Get_Video_Statistics-3_4) (see Help-Section 5 for more information about the presets)


