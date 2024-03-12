game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "超界突破",
		content: function (config, pack) {
			if (lib.rank) {
				//废将
				lib.rank.rarity.junk.addArray([])
				//精品
				lib.rank.rarity.rare.addArray([])
				//史诗
				lib.rank.rarity.epic.addArray([])
				//传说
				lib.rank.rarity.legend.addArray(["sup_lvbu"])
			}
		},
		precontent: function () {},
		help: {},
		config: {},
		package: {
			character: {
				character: {
					"sup_lvbu": ["male", "qun", "3/5/1", ["sup_wushuang", "sup_liyu", "wangwu", "zioy_tianwei"], []],
					"sup_zhangjiao": ["male", "qun", "1/2/1", ["supleiji", "supguidao", "xinhuangtian"], ["zhu"]],
					"sup_zhangliao": ["male", "wei", "1/7/3", ["suptuxi", "sup_jingti"], []],
					"sup_caocao": ["male", "wei", 4, ["supjianxiong", "yeba", "rehujia"], ["zhu"]],
					"sup_zhugeliang": ["male", "shu", 3, ["supguanxing", "supkongcheng"], []],
					"sup_liubei": ["male", "shu", 5, ["suprende", "taoyuan", "rejijiang"], ["zhu"]],
					"sup_sunquan": ["male", "wu", 5, ["supzhiheng", "supjiuyuan"], ["zhu"]],
					"sup_zhouyu": ["male", "wu", "4/4/2", ["supyingzi", "supfanjian"], []],
					"sup_zhenji": ["female", "wei", "3/6", ["sup_luoshen", "sup_qinguo"], []],
					"sup_lvmeng": ["male", "wu", "1/1/1", ["sup_keji", "sup_qinxue", "sup_botu"], []],
					"sup_sunce": ["male", "wu", 4, ["jiang", "sup_hunzi", "olzhiba"], ["zhu"]],
					"sup_guanyu": ["male", "shu", 5, ["sup_wusheng", "sup_yijue", "sup_zhoushui"], []],
					"sup_zhangfei": ["male", "shu", 5, ["sup_paoxiao"], []],
					"sup_xuzhu": ["male", "wei", 4, ["sup_luoyi"], []],
					"sup_yujin": ["male", "wei", 4, ["sup_dushuai"], []],
					"sup_huaxiong": ["male", "qun", 10, ["sup_yaowu", "sup_kuangyong", "shizhan"], []],
					"sup_huangyueying": ["female", "shu", 3, ["sup_jizhi", "sup_qicai"], []],
					"sup_ganning": ["male", "wu", 4, ["sup_qixi", "sup_fenwei"], []],
					"sup_gongsunzan": ["male", "qun", 5, ["sup_yicong", "sup_qiaomeng"], []],
					"sup_maliang": ["male", "shu", 3, ["sup_zishu", "sup_yingyuan"], []],
					"sup_zhangchunhua": ["female", "wei", "2/3", ["sup_jueqing", "sup_shangshi"], []],
					"sup_sunluyu": ["female", "wu", 4, ["sup_meibu", "sup_mumu", "sup_zhonghui"], []],
					"sup_yuanshao": ["male", "qun", "3/3/3", ["sup_luanji", "sup_xueyi"], ["zhu", "des:WC,OP!"]],
					"sup_dongzhuo": ["male", "qun", "9/19", ["sup_jiuchi", "sup_roulin", "sup_benghuai", "sup_baonue"], []]
				},
				translate: {
					"sup_lvbu": "超吕布",
					"sup_zhangjiao": "超张角",
					"sup_zhangliao": "超张辽",
					"sup_caocao": "超曹操",
					"sup_zhugeliang": "超诸葛亮",
					"sup_liubei": "超刘备",
					"sup_sunquan": "超孙权",
					"sup_zhouyu": "超周瑜",
					"sup_zhenji": "超甄宓",
					"sup_lvmeng": "超吕蒙",
					"sup_sunce": "超孙策",
					"sup_guanyu": "超关羽",
					"sup_zhangfei": "超张飞",
					"sup_xuzhu": "超许诸",
					"sup_yujin": "超于禁",
					"sup_huaxiong": "超华雄",
					"sup_huangyueying": "超黄月英",
					"sup_ganning": "超甘宁",
					"sup_gongsunzan": "超公孙瓒",
					"sup_maliang": "超马良",
					"sup_zhangchunhua": "超张春华",
					"sup_sunluyu": "超孙鲁育",
					"sup_yuanshao": "超袁绍",
					"sup_dongzhuo": "超董卓"
				}
			},
			card: {
				card: {
					"sup_ganning_guohe": {
						audio: true,
						fullskin: true,
						type: "trick",
						enable: true,
						selectTarget: 1,
						postAi: function (targets) {
							return targets.length == 1 && targets[0].countCards("j")
						},
						filterTarget: function (card, player, target) {
							if (player == target) return false
							return target.countDiscardableCards(player, get.is.single() ? "he" : "hej")
						},
						"yingbian_prompt": "当你使用此牌选择目标后，你可为此牌增加一个目标",
						"yingbian_tags": ["add"],
						yingbian: function (event) {
							event.yingbian_addTarget = true
						},
						content: function () {
							"step 0"

							player.discardPlayerCard(target.countCards("hej"), "hej", target, true)
							event.finish()
						},
						ai: {
							basic: {
								order: 9,
								useful: 5,
								value: 5
							},
							yingbian: function (card, player, targets, viewer) {
								if (get.attitude(viewer, player) <= 0) return 0
								if (
									game.hasPlayer(function (current) {
										return !targets.contains(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0
									})
								)
									return 6
								return 0
							},
							result: {
								target: function (player, target) {
									var att = get.attitude(player, target)
									var nh = target.countCards("h")
									if (att > 0) {
										if (
											target.countCards("j", function (card) {
												var cardj = card.viewAs ? { name: card.viewAs } : card
												return get.effect(target, cardj, target, player) < 0
											}) > 0
										)
											return 3
										if (target.getEquip("baiyin") && target.isDamaged() && get.recoverEffect(target, player, player) > 0) {
											if (target.hp == 1 && !target.hujia) return 1.6
										}
										if (
											target.countCards("e", function (card) {
												if (get.position(card) == "e") return get.value(card, target) < 0
											}) > 0
										)
											return 1
									}
									var es = target.getCards("e")
									var noe = es.length == 0 || target.hasSkillTag("noe")
									var noe2 =
										es.filter(function (esx) {
											return get.value(esx, target) > 0
										}).length == 0
									var noh = nh == 0 || target.hasSkillTag("noh")
									if (noh && (noe || noe2)) return 0
									if (att <= 0 && !target.countCards("he")) return 1.5
									return -1.5
								}
							},
							tag: {
								loseCard: 1,
								discard: 1
							}
						}
					}
				},
				translate: {
					"sup_ganning_guohe": "过河拆桥",
					"sup_ganning_guohe_info": "出牌阶段，对区域里有牌的一名其他角色使用。你弃置其区域里的一张牌。"
				},
				list: []
			},
			skill: {
				skill: {
					supfanjian: {
						audio: "ext:超界突破:2",
						enable: "phaseUse",
						usable: 2,
						filter: function (event, player) {
							return player.countCards("h") > 0
						},
						filterTarget: function (card, player, target) {
							return player != target
						},
						filterCard: true,
						check: function (card) {
							return 8 - get.value(card)
						},
						discard: false,
						lose: false,
						delay: false,
						content: function () {
							"step 0"
							target.storage.refanjian = cards[0]
							//target.gain(cards[0],player,'give');
							"step 1"
							var suit = get.suit(target.storage.refanjian)
							if (!target.countCards("h")) event._result = { control: "refanjian_hp" }
							else
								target.chooseControl("refanjian_card", "refanjian_hp").ai = function (event, player) {
									var cards = player.getCards("he", { suit: get.suit(player.storage.refanjian) })
									if (cards.length == 1) return 0
									if (cards.length >= 2) {
										for (var i = 0; i < cards.length; i++) {
											if (get.tag(cards[i], "save")) return 1
										}
									}
									if (player.hp == 1) return 0
									for (var i = 0; i < cards.length; i++) {
										if (get.value(cards[i]) >= 8) return 1
									}
									if (cards.length > 2 && player.hp > 2) return 1
									if (cards.length > 3) return 1
									return 0
								}
							"step 2"
							if (result.control == "refanjian_card") {
								target.showHandcards()
							} else {
								target.loseHp()
								event.finish()
							}
							"step 3"
							var suit = get.suit(target.storage.refanjian)
							target.discard(
								target.getCards("he", function (i) {
									return get.suit(i) != suit && lib.filter.cardDiscardable(i, target, "refanjian")
								})
							)
							delete target.storage.refanjian
						},
						ai: {
							order: 9,
							result: {
								target: function (player, target) {
									return -target.countCards("he") - (player.countCards("h", "du") ? 1 : 0)
								}
							},
							threaten: 2
						}
					},
					yeba: {
						trigger: {
							source: "damageBegin1"
						},
						filter: function (event, player) {
							return lib.skill.yeba.getInfo(player)
						},
						check: function (event, player) {
							return get.attitude(player, event.source) > 0 && get.attitude(player, event.player) < 0
						},
						mark: true,
						init: function (player) {
							player.storage.hjianxiong = 0
							player.addMark("yeba")
							player.removeMark("yeba")
							//player.addSkillBlocker('yeba');
						},
						getInfo: function (player) {
							return player.storage.hjianxiong
						},
						intro: {
							content: "已记录#次〖奸雄〗"
						},
						forced: false,
						content: function () {
							trigger.num += player.storage.hjianxiong
							var i = player.storage.hjianxiong
							player.removeMark("yeba", player.storage.hjianxiong)
							player.storage.hjianxiong = 0
							var nd = 0
							var nr = 0
							while (i > 0) {
								i = i - 1
								nd++;
								if ([true, false].randomGet()) {
									nr++;
								}
							}
							if(nd > 0)player.draw(nd)
							if(nr > 0)player.recover(nr)
							//player.addSkillBlocker(event.name);
						},
						ai: {
							damageBonus: true
						}
					},
					supjianxiong: {
						audio: "rejianxiong",
						audioname: ["shen_caopi"],
						trigger: {
							player: "damageEnd"
						},
						init: function (player) {
							player.storage.hjianxiong = 0
						},
						content: function () {
							"step 0"
							event.flag = true;
							event.num = trigger.num;
							"step 1"
							"step 2"
							if (get.itemtype(trigger.cards) == "cards" && get.position(trigger.cards[0], true) == "o" && event.flag) {
								player.gain(trigger.cards, "gain2")
							} else player.draw()
							player.draw("nodelay")
							player.addMark("yeba")
							player.storage.hjianxiong += 1
							//player.removeSkillBlocker('yeba');
							"step 3"
							event.num -= 1;
							event.flag = false;
							if(event.num > 0){
								event.goto(2)
							}
						},
						ai: {
							maixie: true,
							"maixie_hp": true,
							effect: {
								target: function (card, player, target) {
									if (player.hasSkillTag("jueqing", false, target)) return [1, -1]
									if (get.tag(card, "damage") && player != target) {
										var cards = card.cards,
											evt = _status.event
										if (evt.player == target && card.name == "damage" && evt.getParent().type == "card") cards = evt.getParent().cards.filterInD()
										if (target.hp <= 1) return
										if (get.itemtype(cards) != "cards") return
										for (var i of cards) {
											if (get.name(i, target) == "tao") return [1, 5]
										}
										if (get.value(cards, target) >= 7 + target.getDamagedHp()) return [1, 3]
										return [1, 0.6]
									}
								}
							}
						}
					},
					supkongcheng: {
						mod: {
							targetEnabled: function (card, player, target, now) {
								if (target.countCards("h") == 0) {
									if (card.name != "wanjian") return false
								}
							}
						},
						group: "kongcheng1",
						audio: "kongcheng1",
						audioname: ["re_zhugeliang"],
						ai: {
							noh: true,
							skillTagFilter: function (player, tag) {
								if (tag == "noh") {
									if (player.countCards("h") != 1) return false
								}
							}
						}
					},
					supguanxing: {
						audio: "guanxing",
						audioname: ["jiangwei", "re_jiangwei", "re_zhugeliang", "gexuan", "ol_jiangwei"],
						frequent: true,
						trigger: {
							player: ["phaseZhunbeiBegin", "phaseJieshuBegin"]
						},
						filter: function (event, player, name) {
							return true
						},
						content: function () {
							"step 0"
							var player = event.player
							if (player.isUnderControl()) game.modeSwapPlayer(player)

							var cards = get.cards(7)
							var guanXing = decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length)
							game.broadcast(
								function (player, cards) {
									if (!window.decadeUI) return
									decadeUI.content.chooseGuanXing(player, cards, cards.length, null, cards.length)
								},
								player,
								cards
							)

							event.switchToAuto = function () {
								var cheats = []
								var cards = guanXing.cards[0].concat()
								var judges

								var next = player.getNext()
								var friend = player
								if (event.triggername == "phaseJieshuBegin") {
									friend = next
									judges = friend.node.judges.childNodes
									if (get.attitude(player, friend) < 0) friend = null
								} else {
									judges = player.node.judges.childNodes
								}

								if (judges.length) {
									cheats = decadeUI.get.cheatJudgeCards(cards, judges, friend != null)
								}

								if (cards.length && cheats.length == judges.length) {
									for (var i = 0; i >= 0 && i < cards.length; i++) {
										if (friend) {
											if (get.value(cards[i], friend) >= 5) {
												cheats.push(cards[i])
												cards.splice(i, 1)
											}
										} else {
											if (get.value(cards[i], next) < 4) {
												cheats.push(cards[i])
												cards.splice(i, 1)
											}
										}
									}
								}

								var time = 50
								for (var i = 0; i < cheats.length; i++) {
									setTimeout(
										function (card, index, finished) {
											guanXing.move(card, index, 0)
											if (finished) guanXing.finishTime(100)
										},
										time,
										cheats[i],
										i,
										i >= cheats.length - 1 && cards.length == 0
									)
									time += 50
								}

								for (var i = 0; i < cards.length; i++) {
									setTimeout(
										function (card, index, finished) {
											guanXing.move(card, index, 1)
											if (finished) guanXing.finishTime(100)
										},
										time,
										cards[i],
										i,
										i >= cards.length - 1
									)
									time += 50
								}
							}

							if (event.isOnline()) {
								// 判断其他玩家是否有十周年UI，否则直接给他结束，不知道有没有效果
								event.player.send(function () {
									if (!window.decadeUI && decadeUI.eventDialog) _status.event.finish()
								}, event.player)

								// 等待其他玩家操作
								event.player.wait()
								// 暂停主机端游戏
								decadeUI.game.wait()
							} else if (!event.isMine()) {
								event.switchToAuto()
								/*
            注释说明
            var guanXing = decadeUI.content.chooseGuanXing(
                控制观星的玩家,                      // 必选
                [顶部初始化的牌],                // 必选，可为null，但底部不能为null
                顶部允许控制的牌数范围,            // 可选，不填根据初始化的牌数量
                [底部初始化的牌],                // 必选，可为null，但顶部不能为null
                底部允许控制的牌数范围,            // 可选，不填根据初始化的牌数量
                第一个参数的玩家是否可见);          // 可选，不设置则根据控制观星的玩家来显示
            
            // undefined 均为可设置，其他为只读或调用
            var properties = {
                caption: undefined,            // 设置标题
                header1: undefined,            // 牌堆顶的文字
                header2: undefined,            // 牌堆底的文字
                cards: [[],[]],                // 获取当前观星的牌，不要瞎改
                callback: undefined,        // 回调函数，返回 true 表示可以点击【确认】按钮，例：guanXing.callback = function(){ return guanXing.cards[1].length == 1; }
                                            // 注意：此值一旦设置，观星finish后不会自己置顶牌堆顶和牌堆底，需要自行实现
                infohide: undefined,        // 设置上面第1个参数的玩家是否可见观星的牌
                confirmed: undefined,        // 是否按下确认按钮
                doubleSwitch: undefined,    // 双击切换牌
                finishTime:function(time),    // 指定的毫秒数后完成观星
                finish:function(),            // 观星完成，在下一个step 中，可以通过 event.cards1 与 event.cards2 访问观星后的牌
                swap:function(s, t),        // 交换观星中的两个牌
                switch:function(card),       // 将观星中的牌切换到另一方
                move:function(card, index, moveDown)    // 移动观星的牌到指定的一方位置
            }
            */
							}
							"step 1"
							if (event.triggername == "phaseZhunbeiBegin" && event.num1 == 0) player.addTempSkill("reguanxing_on")
							player.popup(get.cnNumber(event.num1) + "上" + get.cnNumber(event.num2) + "下")
							game.log(player, "将" + get.cnNumber(event.num1) + "张牌置于牌堆顶，" + get.cnNumber(event.num2) + "张牌置于牌堆底")
							game.updateRoundNumber()
						},
						subSkill: {
							on: {
								sub: true
							}
						}
					},
					taoyuan: {
						skillAnimation: true,
						animationColor: "wood",
						audio: "ext:超界突破:2",
						juexingji: true,
						derivation: ["paoxiao", "wusheng"],
						unique: true,
						trigger: {
							player: "phaseZhunbeiBegin"
						},
						filter: function (event, player) {
							return player.hp <= 2 && !player.storage.hunzi
						},
						forced: true,
						content: function () {
							player.loseMaxHp()
							player.recover()
							player.draw(3)
							player.addSkill("wusheng")
							player.addSkill("paoxiao")
							player.awakenSkill(event.name)
							player.storage[event.name] = true
						},
						ai: {
							threaten: function (player, target) {
								if (target.hp <= 2) return 2
								return 0.5
							},
							maixie: true,
							effect: {
								target: function (card, player, target) {
									if (!target.hasFriend()) return
									if (
										get.tag(card, "damage") == 1 &&
										target.hp == 2 &&
										!target.isTurnedOver() &&
										_status.currentPhase != target &&
										get.distance(_status.currentPhase, target, "absolute") <= 3
									)
										return [0.5, 1]
								}
							}
						}
					},
					suprende: {
						audio: "ext:超界突破:2",
						audioname: ["gz_jun_liubei", "shen_caopi"],
						enable: "phaseUse",
						filterCard: true,
						selectCard: [1, 1000],
						discard: false,
						lose: false,
						delay: false,
						filterTarget: function (card, player, target) {
							return player != target
						},
						onremove: ["rerende", "rerende2"],
						check: function (card) {
							if (ui.selected.cards.length && ui.selected.cards[0].name == "du") return 0
							if (!ui.selected.cards.length && card.name == "du") return 20
							var player = get.owner(card)
							if (ui.selected.cards.length >= Math.max(2, player.countCards("h") - player.hp)) return 0
							if (player.hp == player.maxHp || player.storage.rerende < 0 || player.countCards("h") <= 1) {
								var players = game.filterPlayer()
								for (var i = 0; i < players.length; i++) {
									if (
										players[i].hasSkill("haoshi") &&
										!players[i].isTurnedOver() &&
										!players[i].hasJudge("lebu") &&
										get.attitude(player, players[i]) >= 3 &&
										get.attitude(players[i], player) >= 3
									) {
										return 11 - get.value(card)
									}
								}
								if (player.countCards("h") > player.hp) return 10 - get.value(card)
								if (player.countCards("h") > 2) return 6 - get.value(card)
								return -1
							}
							return 10 - get.value(card)
						},
						content: function () {
							"step 0"
							var evt = _status.event.getParent("phaseUse")
							if (evt && evt.name == "phaseUse" && !evt.rerende) {
								var next = game.createEvent("rerende_clear")
								_status.event.next.remove(next)
								evt.after.push(next)
								evt.rerende = true
								next.player = player
								next.setContent(lib.skill.rerende1.content)
							}
							if (!Array.isArray(player.storage.rerende2)) {
								player.storage.rerende2 = []
							}
							player.storage.rerende2.push(target)
							target.gain(cards, player, "giveAuto")
							if (typeof player.storage.rerende != "number") {
								player.storage.rerende = 0
							}
							event.num1 = 0
							if (player.storage.rerende >= 0) {
								player.storage.rerende += cards.length
								while (player.storage.rerende >= 2) {
									for (var i = [1, 1, 2].randomGet(); i > 0; i = i - 1) {
										event.num1 += 1
									}
									player.storage.rerende -= 2
								}
								player.draw(event.num1)
							} else {
								event.finish()
							}
						},
						ai: {
							fireAttack: true,
							order: function (skill, player) {
								if (player.hp < player.maxHp && player.storage.rerende < 2 && player.countCards("h") > 1) {
									return 10
								}
								return 4
							},
							result: {
								target: function (player, target) {
									if (target.hasSkillTag("nogain")) return 0
									if (ui.selected.cards.length && ui.selected.cards[0].name == "du") {
										if (target.hasSkillTag("nodu")) return 0
										return -10
									}
									if (target.hasJudge("lebu")) return 0
									var nh = target.countCards("h")
									var np = player.countCards("h")
									if (player.hp == player.maxHp || player.storage.rerende < 0 || player.countCards("h") <= 1) {
										if (nh >= np - 1 && np <= player.hp && !target.hasSkill("haoshi")) return 0
									}
									return Math.max(1, 5 - nh)
								}
							},
							effect: {
								target: function (card, player, target) {
									if (player == target && get.type(card) == "equip") {
										if (player.countCards("e", { subtype: get.subtype(card) })) {
											if (
												game.hasPlayer(function (current) {
													return current != player && get.attitude(player, current) > 0
												})
											) {
												return 0
											}
										}
									}
								}
							},
							threaten: 0.8
						}
					},
					supjiuyuan: {
						audio: "ext:超界突破:2",
						zhuSkill: true,
						trigger: {
							global: "recoverBefore"
						},
						direct: true,
						filter: function (event, player) {
							return (
								player != event.player &&
								event.player.group == "wu" &&
								player.hp <= event.player.hp &&
								event.getParent().name != "rejiuyuan" &&
								player.hasZhuSkill("rejiuyuan", event.player)
							)
						},
						content: function () {
							"step 0"
							trigger.player.chooseBool("是否对" + get.translation(player) + "发动【救援】？", "令其回复1点体力，然后你摸一张牌").set("ai", function () {
								var evt = _status.event
								return get.attitude(evt.player, evt.getParent().player) > 0
							})
							"step 1"
							if (result.bool) {
								player.logSkill("rejiuyuan")
								trigger.player.line(player, "green")
								player.recover()
								trigger.player.draw()
							}
						}
					},
					supzhiheng: {
						audio: "ext:超界突破:2",
						// audioname: ["shen_caopi"],
						enable: "phaseUse",
						usable: 2,
						position: "he",
						// group: ["jump_Pdraw"],
						filterCard: function (card, player, event) {
							event = event || _status.event
							if (typeof event != "string") event = event.getParent().name
							var mod = game.checkMod(card, player, event, "unchanged", "cardDiscardable", player)
							if (mod != "unchanged") return mod
							return true
						},
						discard: false,
						lose: false,
						delay: false,
						selectCard: [0, Infinity],
						check: function (card) {
							var player = _status.event.player
							if (
								get.position(card) == "h" &&
								!player.countCards("h", "du") &&
								(player.hp > 2 ||
									!player.countCards("h", function (card) {
										return get.value(card) >= 8
									}))
							) {
								return 1
							}
							return 6 - get.value(card)
						},
						content: function () {
							"step 0"
							player.discard(cards)
							event.num = 2
							var hs = player.getCards("h")
							if (!hs.length) event.num = 1
							for (var i = 0; i < hs.length; i++) {
								if (!cards.contains(hs[i])) {
									event.num = 1
									break
								}
							}
							"step 1"
							player.draw(event.num + cards.length)
						},
						subSkill: {
							draw: {
								trigger: {
									player: "loseEnd"
								},
								silent: true,
								filter: function (event, player) {
									if (event.getParent(2).skill != "rezhiheng" && event.getParent(2).skill != "jilue_zhiheng") return false
									if (player.countCards("h")) return false
									for (var i = 0; i < event.cards.length; i++) {
										if (event.cards[i].original == "h") return true
									}
									return false
								},
								content: function () {
									player.addTempSkill("rezhiheng_delay", trigger.getParent(2).skill + "After")
								},
								sub: true,
								forced: true,
								popup: false
							},
							delay: {
								sub: true
							}
						},
						ai: {
							order: 1,
							result: {
								player: 1
							},
							threaten: 1.55
						},
						// mod: {
						// 	maxHandcardBase: function (player, num) {
						// 		return num - 1 > 1 ? num - 1 : 1
						// 	}
						// },
						"zhiheng1": {
							trigger: {
								player: "phaseJudgeBegin"
							},
							sub: true,
							frequent: true,
							forced: true,
							content: function () {
								player.skip("phaseDraw")
							}
						}
					},
					supyingzi: {
						audio: "ext:超界突破:2",
						audioname: ["heqi", "sunce", "gexuan", "re_sunben", "re_sunce", "re_heqi"],
						trigger: {
							player: "phaseDrawBegin2"
						},
						forced: true,
						preHidden: true,
						filter: function (event, player) {
							return !event.numFixed
						},
						content: function () {
							trigger.num = trigger.num + 2
						},
						ai: {
							threaten: 1.5
						},
						mod: {
							maxHandcardBase: function (player, num) {
								return player.maxHp + 1
							}
						}
					},
					suptuxi: {
						audio: "retuxi",
						trigger: {
							player: "phaseDrawBegin2"
						},
						group: [],
						forced: true,
						preHidden: true,
						priority: 3,
						filter: function (event, player) {
							return (
								event.num > 0 &&
								!event.numFixed &&
								game.hasPlayer(function (target) {
									return target.countCards("hej") > 0 && player != target
								})
							)
						},
						init: function (player) {
							player.storage.tuxinum = 0
							//player.addMark('suptuxi');
						},
						content: function () {
							"step 0"
							var num = get.copy(trigger.num)
							var target_num = player.maxHp
							player
								.chooseTarget(
									get.prompt("suptuxi"),
									"获得至多" + target_num + "名角色的各一张牌，然后摸Y张牌并失去Y点体力上限(Y=〖突袭〗选择的目标数/2且向下取整)。",
									[1, target_num],
									function (card, player, target) {
										return target.countCards("hej") > 0 && player != target
									},
									function (target) {
										var att = get.attitude(_status.event.player, target)
										if (target.hasSkill("tuntian")) return att / 10
										return 1 - att
									},
									false
								)
								.setHiddenSkill("new_retuxi")
							"step 1"
							if (result.bool) {
								event.player_damage = []
								player.storage.tuxinum++
								result.targets.sortBySeat()
								player.logSkill("new_retuxi", result.targets)
								player.gainMultiple(result.targets, "hej")
								for(var p of result.targets){
									if(p.hp >= player.hp){
										event.player_damage.push(p)
									}
								}
								var lose = result.targets.length / 2
								trigger.num = 0
								while (lose - 1 >= 0) {
									player.loseMaxHp()
									trigger.num++
									lose--
								}//能跑就别改
								if (trigger.num == 0) trigger.num = 1
								player.draw(trigger.num)
								trigger.num = 0
							} else {
								trigger.num = trigger.num + player.storage.tuxinum
								player.storage.tuxinum = 0
								event.finish()
							}
							"step 2"
							for(var p of event.player_damage){
								p.damage()
							}
							if (trigger.num <= 0) game.delay()
						},
						ai: {
							threaten: 1.6,
							expose: 0.2
						},
						mark: true,
						intro: {
							mark: function (dialog, storage, player) {
								return "下次摸牌阶段摸牌时，你额外摸" + player.storage.tuxinum + "张牌"
							},
							markcount: "expansion"
						}
					},
					supleiji: {
						audio: "ext:超界突破:2",
						audioname: ["boss_qinglong"],
						trigger: {
							player: ["useCard", "respond"]
						},
						filter: function (event, player) {
							return event.card.name == "shandian" || event.card.name == "shan" || event.card.nature == "thunder"
						},
						direct: true,
						init: function (player) {
							//player.removeSkill('tianming');
						},
						content: function () {
							"step 0"
							player.chooseTarget(get.prompt2("supleiji"), function (card, player, target) {
								return target != player
							}).ai = function (target) {
								if (target.hasSkill("hongyan")) return 0
								return get.damageEffect(target, _status.event.player, _status.event.player, "thunder")
							}
							"step 1"
							if (result.bool) {
								player.logSkill("supleiji", result.targets, "thunder")
								event.target = result.targets[0]
								event.target.judge(function (card) {
									var color = get.color(card)
									var name = get.name(card)
									if (color == "black") return -4
									if (name == "shandian" || name == "shan" || name == "leisha") return -5
									return -2
								}).judge2 = function (result) {
									return result.bool == false ? true : false
								}
							} else {
								event.finish()
							}
							"step 2"
							if (result.color == "black") {
								var dam = 0
								var rr = [true]
								while (rr.randomGet()) {
									rr.push(false)
									dam++
								}
								event.target.damage([1, 1, 1, 1, 2, 2, 2, 3, 3, 4].randomGet(), "thunder")
							} else {
								var dam = 0
								var rr = [true]
								while (rr.randomGet()) {
									rr.push(false)
									dam++
								}
								player.draw([1, 1, 1, 1, 2, 2, 2, 3, 3, 4].randomGet())
							}
						},
						ai: {
							useShan: true,
							effect: {
								target: function (card, player, target, current) {
									if (get.tag(card, "respondShan")) {
										var hastarget = game.hasPlayer(function (current) {
											return get.attitude(target, current) < 0
										})
										var be = target.countCards("e", { color: "black" })
										if (target.countCards("h", "shan") && be) {
											if (!target.hasSkill("guidao")) return 0
											return [0, hastarget ? target.countCards("he") / 2 : 0]
										}
										if (target.countCards("h", "shan") && target.countCards("h") > 2) {
											if (!target.hasSkill("guidao")) return 0
											return [0, hastarget ? target.countCards("h") / 4 : 0]
										}
										if (target.countCards("h") > 3 || (be && target.countCards("h") >= 2)) {
											return [0, 0]
										}
										if (target.countCards("h") == 0) {
											return [1.5, 0]
										}
										if (target.countCards("h") == 1 && !be) {
											return [1.2, 0]
										}
										if (!target.hasSkill("guidao")) return [1, 0.05]
										return [1, Math.min(0.5, (target.countCards("h") + be) / 4)]
									}
								}
							}
						}
					},
					supguidao: {
						audio: "ext:超界突破:2",
						audioname: ["sp_zhangjiao"],
						trigger: {
							global: "judge"
						},
						filter: function (event, player) {
							return player.countCards("hes") > 0
						},
						init: function (player) {
							player.storage.hguidao = [1, 2, 3].randomGet()
							if (player.maxHp >= 3) {
								player.loseMaxHp()
								player.loseHp()
							}
						},
						mod: {
							maxHandcardBase: function (player, num) {
								if (!player.storage.hguidao) {
									player.storage.hguidao = [1, 2, 3].randomGet()
									return num + player.storage.hguidao
								}
								return num + player.storage.hguidao
							}
						},
						direct: true,
						content: function () {
							"step 0"
							player
								.chooseCard(
									get.translation(trigger.player) +
										"的" +
										(trigger.judgestr || "") +
										"判定为" +
										get.translation(trigger.player.judging[0]) +
										"，" +
										get.prompt("guidao"),
									"hes",
									function (card) {
										return true
										var player = _status.event.player
										var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player)
										if (mod2 != "unchanged") return mod2
										var mod = game.checkMod(card, player, "unchanged", "cardRespondable", player)
										if (mod != "unchanged") return mod
										return true
									}
								)
								.set(
									"ai",
									function (card) {
										var trigger = _status.event.getTrigger()
										var player = _status.event.player
										var judging = _status.event.judging
										var result = trigger.judge(card) - trigger.judge(judging)
										var attitude = get.attitude(player, trigger.player)
										if (attitude == 0 || result == 0) return 0
										if (attitude > 0) {
											return result
										} else {
											return -result
										}
									},
									false
								)
								.set("judging", trigger.player.judging[0])
							"step 1"
							if (result.bool) {
								player.respond(result.cards, "highlight", "guidao", "noOrdering")
							} else {
								event.finish()
							}
							"step 2"
							if (result.bool) {
								if (player.storage.hguidao < 3) player.storage.hguidao++
								else player.storage.hguidao = 1
								player.$gain2(trigger.player.judging[0])
								player.gain(trigger.player.judging[0])
								trigger.player.judging[0] = result.cards[0]
								trigger.orderingCards.addArray(result.cards)
								game.log(trigger.player, "的判定牌改为", result.cards[0])
							}
							"step 3"
							game.delay(2)
						},
						ai: {
							rejudge: true,
							tag: {
								rejudge: 1
							}
						}
					},
					"sup_wushuang": {
						shaRelated: true,
						audio: "ext:超界突破:2",
						audioname: ["re_lvbu", "shen_lvbu", "lvlingqi"],
						forced: true,
						locked: true,
						init: function (player) {
							player.disableEquip("equip1")
						},
						mod: {
							cardname: function (card, player, name) {
								if (name == "shan") return "jiu"
							},
							cardUsable: function (card, player, num) {
								//if(card.name=='sha') return num+1;
							},
							selectTarget: function (card, player, range) {
								if (card.name == "sha" && range[1] != -1) range[1] += 2
							},
							attackFrom: function (from, to, distance) {
								return distance - 1
							}
						},
						group: ["wushuang1", "wushuang2"],
						preHidden: ["wushuang1", "wushuang2"]
					},
					"sup_liyu": {
						audio: "liyu",
						trigger: {
							source: "damageSource"
						},
						filter: function (event, player) {
							if (player.storage.liyu_round < game.roundNumber) {
								player.storage.liyu_num = 2
								player.storage.liyu_round = game.roundNumber
							}
							if (player.storage.liyu_num <= 0) return false
							// console.log(1,event.player.isAlive() && event.player.countGainableCards(player, "hej") > 0)
							return event.player.isAlive() && event.player.countGainableCards(player, "hej") > 0
						},
						popup: true,
						direct: true,
						init: function (player) {
							player.storage.liyu_num = 2
							player.storage.liyu_round = -1
						},
						content: function () {
							"step 0"
							player
								.gainPlayerCard(get.prompt("sup_liyu", trigger.player), trigger.player, "hej", "visibleMove")
								.set("ai", function (card) {
									if(!card.name)return
									var player = _status.event.player
									var evt = _status.event.target
									if (get.attitude(player, evt) > 0 && get.position(card) == "j") return 4 + get.value(card)
									if (get.type(card) == "equip") {
										if (
											get.attitude(player, evt) > 0 &&
											game.hasPlayer(function (current) {
												return (
													player.canUse({ name: "juedou" }, current) && current != evt.target && get.effect(current, { name: "juedou" }, player, player) > 2
												)
											})
										) {
											return 5
										} else if (
											game.hasPlayer(function (current) {
												return (
													player.canUse({ name: "juedou" }, current) &&
													current != evt &&
													current != player &&
													get.effect(current, { name: "juedou" }, player, player) < 0
												)
											})
										) {
											return 1
										} else return 4
									}
									return 3
								})
								.set(["sup_liyu", trigger.player])
							"step 1"
							if (result.bool) {
								player.storage.liyu_num--
								if (get.type(result.cards[0]) != "equip") {
									player.draw()
									trigger.player.draw()
									event.finish()
								} else {
									if (
										!game.hasPlayer(function (current) {
											return player.canUse("juedou", current)
										})
									) {
										event.finish()
										return
									}
									player
										.chooseTarget(
											true,
											function (card, player, target) {
												var evt = _status.event.getParent()
												return evt.player.canUse({ name: "juedou" }, target) && target != _status.event.player
											},
											"请选择一名角色，视为" + get.translation(player) + "对其使用【决斗】"
										)
										.set("ai", function (target) {
											var evt = _status.event.getParent()
											return get.effect(target, { name: "juedou" }, evt.player, _status.event.player) - 2
										})
								}
							} else event.finish()
							"step 2"
							if (result.targets) {
								player.useCard({ name: "juedou", isCard: true }, result.targets[0], "noai")
							}
						},
						ai: {
							halfneg: true
						}
					},
					wangwu: {
						enable: "phaseUse",
						position: "h",
						filter: function (event, player) {
							return player.countCards("he", { subtype: "equip1" }) > 0
						},
						filterCard: function (card) {
							return get.subtype(card) == "equip1"
						},
						check: function (card) {
							if (_status.event.player.isDisabled(get.subtype(card))) return 5
							return 3 - get.value(card)
						},
						content: function () {
							"step 1"
							var card = get.cardPile2(function (card) {
								return card.name == "sha"
							})
							player.gain(card, "gain2")
						},
						discard: false,
						visible: true,
						loseTo: "discardPile",
						prompt: "将一张武器牌重铸为杀",
						delay: 0.5,
						prepare: function (cards, player) {
							player.$throw(cards, 1000)
							game.log(player, "将", cards, "置入了弃牌堆")
						},
						ai: {
							order: 10,
							result: {
								player: 1
							}
						}
					},
					"sup_jingti": {
						trigger: {
							source: ["dyingBegin", "dieAfter"]
						},
						mod: {
							maxHandcardBase: function (player, num) {
								return num + player.hujia
							}
						},
						direct: true,
						content: function () {
							if (trigger.player.maxHp > 0) trigger.player.loseMaxHp()
							//else trigger.player.damage();
							if (player.countCards("h") < 7) player.draw()
							if (player.hujia == 0) player.changeHujia(1)
							if (player.maxHp < 7) player.gainMaxHp(1)
							//if(event.name == "dieAfter")player.recover();
						}
					},
					"jump_Pdraw": {
						trigger: {
							player: "phaseJudgeBegin"
						},
						frequent: true,
						forced: true,
						content: function () {
							player.skip("phaseDraw")
						}
					},
					"sup_luoshen": {
						audio: "ext:超界突破:2",
						locked: true,
						forced: true,
						trigger: {
							player: "phaseZhunbeiBegin"
						},
						frequent: true,
						content: function () {
							"step 0"
							var lis = []
							var lis_res = true

							if (game.roundNumber % 2 == 0) {
								if (lis_res) {
									player.loseMaxHp()
								} else {
									player.gainMaxHp()
								}
							} else {
								if (!lis_res) {
									player.loseHp()
								} else {
									player.recover()
								}
							}
							player.addTempSkill("sup_luoshen_add")
							event.cards = []
							"step 1"
							var next = player.judge(function (card) {
								if (get.suit(card) != "heart") return 1.5
								return -1.5
							})
							next.judge2 = function (result) {
								return result.bool
							}
							if (get.mode() != "guozhan" && !player.hasSkillTag("rejudge"))
								next.set("callback", function () {
									if (event.judgeResult.suit != "heart" && get.position(card, true) == "o") {
										player.gain(card, "gain2").gaintag.add("sup_luoshen")
									}
								})
							else
								next.set("callback", function () {
									if (event.judgeResult.suit != "heart") event.getParent().orderingCards.remove(card)
								})
							"step 2"
							if (result.bool) {
								event.cards.push(result.card)
								if (event.cards.length >= 20) {
									player.gain(event.cards, "gain2").gaintag.add("sup_luoshen")
									event.finish()
								}
							} else {
								for (var i = 0; i < event.cards.length; i++) {
									if (get.position(event.cards[i], true) != "o") {
										event.cards.splice(i, 1)
										i--
									}
								}
								if (event.cards.length) {
									player.gain(event.cards, "gain2").gaintag.add("sup_luoshen")
								}
								event.finish()
							}
							"step 3"
							if (true) {
								//player.gainMaxHp();
								//player.recover();
								event.goto(1)
							} else {
								for (var i = 0; i < event.cards.length; i++) {
									if (get.position(event.cards[i], true) != "o") {
										event.cards.splice(i, 1)
										i--
									}
								}
								if (event.cards.length) {
									player.gain(event.cards, "gain2").gaintag.add("sup_luoshen")
								}
							}
						},
						subSkill: {
							add: {
								mod: {
									ignoredHandcard: function (card, player) {
										if (card.hasGaintag("sup_luoshen")) {
											return true
										}
									},
									cardDiscardable: function (card, player, name) {
										if (name == "phaseDiscard" && card.hasGaintag("sup_luoshen")) {
											return false
										}
									}
								},
								onremove: function (player) {
									// player.removeGaintag("sup_luoshen")
								},
								sub: true
							}
						}
					},
					"sup_qinguo": {
						mod: {
							aiValue: function (player, card, num) {
								if (get.name(card) != "shan" && get.color(card) != "black") return
								var cards = player.getCards("hs", function (card) {
									return get.name(card) == "shan"
								})
								cards.sort(function (a, b) {
									return (get.name(b) == "shan" ? 1 : 2) - (get.name(a) == "shan" ? 1 : 2)
								})
								var geti = function () {
									if (cards.contains(card)) {
										return cards.indexOf(card)
									}
									return cards.length
								}
								if (get.name(card) == "shan") return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6
								return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)])
							},
							aiUseful: function () {
								return lib.skill.reqingguo.mod.aiValue.apply(this, arguments)
							}
						},
						locked: false,
						audio: "ext:超界突破:2",
						enable: ["chooseToRespond", "chooseToUse"],
						filterCard: function (card) {
							return true
						},
						position: "hes",
						viewAs: {
							name: "shan"
						},
						viewAsFilter: function (player) {
							return true
						},
						prompt: "将一张牌当闪打出",
						check: function () {
							return 1
						},
						ai: {
							order: 2,
							respondShan: true,
							skillTagFilter: function (player) {
								return true
							},
							effect: {
								target: function (card, player, target, current) {
									if (get.tag(card, "respondShan") && current < 0) return 0.6
								}
							},
							basic: {
								useful: [7, 5.1, 2],
								value: [7, 5.1, 2]
							},
							result: {
								player: 1
							}
						}
					},
					"sup_keji": {
						audio: "ext:超界突破:2",
						audioname: ["re_lvmeng", "sp_lvmeng"],
						trigger: {
							player: "phaseDiscardBefore"
						},
						frequent: function (event, player) {
							return player.needsToDiscard()
						},
						direct: true,
						filter: function (event, player) {
							if (player.getHistory("skipped").contains("phaseUse")) return true
							var history = player.getHistory("useCard").concat(player.getHistory("respond"))
							for (var i = 0; i < history.length; i++) {
								if (history[i].card.name == "sha" && history[i].isPhaseUsing()) return false
							}
							return true
						},
						content: function () {
							var X = player.hp
							player.draw(X)
							player.gainMaxHp()
							trigger.cancel()
						},
						ai: {
							threaten: 8
						}
					},
					"sup_qinxue": {
						skillAnimation: true,
						animationColor: "wood",
						audio: "ext:超界突破:2",
						unique: true,
						juexingji: true,
						derivation: "gongxin",
						trigger: {
							player: ["phaseZhunbeiBegin", "phaseJieshuBegin"]
						},
						forced: true,
						filter: function (event, player) {
							if (player.countCards("h") >= player.hp + 6) return true
							return false
						},
						content: function () {
							player.awakenSkill("sup_qinxue")
							player.draw(2)
							player.recover()
							player.addSkill("gongxin")
						}
					},
					"sup_botu": {
						audio: "botu",
						trigger: {
							player: "phaseJieshuBegin"
						},
						frequent: true,
						filter: function (event, player) {
							if (player.countMark("rebotu_count") >= Math.min(3, game.countPlayer())) return false
							var suits = []
							game.getGlobalHistory("cardMove", function (evt) {
								if (suits.length >= 4) return
								if (evt.name == "lose") {
									if (evt.position == ui.discardPile) {
										for (var i of evt.cards) suits.add(get.suit(i, false))
									}
								} else {
									if (evt.name == "cardsDiscard") {
										for (var i of evt.cards) suits.add(get.suit(i, false))
									}
								}
							})
							return suits.length >= 4
						},
						content: function () {
							player.insertPhase()
						},
						group: "rebotu_mark",
						subSkill: {
							count: {
								onremove: true,
								sub: true
							},
							mark: {
								trigger: {
									global: ["loseAfter", "cardsDiscardAfter"],
									player: "phaseAfter"
								},
								forced: true,
								firstDo: true,
								silent: true,
								filter: function (event, player) {
									if (event.name == "phase") return true
									if (player != _status.currentPhase) return false
									if (event.name == "lose") return event.position == ui.discardPile
									return true
								},
								content: function () {
									if (trigger.name == "phase") {
										player.unmarkSkill("rebotu_mark")
										return
									}
									var suits = []
									game.getGlobalHistory("cardMove", function (evt) {
										if (suits.length >= 4) return
										if (evt.name == "lose") {
											if (evt.position == ui.discardPile) {
												for (var i of evt.cards) suits.add(get.suit(i, false))
											}
										} else {
											if (evt.name == "cardsDiscard") {
												for (var i of evt.cards) suits.add(get.suit(i, false))
											}
										}
									})
									player.storage.rebotu_mark = suits
									player.markSkill("rebotu_mark")
								},
								intro: {
									onunmark: true,
									content: "本回合已有$花色的牌进入过弃牌堆"
								},
								sub: true,
								popup: false
							}
						}
					},
					"sup_jijiang1": {
						audio: "ext:超界突破:2",
						audioname: ["liushan", "re_liubei", "re_liushan", "ol_liushan"],
						trigger: {
							player: ["useCardBegin", "respondBegin"]
						},
						logTarget: "targets",
						filter: function (event, player) {
							return event.skill == "jijiang"
						},
						forced: true,
						content: function () {
							"step 0"
							delete trigger.skill
							trigger.getParent().set("jijiang", true)
							"step 1"
							if (event.current == undefined) event.current = player.next
							if (event.current == player) {
								player.addTempSkill("jijiang3")
								event.finish()
								trigger.cancel()
								trigger.getParent().goto(0)
							} else if (event.current.group == "shu") {
								var next = event.current.chooseToRespond("是否替" + get.translation(player) + "打出一张杀？", { name: "sha" })
								next.set("ai", function () {
									var event = _status.event
									return get.attitude(event.player, event.source) - 2
								})
								next.set("source", player)
								next.set("jijiang", true)
								next.set("skillwarn", "替" + get.translation(player) + "打出一张杀")
								next.noOrdering = true
								next.autochoose = lib.filter.autoRespondSha
							} else {
								event.current = event.current.next
								event.redo()
							}
							"step 2"
							if (result.bool) {
								event.finish()
								trigger.card = result.card
								trigger.cards = result.cards
								trigger.throw = false
								if (typeof event.current.ai.shown == "number" && event.current.ai.shown < 0.95) {
									event.current.ai.shown += 0.3
									if (event.current.ai.shown > 0.95) event.current.ai.shown = 0.95
								}
							} else {
								event.current = event.current.next
								event.goto(1)
							}
						}
					},
					"sup_jiang": {
						shaRelated: true,
						audio: "ext:超界突破:2",
						preHidden: true,
						audioname: ["sp_lvmeng", "re_sunben", "re_sunce"],
						trigger: {
							player: "useCardToPlayered",
							target: "useCardToTargeted"
						},
						filter: function (event, player) {
							if (!(event.card.name == "juedou" || event.card.name == "sha")) return false
							return player == event.target || event.getParent().triggeredTargets3.length == 1
						},
						frequent: true,
						content: function () {
							player.draw()
						},
						ai: {
							effect: {
								target: function (card, player, target) {
									if (card.name == "sha" && get.color(card) == "red") return [1, 0.6]
								},
								player: function (card, player, target) {
									if (card.name == "sha" && get.color(card) == "red") return [1, 1]
								}
							}
						}
					},
					"sup_hunzi": {
						audio: "ext:超界突破:2",
						audioname: ["re_sunyi"],
						inherit: "hunzi",
						content: function () {
							player.loseMaxHp()
							player.recover()
							//player.addSkill('qixi');
							//player.addSkill('keji');
							player.addSkill("zhiheng")
							//player.addSkill('qianxun');
							player.addSkill("reyingzi")
							player.addSkill("gzyinghun")
							if (player.hasSkill("jiang")) {
								player.addSkill("sup_jiang")
								player.removeSkill("jiang")
							}
							player.awakenSkill(event.name)
							player.storage[event.name] = true
							player.insertPhase()
						},
						skillAnimation: true,
						animationColor: "wood",
						juexingji: true,
						derivation: ["reyingzi", "gzyinghun"],
						unique: true,
						trigger: {
							global: "phaseEnd"
						},
						filter: function (event, player) {
							return player.hp <= [1, 1, 1, 2, 2, 3].randomGet() && !player.storage.hunzi
						},
						forced: true,
						ai: {
							threaten: function (player, target) {
								return 6.5 - target.hp
							},
							effect: {
								target: function (card, player, target) {
									if (!target.hasFriend()) return
									if (
										get.tag(card, "damage") == 1 &&
										target.hp == 2 &&
										!target.isTurnedOver() &&
										_status.currentPhase != target &&
										get.distance(_status.currentPhase, target, "absolute") <= 3
									)
										return [0.5, 1]
								}
							}
						}
					},
					"sup_yijue": {
						audio: "yijue",
						enable: "phaseUse",
						filterTarget: function (card, player, target) {
							return player != target && target.countCards("hej") && !target.hasSkill("sup_yijue2") && target.hp != target.maxHp
						},
						usable: 2,
						check: function (card) {
							return 8 - get.value(card)
						},
						content: function () {
							"step 0"
							if (!target.countCards("hej")) {
								event.finish()
								return
							} else
								target.chooseCard(true, "hej").set("ai", function (card) {
									var player = _status.event.player
									if ((player.hasShan() || player.hp < 3) && get.color(card) == "black") return 2
									return Math.max(1, 20 - get.value(card))
								})
							"step 1"
							target.showCards(result.cards)
							target.addTempSkill("sup_yijue2")
							event.card2 = result.cards[0]
							//player.gain(event.card2,target,'give','bySelf');
							if (get.color(event.card2) == "black") {
								if (!target.hasSkill("fengyin")) {
									target.addTempSkill("fengyin")
								}
								target.addTempSkill("new_yijue2")
								event.finish()
							} else {
								player.gain(event.card2, target, "give", "bySelf")
								if (target.hp < target.maxHp) {
									player.chooseBool("是否让目标回复一点体力？").ai = function (event, player) {
										return get.recoverEffect(target, player, player) > 0
									}
								}
							}
							"step 2"
							if (result.bool) {
								target.recover()
								player.draw()
								target.draw()
							}
						},
						ai: {
							result: {
								target: function (player, target) {
									// if (target.countCards("hej") > target.hp + 1 && get.recoverEffect(target) > 0) {
									// 	return 1
									// }
									// if (player.canUse("sha", target) && (player.countCards("hej", "sha") || player.countCards("hej", { color: "red" }))) {
									// 	return 1
									// }
									return (get.attitude(player,target)+0.1) * 10
								}
							},
							order: 9,
							"directHit_ai": true,
							skillTagFilter: function (player, tag, arg) {
								if (!arg.target.hasSkillTag("new_yijue2")) return false
							}
						}
					},
					"sup_wusheng": {
						group: ["sup_wusheng1"],
						mod: {
							targetInRange: function (card) {
								if (card.name == "sha") return true
							},
							cardUsableTarget: function (card, player, target) {
								//if(card.name=='sha' &&target.hasSkill('new_yijue2')) return true;
							},
							cardUsable: function (card, player, num) {
								if (card.name == "sha") return num + 1
							},
							selectTarget: function (card, player, range) {
								//if(card.name=='sha'&&range[1]!=-1) range[1] += 1;
							}
						},
						locked: false,
						audio: "wusheng",
						audioname: ["re_guanyu", "guanzhang", "jsp_guanyu", "guansuo"],
						enable: ["chooseToRespond", "chooseToUse"],
						filterCard: function (card, player) {
							if (get.zhu(player, "shouyue")) return true
							return get.color(card) == "red"
						},
						position: "hes",
						viewAs: {
							name: "sha"
						},
						viewAsFilter: function (player) {
							if (get.zhu(player, "shouyue")) {
								if (!player.countCards("hes")) return false
							} else {
								if (!player.countCards("hes", { color: "red" })) return false
							}
						},
						prompt: "将一张红色牌当杀使用或打出",
						check: function (card) {
							var val = get.value(card)
							if (_status.event.name == "chooseToRespond") return 1 / Math.max(0.1, val)
							return 5 - val
						},
						ai: {
							respondSha: true,
							skillTagFilter: function (player) {
								if (get.zhu(player, "shouyue")) {
									if (!player.countCards("hes")) return false
								} else {
									if (!player.countCards("hes", { color: "red" })) return false
								}
							},
							yingbian: function (card, player, targets, viewer) {
								if (get.attitude(viewer, player) <= 0) return 0
								var base = 0,
									hit = false
								if (get.cardtag(card, "yingbian_hit")) {
									hit = true
									if (
										targets.filter(function (target) {
											return target.hasShan() && get.attitude(viewer, target) < 0 && get.damageEffect(target, player, viewer, get.nature(card)) > 0
										})
									)
										base += 5
								}
								if (get.cardtag(card, "yingbian_all")) {
									if (
										game.hasPlayer(function (current) {
											return !targets.contains(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0
										})
									)
										base += 5
								}
								if (get.cardtag(card, "yingbian_damage")) {
									if (
										targets.filter(function (target) {
											return (
												get.attitude(player, target) < 0 &&
												(hit ||
													!target.mayHaveShan() ||
													player.hasSkillTag(
														"directHit_ai",
														true,
														{
															target: target,
															card: card
														},
														true
													)) &&
												!target.hasSkillTag("filterDamage", null, {
													player: player,
													card: card,
													jiu: true
												})
											)
										})
									)
										base += 5
								}
								return base
							},
							canLink: function (player, target, card) {
								if (!target.isLinked() && !player.hasSkill("wutiesuolian_skill")) return false
								if (
									target.mayHaveShan() &&
									!player.hasSkillTag(
										"directHit_ai",
										true,
										{
											target: target,
											card: card
										},
										true
									)
								)
									return false
								if (player.hasSkill("jueqing") || player.hasSkill("gangzhi") || target.hasSkill("gangzhi")) return false
								return true
							},
							basic: {
								useful: [5, 3, 1],
								value: [5, 3, 1]
							},
							order: function (item, player) {
								if (player.hasSkillTag("presha", true, null, true)) return 10
								if (lib.linked.contains(get.nature(item))) {
									if (
										game.hasPlayer(function (current) {
											return (
												current != player &&
												current.isLinked() &&
												player.canUse(item, current, null, true) &&
												get.effect(current, item, player, player) > 0 &&
												lib.card.sha.ai.canLink(player, current, item)
											)
										}) &&
										game.countPlayer(function (current) {
											return current.isLinked() && get.damageEffect(current, player, player, get.nature(item)) > 0
										}) > 1
									)
										return 3.1
									return 3
								}
								return 3.05
							},
							result: {
								target: function (player, target, card, isLink) {
									var eff = (function () {
										if (!isLink && player.hasSkill("jiu")) {
											if (
												!target.hasSkillTag("filterDamage", null, {
													player: player,
													card: card,
													jiu: true
												})
											) {
												if (get.attitude(player, target) > 0) {
													return -7
												} else {
													return -4
												}
											}
											return -0.5
										}
										return -1.5
									})()
									if (
										!isLink &&
										target.mayHaveShan() &&
										!player.hasSkillTag(
											"directHit_ai",
											true,
											{
												target: target,
												card: card
											},
											true
										)
									)
										return eff / 1.2
									return eff
								}
							},
							tag: {
								respond: 1,
								respondShan: 1,
								damage: function (card) {
									if (card.nature == "poison") return
									return 1
								},
								natureDamage: function (card) {
									if (card.nature) return 1
								},
								fireDamage: function (card, nature) {
									if (card.nature == "fire") return 1
								},
								thunderDamage: function (card, nature) {
									if (card.nature == "thunder") return 1
								},
								poisonDamage: function (card, nature) {
									if (card.nature == "poison") return 1
								}
							}
						}
					},
					"sup_yijue2": {
						mod: {}
					},
					"sup_wusheng1": {
						trigger: {
							source: "damageBegin1"
						},
						priority: -3,
						filter: function (event) {
							return event.card && event.card.name == "sha"
						},
						forced: true,
						content: function () {
							trigger.num *= 2
							if (trigger.player.hasSkill("new_guixin")) {
								trigger.player.addSkill("sup_new_guixin_fix")
								trigger.player.removeSkill("new_guixin")
							}
						},
						ai: {
							damageBonus: true
						}
					},
					"sup_zhoushui": {
						skillAnimation: true,
						unique: true,
						enable: "phaseUse",
						filter: function (event, player) {
							return game.roundNumber > 2
						},
						filterTarget: function (card, player, target) {
							return target != player && (get.mode() != "guozhan" || _status.mode == "yingbian" || _status.mode == "free" || target.countCards("e") > 0)
						},
						filterCard: true,
						position: "he",
						selectCard: 2,
						content: function () {
							player.awakenSkill(event.name)
							target.discard(
								target.getCards("e", function (card) {
									return lib.filter.cardDiscardable(card, target, "shuiyanqijunx")
								})
							)
							target.loseHp(1)
						},
						ai: {
							order: 13,
							result: {
								target: function (player, target, card, isLink) {
									var es = target.getCards("e")
									if (!es.length) return -1.5
									var val = 0
									for (var i of es) val += get.value(i, target)
									return -Math.min(1.5, val / 5)
								}
							}
						}
					},
					"sup_new_guixin_fix": {
						audio: "guixin",
						trigger: {
							player: "damageEnd"
						},
						check: function (event, player) {
							if (player.isTurnedOver() || event.num > 1) return true
							var num = game.countPlayer(function (current) {
								if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
									return true
								}
								if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
									return true
								}
							})
							return num >= 2
						},
						content: function () {
							"step 0"
							var targets = game.filterPlayer()
							targets.remove(player)
							targets.sort(lib.sort.seat)
							event.targets = targets
							event.count = trigger.num
							"step 1"
							event.num = 0
							player.line(targets, "green")
							player
								.chooseControl("手牌区", "装备区", "判定区")
								.set("ai", function () {
									if (
										game.hasPlayer(function (current) {
											return current.countCards("j") && current != player && get.attitude(player, current) > 0
										})
									)
										return 2
									return Math.floor(Math.random() * 3)
								})
								.set("prompt", "请选择优先获得的区域")
							"step 2"
							event.range = {
								手牌区: ["h", "e", "j"],
								装备区: ["e", "h", "j"],
								判定区: ["j", "h", "e"]
							}[result.control || "手牌区"]
							"step 3"
							if (num < event.targets.length) {
								var target = event.targets[num]
								var range = event.range
								for (var i = 0; i < range.length; i++) {
									var cards = target.getCards(range[i])
									if (cards.length) {
										var card = cards.randomGet()
										player.gain(card, target, "giveAuto", "bySelf")
										break
									}
								}
								event.num++
							}
							"step 4"
							if (num < event.targets.length) event.goto(3)
							"step 5"
							player.turnOver()
							"step 6"
							event.count--
							if (event.count >= 1) {
								player.chooseBool(get.prompt2("new_guixin")).ai = function () {
									return lib.skill.new_guixin.check({ num: event.count }, player)
								}
							} else {
								event.finish()
							}
							"step 7"
							if (event.count && result.bool) {
								player.logSkill("new_guixin")
								event.goto(1)
							}
						},
						ai: {
							maixie: true,
							"maixie_hp": true,
							threaten: function (player, target) {
								if (target.hp == 1) return 2.5
								return 1
							},
							effect: {
								target: function (card, player, target) {
									if (get.tag(card, "damage")) {
										if (player.hasSkillTag("jueqing", false, target)) return [1, -2]
										if (target.hp == 1) return 0.8
										if (target.isTurnedOver()) return [0, 3]
										var num = game.countPlayer(function (current) {
											if (current.countCards("he") && current != player && get.attitude(player, current) <= 0) {
												return true
											}
											if (current.countCards("j") && current != player && get.attitude(player, current) > 0) {
												return true
											}
										})
										if (num > 2) return [0, 1]
										if (num == 2) return [0.5, 1]
									}
								}
							}
						}
					},
					"sup_paoxiao": {
						audio: "paoxiao",
						audioname: ["re_zhangfei", "guanzhang", "xiahouba"],
						trigger: {
							source: "damageEnd"
						},
						group: ["sup_paoxiao1", "sup_paoxiao2", "sup_paoxiao3", "sup_paoxiao4"],
						filter: function (event, player) {
							return event.card && event.card.name == "sha"
						},
						mark: true,
						marktext: "咆",
						intro: {
							content: "当前有#个标记"
						},
						init: function (player) {
							player.addMark("sup_paoxiao")
							player.removeMark("sup_paoxiao")
							player.storage.pao = 0
						},
						forced: true,
						content: function () {},
						ai: {
							threaten: 2.5
						},
						mod: {
							selectTarget: function (card, player, range) {
								if (card.name == "sha" && range[1] != -1) range[1] += player.storage.pao
							},
							cardUsable: function (card, player, num) {
								if (card.name == "sha") return num + player.storage.pao
							},
							attackFrom: function (from, to, distance) {
								//return distance-from.storage.pao;
							}
						},
						"audioname2": {
							"key_shiki": "shiki_omusubi"
						}
					},
					"sup_paoxiao1": {
						trigger: {
							source: "damageBegin1"
						},
						filter: function (event, player) {
							return player.hp > 1
						},
						forced: true,
						content: function () {
							if (player.storage.pao > 2) trigger.num++
							player.loseHp()
							player.storage.pao += trigger.num
							player.addMark("sup_paoxiao", trigger.num)
						},
						ai: {
							damageBonus: true
						},
						"audioname2": {
							"key_shiki": "shiki_omusubi"
						}
					},
					"sup_paoxiao2": {
						trigger: {
							global: "phaseEnd"
						},
						filter: function (player) {
							return true
						},
						forced: true,
						content: function () {
							var a = player.storage.pao
							if (player.storage.pao == 1) {
								player.storage.pao = 0
							}
							if (player.storage.pao % 2 == 1) player.storage.pao++
							player.storage.pao /= 2
							a -= player.storage.pao
							if (a) {
								var b = player.maxHp - player.hp
								if (b != 0) player.recover(a)
								b = a - b
								var card = get.cardPile2(function (card) {
									return card.name == "sha"
								})
								player.gain(card, "gain2")
								player.removeMark("sup_paoxiao", a)
								if (b > 0) player.draw(b)
							}
						},
						"audioname2": {
							"key_shiki": "shiki_omusubi"
						}
					},
					"sup_paoxiao3": {
						enable: "phaseUse",
						filter: function (event, player) {
							return player.countCards("he") > player.storage.pao
						},
						check: function (card) {
							if (_status.event.player.isDisabled(get.subtype(card))) return 5
							return 3 - get.value(card)
						},
						content: function () {
							"step 0"
							if (player.hp > 1) player.loseHp()
							player.chooseToDiscard("he", player.storage.pao + 1, true)
							"step 1"

							player.chooseUseTarget("sha")
							player.storage.pao++
							player.addMark("sup_paoxiao")
						},
						ai: {
							order: 10,
							result: {
								player: function (player) {
									return 1 - player.storage.pao
								}
							}
						},
						"audioname2": {
							"key_shiki": "shiki_omusubi"
						}
					},
					"sup_paoxiao4": {
						trigger: {
							source: ["dieAfter"]
						},
						direct: true,
						content: function () {
							player.removeMark("sup_paoxiao")
							player.storage.pao--
							player.recover()
						}
					},
					"sup_luoyi": {
						audio: "reluoyi",
						trigger: {
							player: "phaseDrawBegin1"
						},
						forced: true,
						locked: false,
						filter: function (event, player) {
							return !event.numFixed
						},
						group: ["reluoyi2"],
						content: function () {
							"step 0"
							var cards = get.cards(player.hp + 3)
							game.cardsGotoOrdering(cards)
							player.showCards(cards, "裸衣")
							game.delay(2)
							var cardsx = []
							var cardsx1 = []
							for (var i = 0; i < cards.length; i++) {
								if (get.subtype(cards[i]) == "equip1" || get.type(cards[i]) == "basic" || cards[i].name == "juedou") {
									cardsx.push(cards[i])
								} else {
									cardsx1.push(cards[i])
								}
							}
							event.cards = cardsx
							player.storage.cards1 = cardsx1
							player.chooseBool("是否" + (cardsx.length ? "获得" + get.translation(cardsx) : "") + "？").ai = function () {
								var num = player.hp
								return cardsx.length >= trigger.num
							}
							"step 1"
							trigger.changeToZero()
							if (result.bool) {
								if (cards.length) player.gain(cards, "gain2")
								//game.cardsDiscard(cards2);
								player.addTempSkill("sup_luoyi1", { player: "phaseBefore" })
							} else {
								if (player.storage.cards1.length) player.gain(player.storage.cards1, "gain2")
							}
						},
						ai: {
							threaten: 4
						}
					},
					"sup_luoyi1": {
						trigger: {
							player: "useCard"
						},
						forced: true,
						filter: function (event, player, trigger) {
							return event.card && event.card.name == "sha"
						},
						content: function () {
							trigger.directHit.addArray(game.players)
							player.removeSkill(event.name)
						}
					},
					"sup_dushuai": {
						audio: "ext:超界突破:2",
						trigger: {
							player: "phaseEnd"
						},
						init: function (player) {
							player.storage.dstype = 2
							player.addSkill("sup_dushuaifang")
						},
						check: function (event, player) {
							if (player.storage.dstype == 1) return player.countCards("h", "sha") <= 1
							return player.hp >= player.maxHp - 2
						},
						priority: 2,
						content: function () {
							if (player.storage.dstype == 2) {
								//player.loseMaxHp(4);
								player.storage.dstype = 1
								player.removeSkill("sup_dushuaifang")
								player.addSkill("sup_dushuaigong")
							} else {
								//player.gainMaxHp(4);
								player.storage.dstype = 2
								player.addSkill("sup_dushuaifang")
								player.removeSkill("sup_dushuaigong")
							}
						}
					},
					"sup_dushuaigong": {
						priority: -1,
						mod: {
							attackFrom: function (from, to, distance) {
								return distance - 2
							},
							cardUsable: function (card, player, num) {
								if (card.name == "sha") return num + 2
							}
						},
						init: function (player) {
							//player.loseMaxHp(4);
						},
						trigger: {
							player: "phaseDrawBegin2"
						},
						forced: true,
						filter: function (event, player) {
							return !event.numFixed
						},
						content: function () {
							trigger.num -= 1
						}
					},
					"sup_dushuaifang": {
						group: ["zishou2", "sup_dsf2"],
						trigger: {
							player: "phaseJieshuBegin"
						},
						init: function (player) {
							player.gainMaxHp(4)
							player.storage.fmh = 4
						},
						onremove: function (player) {
							if (player.storage.fmh > 0) player.loseMaxHp(player.storage.fmh)
						},
						forced: true,
						content: function () {
							player.draw(4)
						},
						priority: -1
					},
					"sup_dsf2": {
						trigger: {
							global: "phaseBegin"
						},
						forced: true,
						preHidden: true,
						filter: function (event, player) {
							return player.hujia < 2
						},
						content: function () {
							player.loseMaxHp(1)
							player.storage.fmh--
							player.changeHujia(1)
							player.draw()
						}
					},
					"sup_yaowu": {
						trigger: {
							player: "damageBegin3"
						},
						audio: "new_reyaowu",
						forced: true,
						filter: function (event, player) {
							return event.source&&event.source != player && event.source.isAlive()
						},
						content: function () {
							"step 0"
							player.damage(trigger.num * 2)
							"step 1"
							trigger.source.damage()
							//trigger[get.color(trigger.card)!='red'?'player':'source'].draw();
						}
					},
					"sup_kuangyong": {
						trigger: {
							source: "damageBegin1"
						},
						priority: -3,
						filter: function (event, player) {
							return event.player != player
						},
						forced: true,
						content: function () {
							if (player.hujia) trigger.num *= 2
							else player.changeHujia(1)
						},
						ai: {
							threaten: 3,
							damageBonus: true
						}
					},
					"sup_jizhi": {
						audio: "ext:超界突破:2",
						audioname: ["lukang"],
						locked: false,
						trigger: {
							global: "useCard"
						},
						frequent: true,
						filter: function (event) {
							return get.type(event.card, "trick") == "trick" && event.card.isCard
						},
						init: function (player) {
							player.storage.rejizhi = 0
						},
						content: function () {
							"step 0"
							player.draw()
							"step 1"
							event.card = result[0]
							if (get.type(event.card) == "basic") {
								player
									.chooseBool("是否弃置" + get.translation(event.card) + "并令本回合手牌上限+1？")
									.set("ai", function (evt, player) {
										return (
											(player.needsToDiscard() && player.countCards(event.card.name) > 2) ||
											(_status.currentPhase == player && player.needsToDiscard(-3) && _status.event.value < 6)
										)
									})
									.set("value", get.value(event.card, player))
							}
							"step 2"
							if (result.bool) {
								player.discard(event.card)
								player.storage.rejizhi++
								if (_status.currentPhase == player) {
									player.markSkill("rejizhi")
								}
							}
						},
						ai: {
							threaten: 1.4,
							noautowuxie: true
						},
						mod: {
							maxHandcard: function (player, num) {
								return num + player.storage.rejizhi
							}
						},
						intro: {
							content: "本回合手牌上限+#"
						},
						group: "rejizhi_clear",
						subSkill: {
							clear: {
								trigger: {
									global: "phaseAfter"
								},
								silent: true,
								content: function () {
									player.storage.rejizhi = 0
									player.unmarkSkill("rejizhi")
								},
								sub: true,
								forced: true,
								popup: false
							}
						}
					},
					"sup_qicai": {
						mod: {
							targetInRange: function (card, player, target, now) {
								var type = get.type(card)
								if (type == "trick" || type == "delay") return true
							},
							canBeDiscarded: function (card) {
								if (get.position(card) == "e" && ["equip2", "equip5"].contains(get.subtype(card))) return false
							}
						}
					},
					"sup_qixi": {
						audio: "ext:超界突破:2",
						audioname: ["re_ganning", "re_heqi"],
						enable: "chooseToUse",
						filterCard: function (card) {
							return get.color(card) == "black"
						},
						position: "hes",
						viewAs: {
							name: "sup_ganning_guohe"
						},
						mod: {
							cardname: function (card, player, name) {
								if (name == "guohe") return "sup_ganning_guohe"
							}
						},
						viewAsFilter: function (player) {
							if (!player.countCards("hes", { color: "black" })) return false
						},
						prompt: "将一张黑色牌当过河拆桥使用",
						check: function (card) {
							return 4 - get.value(card)
						},
						ai: {
							basic: {
								order: 9,
								useful: 5,
								value: 5
							},
							yingbian: function (card, player, targets, viewer) {
								if (get.attitude(viewer, player) <= 0) return 0
								if (
									game.hasPlayer(function (current) {
										return !targets.contains(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0
									})
								)
									return 6
								return 0
							},
							result: {
								target: function (player, target) {
									var att = get.attitude(player, target)
									var nh = target.countCards("h")
									if (att > 0) {
										if (
											target.countCards("j", function (card) {
												var cardj = card.viewAs ? { name: card.viewAs } : card
												return get.effect(target, cardj, target, player) < 0
											}) > 0
										)
											return 3
										if (target.getEquip("baiyin") && target.isDamaged() && get.recoverEffect(target, player, player) > 0) {
											if (target.hp == 1 && !target.hujia) return 1.6
										}
										if (
											target.countCards("e", function (card) {
												if (get.position(card) == "e") return get.value(card, target) < 0
											}) > 0
										)
											return 1
									}
									var es = target.getCards("e")
									var noe = es.length == 0 || target.hasSkillTag("noe")
									var noe2 =
										es.filter(function (esx) {
											return get.value(esx, target) > 0
										}).length == 0
									var noh = nh == 0 || target.hasSkillTag("noh")
									if (noh && (noe || noe2)) return 0
									if (att <= 0 && !target.countCards("he")) return 1.5
									return -1.5
								}
							},
							tag: {
								loseCard: 1,
								discard: 1
							}
						}
					},
					"sup_fenwei": {
						skillAnimation: true,
						animationColor: "wood",
						audio: "ext:超界突破:2",
						audioname: ["heqi"],
						unique: true,
						mark: true,
						limited: true,
						trigger: {
							global: "useCardToPlayered"
						},
						filter: function (event, player) {
							if (event.getParent().triggeredTargets3.length > 1) return false
							if (get.type(event.card) != "trick") return false
							if (get.info(event.card).multitarget) return false
							if (event.targets.length < 2) return false
							if (player.storage.fenwei) return false
							return true
						},
						init: function (player) {
							player.storage.fenwei = false
						},
						direct: true,
						content: function () {
							"step 0"
							player
								.chooseTarget(get.prompt("fenwei"), [1, trigger.targets.length], function (card, player, target) {
									return _status.event.targets.contains(target)
								})
								.set("ai", function (target) {
									var trigger = _status.event.getTrigger()
									if (game.phaseNumber > game.players.length * 2 && trigger.targets.length >= game.players.length - 1 && !trigger.excluded.contains(target)) {
										return -get.effect(target, trigger.card, trigger.player, _status.event.player)
									}
									return -1
								})
								.set("targets", trigger.targets)
							"step 1"
							if (result.bool) {
								player.awakenSkill("fenwei")
								player.logSkill("fenwei", result.targets)
								player.storage.fenwei = true
								trigger.getParent().excluded.addArray(result.targets)
								game.delay()
							}
						},
						intro: {
							content: "limited"
						}
					},
					"sup_yicong": {
						trigger: {
							player: ["changeHp"]
						},
						audio: "ext:超界突破:2",
						audioname: {
							gongsunzan: "yicong"
						},
						forced: true,
						filter: function (event, player) {
							return get.sgn(player.hp - 2.5) != get.sgn(player.hp - 2.5 - event.num)
						},
						content: function () {},
						mod: {
							globalFrom: function (from, to, current) {
								return current - 1
							},
							globalTo: function (from, to, current) {
								if (2 * to.hp <= to.maxHp) return current + 1
							}
						},
						ai: {
							threaten: 0.8
						},
						"audioname2": {
							"jsp_zhaoyun": "yicong_jsp_zhaoyun"
						}
					},
					"sup_qiaomeng": {
						audio: "ext:超界突破:2",
						trigger: {
							player: "useCardToPlayered"
						},
						direct: true,
						filter: function (event, player) {
							if (game.roundNumber > player.storage.sup_qiaomeng_round) {
								player.storage.sup_qiaomeng_n = 0
								player.storage.sup_qiaomeng_round = game.roundNumber
							}
							if (player.storage.sup_qiaomeng_n >= player.maxHp - player.hp) return false

							if (!event.isFirstTarget /*||get.color(event.card)!='black'*/) return false
							for (var i of event.targets) {
								if (
									i != player &&
									i.hasCard(function (card) {
										return lib.filter.canBeDiscarded(card, player, i)
									}, "he")
								)
									return true
							}
							return false
						},
						init: function (player) {
							player.storage.sup_qiaomeng_round = -1
							player.storage.sup_qiaomeng_n = 4396
						},
						content: function () {
							"step 0"
							player.storage.sup_qiaomeng_n++
							player
								.chooseTarget(
									get.prompt("dcqiaomeng"),
									"选择一名不为自己的目标角色，然后弃置其一张牌。若以此法弃置的牌为：装备牌，你获得此牌；锦囊牌，你令" +
										get.translation(trigger.card) +
										"不可被响应。",
									function (card, player, target) {
										return (
											target != player &&
											_status.event.getTrigger().targets.contains(target) &&
											target.hasCard(function (card) {
												return lib.filter.canBeDiscarded(card, player, target)
											}, "he")
										)
									}
								)
								.set("ai", function (target) {
									var player = _status.event.player
									return get.effect(target, { name: "guohe_copy2" }, player, player)
								})
							"step 1"
							if (result.bool) {
								var target = result.targets[0]
								player.logSkill("dcqiaomeng", target)
								player.discardPlayerCard(target, true, "he")
							} else event.finish()
							"step 2"
							if (result.bool && result.cards && result.cards.length) {
								//为了体现白马义从野性纯真的美 直接获取卡牌原类型 不考虑维系区域
								var card = result.cards[0],
									type = get.type2(card, false)
								if (type == "trick") trigger.directHit.addArray(game.filterPlayer(current => current != player))
								if (type == "equip" && get.position(card, true) == "d") player.gain(card, "gain2")
							}
						}
					},
					"sup_zishu": {
						trigger: {
							player: "gainAfter",
							global: "loseAsyncAfter"
						},
						audio: "zishu",
						forced: true,
						locked: true,
						filter: function (event, player) {
							if (event.getg(player).length == 0) return false
							return event.getParent(2).name != "sup_zishu"
						},
						content: function () {
							"step 0"
							event.n = trigger.cards.length
							"step 1"
							if (event.n == 0) {
								event.finish()
							} else {
								player.draw("nodelay")
							}
							"step 2"
							event.n -= 1
							event.goto(1)
						},
						ai: {
							expose: 0.3,
							threaten: 2.5
						}
					},
					"sup_yingyuan": {
						audio: "ext:超界突破:2",
						trigger: {
							player: ["useCardAfter", "respond"]
						},
						direct: true,
						filter: function (event, player) {
							//if(_status.currentPhase!=player) return false;
							//if(player.getHistory('custom',function(evt){
							//return evt.yingyuan_name==event.card.name;
							//}).length>0) return false;
							return event.cards.filterInD().length > 0
						},
						content: function () {
							"step 0"
							player
								.chooseTarget(get.prompt("yingyuan"), "将" + get.translation(trigger.cards) + "交给一名其他角色", function (card, player, target) {
									return target != player
								})
								.set("ai", function (target) {
									if (target.hasJudge("lebu")) return 0
									var att = get.attitude(_status.event.player, target)
									if (att < 3) return 0
									if (target.hasSkillTag("nogain")) att /= 10
									if (target.hasSha() && _status.event.sha) {
										att /= 5
									}
									if (event.wuxie && target.needsToDiscard(1)) {
										att /= 5
									}
									return att / (1 + get.distance(player, target, "absolute"))
								})
								.set("sha", trigger.cards[0].name == "sha")
								.set("wuxie", trigger.cards[0].name == "wuxie")
							"step 1"
							if (result.bool) {
								player.logSkill("yingyuan", result.targets[0])
								result.targets[0].gain(trigger.cards.filterInD(), "gain2")
								player.getHistory("custom").push({ yingyuan_name: trigger.card.name })
							}
						}
					},
					"sup_jueqing": {
						trigger: {
							source: "damageBegin3"
						},
						priority:6549879,
						forced: true,
						audio: "ext:超界突破:2",
						check: function () {
							return false
						},
						content: function () {
							trigger.player.loseHp(trigger.num);
							// trigger.player.loseHp(1)
						},
						ai: {
							jueqing: true
						}
					},
					"sup_shangshi": {
						audio: "ext:超界突破:2",
						trigger: {
							player: ["loseAfter", "changeHp", "gainMaxHpAfter", "loseMaxHpAfter"],
							global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"]
						},
						frequent: true,
						filter: function (event, player) {
							if (event.getl && !event.getl(player)) return false
							return player.countCards("h") < player.maxHp + player.getDamagedHp()
						},
						content: function () {
							player.draw(player.maxHp + player.getDamagedHp() - player.countCards("h"))
						},
						ai: {
							threaten: 2.5,
							noh: true,
							skillTagFilter: function (player, tag) {
								if (tag == "noh" && player.maxHp - player.hp < player.countCards("h")) {
									return false
								}
							}
						}
					},
					"sup_meibu": {
						audio: "meibu",
						trigger: {
							global: "phaseUseBegin"
						},
						filter: function (event, player) {
							return event.player != player && event.player.isAlive() /*&&player.countCards('he')>0*/ && !event.player.hasSkill("sup_zhixi")
						},
						direct: false,
						derivation: ["sup_zhixi"],
						checkx: function (event, player) {
							if (get.attitude(player, event.player) > 0) return false
							var e2 = player.getEquip(2)
							if (e2) {
								if (e2.name == "tengjia") return true
								if (e2.name == "bagua") return true
							}
							return true || event.player.countCards("h") > event.player.hp
						},
						check: function (event, player) {
							if (get.attitude(player, event.player) > 0) return false
							var e2 = player.getEquip(2)
							if (e2) {
								if (e2.name == "tengjia") return true
								if (e2.name == "bagua") return true
							}
							return true || player.countCards("h", "shan") > 0
						},
						content: function () {
							"step 0"
							var check = lib.skill.new_meibu.checkx(trigger, player)
							//player.chooseToDiscard(get.prompt2('new_meibu',trigger.player),'he').set('ai',function(card){
							//if(_status.event.check) return 6-get.value(card);
							//return 0;
							//}).set('check',check).set('logSkill','new_meibu');
							"step 1"
							//if(result.bool){
							if (player.hp > player.maxHp - player.hp) {
								player.loseHp()
								player.draw()
							}
							var target = trigger.player
							//var card=result.cards[0];
							player.line(target, "green")
							target.addTempSkill("sup_zhixi", "phaseUseAfter")
							//if(card.name!='sha'&&get.type(card)!='trick'&&get.color(card)!='black'){
							target.addTempSkill("new_meibu_range", "phaseUseEnd")
							target.storage.meibu = player
							//}

							target.storage.sly = player
							target.storage.sly_dead = false
							//target.markSkillCharacter('sup_meibu',player,'魅步','锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。');
							//}
						},
						ai: {
							expose: 0.3,
							threaten: 1.5
						},
						subSkill: {
							range: {
								mod: {
									globalFrom: function (from, to, num) {
										if (to == from.storage.meibu) {
											return -Infinity
										}
									}
								},
								sub: true
							}
						}
					},
					"sup_mumu": {
						audio: "mumu",
						trigger: {
							player: "phaseUseBegin"
						},
						direct: true,
						content: function () {
							"step 0"
							player
								.chooseTarget(get.prompt("new_mumu"), "弃置一名角色装备区内的一张牌，或者获得一名角色装备区内的防具牌", function (card, player, target) {
									if (target == player) return target.getEquip(2) != undefined
									return target.countCards("e") > 0
								})
								.set("ai", function (target) {
									var player = _status.event.player
									var att = get.attitude(player, target)
									if (target.getEquip(2) && player.isEmpty(2)) {
										return -2 * att
									}
									return -att
								})
							"step 1"
							if (result.bool && result.targets && result.targets.length) {
								event.target = result.targets[0]
								player.logSkill("new_mumu", event.target)
								player.line(event.target, "green")
								var e = event.target.getEquip(2)
								event.e = e
								if (target == player) event.choice = "获得一张防具牌"
								else if (e) {
									player.chooseControl("弃置一张装备牌", "获得一张防具牌").set("ai", function () {
										if (_status.event.player.getEquip(2)) {
											return "弃置一张装备牌"
										}
										return "获得一张防具牌"
									})
								} else {
									event.choice = "弃置一张装备牌"
								}
							} else event.finish()
							"step 2"
							var choice = event.choice || result.control
							if (choice == "弃置一张装备牌") {
								player.discardPlayerCard(event.target, "e", true)
							} else {
								if (event.e) {
									player.gain(event.e, event.target, "give", "bySelf")
									player.addTempSkill("new_mumu2")
								}
							}
						}
					},
					"sup_zhixi": {
						mod: {
							cardEnabled: function (card, player) {
								var p = player.storage.sly
								var num = 1
								//if(!target.storage.sly_dead)
								num = p.hp

								if (player.countMark("sup_zhixi") > num || player.countMark("sup_zhixi") > player.hp) return false
							},
							cardUsable: function (card, player) {
								var p = player.storage.sly
								var num = 1
								//if(!target.storage.sly_dead)
								num = p.hp
								if (player.countMark("sup_zhixi") > num || player.countMark("sup_zhixi") > player.hp) return false
							},
							cardRespondable: function (card, player) {
								var p = player.storage.sly
								var num = 1
								//if(!target.storage.sly_dead)
								num = p.hp
								if (player.countMark("sup_zhixi") > num || player.countMark("sup_zhixi") > player.hp) return false
							},
							cardSavable: function (card, player) {
								var p = player.storage.sly
								var num = 1
								//if(!target.storage.sly_dead)
								num = p.hp
								if (player.countMark("sup_zhixi") > num || player.countMark("sup_zhixi") > player.hp) return false
							}
						},
						trigger: {
							player: ["useCard1", "respond"]
						},
						group: ["sup_zhixi2"],
						forced: true,
						popup: false,
						onremove: function (player) {
							player.unmarkSkill("sup_meibu")
							delete player.storage.sup_zhixi
							delete player.storage.sup_zhixi2
						},
						firstDo: true,
						init: function (player, skill) {
							player.storage[skill] = 0
							var evt = _status.event.getParent("phaseUse")
							if (evt && evt.player == player) {
								player.getHistory("useCard", function (evtx) {
									if (evtx.getParent("phaseUse") == evt) {
										player.storage[skill]++
										//if(get.type2(evtx.card)=='trick') player.storage.new_zhixi2=true;
									}
								})
							}
						},
						mark: true,
						marktext: "止息",
						intro: {
							content: "当前有#个标记"
						},
						content: function () {
							var p = player.storage.sly
							var num = 0
							//if(!target.storage.sly_dead)
							num = p.maxHp - p.hp
							//else
							//num = player.storage.sly_maxHp;
							if (num == 0) num = 1
							player.chooseToDiscard("he", num, true)
							player.addMark("sup_zhixi", num)
							//player.die();
							//if(get.type2(trigger.card)=='trick') player.storage.new_zhixi2=true;
						},
						ai: {
							presha: true,
							pretao: true,
							nokeep: true
						}
					},
					"sup_zhixi2": {
						trigger: {
							source: "damageBegin1"
						},
						priority: -4,
						filter: function (event) {
							return true
						},
						forced: true,
						content: function () {
							if (trigger.num > 1) trigger.num = 1
						},
						ai: {
							damageBonus: true
						}
					},
					"sup_luanji": {
						audio: "ext:超界突破:2",
						enable: "phaseUse",
						trigger: {
							source: "damageEnd"
						},
						viewAs: {
							name: "wanjian"
						},
						forced: true,
						locked: false,
						filter: function (event, player) {
							if (event.name == "chooseToUse") return player.countCards("h") > 0 && !player.hasSkill("luanji")
							var evt = event.getParent(2)
							var p = event.player
							var l = player.storage.luanji_players
							//for(var i = 0;i < l.length;++i){
							//if(l[i] == evt.getParent().player) return false;
							//}
							return evt.card && evt.card.name == "wanjian" && !l.contains(p) //&&evt.getParent().player==player;
						},
						filterCard: true,
						selectCard: -1,
						position: "h",
						prompt: "将所有手牌当【万箭齐发】使用",
						check: function (card) {
							var player = _status.event.player
							var targets = game.filterPlayer(function (current) {
								return player.canUse("wanjian", current)
							})
							var num = 0
							for (var i = 0; i < targets.length; i++) {
								var eff = get.sgn(get.effect(targets[i], { name: "wanjian" }, player, player))
								if (targets[i].hp == 1) {
									eff *= 1.5
								}
								num += eff
							}
							if (!player.needsToDiscard(-1)) {
								if (targets.length >= 7) {
									if (num < 1) return 0
								} else if (targets.length >= 5) {
									if (num < 0.5) return 0
								}
							}
							return 6
						},
						init: function (player) {
							player.storage.luanji_num = 1
							player.storage.luanji_players = []
						},
						content: function () {
							player.draw(player.storage.luanji_num)
							player.storage.luanji_players.push(trigger.player)
							if (player.storage.luanji_num > 1) player.storage.luanji_num--
						},
						precontent: function () {
							player.addTempSkill("luanji", "phaseUseAfter")
							player.storage.luanji_num = 1
							player.storage.luanji_players = []
						},
						ai: {
							threaten: 1.6,
							wuxie: function (target, card, player, viewer) {
								if (get.attitude(viewer, target) > 0 && target.countCards("h", "shan")) {
									if (!target.countCards("h") || target.hp == 1 || Math.random() < 0.7) return 0
								}
							},
							basic: {
								order: 9,
								useful: 1,
								value: 5
							},
							result: {
								player:function (player, target) {
									return game.players.length
								},
								"target_use": function (player, target) {
									if (player.hasUnknown(2) && get.mode() != "guozhan") return 0
									var nh = target.countCards("h")
									if (get.mode() == "identity") {
										if (target.isZhu && nh <= 2 && target.hp <= 1) return -100
									}
									if (nh == 0) return -2
									if (nh == 1) return -1.7
									return -1.5
								},
								target: function (player, target) {
									var nh = target.countCards("h")
									if (get.mode() == "identity") {
										if (target.isZhu && nh <= 2 && target.hp <= 1) return -100
									}
									if (nh == 0) return -2
									if (nh == 1) return -1.7
									return -1.5
								}
							},
							tag: {
								respond: 1,
								respondShan: 1,
								damage: 1,
								multitarget: 1,
								multineg: 1
							}
						},
						subSkill: {
							used: {
								charlotte: true,
								sub: true
							}
						}
					},
					"sup_xueyi": {
						audio: "xueyi",
						trigger: {
							global: "phaseBefore"
						},
						forced: true,
						zhuSkill: true,
						unique: true,
						filter: function (event, player) {
							return !player.storage.sup_xueyi_inited && player.hasZhuSkill("sup_xueyi")
						},
						content: function () {
							player.storage.sup_xueyi_inited = true
							var num = game.countPlayer(function (current) {
								return current.group == "qun"
							})
							if (num) player.addMark("sup_xueyi", num)
						},
						marktext: "裔",
						intro: {
							"name2": "裔",
							content: "mark"
						},
						mod: {
							maxHandcard: function (player, num) {
								if (player.hasZhuSkill("sup_xueyi")) return num + player.countMark("sup_xueyi")
							}
						},
						group: "sup_xueyi1"
					},
					"sup_xueyi1": {
						audio: "xueyi",
						enable: "chooseToUse",
						trigger: {
							global: "dying"
						},
						filter: function (event, player) {
							if (!player.hasZhuSkill("sup_xueyi") || !player.hasMark("sup_xueyi")) return false
							return event.player.hp <= 0
						},
						check: function (event, player) {
							if (get.attitude(player, event.player) <= 0) return false
							if (
								player.countCards("h", function (card) {
									var mod2 = game.checkMod(card, player, "unchanged", "cardEnabled2", player)
									if (mod2 != "unchanged") return mod2
									var mod = game.checkMod(card, player, event.player, "unchanged", "cardSavable", player)
									if (mod != "unchanged") return mod
									var savable = get.info(card).savable
									if (typeof savable == "function") savable = savable(card, player, event.player)
									return savable
								}) >=
								1 - event.player.hp
							)
								return false
							return true
						},
						content: function () {
							player.removeMark("sup_xueyi", 1)
							if(trigger.player != null){
								trigger.player.recover(1)
								trigger.player.changeHujia(1)
								trigger.player.draw(1)
							}
						},
						ai: {
							order: 7,
							save: true,
							skillTagFilter: function (player, tag, target) {
								if (player != target || !player.hasZhuSkill("sup_xueyi") || !player.hasMark("sup_xueyi")) return false
							},
							result: {
								player: function (player) {
									return player.isDamaged() ? 1 : -1
								}
							}
						}
					},
					"sup_jiuchi": {
						mod: {
							cardUsable: function (card, player, num) {
								if (card.name == "jiu") return Infinity
							}
						},
						audio: "ext:超界突破:2",
						enable: "chooseToUse",
						filterCard: function (card) {
							return get.suit(card) == "spade"
						},
						viewAs: {
							name: "jiu"
						},
						position: "hs",
						viewAsFilter: function (player) {
							return player.hasCard(card => get.suit(card) == "spade", "hs")
						},
						prompt: "将一张黑桃手牌当酒使用",
						check: function (cardx, player) {
							if (player && player == cardx.player) return true
							if (_status.event.type == "dying") return 1
							var player = _status.event.player
							var shas = player.getCards("hs", function (card) {
								return card != cardx && get.name(card, player) == "sha"
							})
							if (!shas.length) return -1
							if (shas.length > 1 && (player.getCardUsable("sha") > 1 || player.countCards("hs", "zhuge"))) {
								return 0
							}
							shas.sort(function (a, b) {
								return get.order(b) - get.order(a)
							})
							var card = false
							if (shas.length) {
								for (var i = 0; i < shas.length; i++) {
									if (shas[i] != cardx && lib.filter.filterCard(shas[i], player)) {
										card = shas[i]
										break
									}
								}
							}
							if (card) {
								if (
									game.hasPlayer(function (current) {
										return (
											get.attitude(player, current) < 0 &&
											!current.hasShan() &&
											current.hp + current.countCards("h", { name: ["tao", "jiu"] }) > 1 + (player.storage.jiu || 0) &&
											player.canUse(card, current, true, true) &&
											!current.hasSkillTag("filterDamage", null, {
												player: player,
												card: card,
												jiu: true
											}) &&
											get.effect(current, card, player) > 0
										)
									})
								) {
									return 4 - get.value(cardx)
								}
							}
							return -1
						},
						ai: {
							threaten: 1.5,
							basic: {
								useful: function (card, i) {
									if (_status.event.player.hp > 1) {
										if (i == 0) return 4
										return 1
									}
									if (i == 0) return 7.3
									return 3
								},
								value: function (card, player, i) {
									if (player.hp > 1) {
										if (i == 0) return 5
										return 1
									}
									if (i == 0) return 7.3
									return 3
								}
							},
							order: function () {
								return get.order({ name: "sha" }) + 0.2
							},
							result: {
								target: function (player, target) {
									if (target && target.isDying()) return 2
									if (target && !target.isPhaseUsing()) return 0
									if (lib.config.mode == "stone" && !player.isMin()) {
										if (player.getActCount() + 1 >= player.actcount) return 0
									}
									var shas = player.getCards("h", "sha")
									if (shas.length > 1 && (player.getCardUsable("sha") > 1 || player.countCards("h", "zhuge"))) {
										return 0
									}
									shas.sort(function (a, b) {
										return get.order(b) - get.order(a)
									})
									var card
									if (shas.length) {
										for (var i = 0; i < shas.length; i++) {
											if (lib.filter.filterCard(shas[i], target)) {
												card = shas[i]
												break
											}
										}
									} else if (player.hasSha() && player.needsToDiscard()) {
										if (player.countCards("h", "hufu") != 1) {
											card = { name: "sha" }
										}
									}
									if (card) {
										if (
											game.hasPlayer(function (current) {
												return (
													get.attitude(target, current) < 0 &&
													target.canUse(card, current, null, true) &&
													!current.hasSkillTag("filterDamage", null, {
														player: player,
														card: card,
														jiu: true
													}) &&
													get.effect(current, card, target) > 0
												)
											})
										) {
											return 1
										}
									}
									return 0
								}
							},
							tag: {
								save: 1,
								recover: 0.1
							}
						},
						trigger: {
							source: "damageEnd"
						},
						group: ["sup_jiuchi2","sup_jiuchi_dying"],
						locked: true,
						forced: true,
						filter: function (event, player) {
							if (event.name == "chooseToUse") return player.hasCard(card => get.suit(card) == "spade", "hs")
							return event.card && event.card.name == "sha" && event.getParent(2).jiu == true && !player.hasSkill("oljiuchi_air")
						},
						content: function () {
							player.logSkill("oljiuchi")
							player.addTempSkill("oljiuchi_air")
						},
						subSkill: {
							dying: {
								trigger:{
									global: ["dyingBegin"],
								},
								filter:function(event,player){
									return player.maxHp > 1;
								},
								content: function(){
									player.useCard({name:'jiu',isCard:false},player);
								},
								ai:{
									order:1,
									save:true,
									result:{
										player:function(player){
											return 1000;
										},
									},
								}

							}
						}
					},
					"sup_roulin": {
						audio: "ext:超界突破:2",
						audioname: ["re_dongzhuo", "ol_dongzhuo"],
						trigger: {
							player: "useCardToPlayered",
							target: "useCardToTargeted"
						},
						forced: true,
						filter: function (event, player) {
							//if(event.card.name!='sha') return false;
							if (player == event.player) {
								return event.target.hasSex("female")
							}
							return event.player.hasSex("female")
						},
						content: function () {
							trigger.directHit.addArray(game.players)
							/*var id=(player==trigger.player?trigger.target:player).playerid;
        var map=trigger.getParent().customArgs;
        if(!map[id]) map[id]={};
        if(typeof map[id].shanRequired=='number'){
            map[id].shanRequired++;
            map[id].shanRequired++;
        }
        else{
            map[id].shanRequired=3;
        }*/
						},
						ai: {
							"directHit_ai": true,
							skillTagFilter: function (player, tag, arg) {
								if (arg.card.name != "sha" || !arg.target.hasSex("female") || arg.target.countCards("h", "shan") > 1) return false
							}
						}
					},
					"sup_benghuai": {
						audio: "ext:超界突破:2",
						audioname: ["zhugedan", "re_dongzhuo", "ol_dongzhuo"],
						trigger: {
							player: "phaseJieshuBegin"
						},
						forced: true,
						check: function () {
							return false
						},
						filter: function (event, player) {
							return !player.isMinHp() && !player.hasSkill("oljiuchi_air") && !player.hasSkill("supjiuchi_air")
						},
						content: function () {
							"step 0"
							//player.chooseControl('baonue_hp','baonue_maxHp',function(event,player){
							//if(player.hp==player.maxHp) return 'baonue_hp';
							//if(player.hp<player.maxHp-1||player.hp<=2) return 'baonue_maxHp';
							//return 'baonue_hp';
							//}).set('prompt','崩坏：失去1点体力或减1点体力上限');
							"step 1"
							//if(result.control=='baonue_hp'){
							var n = 0
							while (n * 2 < player.hp) n++
							player.loseHp(n)
							//}
							//else{
							//player.loseMaxHp(true);
							//}
						},
						ai: {
							threaten: 0.5,
							neg: true
						}
					},
					"sup_baonue": {
						audio: "ext:超界突破:2",
						unique: true,
						zhuSkill: true,
						trigger: {
							global: "damageSource"
						},
						filter: function (event, player) {
							if (!event.source || event.source.group != "qun") return false
							return player.hasZhuSkill("supbaonue", event.source)
						},
						direct: true,
						content: function () {
							"step 0"
							event.count = trigger.num
							"step 1"
							event.count--
							player.chooseBool("是否发动【暴虐】？").set("choice", get.attitude(player, player) > 0)
							"step 2"
							if (result.bool) {
								player.logSkill("olbaonue", trigger.source)
								player
									.judge(function (card) {
										if (get.suit(card) == "spade") return 4
										return 0
									})
									.set("callback", function () {
										if (event.judgeResult.suit == "spade") {
											player.gainMaxHp()
											if (get.position(event.judgeResult.card, true) == "o") player.gain(event.judgeResult.card, "gain2", "log")
										}
									}).judge2 = function (result) {
									return result.bool ? true : false
								}
							} else {
								event.finish()
							}
							"step 3"
							if (event.count) event.goto(1)
						}
					},
					"sup_zhonghui": {
						audio: "ext:超界突破:2",
						forbid: [],
						trigger: {
							player: "die"
						},
						forceDie: true,
						skillAnimation: true,
						animationColor: "gray",
						filter: function (event) {
							return event.source && event.source.isIn()
						},
						check: function (event, player) {
							if (get.attitude(player, event.source) > 0) return false
							return true
						},
						content: function () {
							var skl = "sup_zhonghui1"
							//trigger.source.removeSkills(skl);
							trigger.source.addSkill(skl)
							var target = trigger.source
							target.storage.sly = player
							var n = player.maxHp
							target.storage.sly_maxHp = n
							target.storage.sly_dead = true

							//var card=result.cards[0];
							//player.line(target,'green');
							//target.addTempSkill('sup_zhixi','phaseUseAfter');
							//if(card.name!='sha'&&get.type(card)!='trick'&&get.color(card)!='black'){
							//target.addTempSkill('new_meibu_range','phaseUseEnd');
							//target.storage.meibu=player;
							//}
							target.storage.sly = player
						},
						logTarget: "source",
						ai: {
							threaten: function (player, target) {
								if (target.hp == 1) return 0.2
								return 1.5
							},
							effect: {
								target: function (card, player, target, current) {
									if (!target.hasFriend()) return
									if (target.hp <= 1 && get.tag(card, "damage")) return [1, 0, 0, -2]
								}
							}
						}
					},
					"sup_zhonghui1": {
						audio: "meibu",
						trigger: {
							player: "phaseUseBegin"
						},
						filter: function (event, player) {
							return true
							//return event.player!=player&&event.player.isAlive()/*&&player.countCards('he')>0*/&&!event.player.hasSkill('sup_zhixi');
						},
						direct: true,
						content: function () {
							"step 0"
							//var check=lib.skill.new_meibu.checkx(trigger,player);
							//player.chooseToDiscard(get.prompt2('new_meibu',trigger.player),'he').set('ai',function(card){
							//if(_status.event.check) return 6-get.value(card);
							//return 0;
							//}).set('check',check).set('logSkill','new_meibu');
							"step 1"
							//if(result.bool){
							//if(player.hp > player.maxHp - player.hp){
							//player.loseHp();
							//player.draw();
							//}
							var target = player
							//var card=result.cards[0];
							//player.line(target,'green');
							target.addTempSkill("sup_zhixi", "phaseUseAfter")
							//if(card.name!='sha'&&get.type(card)!='trick'&&get.color(card)!='black'){
							//target.addTempSkill('new_meibu_range','phaseUseEnd');
							target.storage.meibu = player.storage.sly
							//}
							target.storage.sly = player.storage.sly
							//player.addTempSkill('sup_zhixi');
							//if(card.name!='sha'&&get.type(card)!='trick'&&get.color(card)!='black'){
							//target.addTempSkill('new_meibu_range','phaseUseEnd');
							//target.storage.meibu=player;
							//}
							"step 2"
							//player.die();
							//target.storage.sly=player;
							//target.markSkillCharacter('sup_meibu',player,'魅步','锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。');
							//}
						},
						ai: {}
					},
					"sup_jiuchi2": {
						audio: "ext:超界突破:2",
						trigger: {
							player: ["useCardAfter"]
						},
						direct: true,
						filter: function (event, player) {
							return event.card && event.card.name == "jiu"
						},
						content: function () {
							"step 0"
							var n = 0
							while (n * 2 < player.maxHp - player.hp) n++
							player.recover(n)
							"step 1"
							n = player.maxHp - player.hp
							if (n > 0) {
								player.loseMaxHp(n)
								player.draw(n)
							}
						}
					},
					"zioy_tianwei": {
						trigger: {
							player: "useSkillAfter"
						},
						direct:true,
						frequent: false,
						filter: function (event, player) {
							//if(event.getg(player).length==0) return false;
							return true || event.getParent(2).name == "wangwu" || event.getParent(2).name == "sup_liyu"
						},
						content: function () {
							"step 0"
							var X = player.maxHp / 2
							if (player.hp > 2 && player.hp > X) player.damage(2)
							else if (player.hp > 2 && player.hp <= X) {
								player.loseMaxHp(2)
								player.draw()
							} else if (player.hp <= 2 && player.maxHp <= 2) {
								player.gainMaxHp(3)
								player.recover()
							} else {
								player.changeHujia(1)
								player.loseMaxHp(2)
							}
						}
					}
				},
				translate: {
					supfanjian: "反间",
					"supfanjian_info": "出牌阶段限两次，你可以展示一张手牌并选择一名角色，然后该角色选择一项：展示其手牌并弃置所有与此牌花色不同的牌，或失去一点体力。",
					yeba: "业霸",
					"yeba_info":
						"当你造成伤害时，你可摸X张牌，并令此伤害+X，你每以此法摸一张牌，就有50%概率回复一点体力。( X为你上一次发动〖业霸〗后发动〖奸雄〗的次数）",
					supjianxiong: "奸雄",
					"supjianxiong_info": "当你受到1点伤害后，你可以获得对你造成伤害的牌并摸一张牌，若无法获得对你造成伤害的牌，则改为摸两张牌。",
					supkongcheng: "空城",
					"supkongcheng_info": "锁定技，当你没有手牌时，你不能成为除【万箭齐发】外其他牌的目标。",
					supguanxing: "观星",
					"supguanxing_info": "准备阶段与结束阶段，你可以观看牌堆顶的7张牌，并将其以任意顺序置于牌堆项或牌堆底。",
					taoyuan: "桃园",
					"taoyuan_info": "觉醒技，准备阶段，若你的体力值小于3，你减1点体力上限，摸3张牌，并获得技能〖武圣〗和〖咆哮〗。",
					suprende: "仁德",
					"suprende_info": "出牌阶段，你可以将至多两张手牌交给其他角色，你于此阶段每给出两张牌，你从牌堆顶摸随机一至两张牌",
					supjiuyuan: "救援",
					"supjiuyuan_info": "主公技，其他吴势力角色对自己使用【桃】时，若其体力值大于你，则其可以选择令你回复1点体力，然后其摸1张牌。",
					supzhiheng: "制衡",
					"supzhiheng_info":
						// "①:你始终跳过你的摸牌阶段，你的手牌上限减一且始终大于1。<br>②:\
						"出牌阶段限两次，你可以弃置任意张牌并摸等量加一的牌，若你在发动〖制衡〗时弃置了所有手牌，则你多摸一张牌。",
					supyingzi: "英姿",
					"supyingzi_info": "锁定技，摸牌阶段摸牌时，你额外摸2张牌；你的手牌上限始终为你的体力上限加一。",
					suptuxi: "突袭",
					"suptuxi_info":
						"摸牌阶段摸牌时，若其他角色区域内有牌，你可以放弃摸牌，改为选择至多X名角色，你获得其中每名角色各一张牌，若你体力值不大于其则额外对其造成1点伤害。然后你摸Y(若Y=0则为1)张牌并减少Y点体力上限，并使你下一次摸牌阶段摸牌时摸牌数+1(X为你的体力上限，Y=〖突袭〗选择的目标数/2且向下取整)。",
					supleiji: "雷击",
					"supleiji_info":
						"当你使用或打出一张【闪】，【雷杀】或【闪电】时，你可令一名其他角色进行一次判定：若结果为黑色，其受到随机1到4点的雷电伤害，否则你摸随机1到4张牌。",
					supguidao: "鬼道",
					"supguidao_info":
						"①:你的手牌上限加X。<br>②:一名角色的判定牌生效前，你可以打出一张牌替换之。(X初始为1~3中随机值，每次发动〖鬼道〗时X值按[1,2,3]顺序循环变化)。",
					"sup_wushuang": "无双",
					"sup_wushuang_info":
						"锁定技，你废除你的武器栏，你的【闪】均视为【酒】，你的攻击范围+1，你的杀可多指定两个目标。当你使用【杀】或【决斗】指定目标后，你令此牌需要依次使用或打出两张【闪】或【杀】响应。",
					"sup_liyu": "利驭",
					"sup_liyu_info":
						"每回合限两次，当你对一名角色造成伤害后，你可以获得其区域内的一张牌。若此牌不为装备牌，则你与其各摸一张牌。若此牌为装备牌，视为你对另一名角色使用一张【决斗】。",
					wangwu: "妄武",
					"wangwu_info": "出牌阶段，你可以将一张武器牌重铸为杀。",
					"sup_jingti": "惊啼",
					"sup_jingti_info":
						"锁定技<br>①你的手牌上限+X(X为你的护甲值)。<br>②:当你令一名角色进入濒死状态或令一名角色死亡时，你令该角色体力上限-1(若该角色死亡则不减),然后:若你体力上限小于7，你体力上限+1; 若你手牌数小于7，你摸一张牌; 若你没有护甲，你获得一点护甲。",
					"jump_Pdraw": "制衡",
					"jump_Pdraw_info": "制衡①部分",
					"sup_luoshen": "洛神",
					"sup_luoshen_info":
						"锁定技，准备阶段，若当前轮数为2的倍数，你失去一点体力上限，否则你回复一点体力。然后你进行判定，若结果不为红桃则获得此判定牌，且可重复此流程至多20次直到出现红桃的判定结果。你通过〖洛神〗获得的牌不计入手牌上限",
					"sup_qinguo": "倾国",
					"sup_qinguo_info": "你可以将一张牌当做【闪】使用或打出。",
					"sup_keji": "克己",
					"sup_keji_info": "锁定技，弃牌阶段开始时，若你于本回合的出牌阶段内没有过使用或打出过【杀】，则你摸X张牌，加一点体力上限并跳过此阶段(X为你当前体力)。",
					"sup_qinxue": "勤学",
					"sup_qinxue_info": "觉醒技。准备阶段或结束阶段开始时，若你的手牌数减体力值大于6，则你回复1点体力并两张牌，获得技能【攻心】。",
					"sup_botu": "博图",
					"sup_botu_info": "结束阶段，若本回合内置入弃牌堆的牌中包含至少四种花色，则你可获得一个额外的回合。",
					"sup_jijiang1": "激将",
					"sup_jijiang1_info": "激将询问模块",
					"sup_jiang": "激昂",
					"sup_jiang_info": "每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或【杀】时，你可以摸一张牌。",
					"sup_hunzi": "魂姿",
					"sup_hunzi_info":
						"觉醒技，一名角色的回合结束后，若你的体力值小于等于1~3中一随机值，你失去1点体力上限并回复1点体力，然后获得技能〖英姿〗，〖英魂〗，〖制衡〗，并将〖激昂〗触发条件中的红色的【杀】修改为【杀】，然后你进行一个额外的回合。",
					"sup_yijue": "义绝",
					"sup_yijue_info":
						"出牌阶段限两次，你可以令一名区域内有牌且已受伤且本回合未成为【义绝】目标的其他角色展示一张牌。若此牌为黑色，则该角色不能使用或打出牌，非锁定技失效直到回合结束。若此牌为红色，则你可以获得此牌，并可以令其回复一点体力且你与其摸一张牌。",
					"sup_wusheng": "武圣",
					"sup_wusheng_info": "你可以将一张红色牌当做【杀】使用或打出。出牌阶段你可多使用一张【杀】，你使用的杀没有距离限制，你使用【杀】造成的伤害翻倍。",
					"sup_yijue2": "义绝",
					"sup_yijue2_info": "出杀限制",
					"sup_wusheng1": "武圣",
					"sup_wusheng1_info": "伤害*=2",
					"sup_zhoushui": "骤水",
					"sup_zhoushui_info": "限定技，本局游戏第三轮以后你的出牌阶段，你可弃置两张牌并选择一名其他角色，该角色弃置其所有装备牌并失去一点体力。",
					"sup_new_guixin_fix": "归心",
					"sup_new_guixin_fix_info": "当你受到1点伤害后，你可以按照你选择的区域优先度随机获得每名其他角色区域里的一张牌，然后你翻面。",
					"sup_paoxiao": "咆哮",
					"sup_paoxiao_info":
						"①锁定技，出牌阶段你的杀使用次数增加X，你的杀可以多指定X名角色。<br>②出牌阶段，你可以弃置X+1张牌并失去一点体力(体力值小于2则不失去)，视为使用一张【杀】。<br>③当你造成伤害时，若你体力值大于1且你的'咆'数量大于2，你令此伤害+1。然后你失去1点体力值并获得等同于伤害值数量的'咆'<br>④一名角色的回合结束阶段，你失去一半数量的'咆'(向下取整)并回复相等数量的体力，若你回复体力大于0，你从牌堆中获得一张【杀】。然后你摸等同于溢出回复量的牌。<br>⑤当你令一名角色死亡时，你失去一个'咆'并回复一点体力。(X为你'咆'的数量)",
					"sup_paoxiao1": "咆哮",
					"sup_paoxiao1_info": "造成伤害时",
					"sup_paoxiao2": "咆哮",
					"sup_paoxiao2_info": "回合结束时",
					"sup_paoxiao3": "咆哮",
					"sup_paoxiao3_info": "出牌阶段",
					"sup_paoxiao4": "咆哮",
					"sup_paoxiao4_info": "杀人",
					"sup_luoyi": "裸衣",
					"sup_luoyi_info":
						"锁定技<br>①你使用【杀】和【决斗】造成的伤害+1。<br>②摸牌阶段开始时，你放弃摸牌，改为展示牌堆顶的X+3张牌。然后，你可以获得其中所有的【杀】,【决斗】和武器牌，并令你的下一张【杀】无法被【闪】响应。若如此做。否则，你获得其中所有非【杀】和非【决斗】牌。(X为你当前体力值)",
					"sup_luoyi1": "裸衣",
					"sup_luoyi1_info": "你的下一张【杀】不可被响应。",
					"sup_dushuai": "督率",
					"sup_dushuai_info":
						"你获得此技能时将〖督率〗状态改为防。你的回合结束阶段，你可以转换你的督率状态。<br>攻：你的摸牌阶段摸牌数-1，出牌阶段你的攻击距离+2，出牌阶段你可以多使用2张【杀】。<br>守：你的体力上限+4，回合结束阶段开始时，你摸4张牌。一名角色的准备阶段，若你护甲少于2点，你失去一点体力上限并获得一点护甲。出牌阶段你使用牌无法指定其他角色为目标。",
					"sup_dushuaigong": "督率",
					"sup_dushuaigong_info": "攻",
					"sup_dushuaifang": "督率",
					"sup_dushuaifang_info": "防",
					"sup_dsf2": "督率",
					"sup_dsf2_info": "防2",
					"sup_yaowu": "耀武",
					"sup_yaowu_info": "锁定技，当你受到不由你造成的伤害时，你对自己造成X点伤害，然后对伤害来源造成1点伤害(X=你即将受到的伤害*2)。",
					"sup_kuangyong": "诳勇",
					"sup_kuangyong_info": "锁定技，当你对其他角色造成伤害时，若你有护甲，你的伤害值翻倍，否则你获得一点护甲。",
					"sup_jizhi": "集智",
					"sup_jizhi_info": "当一名角色使用锦囊牌时，你可以摸一张牌。若此牌为基本牌，则你可以弃置之，然后令你下一个弃牌阶段前手牌上限+1。",
					"sup_qicai": "奇才",
					"sup_qicai_info": "锁定技，你使用锦囊牌无距离限制，你装备区内的防具牌和宝物牌不能被其他角色弃置。",
					"sup_qixi": "奇袭",
					"sup_qixi_info": "你可以将一张黑色牌当做【过河拆桥】使用。你以此法或通过手牌使用的过河拆桥可以弃置目标角色区域内的所有牌。",
					"sup_fenwei": "奋威",
					"sup_fenwei_info": "限定技，当一名角色使用的锦囊牌指定了至少两名角色为目标时，你可以令此牌对其中任意名角色无效。",
					"sup_yicong": "义从",
					"sup_yicong_info": "锁定技，你计算与其他角色的距离时-1。若你的体力值不大于你已损失体力值，则其他角色计算与你的距离时+1。",
					"sup_qiaomeng": "趫猛",
					"sup_qiaomeng_info":
						"每回合限X次，当你使用牌指定第一个目标后，你可以弃置目标角色中一名其他角色的一张牌。若你以此法弃置的牌为：装备牌，你获得此牌；锦囊牌，你令此牌不可被响应。(X为你已损失体力值)",
					"sup_zishu": "自书",
					"sup_zishu_info": "锁定技，当你不因〖自书〗而获得1张牌时，你摸1张牌。",
					"sup_yingyuan": "应援",
					"sup_yingyuan_info": "当你使用或打出的牌结算完成后，你可以将其交给一名其他角色。",
					"sup_jueqing": "绝情",
					"sup_jueqing_info": "锁定技，你即将造成伤害时，你令目标角色失去等同于伤害值的体力。",
					"sup_shangshi": "伤逝",
					"sup_shangshi_info": "当你的手牌数小于X时，你可以将手牌摸至X张（X为你已损失的体力值+你的体力上限）",
					"sup_meibu": "魅步",
					"sup_meibu_info":
						"其他角色的出牌阶段开始时，你可以令该角色于本回合内获得技能〖止息〗，且本回合其与你的距离视为1，然后若你体力值大于你已损失的体力值，你失去一点体力并摸1张牌。",
					"sup_mumu": "穆穆",
					"sup_mumu_info":
						"出牌阶段开始时，你可以选择一项：1.弃置一名其他角色装备区里的一张牌；2.获得一名角色装备区里的一张防具牌，若如此做，你本回合不能使用【杀】。",
					"sup_zhixi": "止息",
					"sup_zhixi_info":
						"锁定技，出牌阶段<br>①你每使用或打出一张牌，你需弃置X张牌并增加X点“止息”标记。若你的“止息”数量大于你或孙鲁育的体力值，你无法使用或打出任何牌（X为孙鲁育已损失体力值且至少为1）<br>②你每次造成的伤害值最多为1。",
					"sup_zhixi2": "止息",
					"sup_zhixi2_info": "damage=1",
					"sup_luanji": "乱击",
					"sup_luanji_info":
						"①当你使用【万箭齐发】造成伤害时，若该角色未被你记录，你记录该角色并摸1张牌。<br>②出牌阶段，你可以将你的所有手牌当作【万箭齐发】使用，然后清除①中的角色记录并修改此技能②为标〖乱击〗直到回合结束。",
					"sup_xueyi": "血裔",
					"sup_xueyi_info":
						"主公技，锁定技，游戏开始时，你获得X个“裔”标记（X为场上群势力角色的数目）。当一名角色处于濒死状态时，你可以移去1枚“裔”标记，然后其回复1点体力，获得1点护甲并摸1张牌。你的手牌上限+Y（Y为你拥有的“裔”标记数）。",
					"sup_xueyi1": "血裔",
					"sup_xueyi1_info": "",
					"sup_jiuchi": "酒池",
					"sup_jiuchi_info":
						"①你可以将一张黑桃手牌当做【酒】使用。<br>②你使用【酒】无次数限制<br>③你使用【酒】时，你恢复一半已损失体力（向上取整），然后你将你的体力上限调整为你当前体力并摸等于本次失去的体力上限数量的牌<br>④当你于回合内使用带有【酒】效果的【杀】造成伤害后，你令你的【崩坏】失效直到回合结束。<br>⑤一名角色进入濒死阶段时，若你体力上限大于1，你可以视为使用一张【酒】。",
					"sup_roulin": "肉林",
					"sup_roulin_info": "锁定技。你对女性角色、女性角色对你使用牌不可被响应。",
					"sup_benghuai": "崩坏",
					"sup_benghuai_info": "结束阶段，若你的体力不是全场最少的(或之一)，你须失去你一半的体力值（向上取整）",
					"sup_baonue": "暴虐",
					"sup_baonue_info": "主公技，一名群雄角色造成1点伤害后，你可进行判定，若为♠，你恢复1点体力上限并获得判定牌。",
					"sup_zhonghui": "冢徊",
					"sup_zhonghui_info": "当你死亡时，你可令杀死你的角色于其每个出牌阶段开始时获得〖止息〗。",
					"sup_zhonghui1": "冢徊",
					"sup_zhonghui1_info": "你的出牌阶段开始时，你于本回合内获得技能〖止息〗。",
					"sup_jiuchi2": "酒池",
					"sup_jiuchi2_info": "",
					"zioy_tianwei": "天威",
					"zioy_tianwei_info":
						"当你发动〖利驭〗或〖妄武〗后，若你当前体力值大于2且大于X，你对自己造成两点伤害; 大于2且不大于X，你减少两点体力上限并摸一张牌，不大于2且体力上限大于2，你失去两点体力上限并获得一点护甲; 不大于2且体力上限不大于2，你恢复一点体力，三点体力上限(X为你的体力上限/2且向下取整)。"
				}
			},
			intro: "Super Breakout, in short, S.B.",
			author: "喵喵",
			diskURL: "",
			forumURL: "",
			version: "23.10.15"
		},
		files: {
			"character": [
				"sup_zhouyu.jpg",
				"sup_lvmeng.jpg",
				"sup_huangyueying.jpg",
				"sup_zhenji.jpg",
				"sup_xuzhu.jpg",
				"sup_lvbu.jpg",
				"sup_zhugeliang.jpg",
				"sup_sunce.jpg",
				"sup_sunluyu.jpg",
				"sup_zhangchunhua.jpg",
				"sup_guanyu.jpg",
				"sup_yuanshao.jpg",
				"sup_zhangjiao.jpg",
				"sup_ganning.jpg",
				"sup_liubei.jpg",
				"sup_huaxiong.jpg",
				"sup_zhangfei.jpg",
				"sup_gongsunzan.jpg",
				"sup_dongzhuo.jpg",
				"sup_yujin.jpg",
				"sup_maliang.jpg",
				"sup_caocao.jpg",
				"sup_zhangliao.jpg",
				"sup_sunquan.jpg"
			],
			"card": ["sup_ganning_guohe.png"],
			"skill": []
		}
	}
})
