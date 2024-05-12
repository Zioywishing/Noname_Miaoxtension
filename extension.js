game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "超界Ⅱ期",
		content: function (config, pack) {},
		precontent: function () {},
		help: {},
		config: {},
		package: {
			character: {
				character: {
					"sup2_luxun": ["male", "wu", 3, ["qianxun", "sup2_lianying"], []],
					"sup2_caopi": ["male", "wei", "3/4", ["sup2_xingshang", "sup2_fangzhu", "songwei"], []],
					"sup2_weiyan": ["male", "shu", "2/4/3", ["sup2_kuanggu", "sup2_qimou"], []],
					"sup_caiwenji": ["female", "qun", 3, ["sup_beige", "sup_duanchang"], []],
					"sup2_yuanshu": ["male", "qun", 5, ["sup2_yongsi", "sup2_weidi"], []],
					"sup2_machao": ["male", "shu", 5, ["sup2_tieji", "sup2_mashu"], []],
				},
				translate: {
					"sup2_luxun": "超陆逊",
					"sup2_caopi": "超曹丕",
					"sup2_weiyan": "超魏延",
					"sup_caiwenji": "超蔡琰",
					"sup2_yuanshu": "超袁术",
					"sup2_machao": "超马超"
				}
			},
			card: {
				card: {},
				translate: {},
				list: []
			},
			skill: {
				skill: {
					"sup2_lianying": {
						audio: "ext:超界Ⅱ期:2",
						trigger: {
							player: "loseAfter"
						},
						frequent: true,
						filter(event, player) {
							return true;
							if (player.countCards("h")) return false;
							const evt = event.getl(player);
							return evt && evt.player == player && evt.hs && evt.hs.length > 0;
						},
						async content(event, trigger, player) {
							player.draw();
						},
						ai: {
							threaten: 0.8,
							effect: {
								target(card) {
									if (card.name == "guohe" || card.name == "liuxinghuoyu") return 0.5;
								}
							},
							noh: true,
							skillTagFilter(player, tag) {
								if (tag == "noh") {
									if (player.countCards("h") != 1) return false;
								}
							}
						},
						"_priority": 0
					},
					"sup2_fangzhu": {
						audio: "ext:超界Ⅱ期:2",
						trigger: {
							player: "damageBegin4"
						},
						filtet: function (event, player) {
							return 1 || player.getDamagedHp() > 0;
						},
						direct: true,
						preHidden: true,
						content: function () {
							"step 0"
							var draw = player.getDamagedHp() + trigger.num;
							player
								.chooseTarget(
									[1, draw],
									get.prompt("sup2_fangzhu"),
									"令至多" + draw + "名其他角色翻面" + (draw > 0 ? "并摸" + get.cnNumber(draw) + "张牌" : ""),
									function (card, player, target) {
										return 1 || player != target;
									}
								)
								.setHiddenSkill("fangzhu")
								.set("ai", target => {
									if (target.hasSkillTag("noturn")) return 0;
									var player = _status.event.player;
									var current = _status.currentPhase;
									var dis = current ? get.distance(current, target, "absolute") : 1;
									var draw = player.getDamagedHp();
									var att = get.attitude(player, target);
									if (att == 0) return target.hasJudge("lebu") ? Math.random() / 3 : Math.sqrt(get.threaten(target)) / 5 + Math.random() / 2;
									if (att > 0) {
										if (target.isTurnedOver()) return att + draw;
										if (draw < 4) return -1;
										if (current && target.getSeatNum() > current.getSeatNum()) return att + draw / 3;
										return (10 * Math.sqrt(Math.max(0.01, get.threaten(target)))) / (3.5 - draw) + dis / (2 * game.countPlayer());
									} else {
										if (target.isTurnedOver()) return att - draw;
										if (draw >= 5) return -1;
										if (current && target.getSeatNum() <= current.getSeatNum()) return -att + draw / 3;
										return (4.25 - draw) * 10 * Math.sqrt(Math.max(0.01, get.threaten(target))) + (2 * game.countPlayer()) / dis;
									}
								});
							"step 1"
							if (result.bool) {
								player.logSkill("fangzhu", result.targets);
								var draw = player.getDamagedHp() + trigger.num;
								if (draw == 0) {
									draw = 1;
									//return event.finish()
								}
								for (let target of result.targets) {
									if (draw > 0) target.draw(draw);
									target.turnOver();
								}
							}
						},
						ai: {
							maixie: true,
							"maixie_hp": true,
							effect: {
								target: function (card, player, target) {
									if (get.tag(card, "damage")) {
										if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
										if (target.hp <= 1) return;
										if (!target.hasFriend()) return;
										var hastarget = false;
										var turnfriend = false;
										var players = game.filterPlayer();
										for (var i = 0; i < players.length; i++) {
											if (get.attitude(target, players[i]) < 0 && !players[i].isTurnedOver()) {
												hastarget = true;
											}
											if (get.attitude(target, players[i]) > 0 && players[i].isTurnedOver()) {
												hastarget = true;
												turnfriend = true;
											}
										}
										if (get.attitude(player, target) > 0 && !hastarget) return;
										if (turnfriend || target.hp == target.maxHp) return [0.5, 1];
										if (target.hp > 1) return [1, 0.5];
									}
								}
							}
						},
						"_priority": 0
					},
					"sup2_xingshang": {
						audio: "ext:超界Ⅱ期:2",
						trigger: {
							global: "die"
						},
						filter: function (event, player) {
							return player.isDamaged() || event.player.countCards("he") > 0;
						},
						direct: true,
						content: function () {
							"step 0"
							var choice = [];
							if (player.isDamaged()) choice.push("回复体力");
							if (trigger.player.countCards("he")) choice.push("获得牌");
							choice.push("cancel2");

							player.logSkill(event.name, trigger.player);
							if (1 || result.control == "获得牌") {
								event.togain = trigger.player.getCards("he");
								player.gain(event.togain, trigger.player, "giveAuto", "bySelf");
							}
							player.recover();
							"step 1"
							player.damage("nosource");
						},
						"_priority": 0
					},
					"sup2_kuanggu": {
						audio: "kuanggu",
						audioname: ["re_weiyan", "ol_weiyan"],
						trigger: {
							source: "damageSource"
						},
						filter: function (event, player) {
							return event.num > 0;
						},
						frequent: true,
						preHidden: true,
						mod: {
							cardUsable: function (card, player, num) {
								if (card.name == "sha") return num + player.storage.sup2_kuanggu_num;
							}
						},
						init: function (player) {
							player.storage.sup2_kuanggu_num = 0;
						},
						content: function () {
							"step 0"
							event.num = trigger.num;
							"step 1"
							if (player.hp == player.maxHp) player.changeHujia(1);
							player.recover();
							player.draw([1, 2].randomGet());
							player.storage.sup2_kuanggu_num += 1;
							"step 2"

							event.num--;
							if (event.num > 0) {
								event.goto(1);
							}
						},
						group: "sup2_kuanggu_1",
						subSkill: {
							"1": {
								trigger: {
									global: "phaseEnd"
								},
								direct: true,
								content: function () {
									player.storage.sup2_kuanggu_num = 0;
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"sup2_qimou": {
						unique: true,
						limited: true,
						audio: "ext:超界Ⅱ期:2",
						enable: "phaseUse",
						filter: function (event, player) {
							return !player.storage.sup2_qimou;
						},
						init: function (player) {
							player.storage.sup2_qimou = false;
						},
						mark: true,
						intro: {
							content: "limited"
						},
						skillAnimation: true,
						animationColor: "orange",
						content: function () {
							"step 0"
							player.loseMaxHp();
							"step 1"
							var num = Math.min(player.maxHp - 1, player.hp + player.hujia - 1);
							if (player.countCards("hs", { name: ["tao", "jiu"] })) {
								num -= -parseInt(player.countCards("hs", { name: ["tao", "jiu"] }) / 2);
							}
							var map = {};
							var list = [];
							for (var i = 1; i <= player.hp + player.hujia; i++) {
								var cn = get.cnNumber(i, true);
								map[cn] = i;
								list.push(cn);
							}
							event.map = map;
							player.awakenSkill("sup2_qimou");
							player.storage.sup2_qimou = true;
							player
								.chooseControl(list, function () {
									return get.cnNumber(_status.event.goon, true);
								})
								.set("prompt", "对自己造成任意点伤害")
								.set("goon", num);
							"step 2"
							event.num = event.map[result.control] || 1;
							//player.storage.reqimou2=num;
							player.damage(event.num);
							"step 2"
							player.loseHp(event.num);
							//player.draw(num);
							//player.addTempSkill('reqimou2');
						},
						ai: {
							order: 14,
							result: {
								player: function (player) {
									if (player.hp + player.hujia < 3) return false;
									var mindist = player.hp;
									if (player.countCards("hs", card => player.canSaveCard(card, player))) mindist++;
									if (
										game.hasPlayer(function (current) {
											return (
												get.distance(player, current) <= mindist &&
												player.canUse("sha", current, false) &&
												get.effect(current, { name: "sha" }, player, player) > 0
											);
										})
									) {
										return 1;
									}
									return 0;
								}
							}
						},
						"_priority": 0
					},
					"sup_beige": {
						audio: "beige",
						audioname: ["ol_caiwenji"],
						trigger: {
							global: ["damageEnd", "dying"]
						},
						logTarget: "player",
						filter: function (event, player) {
							return event.player.isIn();
						},
						"_priority": -13235,
						check: function (event, player) {
						    if(event.player !== player && event.player.hp > 0)return false
							let att = get.attitude(player, event.player);
							//if (event.player.hasSkill("xinleiji")) return att > 0;
							//if (att > 0 || event.player.isHealthy()) return true;
							//if (!event.source) return true;
							
							let att1 = get.attitude(player, event.source);
							//game.log(att,att1)
							return att > 0 && att1 < 0
							//return att <= 0 || event.source.isTurnedOver();
						},
						mark: true,
						marktext: "歌",
						intro: {
							markcount: "expansion",
							mark: function (dialog, storage, player) {
								var cards = player.getExpansions("sup_beige");
								if (!cards) cards = [];
								if (player.isUnderControl(true) && cards.length != 0) dialog.addAuto(cards);
								else return "共有" + get.cnNumber(cards.length) + "张牌";
							}
						},
						init:()=>{game.addGlobalSkill('sup_beige_hm')},
						content: function () {
							"step 0"
							event.num1 = 0;
							"step 1"
							suits = new Set();
							cards1 = player.getExpansions("sup_beige");
							for (var i of cards1) {
								suits.add(get.suit(i, player));
							}
							if (suits.size >= 4) {
								event.goto(2);
							} else {
								num = 4 - suits.size;
								player
									.chooseCard("h", false, [1, num], "悲歌：你可以选择至多" + num + "张花色各不相同的手牌", (card, player) => {
										// if(!ui.selected.cards.length) return true;
										var suit = get.suit(card);
										for (var i of ui.selected.cards) {
											if (get.suit(i, player) == suit) return false;
										}
										for (var i of player.getExpansions("sup_beige")) {
											if (get.suit(i, player) == suit) return false;
										}
										return true;
									})
									.set("complexCard", true)
									.set("ai", card => 6);
							}
							"step 2"
							if (result.bool&&result.cards) {
							    suits = new Set();
							cards1 = player.getExpansions("sup_beige");
							for (var i of cards1) {
								suits.add(get.suit(i, player));
							}
							    flag = true
							    for(let c of result.cards){
							        if(suits.has(get.suit(c,player)))flag = false
							    }
								if(flag)player.addToExpansion("giveAuto", result.cards, player).gaintag.add("sup_beige");
							}
							"step 3"
							cards1 = player.getExpansions("sup_beige");
							event.total = cards1.length;
							event.num = 0;
							"step 4"
							event.target = trigger.player;
							event.source = trigger.source;
							trigger.player.judge(card => {
								for (let c of player.getExpansions("sup_beige")) {
									if (get.suit(card) == get.suit(c)) return 1.5;
								}
								return -1.5;
							});
							"step 5"
							event.judgeResult = get.copy(result);
							"step 6"
							target = event.target;
							source = event.source;
							suits = new Set();
							cards1 = player.getExpansions("sup_beige");
							for (var i of cards1) {
								suits.add(get.suit(i, player));
							}
							if (suits.has(event.judgeResult.suit)) {
								for (var i of cards1) {
									if(player !== target && get.suit(i, player)==event.judgeResult.suit){
										target.gain(i,'gain2').gaintag.add('sup_beige');
									};
								}
								switch (event.judgeResult.suit) {
									case "heart":
										if (target.isIn() && target.isDamaged()) target.recover();
										player.recover();
										break;
									case "diamond":
										if (target.isIn()) target.draw(2);
										player.draw(2);
										break;
									case "spade":
										if (source && source.isIn() && !source.isTurnedOver()) source.turnOver();
										player.addExpose(0.1);
										break;
									case "club":
										if (source && source.isIn() && source.countCards("hej") > 0) target.gainPlayerCard("hej", source, true);
										player.addExpose(0.1);
										break;
								}
							}
							"step 7"
							target = event.target;
							source = event.source;
							suits = new Set();
							cards1 = player.getExpansions("sup_beige");
							for (var i of cards1) {
								suits.add(get.suit(i, player));
							}
							if (suits.has(event.judgeResult.suit) && event.judgeResult.suit == "club") {
								if (source && source.isIn() && source.countCards("hej") > 0) player.gainPlayerCard("hej", source, true);
							}
							"step 8"
							event.num++;
							// game.log(event.num , event.total,event.num < event.total)
							if (event.num < event.total) event.goto(4);
							"step 9"
							event.num1++;
							//game.log(event.num1, trigger.num, trigger.name);
							if (event.num1 < trigger.num && trigger.name != "dying") event.goto(1);
						},
						subSkill:{
							hm:{
								mod:{
									ignoredHandcard:function(card,player){
										if(card.hasGaintag('sup_beige')){
											return true;
										}
									},
									cardDiscardable:function(card,player,name){
										if(name=='phaseDiscard'&&card.hasGaintag('sup_beige')){
											return false;
										}
									},
								},
							}
						}
					},
					"sup_duanchang": {
						audio: 2,
						audioname: ["re_caiwenji", "ol_caiwenji"],
						trigger: {
							player: "dying"
						},
						forced: true,
						forceDie: true,
						locked: true,
						// skillAnimation: true,
						// animationColor: "gray",
						filter: function (event, player) {
							return event.source && event.source.isIn() && !player.storage.sup_duanchang_pArray.includes(event.source);
						},
						init: function (p) {
							p.storage.sup_duanchang_pArray = [];
						},
						content: function () {
							trigger.source.addSkill("sup_duanchang_baiban");
							player.storage.sup_duanchang_pArray.push(trigger.source);
						},
						logTarget: "source",
						ai: {
							"maixie_defend": true,
							threaten: function (player, target) {
								if (target.hp == 1) return 0.2;
								return 1.5;
							},
							effect: {
								target: function (card, player, target, current) {
									if (!target.hasFriend()) return;
									if (target.hp <= 1 && get.tag(card, "damage")) {
										if (player.hasSkillTag("jueqing", false, target)) return 3;
										return [1, 0, 0, -3 * get.threaten(player)];
									}
								}
							}
						},
						group: ["sup_duanchang_removeBaiBan"],
						subSkill: {
							removeBaiBan: {
								trigger: {
									global: "roundStart"
								},
								direct: true,
								content: function () {
									for (let p of player.storage.sup_duanchang_pArray) {
										p.removeSkill("sup_duanchang_baiban");
									}
									player.storage.sup_duanchang_pArray = [];
								}
							},
							baiban: {
								init: function (player, skill) {
									player.addSkillBlocker(skill);
								},
								onremove: function (player, skill) {
									player.removeSkillBlocker(skill);
								},
								charlotte: true,
								skillBlocker: function (skill, player) {
									return skill !== "sup_duanchang_baiban"&&!lib.skill[skill].charlotte;
								},
								mark: true,
								intro: {
									content: function (storage, player, skill) {
										var list = player.getSkills(null, false, false).filter(function (i) {
											return lib.skill.sup_duanchang_baiban.skillBlocker(i, player);
										});
										if (list.length) return "失效技能：" + get.translation(list);
										return "无失效技能";
									}
								},
								"_priority": 0
							}
						}
					},
					"sup2_yongsi": {
						audio: "ext:超界Ⅱ期:2",
						group: ["sup2_yongsi_1", "sup2_yongsi_2"],
						locked: true,
						subSkill: {
							"1": {
								audio: "drlt_yongsi",
								trigger: {
									player: "phaseDrawBegin2"
								},
								forced: true,
								filter: function (event, player) {
									return !event.numFixed;
								},
								content: function () {
									trigger.num += game.countPlayer();
								},
								sub: true,
								"_priority": 0
							},
							"2": {
								audio: "drlt_yongsi",
								trigger: {
									player: "phaseUseEnd"
								},
								forced: true,
								filter: function (event, player) {
									var num = 0;
									player.getHistory("sourceDamage", function (evt) {
										if (evt.getParent("phaseUse") == event) num += evt.num;
									});
									return !num || num > 1;
								},
								content: function () {
									var numx = 0;
									player.getHistory("sourceDamage", function (evt) {
										if (evt.getParent("phaseUse") == trigger) numx += evt.num;
									});
									if (!numx) {
										var num = player.hp - player.countCards("h");
										if (num > 0) player.draw(num);
									} else {
										player.addTempSkill("drlt_yongsi1", { player: "phaseDiscardAfter" });
									}
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"sup2_weidi": {
						audio: "ext:超界Ⅱ期:2",
						forceaudio: true,
						unique: true,
						zhuSkill: false,
						trigger: {
							player: "phaseDiscardBegin"
						},
						direct: true,
						filter: function (event, player) {
							//if(!player.hasZhuSkill('drlt_weidi')) return false;
							return (
								player.needsToDiscard() > 0 &&
								game.countPlayer(function (current) {
									return current != player && current.group != "qun555";
								}) > 0
							);
						},
						content: function () {
							"step 0"
							var num = Math.min(
								player.needsToDiscard(),
								// game.countPlayer(function (target) {
								// 	return target != player; //&&target.group=='qun';
								// })
							);
							if (num) {
								player.chooseCardTarget({
									prompt: get.prompt("sup2_weidi"),
									prompt2:
										"你可以将" +
										(num > 1 ? "至多" : "") +
										get.cnNumber(num) +
										"张手牌交给等量的其他角色。先按顺序选中所有要给出的手牌，然后再按顺序选择等量的目标角色",
									selectCard: [1, num],
									selectTarget: function () {
										return 1;
										return ui.selected.cards.length;
									},
									filterTarget: function (card, player, target) {
										return target != player; //&&target.group=='qun';
									},
									complexSelect: true,
									filterOk: function () {
										return ui.selected.cards.length > 0 && ui.selected.targets.length == 1;
									},
									ai1: function (card) {
										var player = _status.event.player;
										var value = get.value(card, player, "raw");
										if (
											game.hasPlayer(function (target) {
												return (
													target != player &&
													target.group != "qun555" &&
													!ui.selected.targets.includes(target) &&
													get.sgn(value) == get.sgn(get.attitude(player, target))
												);
											})
										)
											return 1 / Math.max(1, get.useful(card));
										return 0.5;
									},
									ai2: function (target) {
										var player = _status.event.player;
										var card = ui.selected.cards[ui.selected.targets.length];
										//if(card&&get.value(card,player,'raw')<0) return -get.attitude(player,target);
										return get.attitude(player, target);
									}
								});
							} else event.finish();
							"step 1"
							if (result.bool && result.cards.length > 0) {
								var list = [];
								for (var i = 0; i < result.targets.length; i++) {
									var target = result.targets[i];
									var card = result.cards[i];
									list.push([target, card]);
								}
								player.logSkill("drlt_weidi", result.targets);
								game
									.loseAsync({
										gain_list: list,
										player: player,
										cards: result.cards,
										giver: player,
										animate: "giveAuto"
									})
									.setContent("gaincardMultiple");
							} else event.finish();
							"step 2"
							if (player.needsToDiscard() > 0) event.goto(0);
						},
						"_priority": 0
					},
					sup2_mashu:{
						trigger:{
							global:"phaseBefore",
							player:"enterGame",
						},
						forced:true,
						filter(event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content(){
							player.disableEquip(2);
							player.disableEquip(1);
							let cards = []
							for(let i = 0;i < 1;++i){
								var card=get.cardPile2(function(c){
									var type=get.subtype(c);
									if(!['equip4'].includes(type)) return false;
									if(cards.includes(c))return false
									return true;
								});
								cards.push(card)
								if(card){
									player.useCard(card,player)
								}
							}
						},
						mod:{
							canBeDiscarded:function(card){
								if(get.position(card)=='e'&&['equip3','equip4'].includes(get.subtype(card))) return false;
							},
							canBeGained:function(card){
								if(get.position(card)=='e'&&['equip3','equip4'].includes(get.subtype(card))) return false;
							},
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.getCards('e',c=>get.subtype(c)==='equip4').length;
							},
							cardDiscardable:function(card,player,name){
								if(get.position(card)=='e'&&['equip3','equip4'].includes(get.subtype(card))){
									return false;
								}
							},
							// cardEnabled2(card,player){
							// 	if(get.position(card)=='e'&&['equip3','equip4'].includes(get.subtype(card))){
							// 		return false;
							// 	}
							// },
						},
						"_priority":0,
						group:['sup2_mashu_use','sup2_mashu_draw','sup2_mashu_loseBefore'],
						subSkill:{
							'loseBefore':{
								trigger:{
									player:['loseBefore'],
								},
								direct:true,
								slient:true,
								filter:function(event,player){
									for(let card of event.cards){
										if(get.position(card)=='e'&&['equip3','equip4'].includes(get.subtype(card))){
											return true;
										}
									}
									return false
								},
								content(){
									trigger.cards = trigger.cards.filter(card=>!(get.position(card)=='e'&&['equip3','equip4'].includes(get.subtype(card))))
								}
							},
							'use':{
								trigger:{
									player:['useCard'],
								},
								filter:function(event,player){
									return ['equip3','equip4'].includes(get.subtype(event.card))
								},
								slient:true,
								forced:true,
								init:function(player){
									player.storage.sup2_mashu_cCardA=[]
								},
								content:function(){
									player.draw()
									var card = trigger.card
									if(player.storage.sup2_mashu_cCardA.filter(c=>get.name(c)===get.name(card)).length === 0){
										var new_card = game.createCard(card)
										new_card.discard()
										player.storage.sup2_mashu_cCardA.push(new_card)
									}
									if(get.subtype(card) === 'equip4'){
        								player.expandEquip(1);
        								player.expandEquip(4);
									}else{
        								player.expandEquip(2);
        								player.expandEquip(3);
									}
								}
							},
							'draw':{
								trigger:{
									player:"phaseDrawBegin2",
								},
								frequent:true,
								filter(event,player){
									return !event.numFixed;
								},
								async content(event,trigger,player){
									trigger.num+=player.getCards('e',c=>get.subtype(c)==='equip3').length;
								},
								ai:{
									threaten:1.3,
								},
								"_priority":0,
							},
						}
					},
					sup2_tieji:{
						shaRelated:true,
						audio:2,
						audioname:["boss_lvbu3"],
						trigger:{
							player:"useCardToPlayered",
						},
						check:function(event,player){
							return get.attitude(player,event.target)<=0;
						},
						init:function(p){
							p.storage.sup2_tieqi_pArray=[]
							p.storage.sup2_tieqi_dHArray=[]
						},
						filter:function(event,player){
							return event.card.name=='sha'&&!player.storage.sup2_tieqi_pArray.includes(event.target)
						},
						logTarget:"target",
						content:function(){
							"step 0"
							player.storage.sup2_tieqi_pArray.push(trigger.target)
							let num = player.countCards('e',c=>['equip3','equip4'].includes(get.subtype(c)))
							if(trigger.target.getCards('hej').length === 0){
								player.storage.sup2_tieqi_dHArray.push(trigger.target)
								trigger.target.addTempSkill('sup2_tieji_baiban')
								event.finish()
							}else{
								player.chooseButton([`使用其中至多${num}张牌`,trigger.target.getCards('hej')],[0,num],true)
								.set("filterButton",(button)=>{
									let card = button.link
									return player.hasUseTarget({name:get.name(card)})
								}).set('ai',button=>{
									var player=_status.event.player,card=button.link
									var val=player.getUseValue(card)+0.01;
									if(['equip3','equip4'].includes(get.subtype(card)))return 10
									return val;
								});
							}
							'step 1'
							event.cards = result.links
							let f1=event.cards.filter(c=>get.type(c)==='basic').length!==0,f2=event.cards.filter(c=>get.type(c)==='trick').length!==0
							// game.log(f1,f2,event.cards.length === 0)
							if(f1){
								player.storage.sup2_tieqi_dHArray.push(trigger.target)
							}
							if(f2){
								trigger.target.addTempSkill('sup2_tieji_baiban')
							}
							if(event.cards.length === 0){
								player.storage.sup2_tieqi_dHArray.push(trigger.target)
								trigger.target.addTempSkill('sup2_tieji_baiban')
							}
							'step 2'
							for(let c of event.cards){
								player.chooseUseTarget(true,c)
							}
						},
						group:['sup2_tieji_phaseEnd','sup2_tieji_directHit'],
						subSkill:{
							phaseEnd:{
								trigger:{
									player:"phaseEnd",
								},
								direct:true,
								slient:true,
								content(){
									player.storage.sup2_tieqi_pArray=[]
								}
							},
							directHit:{
								trigger:{
									player:"useCardToPlayered",
								},
								direct:true,
								filter:function(event,player){
									// game.log( player.storage.sup2_tieqi_dHArray.includes(event.player))
									return player.storage.sup2_tieqi_dHArray.includes(event.target)
								},
								content(){
									// game.log('boom')
									trigger.directHit.push(trigger.target);
								},
								"_priority":9684462,
							},
							baiban:{
								init: function (player, skill) {
									player.addSkillBlocker(skill);
								},
								onremove: function (player, skill) {
									player.removeSkillBlocker(skill);
								},
								charlotte: true,
								skillBlocker: function (skill, player) {
									return skill !== "sup2_tieji_baiban"&&!lib.skill[skill].charlotte;
								},
								mark: true,
								intro: {
									content: function (storage, player, skill) {
										var list = player.getSkills(null, false, false).filter(function (i) {
											return lib.skill.sup_duanchang_baiban.skillBlocker(i, player);
										});
										if (list.length) return "失效技能：" + get.translation(list);
										return "无失效技能";
									}
								},
								"_priority": 0
							}
						},
						ai:{
							ignoreSkill:true,
							skillTagFilter:function(player,tag,arg){
								if(tag=='directHit_ai'){
									return get.attitude(player,arg.target)<=0;
								}
								if(!arg||arg.isLink||!arg.card||arg.card.name!='sha') return false;
								if(!arg.target||get.attitude(player,arg.target)>=0) return false;
								if(!arg.skill||!lib.skill[arg.skill]||lib.skill[arg.skill].charlotte||get.is.locked(arg.skill)||!arg.target.getSkills(true,false).includes(arg.skill)) return false;
							},
							"directHit_ai":true,
						},
						"_priority":9684463,
					}
				},
				translate: {
					"sup2_lianying": "连营",
					"sup2_lianying_info": "当你失去牌时，你可以摸一张牌。",
					"sup2_fangzhu": "放逐",
					"sup2_fangzhu_info": "当你即将受到伤害时，你可令至多X名角色摸X张牌（X为你已损失的体力值+即将受到的伤害），然后这些角色依次将武将牌翻面。",
					"sup2_xingshang": "行殇",
					"sup2_xingshang_info": "当其他角色死亡后，你可以回复2点体力并获得其所有牌，然后你受到1点无来源伤害。",
					"sup2_kuanggu": "狂骨",
					"sup2_kuanggu_info": "当你造成1点伤害后，你可以回复1点体力（若你未受伤则改为获得1点护甲）并摸随机1-2张牌，然后你本回合可以额外使用一张【杀】。",
					"sup2_qimou": "奇谋",
					"sup2_qimou_info": "限定技，出牌阶段，你可以失去1点体力上限，然后对自己造成至多X点伤害并失去等量体力（X为你当前体力值与护甲值总和）。",
					"sup_beige": "悲歌",
					"sup_beige_info":
						"①当有角色受到1点伤害或进入濒死状态后，你可将任意张花色各不相同且与“歌”的花色各不相同的手牌置于武将牌上，称为“歌”，然后令其进行X次判定（X为你“歌”的数量）。对于每次判定结果，若判定结果花色存在于“歌”中：若受伤角色不为你则其获得对应花色的“歌”，然后根据花色执行以下的一个选项：<br>♥:你与其各回复1点体力<br>♦:你与其各摸2张牌<br>♣:你与其各获得伤害来源区域内的1张牌<br>♠:伤害来源将武将牌翻至背面朝上<br>②场上角色从“歌”中获得的牌不计入手牌上限。",
					"sup_duanchang": "断肠",
					"sup_duanchang_info": "锁定技，令你进入濒死阶段的角色当前的所有技能失效。一轮游戏开始时，你恢复场上以此法失效的技能。",
					"sup2_yongsi": "庸肆",
					"sup2_yongsi_info":
						"锁定技，摸牌阶段，你额外摸X张牌（X为当时场上人数）；出牌阶段结束时，若你本回合：1.没有造成伤害，将手牌摸至当前体力值；2.造成的伤害超过1点，本回合手牌上限改为已损失体力值。",
					"sup2_weidi": "伪帝",
					"sup2_weidi_info":
						"弃牌阶段开始时，若你的手牌数大于手牌上限，则你可以将至多X张手牌交给1名其他角色。然后若X大于0，你可重复此流程（X为你的手牌数与手牌上限之差）。",
					'sup2_tieji':"铁骑",
					'sup2_tieji_info':"每回合每名角色限1次。当你使用【杀】指定一名角色为目标时，你可以观看其区域内的牌并选择其中至多X张使用之（X为你坐骑栏内的牌数量）。若你以此法选择：基本牌：其无法响应你使用的牌直到回合结束；锦囊牌：其所有技能失效直到回合结束。若你未选择任何牌，你依次令其获得以上两种效果。",
					"sup2_mashu":"马术",
					"sup2_mashu_info":
						"①游戏开始时，你废除你的武器栏与防具栏并使用牌堆中的1张进攻坐骑牌。<br>②当你使用坐骑牌时，你摸一张牌并复制一张相同的坐骑牌置入弃牌堆（复制牌每种牌名限一次）。若此牌为进攻/防御坐骑牌，你获得一个额外的武器栏与进攻马栏/防具栏与防御马栏。<br>③你坐骑栏内的牌无法被其他角色弃置或获得。<br>④摸牌阶段你摸牌数+X，出牌阶段你可以额外使用Y张【杀】（X/Y为你的装备栏的防御马/进攻马数量）。"
				}
			},
			intro: "",
			author: "喵喵",
			diskURL: "",
			forumURL: "",
			version: "1.0"
		},
		files: { "character": ["sup2_luxun.jpg", "sup2_caopi.jpg", "sup2_weiyan.jpg", "sup_caiwenji.jpg"], "card": [], "skill": [], "audio": [] }
	};
});
