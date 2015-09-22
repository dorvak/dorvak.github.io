Title:Facepager - What it is, what it's not?
Author: Till Keyling
Date: 2015-09-01
Category: Blog
Summary: Notes on the design & limitations of the Facepager
Tags: Facepager


To our delight ("we", that is Jakob Jünger and Till Keyling), Facepager became a quite popular tool for the collection of data from API's (and some basic Web-Scraping capabilities) - albeit it's name (which is based on a very early version I coded for a student of mine) for any kind of API, although most people may use it to gather data from Facebook und Twitter.
Besides providing the executable and the source-code itself, users may ask for help on a Facebook-Page and/or the GitHub-Repo. These two feedback-mechanism are used quite regularily, while the most user preferr to contact us via E-Mail.
The constantly increasing user-base and thus the increasing number of questions/appeals for help, however, become more and more time-consuming, i.e. a large proportion of my time spend for the tool as allocated to answer questions instead of developing/improving the tool itself. While some questions, hints and discussion are really fruitfull to increase the usability and capability of the Facepager, a quite significant share is not. IMO, this is caused by a somewhat "fuzzy" scope of the tool, i.e. users are unclear wether the tool is or is not apropriate for their specific task. Thus, here is a quick overview from our perspective regarding the scope, area of use of our sofware and the intentions behind the development of the Facepager - in short: What it is and what it's not.  

What it is:

- a tool to simplify the process of gathering data from JSON-based APIs without the use of programming languages or predefined scripts, while leaving large degrees-of-freedom to the user. Thus, we do not restrict any API-endpoints and allow "useless" requests
- a tool to support the step of "data collection" on a low level
- a tool to document the process of data collection, i.e. errors occurring in the process (on both the side of the API and locally, f.e. ill-definied requests) 
- a tool that targets researchers/scientific purpuses, rather than other audiences like market researchers or other commercial uses 

What it's not:

- a tool to process or analyse data from JSON-based API. This includes filtering the data (this excludes restrictions or filters provided by the API,f.e. limiting the number of results), aggregating the data (again, the are some methods to aggregate data via the API, f.e. the total count of tweets) or plotting the data. In the end, Facepager is just a "layer" to communicate with the API  - it won't tell you what to talk about (API-endpoints), but enables you to talk to the API. 
- a "one click"-tool; although one can use the predefined scripts, we encourage users to formulate their needs in terms of the data they want to collect. Thus, users need to deal with the respective API, it's enpoint, structure and limitations... there is an there will be no "collect-all-posts-from-user-xy"-button!
- a tool to avoid certain API-restrictions, f.e. to exclude personal information that is not available via the respective API.


More explicit hints if you ask some questions:

- We won't answer API-specific questions any more, please read the Documentations of the API. Examples: "How do I collect information about all of my Facebook-Friends"?, "How many Tweets will the Twitter-API provide?"
- Read the internal help - it covers some basic, exemplary cases
- If you ask for help, PLEASE specify your version of the Facepager (f.e. 3.6), your operating system ,provide a quick overview of your task and settings (f.e. a screenshot) and the log-files (via PM, do not share the log-files in public, as they may contain personal information. Delete tokens from the log-files!)
- Use forums like stackoverflow.com --> There are tons of API-related questions that can be easily transfered to the Facepager