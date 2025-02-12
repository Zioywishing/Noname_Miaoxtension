import content from "./content.js";
import _miaoTool from "./miaoTool.js";
import miaoTool, { skillFactory } from "./miaoTool.js";
game.import("extension", function (lib, game, ui, get, ai, _status) {
	const _mt = _miaoTool(lib, game, ui, get, ai, _status);
	return {
		name: "喵喵喵喵",
		content: content(lib, game, ui, get, ai, _status),
		precontent: function () {},
		help: {},
		config: {},
		package: {
			character: {
				character: {
					"zioy_xixuegui": ["male", "qun", 4, ["zioy_xixue"], []],
					"zioy_yilong": ["female", "qun", "2/2/2", ["zioy_shiyi"], []],
					"zioy_shuijinxiezi": ["male", "qun", 3, ["zioy_jinjia", "zioy_jinsui"], []],
					"zioy_dreamaker": ["female", "jin", 4, ["zioy_chenmeng", "zioy_xiaoxiang"], []],
					"zioy_drugdoctor": ["male", "qun", 4, ["zioy_heiyi"], []],
					"zioy_zhigaotian": ["female", "shen", "6/24", ["zioy_eye", "zioy_damie"], []],
					"zioy_huajian": ["female", "jin", "3/7/4", ["zioy_huashou", "zioy_longyue"], []],
					"zioy_renturtle": ["male", "wei", "1/1/10", ["zioy_jike"], []],
					"zioy_shenxianxiang": ["female", "shu", "3/4/2", ["zioy_happyNewYear"], ["des:新春特典"]],
					"zioy_yinlong": ["male", "wu", 4, ["zioy_qianlong", "zioy_jianlong", "zioy_kanglong2"], ["des:新春特典"]],
					"zioy_peiki": ["male", "shu", 3, ["zioy_yixiang", "zioy_chuixing", "zioy_yuyan"], ["des:新春特典"]],
					"zioy_xielingyun": ["female", "daqin", "3/5", ["zioy_zhijin", "zioy_xuanzhuan"], []],
					"zioy_chuxi": ["male", "qun", 5, ["zioy_leiye1", "zioy_mosha", "zioy_shuangsha", "zioy_lieying"], ["des:新春特典"]],
					"zioy_sose": ["male", "wei", "1/1/7", ["zioy_wrjzc", "zioy_zsyhj"], ["des:新春特典"]],
					"zioy_pqsj": ["none", "qun", 1, ["zioy_weixiang"], []],
					"zioy_nianshou": ["none", "shu", 1, ["zioy_fansheng", "zioy_nianxi"], ["des:新春特典"]],
					"zioy_jinu": ["none", "qun", 3, ["zioy_jifou"], []],
					"zioy_xiaozhenhe": ["male", "wei", 3, ["zioy_liubo", "zioy_shuiyue"], []],
					"zioy_gaiying": [null, null, "3/3/2", ["zioy_moying", "zioy_yingdun", "zioy_jianying"], ["hiddenSkill"]],
					"zioy_diana": ["female", "wei", 4, ["zioy_yuexiang", "zioy_douzhuan"], ["forbidai"]],
					"zioy_senjianmeng": ["female", "jin", "2/9/3", ["zioy_xiantong", "zioy_xiane"], []],
					"zioy_yenglish": ["male", "wei", "4/6", ["zioy_wuya", "zioy_sheji", "zioy_puai"], []],
					"zioy_xingjun": ["male", "qun", 5, ["zioy_xingchi"], []],
					"zioy_titan": ["male", "wu", "4/4/4", ["zioy_cangzhen"], []],
					"zioy_alps": ["female", "jin", 5, ["zioy_shangqin", "zioy_hanshou"], ["hiddenSkill"]],
					"zioy_xukongchong": ["female", "jin", 5, ["zioy_longzi", "zioy_yingyuan"], ["hiddenSkill"]],
					"zioy_muxi": ["female", "jin", "-3/3", ["zioy_shuohui"], []],
					"zioy_kailuer": ["female", "qun", 4, ["zioy_hey", "zioy_ya", "zioy_ha"], []],
					"zioy_nike": ["none", "shen", 6, ["zioy_cuiyi", "zioy_shihong", "zioy_huangyi", "zioy_shulin"], []],
					"zioy_bailu": ["female", "shen", 2, ["zioy_hexuchongxiang", "zioy_yuezhuiyunwei"], ["forbidai"]],
					test: ["male", "", 3, ["zioy_t"], []],
					"zioy_lanchesite": ["none", "shu", "4/4/1", ["zioy_yujin", "zioy_xumie"], []],
					"zioy_b7chuhaoji": ["female", "qun", 3, ["zioy_v07yuxie", "zioy_f42chongzai"], []],
					"zioy_badun": ["male", "qun", "8/8/8", ["zioy_yuemai"], []],
					"zioy_nemesis": ["female", "wu", "4/7", ["zioy_pinghuqiuyue", "zioy_yurangzhijian", "zioy_liechenyuyou_water"], []],
					"zioy_osiris": ["male", "shu", 5, ["zioy_zhuxingwuchang", "zioy_zhufashengmie", "zioy_yongyeqingxiao", "zioy_liechenyuyou_fire"], []],
					"zioy_morana": ["female", "jin", 5, ["zioy_lanzhiyuane", "zioy_liuzhenxiongxiang", "zioy_yinhuxiaowu"], ["hiddenSkill"]],
					"zioy_guanghan": ["female", "wu", "2/9", ["zioy_nongying", "zioy_chanjuan"], ["des:2023中秋"]],
					"zioy_xuanhu": ["male", "wei", 1, ["zioy_leimingqiangu", "zioy_zhoumingchuanxuan"], []],
					"zioy_xiyueying": ["double", "shen", 4, ["zioy_riyuexingkong"], []],
					"zioy_purangsigai": ["none", "wu", 4, ["zioy_jisuishengjin"], ["des:plus黄盖"]],
					"zioy_bidu": ["female", "jin", "3/14/2", ["zioy_biubiubiu"], []],
					"zioy_dacongming": ["male", "qun", "6/6/6", ["zioy_shoufa"], ["des:聪明手法的角色"]],
					"zioy_exchel": ["female", "wei", "3/4", ["zioy_liwuyaomiao", "zioy_zhifenghuifang", "zioy_liechenyuyou_wood"], []],
					"zioy_sushuang": ["male", "wei", "4/5/1", ["zioy_jietian", "zioy_yunshuang"], []],
					"zioy_kaixier": ["female", "qun", "2/4/3", ["zioy_helu"], []],
					"zioy_ji1": ["male", "jin", "3", ["zioy_shimeng", "zioy_heimeng"], ["hiddenSkill"]],
					"zioy_tianqi": ["female", "daqin", "2", ["zioy_junling", "zioy_junming", "zioy_junci", "zioy_junnu", "zioy_junyun"], ["hiddenSkill"]],
					"zioy_pangxian": [
						"female",
						"shu",
						"20/24",
						["zioy_zhu", "zioy_bian1", "zioy_bian2", "zioy_bian3", "zioy_bian4", "zioy_gui"],
						["des:新春特典.2024<br>春风又绿江南岸"]
					],
					"zioy_guanyu_cai": ["male", "shu", "6", ["zioy_zhaocai", "zioy_jinbao"], []],
					"zioy_zhi": ["female", "shu", "3/6", ["zioy_yuansi", "zioy_yuanshen"], []],
					zioy_jingwu: ["female", "shu", "1/3/5", ["zioy_que"], []],
					zioy_sanjijie: ["male", "qun", "3/3/3", ["zioy_fouzhiyu", "zioy_ningguxi"], []],
					zioy_yuze: ["none", "wei", "2", ["zioy_juhun"], []],
					zioy_luosa: ["male", "wu", "4", ["zioy_minchao", "zioy_kuangyong"]],
					zioy_gold: ["male", "qun", 5, ["zioy_shihunzhuo","zioy_nuhuangfeng","zioy_duwenlei"]],
					zioy_hezhe: ["male", "qun", 4, ["zioy_yuekong", "zioy_tanxi", "zioy_gengyi"]],
					zioy_fanbunusi: ["none", "wei", 4, ['zioy_youxia', 'zioy_changai']],
					zioy_fukeleide: ["male", "qun", "4/5/1", ['zioy_ji_jiyue', 'zioy_ji_jidian']],
					zioy_kongwu: ["male", "qun", "0/0", ['zioy_kong', 'zioy_wu']],
					zioy_buluohong: ["male", "shu", "3", ['zioy_chiqi', 'zioy_aici', 'zioy_zongwanqianshenglingshengmie']],
					zioy_lingfeng: ["female", "qun", "4", ['zioy_bolian', 'zioy_fengzhen'], ["des:新春特典.2025<br>旧景无再故人还"]],
					zioy_huahuo: ["female", "shu", "2/5/2", ['zioy_shenji', 'zioy_huahuo'], ["des:新春特典.2025<br>旧景无再故人还"]],
					zioy_si: ["female", "wu", "20/25", ['zioy_tiangongkaiwu', 'zioy_tianqiaonianchai'], ["des:新春特典.2025<br>旧景无再故人还"]],
				},
				translate: {
					"zioy_xixuegui": "弗拉基米尔",
					"zioy_yilong": "岩龙",
					"zioy_shuijinxiezi": "斯卡纳",
					"zioy_dreamaker": "长野原神乐",
					"zioy_drugdoctor": "摆渡人",
					"zioy_zhigaotian": "至高天",
					"zioy_huajian": "今春花见",
					"zioy_renturtle": "忍龟",
					"zioy_shenxianxiang": "神仙香",
					"zioy_yinlong": "胤龙",
					"zioy_peiki": "派琦",
					"zioy_xielingyun": "谢灵运",
					"zioy_chuxi": "除夕",
					"zioy_sose": "SO-SE",
					"zioy_pqsj": "皮丘什金",
					"zioy_nianshou": "年",
					"zioy_jinu": "祭奴",
					"zioy_xiaozhenhe": "肖郑鹤",
					"zioy_gaiying": "该隐",
					"zioy_diana": "黛安娜",
					"zioy_senjianmeng": "森见梦",
					"zioy_yenglish": "英格力士",
					"zioy_xingjun": "行钧",
					"zioy_titan": "泰坦",
					"zioy_alps": "阿尔卑斯",
					"zioy_xukongchong": "虚空虫王",
					"zioy_muxi": "暮曦",
					"zioy_kailuer": "凯璐儿",
					"zioy_nike": "籁寂",
					"zioy_bailu": "白鹭",
					test: "测试狗狗",
					"zioy_lanchesite": "兰彻斯特",
					"zioy_b7chuhaoji": "B7初号机",
					"zioy_badun": "巴顿",
					"zioy_nemesis": "涅默汐斯",
					"zioy_osiris": "奥曦里斯",
					"zioy_morana": "莫洛娜",
					"zioy_guanghan": "广寒",
					"zioy_xuanhu": "翾狐",
					"zioy_xiyueying": "曦月吟",
					"zioy_purangsigai": "普琅斯盖",
					"zioy_bidu": "别西卜",
					"zioy_dacongming": "大聪明",
					"zioy_exchel": "伊珂玺尔",
					"zioy_sushuang": "鹔鹴",
					"zioy_kaixier": "凯希儿",
					"zioy_ji1": "畸",
					"zioy_pangxian": "逄暹",
					"zioy_tianqi": "天启",
					"zioy_guanyu_cai": `财神·关羽`,
					zioy_zhi: "徵",
					zioy_jingwu: "靖芜",
					zioy_sanjijie: "三畿界",
					zioy_yuze: "羽泽",
					zioy_luosa: "罗萨",
					zioy_gold: '黄金',
					zioy_hezhe: '何者',
					zioy_fanbunusi: '罕晡努斯',
					zioy_fukeleide: '弗克雷德',
					zioy_kongwu: '空无',
					zioy_buluohong: '不落红',
					zioy_lingfeng: '凌风',
					zioy_huahuo: '花火',
					zioy_si: "巳"
				}
			},
			card: {
				card: {
					"zioy_yueguang": {
						type: "equip",
						subtype: "equip1",
						distance: {
							attackFrom: -1
						},
						vanish: true,
						skills: [],
						enable: true,
						selectTarget: -1,
						filterTarget: function (card, player, target) {
							return target == player;
						},
						modTarget: true,
						allowMultiple: false,
						content: function () {
							if (cards.length && get.position(cards[0], true) == "o") target.equip(cards[0]);
						},
						toself: true,
						fullimage: true
					}
				},
				translate: {
					"zioy_yueguang": "月光",
					"zioy_yueguang_info": "这把武器没有除攻击范围外的其他增益"
				},
				list: []
			},
			skill: skillFactory({
				skill: {
					zioy_tiangongkaiwu: {
						autoTranslate: {
							name: "天工开物",
							info: `<br>①锁定技。获得此技能时废除你所有的装备栏。防止你恢复装备栏与新增装备栏。你无法使用装备牌。<br>②游戏开始时，你获得场上所有的装备牌。<br>③出牌阶段，你可以将你区域内的所有装备牌移出游戏，失去1点体力上限并获得其效果。<br>④锁定技。摸牌阶段，你额外摸X张牌。（X为log2(你以此法移出游戏的装备牌数量) + 1且向下取整）`
						},
						enable: "phaseUse",
						useable: Infinity,
						mod:{
							cardEnabled(card){
								if(get.type(card)=='equip') return false;
							},
							globalFrom:function (from, to, current) {
								return current + from.storage.zioy_tiangongkaiwu_distance.globalFrom;
							},
							globalTo:function (from, to, current) {
								return current + to.storage.zioy_tiangongkaiwu_distance.globalFrom;
							},
							attackFrom:function (from, to, current) {
								return current + from.storage.zioy_tiangongkaiwu_distance.attackFrom;
							},
						},
						locked: true,
						mark: true,
						marktext:"天工",
						intro:{
							content:"expansion",
							markcount:"expansion",
						},
						init: function (player) {
							player.storage.zioy_tiangongkaiwu_cards = []
							player.storage.zioy_tiangongkaiwu_distance = {
								globalTo: 0,
								globalFrom: 0,
								attackFrom: 0,
							}
							var list=[];
							for(var i=1;i<6;i++){
								for(var j=0;j<player.countEnabledSlot(i);j++){
									list.push(i);
								}
							}
							player.disableEquip(list);
							player.expandEquip = () => new Promise(_ => _())
							player.enableEquip = () => new Promise(_ => _())
						},
						filter(event, player){
							return player.getCards('h').filter(c => get.type(c) == "equip").length;
						},
						// filterCard: (card, player) => {
						// 	return get.type(card) == "equip";
						// },
						async content(event, trigger, player){
							const cards = player.getCards('hej').filter(c => get.type(c) == "equip");
							for(const card of cards){
								player.storage.zioy_tiangongkaiwu_cards.push(card);
								player.addToExpansion(card).gaintag.add('zioy_tiangongkaiwu');
								// console.log({card});
								const cinfo = lib.card[card.name]
								if(cinfo?.distance){
									player.storage.zioy_tiangongkaiwu_distance.globalTo += cinfo.distance.globalTo || 0;
									player.storage.zioy_tiangongkaiwu_distance.globalFrom += cinfo.distance.globalFrom || 0;
									player.storage.zioy_tiangongkaiwu_distance.attackFrom += cinfo.distance.attackFrom || 0;
								}
								if(cinfo?.skills){
									for(const skill of cinfo.skills){
										player.addSkill(skill);
									}
								}
								player.loseMaxHp(1)
							}
						},
						autoSubSkill: {
							gain: {
								trigger:{
									global:"phaseBefore",
									player:"enterGame",
								},
								filter:function(event,player){
									return (event.name!='phase'||game.phaseNumber==0)
								},
								forced: true,
								async content(event, trigger, player){
									const ecards = game.players.reduce((c, p) => {
										return [...c, ...p.getCards('hej').filter(c => get.type(c) == "equip")]
									}, [])
									// console.log(ecards);
									for(const card of ecards){
										player.gain(card)
									}
								}
							},
							draw: {
								trigger:{
									player:"phaseDrawBegin2",
								},
								filter:function(event,player){
									return true
								},
								forced: true,
								async content(event, trigger, player){
									const count = player.getExpansions('zioy_tiangongkaiwu').length;
									// console.log(count);
									trigger.num += Math.floor(Math.log2(count)) + 1;
								}
							}
						},
						ai: {
							order: 9,
							result: {
								player: 2
							},
							threaten: 1
						},
						_priority: 1,
					},
					zioy_tianqiaonianchai: {
						autoTranslate: {
							name: "天巧拈钗",
							info: `限定技。出牌阶段，你可以获得场上的所有装备牌。`
						},
						enable: "phaseUse",
						limit: true,
						skillAnimation: true,
						animationColor: "soil",
						check: function (event, player) {
							return game.players.filter(p=>p !== player).reduce((c, p) => {
								return [...c,...p.getCards('hej').filter(c => get.type(c) == "equip")]
							}, []).length - game.players.length;
						},
						async content(event, trigger, player){
							player.awakenSkill('zioy_tianqiaonianchai');
							const ecards = game.players.reduce((c, p) => {
								return [...c,...p.getCards('hej').filter(c => get.type(c) == "equip")]
							}, [])
							for(const card of ecards){
								player.gain(card)
							}
						},
						ai: {
							order: 2,
							result: {
								player: (player) => {
									return game.players.filter(p=>p !== player).reduce((c, p) => {
										return [...c,...p.getCards('hej').filter(c => get.type(c) == "equip")]
									}, []).length - game.players.length;
								}
							},
							threaten: 1
						},
						_priority: 1456,
					},
					"zioy_xixue": {
						enable: "phaseUse",
						usable: 1,
						check: function () {
							return true;
						},
						filterCard: true,
						filterTarget: function (card, player, target) {
							if (game.roundNumber >= player.storage.lastRoundNum + 2) return true;
							//if(target.storage.last == 3) return false;
							return player.storage.last != target && player != target;
						},
						content: function () {
							player.storage.last = target;
							player.storage.lastRoundNum = game.roundNumber;
							target.loseHp();

							player.recover();
							player.update();
						},
						ai: {
							order: 9,
							result: {
								target: function (player, target) {
									return target.hp - target.maxHp - 1;
									return get.damageEffect(target, player);
								},
								player: 1
							},
							threaten: 2
						},
						"_priority": 0
					},
					"zioy_shiyi": {
						mod: {
							globalTo: function (from, to, distance) {
								return distance + to.hujia;
							},
							globalFrom: function (from, to, distance) {
								return distance - from.hujia;
							},
							maxHandcardBase: function (player, num) {
								return player.hujia + num;
							}
						},
						trigger: {
							source: "damageBegin4"
						},
						filter: function (event, player) {
							return true;
						},
						forced: true,
						content: function () {
							player.changeHujia(trigger.num);

							//player.update();
						},
						ai: {
							damageBonus: true
						},
						"_priority": 0
					},
					"zioy_jinjia": {
						trigger: {
							global: "roundStart"
						},
						filter: function (card, player, target) {
							//if(target.storage.last == 3) return false;
							return !player.hujia;
						},
						direct: true,
						content: function () {
							player.changeHujia(2);
						},
						"_priority": 0
					},
					"zioy_jinsui": {
						enable: "phaseUse",
						check: function () {
							return true;
						},
						filter: function (card, player, target) {
							//if(target.storage.last == 3) return false;
							return player.hujia;
						},
						filterTarget: function (card, player, target) {
							//if(target.storage.last == 3) return false;
							return player != target && player != target;
						},
						content: function () {
							target.storage.jss = player;
							target.addTempSkill("zioy_jinsui2");
							player.hujia = 0;
							player.update();
						},
						"_priority": 0
					},
					"zioy_jinsui2": {
						trigger: {
							player: "damageEnd"
						},
						direct: true,
						content: function () {
							/*target.storage.jss.recover();
target.storage.jss.draw();
target.storage.jss.changeHujia(1);
*/ player.turnOver();
						},
						"_priority": 0
					},
					"zioy_chenmeng": {
						trigger: {
							global: "damageEnd"
						},
						marktext: "尘",
						intro: {
							name: "尘梦",
							content: "mark",
							onunmark: true
						},
						init: function (player) {
							player.storage.cmnum = 0;
						},
						forced: true,
						filter: function (event, player) {
							return event.source && !event.source.hasSkill("zioy_chenmeng1") && event.source != player;
						},
						content: function () {
							player.gainMaxHp();
							trigger.source.loseMaxHp();
							player.storage.cmnum++;
							trigger.source.storage.chenmengsource = player;
							trigger.source.addSkill("zioy_chenmeng1");
							trigger.source.addMark("zioy_chenmeng");
						},
						"_priority": 0
					},
					"zioy_chenmeng1": {
						trigger: {
							player: "damageEnd"
						},
						filter: function (event, player) {
							return event.source == player.storage.chenmengsource;
						},
						forced: true,
						content: function () {
							player.gainMaxHp();
							player.storage.chenmengsource.loseMaxHp();
							player.storage.chenmengsource.recover();
							player.loseHp();
							player.storage.chenmengsource.cmnum--;
							player.removeSkill(event.name);
							player.removeMark("zioy_chenmeng");
							player.storage.chenmengsource.gainPlayerCard(true, player, "h");
						},
						"_priority": 0
					},
					"zioy_minjian": {
						trigger: {
							global: "roundStart"
						},
						content: function () {
							"step 0"
							player
								.chooseTarget(() => true, get.prompt(event.name), true)
								.set("ai", function (target) {
									// return 1
									return get.attitude(_status.event.player, target);
								});
							"step 1"
							if (result && result.bool) {
								let target = result.targets[0];
								let num = game.roundNumber;
								// game.log(target,num)
								target.gainMaxHp(num);
								// target.recover(num)
								if (player.storage.minjian_lastTarget !== undefined) {
									player.storage.minjian_lastTarget.loseMaxHp(num);
								}
								player.storage.minjian_lastTarget = target;
							}
						}
					},
					"zioy_eye": {
						trigger: {
							source: "damageBegin4"
						},
						locked: true,
						forced: true,
						charlotte: true,
						filter: function (event, player) {
							return true;
						},
						content: function () {
							// trigger.cancel()
							// trigger.player.loseHp()
							trigger.player.gainMaxHp(2 * trigger.num);
							player.loseMaxHp(2 * trigger.num);
						},
						"_priority": 0,
						group: ["zioy_eye_player", "zioy_eye_draw", "zioy_eye_draw_dying", "zioy_eye_draw_loseMaxHp1", "zioy_eye_draw_loseMaxHp2"],
						subSkill: {
							player: {
								trigger: {
									player: "damageBegin4"
								},
								locked: true,
								forced: true,
								charlotte: true,
								filter: function (event, player) {
									return event.source;
								},
								content: function () {
									// trigger.cancel()
									// trigger.player.loseHp()
									trigger.source.gainMaxHp(2 * trigger.num);
									player.loseMaxHp(2 * trigger.num);
								}
							},
							draw: {
								trigger: {
									global: "changeHp"
								},
								forced: true,
								charlotte: true,
								filter: (event, player) => {
									// game.log(event.getParent().name)
									return event.getParent().name !== "damage" && event.getParent().name !== "recover";
								},
								content: function () {
									"step 0"
									event.num = trigger.getParent().num;
									"step 1"
									player.draw(1);
									player.recover();
									"step 2"
									event.num--;
									if (event.num > 0) event.goto(1);
								}
							},
							draw_dying: {
								trigger: {
									global: "dying"
								},
								forced: true,
								charlotte: true,
								filter: (event, player) => {
									return event.player !== player;
								},
								content: function () {
									// 'step 1'
									player.draw(1);
									player.recover();
								}
							},
							draw_loseMaxHp1: {
								trigger: {
									global: "loseMaxHpBefore"
								},
								forced: true,
								charlotte: true,
								filter: (event, player) => true,
								content: function () {
									// game.log(trigger.player.hp)
									trigger.player.eye_hp = trigger.player.hp;
								}
							},
							draw_loseMaxHp2: {
								trigger: {
									global: "loseMaxHpEnd"
								},
								forced: true,
								charlotte: true,
								filter: (event, player) => {
									// game.log(event.player,event.player.eye_hp)
									return event.player.eye_hp !== undefined;
								},
								content: function () {
									"step 0"
									event.num = 0;
									if (trigger.player.eye_hp > trigger.player.hp) {
										event.num = trigger.player.eye_hp - trigger.player.hp;
										// player.draw(trigger.player.eye_hp - trigger.player.hp)
									}
									delete trigger.player.eye_hp;
									if (event.num <= 0) {
										event.finish();
									}
									"step 1"
									player.draw(1);
									player.recover();
									"step 2"
									event.num--;
									if (event.num > 0) event.goto(1);
								}
							}
						}
					},
					"zioy_damie": {
						usable: 24,
						skillAnimation: "epic",
						animationColor: "fire",
						audio: 2,
						enable: "phaseUse",
						// limited:true,
						line: "fire",
						filter: function (event, player) {
							// return player.getDamagedHp() > 0
							return true;
						},
						content: function () {
							"step 0"
							player.storage.isDamie = true;
							// player.awakenSkill(event.name)
							event.p = player;
							"step 1"
							if (event.p.getDamagedHp() > 0) {
								player.line(event.p);
								event.p.loseHp(event.p.getDamagedHp());
							}
							"step 2"
							if (event.p.isAlive() || 1) {
								event.p = event.p.next;
								if (event.p !== player) {
									event.goto(1);
								}
							}
							"step 3"
							let hp = 4,
								mhp = 24;
							// if(player.hp > hp){
							// 	player.loseHp(player.hp-hp)
							// }else{
							// 	player.recover(hp-player.hp)
							// }
							player.storage.isDamie = false;
							if (player.maxHp > mhp) {
								player.loseMaxHp(player.maxHp - mhp);
							} else {
								player.gainMaxHp(mhp - player.maxHp);
							}
						},
						group: ["zioy_damie_banRecover"],
						subSkill: {
							banRecover: {
								trigger: {
									global: "recoverBefore"
								},
								direct: true,
								filter: (event, player) => {
									return player.storage.isDamie === true;
								},
								content: function () {
									trigger.cancel();
								}
							}
						},
						ai: {
							order: 10086,
							result: {
								player: function (player) {
									return player.hp - player.getDamagedHp();
									var num = 0,
										players = game.filterPlayer();
									for (var i = 0; i < players.length; i++) {
										var att = get.attitude(player, players[i]);
										if (players[i] === player) att = 3;
										num -= att * players[i].getDamagedHp();
									}
									return num;
								}
							}
						}
					},
					"zioy_eye_old": {
						trigger: {
							source: "damageBefore"
						},
						forced: true,
						charlotte: true,
						filter: function (event, player) {
							return event.player != player;
						},
						content: function () {
							trigger.cancel();
							trigger.player.hp -= trigger.num;
							trigger.player.maxHp -= trigger.num;
							trigger.player.update();
							if (trigger.player.hp <= 0) trigger.player.dying();
							player.line(trigger.player, "red");
						},
						"_priority": 0
					},
					"zioy_damie_old": {
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return game.dead.length > 0;
						},
						forced: true,
						check: function (trigger) {
							return trigger.hasSkill("test_control1");
						},
						content: function () {
							"step 0"
							player
								.chooseTarget(1, true, "抹除一名角色的体力", function (card, player, target) {
									return target != player;
								})
								.set("ai", function (target) {
									var player = _status.event.player;
									return -1;
								});
							"step 1"
							target = result.targets[0];
							target.hp = 0;
							target.maxHp = 0;
							target.update();
						},
						ai: {
							order: 8,
							result: {
								target: function (player, target) {
									if (ui.selected.targets.length == 0) {
										return -3;
									} else {
										return get.effect(target, { name: "juedou" }, ui.selected.targets[0], target);
									}
								}
							},
							expose: 0.4,
							threaten: 3
						},
						"_priority": 0
					},
					"zioy_heiyi": {
						trigger: {
							target: "shaBefore"
						},
						priority: 15,
						filter: function (event, player) {
							return true;
						},
						direct: true,
						derivation: ["zioy_duyi"],
						content: function () {
							/*player.draw();
if(trigger.player == player)trigger.target.addSkill('zioy_duyi');
else */ trigger.player.addSkill("zioy_duyi");
						},
						ai: {
							"maixie_defend": true,
							expose: 0.4
						},
						"_priority": 1500
					},
					"zioy_duyi": {
						trigger: {
							player: "phaseBegin"
						},
						logTarget: "player",
						filter: function () {
							return true;
						},
						direct: true,
						content: function () {
							if (player.hp != 1) player.loseHp();
							else player.loseMaxHp();
						},
						"_priority": 0
					},
					"zioy_eji": {
						"_priority": 0
					},
					"zioy_huashou": {
						trigger: {
							player: "phaseBegin"
						},
						logTarget: "player",
						filter: function () {
							return true;
						},
						direct: true,
						intro: {
							name: "花狩",
							content: "mark",
							onunmark: true
						},
						content: function () {
							//player.draw();
							var targets = game.players;
							var ts1 = [];
							var ts2 = [];
							//var p = player.identity;
							//if(p == 'zhu') p = 'zhong';
							for (var i = 0; i < targets.length; ++i) {
								//if(targets[i].identity == p) return false;
								if (get.distance(player, targets[i], "attack") <= 1 && get.attitude(player, targets[i]) <= 0) {
									ts2.push(targets[i]);
								}
								if (get.attitude(player, targets[i]) <= 0 /*|| get.attitude(targets[i],player)<=0*/) {
									ts1.push(targets[i]);
								}
							}
							var target = ts1.randomGet();
							//if(ts2.length > 0) target = ts2.randomGet();
							player.logSkill(event.name, target);
							var arr = target.getCards("hej");
							//player.draw();
							var n = arr.length;
							var cards = [];
							while (n) {
								var i = Math.floor(Math.random() * n--);
								cards.push(arr.splice(i, 1)[0]);
							}
							var l = cards.length;
							while (l % 3 != 0) l--;
							var sum = l / 3;
							while (sum > 0) {
								cards.splice(0, 1);
								sum--;
								l--;
							}
							player.line(target, "red");
							target.addToExpansion(cards, "giveAuto", target).gaintag.add("zioy_huashou2");
							target.addTempSkill("zioy_huashou2");
							target.storage.huashouSource = player;
						},
						"_priority": 0
					},
					"zioy_huashou2": {
						trigger: {
							global: "phaseEnd"
						},
						group: ["zioy_huashou3"],
						forced: true,
						content: function () {
							var cards = player.getExpansions("zioy_huashou2");
							if (cards.length) player.gain(cards, "draw");
							player.removeSkill("zioy_huashou2");
						},
						ai: {
							effect: {
								target: function (card, player, target, current) {
									if (card.name == "sha") {
										return [1, -2];
									}
								}
							}
						},
						intro: {
							mark: function (dialog, storage, player) {
								var cards = player.getExpansions("zioy_huashou2");
								if (player.isUnderControl(true) || player.storage.huashouSource.isUnderControl(true)) dialog.addAuto(cards);
								else return "共有" + get.cnNumber(cards.length) + "张牌";
							},
							markcount: "expansion"
						},
						"_priority": 0
					},
					"zioy_huashou3": {
						trigger: {
							player: "damageEnd"
						},
						filter: function (event, player) {
							return event.source == player.storage.huashouSource;
						},
						forced: true,
						content: function () {
							"step 0"
							player.storage.huashouSource.addMark("zioy_longyue");
							if (player.storage.huashouSource.countMark("zioy_longyue") % 4 == 0) player.storage.huashouSource.gainMaxHp();
							var cards = player.getExpansions("zioy_huashou2");
							if (cards.length) player.storage.huashouSource.gain(cards, "draw");
							player.removeSkill("zioy_huashou2");
							"step 1"
							var num = player.maxHp - player.hp;
							player.damage(num, player.storage.huashouSource);
							if (parseInt(num / 2) > player.maxHp - player.hp) {
								player.changeHujia(1 - player.hujia);
							}
							player.storage.huashouSource.recover(parseInt(num / 2));
						},
						"_priority": 0
					},
					"zioy_longyue": {
						trigger: {
							player: "phaseUseBefore"
						},
						group: ["zioy_longyue2", "zioy_longyue3"],
						mod: {
							maxHandcardBase: function (player, num) {
								var n = player.countMark("zioy_longyue");
								if (n % 2 == 1) n--;

								return num + n / 2;
							},
							attackFrom: function (from, to, distance) {
								if (from.countMark("zioy_longyue") > 0 && from.getEquip("zioy_yueguang")) return distance - 1;
							}
						},
						mark: true,
						intro: {
							content: function (storage, player) {
								var info = lib.skill.zioy_longyue.getInfo(player);
								return (
									'<div class="text center"><span>已获得提升：</span><br><span>月光的攻击范围:' +
									info[0] +
									"</span><br><span>手牌上限：" +
									info[1] +
									"</span><br><span>摸牌阶段摸牌数：" +
									info[2] +
									"</span><br><span>体力上限：" +
									info[3] +
									"</span></div>"
								);
							}
						},
						getInfo: function (player) {
							if (!player.countMark("zioy_longyue")) return [0, 0, 0, 0];
							var info = [0, 0, 0, 0];
							if (player.countMark("zioy_longyue") > 0) info[0] = 1;
							var n = player.countMark("zioy_longyue");
							info[1] = parseInt(n / 2);
							info[2] = parseInt(n / 3);
							info[3] = parseInt(n / 4);
							return info;
						},
						filter: function (event, player) {
							if (player.getEquip("zioy_yueguang")) return false;
							/*for(var card of event.cards2){
   if(card == player.storage.yueguang) return true;
}
return false;*/
							return true;
						},
						init: function (player) {
							//player.addMark('zioy_longyue');
							//player.removeMark('zioy_longyue');
							//player.draw();
							//player.storage.yueguang = game.createCard('zioy_yueguang','spade',14);
							//player.equip(player.storage.yueguang);
						},
						forced: true,
						content: function () {
							//trigger.cancel();
							if (!player.storage.yueguang) {
								player.storage.yueguang = game.createCard("zioy_yueguang", "spade", 14);
							}
							player.chooseUseTarget(player.storage.yueguang, true, "nopopup");
							//player.equip(player.storage.yueguang);
						},
						"_priority": 0
					},
					"zioy_longyue2": {
						trigger: {
							global: "phaseBefore",
							player: "enterGame"
						},
						direct: true,
						unique: true,
						filter: function (event, player) {
							return event.name != "phase" || game.phaseNumber == 0;
						},
						forceunique: true,
						content: function () {
							player.addMark("zioy_longyue");
							player.removeMark("zioy_longyue");
							player.draw();
							player.storage.yueguang = game.createCard("zioy_yueguang", "spade", 14);
							//player.equip(player.storage.yueguang);
						},
						"_priority": 0
					},
					"zioy_jike": {
						trigger: {
							player: "damageAfter"
						},
						direct: true,
						filter: function (event, player) {
							return event.source && event.num > 0 && event.source != player;
						},
						content: function () {
							"step 0"
							trigger.source.damage(trigger.num);
						},
						ai: {
							"maixie_defend": true,
							effect: {
								target: function (card, player, target) {
									if (player.hasSkillTag("jueqing", false, target)) return [1, -1.5];
									if (!target.hasFriend()) return;
									if (get.tag(card, "damage")) return [1, 0, 0, -0.7];
								}
							}
						},
						"_priority": 0
					},
					"zioy_longyue3": {
						trigger: {
							player: "phaseDrawBegin2"
						},
						forced: true,
						preHidden: true,
						filter: function (event, player) {
							return !event.numFixed;
						},
						content: function () {
							var n = player.countMark("zioy_longyue");
							while (n % 3 != 0) n--;
							n /= 3;
							trigger.num = trigger.num + n;
						},
						"_priority": 0
					},
					"zioy_happyNewYear": {
						forced: true,
						locked: true,
						trigger: {
							player: "loseEnd"
						},
						group: ["zioy_qunyou2"],
						mark: true,
						marktext: "春",
						intro: {
							name: "春",
							content: "mark",
							onunmark: true
						},
						filter: function (event, player) {
							return true;
						},
						content: function () {
							player.addMark("zioy_happyNewYear");
							var n = player.countMark("zioy_happyNewYear");
							if (n % 2 == 0) player.draw();
							//else if(player.countCards('h') > 0)player.chooseToDiscard();
						},
						ai: {
							threaten: 2.023
						},
						"_priority": 0
					},
					"zioy_qunyou2": {
						audio: "ext:无源之流:2",
						shaRelated: true,
						trigger: {
							player: "useCard"
						},
						direct: true,
						filter: function (event, player) {
							if (game.roundNumber > player.storage.qunyou_lastround) {
								player.storage.qunyou_num = 4;
								if (player.countMark("zioy_qunyou2") > 4) player.removeMark("zioy_qunyou2", player.countMark("zioy_qunyou2") - 4);
								player.storage.qunyou_lastround = game.roundNumber;
							}
							return event.card.name == "sha" && player.countMark("zioy_happyNewYear") >= player.storage.qunyou_num && event.player.isPhaseUsing();
						},
						mark: true,
						marktext: "逡游",
						intro: {
							name: "逡游",
							content: "X值目前为#",
							onunmark: true
						},
						init: function (player) {
							player.addMark("zioy_qunyou2", 4);
							player.storage.qunyou_lastround = -1;
							player.storage.qunyou_num = 4;
						},
						content: function () {
							trigger.addCount = false;
							trigger.player.getStat().card.sha--;
							player.removeMark("zioy_happyNewYear", player.storage.qunyou_num);
							var n = player.countMark("zioy_happyNewYear");
							if (n % 2 == 0) player.draw();
							//else player.chooseToDiscard();
							player.storage.qunyou_num += 2;
							player.addMark("zioy_qunyou2", 2);
						},
						ai: {
							expose: 0.2
						},
						"_priority": 0
					},
					"zioy_qianlong": {
						trigger: {
							player: ["useCardEnd", "respond"]
						},
						filter: function (event, player) {
							return player.countCards("hej") > 0 && player.hujia == 0 && event.card && (event.card.name == "shan" || event.card.name == "sha");
						},
						priority: -1,
						forced: false,
						content: function () {
							player.chooseToDiscard("hej", true, "弃置一张牌").set("ai", function (card) {
								return 7 - get.value(card);
							});
							player.draw();
							player.changeHujia(1);
						},
						ai: {
							threaten: 2
						},
						"_priority": -100
					},
					"zioy_jianlong": {
						enable: "phaseUse",
						filter: function (event, player) {
							return player.hujia > 0;
						},
						check: 2023,
						derivation: ["zioy_feilong", "zioy_kanglong"],
						content: function () {
							"step 0"
							player.draw();
							player.changeHujia(-1);
							player.addSkill("zioy_jianlong4");
							player.removeSkill("zioy_jianlong");
						},
						ai: {
							result: {
								player: 1
							},
							order: 2.5
						},
						"_priority": 0
					},
					"zioy_feilong": {
						mod: {
							playerEnabled: function (card, player, target) {
								if (player.storage.aimOfFeilong.isAlive() && card.name == "sha" && player.storage.aimOfFeilong != target) return false;
							},
							targetInRange: function (card, player, target) {
								if (card.name == "sha") return true;
							}
						},
						trigger: {
							player: "useCard"
						},
						forced: true,
						filter: function (event, player, trigger) {
							return event.card && event.card.name == "sha";
						},
						content: function () {
							player.draw();
							trigger.directHit.addArray(game.players);
							player.removeSkill(event.name);
							player.addSkill("zioy_kanglong");
							player.addSkill("zioy_jianlong");
						},
						"_priority": 0
					},
					"zioy_kanglong": {
						unique: true,
						enable: "phaseUse",
						limited: true,
						filterTarget: function (card, player, target) {
							return target != player;
						},
						content: function () {
							"step 0"
							player.draw();
							target.addTempSkill("zioy_kanglong2");
							var n = player.hp - target.hp;
							if (n < 0) n = -n;
							if (n == 0) n = 1;
							target.damage(n);
						},
						ai: {
							order: 1,
							fireAttack: true,
							result: {
								target: function (player, target) {
									if (target.hasSkillTag("nofire")) return 0;
									if (lib.config.mode == "versus") return -1;
									if (player.hasUnknown()) return 0;
									return get.damageEffect(target, player);
								}
							}
						},
						mark: true,
						intro: {
							content: "limited"
						},
						init: function (player, skill) {
							player.storage[skill] = false;
						},
						skillAnimation: true,
						"_priority": 0
					},
					"zioy_jianlong2": {
						trigger: {
							source: "damageSource"
						},
						filter: function (event, player) {
							return event.card && event.card.name == "sha";
						},
						priority: 2023,
						forced: true,
						locked: false,
						content: function () {
							player.draw();
							player.addSkill("zioy_feilong");
							player.storage.aimOfFeilong = trigger.player;
						},
						"_priority": 202300
					},
					"zioy_jianlong4": {
						mod: {
							targetInRange: function (card, player, target, now) {
								if (card.name == "sha") return true;
							}
						},
						group: ["zioy_jianlong2", "wushuang1"],
						trigger: {
							player: "useCardEnd"
						},
						forced: true,
						filter: function (event, player, trigger) {
							return event.card && event.card.name == "sha";
						},
						content: function () {
							//trigger.directHit.addArray(game.players);
							player.removeSkill(event.name);
							player.removeSkill("zioy_jianlong2");
							if (!player.hasSkill("zioy_feilong")) player.addSkill("zioy_jianlong");
						},
						ai: {
							threaten: 3
						},
						"_priority": 0
					},
					"zioy_kanglong2": {
						trigger: {
							player: "damageEnd"
						},
						forced: true,
						popup: false,
						charlotte: true,
						filter: function (event, player) {
							return true;
						},
						content: function () {
							if (trigger.source != null) trigger.source.awakenSkill("zioy_kanglong");
							player.removeSkill("zioy_kanglong2");
						},
						"_priority": 0
					},
					"zioy_yixiang": {
						group: ["zioy_yixiang2"],
						trigger: {
							source: "damageBegin1"
						},
						forced: true,
						content: function () {
							trigger.nature = "fire";
						},
						"_priority": 0
					},
					"zioy_yixiang2": {
						trigger: {
							player: "damageBegin3"
						},
						filter: function (event, player) {
							if (event.nature != "fire") return false;

							return true;
						},
						forced: true,
						content: function () {
							trigger.num--;
						},
						"_priority": 0
					},
					"zioy_yuyan": {
						group: ["feiying", "mashu"],
						init: function (player) {
							player.disableEquip("equip3");
							player.disableEquip("equip4");
						},
						"_priority": 0
					},
					"zioy_chuixing": {
						init: function (player) {
							player.storage.yynum = [1];
							player.storage.yyUsable = true;
						},
						trigger: {
							player: "useCardEnd"
						},
						filter: function (event, player) {
							if (!player.storage.yyUsable) return false;
							if (event.getParent().name == "zioy_chuixing") return false;
							if (event.card.name != "sha" && event.card.name != "huosha" && event.card.name != "leisha") return false;
							return true;
						},
						mark: true,
						marktext: "吹星",
						intro: {
							name: "吹星",
							content: function (storage, player) {
								return player.storage.yynum;
							},
							onunmark: true
						},
						priority: 1,
						forced: true,
						content: function () {
							"step 0"
							player.storage.yyUsable = false;
							event.count = 0;
							"step 1"
							player.storage.yynum[0] += 1;
							for (var i = 0; i < player.storage.yynum.length; i += 1) {
								if (player.storage.yynum[i] == 2) {
									player.storage.yynum[i] = 0;
									if (i == player.storage.yynum.length - 1) {
										player.storage.yynum.push(1);
									} else {
										player.storage.yynum[i + 1] += 1;
									}
									event.count += 3 ** i;
									// for(var j = 0;j < 3**i;j+=1){
									// 	event.count++
									// }
								}
							}
							"step 2"
							if (event.count > 0) {
								// for(var j = 0;j < event.count;j++){
								// 	player.chooseUseTarget({ name: "sha", nature: "fire" }, false, false, "nodistance");
								// }
								player
									.chooseTarget(1, true, "对一名角色使用" + event.count + "张【杀】", function (card, player, target) {
										return target != player;
									})
									.set("ai", function (target) {
										var player = _status.event.player;
										return -1;
									});
							} else {
								player.storage.yyUsable = true;
								event.finish();
							}
							"step 3"
							var target = result.targets[0];
							while (event.count > 0) {
								if (target.isAlive()) {
									player.useCard({ name: "sha", nature: "fire" }, target);
									event.count -= 1;
								} else {
									event.goto(2);
									break;
								}
							}
							// target.damage(event.count,player,'fire')
							"step 4"
							player.storage.yyUsable = true;
							event.finish();
							// player.addMark("zioy_chuixing", 1);
							// var i = 0;
							// player.storage.yynum[0]++;
							// //while(i < player.storage.yynum.length){
							// if (player.storage.yynum[i] % (2 + i) == 0) {
							// 	player.chooseUseTarget({ name: "sha", nature: "fire" }, false, false, "nodistance");
							// 	if (i + 1 == player.storage.yynum.length) {
							// 		player.storage.yynum.push(0);
							// 	}
							// 	player.storage.yynum[i + 1]++;
							// 	//player.say('i = ' + i + '::' + player.storage.yynum[i]);
							// }
							// i++;
							//}
						},
						ai: {
							threaten: 2
						},
						"_priority": 100
					},
					"zioy_zhijin": {
						forced: true,
						priority: 15,
						trigger: {
							player: "gainAfter"
						},
						filter: function (event, player) {
							return player.storage.lockflag == false;
						},
						init: function (player) {
							player.storage.lockflag = false;
						},
						content: function () {
							"step 0"
							player.storage.lockflag = true;
							"step 1"
							var num = trigger.cards.length;
							var sum = 0;
							var res = [];
							var n = 0;
							var bools = [false];
							for (var i = num; i-- > 0; ) bools.push(true);
							//player.damage();
							while (bools.randomGet()) {
								sum++;
								//player.gain(ui.cardPile[0],'gain2').type = 'zioy_zhijin';
								bools.push(false);
								n++;
								//res.push(ui.cardPile.splice(Math.floor(Math.random()*ui.cardPile.length), 1)[0]);
							}
							player.draw(sum);
							//player.gain(res).type = 'zioy_zhijin';
							"step 2"
							player.storage.lockflag = false;
						},
						"_priority": 1500
					},
					"zioy_xuanzhuan": {
						enable: "phaseUse",
						filter: function (event, player) {
							return true;
						},
						check: 2023,
						usable: 1,
						content: function () {
							"step 0"
							event.current = player;
							event.cp = [];
							event.ps = [];
							"step 1"
							if (!event.current.countCards("h")) event.goto(3);
							else
								event.current.chooseCard("将一张牌置于" + get.translation(player) + "的武将牌上", "h", true).set("ai", function (card) {
									var evt = _status.event.getParent();
									if (get.attitude(_status.event.player, evt.player) > 2) {
										if (card.name == "jiu") return 120;
										if (card.name == "tao") return 110;
									}
									return 100 - get.value(card);
								});
							"step 2"
							if (result.bool && result.cards && result.cards.length) {
								player.addToExpansion(result.cards, "giveAuto", player).gaintag.add("zioy_xuanzhuan");
								event.ps.push(event.current);
								if ([true, false, false].randomGet()) event.ps.push(player);
								event.cp.push(result.cards);
							}
							"step 3"
							event.current = event.current.next;
							if (event.current != player) event.goto(1);
							"step 4"
							//player.damage();
							var cards = player.getExpansions("zioy_xuanzhuan");
							for (var i = cards.length; i-- > 0; ) {
								var p = event.ps.randomGet();
								p.gain(cards[i], "draw");
							}
						},
						ai: {
							result: {
								player: 1
							},
							order: 2.5
						},
						"_priority": 0
					},
					"zioy_leiye1": {
						trigger: {
							source: "damageEnd"
						},
						group: ["zioy_leiye2"],
						forced: function () {
							return true;
						},
						charlotte: true,
						filter: function () {
							return true;
						},
						marktext: "墨",
						intro: {
							name: "墨",
							content: "mark",
							onunmark: true
						},
						content: function () {
							player.addMark(event.name);
						},
						"_priority": 0
					},
					"zioy_leiye2": {
						marktext: "霜",
						intro: {
							name: "霜",
							content: "mark",
							onunmark: true
						},
						trigger: {
							player: ["damageEnd", "recoverAfter"]
						},
						forced: true,
						charlotte: true,
						filter: function () {
							return true;
						},
						content: function () {
							player.addMark("zioy_leiye2");
						},
						"_priority": 0
					},
					"zioy_mosha": {
						enable: "phaseUse",
						skillAnimation: true,
						animationColor: "thunder",
						juexingji: true,
						unique: true,
						filter: function (event, player) {
							//return true;
							return player.countMark("zioy_leiye1") > 2;
						},
						filterTarget: function (card, player, target) {
							return target != player;
						},
						forced: true,
						content: function () {
							"step 0"
							player.awakenSkill("zioy_mosha");
							player.awakenSkill("zioy_shuangsha");
							player.awakenSkill("zioy_leiye1");
							player.awakenSkill("zioy_leiye2");
							player.removeMark("zioy_leiye1", player.countMark("zioy_leiye1"));
							player.removeMark("zioy_leiye2", player.countMark("zioy_leiye2"));
							target.damage(3);
							player.loseMaxHp();
							player.node.name.innerHTML /*= player.name = player.name1 = player.name2*/ = "墨玄飱阳";
							player.changeGroup("shen");
							player.update();
							"step 1"
							player.storage.ly = 2;
						},
						ai: {
							order: 9,
							result: {
								target: function (player, target) {
									return target.hp - target.maxHp - 1;
									return get.damageEffect(target, player);
								},
								player: 1
							},
							threaten: 2
						},
						"_priority": 0
					},
					"zioy_shuangsha": {
						enable: "phaseUse",
						skillAnimation: true,
						animationColor: "thunder",
						juexingji: true,
						unique: true,
						filter: function (event, player) {
							return player.countMark("zioy_leiye2") > 2;
						},
						filterTarget: function (card, player, target) {
							return target != player;
						},
						forced: true,
						content: function () {
							"step 0"
							player.awakenSkill("zioy_mosha");
							player.awakenSkill("zioy_shuangsha");
							player.awakenSkill("zioy_leiye1");
							player.awakenSkill("zioy_leiye2");
							player.removeMark("zioy_leiye1", player.countMark("zioy_leiye1"));
							player.removeMark("zioy_leiye2", player.countMark("zioy_leiye2"));
							player.awakenSkill("zioy_leiye2");
							player.removeMark("zioy_leiye1", player.countMark("zioy_leiye1"));
							player.removeMark("zioy_leiye2", player.countMark("zioy_leiye2"));
							target.damage(1);
							player.recover(1);
							player.gainMaxHp(1);
							player.node.name.innerHTML /*= player.name = player.name1 = player.name2*/ = "霜华染月";
							player.changeGroup("shen");
							player.update();
							"step 1"
							player.storage.ly = 3;
						},
						ai: {
							order: 9,
							result: {
								target: function (player, target) {
									return target.hp - target.maxHp - 1;
									return get.damageEffect(target, player);
								},
								player: 1
							},
							threaten: 2
						},
						"_priority": 0
					},
					"zioy_lieying": {
						trigger: {
							source: "damageBegin"
						},
						group: ["zioy_lieying1"],
						forced: true,
						filter: function (event, player, trigger) {
							return true;
						},
						mod: {
							selectTarget: function (card, player, range) {
								if (card.name == "sha" && range[1] != -1 && player.storage.ly == 3) range[1] += 1;
							}
						},
						init: function (player) {
							player.storage.ly = 1;
						},
						content: function () {
							player.draw();
							if (player.storage.ly == 2) trigger.num++;
							if (player.storage.ly == 3) {
								var n = player.maxHp - player.hp;
								if (n % 2 == 1) n--;
								//n /= 2;
								player.recover(n / 2);
							}
						},
						"_priority": 0
					},
					"zioy_lieying1": {
						trigger: {
							player: "useCard"
						},
						forced: true,
						filter: function (event, player, trigger) {
							return player.storage.ly == 2 && event.card && event.card.name == "sha";
						},
						content: function () {
							//trigger.target.addTempSkill('qinggang2');
							//trigger.target.storage.qinggang2.add(trigger.card);
							//trigger.target.markSkill('qinggang2');
							trigger.directHit.addArray(game.players);
						},
						"_priority": 0
					},
					"zioy_wrjzc": {
						trigger: {
							player: "phaseBegin"
						},
						filter: function (event, player) {
							return game.hasPlayer(function (current) {
								return current != player && current.countCards("h");
							});
						},
						direct: true,
						locked: true,
						content: function () {
							var target = game
								.filterPlayer(function (target) {
									return player != target && target.countCards("h");
								})
								.randomGet();
							var cards = target.getCards("h");
							player.logSkill(event.name, target);
							var content = [get.translation(target) + "的手牌", cards];
							game.log(player, "观看了", target, "的手牌");
							player.chooseControl("ok").set("dialog", content);
						},
						"_priority": 0
					},
					"zioy_zsyhj": {
						trigger: {
							player: "damageBegin3"
						},
						group: ["zioy_zsyhjn"],
						locked: true,
						forced: true,
						filter: function (event, player) {
							return event.num > 0;
						},
						mod: {
							maxHandcardBase: function (player, num) {
								return player.hujia;
							}
						},
						init: function (player) {
							player.storage.zsyhj1 = player.storage.zsyhj2 = false;
						},
						content: function () {
							if (event.nature) {
								if (player.storage.zsyhj1) {
									trigger.cancel();
									player.storage.zsyhj1 = false;
								} else if (!player.storage.zsyhj2) player.storage.zsyhj1 = true;
							} else {
								if (player.storage.zsyhj2) {
									trigger.cancel();
									player.storage.zsyhj2 = false;
								} else if (!player.storage.zsyhj1) player.storage.zsyhj2 = true;
							}
						},
						mark: true,
						marktext: "护甲",
						intro: {
							mark: function (dialog, storage, player) {
								if (player.storage.zsyhj1) {
									return "防止受到属性伤害";
								}

								if (player.storage.zsyhj2) {
									return "防止受到无属性伤害";
								}
								return "未拥有护甲";
							},
							markcount: "expansion"
						},
						"_priority": 0
					},
					"zioy_weixiang": {
						trigger: {
							global: "phaseBefore",
							player: "enterGame"
						},
						forced: true,
						filter: function (event) {
							return game.players.length > 1 && (event.name != "phase" || game.phaseNumber == 0);
						},
						content: function () {
							"step 0"
							player
								.chooseTarget("请选择【伪像】的目标", lib.translate.zioyweixiang__info, true, function (card, player, target) {
									return target != player && (!player.storage.xianfu2 || !player.storage.xianfu2.contains(target));
								})
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									if (att > 0) return att + 1;
									if (att == 0) return Math.random();
									return att;
								}).animate = false;
							"step 1"
							if (result.bool) {
								var target = result.targets[0];
								player.reinit(player.name, target.name);
								player.hp = target.hp;
								player.maxHp = target.maxHp;
								player.hujia = target.hujia;
								player.update();
							}
						},
						"_priority": 0
					},
					"zioy_zsyhjn": {
						trigger: {
							global: "phaseBefore"
						},
						forced: true,
						filter: function (event, player) {
							return player.maxHp > 1;
						},
						content: function () {
							var n = player.maxHp - 1;
							player.maxHp = 1;
							player.hujia += n;
							player.update();
						},
						"_priority": 0
					},
					"zioy_fansheng": {
						trigger: {
							player: "die"
						},
						filter: function (event, player) {
							return event.source && event.source.isIn();
						},
						forced: true,
						forceDie: true,
						logTarget: "source",
						skillAnimation: true,
						animationColor: "gray",
						content: function () {
							var a = trigger.source;
							a.addSkill("zioy_nianzhong");
							a.storage.orimaxHp = a.maxHp;
							a.loseMaxHp(a.maxHp - 1);
							a.storage.zioy_nianzhong = player;
							a.disableEquip("equip3");
							//a.disableEquip('equip4');
							//a.disableEquip('equip1');
							a.disableEquip("equip2");
							a.disableEquip("equip5");
						},
						ai: {
							revertsave: true,
							threaten: function (player, target) {
								if (target.hp == 1) return 0.2;
								return 1.5;
							},
							effect: {
								target: function (card, player, target, current) {
									if (!target.hasFriend()) return;
									if (target.hp <= 1 && get.tag(card, "damage")) return [1, 0, 0, -2];
								}
							}
						},
						"_priority": 0
					},
					"zioy_nianzhong": {
						trigger: {
							player: "die"
						},
						filter: function (event, player) {
							return true;
						},
						forced: true,
						forceDie: true,
						skillAnimation: true,
						animationColor: "gray",
						content: function () {
							player.storage.zioy_nianzhong.revive();
							player.storage.zioy_nianzhong.gainMaxHp(player.storage.orimaxHp);
							player.storage.zioy_nianzhong.draw(player.storage.orimaxHp);
							player.storage.zioy_nianzhong.recover(player.storage.orimaxHp);
							game.swapSeat(player, player.storage.zioy_nianzhong);
							var target = player;
							var list = [];
							if (lib.character[target.name]) list.addArray(lib.character[target.name][3]);
							if (lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
							if (lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
							player.storage.zioy_nianzhong.addSkill(list);
							player.storage.zioy_nianzhong.insertPhase();
							var a = player.storage.zioy_nianzhong;
							var n = a.storage.nianxi_num;
							a.addSkill("zioy_nianxi");
							a.storage.nianxi_num = n;
							a.addMark("zioy_nianxi", 1);
							a.removeMark("zioy_nianxi", Infinity);
						},
						ai: {
							effect: {
								target: function (card, player, target, current) {
									if (get.tag(card, "damage")) return 200000;
								}
							}
						},
						"_priority": 0
					},
					"zioy_jifou": {
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return true;
						},
						forced: true,
						content: function () {
							"step 0"
							player
								.chooseTarget(get.prompt2(event.name), function (card, player, target) {
									return player != target;
								})
								.set("ai", function (target) {
									var num = get.attitude(_status.event.player, target);
									if (num > 0) {
										if (target.hp == 1) {
											num += 2;
										}
										if (target.hp < target.maxHp) {
											num += 2;
										}
									}
									return num;
								})
								.set("sourcex", trigger.source);
							"step 1"
							if (result.bool) {
								var n = 3;
								target = result.targets[0];
								target.gainMaxHp(n);
								target.recover(n + target.maxHp - target.hp);
								target.draw(n);
								target.addSkill("zioy_jifou2");
								if (player.identity == "zhu") {
									player.identity = target.identity;
									target.identity = "zhu";
									player.update();
									target.showIdentity();
									player.showIdentity();
									target.update();
									game.zhu = target;
								}
								// player.loseHp(Infinity);
								player.die();
							}
						},
						ai: {
							order: 8,
							result: {
								target: function (player, target) {
									if (ui.selected.targets.length == 0) {
										return -3;
									} else {
										return get.effect(target, { name: "juedou" }, ui.selected.targets[0], target);
									}
								}
							},
							expose: 0.4,
							threaten: 3
						},
						mark: true,
						intro: {
							content: "limited"
						},
						init: function (player, skill) {
							player.storage[skill] = false;
						},
						"_priority": 0
					},
					"zioy_jifou2": {
						trigger: {
							player: "phaseDrawBegin2"
						},
						priority: -1,
						forced: true,
						filter: function (event, player) {
							return !event.numFixed;
						},
						content: function () {
							trigger.num = trigger.num + 3;
						},
						ai: {
							threaten: 1.5
						},
						mod: {
							maxHandcardBase: function (player, num) {
								return num + 3;
							}
						},
						"_priority": -100
					},
					"zioy_liubo": {
						trigger: {
							global: ["loseAfter"]
						},
						group: ["zioy_liubo2"],
						filter: function (event, player) {
							//return true;
							//if(player.storage.liuboflag == false) return false;
							for (var i = 0; i < event.cards2.length; i++) {
								if (get.position(event.cards2[0], true) == "d") {
									return true;
								}
							}
							return false;
						},
						init: function (player) {
							player.storage.liuboflag = false;
							player.storage.liubocard = null;
							player.storage.liubosum = 0;
						},
						direct: true,
						content: function () {
							for (var i = 0; i < trigger.cards2.length; i++) {
								player.storage.liubocard = trigger.cards2[i];
								player.storage.liuboflag = true;
							}
						},
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								if (player.storage.liuboflag == false) return "未记录";
								if (player.isUnderControl(true)) dialog.addAuto(player.storage.liubocard);
								else return "已记录";
							},
							markcount: "expansion"
						},
						"_priority": 0
					},
					"zioy_liubo2": {
						trigger: {
							player: "useCard2"
						},
						direct: true,
						filter: function (event, player) {
							if (player.storage.liubocard == null) return false;
							var type = get.type(event.card);
							return type == "basic" || type == "trick";
						},
						content: function () {
							"step 0"
							var goon = false;
							var info = get.info(trigger.card);
							if (trigger.targets && !info.multitarget) {
								var players = game.filterPlayer();
								for (var i = 0; i < players.length; i++) {
									if (lib.filter.targetEnabled2(trigger.card, player, players[i]) && !trigger.targets.contains(players[i])) {
										goon = true;
										break;
									}
								}
							}
							if (goon) {
								player
									.chooseTarget(event.name + "：是否额外指定一名" + get.translation(trigger.card) + "的目标？", function (card, player, target) {
										var trigger = _status.event;
										if (trigger.targets.contains(target)) return false;
										return lib.filter.targetEnabled2(trigger.card, _status.event.player, target);
									})
									.set("ai", function (target) {
										var trigger = _status.event.getTrigger();
										var player = _status.event.player;
										return get.effect(target, trigger.card, player, player);
									})
									.set("targets", trigger.targets)
									.set("card", trigger.card);
							} else {
								if (!info.multitarget && trigger.targets && trigger.targets.length > 1) {
									event.finish();
								}
							}
							"step 1"
							if (result.bool) {
								if (!event.isMine()) game.delayx();
								event.target = result.targets[0];
							} else {
								event.finish();
							}
							"step 2"
							if (event.target) {
								player.gain(player.storage.liubocard);
								player.storage.liubocard = null;
								player.storage.liuboflag = false;
								player.storage.liubosum++;
								player.logSkill("zioy_liubo2", event.target);
								trigger.targets.add(event.target);
							}
							event.finish();
						},
						"_priority": 0
					},
					"zioy_shuiyue": {
						trigger: {
							player: "phaseJieshuBegin"
						},
						frequent: false,
						filter: function (event, player) {
							return player.storage.liubosum > 0;
						},
						content: function () {
							if (player.storage.liubosum > 0) player.draw(player.storage.liubosum);
							var n = 0;
							while (n * 1.5 <= player.storage.liubosum) n++;
							player.storage.liubosum = n - 1;
						},
						check: function (event, player) {
							return player.storage.liubosum > 3;
						},
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								return "已记录" + player.storage.liubosum + "次〖流波〗";
							},
							markcount: "expansion"
						},
						"_priority": 0
					},
					"zioy_moying": {
						enable: "phaseUse",
						usable: 1,
						check: function () {
							return true;
						},
						discard: false,
						line: true,
						position: "h",
						init: function (player) {
							player.storage.shadowl = [];
						},
						filter: function (event, player) {
							return player.countCards("h", { color: "black" }) > 0;
						},
						filterCard: function (card) {
							return get.color(card) == "black";
						},
						filterTarget: function (card, player, target) {
							if (target == player) return false;
							return !target.hasSkill("zioy_moying2");
							//return !player.storage.shadowl.contains(target);
						},
						content: function () {
							if (player.storage.shadowl.length > 1) {
								var p = player.storage.shadowl[0];
								p.removeSkill("zioy_moying2");
								player.storage.shadowl.shift();
							}
							player.storage.shadowl.push(target);
							target.addToExpansion(cards, "giveAuto", target).gaintag.add("zioy_moying");
							target.addSkill("zioy_moying2");
							target.storage.shadow_source = player;
							target.storage.shadow_card = cards;
							//target.loseHp();
						},
						ai: {
							order: 9,
							result: {
								target: function (player, target) {
									return target.hp - target.maxHp - 1;
									return get.damageEffect(target, player);
								},
								player: 1
							},
							threaten: 2
						},
						"_priority": 0
					},
					"zioy_yingdun": {
						audio: "ext:无源之流:2",
						audioname: ["re_daqiao", "daxiaoqiao"],
						trigger: {
							target: "useCardToTarget"
						},
						direct: true,
						preHidden: true,
						filter: function (event, player) {
							//if(event.card.name!='sha') return false;
							if (player.storage.shadowl.length == 0) return false;
							return game.hasPlayer(function (current) {
								//var evt=_status.event.getTrigger();
								return (
									current != event.player && //current!=trigger.source&&
									player.storage.shadowl.contains(current) &&
									current.storage.shadow_flag &&
									!event.targets.contains(current)
								);
							});
						},
						content: function () {
							"step 0"
							player
								.chooseTarget("请选择【影遁】的目标", lib.translate.zioy_yingdun_info, false, function (card, player, target) {
									var evt = _status.event.getTrigger();
									//return !evt.targets.contains(target)
									return (
										target != event.player &&
										!evt.targets.contains(target) &&
										target != trigger.source && //trigger.targets.contains(target)&&
										player.storage.shadowl.contains(target) &&
										target.storage.shadow_flag
									); /*&&lib.filter.targetEnabled(event.card,event.player,target);*/
								})
								.set("ai", function (target) {
									return [1, -1].randomGet();
								});
							"step 1"
							if (result.bool) {
								var target = result.targets[0];
								target.storage.shadow_flag = false;
								game.swapSeat(player, target);
								player.logSkill(event.name, target);
								//player.discard(result.cards);
								var evt = trigger.getParent();
								evt.triggeredTargets2.remove(player);
								evt.targets.remove(player);
								evt.targets.push(target);
							}
						},
						"_priority": 0
					},
					"zioy_moying2": {
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								dialog.addAuto(player.storage.shadow_card);
								//else return '已记录';
							},
							markcount: "expansion"
						},
						group: ["zioy_moying3"],
						init: function (player) {
							player.storage.shadow_flag = true;
							//player.addMark('zioy_moying2');
						},
						onremove: function (player) {
							player.storage.shadow_source.gain(player.storage.shadow_card);
							//player.removeMark('zioy_moying2');
						},
						trigger: {
							global: "useCard"
						},
						filter: function (event, player) {
							/*var flag = false;
for(var card of event.cards){

if(get.type(card)=='basic' && get.type(card)=='trick')   flag=  true;

}*/
							return (
								event.targets &&
								event.targets.length == 1 &&
								//flag&&
								event.targets[0] != player &&
								event.targets[0] != player.storage.shadow_source &&
								event.targets[0].isAlive() &&
								event.player == player.storage.shadow_source &&
								//get.type(event.cards[0].name) == 'basic'&&
								//get.type(event.cards[0].name) == 'trick'&&
								//lib.filter.targetInRange(card,this,target)&&
								//player.canUse(event.cards,event.targets[0])&&
								true
							);
						},
						direct: true,
						content: function () {
							player.useCard(trigger.cards, trigger.targets[0]);
							//game.delay(0.5);
						},
						"_priority": 0
					},
					"zioy_jianying": {
						trigger: {
							player: "showCharacterAfter"
						},
						forced: true,
						hiddenSkill: true,
						filter: function (event, player) {
							return true;
						},
						content: function () {
							"step 0"
							player
								.chooseTarget("请选择【末影】的目标", lib.translate.zioy_jianying_info, false, function (card, player, target) {
									if (target == player) return false;
									return !target.hasSkill("zioy_moying2");
								})
								.set("ai", function (target) {
									return 1;
								});
							"step 1"
							if (result.bool) {
								var target = result.targets[0];
								if (player.storage.shadowl.length > 1) {
									var p = player.storage.shadowl[0];
									p.removeSkill("zioy_moying2");
									player.storage.shadowl.shift();
								}
								var cards = game.createCard("sha", "spade", Infinity);
								player.storage.shadowl.push(target);
								target.addToExpansion(cards, "giveAuto", target).gaintag.add("zioy_moying");
								target.addSkill("zioy_moying2");
								target.storage.shadow_source = player;
								target.storage.shadow_card = cards;
							}
						},
						"_priority": 0
					},
					"zioy_moying3": {
						trigger: {
							player: "die"
						},
						filter: function (event, player) {
							return true;
						},
						direct: true,
						forceDie: true,
						content: function () {
							var p = player.storage.shadow_source;
							if (p.storage.shadowl[0] == player) p.storage.shadowl.shift();
							else p.storage.shadowl.pop();
						},
						"_priority": 0
					},
					"zioy_yuexiang": {
						trigger: {
							player: "phaseDrawBegin2"
						},
						group: ["zioy_yuexiang2"],
						direct: true,
						filter: function (event, player) {
							return !event.numFixed;
						},
						priority: 3,
						init: function (player) {
							player.storage.yuexiang_num = [0, 1, 2, 3].randomGet();
							player.storage.yuexiang_list = ["🌓", "🌕", "🌘", "🌑"];
							player.storage.yuexiang_list2 = ["上弦", "满月", "下弦", "新月"];
						},
						content: function () {
							var n = 0;
							var index = 1;
							if (player.storage.douzhuan_flag) index = 2;
							if (player.storage.yuexiang_num == 1) n = 2 * index;
							else if (player.storage.yuexiang_num == 3) n = 0 * index;
							else n = index;
							trigger.num += n;
						},
						ai: {
							threaten: 1.3
						},
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								return player.storage.yuexiang_list2[player.storage.yuexiang_num];
							},
							markcount: "expansion"
						},
						"_priority": 300
					},
					"zioy_yuexiang2": {
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return true;
						},
						direct: true,
						content: function () {
							player.storage.yuexiang_num++;
							player.storage.yuexiang_num %= 4;
							if (player.storage.yuexiang_num == 1) {
								var p = null;
								if (player.hasSkill("zioy_xingdou")) {
									p = player;
								}
								if (player.next.hasSkill("zioy_xingdou")) {
									p = player.next;
								}
								if (player.previous.hasSkill("zioy_xingdou")) {
									p = player.previous;
								}
								if (p != null) {
									player.gain(p.getExpansions("zioy_xingdou"));
									player.storage.douzhuan_flag = true;
								}
							}
						},
						"_priority": 0
					},
					"zioy_douzhuan": {
						trigger: {
							global: "phaseBefore",
							player: "enterGame"
						},
						direct: true,
						unique: true,
						group: ["zioy_douzhuan2"],
						filter: function (event, player) {
							return event.name != "phase" || game.phaseNumber == 0;
						},
						init: function (player) {
							player.storage.douzhuan_flag = false;
						},
						priority: 1,
						forceunique: true,
						content: function () {
							"step 0"
							var targets = game.players;
							var target = targets.randomGet();
							var cards = get.cards(7);
							target.addToExpansion(cards, "draw").gaintag.add("zioy_xingdou");
							target.addSkill("zioy_xingdou");
							target.storage.zioy_xingdou_lastround = game.phaseNumber;
							"step 1"
							if (player.storage.yuexiang_num == 1) {
								var p = null;
								if (player.hasSkill("zioy_xingdou")) {
									p = player;
								}
								if (player.next.hasSkill("zioy_xingdou")) {
									p = player.next;
								}
								if (player.previous.hasSkill("zioy_xingdou")) {
									p = player.previous;
								}
								if (p != null) {
									player.gain(p.getExpansions("zioy_xingdou"));
									player.storage.douzhuan_flag = true;
								}
							}
						},
						mod: {
							maxHandcardBase: function (player, num) {
								var n = 0;
								if (player.storage.douzhuan_flag) n = 7;
								return num + n;
							}
						},
						"_priority": 100
					},
					"zioy_xingdou": {
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								var content = player.getExpansions("zioy_xingdou");
								if (content && content.length) {
									dialog.addAuto(content);
								} else {
									return "群星暗淡";
								}
							},
							markcount: "expansion"
						},
						priority: 2,
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return player.storage.zioy_xingdou_lastround < game.phaseNumber;
						},
						onremove: function (player) {
							//player.removeSkill("zioy_xingdou");
						},
						direct: true,
						content: function () {
							"step 0"
							var target = player.next;
							var cards = player.getExpansions("zioy_xingdou");
							if (cards.length > 0) {
								target.addToExpansion(cards, "draw").gaintag.add("zioy_xingdou");
								target.addSkill("zioy_xingdou");
								target.storage.zioy_xingdou_lastround = game.phaseNumber;
							}
							player.removeSkill("zioy_xingdou");
							delete player.storage.zioy_xingdou_lastround;
						},
						"_priority": 200
					},
					"zioy_shengyue": {
						"_priority": 0
					},
					"zioy_xiaoxiang": {
						trigger: {
							global: "roundStart"
						},
						limited: true,
						unique: true,
						filter: function (event, player) {
							return player.storage.cmnum > 0;
						},
						selectTarget: -1,
						content: function () {
							var target = player.next;
							player.awakenSkill(event.name);
							while (target != player) {
								if (target.hasSkill("zioy_chenmeng1")) {
									player.storage.cmnum--;
									target.removeSkill("zioy_chenmeng1");
									target.removeMark("zioy_chenmeng");
									target.turnOver();
									//player.gainMaxHp();
									player.recover();
									player.update();
								}
								target = target.next;
							}
						},
						check: function (event, player) {
							return player.storage.cmnum > 3 || player.hp < 3;
						},
						mark: true,
						intro: {
							content: "limited"
						},
						skillAnimation: true,
						init: function (player, skill) {
							player.storage[skill] = false;
						},
						"_priority": 0
					},
					"zioy_douzhuan2": {
						trigger: {
							global: "die"
						},
						preHidden: true,
						filter: function (event) {
							return event.player.hasSkill("zioy_xingdou");
						},
						direct: true,
						content: function () {
							"step 0"
							player.gain(trigger.player.getExpansions("zioy_xingdou"));
							player.storage.douzhuan_flag = true;
						},
						"_priority": 0
					},
					"zioy_nianxi": {
						audio: "ext:无源之流:2",
						enable: "phaseUse",
						usable: 1,
						filter: function (event, player) {
							return player.countCards("he") - player.countCards("he", { color: "red" }) > 0;
						},
						filterTarget: function (card, player, target) {
							if (player == target) return false;
							return player.inRange(target);
						},
						init: function (player) {
							player.storage.nianxi_num = 0;
						},
						content: function () {
							"step 0"
							player.addSkill("zioy_nianxi2");
							player.storage.nianxi_flag = false;
							"step 1"
							player.useCard({ name: "sha", isCard: false }, target, false);
							"step 2"
							player.removeSkill("zioy_nianxi2");
							if (player.storage.nianxi_flag == false) {
								player.storage.nianxi_num++;
								player.damage((number = player.storage.nianxi_num), (player = target));
								//player.addMark(event.name);
							}
						},
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								return "已记录" + player.storage.nianxi_num + "次〖年袭〗";
							}
						},
						filterCard: function (card) {
							return get.color(card) != "red";
						},
						selectCard: function () {
							return 1;
						},
						position: "he",
						check: function (card) {
							return 1000;
						},
						ai: {
							damage: true,
							order: 8,
							result: {
								player: function (player, target) {
									if (ui.selected.cards.length) return 0;
									if (player.hp >= target.hp) return -0.9;
									if (player.hp <= 2) return -10;
									return -2;
								},
								target: function (player, target) {
									if (!ui.selected.cards.length) {
										if (player.hp < 2) return 0;
										if (player.hp == 2 && target.hp >= 2) return 0;
										if (target.hp > player.hp) return 0;
									}
									return get.damageEffect(target, player);
								}
							},
							threaten: 1.3
						},
						"_priority": 0
					},
					"zioy_nianxi2": {
						trigger: {
							source: "damageBegin1"
						},
						forced: true,
						content: function () {
							player.storage.nianxi_flag = true;
						},
						"_priority": 0
					},
					"zioy_xiantong": {
						trigger: {
							player: "phaseDrawEnd",
							global: "roundStart"
						},
						filter: function (event, player) {
							var cards = player.getExpansions("zioy_xiantong");
							return (
								player.countCards(function (card) {
									return get.type(card) != "equip";
								}) > 0 && cards.length < player.maxHp
							);
						},
						group: ["zioy_xiantong2"],
						direct: true,
						content: function () {
							"step 0"
							player.chooseCard("h", false, "你可以选择一张非装备牌并将其置于武将牌上，称为“瞳”", function (card) {
								return get.type(card) != "equip";
							});
							"step 1"
							if (result.bool) {
								//player.markAuto("zioy_xiantong",result.cards);
								player.addToExpansion(result.cards, "giveAuto", player).gaintag.add("zioy_xiantong");
							}
						},
						mark: true,
						marktext: "瞳",
						intro: {
							mark: function (dialog, storage, player) {
								var cards = player.getExpansions("zioy_xiantong");
								if (cards.length == 0) return "共有" + get.cnNumber(cards.length) + "张牌";
								if (player.isUnderControl(true) || player.storage.huashouSource.isUnderControl(true)) dialog.addAuto(cards);
								else return "共有" + get.cnNumber(cards.length) + "张牌";
							},
							markcount: "expansion"
						},
						"_priority": 0
					},
					"zioy_xiane": {
						priority: 2,
						skillAnimation: true,
						animationColor: "thunder",
						trigger: {
							player: "phaseEnd"
						},
						filter: function (event, player) {
							var cards = player.getExpansions("zioy_xiantong");
							return cards.length > 2;
						},
						content: function () {
							"step 0"
							event.cs = player.getExpansions("zioy_xiantong");
							if (event.cs.length == 0) event.finish();
							"step 1"
							var ts = game.players;
							var target = player;
							event.target = target;
							do {
								target = ts.randomGet();
							} while (target == player);
							player.line(target, "red");
							target.damage(2, "thunder");
							"step 2"
							var c = event.cs[0];
							// if(event.target.hp > 0){
							player.gain(c);
							// }
							event.goto(0);
						},
						"_priority": 200
					},
					"zioy_xiantong2": {
						priority: 1,
						skillAnimation: true,
						animationColor: "thunder",
						trigger: {
							player: "phaseEnd"
						},
						direct: true,
						filter: function (event, player) {
							var cards = player.getExpansions("zioy_xiantong");
							return cards.length > 0;
						},
						content: function () {
							"step 0"
							event.index = 0;
							"step 1"
							event.cs = player.getExpansions("zioy_xiantong");
							if (event.cs.length == event.index) event.finish();
							"step 2"
							var c = event.cs[event.index];
							event.index += 1;
							var ts = game.players;
							var target = player;
							do {
								target = ts.randomGet();
							} while (target == player);
							player.useCard({ name: c.name, isCard: false }, target, true); //.animate=false;
							player.line(target, "red");
							event.goto(1);
						},
						"_priority": 100
					},
					"zioy_wuya": {
						enable: "phaseUse",
						usable: 1,
						filter: function (event, player) {
							return player.maxHp > 1 || player.storage.puai_flag;
						},
						filterTarget: function (card, player, target) {
							if (player == target) return false;
							return !target.hasSkill("zioy_wuya2");
						},
						init: function (player) {
							player.addMark("zioy_wuya", 2);
						},
						group: ["zioy_wuya4", "zioy_wuya3"],
						content: function () {
							"step 0"
							//target.addMark('zioy_wuya');
							target.addSkill("zioy_wuya2");
							if (player.storage.puai_flag == false) player.loseMaxHp();
							else player.gainMaxHp();
							target.storage.wuya_count = 1;
						},
						mark: true,
						marktext: "黑血",
						intro: {
							name: "黑血",
							mark: function (dialog, storage, player) {
								return null;
							}
						},
						filterCard: function (card) {
							return get.color(card) != "red";
						},
						position: "h",
						check: function (card) {
							return 1000;
						},
						ai: {
							order: 1,
							result: {
								target: function (player, target) {
									var eff = get.damageEffect(target, player);
									if (eff >= 0) return 1 + eff;
									var value = 0,
										i;
									var cards = player.getCards("h");
									for (i = 0; i < cards.length; i++) {
										value += get.value(cards[i]);
									}
									value /= player.countCards("h");
									if (target.hp == 1) return Math.min(0, value - 7);
									return Math.min(0, value - 5);
								}
							}
						},
						"_priority": 0
					},
					"zioy_sheji": {
						trigger: {
							player: "useCardToTarget"
						},
						filter: function (event, player) {
							return event.card.name == "sha" && player.countMark("zioy_wuya") > 0;
						},
						content: function () {
							"step 0"
							player.removeMark("zioy_wuya");
							ts = trigger.targets;
							for (var i = 0; i < ts.length; ++i) {
								ts[i].loseHp();
								player.recover();
							}
							"step 1"
							trigger.getParent().excluded.addArray(trigger.targets);
							// trigger.targets.remove(trigger.targets);
							// trigger.getParent().triggeredTargets2.remove(trigger.targets);
							trigger.untrigger();
						},
						"_priority": 0
					},
					"zioy_puai": {
						enable: "phaseUse",
						skillAnimation: true,
						animationColor: "thunder",
						juexingji: true,
						unique: true,
						filter: function (event, player) {
							return player.countMark("zioy_wuya") > 0 && player.maxHp > 1;
						},
						init: function (player) {
							player.storage.puai_flag = false;
						},
						content: function () {
							"step 0"
							var choices = [];
							for (var i = 1; i <= player.countMark("zioy_wuya") && i < player.maxHp; ++i) {
								choices.push(i);
							}
							player.chooseControl(choices).set("prompt", "请选择移去的“黑血”数量");
							"step 1"
							player.storage.puai_round = result.control;
							game.changeGlobalStatus("heiwu", parseInt(player.storage.puai_round), "round");
							// player.loseMaxHp(result.control);
							player.removeMark("zioy_wuya", result.control);
							player.addSkill("zioy_puai2");
							player.awakenSkill(event.name);
							// player.storage.puai_flag = true
						},
						ai: {
							order: 1,
							effect: {
								player: function (card, player, target) {
									return 10 * (player.countMark("zioy_wuya") - 2);
								}
							}
						},
						"_priority": 0
					},
					"zioy_wuya2": {
						init: function (player, skill) {
							player.addSkillBlocker(skill);
						},
						onremove: function (player, skill) {
							player.removeSkillBlocker(skill);
						},
						charlotte: true,
						skillBlocker: function (skill, player) {
							return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
						},
						mark: true,
						marktext: "鸦",
						intro: {
							content: function (storage, player, skill) {
								var list = player.getSkills(null, false, false).filter(function (i) {
									return lib.skill.fengyin.skillBlocker(i, player);
								});
								if (list.length) return "失效技能：" + get.translation(list);
								return "无失效技能";
							}
						},
						ai: {
							effect: {
								target: function (card, player, target) {
									if (get.tag(card, "damage")) {
										if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
										if (!target.hasFriend()) return;
										var num = 1;
										if (get.attitude(player, target) > 0) {
											if (player.needsToDiscard()) {
												num = 0.7;
											} else {
												num = 0.5;
											}
										}
										if (target.hp >= 4) return [1, num * 2];
										if (target.hp == 3) return [1, num * 1.5];
										if (target.hp == 2) return [1, num * 0.5];
									}
								}
							}
						},
						"_priority": 0
					},
					"zioy_wuya3": {
						trigger: {
							global: "damageBefore"
						},
						filter: function (event, player) {
							return event.player.hasSkill("zioy_wuya2");
						},
						forced: true,
						content: function () {
							"step 0"
							if (player.storage.puai_flag == false) {
								event.goto(3);
							}
							"step 1"
							var choices = ["是", "否"];
							player
								.chooseControl(choices)
								.set("prompt", "雾鸦：请选择一项")
								.set("prompt2", "是否移去“鸦”并防止" + get.translation(trigger.player) + "受到伤害");
							"step 2"
							if (result.control == "否") event.finish();
							"step 3"
							trigger.cancel();
							trigger.player.removeSkill("zioy_wuya2");
						},
						"_priority": 0
					},
					"zioy_wuya4": {
						trigger: {
							global: "phaseBegin"
						},
						filter: function (event, player) {
							return event.player.hasSkill("zioy_wuya2") && !player.hasSkill("zioy_wuya2");
						},
						direct: true,
						content: function () {
							"step 0"
							"step 1";
							if (player.storage.puai_flag == false)
								player
									.chooseTarget(
										"请选择【雾鸦】的目标",
										function (card, player, target) {
											return !target.hasSkill("zioy_wuya2");
										},
										true
									)
									.set("ai", function (target) {
										return [-1, 1].randomGet();
									});
							else
								player
									.chooseTarget(
										"请选择【雾鸦】的目标",
										function (card, player, target) {
											return !target.hasSkill("zioy_wuya2");
										},
										false
									)
									.set("ai", function (target) {
										return [-1, 1].randomGet();
									});
							"step 2"
							if (result.bool) {
								var target = result.targets[0];
								trigger.player.loseHp();
								trigger.player.line(target, "red");
								game.log("雾鸦转移至", target);
								trigger.player.removeSkill("zioy_wuya2");
								if (target != player) {
									target.addSkill("zioy_wuya2");
									target.storage.wuya_count = trigger.player.storage.wuya_count + 1;
								} else {
									var num = trigger.player.storage.wuya_count;
									player.recover(num);
									player.addMark("zioy_wuya", num);
									//var card=get.cardPile(function(card){
									//    return get.color(card)=='black';
									//});
									//if(card) player.gain(card,'gain2');
								}
								game.delayx();
							}
						},
						"_priority": 0
					},
					"zioy_puai2": {
						priority: 2,
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return true;
						},
						group: ["zioy_puai3"],
						direct: true,
						onremove: function (player) {
							player.storage.puai_flag = false;
						},
						content: function () {
							player.storage.puai_flag = true;
							if (player.storage.puai_round == 0) {
								player.removeSkill(event.name);
							}
							player.storage.puai_round--;
						},
						mod: {
							globalTo: function (from, to, distance) {
								if (to.storage.puai_flag) return Infinity;
							},
							globalFrom: function (from, to, distance) {
								if (to.storage.puai_flag) return distance - 9999;
							}
						},
						mark: true,
						marktext: "瀑霭",
						intro: {
							content: function (storage, player, skill) {
								return "剩余" + player.storage.puai_round + "回合";
							}
						},
						"_priority": 200
					},
					"zioy_puai3": {
						priority: 2.5,
						trigger: {
							target: "useCardToTarget"
						},
						forced: true,
						filter: function (event, player) {
							return get.tag(event.card, "damage") && player.storage.puai_flag == true;
						},
						content: function () {
							trigger.targets.remove(player);
							trigger.getParent().triggeredTargets2.remove(player);
							trigger.untrigger();
						},
						"_priority": 250
					},
					"zioy_xingchi": {
						group: ["zioy_xingchi2", "zioy_xingchi3"],
						trigger: {
							player: ["useCard", "respond"]
						},
						filter: function (event, player) {
							return event.card && (event.card.name == "shan" || event.card.name == "sha");
						},
						priority: 1.23,
						forced: true,
						locked: true,
						content: function () {
							player.addMark("zioy_xingchi");
						},
						mark: true,
						marktext: "正觉",
						intro: {
							name: "正觉",
							mark: function (dialog, storage, player) {
								return "唯佛一人智慧为阿耨多罗三藐三菩提";
							}
						},
						"_priority": 123
					},
					"zioy_xingchi2": {
						trigger: {
							player: "damageBegin"
						},
						filter: function (event, player) {
							return player.countMark("zioy_xingchi") > 2;
						},
						direct: true,
						content: function () {
							"step 0"
							player.removeMark("zioy_xingchi", 3);
							trigger.num--;
						},
						"_priority": 0
					},
					"zioy_xingchi3": {
						trigger: {
							source: "damageBegin"
						},
						priority: -3,
						filter: function (event, player) {
							return player.countMark("zioy_xingchi") > 2;
						},
						direct: true,
						content: function () {
							"step 0"
							player.removeMark("zioy_xingchi", 3);
							trigger.num++;
						},
						"_priority": -300
					},
					"zioy_cangzhen": {
						trigger: {
							source: "damageBegin1"
						},
						priority: 1,
						group: ["zioy_cangzhen2"],
						filter: function (event) {
							return !event.player.storage.cangzhen_round || event.player.storage.cangzhen_round - 5 > game.roundNumber;
						},
						forced: true,
						content: function () {
							trigger.num += 1;
							trigger.player.turnOver();
							trigger.player.storage.cangzhen_round = game.roundNumber;
						},
						ai: {
							damageBonus: true
						},
						"_priority": 100
					},
					"zioy_cangzhen2": {
						trigger: {
							source: "damageEnd"
						},
						forced: true,
						filter: function (event, player, trigger) {
							return [false].randomGet();
						},
						content: function () {
							trigger.player.turnOver();
						},
						"_priority": 0
					},
					"zioy_shangqin": {
						audio: "ext:无源之流:2",
						trigger: {
							global: "die"
						},
						group: ["zioy_shangqin2", "zioy_shangqin3"],
						direct: true,
						locked: true,
						preHidden: false,
						filter: function (event, player) {
							return !event.player.isAlive() && event.player != player;
						},
						init: function (player) {
							player.storage.alps_bugs = [];
						},
						content: function () {
							"step 0"
							event.p = trigger.player;
							if (!player.storage.alps_bugs.contains(event.p)) {
								event.goto(1);
							} else {
								event.togain = trigger.player.getCards("he");
								player.gain(event.togain, trigger.player, "giveAuto", "bySelf");
								event.finish();
							}
							"step 1"
							player.line(p, "red");
							var p = event.p;
							var name, name1, name2;
							player.storage.alps_bugs.push(p);
							name = p.name;
							name1 = p.name1;
							name2 = p.name2;
							p.revive();
							event.p.clearSkills();
							p.reinit(p.name, "zioy_xukongchong");
							//p.setAvatar(p.name1,'xioy_xukongchong1');
							//p.avatar2.setBackground('xioy_xukongchong1','character');
							p.node.name.innerHTML = "虚空虫";
							p.name = name;
							p.name1 = name1;
							p.name2 = name2;
							p._trueMe = player;
							p.storage.alps = player;
							p.changeGroup("jin");
							if (player.identity == "zhu") {
								p.identity = "zhong";
							} else {
								p.identity = player.identity;
							}
							game.addGlobalSkill("autoswap");
							if (p == game.me) {
								game.notMe = true;
								if (!_status.auto) ui.click.auto();
							}
							p.maxHp = p.hp = 2;
							"step 2"
							event.p.clearSkills();
							event.p.draw(2);
							player.draw(2);
							player.gainMaxHp();
							"step 3"
							var n = 0;
							var n1 = player.maxHp - player.hp - 1;
							while (n * 2 < n1) n++;
							player.recover(n);
						},
						ai: {
							threaten: function (player, target) {
								return target.storage.alps_bugs.length - 1;
							}
						},
						"_priority": 0
					},
					"zioy_hanshou": {
						trigger: {
							global: "roundStart"
						},
						skillAnimation: true,
						animationColor: "thunder",
						unique: true,
						direct: false,
						filter: function (event, player) {
							for (var i = 0; i < player.storage.alps_bugs.length; i++) {
								var p = player.storage.alps_bugs[i];
								if (!p.isAlive()) {
									return true;
								}
							}
							return false;
						},
						check: function (event, player) {
							var n = 0;
							for (var i = 0; i < player.storage.alps_bugs.length; i++) {
								var p = player.storage.alps_bugs[i];
								if (!p.isAlive()) {
									n++;
								}
							}
							return n > 2;
						},
						content: function () {
							"step 0"
							player.awakenSkill(event.name);
							event.num = 0;
							event.l = player.storage.alps_bugs;
							for (var i = 0; i < event.l.length; i++) {
								var p = event.l[i];
								if (!p.isAlive()) {
									player.line(p, "red");
									p.revive();
									p.recover(999);
									p.hp = p.maxHp;
									event.num++;
								}
							}
							"step 1"
							player.loseMaxHp(event.num);
							for (var i = 0; i < event.l.length; i++) {
								var p = event.l[i];
								player.line(p, "red");
								p.draw(event.num);
							}
						},
						"_priority": 0
					},
					"zioy_shangqin2": {
						trigger: {
							global: "useCard"
						},
						forced: true,
						filter: function (event, player) {
							return false && event.card && get.tag(event.card, "damage") && event.player.storage.alps;
						},
						content: function () {
							trigger.customArgs.default.customSource = player;
						},
						"_priority": 0
					},
					"zioy_shangqin3": {
						trigger: {
							global: "die"
						},
						filter: function (event) {
							return false && event.player.countCards("he") > 0 && event.player.storage.alps;
						},
						content: function () {
							"step 0"
							event.togain = trigger.player.getCards("he");
							player.gain(event.togain, trigger.player, "giveAuto", "bySelf");
						},
						"_priority": 0
					},
					"zioy_longzi": {
						"_priority": 0
					},
					"zioy_yingyuan": {
						trigger: {
							global: "phaseJieshuBegin"
						},
						frequent: true,
						filter: function (event, player) {
							return event.player != player && !player.isTurnedOver();
						},
						content: function () {
							player.turnOver();
						},
						init: function (player) {
							player.storage.yy_player == null;
							player.storage.yingyuan_lastround = -1;
						},
						subSkill: {
							"yy1": {
								trigger: {
									global: "phaseEnd"
								},
								forced: false,
								filter: function (event, player) {
									if (player.storage.yingyuan_lastround == game.roundNumber) return false;
									return event.player != player && player.isTurnedOver() && event.player.maxHp != event.player.hp;
								},
								content: function () {
									"step 0"
									if (player.next != trigger.player) game.swapSeat(player, player.next);
									"step 1"
									if (player.next != trigger.player) event.goto(0);
									"step 2"
									player.turnOver();
									"step 3"
									player.insertPhase();
									player.storage.yy_player = trigger.player;
									player.storage.yingyuan_lastround = game.roundNumber;
								},
								sub: true,
								"_priority": 0
							},
							"yy2": {
								trigger: {
									player: "damageBefore"
								},
								filter: function (event, player) {
									return player.isTurnedOver();
								},
								forced: true,
								content: function () {
									trigger.num -= 1;
								},
								sub: true,
								ai: {
									effect: {
										target: function (card, player, target) {
											if (!target.isTurnedOver() || player.hasSkillTag("jueqing", false, target)) return;

											var num = get.tag(card, "damage");
											if (num) {
												if (num > 1) return 0.5;
												return 0;
											}
										}
									}
								},
								"_priority": 0
							}
						},
						group: ["zioy_yingyuan_yy1", "zioy_yingyuan_yy2"],
						"_priority": 0
					},
					"zioy_hey": {
						derivation: ["zioy_guangmang"],
						trigger: {
							player: ["phaseBegin", "phaseEnd"]
						},
						logTarget: "player",
						filter: function () {
							return true;
						},
						direct: true,
						init: function (player) {
							player.storage.hey_lastp = null;
							player.storage.hey_lastr = -999;
							player.addSkill("zioy_guangmang");
						},
						content: function () {
							"step 0"
							if (player.storage.hey_lastr < game.roundNumber) {
								player.storage.hey_lastp = null;
								player.storage.hey_lastr = game.roundNumber;
							}
							var choices = ["红色", "黑色"];
							player.chooseControl(choices).set("prompt", "请选择一种颜色");
							"step 1"
							event.color = "red";
							if (result.control == "黑色") event.color = "black";
							player
								.chooseTarget(
									"请选择观看一名角色的手牌",
									function (card, player, target) {
										return target != player.storage.hey_lastp;
									},
									true
								)
								.set("ai", function (target) {
									return [-1, 1].randomGet();
								});
							"step 2"
							event.target = result.targets[0];
							player.storage.hey_lastp = event.target;
							player.viewHandcards(event.target);
							var hs = event.target.getCards("h", { color: event.color });
							var l = event.target.getCards("h").length - hs.length;
							event.flag = true;
							if (hs.length < l) event.flag = false;
							"step 3"
							var target = event.target;
							if (event.flag == true) {
								player.draw();
								event.target.draw();
							} else {
								target = player;
								player.chooseToDiscard(true);
								event.target.chooseToDiscard(true);
							}
							if (target.hasSkill("zioy_guangmang")) {
								target.removeSkill("zioy_guangmang");
							} else {
								target.addSkill("zioy_guangmang");
							}
						},
						"_priority": 0
					},
					"zioy_ya": {
						derivation: ["zioy_guangmang"],
						trigger: {
							player: "damageBegin"
						},
						filter: function (event, player) {
							if (player.hasSkill("zioy_guangmang")) return false;
							var targets = game.players;
							var ts1 = [];
							for (var i = 0; i < targets.length; ++i) {
								if (targets[i].hasSkill("zioy_guangmang")) {
									ts1.push(targets[i]);
								}
							}
							if (ts1.length > 0) return true;
							return false;
						},
						direct: true,
						content: function () {
							"step 0"
							player
								.chooseTarget(
									"是否将一名角色的光芒移动至己方区域内并防止此次伤害",
									function (card, player, target) {
										return target.hasSkill("zioy_guangmang");
									},
									false
								)
								.set("ai", function (target) {
									return 1;
								});
							"step 1"
							if (result.bool) {
								event.from = result.targets[0];
								event.from.removeSkill("zioy_guangmang");
								player.addSkill("zioy_guangmang");
								trigger.cancel();
							} else event.finish();
						},
						"_priority": 0
					},
					"zioy_ha": {
						derivation: ["zioy_guangmang"],
						trigger: {
							source: "damageAfter"
						},
						forced: true,
						filter: function (event, player, trigger) {
							var targets = game.players;
							var ts1 = [];
							for (var i = 0; i < targets.length; ++i) {
								if (targets[i].hasSkill("zioy_guangmang")) {
									ts1.push(targets[i]);
								}
							}
							if (ts1.length > 0) return true;
							return false;
						},
						content: function () {
							"step 0"
							player
								.chooseTarget(
									"请选择转出光芒的角色",
									function (card, player, target) {
										return target.hasSkill("zioy_guangmang");
									},
									false
								)
								.set("ai", function (player, target) {
									if (target == player) return 2;
									return [-1, 1].randomGet();
								});
							"step 1"
							if (result.bool) {
								event.from = result.targets[0];
								player
									.chooseTarget(
										"请选择转入光芒的角色",
										function (card, player, target) {
											return !target.hasSkill("zioy_guangmang");
										},
										false
									)
									.set("ai", function (target) {
										return 1;
									});
							} else event.finish();
							"step 2"
							if (result.bool) {
								event.to = result.targets[0];
								event.from.removeSkill("zioy_guangmang");
								event.to.addSkill("zioy_guangmang");
							}
						},
						"_priority": 0
					},
					"zioy_guangmang": {
						mark: true,
						marktext: "光芒",
						intro: {
							markcount: "expansion"
						},
						trigger: {
							player: "damageEnd"
						},
						direct: true,
						filter: function (event, player) {
							return event.num > 0;
						},
						content: function () {
							"step 0"
							var targets = game.players;
							var ts1 = [];
							for (var i = 0; i < targets.length; ++i) {
								if (targets[i].hasSkill(event.name) && targets[i] != player) {
									ts1.push(targets[i]);
								}
							}
							if (ts1.length > 0) event.target = ts1.randomGet();
							else event.finish();
							"step 1"
							player.removeSkill(event.name);
							"step 2"
							target.damage(trigger.num);
						},
						mod: {
							globalTo: function (from, to, distance) {
								if (!from.hasSkill("zioy_guangmang")) return Infinity;
							},
							globalFrom: function (from, to, distance) {
								//if(!to.hasSkill("zioy_guangmang")) return Infinity;
							}
						},
						"_priority": 0
					},
					"zioy_shihong": {
						trigger: {
							player: "phaseDrawBegin2"
						},
						forced: true,
						locked: true,
						filter: function (event, player) {
							return true || !event.numFixed;
						},
						content: function () {
							"step 0"
							var num = game.players.length;
							if (player.storage.shulin_juexing == true) {
								game.changeGlobalStatus("shuguang", num, "phase");
								event.finish();
							} else {
								num = Math.ceil(num / 2);
								var choices = [];
								for (var i = 0; i <= num; ++i) {
									choices.push(i);
								}
								player
									.chooseControl(choices)
									.set("prompt", "请选择本回合额外摸牌数")
									.set("ai", function () {
										var num = game.players.length;
										num = Math.ceil(num / 2);
										var choices = 0;
										for (var i = 0; i <= num; ++i) {
											choices = i;
										}
										if (choices < 2) choices = 2;
										return choices - 2;
									});
							}
							"step 1"
							var num = game.players.length;
							num = Math.ceil(num / 2);
							trigger.num += result.control;
							event.num = num - result.control;
							if (event.num > 0)
								player
									.chooseTarget(
										"弃置一名角色" + event.num + "张的牌",
										function (card, player, target) {
											return true;
										},
										true
									)
									.set("ai", function (target) {
										var att = get.attitude(_status.event.player, target);
										return -att;
									});
							else {
								event.finish();
							}
							"step 2"
							if (result.bool) {
								var target = result.targets[0];
								player.discardPlayerCard(target, "hej", true, event.num);
							} else {
								event.finish();
							}
						},
						ai: {
							threaten: 1.3
						},
						"_priority": 0
					},
					"zioy_cuiyi": {
						trigger: {
							player: ["phaseBegin"]
						},
						logTarget: "player",
						filter: function () {
							return true;
						},
						forced: true,
						locked: true,
						init: function (player) {
							// player.unmarkSkill('zioy_cuiyi');
						},
						mark: false,
						intro: {
							markcount: "expansion"
						},
						content: function () {
							"step 0"
							var p = player;
							var num = game.players.length;
							if (!player.storage.shulin_juexing) player.storage.shulin_juexing = false;
							if (player.storage.shulin_juexing == true) {
								var p1 = p;
								do {
									if (p1.countMark("zioy_cuiyi") > 0) p1.lockEnhancement(num, "phase");
									p1 = p1.next;
								} while (p1 != p);
							} else {
								player
									.chooseTarget(
										"请选择一名角色并将其“皠翊”拥有状态取反",
										function (card, player, target) {
											return true;
										},
										false
									)
									.set("ai", function (target) {
										var att = get.attitude(_status.event.player, target);
										if (target == player && !player.hasMark("zioy_cuiyi")) att = 100;
										// if(!player.storage.shulin_countphase && att < 0){
										//     att = -att/2;
										// }
										// num = 0 ;
										// c = ["strike","attack", "defend", "miss", "hit"];
										// for(var i = 0;i < c.length;++i){
										//     num += Math.abs(trigger.player.storage.enhancementArray[c[i]]);
										// }
										var index = 2;
										if (target.hasMark("zioy_cuiyi")) index = -1;
										return index * att;
									});
							}
							"step 1"
							if (player.storage.shulin_juexing == false && result.bool) {
								var target = result.targets[0];
								if (target.countMark("zioy_cuiyi") == 0) {
									target.addMark("zioy_cuiyi");
								} else {
									target.removeMark("zioy_cuiyi");
								}
							}
							"step 2"
							var p = player;
							if (player.storage.shulin_juexing == false) {
								var p1 = p;
								do {
									if (p1.countMark("zioy_cuiyi") > 0) {
										p1.recover();
										var c = ["strike", "attack", "defend", "miss", "hit"];
										p1.changeEnhancement(c[(2 * game.roundNumber - 1) % 5], c[(2 * game.roundNumber) % 5], 1);
									}
									p1 = p1.next;
								} while (p1 != p);
							}
						},
						"_priority": 0
					},
					"zioy_shulin": {
						trigger: {
							player: ["phaseUseBegin"]
						},
						filter: function (event, player) {
							return true;
						},
						init: function (player) {
							player.storage.shulin_juexing = false;
						},
						check: function (event, player) {
							return player.hp * 2 < player.maxHp;
						},
						skillAnimation: true,
						animationColor: "thunder",
						content: function () {
							if (player.storage.shulin_juexing == false) {
								player.storage.shulin_juexing = true;
								player.storage.shulin_countphase = 1;
								player.storage.shulin_name = player.node.name.innerHTML;
								player.node.name.innerHTML = "觉醒" + player.node.name.innerHTML;
								player.addBuffImmune("all", Infinity);
								player.recover(player.maxHp - player.hp);
							} else {
								n = player.storage.shulin_countphase - (player.maxHp - player.hp);
								if (n < 0) player.recover(player.storage.shulin_countphase);
								else {
									player.recover(player.maxHp - player.hp);
									player.draw(n);
								}
								player.storage.shulin_juexing = false;
								player.node.name.innerHTML = player.storage.shulin_name;
								player.awakenSkill("zioy_shulin");
								player.removeSkill("zioy_huangyi");
								player.removeBuffImmune("all", Infinity);
							}
						},
						group: ["zioy_shulin_count"],
						subSkill: {
							count: {
								trigger: {
									player: ["phaseBegin"]
								},
								priority: 546546,
								filter: function (event, player) {
									return player.storage.shulin_juexing;
								},
								direct: true,
								content: function () {
									player.storage.shulin_countphase++;
								},
								sub: true,
								"_priority": 54654600
							}
						},
						"_priority": 0
					},
					"zioy_huangyi": {
						trigger: {
							source: "damageBegin1"
						},
						priority: -70582140345341,
						forced: true,
						locked: true,
						filter: function (card, player, target) {
							return player.storage.huangyi_locked == false;
						},
						init: function (player) {
							player.storage.huangyi_locked = false;
						},
						content: function () {
							"step 0"
							if (player.storage.shulin_juexing == false) {
								player.recover();
								trigger.num -= 1;
								event.count = 0;
							} else {
								player.storage.huangyi_locked = true;
								if (trigger.player.storage.enhancementArray["locked"] == true) {
									trigger.player.unlockEnhancement();
								}
							}
							"step 1"
							if (player.storage.shulin_juexing == false) {
								if (trigger.player) {
									var target = trigger.player;
									var targets = game.filterPlayer(current => {
										if (current == target) return false;
										var hs = target.getCards("h");
										if (hs.length) return true;
										var js = target.getCards("j");
										for (var i = 0; i < js.length; i++) {
											if (current.canAddJudge(js[i])) return true;
										}
										if (current.isMin()) return false;
										var es = target.getCards("e");
										for (var i = 0; i < es.length; i++) {
											if (current.canEquip(es[i])) return true;
										}
										return false;
									});
									if (targets.length) {
										var next = player.chooseTarget(function (card, player, target) {
											return _status.event.targets.contains(target);
										});
										next.set("from", target);
										next.set("targets", targets);
										next.set("ai", function (target) {
											var player = _status.event.player;
											var att = get.attitude(player, target);
											var sgnatt = get.sgn(att);
											var from = _status.event.from;
											var es = from.getCards("e");
											var i;
											var att2 = get.sgn(get.attitude(player, from));
											for (i = 0; i < es.length; i++) {
												if (
													sgnatt != 0 &&
													att2 != 0 &&
													sgnatt != att2 &&
													get.sgn(get.value(es[i], from)) == -att2 &&
													get.sgn(get.effect(target, es[i], player, target)) == sgnatt &&
													target.canEquip(es[i])
												) {
													return Math.abs(att);
												}
											}
											if (
												i == es.length &&
												(!from.countCards("j", function (card) {
													return target.canAddJudge(card);
												}) ||
													att2 <= 0)
											) {
												if (from.countCards("h") > 0) return att;
												return 0;
											}
											return -att * att2;
										});
										next.set("targetprompt", "移动目标");
										next.set("prompt", "是否移动" + get.translation(target) + "的一张牌？");
									} else event.finish();
								} else {
									event.finish();
								}
							} else {
								target = trigger.player;
								num = 0;
								var c = ["strike", "attack", "defend", "miss", "hit"];
								for (var i = 0; i < c.length; ++i) {
									if (Math.abs(trigger.player.storage.enhancementArray[c[i]]) != 0) num++;
									trigger.player.changeEnhancement(c[i], -2 * trigger.player.storage.enhancementArray[c[i]]);
								}
								trigger.num += num;
							}
							"step 2"
							if (player.storage.shulin_juexing == false) {
								if (result.bool) {
									var target2 = result.targets[0];
									var target = trigger.player;
									event.targets = [target, target2];
									player.line2(event.targets, "green");
								} else {
									event.finish();
									return;
								}
							} else {
								player.storage.huangyi_locked = false;
								event.finish();
								return;
							}
							"step 3"
							if (targets.length == 2) {
								player
									.choosePlayerCard(
										"hej",
										"visible",
										true,
										function (button) {
											var player = _status.event.player;
											var targets0 = _status.event.targets0;
											var targets1 = _status.event.targets1;
											if (get.attitude(player, targets0) > 0 && get.attitude(player, targets1) < 0) {
												if (get.position(button.link) == "j") return 12;
												if (get.value(button.link, targets0) < 0 && get.effect(targets1, button.link, player, targets1) > 0) return 10;
												return 0;
											} else {
												if (get.position(button.link) == "j") return -10;
												if (get.position(button.link) == "h") return 10;
												return get.value(button.link) * get.effect(targets1, button.link, player, targets1);
											}
										},
										targets[0]
									)
									.set("targets0", targets[0])
									.set("targets1", targets[1])
									.set("filterButton", function (button) {
										var targets1 = _status.event.targets1;
										if (get.position(button.link) == "h") {
											return true;
										} else if (get.position(button.link) == "j") {
											return targets1.canAddJudge(button.link);
										} else {
											return targets1.canEquip(button.link);
										}
									});
							} else {
								event.finish();
								return;
							}
							"step 4"
							if (result.bool && result.links.length) {
								var link = result.links[0];
								if (get.position(link) == "h") {
									event.targets[1].gain(link);
								} else if (get.position(link) == "e") {
									event.targets[1].equip(link);
								} else if (link.viewAs) {
									event.targets[1].addJudge({ name: link.viewAs }, [link]);
								} else {
									event.targets[1].addJudge(link);
								}
								event.targets[0].$give(link, event.targets[1], false);
								game.log(event.targets[0], "的", link, "被移动给了", event.targets[1]);
								event.count++;
								if (event.count < 2) {
									event.goto(1);
								}
							}
						},
						"_priority": 0
					},
					"zioy_t": {
						enable: "phaseUse",
						frequent: false,
						filter: function (event, player) {
							return true;
						},
						content: function () {
							"step 0"
							player.chooseControl([1, 2, 3, 4, 5]);
							"step 1"
							var c = result.control;
							if (c == 1) {
								player.next.damage(1);
							} else if (c == 2) {
								player.removeBuffImmune("all", "id=testtest");
							} else if (c == 3) {
								console.log(player.storage.immuneBuffArray, player.storage.immuneBuffRemover);
							} else if (c == 4) {
								player.addBuffImmune("all", 2, "id=testtest");
							} else if (c == 5) {
								player.changeHujia(999);
							}
						},
						init: function (player) {},
						group: ["yingzi", "zioy_t_test"],
						subSkill: {
							test: {
								group: ["zioy_t_test_test"],
								subSkill: {
									test: {
										group: ["biyue"]
									}
								}
							}
						},
						autoSubSkill: {
							"t1": {
								trigger: {
									global: "phaseBegin"
								},
								frequent: true,
								filter: function (event, player) {
									return true;
								},
								content: function () {
									player.draw();
								},
								sub: true,
								"_priority": 0
							}
						},
						autoTranslate: {
							name: "测试技能",
							info: "测试自动导入翻译"
						},
						"_priority": 0
					},
					"zioy_shuohui": {
						trigger: {
							player: ["dieBefore", "dying"]
						},
						direct: true,
						unique: true,
						forceunique: true,
						filter: function (event, player) {
							return player.hp < player.maxHp;
						},
						init: function (player) {
							player.storage.shuohui_locked = false;
						},
						logTarget: "player",
						content: function () {
							trigger.cancel();
							for (var i = 0; i < _status.dying.length; ++i) {
								if (_status.dying[i] == player) {
									_status.dying.splice(i, 1);
								}
							}
						},
						// group: ["zioy_shuohui_damageBegin", "zioy_shuohui_recoverBegin", "zioy_shuohui_phase", "zioy_shuohui_phaseJieshu"],
						mod: {
							maxHandcard: function (player, num) {
								return player.maxHp - player.hp;
							}
						},
						autoSubSkill: {
							damageBegin: {
								trigger: {
									player: ["loseHpBegin", "damageBegin1"]
								},
								priority: 43,
								direct: true,
								unique: true,
								forceunique: true,
								filter: function (event, player) {
									return player.storage.shuohui_locked == false;
								},
								logTarget: "player",
								content: function () {
									"step 0"
									player.storage.shuohui_locked = true;
									"step 1"
									trigger.cancel();
									if (trigger.source != null) player.recover(trigger.num, trigger.source, trigger.cards, trigger.card);
									"step 2"
									player.storage.shuohui_locked = false;
									"step 3"
									event.forceDie = true;
									if ((_status.dying.contains(player) && player.isAlive()) || player.hp < player.maxHp) {
										event.finish();
										return;
									}
									_status.dying.unshift(player);
									game.broadcast(function (list) {
										_status.dying = list;
									}, _status.dying);
									event.trigger("dying");
									game.log(player, "濒死");
									"step 4"
									delete event.filterStop;
									if (player.hp < player.maxHp || event.nodying) {
										_status.dying.remove(player);
										game.broadcast(function (list) {
											_status.dying = list;
										}, _status.dying);
										event.finish();
									} else if (!event.skipTao) {
										var next = game.createEvent("_save");
										var start = false;
										var starts = [_status.currentPhase, event.source, event.player, game.me, game.players[0]];
										for (var i = 0; i < starts.length; i++) {
											if (get.itemtype(starts[i]) == "player") {
												start = starts[i];
												break;
											}
										}
										next.player = start;
										next._trigger = event;
										next.triggername = "_save";
										next.forceDie = true;
										next.setContent(function () {
											"step 0"
											event.dying = trigger.player;
											if (!event.acted) event.acted = [];
											"step 1"
											if (trigger.player.isDead()) {
												event.finish();
												return;
											}
											event.acted.push(player);
											if (
												lib.config.tao_enemy &&
												event.dying.side != player.side &&
												lib.config.mode != "identity" &&
												lib.config.mode != "guozhan" &&
												!event.dying.hasSkillTag("revertsave")
											) {
												event._result = {
													bool: false
												};
											} else if (player.canSave(event.dying)) {
												player.chooseToUse({
													filterCard: function (card, player, event) {
														event = event || _status.event;
														return lib.filter.cardSavable(card, player, event.dying);
													},
													dyingPlayer: trigger.player,
													filterTarget: function (card, player, target) {
														if (target != _status.event.dying) return false;
														if (!card) return false;
														var info = get.info(card);
														if (!info.singleCard || ui.selected.targets.length == 0) {
															var mod = game.checkMod(card, player, target, "unchanged", "playerEnabled", player);
															if (mod == false) return false;
															var mod = game.checkMod(card, player, target, "unchanged", "targetEnabled", target);
															if (mod != "unchanged") return mod;
														}
														return true;
													},
													prompt: function (event) {
														var handTip = event.handTip;
														var player = event.player;
														var target = event.dyingPlayer;
														if (player != target) {
															handTip.appendText(get.translation(target), "player");
															handTip.appendText("濒死，需要");
															handTip.appendText(1, "number");
															handTip.appendText("个桃，是否对其使用桃？");
														} else {
															handTip.appendText("你当前体力值为");
															handTip.appendText(target.hp, "number");
															handTip.appendText("，需要");
															handTip.appendText(1, "number");
															handTip.appendText("个桃，是否出桃？");
														}
														return "";
													},
													ai1: function (card) {
														if (typeof card == "string") {
															var info = get.info(card);
															if (info.ai && info.ai.order) {
																if (typeof info.ai.order == "number") {
																	return info.ai.order;
																} else if (typeof info.ai.order == "function") {
																	return info.ai.order();
																}
															}
														}
														return 1;
													},
													ai2: get.effect_use,
													type: "dying",
													targetRequired: true,
													dying: event.dying
												});
											} else {
												event._result = {
													bool: false
												};
											}
											"step 2"
											if (result.bool) {
												var player = trigger.player;
												player.hp--;
												if (player.hp >= player.maxHp && !trigger.nodying && !player.nodying && player.isAlive() && !player.isOut() && !player.removed)
													event.goto(0);
												else trigger.untrigger();
											} else {
												for (var i = 0; i < 20; i++) {
													if (event.acted.contains(event.player.next)) {
														break;
													} else {
														event.player = event.player.next;
														if (!event.player.isOut()) {
															event.goto(1);
															break;
														}
													}
												}
											}
										});
									}
									"step 5"
									_status.dying.remove(player);
									game.broadcast(function (list) {
										_status.dying = list;
									}, _status.dying);
									if (player.hp >= player.maxHp && !event.nodying && !player.nodying) player.die(event.reason);
								},
								sub: true,
								"_priority": 4300
							},
							recoverBegin: {
								trigger: {
									player: ["recoverBegin"]
								},
								direct: true,
								unique: true,
								forceunique: true,
								filter: function (event, player) {
									return player.storage.shuohui_locked == false;
								},
								logTarget: "player",
								content: function () {
									"step 0"
									player.storage.shuohui_locked = true;
									"step 1"
									trigger.cancel();
									if (trigger.source != null) {
										player.loseHp(trigger.num, trigger.source, trigger.cards, trigger.card);
									}
									// player.hp -=trigger.num;
									"step 2"
									player.storage.shuohui_locked = false;
									// game.log(player.hp);
								},
								sub: true,
								"_priority": 0
							},
							phase: {
								trigger: {
									player: "phaseBegin"
								},
								direct: true,
								content: function () {
									var next = player.phaseDiscard();
									event.next.remove(next);
									trigger.next.push(next);
									var next = player.phaseUse();
									event.next.remove(next);
									trigger.next.push(next);
									var next = player.phaseDraw();
									event.next.remove(next);
									trigger.next.push(next);
									var next = player.phaseJudge();
									event.next.remove(next);
									trigger.next.push(next);
									var next = player.phaseJieshu();
									event.next.remove(next);
									trigger.next.push(next);
								},
								sub: true,
								"_priority": 0
							},
							phaseJieshu: {
								trigger: {
									player: "phaseJieshu"
								},
								direct: true,
								content: function () {
									var evt = _status.event.getParent("phase");
									if (evt) {
										game.resetSkills();
										_status.event = evt;
										_status.event.finish();
										_status.event.untrigger(true);
									}
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_hexuchongxiang": {
						trigger: {
							player: ["loseHpBegin", "damageBegin3"]
						},
						filter: function (event, player) {
							//防止一个时机重复触发
							if (player.storage.hxcx_x1 < player.storage.hxcx_x && player.storage.hxcx_x1_flag) {
								player.storage.hxcx_x1++;
								player.storage.hxcx_x1_flag = false;
							}
							// game.log(player.storage.hxcx_x1, player.storage.hxcx_x,event.getParent().name)
							if (event.num > player.storage.hxcx_x) {
								return true;
							} else {
								return false;
							}
						},
						priority: 13,
						forced: true,
						charlotte: true,
						unique: true,
						init: function (player) {
							var p = player;
							p.storage.hxcx_x = 0;
							p.storage.hxcx_x1 = -1; // 回合内满足1时机次数
							p.storage.hxcx_x1_flag = true; // 修时机重复触发的bug
							p.storage.hxcx_count1 = 0; // 效果1触发次数
							p.storage.hxcx_count2 = 0; // 复活次数
							p.storage.yzyw_count1 = 0; // 月坠计数
							p.gainShenqi = function (num) {
								if (num > 999) num = 999;
								if (num < 0) return;
								var p = this;
								var mark = "zioy_hexuchongxiang_mark";
								var mark_count = p.countMark(mark);
								var num_gain = 0;
								var num_hp = 0;
								var num_hx = 0;
								while (num > 0) {
									num--;
									if (mark_count + num_gain + 1 <= p.maxHp) {
										num_gain++;
									} else if (p.hp + num_hp + 1 <= p.maxHp) {
										num_hp++;
									} else {
										num_hx++;
									}
								}
								// game.log(num_gain,num_hp,num_hx);
								if (num_gain > 0) p.addMark(mark, num_gain);
								if (num_hp > 0) p.recover(num_hp);
								// if(p.countMark(mark) > 0)p.markSkill(mark);
								if (num_hx > 0) {
									if (game.globalStatus.name != "shenlou") {
										game.changeGlobalStatus("shenlou", num_hx, "phase");
									} else {
										game.changeGlobalStatusEnd(num_hx);
									}
								}
								_status.event.trigger("shenqi");
							};
							p.loseShenqi = function (num) {
								if (num > 999) num = 999;
								var p = this;
								var mark = "zioy_hexuchongxiang_mark";
								var mark_count = p.countMark(mark);
								var num_lose = num;
								p.removeMark(mark, num_lose);
								_status.event.trigger("shenqi");
							};
						},
						content: function () {
							player.storage.hxcx_count1++;
							var num1 = trigger.num - player.storage.hxcx_x + player.storage.hxcx_x1;
							player.gainShenqi(num1);
							trigger.num = player.storage.hxcx_x - player.storage.hxcx_x1;
							if (player.storage.hxcx_count1 > player.storage.hxcx_x + 1) {
								// player.storage.hxcx_x *= 2;
								player.storage.hxcx_x += 1;
								if (player.storage.hxcx_x == 0) player.storage.hxcx_x++;
								player.storage.hxcx_count1 = 0;
							}
						},
						// group: [
						// 	"zioy_hexuchongxiang_revive",
						// 	"zioy_hexuchongxiang_damage",
						// 	"zioy_hexuchongxiang_loseMaxHpEnd",
						// 	"zioy_hexuchongxiang_phaseEnd",
						// 	"zioy_hexuchongxiang_useCardAfter"
						// ],
						subSkill: {
							mark: {
								mark: false,
								marktext: "蜃气",
								intro: {
									name: "蜃气"
								},
								sub: true,
								"_priority": 0
							}
						},
						autoSubSkill: {
							revive: {
								trigger: {
									player: "dieBefore"
								},
								forced: true,
								unique: true,
								forceunique: true,
								skillAnimation: true,
								animationColor: "thunder",
								filter: function (event, player) {
									var flag = false;
									var p = player.next;
									while (p != player) {
										if (p.maxHp >= player.maxHp) {
											flag = true;
											break;
										}
										p = p.next;
									}
									if (player.storage.hxcx_count2 < 2) {
										flag = true;
									}
									// if(flag == false && player.hp <= 0 && game.globalStatus.name == "shenlou"){

									// }
									return player.hp > 0 || flag;
								},
								logTarget: "player",
								content: function () {
									"step 0"
									if (player.hp > 0) {
										trigger.cancel();
										for (var i = 0; i < _status.dying.length; ++i) {
											if (_status.dying[i] == player) {
												_status.dying.splice(i, 1);
											}
										}
										player.loseHp(player.hp);
										event.finish();
									}
									"step 1"
									trigger.cancel();
									player.storage.hxcx_count2++;
									player.gainMaxHp(player.storage.hxcx_count2 + 1);
									var num_mark = player.countMark("zioy_hexuchongxiang_mark");
									player.removeMark("zioy_hexuchongxiang_mark", num_mark);
									player.changeHujia(num_mark);
									player.draw(num_mark);
									player.storage.hxcx_x = player.storage.hxcx_count2 - 1;
									player.storage.hxcx_count1 = 0;
									if (player.storage.yzyw_eq_flag) player.storage.yzyw_eq_flag = true;
									"step 2"
									player.recover(player.maxHp - player.hp);
									"step 3"
									if (player.hp < 0) {
										player.hp = player.maxHp;
										player.update();
									}
								},
								sub: true,
								"_priority": 0
							},
							damage: {
								trigger: {
									player: ["loseHpBegin", "damageBegin2", "phaseDrawBegin2"],
									source: ["damageBegin2"]
								},
								filter: function (event, player) {
									return player.storage.hxcx_count2 > 0;
								},
								priority: -301727,
								forced: true,
								charlotte: true,
								unique: true,
								direct: true,
								content: function () {
									trigger.num = parseInt(trigger.num * (player.storage.hxcx_count2 * 0.80001 + 1 + player.storage.yzyw_count1 * 0.2001));
								},
								sub: true,
								"_priority": -30172700
							},
							loseMaxHpEnd: {
								trigger: {
									player: ["loseMaxHpEnd"]
								},
								filter: function (event, player) {
									return player.countMark("zioy_hexuchongxiang_mark") > player.maxHp;
								},
								priority: -301727,
								forced: true,
								charlotte: true,
								unique: true,
								direct: true,
								content: function () {
									player.loseShenqi(player.countMark("zioy_hexuchongxiang_mark") - player.maxHp);
								},
								sub: true,
								"_priority": -30172700
							},
							phaseEnd: {
								trigger: {
									player: ["phaseEnd"]
								},
								filter: function (event, player) {
									return true;
								},
								priority: -30174563,
								charlotte: true,
								unique: true,
								direct: true,
								content: function () {
									player.storage.hxcx_x1_flag = true;
									player.storage.hxcx_x1 = -1;
								},
								sub: true,
								"_priority": -301712300
							},
							useCardAfter: {
								trigger: {
									global: ["useCardAfter", "damageEnd"],
									player: ["loseHpBegin", "damageBegin3"]
								},
								filter: function (event, player) {
									return true;
								},
								priority: -301754154563,
								charlotte: true,
								unique: true,
								direct: true,
								content: function () {
									player.storage.hxcx_x1_flag = true;
								},
								sub: true,
								"_priority": -30171230236
							}
						},
						"_priority": 1300
					},
					"zioy_yuezhuiyunwei": {
						enable: "phaseUse",
						charlotte: true,
						usable: 1,
						filter: function (event, player) {
							return player.countMark("zioy_hexuchongxiang_mark") > 0;
						},
						init: function (player) {
							player.addBuffImmune("shuimian", Infinity);
							player.storage.shenlou_noLoseHp = true;
							if (!player.storage.yzyw_count1) player.storage.yzyw_count1 = 0;
							player.storage.yzyw_eq_flag = true;
						},
						content: function () {
							"step 0"
							num = player.countMark("zioy_hexuchongxiang_mark");
							event.num = num;
							player.loseShenqi(num);
							if (game.globalStatus.name != "shenlou") {
								game.changeGlobalStatus("shenlou", num, "phase", true);
							} else {
								game.changeGlobalStatusEnd(num);
							}
							var c = ["attack", "miss", "defend", "hit", "strike"];
							for (var i = 0; i < c.length; ++i) {
								if (player.storage.enhancementArray[c[i]] > 0) continue;
								player.changeEnhancement(c[i], -2 * player.storage.enhancementArray[c[i]]);
							}
							player.removeBuff("all");
							player
								.chooseTarget(
									"令一名角色获得" + event.num + "点护甲",
									function (card, player, target) {
										return true;
									},
									true
								)
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									return att;
								});
							"step 1"
							var target = result.targets[0];
							target.changeHujia(event.num);
							player
								.chooseTarget(
									"令一名角色回复" + event.num + "点体力",
									function (card, player, target) {
										return true;
									},
									true
								)
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									return att;
								});
							"step 2"
							var target = result.targets[0];
							target.recover(event.num);
							player
								.chooseTarget(
									"令一名角色摸" + event.num + "张牌",
									function (card, player, target) {
										return true;
									},
									true
								)
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									return att;
								});
							"step 3"
							var target = result.targets[0];
							target.draw(event.num);

							"step 4"
							player
								.chooseTarget(
									"对一名角色造成" + event.num + "点伤害",
									function (card, player, target) {
										return true;
									},
									true
								)
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									return -att;
								});
							"step 5"
							var target = result.targets[0];
							target.damage(event.num);

							"step 6"
							player
								.chooseTarget(
									"弃置一名角色至多" + event.num + "张牌",
									function (card, player, target) {
										return target.countCards() > 0;
									},
									false
								)
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									return -att;
								});
							"step 7"
							if (result.bool) {
								var target = result.targets[0];
								player.discardPlayerCard(target, "hej", false, "visible", [1, event.num]);
							}

							// "step 8"
							// player
							// 	.chooseTarget(
							// 		"弃置一名角色至多" + event.num + "张牌",
							// 		function (card, player, target) {
							// 			return target.countCards() > 0;
							// 		},
							// 		false
							// 	)
							// 	.set("ai", function (target) {
							// 		var att = get.attitude(_status.event.player, target);
							// 		return -att;
							// 	});
							// "step 9"
							// if(result.bool){
							// 	var target = result.targets[0];
							// 	player.discardPlayerCard(target, "hej", false, "visible", [1, event.num])
							// }
						},
						// group: [
						// 	"zioy_yuezhuiyunwei_0",
						// 	"zioy_yuezhuiyunwei_501",
						// 	"zioy_yuezhuiyunwei_502",
						// 	"zioy_yuezhuiyunwei_1",
						// 	"zioy_yuezhuiyunwei_6",
						// 	"zioy_yuezhuiyunwei_eq"
						// ],
						ai: {
							order: 1,
							result: {
								player: function (player) {
									if (player.countMark("zioy_hexuchongxiang_mark") == player.maxHp) return 999;
									var x = player.storage.enhancementArray["attack"];
									if (x > -1) {
										return -10;
									}
									return 120;
								}
							}
						},
						autoSubSkill: {
							"0": {
								trigger: {
									global: ["phaseBegin"]
								},
								filter: function (event, player) {
									return player.countMark("zioy_hexuchongxiang_mark") <= 0.5 * player.maxHp;
								},
								direct: true,
								priority: 4544684,
								content: function () {
									player.changeEnhancement("attack", "defend", -1);
								},
								sub: true,
								"_priority": 454468400
							},
							"1": {
								trigger: {
									target: "useCardToTargeted"
								},
								filter: function (event, player) {
									return player.countMark("zioy_hexuchongxiang_mark") > 0.25 * player.maxHp;
								},
								direct: true,
								priority: 45411284,
								content: function () {
									target = trigger.player;
									var c = target.getCards("hej");
									for (let i = 0; i < c.length; ++i) {
										if (c[i].name == trigger.card.name) {
											target.discard(c[i]);
											break;
										}
									}
								},
								sub: true,
								"_priority": 4541128400
							},
							"6": {
								trigger: {
									source: "damageEnd"
								},
								filter: function (event, player) {
									return event.num > 1 && player.countMark("zioy_hexuchongxiang_mark") > 6;
								},
								direct: true,
								priority: 4584184,
								content: function () {
									player.loseMaxHp(1);
									trigger.player.gainMaxHp(1);
									player.storage.yzyw_count1++;
								},
								sub: true,
								"_priority": 458418400
							},
							"501": {
								trigger: {
									global: ["shenqi", "roundStart"]
								},
								filter: function (event, player) {
									return true;
								},
								direct: true,
								priority: 44684,
								content: function () {
									if (player.countMark("zioy_hexuchongxiang_mark") <= 0.5 * player.maxHp) {
										if (!player.storage._disableJudge) player.disableJudge();
										for (let i in lib.buffMiao) {
											if (i != "shuimian") player.addBuffImmune(i, Infinity);
										}
									} else {
										if (player.storage._disableJudge) player.enableJudge();
										for (let i in lib.buffMiao) {
											if (i != "shuimian") player.removeBuffImmune(i, Infinity);
										}
									}
								},
								sub: true,
								"_priority": 4468400
							},
							"502": {
								trigger: {
									player: "turnOverBefore"
								},
								priority: 21220,
								direct: true,
								filter: function (event, player) {
									return !player.isTurnedOver() && player.countMark("zioy_hexuchongxiang_mark") <= 0.5 * player.maxHp;
								},
								content: function () {
									trigger.cancel();
									game.log(player, "取消了翻面");
								},
								sub: true,
								"_priority": 2122000
							},
							eq: {
								trigger: {
									player: "useCardToTargeted"
								},
								filter: function (event, player) {
									return player.countMark("zioy_hexuchongxiang_mark") == player.maxHp && player.storage.yzyw_eq_flag == true;
								},
								direct: true,
								priority: 4521284,
								content: function () {
									target = trigger.target;
									var num = Math.abs(player.maxHp - target.maxHp);
									var limit = player.storage.hxcx_count2;
									if (num > limit) num = limit;
									if (num != 0) {
										if (player.maxHp < target.maxHp) {
											player.gainMaxHp(num);
											target.loseMaxHp(num);
										} else if (player.maxHp > target.maxHp) {
											player.loseMaxHp(num);
											target.gainMaxHp(num);
										}
									}
									num = Math.abs(player.hp - target.hp);
									if (num > limit) num = limit;
									if (num != 0) {
										if (player.hp < target.hp) {
											player.recover(num);
											target.loseHp(num);
										} else if (player.hp > target.hp) {
											player.loseHp(num);
											target.recover(num);
										}
									}
									player.storage.yzyw_eq_flag = false;
								},
								sub: true,
								"_priority": 452128400
							}
						},
						"_priority": 0
					},
					"zioy_pianhongxiusao": {
						"_priority": 0
					},
					"zioy_hanbosuliu": {
						"_priority": 0
					},
					"zioy_zhumingxiangan": {
						"_priority": 0
					},
					"zioy_yujin": {
						mark: false,
						marktext: "烬",
						intro: {
							name: "烬"
						},
						init: function (player) {
							player.addMark("zioy_yujin", 5);
							player.addDamageLimiter(1, "zioy_yujin");
							player.storage.zioy_yujin_gainhujia = 0;
							player.storage.zioy_yujin_hujia = player.hujia > 0;
						},
						trigger: {
							player: "damageLimit"
						},
						forced: true,
						filter: function (event, player) {
							return player.countMark("zioy_yujin") > 0;
						},
						content: function () {
							player.removeMark("zioy_yujin", 2);
							player.storage.zioy_yujin_gainhujia++;
							if (player.countMark("zioy_yujin") <= 0) {
								player.removeDamageLimiter("zioy_yujin");
							}
						},
						group: ["zioy_yujin_gainHujia", "zioy_yujin_hujiaBroken", "zioy_yujin_damageEnd", "zioy_yujin_loseHp"],
						subSkill: {
							loseHp: {
								trigger: {
									player: "loseHpBegin"
								},
								forced: true,
								filter: function (event, player) {
									return player.countMark("zioy_yujin") > 0;
								},
								content: function () {
									trigger.num = 0;
									player.removeMark("zioy_yujin", 2);
									player.storage.zioy_yujin_gainhujia++;
									if (player.countMark("zioy_yujin") <= 0) {
										player.removeDamageLimiter("zioy_yujin");
									}
								},
								sub: true,
								"_priority": 0
							},
							gainHujia: {
								trigger: {
									player: "changeHujiaEnd"
								},
								filter: function (event, player) {
									return player.hujia > 0;
								},
								direct: true,
								content: function () {
									player.storage.zioy_yujin_hujia = true;
								},
								sub: true,
								"_priority": 0
							},
							hujiaBroken: {
								trigger: {
									player: "damageEnd"
								},
								forced: true,
								filter: function (event, player) {
									return player.storage.zioy_yujin_hujia && player.hujia == 0;
								},
								priority: 212241231350,
								content: function () {
									player.storage.zioy_yujin_hujia = false;
									player.recover();
									if (trigger.source != null) {
										player.discardPlayerCard(trigger.source, "hej", false, "visible", [1, 2]);
										trigger.source.damage(1, "fire");
									}
								},
								sub: true,
								"_priority": 21224123135000
							},
							damageEnd: {
								trigger: {
									player: "damageEnd"
								},
								forced: true,
								priority: -212240,
								filter: function (event, player) {
									return player.storage.zioy_yujin_gainhujia && player.storage.zioy_yujin_gainhujia > 0;
								},
								content: function () {
									player.changeHujia(1);
									player.storage.zioy_yujin_gainhujia--;
								},
								sub: true,
								"_priority": -21224000
							}
						},
						"_priority": 0
					},
					"zioy_xumie": {
						trigger: {
							source: "damageEnd"
						},
						forced: true,
						filter: function (event, player) {
							// return event.getParent(2).name!='zioy_xumie';
							return player.storage.zioy_xumie_flag;
						},
						init: function (player) {
							player.storage.zioy_xumie_flag = true;
						},
						content: function () {
							"step 0"
							player.storage.zioy_xumie_flag = false;
							"step 1"
							if (!trigger.player.storage.zioy_xumie) {
								trigger.player.storage.zioy_xumie = 0;
							}
							trigger.player.storage.zioy_xumie++;
							if (trigger.player.storage.zioy_xumie > 1) {
								player.discardPlayerCard(trigger.player, "hej", false, "visible", [1, 2]);
							}
							if (trigger.player.storage.zioy_xumie > 2) {
								trigger.player.addSkill("zioy_xumie_1");
							}
							if (trigger.player.storage.zioy_xumie > 3) {
								trigger.player.damage(1);
							}
							if (trigger.player.storage.zioy_xumie > 4) {
								player.addMark("zioy_yujin", 1);
								player.addDamageLimiter(1, "zioy_yujin");
							}
							"step 2"
							player.storage.zioy_xumie_flag = true;
						},
						mod: {
							inRange: function (from, to) {
								if (to.storage.zioy_xumie && to.storage.zioy_xumie > 0) return true;
							}
						},
						group: ["zioy_xumie_0"],
						subSkill: {
							"0": {
								trigger: {
									player: "useCard"
								},
								direct: true,
								filter: function (event, player) {
									return (
										event.card.name == "sha" &&
										game.hasPlayer(current => {
											return current != player && current.storage.zioy_xumie && current.storage.zioy_xumie > 0;
										})
									);
								},
								content: function () {
									trigger.directHit.addArray(
										game.filterPlayer(current => {
											return current != player && current.storage.zioy_xumie && current.storage.zioy_xumie > 0;
										})
									);
								},
								sub: true,
								"_priority": 0
							},
							"1": {
								trigger: {
									source: "damageBegin1"
								},
								forced: true,
								filter: function (event, player) {
									return true;
								},
								priority: 32.01,
								content: function () {
									trigger.num -= 1;
									player.removeSkill("zioy_xumie_1");
								},
								sub: true,
								"_priority": 3201
							}
						},
						"_priority": 0
					},
					"zioy_v07yuxie": {
						trigger: {
							global: "phaseBefore",
							player: "enterGame"
						},
						forced: true,
						filter: function (event, player) {
							return event.name != "phase" || game.phaseNumber == 0;
						},
						mark: true,
						marktext: "驭械",
						intro: {
							name: "驭械",
							mark: function (dialog, storage, player) {
								if (player.countCards("h") < player.hp) return "当前处于<span style='color:blue;'>冷却</span>状态";
								return "当前处于<span style='color:red;'>暴走</span>状态";
							}
						},
						init: function (player) {
							player.unmarkSkill("zioy_v07yuxie");
						},
						content: function () {
							player.changeHujia(4);
							player.addSkill("zioy_v07yuxie_yuxie");
						},
						group: ["zioy_v07yuxie_exitYuxie"],
						subSkill: {
							exitYuxie: {
								trigger: {
									player: ["damageEnd", "changeHujiaEnd"]
								},
								direct: true,
								charlotte: true,
								filter: function (event, player) {
									return player.hasSkill("zioy_v07yuxie_yuxie") && player.hujia == 0;
								},
								priority: 22,
								content: function () {
									player.removeSkill("zioy_v07yuxie_yuxie");
								},
								sub: true,
								"_priority": 2200
							},
							yuxie: {
								init: function (player) {
									player.markSkill("zioy_v07yuxie");
									player.removeDamageLimiter(1, "zioy_v07yuxie_yuxie");
									var c = ["strike", "attack", "defend", "miss", "hit"];
									for (var i = 0; i < c.length; ++i) {
										player.changeEnhancement(c[i], -1 * player.storage.enhancementArray[c[i]]);
									}
									player.removeBuff("all");
									var cards = player.getCards("j");
									if (cards.length) {
										player.gain(cards);
									}
									player.addBuffImmune("all", Infinity);
									game.log(player, "已进入驭械状态");
								},
								onremove: function (player) {
									player.unmarkSkill("zioy_v07yuxie");
									player.addDamageLimiter(1, "zioy_v07yuxie_yuxie");
									var c = ["strike", "attack", "defend", "miss", "hit"];
									for (var i = 0; i < c.length; ++i) {
										player.changeEnhancement(c[i], -1 * player.storage.enhancementArray[c[i]]);
									}
									player.removeBuff("all");
									var cards = player.getCards("j");
									if (cards.length) {
										player.gain(cards);
									}
									player.removeBuffImmune("all", Infinity, "id=zioy_v07yuxie");
									game.log(player, "已退出驭械状态");
								},
								mod: {
									globalFrom: function (from, to, current) {
										if (from.hp <= from.countCards("h")) return current - 2;
									},
									cardUsable: function (card, player) {
										if (player.hp <= player.countCards("h")) return true;
									},
									maxHandcard: function (player, num) {
										return num + player.hujia;
									}
								},
								group: [
									"zioy_v07yuxie_yuxie1",
									"zioy_v07yuxie_yuxie2",
									"zioy_v07yuxie_yuxie3",
									"zioy_v07yuxie_yuxie4",
									"zioy_v07yuxie_yuxie5",
									"zioy_v07yuxie_yuxie6",
									"zioy_v07yuxie_yuxie7"
								],
								sub: true,
								"_priority": 0
							},
							"yuxie1": {
								trigger: {
									player: "useCard"
								},
								direct: true,
								filter: function (event, player) {
									if (player.countCards("h") < player.hp) return false;
									return (
										event.card.name == "sha" &&
										game.hasPlayer(current => {
											return current != player;
										})
									);
								},
								content: function () {
									trigger.directHit.addArray(
										game.filterPlayer(current => {
											return current != player;
										})
									);
								},
								sub: true,
								"_priority": 0
							},
							"yuxie2": {
								trigger: {
									player: "useCardToPlayer"
								},
								forced: true,
								filter: function (event, player) {
									if (player.countCards("h") >= player.hp) return false;
									if (get.type2(event.card) != "trick") return false;
									return player != event.target; //event.targets.some(i=>i!=player);
								},
								content: function () {
									player.discardPlayerCard(trigger.target, "hej", false, [1, 2]);
								},
								sub: true,
								"_priority": 0
							},
							"yuxie3": {
								trigger: {
									player: "damageBegin1"
								},
								direct: true,
								filter: function (event, player) {
									if (player.countCards("h") >= player.hp) return false;
									return event.num > 1;
								},
								priority: 0.4547,
								content: function () {
									trigger.num--;
									player.recover();
								},
								sub: true,
								"_priority": 45.47
							},
							"yuxie4": {
								trigger: {
									player: "useCard"
								},
								forced: true,
								priority: 0.4457,
								filter: function (event, player) {
									if (player.countCards("he") == 0) return false;
									if (player.countCards("h") < player.hp) return false;
									// if(event.card.name=='sha') return true;
									return true;
								},
								autodelay: true,
								content: function () {
									player.chooseToDiscard(true, "hej");
								},
								sub: true,
								"_priority": 44.57
							},
							"yuxie5": {
								trigger: {
									player: "useCardEnd"
								},
								forced: true,
								filter: function (event, player) {
									if (player.countCards("h") >= player.hp) return false;
									for (var i = 0; i < player.storage.zioy_yuxie5_cards.length; i++) {
										for (var c of event.cards) {
											if (player.storage.zioy_yuxie5_cards[i] == c) {
												return false;
											}
										}
									}
									return event.cards && player.storage.zioy_yuxie5_flag && get.type(event.card) != "equip";
								},
								init: function (player) {
									player.storage.zioy_yuxie5_flag = true;
									player.storage.zioy_yuxie5_cards = [];
								},
								content: function () {
									player.gain(trigger.cards);
									for (var c of trigger.cards) {
										player.storage.zioy_yuxie5_cards.push(c);
									}
									player.storage.zioy_yuxie5_flag = false;
								},
								sub: true,
								"_priority": 0
							},
							"yuxie6": {
								trigger: {
									global: "phaseEnd"
								},
								direct: true,
								filter: function (event, player) {
									return true;
								},
								priority: 0.6854,
								autodelay: true,
								content: function () {
									player.storage.zioy_yuxie5_flag = true;
									player.storage.zioy_yuxie5_cards = [];
								},
								sub: true,
								"_priority": 68.54
							},
							"yuxie7": {
								trigger: {
									player: "gainEnd"
								},
								direct: true,
								filter: function (event, player) {
									return player.countCards("h") > player.hp;
								},
								autodelay: true,
								content: function () {
									player.storage.zioy_yuxie5_flag = true;
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_f42chongzai": {
						enable: "phaseUse",
						usable: 1,
						filter: function (event, player) {
							return player.hasSkill("zioy_v07yuxie_yuxie");
						},
						check: function (event, player) {
							return player.countCards("h") < player.hp;
						},
						init: function (player) {
							player.storage.zioy_f42chongzai_hp = 0;
							player.storage.zioy_f42chongzai_hujia = 0;
						},
						content: function () {
							"step 0"
							// event.i = 0;
							event.players = [...game.players].reverse();
							"step 1"
							var p = event.players.pop();
							p.damage(1, "nosource", "nocard");
							player.line(p);
							"step 2"
							if (event.players.length != 0) {
								event.goto(1);
							} else {
								player.draw(3);
								if (player.hp != 1) {
									player.hp -= 1;
									player.storage.zioy_f42chongzai_hp += 1;
								}
								if (player.hujia && player.hujia > 0) {
									player.changeHujia(-1);
									player.storage.zioy_f42chongzai_hujia += 1;
								}
								player.update();
							}
						},
						ai: {
							order: 1,
							result: {
								player: 2.5
							}
						},
						group: ["zioy_f42chongzai_1"],
						subSkill: {
							"1": {
								enable: "phaseUse",
								usable: 1,
								filter: function (event, player) {
									// return true;
									return !player.hasSkill("zioy_v07yuxie_yuxie");
								},
								filterCard: function (card) {
									var suit = get.suit(card);
									for (var i = 0; i < ui.selected.cards.length; i++) {
										if (get.suit(ui.selected.cards[i]) == suit) return false;
									}
									return true;
								},
								complexCard: true,
								selectCard: [1, 4],
								check: function (card, player) {
									return true;
								},
								mark: false,
								marktext: "能量",
								intro: {
									name: "能量"
								},
								content: function () {
									"step 0"
									var num = cards.length;
									if (num < 4) {
										player.addMark("zioy_f42chongzai_1", num - 1);
									} else {
										player.addMark("zioy_f42chongzai_1", num);
									}
									if (player.hp > 1) {
										player.addMark("zioy_f42chongzai_1", player.hp - 1);
										player.hp = 1;
									}
									player.addSkill("zioy_f42chongzai_2");
									"step 1"
									if (player.storage.zioy_f42chongzai_hp > 0) {
										player.recover(player.storage.zioy_f42chongzai_hp);
										player.storage.zioy_f42chongzai_hp = 0;
									}
									player.update();
								},
								ai: {
									order: 1,
									result: {
										player: 1
									}
								},
								sub: true,
								"_priority": 0
							},
							"2": {
								trigger: {
									global: "phaseEnd"
								},
								direct: true,
								priority: 3254,
								charlotte: true,
								filter: function (event, player) {
									return player.countMark("zioy_f42chongzai_1") < player.maxHp;
								},
								content: function () {
									player.recover();
									player.addMark("zioy_f42chongzai_1", 1);
								},
								group: ["zioy_f42chongzai_3"],
								sub: true,
								"_priority": 325400
							},
							"3": {
								trigger: {
									global: "phaseEnd"
								},
								forced: true,
								skillAnimation: true,
								animationColor: "thunder",
								unique: true,
								charlotte: true,
								priority: 3278,
								filter: function (event, player) {
									return player.countMark("zioy_f42chongzai_1") >= player.maxHp;
								},
								autodelay: true,
								content: function () {
									num = player.countMark("zioy_f42chongzai_1");
									player.removeMark("zioy_f42chongzai_1", num);
									num += player.storage.zioy_f42chongzai_hujia;
									player.changeHujia(num);
									player.storage.zioy_f42chongzai_hujia = 0;
									if (num > player.maxHp) {
										player.gainMaxHp(1);
									}
									player.removeSkill("zioy_f42chongzai_2");
									player.addSkill("zioy_v07yuxie_yuxie");
								},
								sub: true,
								"_priority": 327800
							}
						},
						"_priority": 0
					},
					"zioy_yuemai": {
						trigger: {
							source: "damageEnd"
						},
						locked: true,
						forced: true,
						filter: function (event, player) {
							return get.status(game.globalStatus.name).type != "environment";
						},
						content: function () {
							"step 0"
							game.changeGlobalStatus("mizhang", 8);
							"step 1"
							if (game.globalStatus.name == "mizhang") {
								player.changeHujia(2);
							}
						},
						mod: {
							globalFrom: function (from, to, distance) {
								if (game.globalStatus.name == "mizhang") return distance - 1;
							}
						},
						group: ["zioy_yuemai_jianshang"],
						subSkill: {
							jianshang: {
								trigger: {
									global: "changeGlobalStatus_End"
								},
								direct: true,
								filter: function () {
									return true;
								},
								content: function () {
									if (game.globalStatus.name == "mizhang") {
										player.addDamageMitigationer(0.5, "zioy_yuemai_jianshang");
									} else {
										player.removeDamageMitigationer("zioy_yuemai_jianshang");
									}
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_liechenyuyou_water": {
						init: function (player) {
							player.storage.kami_protect = "water";
						},
						forced: true,
						unique: true,
						charlotte: true,
						locked: true,
						silent: false,
						priority: 523451,
						trigger: {
							player: "phaseDrawBegin"
						},
						content: function () {
							trigger.num += 2;
						},
						group: ["zioy_liechenyuyou_water_draw1", "zioy_liechenyuyou_water_damage"],
						subSkill: {
							"draw1": {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								silent: false,
								priority: 523452,
								trigger: {
									player: ["phaseEnd", "roundStart"]
								},
								content: function () {
									player.draw(1);
								},
								sub: true,
								"_priority": 5234500457
							},
							damage: {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								silent: false,
								priority: 523453,
								trigger: {
									source: "damageBegin1"
								},
								filter: function (event, player) {
									if (event.player.group == "shen") return false;
									return !event.player.storage.kami_protect || event.player.storage.kami_protect == "fire";
								},
								content: function () {
									trigger.num += 1;
								},
								sub: true,
								"_priority": 5234501
							}
						},
						"_priority": 5234502
					},
					"zioy_pinghuqiuyue": {
						init: function (player) {
							player.addDamageLimiter(2, "zioy_pinghuqiuyue");
							player.storage.pinghuqiuyue_targetHasHujia = false;
						},
						onremove: function (player) {
							player.removeDamageLimiter("zioy_pinghuqiuyue");
						},
						trigger: {
							player: "loseHpEnd"
						},
						mod: {
							maxHandcardBase: function (player, num) {
								num -= 1;
								if (num < 3) num = 3;
								return num;
							}
						},
						forced: true,
						direct: true,
						silent: false,
						priority: 523445,
						mark: true,
						marktext: "怒气",
						intro: {
							name: "怒气"
						},
						content: function () {
							player.addTempSkill("zioy_pinghuqiuyue_noLoseHp", "roundStart");
							player.zioy_get_nuqi = function () {
								return this.countMark("zioy_pinghuqiuyue");
							};
						},
						group: [
							"zioy_pinghuqiuyue_damage2hujia",
							"zioy_pinghuqiuyue_damageEndS",
							"zioy_pinghuqiuyue_damageEndP",
							"zioy_pinghuqiuyue_damageLimit",
							"zioy_pinghuqiuyue_phaseEnd",
							"zioy_pinghuqiuyue_dyingBegin"
						],
						ai: {
							threaten: 10
						},
						subSkill: {
							noLoseHp: {
								trigger: {
									player: "loseHpBegin"
								},
								forced: true,
								direct: true,
								charlotte: true,
								silent: false,
								priority: 523455,
								content: function () {
									trigger.cancel();
								},
								sub: true,
								"_priority": 52345001
							},
							"damage2hujia": {
								trigger: {
									source: "damageBegin1"
								},
								forced: true,
								priority: 523245,
								filter: function (event, player) {
									return event.player && event.player.hujia > 0;
								},
								content: function () {
									trigger.num += 1;
									player.storage.pinghuqiuyue_targetHasHujia = true;
								},
								sub: true,
								"_priority": 52324500
							},
							damageEndS: {
								trigger: {
									source: "damageEnd"
								},
								forced: true,
								priority: 523456,
								filter: function (event, player) {
									return true;
								},
								content: function () {
									if (player.storage.pinghuqiuyue_targetHasHujia) {
										player.storage.pinghuqiuyue_targetHasHujia = false;
										if (trigger.player.hujia == 0) {
											player.addMark("zioy_pinghuqiuyue", 7);
										}
									}
									player.addMark("zioy_pinghuqiuyue", trigger.num);
								},
								sub: true,
								"_priority": 52345002
							},
							damageEndP: {
								trigger: {
									player: "damageEnd"
								},
								forced: true,
								priority: 524345,
								filter: function (event, player) {
									return true;
								},
								content: function () {
									player.addMark("zioy_pinghuqiuyue", trigger.num);
								},
								sub: true,
								"_priority": 52434500
							},
							dyingBegin: {
								trigger: {
									source: "dyingBegin"
								},
								forced: true,
								priority: 524545,
								filter: function (event, player) {
									return true;
								},
								content: function () {
									player.addMark("zioy_pinghuqiuyue", 7);
								},
								sub: true,
								"_priority": 52454500
							},
							phaseEnd: {
								trigger: {
									player: "phaseEnd"
								},
								forced: true,
								nolog: true,
								priority: 523415,
								filter: function (event, player) {
									return player.countMark("zioy_pinghuqiuyue") > 0;
								},
								content: function () {
									"step 0"
									player.removeMark("zioy_pinghuqiuyue", 1);
									player.draw(2);
									"step 1"
									if (player.countMark("zioy_yurangzhijian_chengsheng") > 0) {
										let n = player.countMark("zioy_yurangzhijian_chengsheng");
										let loss = Math.min(n, player.countMark("zioy_pinghuqiuyue"));
										if (loss > 0) player.removeMark("zioy_pinghuqiuyue", loss);
										if (n > loss) {
											if (player.countMark("zioy_yurangzhijian_chengsheng") > 1) {
												player.removeMark("zioy_yurangzhijian_chengsheng", 1);
											}
										}
									}
								},
								sub: true,
								"_priority": 52341500
							},
							damageLimit: {
								trigger: {
									player: "damageLimit"
								},
								forced: true,
								priority: 5415,
								content: function () {
									player.addMark("zioy_pinghuqiuyue", 7);
								},
								sub: true,
								"_priority": 541500
							}
						},
						"_priority": 523450045
					},
					"zioy_yurangzhijian": {
						enable: ["chooseToUse"],
						filter: function (event, player) {
							if (event.type == "dying") {
								if (player != event.dying) return false;
								return true;
							} else if (event.parent.name == "phaseUse") {
								return true;
							}
							return false;
						},
						usable: 1,
						unique: true,
						init: function (player) {
							player.storage.yurangzhijian_nuqi = 0.0;
							player.storage.yurangzhijian_count = 0;
						},
						content: function () {
							nuqi = player.countMark("zioy_pinghuqiuyue");
							player.removeMark("zioy_pinghuqiuyue", nuqi);
							m = 0;
							if (player.hasSkill("zioy_yurangzhijian_chengsheng")) {
								m = player.countMark("zioy_yurangzhijian_chengsheng");
								if (m < 4) {
									m = m - 1;
								} else {
									m = 3;
								}
								if (m > 0) player.removeMark("zioy_yurangzhijian_chengsheng", m);
							}
							game.changeGlobalStatus("xiyu", 5, "round");
							player.addBuffImmune("all", 5, "round");
							x = player.storage.yurangzhijian_count;
							y = parseInt(0 - x + parseInt(nuqi / 3) + m);
							if (y > 0) {
								player.recover(y);
							} else if (y < 0) {
								if (player.hasSkill("zioy_yurangzhijian_chengsheng")) {
									player.chooseToDiscard("h", Math.min(player.countCards("h"), -y), true);
								} else {
									player.chooseToDiscard("he", Math.min(player.countCards("he"), -y), true);
								}
							}
							if (player.hasSkill("zioy_yurangzhijian_chengsheng")) {
								player.addSkill("zioy_yurangzhijian_damage");
							}
							if (player.storage.yurangzhijian_nuqi + nuqi >= 10 && !player.hasSkill("zioy_yurangzhijian_chengsheng")) {
								player.addSkill("zioy_yurangzhijian_chengsheng");
								player.addMark("zioy_yurangzhijian_chengsheng", 1);
							}
							player.storage.yurangzhijian_nuqi += nuqi / 3 + 0.001;
							player.draw(Math.min(parseInt(nuqi + 0.001), 7));
							player.storage.yurangzhijian_count += 1.5;
						},
						ai: {
							order: 1,
							save: true,
							result: {
								player: function (player) {
									var x = player.storage.yurangzhijian_count;
									var n = player.countMark("zioy_pinghuqiuyue");
									var m = player.countMark("zioy_yurangzhijian_chengsheng");
									var y = parseInt(0 - x + n / 3 + m);
									if (player.storage.yurangzhijian_nuqi + n >= 10 && !player.hasSkill("zioy_yurangzhijian_chengsheng")) {
										return 100;
									}
									if (player.hp < 3 && y > 0) {
										return 100;
									}
									if (player.hp <= 0) {
										return 999;
									}
									return Math.min(y, player.maxHp - player.hp) - 1;
								}
							}
						},
						subSkill: {
							damage: {
								trigger: {
									player: "damageBegin"
								},
								forced: true,
								priority: 54145,
								content: function () {
									trigger.num = 0;
									player.removeSkill("zioy_yurangzhijian_damage");
								},
								sub: true,
								"_priority": 5414500
							},
							chengsheng: {
								mark: true,
								marktext: "盛怒",
								charlotte: true,
								unique: true,
								direct: true,
								intro: {
									name: "盛怒"
								},
								init: function (player) {
									game.log(player, "已进入盛怒");
								},
								trigger: {
									player: "useCard"
								},
								filter: function (event, player) {
									return event.card && get.tag(event.card, "damage");
								},
								content: function () {
									if (player.countMark("zioy_yurangzhijian_chengsheng") < 7) {
										player.addMark("zioy_yurangzhijian_chengsheng", 1);
									}
								},
								mod: {
									cardUsable: function (card, player, num) {
										if (card.name == "sha") return num + parseInt(player.countMark("zioy_yurangzhijian_chengsheng") * 0.43);
									},
									canBeDiscarded: function (card) {
										if (get.position(card) == "e") return false;
									},
									attackFrom: function (from, to, distance) {
										if (!from.getEquip(1)) return -Infinity;
									}
								},
								group: ["zioy_yurangzhijian_wushuang", "zioy_yurangzhijian_damageEnd", "zioy_yurangzhijian_damageBegin"],
								sub: true,
								"_priority": 0
							},
							wushuang: {
								trigger: {
									player: "useCardToPlayered"
								},
								forced: true,
								filter: function (event, player) {
									return event.card.name == "sha" && !event.getParent().directHit.contains(event.target);
								},
								logTarget: "target",
								content: function () {
									var id = trigger.target.playerid;
									var map = trigger.getParent().customArgs;
									if (!map[id]) map[id] = {};
									n = parseInt(player.countMark("zioy_yurangzhijian_chengsheng") / 2.3);
									if (n == 0) {
										n = 1;
									}
									if (typeof map[id].shanRequired == "number") {
										map[id].shanRequired += n;
									} else {
										map[id].shanRequired = n + 1;
									}
								},
								ai: {
									"directHit_ai": true,
									skillTagFilter: function (player, tag, arg) {
										if (arg.card.name != "sha" || arg.target.countCards("h", "shan") > parseInt(player.countMark("zioy_yurangzhijian_chengsheng") / 2.3))
											return false;
									}
								},
								sub: true,
								"_priority": 0
							},
							damageEnd: {
								trigger: {
									source: "damageEnd"
								},
								forced: true,
								priority: 5243145,
								filter: function (event, player) {
									return true;
								},
								content: function () {
									player.recover(parseInt(trigger.num * 0.05 * player.countMark("zioy_yurangzhijian_chengsheng")));
									if (parseInt(trigger.num * 0.15 * player.countMark("zioy_yurangzhijian_chengsheng")) > 0)
										player.discardPlayerCard(
											trigger.player,
											"hej",
											true,
											Math.min(trigger.player.countCards("hej"), player.countMark("zioy_yurangzhijian_chengsheng"))
										);
								},
								sub: true,
								"_priority": 524314500
							},
							damageBegin: {
								trigger: {
									source: "damageBegin1"
								},
								direct: true,
								charlotte: true,
								priority: 5045,
								filter: function (event, player) {
									return true;
								},
								content: function () {
									trigger.num += parseInt(0.58 * player.countMark("zioy_yurangzhijian_chengsheng"));
								},
								sub: true,
								"_priority": 504500
							}
						},
						"_priority": 0
					},
					"zioy_liechenyuyou_fire": {
						init: function (player) {
							player.storage.kami_protect = "fire";
						},
						forced: true,
						unique: true,
						charlotte: true,
						locked: true,
						priority: 523457,
						trigger: {
							player: "phaseDrawBegin"
						},
						content: function () {
							trigger.num += 2;
						},
						group: ["zioy_liechenyuyou_fire_draw1", "zioy_liechenyuyou_fire_damage"],
						subSkill: {
							"draw1": {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								priority: 523458,
								trigger: {
									player: ["phaseEnd", "roundStart"]
								},
								content: function () {
									player.draw(1);
								},
								sub: true,
								"_priority": 5234500456
							},
							damage: {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								priority: 523459,
								trigger: {
									source: "damageBegin1"
								},
								filter: function (event, player) {
									if (event.player.group == "shen") return false;
									return !event.player.storage.kami_protect || event.player.storage.kami_protect == "wood";
								},
								content: function () {
									trigger.num += 1;
								},
								sub: true,
								"_priority": 5234500457
							}
						},
						"_priority": 5234500786
					},
					"zioy_zhuxingwuchang": {
						filter: function (event, player) {
							return player.countMark("zioy_yongyeqingxiao") == 0;
						},
						direct: true,
						locked: true,
						trigger: {
							source: "damageEnd"
						},
						content: function () {
							"step 0"
							if (player.hp != 1) player.loseHp(1);
							"step 1"
							if (game.globalStatus.name != "huoshan") {
								player.recover(2);
							} else {
								player.recover(4);
							}
							"step 2"
							if (game.roundNumber % 2 == 1) {
								game.changeGlobalStatus("rerang", 3);
							} else {
								game.changeGlobalStatus("huoshan", 3);
							}
						},
						group: ["zioy_zhuxingwuchang_damageBegin", "zioy_zhuxingwuchang_damageEnd", "zioy_zhuxingwuchang_useCard"],
						subSkill: {
							damageBegin: {
								filter: function (event, player) {
									return get.status(game.globalStatus.name).type == "weather";
								},
								direct: true,
								locked: true,
								trigger: {
									player: ["useCardToBefore"]
								},
								content: function () {
									trigger.card.nature = "fire";
								},
								"_priority": 165463463456,
								sub: true
							},
							useCard: {
								trigger: {
									player: "useCard"
								},
								direct: true,
								locked: true,
								filter: function (event, player) {
									return get.status(game.globalStatus.name).type == "environment";
								},
								content: function () {
									trigger.directHit.addArray(game.filterPlayer());
								},
								sub: true,
								"_priority": 0
							},
							damageEnd: {
								filter: function (event, player) {
									return get.status(game.globalStatus.name).type == "weather";
								},
								direct: true,
								locked: true,
								trigger: {
									source: "damageEnd"
								},
								content: function () {
									"step 0"
									if (trigger.player.countCards("hej") > 0) player.discardPlayerCard(trigger.player, "hej", true, 1);
								},
								sub: true,
								"_priority": 123
							}
						},
						"_priority": 16
					},
					"zioy_zhufashengmie": {
						trigger: {
							player: "dieBefore"
						},
						forced: true,
						unique: true,
						forceunique: true,
						skillAnimation: true,
						animationColor: "thunder",
						filter: function (event, player) {
							return true;
						},
						content: function () {
							"step 0"
							player.awakenSkill("zioy_zhufashengmie");
							trigger.cancel();
							"step 1"
							player.hp = player.maxHp;
							"step 2"
							player.addTempSkill("zioy_lockHp", { player: "phaseUseEnd" });
							"step 3"
							player.update();
						},
						"_priority": 0
					},
					"zioy_yongyeqingxiao": {
						init: function (player) {
							player.addMark("zioy_yongyeqingxiao", 5);
							// player.storage.huoshan_no = true;
						},
						usable: null,
						mark: false,
						marktext: "无瞋",
						intro: {
							name: "无瞋",
							mark: function () {
								return "复有三法，谓三善根：一者不贪，二者不恚，三者不痴。";
							}
						},
						enable: "phaseUse",
						filter: function (event, player) {
							return player.countMark("zioy_yongyeqingxiao") > 0 && player.countMark("zioy_yongyeqingxiao") != 5;
						},
						content: function () {
							var n = player.countMark("zioy_yongyeqingxiao");
							n = 5 - n;
							player.addMark("zioy_yongyeqingxiao", n);
							player.draw(parseInt(n * 1.25 + 0.01));
							if (parseInt(n / 1.5 + 0.01) > 0 && !player.hasSkill("zioy_yongyeqingxiao_recoverMark")) {
								player.recover(parseInt(n / 2 + 0.01));
								player.addTempSkill("zioy_yongyeqingxiao_recoverMark");
							}
							player.addBuffImmune("all", n);
							if (game.roundNumber % 2 == 1) {
								game.changeGlobalStatus("rerang", n);
							} else {
								game.changeGlobalStatus("huoshan", n);
							}
						},
						mod: {
							globalFrom: function (from, to, distance) {
								if (from.countMark("zioy_yongyeqingxiao") == 0) return distance - 4;
							},
							cardUsable: function (card, player, num) {
								if (player.countMark("zioy_yongyeqingxiao") == 0) if (card.name == "sha") return num + 1;
							}
						},
						ai: {
							order: 1,
							result: {
								player: function (player) {
									var n = player.countMark("zioy_yongyeqingxiao");
									n = 5 - n;
									return 5 * (n - 2);
								}
							},
							threaten: 10
						},
						group: ["zioy_yongyeqingxiao_useCard"],
						subSkill: {
							useCard: {
								trigger: {
									player: "useCardEnd"
								},
								filter: function (event, player) {
									return player.countMark("zioy_yongyeqingxiao") > 0;
								},
								direct: true,
								content: function () {
									"step 0"
									player.removeMark("zioy_yongyeqingxiao");
									if (player.countCards("he") > 0) {
										player.chooseToDiscard("he", 1, true);
									}
									"step 1"
									if (player.countMark("zioy_yongyeqingxiao") == 0) {
										player.disableJudge();
										player.addBuffImmune("all", Infinity);
									}
								},
								sub: true,
								"_priority": 0
							},
							recoverMark: {
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_nongying": {
						trigger: {
							player: ["chooseToRespondBegin", "chooseToUseBegin"]
						},
						filter: function (event, player) {
							if (event.responded) return false;
							if (!event.filterCard({ name: "shan" }, player, event)) return false;
							return true;
						},
						content: function () {
							trigger.untrigger();
							// game.log(trigger)
							trigger.responded = true;
							trigger.result = { bool: true, card: { name: "shan" } };
							if (player.hp < player.maxHp) {
								player.recover();
								player.loseMaxHp();
							} else {
								player.loseHp();
								player.gainMaxHp();
							}
						},
						mod: {
							cardname: function (card) {
								if (card.name == "shan") return "sha";
							}
						},
						group: ["zioy_nongying_2"],
						subSkill: {
							"2": {
								trigger: {
									player: ["useCard", "respond"]
								},
								filter: function (event, player) {
									if (event.card.name != "sha") return false;
									for (var c of event.cards) {
										if (c.name == "shan") return true;
									}
									return false;
								},
								forced: true,
								content: function () {
									if (player.hp < player.maxHp) {
										player.recover();
										player.loseMaxHp();
									} else {
										player.loseHp();
										player.gainMaxHp();
									}
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_chanjuan": {
						trigger: {
							player: "recoverEnd"
						},
						filter: function (event, player) {
							return event && event.num > 0;
						},
						direct: true,
						content: function () {
							"step 0"
							player
								.chooseTarget(
									"令任意名其他角色回复" + trigger.num + "点体力",
									function (card, player, target) {
										return target.hp < target.maxHp && target != player;
									},
									[
										1,
										game.countPlayer(function (target) {
											return target.hp < target.maxHp;
										})
									],
									false
								)
								.set("ai", function (target) {
									var att = get.attitude(_status.event.player, target);
									return att;
								});
							"step 1"
							if (result.bool) {
								for (var p of result.targets) {
									p.recover(trigger.num);
								}
							}
						},
						"_priority": 0
					},
					"zioy_leimingqiangu": {
						trigger: {
							player: ["damageBegin"]
						},
						filter: function (event, player) {
							return true;
						},
						init: function (player) {
							player.getTailCount = function () {
								return this.maxHp + this.countMark("zioy_zhoumingchuanxuan");
							};
							player.addDamageLimiter(parseInt(player.getTailCount() / 3 + 0.001), "zioy_leimingqiangu");
						},
						mark: true,
						marktext: "鸣雷",
						intro: {
							name: "鸣雷"
						},
						unique: true,
						forced: true,
						content: function () {
							"step 0"
							if (player.getTailCount() < 9) player.gainMaxHp();
							"step 1"
							if (player.getTailCount() < 9) player.recover();
							"step 2"
							if (player.getTailCount() < 9) player.addDamageLimiter(parseInt(player.getTailCount() / 3), "zioy_leimingqiangu");
							"step 3"
							player.addMark("zioy_leimingqiangu", player.getTailCount() * 5);
							event.trigger("addMark_zioy_leimingqiangu");
						},
						group: [
							"zioy_leimingqiangu_useCard",
							"zioy_leimingqiangu_damageBegin",
							"zioy_leimingqiangu_addMark",
							"zioy_leimingqiangu_phaseDraw",
							"zioy_leimingqiangu_source",
							"zioy_leimingqiangu_updateDamageLimiter"
						],
						subSkill: {
							damageBegin: {
								trigger: {
									source: ["damageBegin"]
								},
								filter: function (event, player) {
									return player.getTailCount() >= 9;
								},
								forced: true,
								content: function () {
									"step 0"
									trigger.num += 2;
								},
								sub: true,
								"_priority": 0
							},
							useCard: {
								trigger: {
									player: ["useCard"]
								},
								filter: function (event, player) {
									return player.getTailCount() < 9 && event.card && get.tag(event.card, "damage");
								},
								forced: true,
								content: function () {
									"step 0"
									player.gainMaxHp();
									"step 1"
									player.recover();
									"step 2"
									player.addDamageLimiter(parseInt(player.getTailCount() / 2 + 0.01), "zioy_leimingqiangu");
								},
								sub: true,
								"_priority": 0
							},
							addMark: {
								trigger: {
									player: ["addMark_zioy_leimingqiangu"]
								},
								filter: function (event, player) {
									return player.countMark("zioy_leimingqiangu") >= 200;
								},
								forced: true,
								content: function () {
									"step 0"
									player.removeMark("zioy_leimingqiangu", 200);
									player.recover();
									if (player.getTailCount() >= 9) player.storage.leimingqiangu_count++;
									"step 1"
									if (player.countMark("zioy_leimingqiangu") >= 200) {
										event.goto(0);
									}
								},
								sub: true,
								"_priority": 0
							},
							updateDamageLimiter: {
								trigger: {
									player: ["loseAfter", "changeHp", "gainMaxHpAfter", "loseMaxHpAfter"]
								},
								direct: true,
								filter: function () {
									return true;
								},
								content: function () {
									player.addDamageLimiter(parseInt(player.getTailCount() / 3 + 0.01), "zioy_leimingqiangu");
								},
								sub: true,
								"_priority": 0
							},
							phaseDraw: {
								trigger: {
									player: "phaseDrawBegin"
								},
								forced: true,
								filter: function (event, player) {
									return !event.numFixed;
								},
								content: function () {
									trigger.num = parseInt(player.getTailCount() / 1.5 + 0.001);
								},
								ai: {
									threaten: 1.3
								},
								sub: true,
								"_priority": 0
							},
							source: {
								trigger: {
									source: ["damageEnd"]
								},
								filter: function (event, player) {
									return player.storage.leimingqiangu_source;
								},
								init: function (player) {
									player.storage.leimingqiangu_source = true;
									player.storage.leimingqiangu_count = 0;
								},
								forced: true,
								content: function () {
									"step 0"
									player.storage.leimingqiangu_source = false;
									"step 1"
									if (player.storage.leimingqiangu_count > 0) {
										trigger.player.damage(1, "thunder");
										player.storage.leimingqiangu_count--;
									}
									"step 2"
									player.storage.leimingqiangu_source = true;
									player.addMark("zioy_leimingqiangu", trigger.num * 3 * player.getTailCount());
									event.trigger("addMark_zioy_leimingqiangu");
								},
								sub: true,
								"_priority": 0
							},
							loseMaxHpEnd: {
								trigger: {
									player: ["addMark_zioy_leimingqiangu"]
								},
								filter: function (event, player) {
									return true;
								},
								direct: true,
								content: function () {
									if (player.getTailCount() >= 9) player.storage.leimingqiangu_count++;
								},
								sub: true,
								"_priority": 156
							}
						},
						"_priority": 0
					},
					"zioy_zhoumingchuanxuan": {
						mod: {
							selectTarget: function (card, player, range) {
								if (player.hasSkill("zioy_leimingqiangu") && !["delay"].contains(get.type(card)) && range[1] != -1)
									range[1] += parseInt(player.getTailCount() / 3);
							},
							attackFrom: function (from, to, distance) {
								if (from.hasSkill("zioy_leimingqiangu")) return distance - parseInt(from.getTailCount() / 3);
							}
						},
						trigger: {
							player: "useCardToTarget"
						},
						forced: true,
						mark: true,
						marktext: "雷殊",
						intro: {
							name: "雷殊"
						},
						logTarget: "target",
						filter: function (event, player) {
							return event.target && event.target != player && event.targets.length == 1 && player.maxHp > 1;
						},
						content: function () {
							player.loseMaxHp(1);
							player.addMark("zioy_zhoumingchuanxuan");
						},
						group: ["zioy_zhoumingchuanxuan_phaseUse"],
						subSkill: {
							phaseUse: {
								enable: "phaseUse",
								usable: 1,
								skillAnimation: true,
								animationColor: "thunder",
								filter: function (event, player) {
									return player.countMark("zioy_zhoumingchuanxuan") > 1;
								},
								content: function () {
									"step 0"
									event.num = parseInt(player.countMark("zioy_zhoumingchuanxuan") / 1.5);
									player.removeMark("zioy_zhoumingchuanxuan", player.countMark("zioy_zhoumingchuanxuan"));
									player
										.chooseTarget(
											"对至多" + event.num + "名其他角色造成" + event.num + "点伤害",
											function (card, player, target) {
												return target != player;
											},
											[1, event.num],
											true
										)
										.set("ai", function (target) {
											var att = get.attitude(_status.event.player, target);
											return -att;
										});
									"step 1"
									if (result.bool) {
										for (var p of result.targets) {
											p.damage(event.num, "thunder");
										}
									}
								},
								ai: {
									order: 1,
									result: {
										player: function (player) {
											var n = player.countMark("zioy_zhoumingchuanxuan");
											return 3;
										}
									}
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_riyuexingkong": {
						trigger: {
							global: "phaseBefore",
							player: "enterGame"
						},
						forced: true,
						direct: true,
						derivation: ["zioy_yaoyangsong", "zioy_huiyueyao"],
						filter: function (event, player) {
							// return true;
							return event.name != "phase" || game.phaseNumber == 0;
						},
						mod: {
							inRange: function (from, to) {
								if (!from.storage._miao_twins || !from.storage._miao_twins.isIn() || from.storage.zioy_riyuexingkong_inRange_flag === false) return;
								// 防止堆栈溢出
								from.storage._miao_twins.storage.zioy_riyuexingkong_inRange_flag = false;
								from.storage.zioy_riyuexingkong_inRange_flag = false;
								var res = from.inRange(to);
								if (from.storage._miao_twins.inRange(to)) {
									res = true;
								}
								from.storage._miao_twins.storage.zioy_riyuexingkong_inRange_flag = true;
								from.storage.zioy_riyuexingkong_inRange_flag = true;
								return res;
							},
							globalFrom: function (from, to, distance) {
								if (!from.storage._miao_twins || !from.storage._miao_twins.isIn() || from.storage.zioy_riyuexingkong_inRange_flag === false) return distance;
								from.storage._miao_twins.storage.zioy_riyuexingkong_inRange_flag = false;
								from.storage.zioy_riyuexingkong_inRange_flag = false;
								var num = Math.min(get.distance(from, to), get.distance(from.storage._miao_twins, to));
								from.storage._miao_twins.storage.zioy_riyuexingkong_inRange_flag = true;
								from.storage.zioy_riyuexingkong_inRange_flag = true;
								return num;
							}
						},
						content: function () {
							"step 0"
							// player.node.avatar.style.backgroundImage = path + 'zioy_xiyueying1.jpg")'
							player.changeAvatarMiao("zioy_xiyueying.jpg", "zioy_xiyueying1.jpg");
							player.node.name.innerHTML = "耀阳";
							player.sex = "male";

							// game.log((parseInt(player.dataset.position) + parseInt((parseInt(player.dataset.position) + game.players.length + 0.01)/2+0.01)+1)%game.players.length, player.name)

							var p = game.addPlayer(
								(parseInt(player.dataset.position) + parseInt((parseInt(player.dataset.position) + game.players.length + 0.01) / 2 + 0.01) + 1) %
									game.players.length,
								player.name
							);

							//fix bug....
							for (var s of player.getSkills()) {
								// p.removeSkill("zioy_riyuexingkong")
								// p.addSkill("zioy_riyuexingkong")
								p.removeSkill(s);
								p.addSkill(s);
							}
							player.addSkill("zioy_yaoyangsong");
							p.addSkill("zioy_huiyueyao");
							p.changeAvatarMiao("zioy_xiyueying.jpg", "zioy_xiyueying2.jpg");
							p.node.name.innerHTML = "辉月";
							p.maxHp = player.maxHp;
							p.hp = player.hp;
							p.hujia = player.hujia;
							p.directgain(get.cards(4));
							// p._trueMe = player;
							p.sex = "female";

							p.identity = player.identity;
							p.setIdentity();
							p.identityShown = true;

							p.storage._miao_twins = player;
							player.storage._miao_twins = p;

							"step 1"
							player.storage._miao_twins._trueMe = player;
							"step 2"
							game.addGlobalSkill("autoswap");

							// player.removeSkill(event.name);
							// p.removeSkill(event.name)
							// for(var p1 of game.players){
							//     game.log(p1.sex,typeof p1.sex)
							//     game.log(p1.identity)
							// }
							// game.log(p1.sex,typeof p1.sex)
						},
						group: ["zioy_riyuexingkong_die", "zioy_riyuexingkong_return", "zioy_riyuexingkong_win"],
						subSkill: {
							die: {
								trigger: {
									player: "dieBefore"
								},
								filter: function (event, player) {
									if(!player.storage._miao_twins)return false
									// game.log(player.storage._miao_twins.hp > 0&& player.storage._miao_twins.isIn()&&event.getParent().name!='giveup'&&player.maxHp>0)
									return !player.storage._miao_twins.storage.zioy_riyuexingkong_die;
								},
								forced: true,
								direct: true,
								priority: -1561565189,
								content: function () {
									"step 0"
									// 休整
									if (player.storage._miao_twins.hp > 0 && player.storage._miao_twins.isIn() && event.getParent().name != "giveup" && player.maxHp > 0) {
										// trigger.cancel();
										trigger.setContent(function () {
											event.forceDie = true;
											// event.forceDie=true;
											// if (source) {
											//     game.log(player, "被", source, "杀害");
											//     if (source.stat[source.stat.length - 1].kill == undefined) {
											//         source.stat[source.stat.length - 1].kill = 1;
											//     } else {
											//         source.stat[source.stat.length - 1].kill++;
											//     }
											// } else {
											//     game.log(player, "阵亡");
											// }
											// if(player.isIn()&&(false&&(!_status.mbmowang_return||!_status.mbmowang_return[player.playerid]))){
											event.reserveOut = true;
											game.log(player, "进入了修整状态");
											game.log(player, "移出了游戏");
											// }
											// else event.finish();
											if (!game.countPlayer()) game.over();
											else if (player.hp != 0) {
												player.changeHp(0 - player.hp, false).forceDie = true;
											}
											game.broadcastAll(function (player) {
												if (player.isLinked()) {
													if (get.is.linked2(player)) {
														player.classList.toggle("linked2");
													} else {
														player.classList.toggle("linked");
													}
												}
												if (player.isTurnedOver()) {
													player.classList.toggle("turnedover");
												}
											}, player);
											game.addVideo("link", player, player.isLinked());
											game.addVideo("turnOver", player, player.classList.contains("turnedover"));
											// game.broadcastAll(function(player){
											player.classList.add("out");
											// });

											// if(game.me == player){
											//     game.me = player.storage._miao_twins;
											// }

											// player.$dieAfter();
											// player.classList.remove("fullskin2");
											// player.node.avatar2.classList.add("hidden");

											// player.node.framebg.dataset.auto='silver';
											// player.node.framebg.dataset.decoration='silver';
										});
										trigger.includeOut = true;
										event.finish();
									}

									// 死透了
									else {
										// game.broadcastAll(function(player){
										player.storage._miao_twins.classList.remove("out");
										// });
										player.storage._miao_twins.storage.zioy_riyuexingkong_die = true;
										player.storage.zioy_riyuexingkong_die = true;
										// game.me = player
										//主公死晚一点
										if (game.zhu == player.storage._miao_twins) {
											game.zhu = player;
										}
										player.storage._miao_twins.die();
										// player.die()
									}
								},
								ai: {
									threaten: 0.6,
									effect: {
										target: function (card, player, target) {
											for (var p of target.getEnemies()) {
												if (p == player) {
													if (target.hp - target.storage._miao_twins.hp == 0) return 10;
													return 15 * (target.hp - target.storage._miao_twins.hp);
												}
											}
											// if(target.storage._miao_twins.hp == 0) return;
											// if (get.attitude(player, target) >= 0) return -10;
											// if (get.tag(card, "damage")) {
											//     if (target.hp - target.storage._miao_twins.hp == 0) return 1;
											//     return 15 * (target.hp - target.storage._miao_twins.hp);
											// }
										}
									}
								},
								sub: true,
								"_priority": -156156518900
							},
							return: {
								trigger: {
									player: "phaseBefore"
								},
								forced: true,
								charlotte: true,
								silent: true,
								forceDie: true,
								forceOut: true,
								filter: function (event, player) {
									return event.player.isOut();
								},
								content: function () {
									"step 0"
									game.broadcastAll(function (player) {
										player.classList.remove("out");
									}, trigger.player);
									game.log(trigger.player, "移回了游戏");
									trigger.player.recover(trigger.player.maxHp - trigger.player.hp);
									"step 1"
									event.trigger("restEnd");
								},
								sub: true,
								popup: false,
								"_priority": 1
							},
							win: {
								trigger: {
									global: "phaseBefore"
								},
								filter: function (event, player) {
									var flag = false;
									for (var p of game.players) {
										if (p != player && p != player.storage._miao_twins) {
											flag = true;
											break;
										}
									}
									return !flag;
								},
								content: function () {
									game.over(player == game.me || player.storage._miao_twins == game.me || winners.contains(game.me));
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_jisuishengjin": {
						enable: "phaseUse",
						filter: function () {
							return true;
						},
						init: function (player) {
							player.storage.jisuishengjin_ai = "nb1";
						},
						content: function () {
							player.damage(1);
						},
						ai: {
							order: 99,
							result: {
								player: function (player) {
									if (!player.storage.jisuishengjin_ai || player.storage.jisuishengjin_ai == "nb") {
										if (player.countCards("h", "tao") + player.countCards("h", "jiu") > 0) return 9999;
										if (player.hp < 3) return -1;
										return 9999;
									} else if (true) {
										return -1;
									} else {
									}
								}
							}
						},
						group: ["zioy_jisuishengjin_draw"],
						subSkill: {
							draw: {
								trigger: {
									player: "damageEnd"
								},
								filter: function () {
									return true;
								},
								frequent: true,
								content: function () {
									"step 0"
									event.num = trigger.num;
									"step 1"
									event.cards = get.cards(8);
									player.chooseCardButton("获得至多4张牌", [0, 4], event.cards, true).ai = function (button) {
										if (button.link == "tao" && button.link == "jiu") {
											return 99;
										} else {
											return get.useful(button.link);
										}
									};
									"step 2"
									if (result.bool) {
										var cards1 = [];
										for (var i = 0; i < result.links.length; i++) {
											cards1.push(result.links[i]);
											event.cards.remove(result.links[i]);
										}
										player.gain(cards1);
									}
									for (var i = event.cards.length - 1; i >= 0; i--) {
										ui.cardPile.insertBefore(event.cards[i], ui.cardPile.firstChild);
									}
									event.num--;
									if (event.num > 0) event.goto(1);
								},
								sub: true,
								"_priority": 0
							}
						},
						"_priority": 0
					},
					"zioy_yaoyangsong": {
						"_priority": 0
					},
					"zioy_huiyueyao": {
						"_priority": 0
					},
					"zioy_biubiubiu": {
						trigger: {
							global: "useCardAfter"
						},
						forced: true,
						filter: function (event, player) {
							return (
								get.type(event.card) == "trick" &&
								event.card.isCard &&
								event.card.name != "shandian" &&
								event.player.getExpansions("zioy_biubiubiu").length == 0 &&
								player.storage.zioy_biubiubiu_flag1
							);
						},
						init: function (player) {
							player.storage.zioy_biubiubiu_range_unlimit = false;
							player.storage.zioy_biubiubiu_flag = true;
							player.storage.zioy_biubiubiu_flag1 = true;
						},
						mark: false,
						marktext: "泡泡",
						intro: {
							name: "泡泡",
							mark: function (dialog, storage, player) {
								if (player.getExpansions("zioy_biubiubiu")) dialog.addAuto(player.getExpansions("zioy_biubiubiu"));
							}
						},
						content: function () {
							"step 0"
							var cards = trigger.cards;
							event.card = cards;
							trigger.player.addToExpansion(event.card, "giveAuto", player).gaintag.add("zioy_biubiubiu");
							trigger.player.markSkill("zioy_biubiubiu");
						},
						group: ["zioy_biubiubiu_uctt"],
						subSkill: {
							uctt: {
								trigger: {
									global: "useCardToTarget"
								},
								filter: function (event, player) {
									return (
										event.targets.length == 1 &&
										(event.target == player || event.player == player) &&
										game.countPlayer(function (player) {
											return player.getExpansions("zioy_biubiubiu").length != 0;
										}) > 0 &&
										player.storage.zioy_biubiubiu_flag
									); //&&lib.filter.targetEnabled2(event.card,event.player,player);
								},
								direct: true,
								content: function () {
									"step 0"
									player
										.chooseTarget(get.prompt2("zioy_biubiubiu").split("②")[1], function (card, player, target) {
											return target.getExpansions("zioy_biubiubiu").length != 0;
										})
										.set("ai", target => {
											return Math.random() * 100;
										});
									"step 1"
									if (result.bool) {
										event.target = result.targets[0];
										event.card = event.target.getExpansions("zioy_biubiubiu")[0];
										game.log(player, "尝试执行", event.card, "的效果");
										event.target.discard(event.card);
										event.target.unmarkSkill("zioy_biubiubiu");
										if (event.card.name == "wuxie") {
											// 我放弃了
											game.log(player, "尝试执行", event.card, "失败");
											// if(get.type(trigger.card)=='trick'){
											//     // event.getParent(1)._trigger.neutralize();
											//     // event.getParent(2)._trigger.neutralize();
											//     // event.getParent(3)._trigger.neutralize();
											//     // player.storage.zioy_biubiubiu_flag1 = false;
											//     // player.useCard('wuxie')
											//     player.addSkill('zioy_biubiubiu_wuxie')
											//     trigger.cancelled=true;
											// }
											event.skip = true;
										} else if (event.card.name == "nanman" || event.card.name == "wanjian") {
											player.storage.zioy_biubiubiu_flag = false;
											for (var i of game.players) {
												if (player == i) continue;
												var next = game.createEvent(event.card.name);
												next.player = player;
												next.target = i;
												next.setContent(lib.card[event.card.name].content);
												player.line(i);
											}
											player.storage.zioy_biubiubiu_flag = true;
											event.skip = true;
										} else if (event.card.name == "wugu" || event.card.name == "taoyuan") {
											player.storage.zioy_biubiubiu_flag1 = false;
											player.useCard(event.card, game.players);
											player.line(i);
											event.skip = true;
										} else if (player.hasUseTarget(event.card)) {
											player
												.chooseTarget(
													lib.card[event.card.name].filterTarget,
													lib.card[event.card.name].selectTarget == -1 ? 1 : lib.card[event.card.name].selectTarget,
													true
												)
												.set("ai", target => {
													if (typeof lib.card[event.card.name].ai.result.target == "function")
														return lib.card[event.card.name].ai.result.target(player, target);
												});
											event.skip = false;
										} else {
											game.log(player, "尝试执行", event.card, "失败");
										}
									} else {
										event.finish();
									}
									"step 2"
									if (result && result.bool && !event.skip) {
										if (event.card.name == "tiesuo") {
											player.storage.zioy_biubiubiu_flag = false;
											for (var i of result.targets) {
												event.target1 = i;
												var next = game.createEvent(event.card.name);
												next.player = player;
												next.target = event.target1;
												next.targets = result.targets;
												next.setContent(lib.card[event.card.name].content);
											}
											player.storage.zioy_biubiubiu_flag = true;
										} else {
											event.target1 = result.targets[0];
											var next = game.createEvent(event.card.name);
											next.player = player;
											next.target = event.target1;
											next.targets = result.targets;
											next.setContent(lib.card[event.card.name].content);
										}
									} else {
										// event.finish()
									}
									"step 3"
									player.storage.zioy_biubiubiu_flag1 = true;
									"step 4"
									// if(player != event.target)game.swapSeat(player,event.target)
									if (player != event.target) {
										game.swapSeat(player, event.target);

										if (player.getExpansions("zioy_biubiubiu").length != 0) {
											var c = player.getExpansions("zioy_biubiubiu");
											event.target.addToExpansion(c, "giveAuto", player).gaintag.add("zioy_biubiubiu");
											event.target.markSkill("zioy_biubiubiu");
											player.unmarkSkill("zioy_biubiubiu");
										}

										if (trigger.target == player) {
											var evt = trigger.getParent();
											evt.triggeredTargets2.remove(player);
											evt.targets.remove(player);
											evt.targets.push(event.target);
										}

										if (trigger.player == player) {
											var evt = trigger.getParent();
											evt.player = event.target;
										}
									}
									"step 5"
									for (var p of game.players) {
										if (p.getExpansions("zioy_biubiubiu").length == 0) {
											p.unmarkSkill("zioy_biubiubiu");
										}
									}
								}
							},
							wuxie: {
								trigger: {
									target: "useCardToTarget",
									player: "addJudgeBefore"
								},
								direct: true,
								filter: () => {
									return true;
								},
								content: function () {
									player.say("fuck");
									// event.getParent(2)._trigger.neutralize();
									trigger.neutralize();
									player.removeSkill(event.name);
								}
							}
						},
						"_priority": 0
					},
					"zioy_shoufa": {
						frequent: true,
						unique: true,
						priority: 5234105,
						trigger: {
							source: "damageBegin1"
						},
						filter: function (event, player) {
							return true;
						},
						content: function () {
							"step 0"
							player
								.chooseControl([1, 2, 3], true)
								.set("prompt", "请选择你认为1+1=？的答案")
								.set("ai", () => {
									return "2";
								});
							"step 1"
							if (result.control == 2) {
								var num = 100;
								while (num < trigger.player.maxHp) num *= 10;
								trigger.num = num * 10 - 1;
							}
						},
						sub: true,
						"_priority": 52345004248
					},
					"zioy_liechenyuyou_wood": {
						init: function (player) {
							player.storage.kami_protect = "wood";
						},
						forced: true,
						unique: true,
						charlotte: true,
						locked: true,
						priority: 5234511,
						trigger: {
							player: "phaseDrawBegin"
						},
						content: function () {
							trigger.num += 2;
						},
						group: ["zioy_liechenyuyou_wood_draw1", "zioy_liechenyuyou_wood_damage"],
						subSkill: {
							"draw1": {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								priority: 5234512,
								trigger: {
									player: ["phaseEnd", "roundStart"]
								},
								content: function () {
									player.draw(1);
								},
								sub: true,
								"_priority": 523450078578
							},
							damage: {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								priority: 5234135,
								trigger: {
									source: "damageBegin1"
								},
								filter: function (event, player) {
									if (event.player.group == "shen") return false;
									return !event.player.storage.kami_protect || event.player.storage.kami_protect == "water";
								},
								content: function () {
									trigger.num += 1;
								},
								sub: true,
								"_priority": 523450075878
							}
						},
						"_priority": 5234500697
					},
					"zioy_zhifenghuifang": {
						enable: "phaseUse",
						filter: function (event, player) {
							return true;
						},
						usable: 1,
						content: function () {
							"step 0"
							if (game.roundNumber % 2 == 1) {
								if (game.globalStatus.name != "fenfang") game.changeGlobalStatus("fenfang", 3);
							} else if (get.status(game.globalStatus.name).type == "weather") {
								game.changeGlobalStatus("senluowanxiang", true, 3);
							}
							"step 1"
							var str = "";
							if (get.status(game.globalStatus.name).type == "weather") {
								str = "选择一名角色令其获得“华予”";
							} else if (get.status(game.globalStatus.name).type == "environment") {
								str = "选择一名角色令其获得“篁蔓”";
							} else {
								return event.finish();
							}
							player.chooseTarget(str, 1, false).set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								var index = get.status(game.globalStatus.name).type == "weather" ? 1 : -1;
								if (get.status(game.globalStatus.name).type == "weather") {
									if (target.hasSkill("zioy_zhifenghuifang_huayu")) {
										index *= 0.5;
									}
								} else {
									if (target.hasSkill("zioy_zhifenghuifang_huangman")) {
										index *= 0.5;
									}
								}
								return att * index;
							});
							"step 2"

							// game.log(result,result.bool,result.targets,result.targets[0])
							if (result.bool) {
								// game.log(123)
								let tgt = result.targets[0];
								// game.log(tgt)
								if (get.status(game.globalStatus.name).type == "weather") {
									if (!tgt.hasSkill("zioy_zhifenghuifang_huayu")) {
										let hj = tgt.hujia;
										tgt.changeHujia(-hj);
										tgt.recover(hj + 1);
										tgt.draw(3);
									}
									lib.skill["zioy_zhifenghuifang"].addH("huayu", tgt);
								} else if (get.status(game.globalStatus.name).type == "environment") {
									if (!tgt.hasSkill("zioy_zhifenghuifang_huangman")) {
										let hp = tgt.hp;
										// game.log(hp,tgt)
										tgt.loseHp(hp - 1);
										tgt.changeHujia(hp - 1);
										player.discardPlayerCard(tgt, [1, Math.min(tgt.countCards("hej"), 3)], "hej");
									}
									lib.skill["zioy_zhifenghuifang"].addH("huangman", tgt);
								}
							}
						},
						addH: function (type, player) {
							if (type == "huayu") {
								if (player.hasSkill("zioy_zhifenghuifang_huangman")) {
									player.removeSkill("zioy_zhifenghuifang_huangman");
								}
								player.storage.huayu_index = 0.75;
								player.addSkill("zioy_zhifenghuifang_huayu");
								game.log(player, "获得了<span style='color:yellow'>华予</span>");
							} else {
								if (player.hasSkill("zioy_zhifenghuifang_huayu")) {
									player.removeSkill("zioy_zhifenghuifang_huayu");
								}
								player.addSkill("zioy_zhifenghuifang_huangman");
							}
						},
						ai: {
							order: 50,
							result: {
								player: () => {
									return 9999;
								}
							}
						},
						sub: true,
						group: ["zioy_zhifenghuifang_gainHuayuPhaseBegin"],
						subSkill: {
							"gainHuayuPhaseBegin": {
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								// priority: 5234413455454545,
								trigger: {
									global: "phaseBegin"
								},
								filter: function (event, player) {
									return !player.hasSkill("zioy_zhifenghuifang_huayu");
								},
								content: function () {
									lib.skill["zioy_zhifenghuifang"].addH("huayu", player);
								},
								sub: true,
								"_priority": 52305151541575878
							},
							"huayu": {
								mark: true,
								marktext: "华予",
								intro: {
									name: "华予",
									mark: function (dialog, storage, player) {
										return (
											">>①你获得全异常免疫。<br>>>②受到伤害后，你有" +
											parseInt(player.storage.huayu_index * 100 + 0.001) +
											"%几率回复1点体力。<br>>>③当你即将受到伤害时，若此伤害值不小于你当前体力值，限制你受到的伤害不超过1直到任意伤害结算完成。<br>>>④防止你的手牌于回合外被弃置。<br>>>⑤当你受到伤害后，伤害来源获得“篁蔓”。"
										);
									}
								},
								init: function (player) {
									player.addBuffImmune("all", Infinity, "id=zioy_zhifenghuifang_huayu");
								},
								onremove: function (player) {
									player.removeBuffImmune("all", Infinity, "id=zioy_zhifenghuifang_huayu");
								},
								trigger: {
									player: ["damageBegin3"]
								},
								filter: function (event, player) {
									var min = Infinity;
									if (player.storage._damageLimiter_Miao) {
										for (var i = 0; i < player.storage._damageLimiter_Miao.length; ++i) {
											var limiter = player.storage._damageLimiter_Miao[i];
											if (player.storage._damageLimiter_Miao[i].num < min) min = player.storage._damageLimiter_Miao[i].num;
										}
									}
									return Math.min(event.num, min) >= player.hp;
								},
								priority: -705830,
								forced: true,
								charlotte: true,
								unique: true,
								content: function () {
									player.addDamageLimiter(1, "zioy_zhifenghuifang_huayu");
								},
								group: ["zioy_zhifenghuifang_huayu_damageEnd", "zioy_zhifenghuifang_huayu_loseBegin"]
							},
							"huayu_damageEnd": {
								trigger: {
									player: ["damageEnd"]
								},
								filter: function (event, player) {
									return true;
								},
								priority: 67452453,
								forced: true,
								charlotte: true,
								unique: true,
								content: function () {
									player.removeDamageLimiter("zioy_zhifenghuifang_huayu");
									if (Math.random() < player.storage.huayu_index) {
										player.recover(1);
										player.storage.huayu_index *= 0.75;
									}
									if (trigger.source) lib.skill["zioy_zhifenghuifang"].addH("huangman", trigger.source);
								}
							},
							"huayu_loseBegin": {
								trigger: {
									player: "loseBefore"
								},
								forced: true,
								filter: function (event, player) {
									return _status.currentPhase != player && event.type == "discard";
								},
								content: function () {
									// player.say('gagagag')
									cardh = player.getCards("h");
									// console.log(trigger.cards)
									trigger.cards = trigger.cards.filter(c => !cardh.includes(c));
									// game.log('666')
									// console.log(trigger.cards)
									// for(var c of trigger.cards){
									// 	console.log(c,Object.getOwnPropertyDescriptors(c))
									// }
									// trigger.cancel()
								}
							},
							"huangman": {
								mark: true,
								marktext: "篁蔓",
								intro: {
									name: "篁蔓",
									mark: function (dialog, storage, player) {
										return ">>①你计算与其他角色的距离+2。<br>>>②当你造成伤害后，你弃置等同于你本回合造成过伤害值总和数量的牌。<br>>>③当你造成伤害后，受伤角色获得“华予”";
									}
								},
								mod: {
									globalFrom(from, to, distance) {
										return distance + 2;
									}
								},
								trigger: {
									source: ["damageEnd"]
								},
								filter: function (event, player) {
									return true;
								},
								priority: 674523,
								forced: true,
								charlotte: true,
								unique: true,
								content: function () {
									lib.skill["zioy_zhifenghuifang"].addH("huayu", trigger.player);
									if (player.countCards("he") > 0) player.chooseToDiscard("he", Math.min(player.countCards("he"), player.getStat("damage")), true);
								}
							}
						},
						"_priority": 52345007865
					},
					"zioy_liwuyaomiao": {
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return game.roundNumber % player.hp == 0;
						},
						forced: true,
						content: function () {
							player.recover(1);
						},
						"_priority": 52345007865,
						group: ["zioy_liwuyaomiao_damageBegin1", "zioy_liwuyaomiao_judge"],
						subSkill: {
							damageBegin1: {
								trigger: {
									player: "damageBegin1"
								},
								silent: true,
								direct: true,
								init: p => (p.storage.liwuyaomiao_dff = false),
								filter(event, player) {
									// if(p.storage.liwuyaomiao_dff === true){
									// 	return false
									// }
									// p.storage.liwuyaomiao_dff = true

									for (let i = 0; i < 20; ++i) {
										if (event.getParent(i) && event.getParent(i).name === "phase") {
											if (event.getParent(i).player === player) return false;
										}
									}
									return true;
								},
								async content(event, trigger, player) {
									for (let i = 0; i < 20; ++i) {
										if (event.getParent(i) && event.getParent(i).name === "phase") {
											event.getParent(i).player = player;
										}
									}
								}
							},
							judge: {
								trigger: {
									global: "roundStart"
								},
								filter: function (event, player) {
									return game.roundNumber === 2;
								},
								silent: true,
								direct: true,
								init: player => player.disableJudge(),
								async content(event, trigger, player) {
									player.enableJudge();
								}
							}
						}
					},
					"zioy_jietian": {
						trigger: {
							player: "phaseBegin"
						},
						filter: function (event, player) {
							return player.hujia < player.hp;
						},
						forced: true,
						locked: true,
						content: function () {
							"step 0"
							player.damage(1);
							"step 1"
							player.changeHujia(1);
						},
						"_priority": 1245275511
					},
					"zioy_yunshuang": {
						trigger: {
							global: "damageBegin2"
						},
						filter: function (event, player) {
							if (player.storage.zioy_yunshuang_roundNumber < game.roundNumber) {
								player.storage.zioy_yunshuang_roundNumber = game.roundNumber;
								player.storage.zioy_yunshuang_count = 0;
							}
							return event.source && event.source.isIn() && player.storage.zioy_yunshuang_count < 2;
							// &&event.player.getCards('hej').length>1;
						},
						direct: true,
						init: function (player) {
							player.storage.zioy_yunshuang_count = 0;
							player.storage.zioy_yunshuang_roundNumber = 0;
						},
						content: function () {
							"step 0"
							var choices = ["是", "否"];
							player
								.chooseControl(choices)
								// .set("prompt", "陨霜：请选择一项")
								.set(
									"prompt",
									"是否防止" +
										get.translation(trigger.source) +
										"对" +
										get.translation(trigger.player) +
										"造成伤害并令" +
										get.translation(trigger.source) +
										"弃置" +
										get.translation(trigger.player) +
										"至多2张牌"
								)
								.set("ai", () => {
									var target = trigger.player;
									var player = trigger.source;
									var eff = get.damageEffect(target, player, player, trigger.nature);
									// game.log(target,eff)
									if (get.attitude(player, target) > 0) {
										if (target.countCards("j") > 0) {
											return "是";
										}
										if (eff >= 0) return "否";
										return "是";
									}
									if (eff <= 0) return "是";
									if (target.hp == 1) return "否";
									if (trigger.num > 1 || player.hasSkill("tianxianjiu") || player.hasSkill("luoyi2") || player.hasSkill("reluoyi2")) return "否";
									if (target.countCards("hej") < 2) return "否";
									var num = 0;
									var cards = target.getCards("hej");
									for (var i = 0; i < cards.length; i++) {
										if (get.value(cards[i]) > 6) num++;
									}
									if (num >= 2) return "是";
									return "否";
								});
							"step 1"
							if (result.control == "否") event.finish();
							"step 2"
							game.log(player, "发动了", '<span style="color:yellow">' + get.translation(event.name) + "</span>");
							player.storage.zioy_yunshuang_count++;
							trigger.cancel();
							trigger.source.line(trigger.player);
							trigger.source.discardPlayerCard("hej", trigger.player, [0, 2], true);
						},
						"_priority": 124527551144
					},
					"zioy_helu": {
						trigger: {
							player: "useCardToPlayered"
						},
						check: function (event, player) {
							return true;
						},
						filter: function (event, player) {
							return event.target != player && player.countCards("h") > 0;
						},
						init: function (player) {
							// player.storage.zioy_helu_map = {}
						},
						content: function () {
							"step 0"
							player.chooseCard("h", 1);
							"step 1"
							if (result.bool) {
								var c = result.cards[0];
								trigger.getParent().directHit.add(trigger.target);
								trigger.target.gain(c);
								if (!trigger.target.storage.zioy_helu_num) {
									trigger.target.storage.zioy_helu_num = 0;
								}
								trigger.target.storage.zioy_helu_num++;
							}
						},
						group: ["zioy_helu_draw"],
						subSkill: {
							draw: {
								trigger: {
									global: "phaseEnd"
								},
								forced: true,
								filter: function (event, player) {
									return event.player.storage.zioy_helu_num;
								},
								content: function () {
									player.draw(2 * trigger.player.storage.zioy_helu_num);
									trigger.player.storage.zioy_helu_num = 0;
								}
							}
						}
					},
					"zioy_shimeng": {
						init: function (player) {
							player.storage.shidai_layer = 0;
						},
						trigger: {
							global: ["die", "roundStart"]
						},
						filter: () => {
							return true;
						},
						content: function () {
							player.storage.shidai_layer++;
							// game.log(player.storage.shidai_layer)
						},
						direct: true,
						group: ["zioy_shimeng_1", "zioy_shimeng_2", "zioy_shimeng_7", "zioy_shimeng_5"],
						"_priority": 456486748,
						mod: {
							selectTarget: function (card, player, range) {
								if (
									3 - game.roundNumber > 0 &&
									player.storage.shidai_layer < 4 &&
									get.type(card) != "equip" &&
									!["nanman", "wanjian", "jiu", "tao", "lebu", "bingliang", "wuzhong"].includes(card.name) &&
									game.filterPlayer(current => {
										return lib.filter.targetEnabled2(card, player, current);
									}).length > 1
								)
									return (range[1] += 3 - game.roundNumber);
							},
							globalFrom: function (from, to, distance) {
								if (3 - game.roundNumber > 0 && from.storage.shidai_layer < 3) {
									return distance - (3 - game.roundNumber);
								}
							}
						},
						subSkill: {
							1: {
								trigger: {
									player: "useCard"
								},
								direct: true,
								silent: true,
								filter: function (event, player) {
									return player.storage.shidai_layer < 1;
								},
								content: function () {
									trigger.directHit.addArray(
										game.filterPlayer(current => {
											return true;
										})
									);
								},
								sub: true,
								"_priority": 45648678
							},
							2: {
								trigger: {
									source: "damageBegin1"
								},
								direct: true,
								silent: true,
								init: function (player) {
									player.storage.shidai_2_roundN = -1;
									player.storage.shidai_2_flag = false;
								},
								filter: function (event, player) {
									if (player.storage.shidai_2_roundN < game.roundNumber) {
										player.storage.shidai_2_roundN = game.roundNumber;
										player.storage.shidai_2_flag = true;
									}
									return player.storage.shidai_layer < 2 && player.storage.shidai_2_flag;
								},
								content: function () {
									if (3 - game.roundNumber > 0) {
										trigger.num += 3 - game.roundNumber;
										player.storage.shidai_2_flag = false;
									}
								},
								sub: true,
								"_priority": 45648678
							},
							5: {
								trigger: {
									source: "dieBefore"
								},
								direct: true,
								silent: true,
								filter: function (event, player) {
									return player.storage.shidai_layer < 5;
								},
								content: function () {
									player.gain(trigger.player.getCards("hej"));
								},
								sub: true,
								"_priority": 45648678
							},
							6: {
								trigger: {
									source: "damageEnd"
								},
								direct: true,
								silent: true,
								filter: function (event, player) {
									return player.storage.shidai_layer < 6;
								},
								content: function () {
									player.recover();
								},
								sub: true,
								"_priority": 45648678
							},
							7: {
								trigger: {
									player: "useCard"
								},
								direct: true,
								silent: true,
								init: function (player) {
									player.storage.shidai_card = null;
								},
								filter: function (event, player) {
									if (event.getParent(2).name == "zioy_shimeng_7") return false;
									return player.storage.shidai_layer < 7;
								},
								content: function () {
									"step 0"
									if (
										player.storage.shidai_card != null &&
										(game.filterPlayer(current => {
											return lib.filter.targetEnabled2(player.storage.shidai_card, event.player, current);
										}).length != 0 ||
											player.storage.shidai_card.name == "jiu") &&
										get.type(player.storage.shidai_card) != "equip"
									) {
										// player.useCard({ name: "sha", isCard: false }, target, false);
										player.chooseUseTarget(
											{ name: player.storage.shidai_card.name, isCard: false },
											"视为使用一张【" + get.translation(player.storage.shidai_card) + "】",
											false
										);
									}
									"step 1"
									if (get.type(trigger.card) != "equip") player.storage.shidai_card = trigger.card;
								},
								sub: true,
								"_priority": 456448678
							}
						}
					},
					"zioy_heimeng": {
						trigger: {
							player: "showCharacterAfter"
						},
						forced: true,
						hiddenSkill: true,
						// silent:true,
						filter: function (event, player) {
							return event.toShow && event.toShow.includes(player.name);
						},
						content: function () {
							player.gain(player.getCards("j"));
						},
						// ai:{
						// 	expose:0.2,
						// },
						"_priority": 0
					},
					"zioy_zhu": {
						group: ["zioy_zhu_use", "zioy_zhu_damage"],
						locked: true,
						charlotte: true,
						unique: true,
						subSkill: {
							use: {
								trigger: {
									player: ["useCardAfter", "respondAfter"]
								},
								forced: true,
								filter: () => true,
								content: function () {
									"step 0"
									event.hp = player.hp;
									"step 1"
									let n = player.maxHp - 2 > 4 ? 2 : player.maxHp - 4;
									if (n > 0) player.loseMaxHp(n);
									"step 2"
									if (event.hp != player.hp) {
										var card = trigger.card,
											cards = [],
											func = ["type2"];
										for (var fn of func) {
											var cardx = get.cardPile2(cardxx => {
												if (get[fn](card, player) == get[fn](cardxx, player) && !cards.includes(cardxx) && card.name != cardxx.name) {
													return true;
												}
											});
										}
										if (cardx) cards.push(cardx);
										if (cards.length) player.gain(cards, "gain2");
									}
								},
								"_priority": 20
							},
							damage: {
								trigger: {
									player: ["damageEnd", "loseHpEnd"]
								},
								forced: true,
								filter: () => true,
								content: function () {
									"step 0"
									event.hp = player.hp;
									"step 1"
									let n = player.maxHp - 4 > 2 ? 4 : player.maxHp - 2;
									if (n > 0) player.loseMaxHp(n);
									"step 2"
									if (event.hp != player.hp) {
										if (player.storage.gui_usedSkill.length > 0) {
											var skill = player.storage.gui_usedSkill.randomGet();
											player.restoreSkill(skill);
											const a1 = [...player.storage.gui_usedSkill]
											const l1 = player.storage.gui_usedSkill.length
											player.storage.gui_usedSkill = player.storage.gui_usedSkill.filter(s => {
												return s != skill;
											});
											const l2 = player.storage.gui_usedSkill.length
											if(1){
												console.log('1111', skill, a1, player.storage.gui_usedSkill)
											}
										}
									}
								},
								"_priority": 24
							}
						}
					},
					"zioy_bian1": {
						trigger: {
							player: ["phaseEnd"]
						},
						forced: false,
						limited: true,
						skillAnimation: true,
						animationColor: "soil",
						marktext: "Ⅰ",
						check: () => true,
						filter: () => true,
						content: function () {
							"step 0"
							player.storage.gui_recordf();
							player.storage.gui_usedSkill.push(event.name);
							player.awakenSkill(event.name);
							"step 1"
							player.chooseTarget(true, function (card, player, target) {
								return target != player;
							});
							"step 2"
							if (result.bool && result.targets.length > 0) {
								event.target = result.targets[0];
								event.target.draw(2);
							} else {
								event.finish();
							}
							"step 3"
							event.target.showHandcards();
							let cs = event.target.getCards("h");
							var suits = new Set();
							for (let c of cs) {
								var suit = get.suit(c);
								if (suit) suits.add(suit);
							}
							if (suits.size > 3) {
								player.insertPhase();
							}
						},
						"_priority": 20
					},
					"zioy_bian2": {
						trigger: {
							source: ["damageEnd"]
						},
						forced: false,
						limited: true,
						skillAnimation: true,
						animationColor: "soil",
						marktext: "Ⅱ",
						check: (event, player) => player.countCards("h") < event.player.countCards("h"),
						filter: () => true,
						content: function () {
							"step 0"
							player.storage.gui_recordf();
							player.storage.gui_usedSkill.push(event.name);
							player.awakenSkill(event.name);
							"step 1"
							let cp = player.getCards("h");
							let ct = trigger.player.getCards("h");
							for (let c of ct) {
								player.gain(c);
							}
							for (let c of cp) {
								trigger.player.gain(c);
							}
							"step 2"
							if (Math.min(2, player.countCards("hej")) > 0)
								player.chooseCard("hej", `${get.translation(event.name)}：选择两张牌`, Math.min(2, player.countCards("hej")), true);
							"step 3"
							event.cards = [];
							if (result && result.cards) event.cards = [...result.cards];
							if (Math.min(2, trigger.player.countCards("hej")) > 0)
								trigger.player.chooseCard("hej", `${get.translation(event.name)}：选择两张牌`, Math.min(2, trigger.player.countCards("hej")), true);
							"step 4"
							if (result && result.cards) {
								for (let c of result.cards) {
									event.cards.push(c);
								}
							}
							player.chooseTarget(true).set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								return att * 999;
							});
							"step 5"
							for (let c of event.cards) {
								game.log(c);
								result.targets[0].gain(c);
							}
						},
						"_priority": 20
					},
					"zioy_bian3": {
						enable: "phaseUse",
						forced: false,
						limited: true,
						skillAnimation: true,
						animationColor: "soil",
						marktext: "Ⅲ",
						filter: () => true,
						content: function () {
							"step 0"
							player.storage.gui_recordf();
							player.storage.gui_usedSkill.push(event.name);
							player.awakenSkill(event.name);
							"step 1"
							var suits = new Set();
							event.cards = [];
							while (1) {
								let c = get.cards(1)[0];
								// game.cardsGotoOrdering(c);
								game.log(player, "展示了", c);
								event.cards.push(c);
								let suit = get.suit(c);
								if (suit) suits.add(suit);
								if (suits.size > 3) break;
							}
							"step 2"
							player.chooseButton([`${get.translation(event.name)}：请选择要使用的牌`, event.cards], [1, 2]).set("filterButton", function (button) {
								return (
									game.filterPlayer(current => {
										return lib.filter.targetEnabled2(button.link, player, current);
									}).length != 0
								);
							});
							"step 3"
							if (result.bool) {
								let cs = result.links;
								for (let c of cs) {
									if (
										game.filterPlayer(current => {
											return lib.filter.targetEnabled2(c, player, current);
										}).length != 0
									) {
										player.chooseUseTarget(c, true);
									} else {
										player.gain(c);
									}
								}
							}
						},
						ai: {
							order: 2024,
							result: {
								player: () => {
									return 2024;
								}
							}
						}
					},
					"zioy_bian4": {
						trigger: {
							player: ["phaseBegin"]
						},
						forced: false,
						limited: true,
						skillAnimation: true,
						animationColor: "soil",
						marktext: "Ⅳ",
						check: () => true,
						filter: () => true,
						content: function () {
							"step 0"
							player.storage.gui_recordf();
							player.storage.gui_usedSkill.push(event.name);
							player.awakenSkill(event.name);
							"step 1"
							player.chooseTarget(true, function (card, player, target) {
								return target != player;
							});
							"step 2"
							event.target = result.targets[0];
							player
								.chooseToDebate([event.target, player])
								.set("callback", function () {
									var result = event.debateResult;
									var target = event.getParent(2).target;
									if (result.bool && result.opinion) {
										var opinion = result.opinion;
										if (opinion == "red") {
											player.draw(2);
											target.draw(2);
										} else {
											for (let p of [player, target]) {
												for (let i = 0; i < 4; i++) {
													let c = get.cards(1)[0];
													game.log(p, "展示了", c);
													if (
														game.filterPlayer(current => {
															return lib.filter.targetEnabled2(c, p, current);
														}).length != 0
													) {
														p.chooseUseTarget(c);
													}
												}
											}
										}
									} else {
										for (let p of [player, target]) {
											p.loseHp(2);
										}
									}
								})
								.set("target", event.target);
							"step 3"
						},
						"_priority": 20
					},
					"zioy_gui": {
						init: function (player) {
							player.storage.gui_recordArray = [];
							player.storage.gui_usedSkill = [];
							player.storage.gui_recordf = function () {
								let c = player.getCards("h"),
									hp = player.hp,
									maxHp = player.maxHp,
									skillMap = [...player.storage.gui_usedSkill];
								player.storage.gui_recordArray.push({
									c: c,
									hp: hp,
									maxHp: maxHp,
									skillMap: skillMap
								});
							};
						},
						filter: function (event, player) {
							let countSuit = arr => {
								let suits = new Set();
								for (let c of arr) {
									let suit = get.suit(c);
									if (suit) suits.add(suit);
								}
								return suits.size;
							};
							let flag1 =
								game.players.filter(p => {
									return p != player && p.hp >= player.hp;
								}).length != 0;

							let flag2 =
								game.players.filter(p => {
									return p != player && countSuit(p.getCards("h")) >= countSuit(player.getCards("h"));
								}).length != 0;

							let flag3 = player.storage.gui_recordArray.length > 0;
							console.log(flag1, flag2, flag3, player.storage.gui_recordArray, player.storage.gui_recordArray.length);
							return flag1 && flag2 && flag3;
						},
						trigger: {
							global: "phaseEnd"
						},
						forced: true,
						skillAnimation: true,
						animationColor: "soil",
						content: function () {
							"step 0"
							player.discard(player.getCards("h"));
							"step 1"
							let r = player.storage.gui_recordArray[0];
							player.storage.gui_recordArray.splice(0, 1);
							for (let c of r.c) {
								player.gain(c);
							}
							player.hp = r.hp;
							player.maxHp = r.maxHp;
							for (let i = 1; i < 5; i++) {
								skill = `zioy_bian${i}`;
								if (!r.skillMap.includes(skill)) {
									player.restoreSkill(skill);
								} else {
									player.awakenSkill(skill);
								}
							}
							player.storage.gui_usedSkill = r.skillMap;
							"step 3"
							player.update();
						},
						ai: {
							threaten: 2024
						}
					},
					"zioy_junling": {
						trigger: {
							player: "showCharacterAfter"
						},
						forced: true,
						hiddenSkill: true,
						// silent:true,
						filter: function (event, player) {
							return event.toShow && event.toShow.includes(player.name);
						},
						content: function () {
							"step 0"
							for (var p of game.players) {
								if (p === player) {
									p.gainMaxHp(3);
									p.draw(3);
								} else {
									p.gainMaxHp(2);
									p.recover(2);
									p.draw(4);
									if (!p.isTurnedOver()) {
										p.turnOver();
									}
								}
							}
							"step 1"
							if (player != _status.currentPhase) {
								var cards = Array.from(ui.ordering.childNodes);
								while (cards.length) {
									cards.shift().discard();
								}
							}
							"step 2"
							if (player != _status.currentPhase) {
								var evt = _status.event.getParent("phase");
								if (evt) {
									game.resetSkills();
									_status.event = evt;
									_status.event.finish();
									_status.event.untrigger(true);
								}
							}
							// 'step 3'
							// trigger.getParent(2).phaseList.splice(trigger.num,0,'phaseUse|zioy_junling');
							// trigger.getParent(2).phaseList.splice(trigger.num,0,'phaseDiscard|zioy_junling');
						},
						"_priority": 0
					},
					"zioy_junming": {
						trigger: {
							global: "roundStart"
						},
						filter: () => {
							return game.players.filter(p => p.hp < p.maxHp).length > 0;
						},
						direct: true,
						content: function () {
							"step 0"
							var max = -1;
							for (var p of game.players) {
								max = Math.max(max, p.maxHp - p.hp);
							}
							event.pArray = [];
							for (var p of game.players) {
								if (p.maxHp - p.hp == max) event.pArray.push(p);
							}
							var str = "";
							for (var p of event.pArray) {
								if (str != "") {
									str = str + ",";
								}
								str = str + get.translation(p);
							}
							str = "是否对" + str + "发动【" + get.translation(event.name) + "】";
							player.chooseBool(str).set("ai", () => {
								// game.log(event.pArray.filter((p)=>{p === player}).length , max , player.hp)
								if (player.maxHp - player.hp == max && max < player.hp) return false;
								// if(event.pArray.filter((p)=>{p !== player}).length == 0 && max < player.hp)return false
								return (
									player.hp + player.hujia < 3 ||
									event.pArray.filter(p => {
										p === player;
									}).length == 0
								);
							});
							"step 1"
							if (result.bool) {
								game.log(player, "发动了", '<span class="greentext">【' + get.translation(event.name) + "】</span>");
								var max = -1;
								for (var p of event.pArray) {
									if (p.maxHp > 1) p.loseMaxHp(1);
									max = Math.max(p.maxHp - p.hp, max);
									p.recover(p.maxHp - p.hp);
								}
								if (max - player.hujia != 0) player.changeHujia(max - player.hujia);
								player.draw(max);
							}
						},
						ai: {
							threaten: 95
						}
					},
					"zioy_junci": {
						trigger: {
							global: "damageEnd"
						},
						filter: function (event, player) {
							if (player.hasSkill("zioy_junci_phase")) return false;
							if (!event.source) return false;
							var f = false;
							for (var p of [event.source, event.player, player]) {
								if (p.countCards("hej") > 0) {
									f = true;
									break;
								}
							}
							return event.source && event.player != player && f && event.player != event.source;
						},
						direct: true,
						content: function () {
							"step 0"
							player
								.chooseTarget("请选择移出牌的目标", 1, false, (card, player, target) => {
									if (!trigger.player.isAlive()) return target == player;
									return [player, trigger.player, trigger.source].includes(target) && target.countCards("hej") > 0;
								})
								.set("ai", target => {
									var att = get.attitude(player, target);
									// game.log(1+att)
									return 1 + att > 0;
								});
							"step 1"
							if (result.bool) {
								// player.say('1213')
								event.plose = result.targets[0];
								if (event.plose == player && player != trigger.player && player != trigger.source) {
									player
										.chooseTarget("请选择移入牌的目标", 1, true, (card, player, target) => {
											return [trigger.player, trigger.source].includes(target);
										})
										.set("ai", target => {
											var att = get.attitude(player, target);
											return -att;
										});
								} else {
									event.pgain = event.plose == trigger.player ? trigger.source : trigger.player;
									event.goto(3);
								}
							} else {
								event.finish();
							}
							"step 2"
							// game.log(result.targets)
							event.pgain = result.targets[0];
							"step 3"
							// game.log(event.plose,event.pgain)
							player.choosePlayerCard(event.plose, "hej", true).set("ai", get.buttonValue);
							"step 4"
							player.addTempSkill("zioy_junci_phase");
							var card = result.cards[0];
							if (get.position(card) == "e") {
								event.pgain.equip(card);
								event.finish();
							} else if (get.position(card) == "j") {
								event.pgain.addJudge(card);
								event.finish();
							} else {
								event.pgain.gain(card);
								event.card = card;
							}
							"step 5"
							if (
								game.filterPlayer(current => {
									return lib.filter.targetEnabled2(player.storage.shidai_card, event.player, current);
								}).length != 0
							) {
								event.bool = true;
								event.pgain.chooseBool("是否使用【" + get.translation(event.card) + "】").set("ai", () => {
									return true;
								});
							} else {
								event.bool = false;
							}
							"step 6"
							if (event.bool && result.bool) {
								event.pgain.chooseUseTarget(event.card);
								event.finish();
							} else if (event.pgain == player) {
								event.finish();
							}
							"step 7"
							player.chooseBool("是否对" + get.translation(event.pgain) + "造成1点伤害").set("ai", () => {
								return get.attitude(event.pgain, player) <= 0;
							});
							"step 8"
							if (result.bool) {
								event.pgain.damage(1);
								event.finish();
							}
						},
						subSkill: {
							"phase": {}
						},
						ai: {
							threaten: 95
						}
					},
					"zioy_junnu": {
						trigger: {
							source: "damageBegin1",
							player: "damageBegin1"
						},
						filter: () => {
							return true;
						},
						content: function () {
							"step 0"
							player.showHandcards();
							var nr = player.getCards("h").filter(c => get.color(c) == "red").length;
							var nb = player.getCards("h").filter(c => get.color(c) == "black").length;
							var nc = player.getCards("h").length;
							// game.log(nr,nb)
							if (nr >= nb) {
								trigger.num += 1;
								if (nc > 0 && trigger.source) trigger.source.chooseToDiscard(Math.min(trigger.source.countCards("he"), nc), "he", true);
							}
							if (nb >= nr) {
								trigger.num += 1;
								if (nc > 0) trigger.player.chooseToDiscard(Math.min(trigger.player.countCards("he"), nc), "he", true);
							}
						},
						check: function (event, player) {
							var nr = player.getCards("h").filter(c => get.color(c) == "red").length;
							var nb = player.getCards("h").filter(c => get.color(c) == "black").length;
							if (event.player == player) {
								if (player.hp + player.hujia <= 5) {
									return false;
								}
								if (nb >= nr) return false;
								if (nr >= nb) {
									if (!event.source) return false;
								}
							} else {
								if (get.attitude(event.player, player) > 0) return false;
							}
							if ((event.player == player) == nb >= nr && player.hp > 0) return false;
							return true;
						},
						ai: {
							threaten: 15,
							damageBonus: true
						}
					},
					"zioy_junyun": {
						trigger: {
							player: "dieBefore"
						},
						filter: function (event, player) {
							return true;
						},
						forced: true,
						limited: true,
						direct: true,
						forceDie: true,
						skillAnimation: true,
						animationColor: "soil",
						content: function () {
							"step 0"
							player.awakenSkill(event.name);
							event.max = parseInt(player.maxHp / 2 + 0.01 - player.hp);
							player
								.chooseTarget("请选择〖君陨〗的目标", [1, event.max], false, function (card, player, target) {
									return player != target;
								})
								.set("ai", target => {
									var att = get.attitude(player, target);
									return -att;
								});
							"step 1"
							if (!result.bool) {
								event.finish();
							} else {
								event.targets = result.targets;
							}
							"step 2"
							event.t = event.targets.pop();
							buttoms = [];
							for (var i = 1; i < event.max - event.targets.length + 1; i++) {
								buttoms.push(i);
							}
							if (buttoms.length === 1) {
								event.t.damage(1);
								event.goto(4);
							} else {
								player
									.chooseControl(buttoms)
									.set("prompt", "请选择对" + get.translation(event.t) + "造成的伤害值")
									.set("ai", () => {
										return buttoms.length;
									});
							}
							"step 3"
							event.t.damage(result.control);
							event.max -= result.control;
							"step 4"
							if (event.targets.length > 0) {
								event.goto(2);
							}
						},
						ai: {
							threaten: 95
						}
					},
					zioy_zhaocai: {
						trigger: {
							player: "phaseDrawBegin"
						},
						filter: () => true,
						direct: true,
						init: function (player) {
							game.addGlobalSkillMiao("zioy_zhaocai_ignoredHandcard");
						},
						content: function () {
							"step 0"
							player
								.chooseTarget(
									`${get.translation(
										event.name
									)}：摸牌阶段开始时，你可选择一名角色，你令其将手牌摸至X张，若该角色不为你，你摸等量的牌。你可将你以此法获得的牌当作任意基本牌使用或打出。（X为其体力上限）}`,
									1,
									function (card, player, target) {
										return target.countCards("h") < target.maxHp;
									}
								)
								.set("ai", target => {
									var att = get.attitude(player, target);
									var index = target.maxHp - target.countCards("h");
									return att * index;
								});
							"step 1"
							if (result.bool) {
								player.logSkill(event.name);
								game.log(player, "发动了", '<span class="greentext">【' + get.translation(event.name) + "】</span>");
								let target = result.targets[0];
								let drawNum = target.maxHp - target.countCards("h");
								target.draw(drawNum).gaintag = [event.name];
								if (target !== player) {
									player.draw(drawNum).gaintag = [event.name];
								}
							}
						},
						group: ["zioy_zhaocai_use"],
						subSkill: {
							use: {
								enable: ["chooseToUse", "chooseToRespond"],
								filter: function (event, player) {
									if (!event.player.hasCard(card => card.hasGaintag("zioy_zhaocai"), "h")) return false;
									for (var name of lib.inpile) {
										if (get.type2(name) != "basic") continue;
										var card = { name: name };
										if (event.filterCard(card, player, event)) return true;
										if (name == "sha") {
											for (var nature of lib.inpile_nature) {
												card.nature = nature;
												if (event.filterCard(card, player, event)) return true;
											}
										}
									}
									return false;
								},
								chooseButton: {
									dialog: function (event, player) {
										var list = [];
										for (var name of lib.inpile) {
											if (name == "sha") {
												if (event.filterCard({ name: name }, player, event)) list.push(["基本", "", "sha"]);
												for (var nature of lib.inpile_nature) {
													if (event.filterCard({ name: name, nature: nature }, player, event)) list.push(["基本", "", "sha", nature]);
												}
											} else if (get.type(name) == "basic" && event.filterCard({ name: name }, player, event)) list.push(["基本", "", name]);
										}
										var dialog = ui.create.dialog("招财", [list, "vcard"]);
										dialog.direct = true;
										return dialog;
									},
									filter: function (button, player) {
										return _status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
									},
									check: function (button) {
										if (_status.event.getParent().type != "phase") return 1;
										var player = _status.event.player;
										if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(button.link[2])) return 0;
										return player.getUseValue({
											name: button.link[2],
											nature: button.link[3]
										});
									},
									backup: function (links, player) {
										return {
											filterCard: function (card) {
												return card.hasGaintag("zioy_zhaocai");
											},
											popname: true,
											check: function (card) {
												return 8 - get.value(card);
											},
											position: "hes",
											viewAs: { name: links[0][2], nature: links[0][3] },
											precontent: function () {
												delete event.result.skill;
												var card = event.result.card;
											}
										};
									},
									prompt: function (links, player) {
										return "将一张牌当做" + (get.translation(links[0][3]) || "") + get.translation(links[0][2]) + "使用";
									}
								},
								hiddenCard: function (player, name) {
									if (!lib.inpile.includes(name)) return false;
									var type = get.type2(name);
									return type == "basic" && player.countCards("hes") > 0 && !player.hasSkill("jsrgnianen_blocker");
								},
								ai: {
									fireAttack: true,
									respondSha: true,
									respondShan: true,
									order: 1,
									result: {
										player: function (player) {
											if (_status.event.dying) return get.attitude(player, _status.event.dying);
											return 1;
										}
									}
								}
							},
							ignoredHandcard: {
								mod: {
									ignoredHandcard: function (card, player) {
										if (card.hasGaintag("zioy_zhaocai")) {
											return true;
										}
									},
									cardDiscardable: function (card, player, name) {
										if (name == "phaseDiscard" && card.hasGaintag("zioy_zhaocai")) {
											return false;
										}
									}
								}
							}
						}
					},
					zioy_jinbao: {
						enable: "phaseUse",
						usable: 1,
						discard: false,
						lose: false,
						delay: false,
						filterTarget: function (card, player, target) {
							return player.canCompare(target);
						},
						filter: function (event, player) {
							return player.countCards("h") > 0;
						},
						content: function () {
							"step 0"
							player.chooseToCompare(target);
							"step 1"
							if (result.bool) {
								player.chooseTarget("令一名角色获得基本牌，锦囊牌，装备牌各一张。", true).set("ai", target => {
									var att = get.attitude(player, target);
									return att;
								});
							} else {
								target.gainPlayerCard("h", player, true).set("target", player).set("ai", lib.card.shunshou.ai.button);
								target.gainPlayerCard("e", player, true).set("target", player).set("ai", lib.card.shunshou.ai.button);
								event.goto(3);
							}
							"step 2"
							let target1 = result.targets[0];
							var cards = [],
								types = ["basic", "trick", "equip"];
							for (var i of types) {
								var card = get.cardPile2(function (card) {
									return get.type2(card, false) == i;
								});
								if (card) cards.push(card);
							}
							if (cards.length) target1.gain(cards, "gain2");
							"step 3"
							player
								.chooseTarget(`令一名手牌数不多于你的角色获得本次拼点的牌。`, true, function (card, player, target) {
									return target.countCards("h") <= player.countCards("h");
								})
								.set("ai", target => {
									var att = get.attitude(player, target);
									return att;
								});
							"step 4"
							result.targets[0].gain(player.storage.zioy_jinbao_cards, "gain2", "log");
						},
						subSkill: {
							gain: {
								trigger: {
									player: ["chooseToCompareAfter", "compareMultipleAfter"]
								},
								filter(event, player) {
									if (event.getParent().name != "zioy_jinbao") return false;
									if (event.preserve) return false;
									return [event.card1, event.card2].filterInD("od").length > 0;
								},
								direct: true,
								content() {
									player.storage.zioy_jinbao_cards = [trigger.card1, trigger.card2];
								},
								sub: true,
								"_priority": 0
							}
						},
						group: ["zioy_jinbao_gain"],
						ai: {
							result: {
								player: function (player) {
									return 2024;
								},
								target: function (player, target) {
									return -0.5;
								}
							},
							order: 9
						},
						"_priority": 0
					},
					"zioy_yuansi": {
						direct: true,
						trigger: {
							player: "damageBegin3",
							source: "damageBegin3"
						},
						filter: () => true,
						init: function (player) {
							let pl = player;
							player.storage.checkOnly = function (dp) {
								for (let p of game.players) {
									// if(p===dp) continue
									if (p.identity === pl.identity && p !== pl) {
										return false;
									}
								}
								return true;
							};
						},
						content: function () {
							"step 0"
							if (player.storage.checkOnly() === true) {
								player.chooseBool(`是否对${get.translation(trigger.player)}发动〖${get.translation(event.name)}〗?`).set("ai", () => {
									return get.attitude(trigger.player, player) < 0;
								});
							} else {
								event.goto(2);
							}
							"step 1"
							if (result && result.bool === true) {
							} else {
								event.finish();
							}
							"step 2"
							let target = trigger.player;
							target.loseHp(1);
							target.turnOver();
						}
					},
					"zioy_yuanshen": {
						direct: true,
						trigger: {
							global: "dying"
						},
						filter: function (event, player) {
							if (player.storage.yuanshen.includes(event.player)) return false;
							return true;
						},
						init: function (player) {
							player.storage.yuanshen = [];
						},
						content: function () {
							"step 0"
							if (trigger.player !== player) {
								player.chooseBool(`是否对${get.translation(trigger.player)}发动〖${get.translation(event.name)}〗?`).set("ai", () => {
									return true;
								});
							} else {
								event.goto(2);
							}
							"step 1"
							if (result && result.bool === true) {
							} else {
								event.finish();
							}
							"step 2"
							player.storage.yuanshen.push(trigger.player);
							if (player.storage.checkOnly(trigger.player) === true) {
								player.gainMaxHp(1);
							} else {
								trigger.player.die();
								event.finish();
							}
							"step 3"
							player.recover(player.maxHp - player.hp);
							player.draw(player.maxHp);
						}
					},
					zioy_que: {
						trigger: {
							player: "loseHpBefore"
						},
						filter: () => true,
						forced: true,
						content: function () {
							trigger.cancel();
							player.damage(1);
						},
						group: ["zioy_que_2", "zioy_que_2_1", "zioy_que_3", "zioy_que_3_1", "zioy_que_4", "zioy_que_4_1"],
						subSkill: {
							2: {
								trigger: {
									player: "damageEnd",
									source: "damageEnd"
								},
								filter: (event, player) => player.storage.zioy_que2,
								forced: true,
								content: function () {
									player.recover(1);
									player.draw(1);
									player.storage.zioy_que2 = false;
								},
								"_priority": 123564
							},
							"2_1": {
								trigger: {
									global: "phaseBegin"
								},
								filter: () => true,
								direct: true,
								init: player => (player.storage.zioy_que2 = true),
								content: function () {
									player.storage.zioy_que2 = true;
								},
								"_priority": 1123564
							},
							3: {
								mod: {
									targetInRange(card, player) {
										if (player.getDamagedHp() === 0) return true;
									},
									cardUsable(card, player) {
										if (player.getDamagedHp() === 0) return Infinity;
									}
								},
								trigger: {
									player: "useCard"
								},
								forced: true,
								filter: function (event, player) {
									return player.getDamagedHp() === 0;
								},
								content: function () {
									trigger.directHit.addArray(
										game.filterPlayer(function (current) {
											return current != player;
										})
									);
								},
								"_priority": -150
							},
							"3_1": {
								trigger: {
									source: "damageBegin1"
								},
								filter: function (event, player) {
									return player.getDamagedHp() === 0 && event.card && event.card.name == "sha";
								},
								forced: true,
								content: function () {
									trigger.num += player.hp - 1;
								},
								ai: {
									// damageBonus:true,
								},
								"_priority": -300
							},
							4: {
								trigger: {
									player: "useCardToBefore"
								},
								filter: function (event, player) {
									// game.log(event.target,event.player,event.to)
									return player.getDamagedHp() === 0 && event.target !== player;
								},
								forced: true,
								init: function (player) {
									player.storage.zioy_que4 = false;
								},
								content: function () {
									// game.log(111)
									player.storage.zioy_que4 = true;
								},
								"_priority": 1564654300
							},
							"4_1": {
								trigger: {
									player: "useCardToEnd"
								},
								filter: function (event, player) {
									// game.log(event.target,event.player,event.to)
									return player.storage.zioy_que4 === true;
								},
								forced: true,
								content: function () {
									player.changeHujia(player.hp - 1);
									player.hp = 1;
									player.update();
									player.storage.zioy_que4 = false;
								},
								"_priority": 1564654300
							}
						}
					},
					zioy_fouzhiyu: {
						trigger: {
							player: ["loseHpBefore", "recoverBefore"]
						},
						filter: () => true,
						forced: true,
						content: function () {
							trigger.cancel();
						},
						group: ["zioy_fouzhiyu_1"],
						subSkill: {
							1: {
								trigger: {
									player: ["damageBefore"]
								},
								filter: (event, player) => player.hujia > 0 === (game.roundNumber % 2 === 1),
								forced: true,
								content: function () {
									trigger.cancel();
								},
								ai: {
									effect: {
										target: function (card, player, target) {
											if (target.hujia > 0 === (game.roundNumber % 2 === 1)) return "zerotarget";
										}
									}
								}
							}
						}
					},
					zioy_ningguxi: {
						trigger: {
							player: ["phaseBegin"]
						},
						_priority: 85465165,
						filter: () => true,
						direct: true,
						content: async function (event, trigger, player) {
							const dn = Math.ceil(game.roundNumber/3)
							let c = await player
								.chooseTarget(`对一名角色造成${dn}点伤害`, false, function (card, player, target) {
									return true;
								})
								.set("ai", target => {
									// var att = get.attitude(player, target);
									// return -att;
									let eff = get.damageEffect(target, player, player);
									return eff;
								});
							if (c.result.bool) {
								let tg = c.result.targets[0];
								player.logSkill(event.name, c.result.targets);
								tg.damage(dn);
							}
						},
						ai: {
							threaten: 5415341
						}
					},
					zioy_juhun: {
						trigger: {
							global: "roundStart"
						},
						init: function (p) {
							p.storage.zioy_juhun_count = 0;
						},
						filter: (event, p) => p.storage.zioy_juhun_count <= 1,
						direct: true,
						async content(event, trigger, player) {
							let res = await player
								.chooseTarget(`选点人死掉`, false, [1, 2 - player.storage.zioy_juhun_count], function (card, player, target) {
									return player !== target;
								})
								.set("ai", target => {
									var att = get.attitude(player, target);
									return att;
								});
							res = res.result;
							if (res.bool) {
								player.logSkill(event.name, res.targets);
								for (let p of res.targets) {
									let resp = await p.chooseBool("死不死").set("ai", () => {
										// game.log(get.attitude(p, player))
										return get.attitude(p, player) > 0;
									});
									resp = resp.result;
									if (resp.bool) {
										player.storage.zioy_juhun_count++;
										let list = [];
										if (lib.character[p.name]) list.addArray(lib.character[p.name][3]);
										if (lib.character[p.name1]) list.addArray(lib.character[p.name1][3]);
										if (lib.character[p.name2]) list.addArray(lib.character[p.name2][3]);
										player.addSkills(list);
										player.hp += p.hp;
										player.maxHp += p.maxHp;
										player.hujia += p.hujia;
										p.hp = p.maxHp = p.hujia = 0;
										player.update();
										p.die();
									}
								}
							}
						}
					},
					zioy_minchao: {
						autoTranslate:{
							name: "冥潮",
							info:
						"<br>①你的回合开始阶段，你须将“涌”标记获得/弃置至X枚（X为3+你的攻击范围，至多为9）。<br>②你计算与其他角色的距离时-X（X为你“涌”标记的数量）。<br>③你攻击范围外的角色无法成为你使用牌的目标。",
						},
						trigger: {
							player: "phaseBegin"
						},
						forced: true,
						marktext: "涌",
						intro: {
							name: "涌"
						},
						slient: true,
						filter: function (event, player) {
							const num = Math.min(3 + player.getAttackRange() , 9);
							return player.countMark("zioy_minchao") !== num;
						},
						content: async function (event, trigger, player) {
							const num = Math.min(3 + player.getAttackRange() , 9) - player.countMark("zioy_minchao");
							if (num > 0) {
								player.addMark("zioy_minchao", num);
							} else {
								player.removeMark("zioy_minchao", -num);
							}
						},
						mod: {
							globalFrom(from, to, distance) {
								return distance - from.countMark("zioy_minchao");
							},
							playerEnabled(card, player, target) {
								if (!player.inRange(target) && target !== player) {
									return false;
								}
							}
						}
					},
					zioy_kuangyong: {
						autoTranslate:{
							name: "狂涌",
							info:
						"当你使用基本牌或普通锦囊牌指定一名角色为唯一目标时，你可以结算X次以下效果：你有50%概率令此牌额外结算一次。然后弃置1枚“涌”（X为你“涌”标记的数量）。"
						},
						trigger: {
							player: "useCardToPlayered"
						},
						filter: function (event, player) {
							var type = get.type(event.card);
							if (type != "basic" && type != "trick") return false;
							if (event.targets && event.targets.length > 1) return false;
							// if(event.target === player) return false;
							return player.countMark("zioy_minchao") > 0;
						},
						content: async function (event, trigger, player) {
							let num = 0;
							for (let i = 0; i < player.countMark("zioy_minchao"); i++) {
								if (Math.random() > 0.5) {
									num += 1;
								}
							}
							trigger.getParent().effectCount += num;
							player.removeMark("zioy_minchao");
						},
						ai: {
							threaten: 3
						}
					},
					"zioy_lanzhiyuane": {
						autoTranslate: {
							"name": "滥蛭垣厄",
							"info": "当你即将受到非属性/属性伤害时，若你本局游戏受到的非属性/属性伤害总额大于属性/非属性伤害总额，你可以令你本次受到的伤害减半（向上取整）。"
						},
						trigger:{
							player:'damageBegin2'
						},
						frequent:true,
						filter:function(event,player){
							let res = false
							if(event.hasNature() && player.storage.zioy_lanzhiyuane_count_nature >= player.storage.zioy_lanzhiyuane_count_normal){
								res = true
							}if(!event.hasNature() && player.storage.zioy_lanzhiyuane_count_normal >= player.storage.zioy_lanzhiyuane_count_nature){
								res = true
							}
							return res
						},
						content:async function(event,trigger,player){
							trigger.num = Math.ceil(trigger.num / 2)
						},
						_priority:-5649532135,
						autoSubSkill:{
							count:{
								trigger:{
									player:'damageEnd'
								},
								filter:function(event,player){
									return true;
								},
								direct:true,
								init:function(player){
									player.storage.zioy_lanzhiyuane_count_nature = 0
									player.storage.zioy_lanzhiyuane_count_normal = 0
								},
								content:async function(event,trigger,player){
									if(trigger.hasNature()){
										player.storage.zioy_lanzhiyuane_count_nature += trigger.num
									}else{
										player.storage.zioy_lanzhiyuane_count_normal += trigger.num
									}
								},
								_priority:5649532135
							}
						}
					},
					"zioy_liuzhenxiongxiang": {
						autoTranslate: {
							"name": "流鸩汹飨",
							"info": 
								`锁定技。你使用【杀】造成的伤害+X(X为log2(目标角色当前体力)且向下取整)，
								若造成伤害后目标角色体力值不小于其最大体力值*0.5则你弃置2张牌并弃置其至多2张牌，
								否则倒置其下次回复体力效果并令此技能本局游戏无法再对其发动。`
						},
						trigger: {
							source: "damageBegin1"
						},
						filter(event, player) {
							if (event.player.hasSkill("zioy_liuzhenxiongxiang_block")) {
								return false;
							}
							return event.card && event.card.name === "sha";
						},
						forced: true,
						locked: true,
						content: async function (event, trigger, player) {
							const num = Math.floor(Math.log2(trigger.player.hp));
							trigger.num += num;
						},
						_priority: 115615684,
						subSkill: {
							targetRecover: {
								trigger: {
									player: "recoverBefore"
								},
								direct: true,
								mark: true,
								marktext: "飨",
								intro: {
									name: "流鸩汹飨",
									mark: () => "回复体力改为失去体力"
								},
								content: async function (event, trigger, player) {
									const num = trigger.num;
									trigger.cancel();
									trigger.player.loseHp(num);
									trigger.player.removeSkill("zioy_liuzhenxiongxiang_targetRecover");
								},
								_priority: 115615684
							},
							block: {
								trigger: {
									global: "roundStart"
								},
								filter(event,player){
									return false;
								},
								content: async function (event, trigger, player) {
									player.removeSkill("zioy_liuzhenxiongxiang_block");
								},
								_priority: 115615684
							}
						},
						autoSubSkill: {
							damageEnd: {
								trigger: {
									source: "damageEnd"
								},
								forced: true,
								locked: true,
								filter(event, player) {
									if (event.player.hasSkill("zioy_liuzhenxiongxiang_block")) {
										return false;
									}
									return event.card && event.card.name === "sha";
								},
								content: async function (event, trigger, player) {
									let target = trigger.player;
									if (target.hp >= target.maxHp / 2) {
										player.chooseToDiscard(2, "he", true);
										player.discardPlayerCard("hej", trigger.player, [1, 2], false);
									} else {
										trigger.player.addSkill("zioy_liuzhenxiongxiang_targetRecover");
										trigger.player.removeSkill("zioy_liuzhenxiongxiang_block");
									}
								},
								_priority: 115615684
							}
						},
						ai:{
							threaten:1.5
						}
					},
					"zioy_yinhuxiaowu": {
						autoTranslate: {
							"name": "饮蛊销污",
							"info": `<br>①隐匿技。当你亮出武将牌时，你获得3枚“蛊”标记，若当前回合角色不为你，则你额外获得1枚“蛊”标记。
							<br>②出牌阶段：若你有“蛊”，你可以移去1枚“蛊”，然后选择至多X名角色，你与这些角色各回复X点体力并摸X张牌；
							若你没有“蛊”，你可以复活一名已死亡角色，令其回复9点体力并摸9张牌，然后你失去〖饮蛊销污〗并对自己造成9点伤害
							（X为2^(你的“蛊”的数量)且不大于5）。`
						},
						enable: "phaseUse",
						usable: 1,
						mark: false,
						marktext: "蛊",
						intro: {
							name: "蛊"
						},
						filter: function (event, player) {
							if(player.countMark("zioy_yinhuxiaowu") === 0 && game.dead.length === 0){
								return false
							}
							return true
						},
						content: async function (event, trigger, player) {
							if (player.countMark("zioy_yinhuxiaowu") === 0) {
								const {result} = await player.chooseTarget((_, player, target)=>target.isDead(),true).set('deadTarget',true)
								const target = result.targets[0]
								target.revive()
								target.recover(9)
								target.draw(9)
								player.removeSkill("zioy_yinhuxiaowu");
								player.damage(9);
								return;
							}
							player.removeMark("zioy_yinhuxiaowu");
							const num = Math.min(2 ** player.countMark("zioy_yinhuxiaowu"), 5);
							const { result } = await player
								.chooseTarget(
									(card, player, target) => target !== player,
									[1, num],
									false,
									`选择至多${num}名角色，你与这些角色各回复${num}点体力并摸${num}张牌`
								)
								.set("ai", target => {
									if (target.hasSkill("zioy_liuzhenxiongxiang_targetRecover")) return num - 1;
									var att = get.attitude(player, target);
									return att;
								});
							const targets = [player];
							if (result.bool) {
								targets.push(...result.targets);
							}
							for (let target of targets) {
								player.line(target);
								target.recover(num);
								target.draw(num);
							}
						},
						ai: {
							order: 1,
							threaten: 3,
							result: {
								player: function (player) {
									if (player.countMark("zioy_yinhuxiaowu") === 0) {
										if(game.zhu === player){
											return -111
										}
										for(let target of game.dead){
											if(target.maxHp < 2)continue
											let att = get.attitude(player, target);
											if(att > 0 && player.hp < 3){
												return 10
											}
										}
										return -111;
									}
									let count = 0;
									for (let target of game.players) {
										if (target.hasSkill("zioy_liuzhenxiongxiang_targetRecover")) {
											count += 2;
											continue;
										}
										count += get.recoverEffect(target, player, player);
									}
									return count - 1;
								}
							}
						},
						autoSubSkill: {
							gainMark: {
								trigger: {
									player: "showCharacterAfter"
								},
								forced: true,
								hiddenSkill: true,
								silent: true,
								filter: function (event, player) {
									return event.toShow && event.toShow.includes(player.name);
								},
								direct: true,
								content: async function (event, trigger, player) {
									let num = 3;
									if (_status.currentPhase !== player) {
										num += 1;
									}
									player.addMark("zioy_yinhuxiaowu", num);
								}
							}
						}
					},
					zioy_shihunzhuo:{
						autoTranslate: {
							"name": "世溷浊",
							"info": `<br>
							①游戏开始时，你获得“恒”。<br>
							②当你于出牌阶段使用牌结算结束后，若你当前回合于出牌阶段使用的牌超过log1.4(游戏轮数)张，你结束出牌阶段。<br>
							③你造成/受到不因此技能造成的伤害后，伤害来源受到由你造成的X点伤害（X为你此次造成/受到的伤害/2且向下取整）<br>
							④你造成/受到伤害后，你与伤害来源各获得“空”，若其已有“空”则重置“空”的发动次数。<br>
							⑤每个出牌阶段每名角色限10次。一名角色于你的出牌阶段内失去牌时，你令其获得“舍”，若其已有“舍”则重置“舍”的发动次数。<br>
							⑥你的回合开始阶段，以逆时针顺序从你开始的所有角色依次失去“空”与"舍"，每有一名角色以此法失去“空”，你获得1枚“隙”，每有一名角色以此法失去“舍”，你获得1枚“嗜”。<br>
							⑦每当你获得4枚“隙”（【灵降】状态下为2枚），你失去1点体力上限（【灵降】状态下为2点），若你未处于【灵降】状态，你将体力回复至体力上限。<br>
							⑧每当你获得“嗜”时，你摸一张牌。你的手牌上限-X（X为你“嗜”的数量/3）<br>
							恒：你的体力上限-1。你的体力上限增加无效。<br>
							空：获得此技能时你失去1点体力，失去此技能时你回复1点体力。当你回复体力时，取消之。此技能在发动2次后被失去。<br>
							舍：获得此技能时你弃置你区域内的1张牌，失去此技能时你摸1张牌。当你从游戏内获得牌后，你须弃置等量的牌，此技能在发动3次后将被失去。`
						},
						trigger:{
							global:"phaseBefore",
							player:"enterGame",
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content: async function(event,trigger,player){
							player.addSkill('zioy_shihunzhuo_heng')
						},
						mod:{
							maxHandcard:function(player,num){
								return num-Math.floor(player.countMark('zioy_shihunzhuo_shi')/3);
							},
						},
						subSkill:{
							heng:{
								mark:true,
								marktext:'恒',
								intro:{
									name:'恒',
									mark:()=>'你的体力上限-1。你的体力上限增加无效。'
								},
								init:function(player){
									player.loseMaxHp(1)
								},
								onremove:function(player){
									player.gainMaxHp(1)
								},
								direct:true,
								trigger:{
									player:'gainMaxHpBeginBefore'
								},
								content:async function(event,trigger,player){
									trigger.cancel()
								},
								priority:539943419
							},
							kong:{
								mark:true,
								marktext:'空',
								intro:{
									name:'空',
									mark:(_,__,player)=>`获得此技能时你失去1点体力，失去此技能时你回复1点体力。当你回复体力时，取消之。此技能在发动${2-player.storage.zioy_shihunzhuo_kong_count}次后被失去。`
								},
								init:function(player){
									player.loseHp()
									player.storage.zioy_shihunzhuo_kong_count = 0
								},
								onremove:function(player){
									player.recover()
								},
								direct:true,
								trigger:{
									player:'recoverBefore'
								},
								content:async function(event,trigger,player){
									trigger.cancel()
									player.storage.zioy_shihunzhuo_kong_count += 1
									if(player.storage.zioy_shihunzhuo_kong_count === 2){
										player.storage.zioy_shihunzhuo_kong_count = 0
										player.removeSkill('zioy_shihunzhuo_kong')
									}
								},
								priority:539943419
							},
							she:{
								mark:true,
								marktext:'舍',
								intro:{
									name:'舍',
									mark:(_,__,player)=>`获得此技能时你弃置你区域内的1张牌，失去此技能时你摸1张牌。当你从游戏内获得牌后，你须弃置1张牌，此技能在发动${3-player.storage.zioy_shihunzhuo_she_count}次后将被失去。`
								},
								init:function(player){
									if(player.countCards('he') > 0)
										player.chooseToDiscard(1,'hej',true)
									player.storage.zioy_shihunzhuo_she_count = 0
								},
								onremove:function(player){
									player.draw()
								},
								direct:true,
								trigger:{
									player:"gainAfter",
								},
								filter:function(event,player){
									if(player.countCards('he') === 0)return false
									return !(event.fromStorage==true||game.hasPlayer2(function(current){
										var evt=event.getl(current);
										return evt&&evt.xs&&evt.xs.length>0;
									}))
								},
								content:async function(event,trigger,player){
									// const num = trigger.cards.length
									player.chooseToDiscard(1,'he',true)
									player.storage.zioy_shihunzhuo_she_count += 1
									if(player.storage.zioy_shihunzhuo_she_count === 2){
										player.storage.zioy_shihunzhuo_she_count = 0
										player.removeSkill('zioy_shihunzhuo_she')
									}
								},
								priority:539943419
							},
							xi:{
								mark:true,
								marktext:'隙',
								intro:{
									name:'隙',
									mark:(_,__,player)=>`每当你获得${player.storage.zioy_nuhuangfeng_status !== 'lingjiang' ? 4 : 2}枚“隙”，你失去${player.storage.zioy_nuhuangfeng_status !== 'lingjiang' ? 1 : 2}点体力上限。`
								},
							},
							shi:{
								mark:true,
								marktext:'嗜',
								intro:{
									name:'嗜',
									mark:(_,__,player)=>`你的手牌上限-${Math.floor(player.countMark('zioy_shihunzhuo_shi')/3)}。`
								},
							}
						},
						autoSubSkill:{
							damageEnd:{
								trigger:{
									player:'damageEnd',
									source:'damageEnd'
								},
								direct:true,
								filter:(event)=>{
									// console.log(event.getParent().name)
									return event.getParent().name !== `zioy_shihunzhuo_damageEnd` && event.num > 1 && event.source
								},
								content:async function(event,trigger,player){
									const num = Math.floor(trigger.num / 2)
									trigger.source.damage(num)
								},
								priority:-539943419
							},
							damageEnd_addKong:{
								trigger:{
									player:'damageEnd',
									source:'damageEnd'
								},
								direct:true,
								filter:(event)=>{
									return true
								},
								content:async function(event,trigger,player){
									for(let target of [trigger.player,trigger.source]){
										if(target){
											if(target.hasSkill('zioy_shihunzhuo_kong')){
												target.storage.zioy_shihunzhuo_kong_count = 0
											}else{
												target.addSkill('zioy_shihunzhuo_kong')
											}
										}
									}
								},
								priority:7058211
							},
							loseAfter:{
								trigger:{
									global:["loseAfter","loseAsyncAfter"],
								},
								direct:true,
								init(player){
									player.storage.zioy_shihunzhuo_she_gainHistory = {}
								},
								filter:function(event,player){
									if(!event.player) return false
									if(_status.currentPhase!=player) return false;
									if(player.storage.zioy_shihunzhuo_she_gainHistory[event.player] >= 10) return false
									return event.player.isPhaseUsing()
								},
								content:async function(event,trigger,player){
									const target = trigger.player
									if(!target){
										return
									}
									if(!player.storage.zioy_shihunzhuo_she_gainHistory[target]){
										player.storage.zioy_shihunzhuo_she_gainHistory[target] = 0
									}
									player.storage.zioy_shihunzhuo_she_gainHistory[target] += 1
									if(target.hasSkill('zioy_shihunzhuo_she')){
										target.storage.zioy_shihunzhuo_she_count = 0
									}else{
										target.addSkill('zioy_shihunzhuo_she')
									}
								},
								priority:7058211
							},
							clearShe_gainHistory:{
								trigger:{
									player:['phaseUseEnd','phaseEnd']
								},
								direct:true,
								silent:true,
								filter:_=>true,
								async content(_,__,player){
									player.storage.zioy_shihunzhuo_she_gainHistory = {}
								}
							},
							phaseBegin:{
								trigger:{
									player:'phaseBegin',
								},
								direct:true,
								filter:function(event,player){
									return true
								},
								content:async function (event,trigger,player){
									let current = player;
									while(true){
										if(current.hasSkill('zioy_shihunzhuo_kong')){
											current.removeSkill('zioy_shihunzhuo_kong')
											player.addMark('zioy_shihunzhuo_xi')
											if(player.countMark('zioy_shihunzhuo_xi') % (player.storage.zioy_nuhuangfeng_status !== 'lingjiang' ? 4 : 2) === 0){
												player.loseMaxHp(player.storage.zioy_nuhuangfeng_status !== 'lingjiang' ? 1 : 2)
												if(player.storage.zioy_nuhuangfeng_status !== 'lingjiang'){
													player.recover(player.maxHp - player.hp)
												}
											}
										}
										if(current.hasSkill('zioy_shihunzhuo_she')){
											current.removeSkill('zioy_shihunzhuo_she')
											player.addMark('zioy_shihunzhuo_shi')
											player.draw()
										}
										current = current.next
										if(current === player){
											break
										}
									}
								},
								priority:7058211
							},
							phaseUseBegin:{
								trigger:{
									player:"phaseUseBegin",
								},
								direct:true,
								content:async function(_,__,player){
									player.storage.zioy_shihunzhuo_useCard_count = 0
								},
								priority:7058211
							},
							useCard:{
								trigger:{
									player:"useCardAfter",
								},
								filter:function(event,player){
									if(!player.isPhaseUsing()) return false;
									return true;
								},
								direct:true,
								content:async function(event,_,player){
									const num = Math.ceil(Math.log2(game.roundNumber) - Math.log2(1.4))
									player.storage.zioy_shihunzhuo_useCard_count += 1
									if(player.storage.zioy_shihunzhuo_useCard_count > num){
										var evt=_status.event.getParent('phaseUse');
										if(evt&&evt.name=='phaseUse'){
											evt.skipped=true;
										}
										event.finish();
									}
								},
								priority:7058211
							}
						},
						_priority:9579
					},
					zioy_nuhuangfeng:{
						autoTranslate: {
							"name": "笯凰凤",
							"info": `游戏开始时或回合结束阶段：<br>
							若你未处于【灵降】且未进入过【常灭】状态且场上存在未拥有“恒”的其他角色，你须选择一名未拥有“恒”的其他角色，你令其获得“恒”并根据你选择的角色进入【灵降】状态。<br>
							若你未处于【灵降】且未进入过【常灭】状态且场上所有角色均已拥有“恒”，你进入【常灭】状态并进行3个额外的回合。<br>
							<br>【灵降】状态具有以下特性:<br>
							①进入【灵降】状态时，记录你当前的体力，体力上限，区域内的牌。然后将你区域内的所有牌移出游戏。将你的武将牌替换为你进入【灵降】状态时选择的角色的武将牌。将你的体力，体力上限调整为与该角色游戏开始时相等。你获得其所有技能并摸4张牌。<br>
							②【灵降】状态下你即将进入濒死状态时，取消之，改为退出【灵降】状态。<br>
							③退出【灵降】状态时，你失去你区域内的所有牌，失去你于【灵降】状态期间获得的所有技能，将武将牌替换为进入【灵降】状态前的武将牌。将你当前的体力，体力上限调整为于进入【灵降】状态前相等。然后将进入【灵降】前区域内的牌移入相应位置。<br>
							<br>【常灭】状态具有以下特性:<br>
							①进入【常灭】状态时，所有其他角色立即获得“空”与“舍”。<br>
							②你的回合开始阶段，你将你的体力与体力上限修改为9，并将你的手牌补至X（X为你“嗜”的数量）。<br>
							③你使用牌没有距离限制。拥有“空”或“舍”的其他角色无法响应你使用的牌。<br>
							④你即将造成/受到的伤害*2且结算时至少为2。<br>
							⑤你造成伤害时，若受伤角色拥有“恒”，你令其失去之，然后你获得1枚“神罪”。<br>
							⑥你杀死一名角色时，你获得3枚“神罪”。<br>
							⑦其他角色的回合开始阶段，你失去所有体力。`
						},
						init:function(player){
							player.storage.zioy_nuhuangfeng_status = null
						},
						forced:true,
						trigger:{
							player:['phaseEnd','zioy_nuhuangfeng_enterGame']
						},
						filter(event,player){
							// 进入过常灭状态
							if(player.storage.zioy_nuhuangfeng_changmie_flag)return false
							return player.storage.zioy_nuhuangfeng_status === null
						},
						skillAnimation: true,
						animationColor: "thunder",
						async content(_e,_t,player){
							const noneHasHeng = game.players.reduce((f,v)=>{return f && v.hasSkill('zioy_shihunzhuo_heng')},true)
							if(!noneHasHeng){
								// 选择角色进行【灵降】
								const { result } = await player
								.chooseTarget(
									(card, player, target) => target !== player && !target.hasSkill('zioy_shihunzhuo_heng'),
									1,
									true,
									`选择1名未拥有“恒”的其他角色以进入【灵降】状态`
								)
								.set("ai", target => {
									var att = get.attitude(player, target);
									return -att;
								});
								const target = result.targets[0]
								player.line(target)
								target.addSkill('zioy_shihunzhuo_heng')
								player.storage.zioy_nuhuangfeng_storage = {
									hp: player.hp,
									maxHp: player.maxHp,
									skills: [...player.skills],
									card:{
										h:[...player.getCards('h')],
										e:[...player.getCards('e')],
										j:[...player.getCards('j')]
									},
									name: player.name2 === 'zioy_gold' ? player.node.name2.innerHTML : player.node.name.innerHTML,
									group:player.group
								}
								player.addToExpansion(player.getCards('hej')).gaintag.add('zioy_nuhuangfeng_gainLingJiang');
								const targetInfo = lib.character[target.name1] ? lib.character[target.name1] : [target.sex, target.group, `${target.hp}/${target.maxHp}/${target.hujia}`, [...target.skills]]
								player.hp = get.infoHp(targetInfo[2]);
								player.maxHp = get.infoMaxHp(targetInfo[2]);
								// player.hujia = get.infoHujia(targetInfo[2]);
								player.draw(4)
								const skills = [...targetInfo[3]];
								for(let skill of skills){
									player.addSkill(skill)
								}
								_mt.player.changeAvatar(player, target.name, 'zioy_gold')
								_mt.player.setName(player,`降·${target.node.name.innerHTML}`, 'zioy_gold')
								player.changeGroup(target.group)
								player.storage.zioy_nuhuangfeng_status = 'lingjiang'
								player.update()
								// 退出灵降
								player.exitLingjiang = ()=>{
									player.discard(player.getCards('hej'))
									const storage = player.storage.zioy_nuhuangfeng_storage
									const rmSkills = [...player.skills].filter(v=>!storage.skills.includes(v))
									for(let s of rmSkills){
										player.removeSkill(s)
									}
									player.hp = storage.hp
									player.maxHp = storage.maxHp
									for(let s of storage.skills){
										if(!player.hasSkill(s)){
											player.addSkill(s)
										}
									}
									for(let c of storage.card.e){
										player.equip(c)
									}
									for(let c of storage.card.j){
										player.addJudge(c)
									}
									player.gain(storage.card.h, 'fromStorage')
									player.changeGroup(storage.group)
									_mt.player.changeAvatar(player, 'zioy_gold', 'zioy_gold')
									_mt.player.setName(player,`${storage.name}`, 'zioy_gold')
									player.storage.zioy_nuhuangfeng_status = null
									player.update()
								}
							}else{
								// setInterval(()=>{
								// 	const sm = '▝▞▖▗▘▚'
								// 	const g = ()=>{
								// 		const rn = _mt.math.randInt(0,sm.length-1)
								// 		return sm.substring(rn,rn+1)
								// 	}
								// 	const rs = `${g()}${g()}${g()}`
								// 	_mt.player.setName(player, rs,'zioy_gold')
								// },200)
								// 祭祀-神枝桠
								_mt.player.setName(player, 'ꆦꑞꉂ', 'zioy_gold')
								_mt.player.changeAvatarStyle(player,"glitch",'zioy_gold')
								player.storage.zioy_nuhuangfeng_changmie_flag = true
								player.storage.zioy_nuhuangfeng_status = 'changmie'
								for(let i = 0;i < 3;i++){
									player.insertPhase();
								}
								game.players.forEach(current=>{
									player.line(current)
									if(!current.hasSkill('zioy_shihunzhuo_kong')){
										current.addSkill('zioy_shihunzhuo_kong')
									}
									if(!current.hasSkill('zioy_shihunzhuo_she')){
										current.addSkill('zioy_shihunzhuo_she')
									}
								})
							}
						},
						autoSubSkill:{
							enterGame:{
								trigger:{
									global:'phaseBefore',
									player:['enterGame']
								},
								filter(event,player){
									if(event.name=='phase'&&game.phaseNumber>0) return false;
									return true
								},
								direct:true,
								async content(event,trigger,player){
									_status.event.trigger("zioy_nuhuangfeng_enterGame");
								}
							},
							lin_dyingBefore:{
								trigger:{
									player:['dyingBefore','dieBefore']
								},
								forced:true,
								_priority:5399439705821,
								filter(_e,player){
									return player.storage.zioy_nuhuangfeng_status === 'lingjiang'
								},
								async content(_e,_t,player){
									player.exitLingjiang()
								}
							},
							chang_phaseBegin:{
								trigger:{
									player:'phaseBegin'
								},
								filter(event,player){
									return player.storage.zioy_nuhuangfeng_status === 'changmie'
								},
								forced:true,
								async content(_e,_t,player){
									player.hp = 9
									player.maxHp = 9
									player.update()
									const drawTo = player.countMark('zioy_shihunzhuo_shi')
									if(player.countCards('h') < drawTo){
										player.draw(drawTo - player.countCards('h'))
									}
								},
								_priority:170058
							},
							chang_directHit:{
								trigger:{
									player:"useCardToPlayered",
								},
								forced:true,
								filter(event,player){
									if(event.player === player){
										return false
									}
									if(player.storage.zioy_nuhuangfeng_status === 'changmie'){
										return false
									}
									return event.player.hasSkill('zioy_shihunzhuo_kong') || event.player.hasSkill('zioy_shihunzhuo_she')
								},
								_priority:170058,
								async function (_e,trigger,player){
									game.log(player,'令',trigger.card,'不能被',trigger.target,'响应');
									trigger.directHit.push(trigger.target);
								}
							},
							chang_damageBegin1:{
								trigger:{
									player:'damageBegin1',
									source:'damageBegin1'
								},
								filter(event,player){
									return player.storage.zioy_nuhuangfeng_status === 'changmie'
								},
								direct:true,
								content:async function(event,trigger,player){
									trigger.num *= 2
								},
								priority:-539943419
							},
							chang_damageBegin3:{
								trigger:{
									player:'damageBegin3',
									source:'damageBegin3'
								},
								filter:(event,player)=>{
									return player.storage.zioy_nuhuangfeng_status === 'changmie' && event.num < 2
								},
								direct:true,
								content:async function(event,trigger,player){
									trigger.num = 2
								},
								priority:-539943419
							},
							chang_damageBeginSource:{
								trigger:{
									source:'damageEnd'
								},
								forced:true,
								filter(event,player){
									return player.storage.zioy_nuhuangfeng_status === 'changmie' && event.player.hasSkill('zioy_shihunzhuo_heng')
								},
								async content(_e,trigger,player){
									trigger.player.removeSkill('zioy_shihunzhuo_heng')
									player.addMark('zioy_nuhuangfeng_shenzui')
								},
								priority:-151654684
							},
							chang_dieAfterSource:{
								trigger:{
									source:'dieAfter'
								},
								forced:true,
								filter(_e,player){
									return player.storage.zioy_nuhuangfeng_status === 'changmie'
								},
								async content(_e,trigger,player){
									player.addMark('zioy_nuhuangfeng_shenzui', 3)
								},
								priority:-151654684
							},
							chang_phaseBegin_other:{
								trigger:{
									global:"phaseBegin",
								},
								forced:true,
								filter:function(event,player){
									return event.player!=player && player.storage.zioy_nuhuangfeng_status === 'changmie';
								},
								async content(_,__,player){
									player.loseHp(player.hp)
								},
								priority:-151654684
							}
						},
						subSkill:{
							shenzui:{
								mark:false,
								marktext:'神罪',
								intro:{
									name:'神罪',
									mark(_,__,player){
										return player.countMark('zioy_nuhuangfeng_shenzui') >= 5 ?
										'神明反叛':'伪神无赦'
									}
								}
							}
						},
						mod:{
							targetInRange(card,player,target){
								if(player.storage.zioy_nuhuangfeng_status === 'changmie') return true;
							},
						},
						_priority: 8648,
					},
					zioy_duwenlei:{
						autoTranslate: {
							"name": "独抆泪",
							"info": `每局游戏限1次。你即将死亡时，若你满足：<br>
							1.你当前体力大于0<br>
							2.你的“神罪”标记数量不小于5<br>
							其中任意条，则终止死亡，你退出【常灭】状态并使你〖规神舞〗有效。<br>
							若均不满足，你令一名死亡角色复活并将其体力与体力上限设置为与该角色游戏开始时相等，令其获得你区域内所有牌。`
						},
						autoSubSkill:{
							goDie:{
								trigger:{
									player:'dieBefore'
								},
								forced:true,
								filter(event,player){
									if(player.storage.zioy_duwenlei_used)return false
									return player.hp <= 0 && player.countMark('zioy_nuhuangfeng_shenzui') < 5
								},
								forceDie:true,
								async content(_e,_t,player){
									player.storage.zioy_duwenlei_used = true
									const {result} = await player.chooseTarget('令一名死亡角色复活并将其体力与体力上限设置为与该角色游戏开始时相等，令其获得你区域内所有牌。',(_, player, target)=>target.isDead()).set('deadTarget',true)
									.set("ai", target => {
										var att = get.attitude(player, target);
										return att;
									});
									if(result.bool){
										const target = result.targets[0]
										target.revive()
										const targetInfo = lib.character[target.name1]
										target.hp = get.infoHp(targetInfo[2]);
										target.maxHp = get.infoMaxHp(targetInfo[2]);
										target.gain(player.getCards('hej'))
										target.update()
									}
								},
								_priority:7055432
							},
							BecomeGod:{
								trigger:{
									player:'dieBefore'
								},
								forced:true,
								skillAnimation: true,
								animationColor: "thunder",
								forceDie:true,
								filter(event,player){
									if(player.storage.zioy_duwenlei_used)return false
									return player.hp > 0 || player.countMark('zioy_nuhuangfeng_shenzui') >= 5
								},
								async content(_e,trigger,player){
									_mt.player.changeAvatarStyle(player,"glitch",'zioy_gold')
									player.storage.zioy_duwenlei_used = true
									trigger.cancel()
									if(player.storage.zioy_nuhuangfeng_status === 'changmie'){
										player.storage.zioy_nuhuangfeng_status = null
									}
								},
								_priority:7055433
							}
						}
					},
					zioy_tanxi:{
						autoTranslate: {
							"name": "谈息",
							"info": `锁定技。每回合限1次。当你使用或打出基本牌或成为使用基本牌的目标时，你获得1枚“息”（不超过11枚），然后你摸等同于“息”的数量/3张牌（向上取整）并将护甲值调整为“息”的数量/7（向下取整）。`
						},
						trigger:{
							target:"useCardToTarget",
							player:['useCardToTarget', "respond", "useCard"]
						},
						marktext:'息',
						intro:{
							name:'息',
							mark:()=>lib.translate.zioy_tanxi_info
						},
						locked: true,
						forced: true,
						filter(event,player){
							return !player.hasSkill('zioy_tanxi_blocker') && get.type(event.card)=='basic'
						},
						async content(_e,_t,player){
							player.addSkill('zioy_tanxi_blocker')
							const count = player.countMark('zioy_tanxi')
							if(count < 11){
								player.addMark('zioy_tanxi')
							}
							player.draw(Math.ceil(count/3))
							player.changeHujia(Math.floor(count/7) - player.hujia)
						},
						subSkill:{
							blocker:{
								trigger:{
									global:'phaseEnd'
								},
								filter:()=>true,
								silent:true,
								direct:true,
								async content(_e,__,player){
									player.removeSkill('zioy_tanxi_blocker')
								}
							}
						},
						_priority: 3
					},
					zioy_yuekong:{
						autoTranslate: {
							"name": "阅空",
							"info": `锁定技。你造成/受到的伤害不超过1点。`
						},
						trigger:{
							source:'damageBegin3',
							player:['damageBegin3']
						},
						locked: true,
						forced: true,
						filter(event,player){
							return event.num > 1
						},
						async content(_e,trigger,_p){
							trigger.num = 1
						},
						_priority: -5646541,
					},
					zioy_gengyi:{
						autoTranslate: {
							"name": "亘一",
							"info": `出牌阶段限1次。你可以失去1/2的“息”（向下取整），令所有角色弃置区域内所有牌并失去所有护甲，然后调整体力上限/体力与武将牌上相同并摸4张牌。`
						},
						enable: "phaseUse",
						usable: 1,
						skillAnimation: true,
						filter(){return true},
						async content(_e,_t,player){
							player.removeMark('zioy_tanxi', Math.floor(player.countMark('zioy_tanxi')/2))
							for(let p of game.players){
								p.discard(p.getCards('hej'))
								p.changeHujia(-p.hujia)
								if(p.name !== 'unknown'){
									const hp = get.infoHp(lib.character[p.name][2]);
									const maxHp = get.infoMaxHp(lib.character[p.name][2]);
									if(p.maxHp > maxHp){
										await p.loseMaxHp(p.maxHp - maxHp)
									}
									if(p.maxHp < maxHp){
										await p.gainMaxHp(maxHp - p.maxHp)
									}
									if(p.hp > hp){
										await p.loseHp(p.hp - hp)
									}
									if(p.hp < hp){
										await p.recover(hp - p.hp)
									}
								}
								p.draw(4)
							}
						},
						ai: {
							order: 2,
							result: {
								player: function (player) {
									if(player.hp == 1){
										return 999
									}
									let count = 0
									game.players.forEach(p=>{
										count += get.attitude(player,p) * (2 + (get.infoHp(lib.character[p.name][2]) - p.hp)**3 - p.countCards('h') - 3 * p.countCards('e') - 2 * p.hujia)
									})
									return count
								}
							}
						},
					},
					zioy_youxia:{
						autoTranslate: {
							name: "犹狎",
							info: "一名其他角色即将受到伤害时，你可与其交换座位并代替其进行后续结算。"
						},
						trigger: {
							global:'damageBefore'
						},
						filter(event, player){
							return event.player !== player
						},
						direct: true,
						async content(event, trigger, player){
							const { result } = await player.chooseBool(`${get.translation(event.name)}: 是否代替${get.translation(trigger.player)}进行后续结算`, function(){
								if(player.hp <= trigger.num && !trigger.source) return false
								return get.attitude(player, trigger.player) > 0 && player.identity !== 'zhu'
							})
							if(result.bool) {
								player.logSkill(event.name, trigger.player)
								game.swapSeat(player, trigger.player);
								trigger.player = player
							}
						},
						ai: {
							threaten: 1
						},
						_priority: 1,
					},
					zioy_changai:{
						autoTranslate: {
							name: "长哀",
							info: "当你死亡后，你可令杀死你的角色弃置其区域内所有牌，失去所有护甲并将体力失去至1点，然后你结束当前回合并令一名其他角色执行一个额外的回合。"
						},
						trigger: {
							player: 'die'
						},
						nolog: true,
						frequent: true,
						forceDie: true,
						skillAnimation: true,
						filter(event, player){
							return event.source;
						},
						async content(event, trigger, player){
							const target = trigger.source
							player.logSkill(event.name, target)
							player.line(target)
							target.discard(target.getCards('hej'))
							if(target.hujia){
								target.changeHujia(-target.hujia)
							}
							if(target.hp - 1 > 0){
								target.loseHp(target.hp - 1)
							}
							let evt=_status.event.getParent('phaseUse');
							if(evt&&evt.name=='phaseUse'){
								game.log(target,'结束了出牌阶段');
								evt.skipped=true;
							}
							evt=trigger.getParent('phase');
							if(evt){
								game.log(target,'结束了回合');
								evt.finish();
							}
							const _r = await player.chooseTarget(`令一名角色进行一个额外的回合`, [1,1], true, (_, player, target)=>{
								return true
							}).set("ai", target => {
								var att = get.attitude(player, target);
								return att;
							});
							const _res = _r.result
							const _p = _res.targets[0]
							_p.insertPhase()
							// }
						},
						ai: {
							threaten: 1
						}
					},
					zioy_ji_jiyue: {
						autoTranslate: {
							name: "激·极跃",
							info: "锁定技。每名角色限1次。一名角色的回合开始阶段，若你拥有护甲则失去所有护甲，终止一切结算并令你与其各执行一个额外的回合。"
						},
						trigger: {
							global: 'phaseBegin'
						},
						forced: true,
						locked: true,
						init(player){
							player.storage.ji_jiyue_players = [player]
						},
						filter(event, player){
							return player.hujia > 0 && !player.storage.ji_jiyue_players.includes(event.player)
						},
						async content(event, trigger, player){
							player.storage.ji_jiyue_players.push(trigger.player);
							await player.changeHujia(-player.hujia)
							const evt=_status.event.getParent('phase');
							if(evt){
								game.resetSkills();
								_status.event=evt;
								_status.event.finish();
								// _status.event.untrigger(true);
							}
							player.insertPhase()
							trigger.player.insertPhase()
						},
						ai: {
							threaten: 1
						},
						_priority: 73326573756997,
					},
					zioy_ji_jidian: {
						autoTranslate: {
							name: "极·激电",
							info: `锁定技。<br>①当你使用牌指定一名角色为唯一目标结算完成后，你有50%概率对其造成1点雷属性伤害，否则你将你的护甲调整至1点。<br>②当你造成雷属性伤害后，你有50%的概率令其获得“麻痹”异常。<br>③当你受到非雷属性伤害后，你有50%的概率获得1点护甲，否则你摸一张牌。<br>④你免疫“麻痹”异常。`
						},
						trigger: {
							player:"useCardAfter",
						},
						init(player){
							player.addBuffImmune('mabi', Infinity, "id=zioy_ji_jidian")
						},
						locked: true,
						forced: true,
						filter(event, player){
							// console.log('event ===> ', event)
							return event.targets.length === 1
						},
						async content(event, trigger, player){
							const target = trigger.targets[0]
							if (_mt.math.randInt(0,1)) {
								player.line(target)
								target.damage(1, 'thunder')
							} else {
								player.changeHujia(1 - player.hujia)
							}
						},
						autoSubSkill: {
							damageSource: {
								trigger: {
									source:"damageAfter",
								},
								locked: true,
								forced: true,
								filter(event, player){
									if (_mt.math.randInt(0,1) === 0) {
										return false
									}
									return event.hasNature('thunder')
								},
								async content(event, trigger, player) {
									const target = trigger.player
									target.addBuff('mabi')
								}
							},
							damagePlayer: {
								trigger: {
									player:"damageAfter",
								},
								locked: true,
								forced: true,
								filter(event, player){
									return !event.hasNature('thunder')
								},
								async content(event, trigger, player) {
									if (_mt.math.randInt(0,1) === 0) {
										player.changeHujia(1)
									}else{
										player.draw()
									}
								}
							}
						},
						ai: {
							threaten: 1
						},
						_priority: 541,
					},
					zioy_kong: {
						autoTranslate: {
							name: "空",
							info: `锁定技。你的体力上限等于场上存活角色数。游戏开始时你回复所有体力。`
						},
						locked: true,
						forced: true,
						trigger: {
							global: ['phaseBefore', 'phaseBegin', 'phaseEnd', 'dieEnd', 'dieBefore', 'dieAfter', 'reviveEnd', 'reviveBefore', 'reviveAfter'],
							player:"enterGame",
						},
						filter(event, player){
							return game.players.length !== player.maxHp;
						},
						async content(event, trigger, player){
							const diff = game.players.length - player.maxHp;
							if(diff < 0) {
								player.loseMaxHp(-diff)
							} else {
								player.gainMaxHp(diff)
							}
						},
						autoSubSkill:{
							enterGame:{
								trigger:{
									global:"phaseBefore",
									player:"enterGame",
								},
								filter:function(event,player){
									return (event.name!='phase'||game.phaseNumber==0);
								},
								direct:true,
								async content(__,___,player){
									player.recover(player.maxHp);
								},
								_priority: -1,
							},
							gainMaxHpBefore: {
								trigger:{
									player:['gainMaxHpBefore']
								},
								direct:true,
								filter(event, player) {
									return event.num + player.maxHp !== game.players.length;
								},
								async content(event, trigger, player){
									trigger.cancel();
								}
							},
							loseMaxHpBefore: {
								trigger:{
									player:['loseMaxHpBefore']
								},
								direct:true,
								filter(event, player) {
									return player.maxHp - event.num !== game.players.length;
								},
								async content(event, trigger, player){
									trigger.cancel();
								}
							}
						},
						ai: {
							threaten: 1
						},
						_priority: 1,
					},
					zioy_wu: {
						autoTranslate: {
							name: "无",
							info: `锁定技。你于摸牌阶段的摸牌数，你的手牌上限，你的攻击范围，你造成的伤害均等于你的当前体力值。`
						},
						locked: true,
						mod:{
							maxHandcardBase:function(player,num){
								return player.hp;
							},
							attackRange:(player,num)=>player.hp,
						},
						autoSubSkill:{
							damage: {
								trigger: {
									source: 'damageBegin2'
								},
								forced: true,
								filter(event, player){
									return true
								},
								async content(event, trigger, player){
									trigger.num = player.hp
								},
								ai: {
									threaten: 1
								},
								_priority: -351651,
							},
							phaseDraw: {
								trigger:{
									player:"phaseDrawBegin2",
								},
								forced: true,
								filter(event,player){
									return true;
								},
								async content(event,trigger,player){
									trigger.num = player.hp;
								},
								ai:{
									threaten:1.3,
								},
							},
						},
						ai: {
							threaten: 1
						},
						_priority: 1,
					},
					zioy_chiqi: {
						autoTranslate: {
							name: "赤契",
							info: `①游戏开始时，你获得X点体力上限并获得1枚“契月”（X为场上每名角色体力上限的最大值）<br>②当你拥有“契月”时：你攻击范围+X；你造成的伤害+X/3（向下取整）；你使用牌无次数限制；当你于回合外使用或打出基本牌结算完成后，你收回此牌并移去一枚“契月”标记；造成伤害后，你移去一枚“契月”标记。`
						},
						trigger:{
							global:"phaseBefore",
							player:"enterGame",
						},
						mod:{
							cardUsable:function (card,player,num){
								if(player.countMark('zioy_chiqi') > 0)
									 return Infinity;
							},
							attackRange:(player,num)=> player.countMark('zioy_chiqi') > 0 ?  num + player.countMark('zioy_chiqi') : num,
						},
						marktext:'契月',
						intro:{
							name:'契月',
							mark:() => ''
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						async content(event,trigger,player){
							let max = -1
							for(const _player of game.players) {
								max = Math.max(_player.maxHp)
							}
							player.gainMaxHp(max)
							player.addMark('zioy_chiqi')
						},
						autoSubSkill: {
							damageBegin1: {
								trigger:{
									source:"damageBegin1",
								},
								filter:function(event,player){
									return player.countMark('zioy_chiqi') > 0;
								},
								forced:true,
								async content(event,trigger,player){
									trigger.num += Math.floor(player.countMark('zioy_chiqi') / 3);
								},
								"_priority": 6354564654,
							},
							damageEnd: {
								trigger:{
									source:"damageEnd",
								},
								filter:function(event,player){
									return player.countMark('zioy_chiqi') > 0;
								},
								forced:true,
								async content(event,trigger,player){
									player.removeMark('zioy_chiqi', 1)
								},
								"_priority": 6354564654,
							},
							useCardAfter: {
								trigger:{
									player:['useCard', 'respond'],
								},
								filter:function (event,player){
									return player.countMark('zioy_chiqi') > 0 && player!=_status.currentPhase && get.type(event.card) === 'basic';
								},
								async content(event,trigger,player){
									player.gain(trigger.cards)
									player.removeMark('zioy_chiqi', 1)
								},
								forced:true,
								"_priority":485965631,
							}
						}
					},
					zioy_aici: {
						autoTranslate: {
							name: "哀慈",
							info: `①出牌阶段，你可选择任意名未拥有“契月”且座次连续的角色。你令其依次获得等同于其体力上限枚“契月”标记（若其为你则获得3枚标记），摸等量的牌，并使其依次获得〖赤月东升〗。<br>②当拥有“契月”标记的角色即将死亡时，你获得其所有“契月”标记。`
						},
						derivation: ["zioy_chiyuedongsheng"],
						locked: false,
						mod:{
							maxHandcardBase:function(player,num){
								return player.hp;
							},
							attackRange:(player,num)=>player.hp,
						},
						autoSubSkill:{
							selectTarget: {
								enable:"phaseUse",
								usable:1,
								forced: true,
								filter(event, player){
									return game.players.filter(t => t.countMark('zioy_chiqi') === 0).length > 0;
								},
								filterTarget:function(card,player,target){
									// if(player==target) return false;
									if(target.countMark('zioy_chiqi') > 0) return false;
									if(ui.selected.targets.length === 0) return true
									for(const _t of ui.selected.targets){
										if([_t.getNext(), _t.getPrevious()].includes(target)) {
											return true
										}
									}
									return false
								},
								selectTarget:[1,Infinity],
								async content(event, trigger, player){
									const num = event.num
									const t = event.targets[num]
									const getCardNum = t === player ? 3 : t.maxHp
									t.addMark('zioy_chiqi', getCardNum)
									t.draw(getCardNum)
									t.addSkill('zioy_chiyuedongsheng')
								},
								ai: {
									threaten: 1,
									result:{
										target: function (player, target) {
											return get.attitude(player, target)
										},
									},
									order:1,
								},
								_priority: -351651,
							},
							die: {
								trigger:{
									global:"dieBefore",
								},
								forced: true,
								filter(event,player){
									return event.player.countMark('zioy_chiqi') > 0;
								},
								async content(event,trigger,player){
									const count = trigger.player.countMark('zioy_chiqi');
									trigger.player.removeMark('zioy_chiqi', count)
									player.addMark('zioy_chiqi', count)
								},
								ai:{
									threaten:1.3,
								},
							},
						},
						ai: {
							threaten: 1
						},
						_priority: 1,
					},
					zioy_chiyuedongsheng: {
						autoTranslate: {
							name: "赤月东升",
							info: `①当你即将恢复体力时，取消之，然后你移去一枚“契月”标记。<br>②回合开始阶段，你移去一枚“契月”标记。<br>③当你失去所有“契月”时，你失去此技能并受到1点由你造成伤害。`
						},
						locked: false,
						mod:{
							maxHandcardBase:function(player,num){
								return player.hp;
							},
							attackRange:(player,num)=>player.hp,
						},
						init: (player) => {
							const unhook = _mt.other.hook(player, 'removeMark', {
								after: () => {
									if(player.countMark('zioy_chiqi') === 0) {
										unhook()
										player.damage()
										player.removeSkill('zioy_chiyuedongsheng')
									}
								}
							})
							player.storage.zioy_chiyuedongsheng = {
								unhook
							}
						},
						onremove: (player) => {
							player.storage.zioy_chiyuedongsheng.unhook()
						},
						autoSubSkill:{
							recover: {
								trigger: {
									source: 'recoverBefore'
								},
								forced: true,
								filter(event, player){
									return player.countMark('zioy_chiqi')
								},
								async content(event, trigger, player){
									trigger.cancel()
									player.removeMark('zioy_chiqi', 1)
									// if(player.countMark('zioy_chiqi') === 0) {
									// 	player.damage()
									// 	player.removeSkill('zioy_chiyuedongsheng')
									// }
								},
								ai: {
									threaten: 1
								},
								_priority: -351651,
							},
							phaseBegin: {
								trigger:{
									player:"phaseBegin",
								},
								forced: true,
								filter(event,player){
									return player.countMark('zioy_chiqi')
								},
								async content(event,trigger,player){
									player.removeMark('zioy_chiqi', 1)
									// if(player.countMark('zioy_chiqi') === 0) {
									// 	player.damage()
									// 	player.removeSkill('zioy_chiyuedongsheng')
									// }
								},
								ai:{
									threaten:1.3,
								},
							},
						},
						ai: {
							threaten: 1
						},
						_priority: 1,
					},
					zioy_zongwanqianshenglingshengmie: {
						autoTranslate: {
							name: "纵万千生灵生灭",
							info: `限定技。回合开始阶段，你可以弃置你区域内所有牌，然后选择若干名其他角色，依次将其区域内的所有牌移动至你区域内的相应位置，然后将其所有“契月”移动至你的区域内并摸等同于本次移动“契月”数量的牌，然后你移去所有“契月”，恢复等量体力并对所有其他角色造成等同于你当前体力/3（向下取整）的伤害。`
						},
						trigger: {
							player: 'phaseBegin'
						},
						limit: true,
						skillAnimation: true,
						animationColor: "soil",
						check: function (event, player) {
							return player.hp <= 2;
						},
						async content(event,trigger,player){
							player.awakenSkill('zioy_zongwanqianshenglingshengmie')
							player.discard('hej')
							const {result: { targets }} = (await (player.chooseTarget(get.translation('zioy_zongwanqianshenglingshengmie'), [1,game.players.length - 1], true, (_, player, target)=>{
								return player !== target
							}).set("ai", target => {
								var att = get.attitude(player, target);
								return -att;
							})));
							for(const target of targets) {
								if(target === player) {
									continue
								}
								for(const card of target.getCards('hej')) {
									if (get.position(card) == "e") {
										player.equip(card);
									} else if (get.position(card) == "j") {
										player.addJudge(card);
									} else {
										player.gain(card);
									}
								}
								const count = target.countMark('zioy_chiqi');
								target.removeMark('zioy_chiqi', count)
								player.addMark('zioy_chiqi', count)
								player.draw(count)
							}
							const count = player.countMark('zioy_chiqi');
							player.removeMark('zioy_chiqi', count)
							player.recover(count)
							for(const target of targets) {
								if(target === player) {
									continue
								}
								target.damage(Math.floor(count / 3))
							}
						},
						autoSubSkill:{
						},
						ai: {
							threaten: 1
						},
						_priority: 1,
					},
					zioy_bolian: {
						autoTranslate: {
							name: "波敛",
							info: `锁定技。<br>①你的【杀】均视为【桃】。<br>②出牌阶段，你可以弃置一张【桃】，视为对一名受伤角色使用一张【桃】。<br>③当其他角色受到来源为你的回复时，其获得〖风祝〗。<br>④当拥有〖风祝〗的角色死亡时，你移除此技能并获得〖寒息〗。`
						},
						mod:{
							cardname:function(card,player){
								if(card.name=='sha') return 'tao';
							},
						},
						// global:['zioy_bolian_taoUseable'],
						enable:"phaseUse",
						usable:Infinity,
						// filterTarget:true,
						selectTarget:1,
						filter:function(event,player){
							if(game.players.filter(p => p.hp !== p.maxHp).length === 0) return false;
							if(player.getCards('hej').filter(c => c.name === 'tao' || c.name === 'sha').length === 0) return false
							return true
						},
						filterTarget:function(card, player,target){
							if(card.name!=='tao') return;
							if(target.hp!== target.maxHp) return true;
							return false;
						},
						filterCard(card){
							return get.name(card)=='tao';
						},
						content:async function(event,trigger,player){
							// console.log(event.cards,event, trigger, player)
							player.useCard({name: 'tao', isCard: false},event.targets[0])
						},
						ai:{
							order:9,
							result:{
								target(player,target){
									if(target.hp==1) return 5;
									if(player==target&&player.countCards('h')>player.hp) return 5;
									return 2;
								},
							},
							threaten:2,
						},
						_priority: 1,
						autoSubSkill:{
							aftRecover: {
								trigger: {
									global: "recoverEnd",
								},
								forced: true,
								filter(event,player){
									// console.log(event, event.source)
									return event.source === player
								},
								content: async function(event,trigger,player){
									const target = trigger.player
									if(!target.hasSkill('zioy_fengzhu')) {
										target.addSkill('zioy_fengzhu')
										target.storage.fengzhu_source = player
									}
								},
							},
							fengzhuDie: {
								trigger: {
									global: "dieAfter",
								},
								filter: function (event, player) {
									console.log('fzdie', event)
									return event.player.hasSkill('zioy_fengzhu') && event.player.storage.fengzhu_source === player;
								},
								forced: true,
    							skillAnimation:true,
								content: async function (event, trigger, player) {
									player.removeSkill('zioy_bolian')
									player.addSkill('zioy_hanxi')
								},
							}
						},
					},
					zioy_fengzhu: {
						autoTranslate: {
							name: "风祝",
							info: `锁定技。当你回复体力时，你获得1点护甲。`
						},
						mark: true,
						marktext: '风祝',
						intro: {
							name: "风祝",
							mark: () => "当你回复体力时，你获得1点护甲"
						},
						init: function (player) {
							if(player.hasSkill('zioy_chiliu')) {
								player.removeSkill('zioy_chiliu')
							}
						},
						trigger: {
							player: 'recoverEnd'
						},
						filter: function (event, player) {
							return true
						},
						forced: true,
						content: async function (event, trigger, player) {
							player.changeHujia(1)
						},
					},
					zioy_hanxi: {
						autoTranslate: {
							name: "寒溪",
							info: `锁定技。<br>①你的【闪】均视为【杀】，你使用【杀】无距离与次数限制。<br>②当你使用【杀】指定目标后，你令所有目标获得〖斥流〗。`
						},
						mod:{
							cardname:function(card,player){
								if(card.name=='shan') return 'sha';
							},
							targetInRange:function(card,player){
								if(card.name==='sha') return true;
							},
							cardUsable(card,player,num){
								if(card.name=='sha') return Infinity;
							},
						},
						trigger:{
							player:"useCardToPlayered",
						},
						filter(event,player){
							return event.card.name=='sha';
						},
						forced: true,
						content: async function (event, trigger, player) {
							const target=trigger.target;
							if(!target.hasSkill('zioy_chiliu')) {
								target.addSkill('zioy_chiliu')
								target.storage.chiliu_source = player
							}
						},
						autoSubSkill: {
							aftSha: {
								trigger:{
									player:"useCardAfter",
								},
								direct:true,
								filter:function(event,player){
									return event.card.name=='sha'
								},
								async content(event,trigger,player){
									console.log('aftsha', {
										player,
										trigger,
									})
									for(const p of game.players) {
										if(p.hasSkill('zioy_chiliu')) {
											p.useCard({name: 'sha', isCard: false},trigger.targets)
										}
									}
								},
							}
						}
					},
					zioy_chiliu: {
						autoTranslate: {
							name: "斥流",
							info: `锁定技。当〖斥流〗的来源使用【杀】结算完成后，视为你对相同目标使用一张【杀】。`
						},
						init: function (player) {
							if(player.hasSkill('zioy_fengzhu')) {
								player.removeSkill('zioy_fengzhu')
							}
						},
						mark: true,
						marktext: '斥流',
						intro: {
							name: "斥流",
							mark: () => "锁定技。当〖斥流〗的来源使用【杀】结算完成后，视为你对相同目标使用一张【杀】。"
						},
					},

					zioy_fengzhen: {
						autoTranslate: {
							name: "风阵",
							info: `限定技。若你拥有〖寒溪〗，你可以选择任意名其他角色，你依次对其使用一张【杀】，然后你失去〖寒溪〗，并获得〖波敛〗。若你拥有〖波敛〗，你可以选择任意名角色，你依次对其使用一张【桃】，然后你失去〖波敛〗，并获得〖寒溪〗。`
						},
						limited:true,
						line:"fire",
    					enable:"phaseUse",
						async content(event,trigger,player){
							player.awakenSkill('zioy_fengzhen')
							if(player.hasSkill('zioy_bolian')) {
								const res = await player.chooseTarget(`你可以选择任意名其他角色，你依次对其使用一张【桃】`, [0,game.players.length], true, (_, player, target)=>{
									return true
								}).set("ai", target => {
									var att = get.attitude(player, target);
									return att;
								});
								const result = res.result
								const targets = result.targets;
								for(const target of targets) {
									await player.useCard({name:'tao', isCard: false},target)
								}
								player.removeSkill('zioy_bolian')
								player.addSkill('zioy_hanxi')
							} else {
								const res = await player.chooseTarget(`你可以选择任意名其他角色，你依次对其使用一张【杀】`, [0,game.players.length], true, (_, player, target)=>{
									return player!== target
								}).set("ai", target => {
									var att = get.attitude(player, target);
									return -att;
								});
								// console.log(res)
								const result = res.result
								const targets = result.targets;
								for(const target of targets) {
									await player.useCard({name:'sha', isCard: false},target)
								}
								player.removeSkill('zioy_hanxi')
								player.addSkill('zioy_bolian')
							}
						}
					},
					zioy_shenji: {
						autoTranslate: {
							name: "神机",
							info: `<br>①锁定技。当有牌于〖神机〗结算期间外离开手牌区时，你有20%的概率将其置于武将牌上，称为“花火”。若此时为你的回合内，则概率提升至100%。“花火”至多为5张，当“花火”牌超过5张时，你弃置最早获得的“花火”，若你已受伤则摸一张牌且若为你的回合外则有50%的概率回复1点体力。<br>②出牌阶段限2次，你可以依次使用所有的“花火”，以此法使用的牌无距离与次数限制，若此牌无法使用则弃置之并使本次结算流程后续造成的伤害+1。`
						},
						trigger: {
							global:["loseAfter","loseAsyncAfter"],
						},
						filter(event, player){
							console.log(event.type, {event})
							// if(event.getParent(2).name = 'zioy_shenji') return false
							if(event.name=='lose'&&event.parent.name=='equip') return false;
							if(player.storage.forbidShenji === true) return false
							return true;
						},
						mark: true,
						marktext:"花火",
						intro:{
							content:"expansion",
							markcount:"expansion",
						},
						locked: true,
						forced: true,
						async content(event, trigger, player){
							player.storage.forbidShenji = true
							if(!trigger.cards) return;
							for (const c of trigger.cards) {
								const randRes = _status.currentPhase === player ? true : Math.random() < .2;
								if(!randRes) continue;
								const next = player.addToExpansion(c, 'gain2');
								next.gaintag.add('zioy_shenji');
								await next;
								if(player.getExpansions('zioy_shenji').length > 5) {
									player.storage.forbidShenji = true
									await player.discard(player.getExpansions('zioy_shenji').pop())
									if(player.hp < player.maxHp) {
										if(_status.currentPhase !== player && Math.random()<.5) {
											player.recover(1)
										}
										player.draw(1)
									}
									player.storage.forbidShenji = false
								}
							}
							player.storage.forbidShenji = false
						},
						autoSubSkill: {
							use: {
								enable: "phaseUse",
								usable: 2,
								check: function () {
									return true;
								},
								mod:{
									cardUsable:function(card,player,num){
										if(player.storage.zioy_shenji_unlimit) return Infinity;
									},
									targetInRange(card,player,target,now){
										if(player.storage.zioy_shenji_unlimit) return true;
									},
								},
								filter: function (event, player) {
									return player.getExpansions('zioy_shenji').length > 0;	
								},
								async content(event, trigger, player) {
									player.storage.forbidShenji = true
									player.storage.zioy_shenji_unlimit = true
									const cards = player.getExpansions('zioy_shenji')

									for(let card of cards.reverse()) {
										console.log({
											card,
											canuse: _mt.player.canUse(player, card)
										})
										if (_mt.player.canUse(player, card)) {
											await player.chooseUseTarget(
												card,
												// "视为使用一张【" + get.translation(card) + "】",
												true
											);
											// await player.discard(card);
										} else {
											await player.discard(card);
											player.storage.shenjiDamage = (player.storage.shenjiDamage || 0) + 1
										}
									}
									player.storage.shenjiDamage = 0
									player.storage.zioy_shenji_unlimit = false
									player.storage.forbidShenji = false
								},
								ai: {
									order: 9,
									result: {
										// target: function (player, target) {
										// 	return target.hp - target.maxHp - 1;
										// 	return get.damageEffect(target, player);
										// },
										player: 1
									},
									threaten: 2
								},
								"_priority": 0
							},
							damage1:{
								trigger:{
									source:"damageBegin1",
								},
								filter(event, player){
									return player.storage.shenjiDamage;
								},
								forced:true,
								async content(event,trigger,player){
									trigger.num += player.storage.shenjiDamage || 0;
								},
								ai:{
									damageBonus:true,
								},
								"_priority":245446556
							},
							phaseEnd: {
								trigger: {
									player: "phaseEnd",
								},
								filter: () => true,
								direct: true,
								async content(event, trigger, player) {
									player.storage.zioy_shenji_unlimit = false
									player.storage.forbidShenji = false
								},
								ai: {
									threaten: 1
								},
								_priority: 54645646456,
							},
						},
						ai: {
							threaten: 1
						},
						_priority: 564564564,
					},
					zioy_huahuo: {
						autoTranslate: {
							name: "花火",
							info: `出牌阶段限一次，你可以随机获得并弃置场上手牌区内的5张基本牌。`
						},
						enable: "phaseUse",
						usable: 1,
						check: function () {
							return true;
						},
						async content(event, trigger, player) {
							const cards = []
							game.players.forEach(p => {
								cards.push(...p.getCards('h'))
							})
							const bcs = cards.filter(c => get.type(c) === 'basic')
							console.log({
								bcs,
								cards	
							})
							const t = _mt.loadash.arrRandomGet(bcs, 5)
							for(const c of t) {
								await player.gain(c)
							}
							for(const c of t) {
								await player.discard(c)
							}
						},
						_priority: 1,
					},
				},
				translate: {
					"zioy_xixue": "汲血",
					"zioy_xixue_info": "出牌阶段，你可以弃置一张牌并选择一名非上一回合以此法选择角色，你偷取其一点体力值。",
					"zioy_shiyi": "石翼",
					"zioy_shiyi_info":
						"锁定技<br>①：当你造成1点伤害时，你获得1点护甲。<br>②：你的与其他角色的距离-X，其他角色与你的距离+X，你的手牌上限+X(X为你的护甲值)",
					"zioy_jinjia": "晶甲",
					"zioy_jinjia_info": "锁定技，一轮游戏开始时，若你没有护甲，你获得两点护甲。",
					"zioy_jinsui": "晶髓",
					"zioy_jinsui_info": "出牌阶段，你可以消耗你所有的护甲并选择一名角色，直到你的回合结束，若该角色受到伤害，该角色翻面。",
					"zioy_jinsui2": "晶髓",
					"zioy_jinsui2_info": "若你受到伤害，你翻面。",
					"zioy_chenmeng": "尘梦",
					"zioy_chenmeng_info":
						"锁定技，其他角色造成伤害时，你令其失去一点体力上限并获得〖尘〗标记，然后你获得一点体力上限。你对拥有〖尘〗标记的角色造成伤害时，你移除其〖尘〗标记，恢复其以此法失去的体力上限，然后其失去一点体力，你获得其一张手牌，回复1点体力并失去以此法获得的体力上限。",
					"zioy_chenmeng1": "尘梦",
					"zioy_chenmeng1_info": "当你受到由〖长野原神乐〗造成的伤害时，你回复一点体力上限并失去一点体力，其失去一点体力上限，回复一点体力并获得你一张牌。",
					"zioy_minjian": "瞑渐",
					"zioy_minjian_info": "一轮游戏开始时，你可以令一名角色加X点体力上限，然后你令你上一次以此法选择的角色减X点体力上限（X为当前游戏轮数）。",
					"zioy_eye": "厄夜",
					"zioy_eye_info":
						"锁定技。①当你对一名角色造成伤害或受到一名角色造成的伤害时，你与该角色各减/加2X点体力上限（X为本次造成的伤害值）。<br>②一名角色不因受到伤害或回复体力而变化1点体力或其他角色进入濒死状态时，你摸1张牌并回复1点体力。",
					"zioy_damie": "大灭",
					"zioy_damie_info":
						"出牌阶段限24次。你可令从你开始的每名角色依次失去X点体力，然后你将你的体力上限调整至24。技能结算期间防止非濒死状态的角色回复体力。（X为其已损失体力）。",
					"zioy_eye_old": "厄夜",
					"zioy_eye_old_info": "锁定技，你即将造成的伤害均视为抹除体力。",
					"zioy_damie_old": "大灭",
					"zioy_damie_old_info": "一轮游戏开始时，若场上已有角色死亡，则你可以抹除一名角色的所有体力，你以此法无法使该角色死亡。",
					"zioy_heiyi": "黑疫",
					"zioy_heiyi_info": "锁定技，当你成为【杀】的目标时，此【杀】的来源获得技能〖黑死〗。",
					"zioy_duyi": "黑死",
					"zioy_duyi_info": "锁定技，回合开始时，你失去一点体力，若你体力值为1，则改为失去一点体力上限。",
					"zioy_eji": "恶剂",
					"zioy_eji_info": "限定技，出牌阶段，你可以获得3点体力与体力上限，摸3张牌，接下来的每个回合开始阶段，你失去一点体力上限直到你的体力上限等于1。",
					"zioy_huashou": "花狩",
					"zioy_huashou_info":
						"锁定技，你的回合开始阶段，你随机标记一名敌人并将其区域内随机2/3数量的牌(向上取整)置于其武将牌上。若你回合内对被标记者造成伤害，你移除其标记，对其造成X点伤害，回复X/2（向下取整）点体力，若X/2大于你已损失体力则将你的护甲置为1，然后获得其以此法置于武将牌上的所有牌。若回合结束时其未受到伤害，其获得其武将牌上的所有牌。（X为受伤角色已损失体力）",
					"zioy_huashou2": "花狩",
					"zioy_huashou2_info": "若你本回合未受到伤害，回合结束时获得被〖花狩〗置于武将牌上的牌。",
					"zioy_huashou3": "花狩",
					"zioy_huashou3_info": "",
					"zioy_longyue": "胧月",
					"zioy_longyue_info":
						"游戏开始时，你摸一张牌并创建一张【月光】，你的出牌阶段开始时，你装备你游戏开始时创建的【月光】。你对被〖花狩〗标记的角色造成伤害会提升你的基础属性: 第一次造成伤害时：你装备的【月光】提供的攻击范围+1，每2次造成伤害：你的手牌上限+1，每3次造成伤害：你的摸牌阶段摸牌数+1，每4次造成伤害：你的体力上限+1。",
					"zioy_longyue2": "胧月",
					"zioy_longyue2_info": "",
					"zioy_jike": "棘壳",
					"zioy_jike_info": "锁定技，当你受到伤害时，若伤害来源不为你，你对其造成等额的伤害。",
					"zioy_longyue3": "胧月",
					"zioy_longyue3_info": "摸牌",
					"zioy_happyNewYear": "逡游",
					"zioy_happyNewYear_info":
						'锁定技，当你失去牌时，你获得一个"春"标记。当你的"春"标记数量发生变化时，若标记数量为偶数，你摸一张牌。当你于你的回合内使用【杀】指定目标时，若你的"春"标记数量大于等于X，你需弃置X个"春"标记，并使你此次使用的【杀】不计入出牌阶段使用次数(X在你的出牌阶段第一次使用牌时被赋值为4，且每次使用此技能令【杀】不计入次数时+2)。',
					"zioy_qunyou2": "逡游",
					"zioy_qunyou2_info": "春节快乐，于2023.1.21，8:37。",
					"zioy_qianlong": "潜龙",
					"zioy_qianlong_info": "当你使用或打出一张【杀】或【闪】时，若你区域内有牌，你可以弃置一张牌，然后你摸一张牌并获得一点护甲",
					"zioy_jianlong": "见龙",
					"zioy_jianlong_info":
						"出牌阶段，若你护甲值大于0，你可以摸一张牌并移去一点护甲。若此做，你的下一张【杀】无视距离且若此【杀】造成伤害，你将此技能替换为〖飞龙〗。",
					"zioy_feilong": "飞龙",
					"zioy_feilong_info":
						"锁定技，除非该角色死亡，你的【杀】只能对你上一次使用【杀】造成伤害的角色使用。你的下一张【杀】无距离限制且无法被响应。若你使用【杀】对一名角色造成伤害，你失去【飞龙】并获得【亢龙】，【见龙】，然后你摸一张牌。",
					"zioy_kanglong": "亢龙",
					"zioy_kanglong_info":
						"限定技，出牌阶段，你可以选择一名角色，你摸一张牌，并对该角色造成X点伤害，若该角色因〖亢龙〗死亡，则你的〖亢龙〗视为未使用(X为你当前体力值与该角色当前体力值的差值且至少为1)",
					"zioy_jianlong2": "见龙",
					"zioy_jianlong2_info": "你的杀无视距离",
					"zioy_jianlong4": "见龙",
					"zioy_jianlong4_info": "你的下一张【杀】无视距离。",
					"zioy_kanglong2": "亢龙",
					"zioy_kanglong2_info": "",
					"zioy_yixiang": "燚祥",
					"zioy_yixiang_info": "你造成的伤害均视为火属性，你受到的火属性伤害-1。",
					"zioy_yixiang2": "燚祥",
					"zioy_yixiang2_info": "",
					"zioy_yuyan": "驭煙",
					"zioy_yuyan_info": "锁定技，你废除你的坐骑栏，你与其他角色的距离-1，其他角色与你的距离+1。",
					"zioy_chuixing": "吹星",
					"zioy_chuixing_info":
						"游戏开始时记数组A=[1]，当你使用杀时A[0]+=1，之后令Y=0，遍历数组，对于A[i]，若A[i]==2，你令A[i]=0，令Y+=3 ^ i，之后你选择一名角色，你视为对其使用Y张火【杀】。",
					"zioy_zhijin": "掷金",
					"zioy_zhijin_info": "当你不因〖掷金〗而获得牌时，你随机摸一定数量的牌，该数量与你本次摸牌数成正相关且可能等于零。",
					"zioy_xuanzhuan": "璇转",
					"zioy_xuanzhuan_info":
						"出牌阶段限一次，你可以令场上所有有手牌的角色将一张手牌置于你的武将牌上，然后对于你武将牌上的每张牌，你令随机一名刚才有将牌置入你的武将牌上的角色获得之，你有更大的概率获得。",
					"zioy_leiye1": "累业",
					"zioy_leiye1_info": '当你造成伤害时，你获得一个"墨"标记，当你受到伤害或回复体力时，你获得一个"霜"标记。',
					"zioy_leiye2": "累业",
					"zioy_leiye2_info": "霜",
					"zioy_mosha": "霜杀墨染雪",
					"zioy_mosha_info": '觉醒技，与〖墨残霜伴樱〗共用次数。出牌阶段，若你的"墨"标记达到3，你可以选择一名角色，然后你失去一点体力上限并对其造成3点伤害。',
					"zioy_shuangsha": "墨残霜伴樱",
					"zioy_shuangsha_info":
						'觉醒技，与〖霜杀墨染雪〗共用次数。出牌阶段，若你的"霜"标记达到3，你可以获得一点体力上限，回复2点体力并选择一名角色，你对其造成一点伤害。',
					"zioy_lieying": "裂影",
					"zioy_lieying_info":
						"当你造成伤害时，你可以摸一张牌。若你使用过〖霜杀墨染雪〗，你的【杀】不可被响应且你造成的伤害+1。若你使用过〖墨残霜伴樱〗，你的【杀】可以额外指定一个目标，当你造成伤害时，你回复X点体力值(X为你已损失体力值/2，向下取整)",
					"zioy_lieying1": "裂影",
					"zioy_lieying1_info": "",
					"zioy_wrjzc": "无人机侦查",
					"zioy_wrjzc_info": "回合开始阶段，你观看随机一名角色的手牌。",
					"zioy_zsyhj": "自适应护甲",
					"zioy_zsyhj_info":
						"锁定技，你的手牌上限等于你的护甲，每个回合开始阶段，你大于1的体力上限会被转化为护甲。当你受到一次属性伤害，你免疫下一次属性伤害。当你受到一次无属性伤害，你免疫下一次无属性伤害。两种免疫效果不能同时存在。",
					"zioy_weixiang": "伪像",
					"zioy_weixiang_info": "游戏开始时，你选择一名角色，然后你将你的武将牌替换成你选择角色的武将牌，同时修改自己的体力，体力上限，护甲与其一致。",
					"zioy_zsyhjn": "护甲",
					"zioy_zsyhjn_info": "抵消下一次受到的属性伤害",
					"zioy_fansheng": "反生",
					"zioy_fansheng_info":
						"锁定技，你死亡时，杀死你的角色获得〖年种〗标记并将体力上限减少至1，然后你废除其防具栏，+1马栏，宝物栏。若拥有你给予的〖年种〗标记的角色死亡，你复活并令你回复X点体力，增加X点体力上限，摸X张牌，然后你与其交换座位并进行一个额外的回合(X为〖年种〗标记的角色原有的体力上限)",
					"zioy_nianzhong": "年种",
					"zioy_nianzhong_info": "锁定技，你死亡时，'年'复活并与你交换座位并额外进行一个回合。",
					"zioy_jifou": "祭否",
					"zioy_jifou_info": "一轮游戏开始时，你可以选择一名角色，你使该角色摸牌阶段摸牌数+2，体力上限+3，回复体力至体力上限，并摸5张牌。然后你死亡。",
					"zioy_jifou2": "祭否",
					"zioy_jifou2_info": "你已获得赐福",
					"zioy_liubo": "流波",
					"zioy_liubo_info": "你记录最后一张因弃置进入弃牌堆的牌。当你使用牌指定一名角色为目标时，你可以为此牌额外指定一名目标，并获得〖流波〗记录的牌。",
					"zioy_liubo2": "流波",
					"zioy_liubo2_info": "使用牌",
					"zioy_shuiyue": "水月",
					"zioy_shuiyue_info": "回合结束阶段，你可以摸X张牌，然后将X/1.5且向下取整(X为你本局游戏中发动〖流波〗的次数)",
					"zioy_moying": "末影",
					"zioy_moying_info":
						'出牌阶段限一次，你可以将一张黑色牌置于一名角色的武将牌上，称为"末影"，当你使用牌指定一名其他角色为唯一目标时，拥有"末影"且不为目标的角色视为对目标使用一张与你使用牌相同的牌。场上至多同时存在2个由你产生的"末影"，当"末影"超出限制时，你获得已存在最早产生的"末影"。',
					"zioy_yingdun": "影遁",
					"zioy_yingdun_info":
						'当你成为一名角色使用牌的目标时，你可以选择一名不为此牌目标且拥有"末影"的角色，你将此牌目标转移为该角色并与其交换座位，每个"末影"限一次，重新赋予"末影"可刷新限制。',
					"zioy_moying2": "末影",
					"zioy_moying2_info": "当该影使用牌指定一名其他角色为唯一目标时，若该目标是你的合法目标，你视为对其使用一张与该影使用牌相同的牌。",
					"zioy_jianying": "渐影",
					"zioy_jianying_info": '隐匿技，当你亮出武将牌时，你可以将一张无限点数的黑桃【杀】加入游戏并当作"末影"置于一名其他角色的武将牌上。',
					"zioy_moying3": "末影",
					"zioy_moying3_info": "死",
					"zioy_yuexiang": "月相",
					"zioy_yuexiang_info": "获得此技能时，你随机获得一个月相，每轮开始时月相会按规律进行变化，摸牌阶段，你的摸牌数根据月相增加0~2张。",
					"zioy_yuexiang2": "月相",
					"zioy_yuexiang2_info": "一轮开始时",
					"zioy_douzhuan": "斗转",
					"zioy_douzhuan_info":
						"游戏开始时，你随机指定一名角色并将7张牌置于其武将牌上，称为“星斗”。每轮游戏开始时，星斗将转移至拥有者下家。当“星斗”拥有者死亡或一轮游戏开始时你为满月且与“星斗”拥有者的座位相邻时，你获得“星斗”中的所有牌，使你月相的额外摸牌效果翻倍并使你的手牌上限+7。",
					"zioy_xingdou": "星斗",
					"zioy_xingdou_info": "闲云潭影日悠悠，物转星移几度秋",
					"zioy_shengyue": "神月",
					"zioy_shengyue_info": '限定技，出牌阶段，若"星斗"不位于你的区域内，你可以与你的下家交换座位并重复此流程直到你的上家区域内拥有"星斗"。',
					"zioy_xiaoxiang": "消香",
					"zioy_xiaoxiang_info": "限定技，一轮游戏开始时，对每个拥有〖尘〗的角色，你移去其的〖尘〗，令其翻面并令你回复一点体力。",
					"zioy_douzhuan2": "斗转",
					"zioy_douzhuan2_info": "死了",
					"zioy_nianxi": "年袭",
					"zioy_nianxi_info":
						"出牌阶段，你可以弃置一张非红色牌，视为打出一张【杀】，若此杀未造成伤害，你受到由目标角色对你造成的X点伤害(X为你因此技能受到伤害的次数+1)",
					"zioy_nianxi2": "年袭",
					"zioy_nianxi2_info": "",
					"zioy_xiantong": "显瞳",
					"zioy_xiantong_info":
						"一轮游戏开始或你的摸牌阶段结束时，你可以将一张非装备牌置于你的武将牌上，称为“瞳”。你拥有的“瞳”的数量不能超过你的体力上限。你的回合结束阶段，对于你的每张“瞳”，你视为对随机一名其他角色使用一张虚拟的同名牌。",
					"zioy_xiane": "显厄",
					"zioy_xiane_info": "回合结束阶段，若你的“瞳”达到3张，你可以依次获得你的所有“瞳”，你每以此法获得一张“瞳”，随机一名其他角色受到由你造成的2点雷电伤害。",
					"zioy_xiantong2": "显瞳",
					"zioy_xiantong2_info": "结束阶段",
					"zioy_wuya": "雾鸦",
					"zioy_wuya_info":
						"①.获得此技能时你获得2点“黑血”。②.出牌阶段，你可以失去一点体力上限并选择一名角色，你令其获得“鸦”标记。拥有“鸦”标记的角色所有技能失效。拥有“鸦”标记的角色即将受到伤害时，防止此伤害并移去“鸦”标记。拥有“鸦”标记的角色的回合开始阶段，你需将此标记转移给一名未拥有“鸦”的角色。你以此法转移“鸦”标记时，原被标记者失去一点体力。若你以此法将“鸦”标记转移到自己区域内，你失去“鸦”标记，回复X点体力，并获得X点“黑血”标记（X为此“鸦”标记转移的次数+1）",
					"zioy_sheji": "摄脊",
					"zioy_sheji_info": "当你使用【杀】指定一名角色为目标时，你可以失去一点“黑血”，然后令【杀】失效，你偷取目标角色一点体力值。",
					"zioy_puai": "瀑霭",
					"zioy_puai_info":
						"限定技，回合结束阶段，你可以移去任意点“黑血”并召唤X轮“黑雾”天气，从下轮游戏开始，持续X轮，获得以下效果：<br>①.“鸦”不被强制要求抵挡伤害 <br>②.“鸦”不被强制要求移动 <br>③.发动〖雾鸦〗时失去体力上限改为获得体力上限。 <br>④.你与其他角色的距离为负无穷大，其他角色与你的距离为无穷大，防止你成为伤害类卡牌的目标。",
					"zioy_wuya2": "雾鸦",
					"zioy_wuya2_info": "",
					"zioy_wuya3": "雾鸦",
					"zioy_wuya3_info": "",
					"zioy_wuya4": "雾鸦",
					"zioy_wuya4_info": "",
					"zioy_puai2": "瀑霭",
					"zioy_puai2_info": "",
					"zioy_puai3": "瀑霭",
					"zioy_puai3_info": "",
					"zioy_xingchi": "行持",
					"zioy_xingchi_info": "锁定技，当你使用或打出一张【杀】或【闪】时，你获得1点“正觉”。<br>当你即将造成/受到伤害时，你移去3点“正觉”并令此伤害+1/-1。",
					"zioy_xingchi2": "行持",
					"zioy_xingchi2_info": "",
					"zioy_xingchi3": "行持",
					"zioy_xingchi3_info": "",
					"zioy_cangzhen": "沧震",
					"zioy_cangzhen_info": "锁定技，每名角色限一次，你对一名角色造成伤害前，你令其翻面且此伤害+1。",
					"zioy_cangzhen2": "沧震",
					"zioy_cangzhen2_info": "",
					"zioy_shangqin": "上觐",
					"zioy_shangqin_info":
						"锁定技，①当有其他非“虚空虫”角色死亡后，你可令其复活并将武将牌替换为“虚空虫”，其体力上限与体力值为2，身份与你同阵营，操控者为你。然后你获得一点体力上限并回复一半已损失体力（向上取整）<br>②“虚空虫”死亡后，你获得其所有牌。",
					"zioy_hanshou": "颔首",
					"zioy_hanshou_info":
						"限定技，一轮游戏开始时，你可以令所有已死亡的“虚空虫”满体力复活，然后你失去X点体力上限并令所有“虚空虫”摸X张牌（X为以此法复活的“虚空虫”数量）",
					"zioy_shangqin2": "上觐",
					"zioy_shangqin2_info": "",
					"zioy_shangqin3": "上觐",
					"zioy_shangqin3_info": "",
					"zioy_longzi": "溶紫",
					"zioy_longzi_info": "",
					"zioy_yingyuan": "隐渊",
					"zioy_yingyuan_info":
						"①其他角色的回合结束阶段开始时，若你的武将牌为正面朝上，你可以将你的武将牌翻面。<br>②每轮游戏限一次，已受伤角色的回合结束阶段，若你武将牌翻面，你可以重复和你的下家交换位置直到你成为此受伤角色的上家，然后你将武将牌翻面并立即执行一个额外的回合<br>③若你武将牌背面向上，你即将受到的伤害-1。",
					"zioy_hey": "嘿！",
					"zioy_hey_info":
						"每名角色每轮限一次，回合开始与结束阶段，你选择一种颜色并观看一名角色的手牌，若其手牌中你选择颜色数量占优/不占优，你与其各摸/弃置一张牌并令其/你“光芒”标记拥有状态取反。获得此技能时你获得“光芒”。",
					"zioy_ya": "呀！",
					"zioy_ya_info": "你即将受到伤害时，若你没有“光芒”，你可以将一枚“光芒”移动至你的区域内并防止此次伤害。",
					"zioy_ha": "哈！",
					"zioy_ha_info": "你造成伤害后，你可以移动一枚“光芒”标记。",
					"zioy_guangmang": "光芒",
					"zioy_guangmang_info":
						"锁定技，①受到伤害结算后，若场上存在其他拥有“光芒”的角色，你移去“光芒”并对其中随机一名角色造成等于本次伤害值的伤害。<br>②无“光芒”角色与你的距离为无穷大。",
					"zioy_shihong": "拾虹",
					"zioy_shihong_info":
						"锁定技，摸牌阶段，未觉醒状态下你可以额外摸0~Y张牌，并弃置一名角色X张牌，觉醒状态下召唤曙光天气N回合（N为当前存活角色数，Y为N/2且向上取整，X为Y-本回合以此法额外摸牌的数量）",
					"zioy_cuiyi": "皠翊",
					"zioy_cuiyi_info":
						"回合开始阶段，未觉醒状态下令一名角色“皠翊”标记拥有状态取反，然后根据游戏轮数强化拥有“皠翊”标记的角色2项属性1级。觉醒状态下锁定所有拥有“皠翊”标记的角色强化N回合（N为当前存活角色数）",
					"zioy_shulin": "倏翷",
					"zioy_shulin_info":
						"觉醒技，每局游戏限2次。出牌阶段开始时，你可以回复所有已损失体力并进入觉醒状态。再次使用此技能时回复X点体力并将多出的回复值转化为摸牌数，然后你退出觉醒状态并失去〖煌熠〗。觉醒状态下你免疫任何异常。（X为觉醒状态持续时间）",
					"zioy_huangyi": "煌熠",
					"zioy_huangyi_info":
						"锁定技，你即将造成伤害时，未觉醒状态下你令此伤害-1并回复1点体力，然后你可以移动受伤角色区域内至多2张牌，觉醒状态下若目标角色强化锁定则解除锁定，然后倒置目标角色强化，令伤害+X(X为你以此法倒置的强化项数之和)",
					"zioy_t1": "测试",
					"zioy_t1_info": "sadadwadwaedaw",
					"zioy_shuohui": "朔回",
					"zioy_shuohui_info":
						"锁定技<br>①防止你在已损失体力时死亡，你在未损失体力时进入濒死状态。<br>②你不以此法失去体力与受到伤害均改为回复体力，不以此法回复体力均改为失去体力。<br>③除开始阶段与结束阶段，你的回合阶段执行顺序与正常顺序相反。<br>④你的手牌上限等于你已损失体力。",
					"zioy_hexuchongxiang": "鹤墟重香",
					"zioy_hexuchongxiang_info":
						"清香更何用，犹发去年枝。<br>①将你即将受到伤害/流失体力时伤害/流失值超过X-N点的部分转化为“蜃气”，触发此效果超过X+1次后令X加1并重置计数（获得此技能时令X=0，N为本回合满足〖鹤墟重香①〗的时机次数-1且不超过X）<br>②当你死亡时，若你体力值大于0则改为失去所有体力，否则：若你体力上限不为场上唯一最多或发动〖鹤墟重香②〗的次数小于2，你复活，获得N+1点体力上限，回复所有体力，移去所有“蜃气”并获得等量护甲，摸等量的牌，令X等于N-1，重置①效果计数，令你本局游戏摸牌阶段摸牌数，造成/受到伤害，失去体力的数值永久增加80%（向下取整）（N为〖鹤墟重香②〗发动的次数）<br>③你的“蜃气”数量不会超过你体力上限，获得“蜃气”时根据你是否受伤将多余的“蜃气”转换为体力值或“海市蜃楼”天气回合数。",
					"zioy_hexuchongxiang_mark": "鹤墟重香③",
					"zioy_hexuchongxiang_revive": "鹤墟重香②",
					"zioy_yuezhuiyunwei": "月坠云微",
					"zioy_yuezhuiyunwei_info":
						"梦回芳草思依依，天远雁声稀。<br>①根据当前“蜃气”的数量执行下列效果：<br>不大于50%体力上限：一名角色的回合开始阶段你失去1级防御，攻击强化，你的判定区视为被废除，你免疫任何异常状态，你的武将牌始终正面向上。<br>大于25%体力上限：当你成为其他角色使用牌的目标时，其弃置一张与此牌同名的手牌（没有则不弃）<br>大于6：当你造成超过1点伤害后，你失去1点体力上限并令其获得1点体力上限，令你本局游戏摸牌阶段摸牌数，造成/受到伤害，失去体力的数值永久增加20%（与〖鹤墟重香〗同乘区）。<br>等于体力上限：每局游戏限一次，发动〖鹤墟重香②〗或〖月坠云微②〗时重置计数。当你使用牌对指定一名角色为唯一目标时，你与其交换体力与体力上限。以此法交换的体力和体力上限不超过X点（X为你发动〖鹤墟重香③〗的次数）<br>②每回合限1次，出牌阶段，若你有“蜃气”，你可以主动发动此技能：你失去所有“蜃气”，倒置负面强化并清除所有异常状态，强制召唤等量回合的“海市蜃楼”天气，令一名角色获得等量护甲，令一名角色回复等量体力，令一名角色摸等量牌（X=你的体力上限/2且向下取整），对一名角色造成等量伤害，弃置一名角色等量牌。<br>③你永久免疫“睡眠”异常，永久免疫“海市蜃楼”的任何效果。",
					"zioy_zhumingxiangan": "烛明香暗",
					"zioy_zhumingxiangan_info": "凭阑半日独无言，依旧竹声新月似当年。<br>转换技：<br>阳：<br>>>①若你。<br>阴：<br>>>①若你。",
					"zioy_hanbosuliu": "寒波泝流",
					"zioy_hanbosuliu_info": "琼窗春断双蛾皱，回首边头。",
					"zioy_pianhongxiusao": "片红休埽",
					"zioy_pianhongxiusao_info": "啼莺散，馀花乱，寂寞画堂深院。",
					"zioy_yujin": "余烬",
					"zioy_yujin_info":
						"①获得此技能时你获得5点“烬”，若你有“烬”，限制你受到的伤害不超过1点且防止你失去体力。每次触发限伤或防止失去体力时你失去2点“烬”并在下次受到伤害后获得1点护甲。<br>②你的护甲被击破时，你回复1点体力，弃置伤害来源至多2张牌并令其受到由你造成的1点火属性伤害。",
					"zioy_xumie": "虚灭",
					"zioy_xumie_info":
						"当你造成伤害时，根据你对该受伤角色造成伤害的次数追加以下效果：<br>大于0次：其始终在你攻击范围内且不能响应你使用的【杀】。<br>大于1次：你弃置其至多2张牌。<br>大于2次：其下一次造成的伤害-1。<br>大于3次：你对其追加1点伤害，此伤害无法触发〖虚灭〗。<br>大于4次:你获得1点“烬”",
					"zioy_v07yuxie": "V07-驭械",
					"zioy_v07yuxie_info":
						"①游戏开始时你获得4点护甲并进入“驭械”状态，当你的护甲被击破时你退出“驭械”状态。<br>②“驭械”状态为你提供以下增益：<br>1.你的手牌上限+X(X为你的护甲值)。<br>2.你免疫任何异常状态。<br><br>·>当你手牌数不小于体力值时，你为暴走状态，获得以下增益：<br>1.你的进攻距离+2。<br>2.你的【杀】无法被响应。<br>3.你使用牌没有次数限制。<br>4.你使用牌时需额外弃置1张牌。<br><br>·>当你手牌数小于体力值时，你为冷却状态，获得以下增益：<br>1.你使用锦囊牌指定角色为目标时，你可以弃置目标角色至多2张牌。<br>2.你使用非装备牌结算完成后，你收回此牌。每回合限1次，获得手牌时若手牌数大于体力值则重置此计数。每张牌每回合限1次。<br>3.你即将受到超过1点的伤害时令此伤害值-1并回复你1点体力。<br><br>③非“驭械”状态下限制你受到的伤害不超过1点。<br>④进入或退出“驭械”状态时清除自身任何强化与异常状态并获得判定区内的所有牌。",
					"zioy_f42chongzai": "F42-重载",
					"zioy_f42chongzai_info":
						"出牌阶段各限1次：<br>①若你为“驭械”状态，你令所有角色受到1点无来源伤害，然后你摸3张牌，然后若你体力不为1则储存1点体力，若你拥有护甲则储存1点护甲。<br>②若你不为“驭械”状态，你可以弃置任意张花色各不相同的手牌，根据你弃置的手牌数执行以下效果：<br>不为4张：你获得等同于弃置手牌数-1枚“能量”标记。<br>4张：你获得4枚“能量”标记。<br>然后将当前体力值超过1的部分转化为等量“能量”标记，之后释放你储存的体力值。使用此技能后的每个的回合结束阶段，根据你的“能量”标记数量，执行以下效果：<br>小于体力上限：你获得1枚“能量”标记并回复1点体力。<br>不小于体力上限：你弃置所有“能量”标记，获得等量护甲并释放储存的护甲，进入“驭械”状态，若你以此法获得的护甲值大于你的体力上限，你获得1点体力上限。",
					"zioy_yuemai": "岳衇",
					"zioy_yuemai_info":
						"锁定技，①你造成伤害后，若场上没有环境，则尝试召唤“迷嶂”环境8轮，召唤成功则获得2点护甲。<br>②“迷嶂”环境中你进攻距离+1，“迷嶂”环境下你获得50%免伤。",
					"zioy_liechenyuyou_water": "列辰御佑",
					"zioy_liechenyuyou_water_info":
						"血脉技，免疫失效。<br>①令你获得“泷之神佑”。<br>②你的摸牌阶段摸牌数+2，结束阶段与一轮游戏开始时你摸1张牌.<br>③你使用【杀】对非神势力非拥有“神佑”或拥有“燚之神佑”的角色造成的伤害+1。",
					"zioy_pinghuqiuyue": "平湖秋月",
					"zioy_pinghuqiuyue_info":
						"①限制你受到的伤害最大为2点。<br>②当你流失体力后，防止你于本轮游戏流失体力。<br>③你的手牌上限-1且不小于3。<br>④你对拥有护甲的角色造成的伤害+1。<br>⑤触发限伤效果/击破一名角色护甲/令一名角色进入濒死状态时获得7点怒气，受到/造成伤害时获得等额怒气。<br>⑥你的回合结束阶段，若你有怒气，你失去1点怒气并摸2张牌。若你已进入“盛怒”状态，则额外失去N点怒气（N为你的“盛怒”层数，不足则全失去），若你的怒气不足，则失去1层“盛怒”层数（至多失去至1层）。",
					"zioy_yurangzhijian": "与浪之间",
					"zioy_yurangzhijian_info":
						"当你处于濒死阶段时或出牌阶段限一次，依次结算以下效果：<br>①消耗你所有“怒气”，减少你至多3层“盛怒”层数（最多减少至1层）。<br>②召唤5轮“细雨”天气，获得5回合全异常免疫。<br>③令Y=M-1.5X+N/3（向下取整），若Y大于零则回复Y点体力，否则弃置-Y张牌（X为本局游戏〖与浪之间〗累计使用次数，N为本次消耗怒气值，M为本次消耗“盛怒”层数）。<br>④若累计记录消耗怒气数+N达到10点则进入盛怒状态并获得1层“盛怒”层数，此效果一局游戏限1次。<br>⑤盛怒状态下使你下一次受到的伤害无效。<br>⑥记录N/3点消耗怒气数并摸N（至多为7）张牌。<br>盛怒状态：盛怒状态最多达到7层，盛怒状态中每次使用伤害类型牌时获得1层“盛怒”层数，盛怒状态为你提供以下增益（X为“盛怒”层数）：<br>>①你出牌阶段可以多使用X*0.43（向下取整）张【杀】<br>>②你使用【杀】时对方需多使用X*0.43（向下取整且至少为1）张【闪】<br>>③你造成的伤害+X*0.58（向下取整）<br>>④造成伤害时你回复0.05*X*伤害值（向下取整）点体力值并弃置受伤角色0.15*X*伤害值（向下取整）张牌。<br>>⑤你装备区的牌无法被弃置。<br>>⑥当你没有装备武器时，你的攻击范围为无穷大。",
					"zioy_liechenyuyou_fire": "列辰御佑",
					"zioy_liechenyuyou_fire_info":
						"血脉技，免疫失效。<br>①令你获得“燚之神佑”。<br>②你的摸牌阶段摸牌数+2，结束阶段与一轮游戏开始时你摸1张牌.<br>③你使用【杀】对非神势力非拥有“神佑”或拥有“苏之神佑”的角色造成的伤害+1。",
					"zioy_zhuxingwuchang": "诸行无常",
					"zioy_zhuxingwuchang_info":
						"锁定技，若场上为天气，你使用的牌视为火属性且造成伤害后弃置受伤角色1张牌；若场上为环境，你的牌不可被响应；若你没有“无瞋”：造成伤害后你失去1点体力(若当前体力值为1则不失去)然后回复2点体力，“风林火山”环境下提升至4点，若当前为奇数轮则召唤3轮“热浪”天气，否则召唤3轮“风林火山”环境。",
					"zioy_zhufashengmie": "诸法生灭",
					"zioy_zhufashengmie_info": "一局游戏限一次，你死亡时，取消之，然后你令你的体力值等于体力上限并锁定体力直到你的出牌阶段结束。",
					"zioy_yongyeqingxiao": "永夜清宵",
					"zioy_yongyeqingxiao_info":
						"①获得此技能时你获得5个“无瞋”标记。若你有“无瞋”，你使用牌结算后需弃置1张牌（没有则不弃）并失去1个“无瞋”。<br>②出牌阶段，若你有“无瞋”标记且不为5个，你可以将“无瞋”补至5个，记补充数量为X，你摸X*1.25（向下取整）张牌，回复X/2（向下取整）点体力（回复体力效果每回合限1次），获得X轮异常免疫，若当前为奇数轮则召唤X轮“热浪”天气，否则召唤X轮“风林火山”环境。<br>③若你没有“无瞋”，你废弃你的判定区，永久获得全异常免疫，进攻距离+4，出牌阶段可以额外使用1张【杀】。",
					"zioy_nongying": "弄影",
					"zioy_nongying_info":
						"起舞弄清影，何似在人间。<br>①你手牌中的【闪】均视为【杀】，当你需要使用或打出【闪】时，你可以视为打出一张【闪】。<br>②每当你发动〖弄影①〗或将【闪】视为【杀】使用或打出时，若你已受伤，你失去1点体力上限并回复1点体力，否则你获得1点体力上限并失去1点体力。",
					"zioy_chanjuan": "婵娟",
					"zioy_chanjuan_info": "但愿人长久，千里共婵娟。<br>你回复体力后，可令任意名已受伤的其他角色回复等量体力。",
					"zioy_leimingqiangu": "雷鸣千古",
					"zioy_leimingqiangu_info":
						'①记你的体力上限+你拥有的“雷殊”数量为你的"尾数"，若你的"尾数"小于9，每次使用进攻类型的牌或即将受到伤害时你获得1点体力上限并回复1点体力值。<br>②你即将受到的伤害不超过尾数/3(向下取整)，你受到时伤害获得尾数*5枚“鸣雷”标记，当“鸣雷”标记数量达到200枚时你移去200枚“鸣雷”标记并回复1点体力值，若尾数达到9则使你下一次造成伤害后对受伤角色造成1点不会触发此技能③效果的雷属性伤害。<br>③当你尾数达到9时，你为伤害来源的任何伤害数值+2，你造成任何伤害后获得伤害值*尾数*3点“鸣雷”标记。<br>④每个回合开始阶段将你超过9的体力上限部分与全部护甲转换为体力。<br>⑤你的摸牌阶段摸牌数基数为你的尾数/1.5(向下取整)。',
					"zioy_zhoumingchuanxuan": "骤明穿玄",
					"zioy_zhoumingchuanxuan_info":
						"①你的进攻距离+X，使用牌（延时锦囊除外）可多指定X名角色为目标（X为你的尾数/3且向下取整）<br>②若你使用牌指定唯一其他角色为目标且你的体力上限大于1，你失去1点体力上限并获得1枚“雷殊”标记，然后清除场上非天气的全局状态<br>③若你有至少2枚“雷殊”，你可以主动发动此技能，移去所有“雷殊”并选择X名其他角色，你对其造成X点雷属性伤害（X为你移去“雷殊”的数量/1.5且向下取整）",
					"zioy_riyuexingkong": "日月行空",
					"zioy_riyuexingkong_info":
						"你加入游戏时不加入本角色，改为加入“耀阳”与“辉月”。“耀阳”与“辉月”共享进攻距离与范围计算，若其中一名角色即将死亡且另一名角色未处于休整状态，你令其休整至其下一回合开始时，否则令“耀阳”与“辉月”死亡。",
					"zioy_jisuishengjin": "击髓生津",
					"zioy_jisuishengjin_info":
						"<br>①出牌阶段，你可以对自己造成1点伤害。<br>②当你受到1点伤害时，你可以观看牌堆顶上的8张牌并获得其中至多四张牌，将剩余的牌按原顺序放回牌堆顶。",
					"zioy_yaoyangsong": "耀阳颂",
					"zioy_yaoyangsong_info": "占位。",
					"zioy_huiyueyao": "辉月谣",
					"zioy_huiyueyao_info": "占位。",
					"zioy_biubiubiu": "Biu! ",
					"zioy_biubiubiu_info":
						"①一名未拥有“泡泡”的角色使用非转化的普通锦囊牌结算后，你将此牌置于其武将牌上，称为“泡泡”。<br>②当你成为/使一名角色成为一张牌的唯一目标时，你选择一名拥有“泡泡”的角色，弃置其“泡泡”并无视距离与时机尝试执行其中内容，然后与其交换座位并令其代替你进行此牌后续结算，若你有“泡泡”则令其获得之。",
					"zioy_shoufa": "手法",
					"zioy_shoufa_info": "当你即将造成伤害时，你可以表演计算1+1，若你计算出正确答案，此伤害等于999。",
					"zioy_liechenyuyou_wood": "列辰御佑",
					"zioy_liechenyuyou_wood_info":
						"血脉技，免疫失效。<br>①令你获得“苏之神佑”。<br>②你的摸牌阶段摸牌数+2，结束阶段与一轮游戏开始时你摸1张牌.<br>③你使用【杀】对非神势力非拥有“神佑”或拥有“泷之神佑”的角色造成的伤害+1。",
					"zioy_zhifenghuifang": "栉风绘芳",
					"zioy_zhifenghuifang_info":
						"<br>①出牌阶段限1次，若为奇数轮且场上不为“芬芳”则尝试召唤3轮“芬芳”，若为偶数轮且场上为天气，则强制召唤3轮“森罗万象”。然后若当前场上存在天气，则你可以选择1名角色，若其没有“华予”，你令其失去所有护甲，回复等同于失去护甲量+1点体力，摸3张牌。然后你令其获得/重置“华予”。若当前场上存在环境，则你可以选择则你可以选择1名角色，若其没有“篁蔓”，你令其失去体力至1点并获得等量的护甲，弃置手牌至1张牌。然后你令其获得“篁蔓”。一名角色获得“华予”/“篁蔓”时会自动失去“篁蔓”/“华予”。<br>②一名角色的回合开始时，若你未拥有“华予”，你获得“华予”。<br>·“华予”状态下使拥有者获得以下效果:<br>>>①你获得全异常免疫。<br>>>②受到伤害后，你有100*0.75^(N+1)%几率回复1点体力(N为此效果触发次数，每次获得“华予”时重置为0)<br>>>③当你即将受到伤害时，若此伤害值不小于你当前体力值，限制你受到的伤害不超过1直到任意伤害结算完成。<br>>>④防止你的手牌于回合外被弃置。<br>>>⑤当你受到伤害后，伤害来源获得“篁蔓”。<br>·“篁蔓”状态下使拥有者获得以下效果:<br>>>①你计算与其他角色的距离+2。<br>>>②当你造成伤害后，你弃置等同于你本回合造成过伤害值总和数量的牌。<br>>>③当你造成伤害后，受伤角色获得“华予”。",
					"zioy_liwuyaomiao": "鹂舞要眇",
					"zioy_liwuyaomiao_info":
						"<br>①一轮游戏开始时，若当前轮数是你当前体力的整数倍，你回复1点体力。<br>②当你于一名角色的出牌阶段外受到伤害后，当前回合角色改为你。<br>③废除你的判定区直到第二轮游戏开始时。",
					"zioy_jietian": "嗟天",
					"zioy_jietian_info": "锁定技，你的回合开始时，若你的护甲小于你的体力，你对自己造成1点伤害，然后获得1点护甲",
					"zioy_yunshuang": "陨霜",
					"zioy_yunshuang_info": "每轮游戏限2次，一名角色即将造成伤害时，你可以防止此伤害，改为造成伤害的角色弃置受伤角色至多2张牌。",
					"zioy_helu": "吓赂",
					"zioy_helu_info":
						"当你使用牌指定一名其他角色为目标时，你可以选择一张手牌，其获得此牌并无法响应你本次对其使用的牌。其回合结束阶段，你摸2X张牌并令X=0（X为其通过〖吓赂〗从你的区域内获得的牌的数量）。",
					"zioy_shimeng": "逝梦",
					"zioy_shimeng_info":
						"你拥有以下效果，当一名角色死亡或一轮游戏开始时，你按顺序移去你拥有的序号最小的效果。<br>①你使用的牌无法被响应。<br>②你每轮第一次造成的伤害+X。（X=3-游戏轮数）<br>③你的进攻距离+X。（X=3-游戏轮数）<br>④你使用的牌可以额外指定X名角色为目标。（X=3-游戏轮数）<br>⑤你获得你杀死的角色区域内的所有牌。<br>⑥当你造成伤害后，你回复1点体力。<br>⑦当你使用牌时，你可以视为使用一张与你上一次使用的非虚拟非装备牌牌名相同的无属性虚拟牌。",
					"zioy_heimeng": "黑梦",
					"zioy_heimeng_info": "隐匿技，锁定技。当你登场后，你获得你判定区内的牌。",
					"zioy_zhu": "烛",
					"zioy_zhu_info":
						"锁定技。<br>①当你使用或打出牌时，你失去2点体力上限（至多失去至4点），然后若你的体力因此发生变化，你从牌堆中获得1张与你使用/打出的牌类型相同，牌名不同的牌。<br>②当你受到伤害/失去体力时，你失去4点体力上限（至多失去至2点），然后若你的体力因此发生变化，你恢复一个已使用的“彼岸式”。",
					"zioy_bian1": "彼岸式·Ⅰ",
					"zioy_bian1_info": "限定技，回合结束时，你可以令一名其他角色摸2张牌并展示其所有手牌，然后若其手牌中包含4种花色，你进行一个额外的回合。",
					"zioy_bian2": "彼岸式·Ⅱ",
					"zioy_bian2_info": "限定技，当你造成伤害后，你可以与受伤角色交换手牌，然后你与其各选择两张区域内牌（不足则全选）并令一名角色获得之。",
					"zioy_bian3": "彼岸式·Ⅲ",
					"zioy_bian3_info": "限定技，出牌阶段，你可以重复展示牌堆顶第一张牌直至已展示4种花色，然后你可以使用其中至多2张牌。",
					"zioy_bian4": "彼岸式·Ⅳ",
					"zioy_bian4_info":
						"限定技，回合开始阶段，你可以与一名角色议事，若结果为：红色，你与其各摸2张牌；黑色：你与其各展示并使用牌堆顶的4张牌；失败：你与其各失去2点体力。",
					"zioy_gui": "归",
					"zioy_gui_info":
						"①当你发动“彼岸式”时，你立即记录你当前手牌，体力，体力上限，“彼岸式”已发动状态。<br>②锁定技。一名角色的回合结束时，若你：1.体力值不为场上唯一最多；2.手牌中花色数不为场上唯一最多；3.此技能①效果有记录内容，则你可以将你的手牌，体力，体力上限，“彼岸式”已发动状态调整至此技能①效果的最早记录相同并删除此次记录。",
					"zioy_junling": "君临",
					"zioy_junling_info":
						"隐匿技，锁定技。当你登场时，若当前回合角色不为你则终止一切结算，当前回合结束。然后你增加3点体力上限，摸3张牌；其他角色增加2点体力上限，回复2点体力，摸4张牌，并将武将牌翻至背面朝上。",
					"zioy_junming": "君命",
					"zioy_junming_info":
						"一轮游戏开始时，若场上有受伤角色，你可以令场上已损失体力值最多的所有角色失去1点体力上限（最多失去至1点）并将体力值回复至体力上限，然后你将你的护甲值调整为N并摸N张牌。（N为技能结算前场上角色已损失体力值的最大值）",
					"zioy_junci": "君赐",
					"zioy_junci_info":
						"每回合限1次，当一名角色对一名其他角色造成伤害时，你可以将你或受伤角色/伤害来源区域内的一张牌移动至伤害来源/受伤角色区域内的相应位置，若此牌被移入手牌区且时机合法，其须选择是否立即使用此牌，若时机不合法或该角色选择不立即使用且该角色不为你，你可以对其造成1点伤害。",
					"zioy_junnu": "君怒",
					"zioy_junnu_info":
						"当你即将受到/造成伤害时，你可以展示你的所有手牌，若其中红色牌数量不小于黑色牌，你令此伤害+1且造成伤害的角色弃置等同于你手牌数的牌（不足则全弃）；若其中黑色牌数量不小于红色牌，你令此伤害+1且受到伤害的角色弃置等同于你手牌数的牌（不足则全弃）。",
					"zioy_junyun": "君陨",
					"zioy_junyun_info": "限定技。当你即将死亡时，你可以对任意名角色造成至多共X点无属性伤害。（X为你已损失体力/2且向下取整）",
					"zioy_zhaocai": "招财",
					"zioy_zhaocai_info":
						"摸牌阶段开始时，你可选择一名角色，你令其将手牌摸至X张，若该角色不为你，你摸等量的牌。以此法获得的牌不计入手牌上限。你可将你以此法获得的牌当作任意基本牌使用或打出。（X为其体力上限）",
					"zioy_jinbao": "进宝",
					"zioy_jinbao_info":
						"出牌阶段限1次，你可以与一名角色拼点，若你赢，你令一名角色获得基本牌，锦囊牌，装备牌各一张。若你没赢，你可令该角色获得你手牌区，装备区的牌各一张。你可将本次拼点双方的牌交给一名手牌数不多于你的角色。",
					"zioy_yuansi": "怨肆",
					"zioy_yuansi_info": "当你造成/受到伤害时，受伤角色失去1点体力并将其武将牌翻面。若场上没有与你相同身份的其他角色，你可以选择不发动此技能。",
					"zioy_yuanshen": "怨晟",
					"zioy_yuanshen_info":
						"每名角色限1次。一名角色进入濒死状态时，若场上没有与你相同身份的其他角色，你获得1点体力上限，将体力回复至体力上限，摸等同于体力上限的牌，否则其死亡。若进入濒死状态的角色不为你，你可以选择不发动此技能。",
					zioy_que: "袪恶",
					zioy_que_info:
						"锁定技。<br>①你即将失去体力时，取消之，改为受到1点无来源伤害。<br>②每回合限1次，当你造成/受到伤害后，你回复1点体力并摸1张牌。<br>③当你未受伤时，你使用牌无距离/次数限制，其他角色不能响应你使用的牌，你使用【杀】造成的伤害+X（X为你当前体力-1）。<br>④当你对其他角色使用一张牌时，若你未受伤，此牌结算后你获得X点护甲并将你的体力修改为1点（X为你当前体力-1）。",
					zioy_fouzhiyu: "否知域",
					zioy_fouzhiyu_info: "锁定技。防止你回复体力，防止你体力流失。若[你拥有护盾]异或[游戏轮数为奇数]为1，防止你受到伤害。",
					zioy_ningguxi: "宁古息",
					zioy_ningguxi_info: "回合开始阶段，你可对一名角色造成X点伤害（X为游戏轮数/3且向上取整）。",
					zioy_juhun: "聚魂",
					zioy_juhun_info:
						"一轮游戏开始时，你可选择至多X名角色，你依次询问该角色是否令你获得其死亡前的体力，护甲，体力上限，技能并令其死亡（X为2-因你以此法选择“是”的角色）。",
				}
			}),
			intro: "??????????????????????????<br>拒绝规范描述",
			author: "喵喵",
			diskURL: "",
			forumURL: "",
			version: "23.08.13.01.39"
		},
		files: {
			"character": [
				"zioy_gaiying.jpg",
				"test.jpg",
				"zioy_xixuegui.jpg",
				"zioy_shuijinxiezi.jpg",
				"zioy_zhigaotian.jpg",
				"zioy_renturtle.jpg",
				"zioy_yinlong.jpg",
				"zioy_chuxi.jpg",
				"zioy_senjianmeng.jpg",
				"zioy_xuanhu.jpg",
				"zioy_yilong.jpg",
				"zioy_dreamaker.jpg",
				"zioy_drugdoctor.jpg",
				"zioy_huajian.jpg",
				"zioy_shenxianxiang.jpg",
				"zioy_xielingyun.jpg",
				"zioy_peiki.jpg",
				"zioy_sose.jpg",
				"zioy_pqsj.jpg",
				"zioy_nianshou.jpg",
				"zioy_jinu.jpg",
				"zioy_diana.jpg",
				"zioy_xiaozhenhe.jpg",
				"zioy_lanchesite.jpg",
				"zioy_badun.jpg",
				"zioy_guanghan.jpg",
				"zioy_xingjun.jpg",
				"zioy_purangsigai.jpg",
				"zioy_xiyueying.jpg",
				"zioy_bidu.jpg",
				"zioy_osiris.jpg",
				"zioy_titan.jpg",
				"zioy_yenglish.jpg",
				"zioy_alps.jpg",
				"zioy_nemesis.jpg",
				"zioy_bailu.jpg",
				"zioy_xukongchong.jpg",
				"zioy_nike.jpg",
				"zioy_muxi.jpg",
				"zioy_morana.jpg",
				"zioy_b7chuhaoji.jpg",
				"zioy_kailuer.jpg",
				"zioy_dacongming.jpg"
			],
			"card": ["zioy_yueguang.jpg"],
			"skill": [],
			"audio": []
		}
	};
});
