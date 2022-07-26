My goal for this project was to create a basic static site generator that could pull from the WordPress Rest API and live basically anywhere. Existing JS static site generators like 11ty are good, but require a nodejs setup, which can be an obstacle if you have less control over the configuration of your hosting. I also looked into some of the PHP equivalents like Jigsaw, but honestly it just felt easier and more convenient to go with vanilla PHP files, and convenient is what I was going for. In case anyone wants to use this repo: The static html files which are pulled from my portfolio site, as well as my js and css assets, are included here, which is convenient for me, but not so much for you if you want to clone the repo and generate your own static files. Apologies, but you'll just have to delete those after cloning. The logic that talks to the WordPress Rest API (or any rest api really; it's just curl requests) is located in the `api/` subdirectory. The api url is a constant that is set in an `inc/config.php` file, which this repo ignores. You would just replace the constant with your own api url, or ideally set up your own private config file where you'll assign your own constants. This is mainly a learning project for me, so if you notice any big security or stability flaws in the logic let me know, but please be nice about it.

Since this repo serves as the front end for my portfolio site, there's also some logic included that is specific to some of my projects and unrelated to pulling data from the cms and generating the static files. The `music/` directory handles CRUD requests for the javascript drum machine project. Feel free to adapt any of that code as well if it proves useful! 