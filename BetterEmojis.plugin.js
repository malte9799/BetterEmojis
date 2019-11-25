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
		$.getJSON('https://raw.githubusercontent.com/malte9799/BetterEmojis/master/EmojiBase.json', data => {
		    this.emojis = data;
			this.updateEmojis(BDFDB.DataUtils.get(this, "choices", "emojiselect"));
		});

		this.packs = Object.assign({},
			{default:		{name:"Twitter (Default)",	id:"default", 	format:"72/twitter/233"}},
			{apple:			{name:"Apple",				id:"apple", 	format:"120/apple/232"}},
			{google:		{name:"Google",				id:"google", 	format:"120/google/223"}},
			{samsung:		{name:"Samsung",			id:"samsung", 	format:"72/samsung/220"}},
			{facebook:		{name:"Facebook",			id:"facebook", 	format:"120/facebook/230"}},
			{whatsapp:		{name:"WhatsApp",			id:"whatsapp", 	format:"120/whatsapp/224"}}
		);

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
		// console.log(e);
		if (!BDFDB.DataUtils.get(this, "choices", "emojiselect") == "default") {
			let renderChildren = e.returnvalue.props.children;
			e.returnvalue.props.children = (...args) => {
				let renderedChildren = renderChildren(...args);
				console.log(renderedChildren);
				this.updateEmojis(BDFDB.DataUtils.get(this, "choices", "emojiselect"));
				// this.injectBadges(e.instance, renderedChildren.props.children, user, "chat");
				// return renderedChildren;
			};
		}
	}

	createSelects () {
		let selects = [];
		for (let key in this.defaults.choices) {

			let previewEmojis = [];
			for (var i = 0; i < 5; i++) {
				previewEmojis.push(Object.keys(this.emojis)[Math.floor(Math.random()*Object.keys(this.emojis).length)]);
			}

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
									children: this.getEmojiPreview(pack.value, previewEmojis)
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

	getEmojiPreview(pack, previewEmojis) {
		let wrapper = BDFDB.ReactUtils.elementToReact(BDFDB.DOMUtils.create(`<span></span>`));
		wrapper.props.children = [];
		for (let emoji in previewEmojis) {
			wrapper.props.children.push(BDFDB.ReactUtils.elementToReact(BDFDB.DOMUtils.create(`<img src="${this.getEmojiUrl(pack, previewEmojis[emoji])}" style="width: 2rem; height: 2rem; min-height: 2rem;">`)));
		}
		return wrapper
	}

	updateEmojis(pack) {
		for (let emoji in this.emojis) {
			if (emoji == "") break;
			$(`img[alt="${emoji}"]`).attr("src", this.getEmojiUrl(pack, emoji));
		}
	}

	getEmojiUrl(pack, emoji) {
		return `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/${this.packs[pack].format}/${this.emojis[emoji]}.png`;
	}
}
