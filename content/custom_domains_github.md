Title: Custom-Domains and GitHub-Pages: Configuration for checkdomain.de
Author: Till Keyling
Category: Blog
Tags: GitHub, Hosting
Date: 2015-09-21
Slug: customdomains
Summary: Hosting GitHub-Pages and custom-domains using checkdomain.de

Recently, I rebuild my homepage using the great [Pelican](https://github.com/getpelican/pelican)-Framework together with GitHubs Page Hosting capabilites.

While building and hosting a website as a GitHub User-Page is pretty straightforward, I struggled with the steup of a custom-domain using my my domain-provider [checkdomain.de](http://www.checkdomain.de). 

Based on some helpfull [SO-Threads](http://stackoverflow.com/questions/9082499/custom-domain-for-github-project-pages/22374542#22374542), I finally managed to set up a custom-domain for the blog.

As checkdomain.de doesn't really follow the usual terms and labels in their user-interface, creating the respective A-records (in case you use an apex domain like tillkeyling.com!) wasn't that obvious. Thus, here is a screenshot of the configuration for checkdomain.de:

## Checkdomain.de-Setup
There are basically three steps involved to use a custom (apex) domain for your GitHub User-Page:

1. Create a CNAME file in the Master-Branch of your GitHub-Repository. This file should contain your custom domain, without the scheme (*http://*) and will cause GitHub to serve your content to that domain (at least as I understood it, having no or just a very basic background in Hosting/DNS-related stuff).

2. In the checkdomain user-interface, adjust the IPv4-Adress to GitHub's current [IP-Address](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/), in this case:
    *192.30.252.153*
    *192.30.252.154*

![Checkdomain.de Configuration]({filename}/images/checkdomain_config.PNG)

        *Note: I only used a single A-Record via "Allgemeine Einstellungen". Entering the other IP in the DNS-Table below as an A-Record seems to create another redirect. The settings in the checkdomain user-interface are quite confusing here, f.e. no root-apex (@) can be specified. There is no further description available.*

3. Enter a CNAME-Record at checkdomain for the "www"-subdomain. The target should be *username*.github.io. (note the trailing slash!)

You might check the redirects and DNS settings via the *dig*-command, or use this [online-tool](http://www.digwebinterface.com/?hostnames=tillkeyling.com%0D%0Awww.tillkeyling.com&type=&useresolver=8.8.4.4&ns=all&nameservers=) to test the correct settings. Updating the records may take a while, and be sure to reset Chrome's DNS and Website-Cache to test your settings.





