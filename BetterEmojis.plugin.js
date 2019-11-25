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
		// this.emojis = {
		// 	":grinning:": "grinning-face_1f600",
		//     ":smiley:": "smiling-face-with-open-mouth_1f603",
		//     ":smile:": "smiling-face-with-open-mouth-and-smiling-eyes_1f604",
		//     ":grin:": "grinning-face-with-smiling-eyes_1f601",
		//     ":laughing:": "smiling-face-with-open-mouth-and-tightly-closed-eyes_1f606",
		//     ":sweat_smile:": "smiling-face-with-open-mouth-and-cold-sweat_1f605",
		//     ":rofl:": "rolling-on-the-floor-laughing_1f923",
		//     ":joy:": "face-with-tears-of-joy_1f602",
		//     ":slight_smile:": "slightly-smiling-face_1f642",
		//     ":upside_down:": "upside-down-face_1f643",
		//     ":wink:": "winking-face_1f609",
		//     ":blush:": "smiling-face-with-smiling-eyes_1f60a",
		//     ":innocent:": "smiling-face-with-halo_1f607",
		//     ":smiling_face_with_3_hearts:": "smiling-face-with-smiling-eyes-and-three-hearts_1f970",
		//     ":heart_eyes:": "smiling-face-with-heart-shaped-eyes_1f60d",
		//     ":star_struck:": "grinning-face-with-star-eyes_1f929",
		//     ":kissing_heart:": "face-throwing-a-kiss_1f618",
		//     ":kissing:": "kissing-face_1f617",
		//     ":relaxed:": "white-smiling-face_263a",
		//     ":kissing_closed_eyes:": "kissing-face-with-closed-eyes_1f61a",
		//     ":kissing_smiling_eyes:": "kissing-face-with-smiling-eyes_1f619",
		//     ":yum:": "face-savouring-delicious-food_1f60b",
		//     ":stuck_out_tongue:": "face-with-stuck-out-tongue_1f61b",
		//     ":stuck_out_tongue_winking_eye:": "face-with-stuck-out-tongue-and-winking-eye_1f61c",
		//     ":zany_face:": "grinning-face-with-one-large-and-one-small-eye_1f92a",
		//     ":stuck_out_tongue_closed_eyes:": "face-with-stuck-out-tongue-and-tightly-closed-eyes_1f61d",
		//     ":money_mouth:": "money-mouth-face_1f911",
		//     ":hugging:": "hugging-face_1f917",
		//     ":face_with_hand_over_mouth:": "smiling-face-with-smiling-eyes-and-hand-covering-mouth_1f92d",
		//     ":shushing_face:": "face-with-finger-covering-closed-lips_1f92b",
		//     ":thinking:": "thinking-face_1f914",
		//     ":zipper_mouth:": "zipper-mouth-face_1f910",
		//     ":face_with_raised_eyebrow:": "face-with-one-eyebrow-raised_1f928",
		//     ":neutral_face:": "neutral-face_1f610",
		//     ":expressionless:": "expressionless-face_1f611",
		//     ":no_mouth:": "face-without-mouth_1f636",
		//     ":smirk:": "smirking-face_1f60f",
		//     ":unamused:": "unamused-face_1f612",
		//     ":rolling_eyes:": "face-with-rolling-eyes_1f644",
		//     ":grimacing:": "grimacing-face_1f62c",
		//     ":lying_face:": "lying-face_1f925",
		//     ":relieved:": "relieved-face_1f60c",
		//     ":pensive:": "pensive-face_1f614",
		//     ":sleepy:": "sleepy-face_1f62a",
		//     ":drooling_face:": "drooling-face_1f924",
		//     ":sleeping:": "sleeping-face_1f634",
		//     ":mask:": "face-with-medical-mask_1f637",
		//     ":thermometer_face:": "face-with-thermometer_1f912",
		//     ":head_bandage:": "face-with-head-bandage_1f915",
		//     ":nauseated_face:": "nauseated-face_1f922",
		//     ":face_vomiting:": "face-with-open-mouth-vomiting_1f92e",
		//     ":sneezing_face:": "sneezing-face_1f927",
		//     ":hot_face:": "overheated-face_1f975",
		//     ":cold_face:": "freezing-face_1f976",
		//     ":woozy_face:": "face-with-uneven-eyes-and-wavy-mouth_1f974",
		//     ":dizzy_face:": "dizzy-face_1f635",
		//     ":exploding_head:": "shocked-face-with-exploding-head_1f92f",
		//     ":cowboy:": "face-with-cowboy-hat_1f920",
		//     ":partying_face:": "face-with-party-horn-and-party-hat_1f973",
		//     ":sunglasses:": "smiling-face-with-sunglasses_1f60e",
		//     ":nerd:": "nerd-face_1f913",
		//     ":face_with_monocle:": "face-with-monocle_1f9d0",
		//     ":confused:": "confused-face_1f615",
		//     ":worried:": "worried-face_1f61f",
		//     ":slight_frown:": "slightly-frowning-face_1f641",
		//     ":frowning2:": "white-frowning-face_2639",
		//     ":open_mouth:": "face-with-open-mouth_1f62e",
		//     ":hushed:": "hushed-face_1f62f",
		//     ":astonished:": "astonished-face_1f632",
		//     ":flushed:": "flushed-face_1f633",
		//     ":pleading_face:": "face-with-pleading-eyes_1f97a",
		//     ":frowning:": "frowning-face-with-open-mouth_1f626",
		//     ":anguished:": "anguished-face_1f627",
		//     ":fearful:": "fearful-face_1f628",
		//     ":cold_sweat:": "face-with-open-mouth-and-cold-sweat_1f630",
		//     ":disappointed_relieved:": "disappointed-but-relieved-face_1f625",
		//     ":cry:": "crying-face_1f622",
		//     ":sob:": "loudly-crying-face_1f62d",
		//     ":scream:": "face-screaming-in-fear_1f631",
		//     ":confounded:": "confounded-face_1f616",
		//     ":persevere:": "persevering-face_1f623",
		//     ":disappointed:": "disappointed-face_1f61e",
		//     ":sweat:": "face-with-cold-sweat_1f613",
		//     ":weary:": "weary-face_1f629",
		//     ":tired_face:": "tired-face_1f62b",
		//     ":yawning_face:": "yawning-face_1f971",
		//     ":triumph:": "face-with-look-of-triumph_1f624",
		//     ":rage:": "pouting-face_1f621",
		//     ":angry:": "angry-face_1f620",
		//     ":face_with_symbols_over_mouth:": "serious-face-with-symbols-covering-mouth_1f92c",
		//     ":smiling_imp:": "smiling-face-with-horns_1f608",
		//     ":imp:": "imp_1f47f",
		//     ":skull:": "skull_1f480",
		//     ":skull_crossbones:": "skull-and-crossbones_2620",
		//     ":poop:": "pile-of-poo_1f4a9",
		//     ":clown:": "clown-face_1f921",
		//     ":japanese_ogre:": "japanese-ogre_1f479",
		//     ":japanese_goblin:": "japanese-goblin_1f47a",
		//     ":ghost:": "ghost_1f47b",
		//     ":alien:": "extraterrestrial-alien_1f47d",
		//     ":space_invader:": "alien-monster_1f47e",
		//     ":robot:": "robot-face_1f916",
		//     ":smiley_cat:": "smiling-cat-face-with-open-mouth_1f63a",
		//     ":smile_cat:": "grinning-cat-face-with-smiling-eyes_1f638",
		//     ":joy_cat:": "cat-face-with-tears-of-joy_1f639",
		//     ":heart_eyes_cat:": "smiling-cat-face-with-heart-shaped-eyes_1f63b",
		//     ":smirk_cat:": "cat-face-with-wry-smile_1f63c",
		//     ":kissing_cat:": "kissing-cat-face-with-closed-eyes_1f63d",
		//     ":scream_cat:": "weary-cat-face_1f640",
		//     ":crying_cat_face:": "crying-cat-face_1f63f",
		//     ":pouting_cat:": "pouting-cat-face_1f63e",
		//     ":see_no_evil:": "see-no-evil-monkey_1f648",
		//     ":hear_no_evil:": "hear-no-evil-monkey_1f649",
		//     ":speak_no_evil:": "speak-no-evil-monkey_1f64a",
		//     ":kiss:": "kiss-mark_1f48b",
		//     ":love_letter:": "love-letter_1f48c",
		//     ":cupid:": "heart-with-arrow_1f498",
		//     ":gift_heart:": "heart-with-ribbon_1f49d",
		//     ":sparkling_heart:": "sparkling-heart_1f496",
		//     ":heartpulse:": "growing-heart_1f497",
		//     ":heartbeat:": "beating-heart_1f493",
		//     ":revolving_hearts:": "revolving-hearts_1f49e",
		//     ":two_hearts:": "two-hearts_1f495",
		//     ":heart_decoration:": "heart-decoration_1f49f",
		//     ":heart_exclamation:": "heavy-heart-exclamation-mark-ornament_2763",
		//     ":broken_heart:": "broken-heart_1f494",
		//     ":heart:": "heavy-black-heart_2764",
		//     ":orange_heart:": "orange-heart_1f9e1",
		//     ":yellow_heart:": "yellow-heart_1f49b",
		//     ":green_heart:": "green-heart_1f49a",
		//     ":blue_heart:": "blue-heart_1f499",
		//     ":purple_heart:": "purple-heart_1f49c",
		//     ":brown_heart:": "brown-heart_1f90e",
		//     ":black_heart:": "black-heart_1f5a4",
		//     ":white_heart:": "white-heart_1f90d",
		//     ":100:": "hundred-points-symbol_1f4af",
		//     ":anger:": "anger-symbol_1f4a2",
		//     ":boom:": "collision-symbol_1f4a5",
		//     ":dizzy:": "dizzy-symbol_1f4ab",
		//     ":sweat_drops:": "splashing-sweat-symbol_1f4a6",
		//     ":dash:": "dash-symbol_1f4a8",
		//     ":hole:": "hole_1f573",
		//     ":bomb:": "bomb_1f4a3",
		//     ":speech_balloon:": "speech-balloon_1f4ac",
		//     ":speech_left:": "left-speech-bubble_1f5e8",
		//     ":anger_right:": "right-anger-bubble_1f5ef",
		//     ":thought_balloon:": "thought-balloon_1f4ad",
		//     ":zzz:": "sleeping-symbol_1f4a4",
		//     ":wave:": "waving-hand-sign_1f44b",
		//     ":wave_tone1:": "waving-hand-sign_emoji-modifier-fitzpatrick-type-1-2_1f44b-1f3fb_1f3fb",
		//     ":wave_tone2:": "waving-hand-sign_emoji-modifier-fitzpatrick-type-3_1f44b-1f3fc_1f3fc",
		//     ":wave_tone3:": "waving-hand-sign_emoji-modifier-fitzpatrick-type-4_1f44b-1f3fd_1f3fd",
		//     ":wave_tone4:": "waving-hand-sign_emoji-modifier-fitzpatrick-type-5_1f44b-1f3fe_1f3fe",
		//     ":wave_tone5:": "waving-hand-sign_emoji-modifier-fitzpatrick-type-6_1f44b-1f3ff_1f3ff",
		//     ":raised_back_of_hand:": "raised-back-of-hand_1f91a",
		//     ":raised_back_of_hand_tone1:": "raised-back-of-hand_emoji-modifier-fitzpatrick-type-1-2_1f91a-1f3fb_1f3fb",
		//     ":raised_back_of_hand_tone2:": "raised-back-of-hand_emoji-modifier-fitzpatrick-type-3_1f91a-1f3fc_1f3fc",
		//     ":raised_back_of_hand_tone3:": "raised-back-of-hand_emoji-modifier-fitzpatrick-type-4_1f91a-1f3fd_1f3fd",
		//     ":raised_back_of_hand_tone4:": "raised-back-of-hand_emoji-modifier-fitzpatrick-type-5_1f91a-1f3fe_1f3fe",
		//     ":raised_back_of_hand_tone5:": "raised-back-of-hand_emoji-modifier-fitzpatrick-type-6_1f91a-1f3ff_1f3ff",
		//     ":hand_splayed:": "raised-hand-with-fingers-splayed_1f590",
		//     ":hand_splayed_tone1:": "raised-hand-with-fingers-splayed_emoji-modifier-fitzpatrick-type-1-2_1f590-1f3fb_1f3fb",
		//     ":hand_splayed_tone2:": "raised-hand-with-fingers-splayed_emoji-modifier-fitzpatrick-type-3_1f590-1f3fc_1f3fc",
		//     ":hand_splayed_tone3:": "raised-hand-with-fingers-splayed_emoji-modifier-fitzpatrick-type-4_1f590-1f3fd_1f3fd",
		//     ":hand_splayed_tone4:": "raised-hand-with-fingers-splayed_emoji-modifier-fitzpatrick-type-5_1f590-1f3fe_1f3fe",
		//     ":hand_splayed_tone5:": "raised-hand-with-fingers-splayed_emoji-modifier-fitzpatrick-type-6_1f590-1f3ff_1f3ff",
		//     ":raised_hand:": "raised-hand_270b",
		//     ":raised_hand_tone1:": "raised-hand_emoji-modifier-fitzpatrick-type-1-2_270b-1f3fb_1f3fb",
		//     ":raised_hand_tone2:": "raised-hand_emoji-modifier-fitzpatrick-type-3_270b-1f3fc_1f3fc",
		//     ":raised_hand_tone3:": "raised-hand_emoji-modifier-fitzpatrick-type-4_270b-1f3fd_1f3fd",
		//     ":raised_hand_tone4:": "raised-hand_emoji-modifier-fitzpatrick-type-5_270b-1f3fe_1f3fe",
		//     ":raised_hand_tone5:": "raised-hand_emoji-modifier-fitzpatrick-type-6_270b-1f3ff_1f3ff",
		//     ":vulcan:": "raised-hand-with-part-between-middle-and-ring-fingers_1f596",
		//     ":vulcan_tone1:": "raised-hand-with-part-between-middle-and-ring-fingers_emoji-modifier-fitzpatrick-type-1-2_1f596-1f3fb_1f3fb",
		//     ":vulcan_tone2:": "raised-hand-with-part-between-middle-and-ring-fingers_emoji-modifier-fitzpatrick-type-3_1f596-1f3fc_1f3fc",
		//     ":vulcan_tone3:": "raised-hand-with-part-between-middle-and-ring-fingers_emoji-modifier-fitzpatrick-type-4_1f596-1f3fd_1f3fd",
		//     ":vulcan_tone4:": "raised-hand-with-part-between-middle-and-ring-fingers_emoji-modifier-fitzpatrick-type-5_1f596-1f3fe_1f3fe",
		//     ":vulcan_tone5:": "raised-hand-with-part-between-middle-and-ring-fingers_emoji-modifier-fitzpatrick-type-6_1f596-1f3ff_1f3ff",
		//     ":ok_hand:": "ok-hand-sign_1f44c",
		//     ":ok_hand_tone1:": "ok-hand-sign_emoji-modifier-fitzpatrick-type-1-2_1f44c-1f3fb_1f3fb",
		//     ":ok_hand_tone2:": "ok-hand-sign_emoji-modifier-fitzpatrick-type-3_1f44c-1f3fc_1f3fc",
		//     ":ok_hand_tone3:": "ok-hand-sign_emoji-modifier-fitzpatrick-type-4_1f44c-1f3fd_1f3fd",
		//     ":ok_hand_tone4:": "ok-hand-sign_emoji-modifier-fitzpatrick-type-5_1f44c-1f3fe_1f3fe",
		//     ":ok_hand_tone5:": "ok-hand-sign_emoji-modifier-fitzpatrick-type-6_1f44c-1f3ff_1f3ff",
		//     ":pinching_hand:": "pinching-hand_1f90f",
		//     ":pinching_hand_tone1:": "pinching-hand_emoji-modifier-fitzpatrick-type-1-2_1f90f-1f3fb_1f3fb",
		//     ":pinching_hand_tone2:": "pinching-hand_emoji-modifier-fitzpatrick-type-3_1f90f-1f3fc_1f3fc",
		//     ":pinching_hand_tone3:": "pinching-hand_emoji-modifier-fitzpatrick-type-4_1f90f-1f3fd_1f3fd",
		//     ":pinching_hand_tone4:": "pinching-hand_emoji-modifier-fitzpatrick-type-5_1f90f-1f3fe_1f3fe",
		//     ":pinching_hand_tone5:": "pinching-hand_emoji-modifier-fitzpatrick-type-6_1f90f-1f3ff_1f3ff",
		//     ":v:": "victory-hand_270c",
		//     ":v_tone1:": "victory-hand_emoji-modifier-fitzpatrick-type-1-2_270c-1f3fb_1f3fb",
		//     ":v_tone2:": "victory-hand_emoji-modifier-fitzpatrick-type-3_270c-1f3fc_1f3fc",
		//     ":v_tone3:": "victory-hand_emoji-modifier-fitzpatrick-type-4_270c-1f3fd_1f3fd",
		//     ":v_tone4:": "victory-hand_emoji-modifier-fitzpatrick-type-5_270c-1f3fe_1f3fe",
		//     ":v_tone5:": "victory-hand_emoji-modifier-fitzpatrick-type-6_270c-1f3ff_1f3ff",
		//     ":fingers_crossed:": "hand-with-index-and-middle-fingers-crossed_1f91e",
		//     ":fingers_crossed_tone1:": "hand-with-index-and-middle-fingers-crossed_emoji-modifier-fitzpatrick-type-1-2_1f91e-1f3fb_1f3fb",
		//     ":fingers_crossed_tone2:": "hand-with-index-and-middle-fingers-crossed_emoji-modifier-fitzpatrick-type-3_1f91e-1f3fc_1f3fc"
		// }

		$.getJSON('https://raw.githubusercontent.com/malte9799/BetterEmojis/master/EmojiBase.json', data => {
		    this.emojis = data;
			this.updateEmojis(BDFDB.DataUtils.get(this, "choices", "emojiselect"));
		});

		this.packs = Object.assign({},
			{default:		{name:"Default",	id:"default", 	format:""}},
			{apple:			{name:"Apple",		id:"apple", 	format:"120/apple/232"}},
			{google:		{name:"Google",		id:"google", 	format:"120/google/223"}},
			{samsung:		{name:"Samsung",	id:"samsung", 	format:"72/samsung/220"}},
			{facebook:		{name:"Facebook",	id:"facebook", 	format:"120/facebook/230"}},
			{whatsapp:		{name:"WhatsApp",	id:"whatsapp", 	format:"120/whatsapp/224"}}
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
		if (pack == "default") return;
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
