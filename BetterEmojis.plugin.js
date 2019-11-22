//META{"name":"BetterEmojis"}*//
const fs = require('fs');
var s = document.createElement("script");
s.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
document.head.appendChild(s);

class BetterEmojis {
	getName () {return "BetterEmojis";}

	getVersion () {return "0.0.1";}

	getAuthor () {return "[MΛLTE]#2903";}

	getDescription () {return "Change the look of Smileys.";}

	constructor () {
		this.changelog = {
			"fixed":[["Chat","Elements now properly get added to the chat again"]],
			"improved":[["New Library Structure & React","Restructured my Library and switched to React rendering instead of DOM manipulation"]]
		};

		this.patchedModules = {
			after: {
				MessageUsername: "render",
			}
		};
	}

    initConstructor () {
		this.packs = Object.assign({},
			{default:		{name:"Default",	id:"default"}},
			{apple:			{name:"Apple",		id:"apple"}},
			{google:		{name:"Google",		id:"google"}},
			{samsung:		{name:"Samsung",	id:"samsung"}},
			{facebook:		{name:"Facebook",	id:"facebook"}},
			{whatsapp:		{name:"WhatsApp",	id:"whatsapp"}}
		);

		this.emojis = {
			":grinning:": "grinning-face_1f600",
			":smiley:": "smiling-face-with-open-mouth_1f603",
			":smile:": "smiling-face-with-open-mouth-and-smiling-eyes_1f604",
			":grin:": "grinning-face-with-smiling-eyes_1f601",
			":laughing:": "smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606",
			":sweat_smile:": "smiling-face-with-open-mouth-and-cold-sweat_1f605",
			":rofl:": "rolling-on-the-floor-laughing_1f923",
			":joy:": "face-with-tears-of-joy_1f602"
		}

		// this.EmojiBase = JSON.parse(fs.readFileSync('EmojiBase.json'));

		this.emojiformat = {
			apple: 			"120/apple/232",
			goggle: 		"120/google/223",
			samsung: 		"72/samsung/220",
			facebook: 		"120/facebook/230",
			whatsapp: 		"120/whatsapp/224"
		};

        this.css = ``;

        this.defaults = {
			settings: {
				addInUserPopout:	{value:true, 		description:"Add in User Popouts:"},
				addInUserProfil:	{value:true, 		description:"Add in User Profile Modal:"},
				displayTime:		{value:true, 		description:"Display the Time in the Timestamp:"},
				displayDate:		{value:true, 		description:"Display the Date in the Timestamp:"},
				cutSeconds:			{value:false, 		description:"Cut off Seconds of the Time:"},
				forceZeros:			{value:false, 		description:"Force leading Zeros:"},
				otherOrder:			{value:false, 		description:"Show the Time before the Date:"}
			},
			choices: {
				emojiselect:		{value:"default", 	description:"Emoji style:",		options:this.packs}
			}
		};
	};

    getSettingsPanel () {

        if (!global.BDFDB || typeof BDFDB != "object" || !BDFDB.loaded || !this.started) return;
		let settings = BDFDB.DataUtils.get(this, "settings");
		let settingsitems = [], inneritems = [];

		settingsitems = settingsitems.concat(this.createSelects());

        for (let key in settings) settingsitems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsSaveItem, {
			className: BDFDB.disCN.marginbottom8,
			type: "Switch",
			plugin: this,
			keys: ["settings", key],
			label: this.defaults.settings[key].description,
			value: settings[key],
			onChange: (e, instance) => {
                let BDFDB_SettingsPanel = BDFDB.ReactUtils.findOwner(instance, {name:"BDFDB_SettingsPanel", up:true});
                BDFDB.ReactUtils.forceUpdate(BDFDB.ReactUtils.findOwner(BDFDB_SettingsPanel, {name:"BDFDB_Select", all:true, noCopies:true}));
            }
		}));


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

			this.updateEmojis(BDFDB.DataUtils.get(this, "choices", "emojiselect"));

			BDFDB.ModuleUtils.forceAllUpdates(this);
		}
		else console.error(`%c[${this.getName()}]%c`, "color: #3a71c1; font-weight: 700;", "", "Fatal Error: Could not load BD functions!");
	}


	stop () {
		if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			this.stopping = true;

			BDFDB.PluginUtils.clear(this);
		}
	}


	onSettingsClosed () {
		if (this.SettingsUpdated) {
			delete this.SettingsUpdated;
			BDFDB.ModuleUtils.forceAllUpdates(this);
		}
	}

	processMessageUsername (e) {
		this.updateEmojis(BDFDB.DataUtils.get(this, "choices", "emojiselect"));
	}

	createSelects () {
		let selects = [];
		for (let key in this.defaults.choices) {

			selects.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.FormComponents.FormItem, {
				title: this.defaults.choices[key].description,
				className: BDFDB.disCN.marginbottom8,
				children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Select, {
					menuPlacement: BDFDB.LibraryComponents.Select.MenuPlacements.BOTTOM,
					value: BDFDB.DataUtils.get(this, "choices", key),
					id: key,
					options: BDFDB.ObjectUtils.toArray(BDFDB.ObjectUtils.map(this.defaults.choices[key].options, (pack, id) => {return {value:id, label:pack.name}})),
					searchable: true,
					optionRenderer: pack => {
						return BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
							align: BDFDB.LibraryComponents.Flex.Align.CENTER,
							children: [
								BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex.Child, {
									grow: 1,
									children: pack.label
								}),
								BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex.Child, {
									grow: 0,
									children: this.getEmojiPreview(pack.value)
								})
							]
						});
					},
					onChange: pack => {
						BDFDB.DataUtils.save(pack.value, this, "choices", key);
						this.updateEmojis(pack.value);
					}
				})
			}));
		}
		return selects;
	}

	getEmojiPreview(pack) {
		let wrapper = BDFDB.ReactUtils.elementToReact(BDFDB.DOMUtils.create(`<span></span>`));
		wrapper.props.children = [];
		for (let emoji in this.emojis) {
			wrapper.props.children.push(BDFDB.ReactUtils.elementToReact(BDFDB.DOMUtils.create(`<img src="${this.getEmojiUrl(pack, emoji)}" style="width: 2rem; height: 2rem; min-height: 2rem;">`)));
			// preview += `<img src="${this.getEmojiUrl(emoji)}">\n`
		}
		return wrapper
	}

	updateEmojis(pack) {

		for (let emoji in this.emojis) {
			$(`img[alt="${emoji}"]`).attr("src", this.getEmojiUrl(pack, emoji));
		}
		// https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/${this.emojiformat[key]}/grinning-face_1f600.png
	}

	getEmojiUrl(pack, emoji) {
		return `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/${this.emojiformat[pack]}/${this.emojis[emoji]}.png`;
	}
}
