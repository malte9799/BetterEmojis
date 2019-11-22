//META{"name":"BetterEmojis"}*//

class BetterEmojis {
	getName () {return "BetterEmojis";}

	getVersion () {return "0.0.1";}

	getAuthor () {return "[MΛLTE]#2903";}

	getDescription () {return "Change the look of Smileys.";}

	constructor () {
		this.changelog = {
			"improved":[["test"]]
		};
	}

    initConstructor () {
        this.css = ``;

        this.defaults = {
			settings: {
				addInUserPopout:		{value:true, 		description:"Add in User Popouts:"},
				addInUserProfil:		{value:true, 		description:"Add in User Profile Modal:"},
				displayTime:			{value:true, 		description:"Display the Time in the Timestamp:"},
				displayDate:			{value:true, 		description:"Display the Date in the Timestamp:"},
				cutSeconds:				{value:false, 		description:"Cut off Seconds of the Time:"},
				forceZeros:				{value:false, 		description:"Force leading Zeros:"},
				otherOrder:				{value:false, 		description:"Show the Time before the Date:"}
			}
		};
	};

    getSettingsPanel () {

        if (!global.BDFDB || typeof BDFDB != "object" || !BDFDB.loaded || !this.started) return;
		let settings = BDFDB.DataUtils.get(this, "settings");
		let settingsitems = [], inneritems = [];
        for (let key in settings) settingsitems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
			className: BDFDB.disCN.marginbottom8,
			type: "Switch",
			plugin: this,
			keys: ["settings", key],
			label: this.defaults.settings[key].description,
			value: settings[key],
			onChange: (e, instance) => {
                let BDFDB_SettingsPanel = BDFDB.ReactUtils.findOwner(instance, {name:"BDFDB_SettingsPanel", up:true});
                let index = -1;
                for (let key in settings) {
                    index++;
                    if (key == instance.props.keys[1]) continue;
                    // console.log(BDFDB_SettingsPanel.props.children[index].props);
                    BDFDB_SettingsPanel.props.children[index].props.value = false;
                }
                BDFDB.ReactUtils.forceUpdate(BDFDB.ReactUtils.findOwner(BDFDB_SettingsPanel, {name:"BDFDB_Select", all:true, noCopies:true}));
            }
		}));

		// settingsitems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.FormComponents.FormDivider, {
		// 	className: BDFDB.disCN.marginbottom8
		// }));

        return BDFDB.PluginUtils.createSettingsPanel(this, settingsitems);
	}

	//legacy
	load () {}

	start () {
        if (!global.BDFDB) global.BDFDB = {myPlugins:{}};
		if (global.BDFDB && global.BDFDB.myPlugins && typeof global.BDFDB.myPlugins == "object") global.BDFDB.myPlugins[this.getName()] = this;
		var libraryScript = document.querySelector('head script#BDFDBLibraryScript');
		if (!libraryScript || (performance.now() - libraryScript.getAttribute("date")) > 600000) {
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("id", "BDFDBLibraryScript");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.min.js");
			libraryScript.setAttribute("date", performance.now());
			libraryScript.addEventListener("load", () => {this.initialize();});
			document.head.appendChild(libraryScript);
		}
		else if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) this.initialize();
		this.startTimeout = setTimeout(() => {
			try {return this.initialize();}
			catch (err) {console.error(`%c[${this.getName()}]%c`, "color: #3a71c1; font-weight: 700;", "", "Fatal Error: Could not initiate plugin! " + err);}
		}, 30000);
	}

	initialize () {
		if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			if (this.started) return;
			BDFDB.PluginUtils.init(this);

			BDFDB.ListenerUtils.add(this, document, "click", "a[href^='https://steamcommunity.'], a[href^='https://store.steampowered.'], a[href*='a.akamaihd.net/'][href*='steam']", e => {this.openInSteam(e, e.currentTarget.href);});

			BDFDB.ListenerUtils.add(this, document, "click", BDFDB.dotCN.cardstore + BDFDB.dotCN.cardstoreinteractive, e => {
				let news = BDFDB.ReactUtils.getValue(e.currentTarget, "return.return.memoizedProps.news");
				if (news && news.url && news.url.includes("steam")) this.openInSteam(e, news.url);
			});
		}
		else console.error(`%c[${this.getName()}]%c`, "color: #3a71c1; font-weight: 700;", "", "Fatal Error: Could not load BD functions!");
	}


	stop () {
        if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			this.stopping = true;

			BDFDB.PluginUtils.clear(this);
		}
	}

	downloadEmojis(pack) {

	}

	updateEmojis() {

	}
}
