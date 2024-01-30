game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "喵喵喵喵",
		content: function (config, pack) {
			/*---------------------------------------------------------------以下为杂项---------------------------------------------------------------*/
			get.is.xuemai = function (skill) {
				var info = lib.skill[skill];
				if (typeof info.xuemai == "function") return info.xuemai(skill);
				if (info.xuemai == false) return false;
				if (info.trigger && info.forced) return true;
				if (info.mod) return true;
				if (info.xuemai) return true;
				return false;
			};

			game.changeRoundNumber = function () {
				/*接受输入num，游戏轮数+=num */
				//event.trigger("changeRoundNumberBegin");
				var num = 1,
					source = _status.event.player,
					is_skip = false;
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (arguments[i] == "skip") {
						is_skip = true;
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					}
				}
				if (is_skip) {
					game.roundNumber += num;
				} else {
					while (num > 0) {
						num--;
						game.roundNumber++;
						game.updateRoundNumber();
						_status.event.trigger("roundStart");
					}
				}
				game.updateRoundNumber();
				//event.trigger("changeRoundNumberEnd");
			};

			// 重写废除判定区相关
			lib.element.content.enableJudge = function () {
				"step 0"
				if (!player.storage._disableJudge || player.storage._disableJudge == false) event.finish();
				// 多次废除恢复判断
				if (!player.storage._disableJudge_layer) {
					player.storage._disableJudge_layer = 0;
				}
				player.storage._disableJudge_layer--;
				if (player.storage._disableJudge_layer < 0) {
					player.storage._disableJudge_layer = 0;
					event.finish();
				}
				if (player.storage._disableJudge_layer > 0) event.finish();
				"step 1"
				game.log(player, "恢复了判定区");
				player.storage._disableJudge = false;
				// player.markSkill('_disableJudge');
				"step 2"
				game.broadcastAll(function (player, card) {
					player.$enableJudge();
				}, player);
			};

			lib.element.content.disableJudge = function () {
				"step 0"
				// if (player.storage._disableJudge == true) return;
				// 多次废除恢复判断
				if (!player.storage._disableJudge_layer) {
					player.storage._disableJudge_layer = 0;
				}
				player.storage._disableJudge_layer++;
				if (player.storage._disableJudge_layer > 1) {
					event.finish();
				}
				"step 1"
				game.log(player, "废除了判定区");
				var js = player.getCards("j");
				if (js.length) player.discard(js);
				player.storage._disableJudge = true;
				//player.markSkill('_disableJudge');
				"step 2"
				game.broadcastAll(function (player, card) {
					player.$disableJudge();
				}, player);
			};

			// 并不是很好的写法
			let gameAddPlayerBak = game.addPlayer
			game.addPlayer = (position, character, character2) => {
				let player = gameAddPlayerBak(position, character, character2)
				// if (position < 0 || position > game.players.length + game.dead.length || position == undefined)
				// 	position = Math.ceil(Math.random() * (game.players.length + game.dead.length));
				// const players = game.players.concat(game.dead);
				// ui.arena.setNumber(players.length + 1);
				// players.forEach(value => {
				// 	if (parseInt(value.dataset.position) >= position) value.dataset.position = parseInt(value.dataset.position) + 1;
				// });
				// const player = ui.create.player(ui.arena).animate("start");
				// if (character) player.init(character, character2);

				// //技能修复
				// var skills=lib.character[character][3];
				// if(character2)skills.concat(lib.character[character2][3])
				// for(var i of skills){
				// 	game.log(i)
				// 	player.removeSkill(i)
				// 	player.addSkill(i);
				// }

				// 属性
				player.storage.enhancementArray = {
					attack: 0, //攻击力
					defend: 0, //防御力
					miss: 0, //闪避率
					hit: 0, //命中率
					strike: 0, //暴击率，目前没用
					draw: 0, //摸牌，目前没用
					locked: false,
					locked_end: -1,
					locked_type: null
				};
				game.players.push(player);
				player.playerid = get.id();
				game.playerMap[player.playerid] = player;
				// game.log(game.playerMap)
				// for(var i in game.playerMap){
				// 	game.log(i)
				// }
				// game.playerMap.push(player);
				player.dataset.position = position;
				game.arrangePlayers();
				return player;
			};

			// //多位主公死亡情况
			// lib.skill._miao_zhu_dying = {

			// }

			//更换武将头像
			lib.element.player.changeAvatarMiao = function (imgFrom, imgTo) {
				var path = this.node.avatar.style.backgroundImage.split(imgFrom)[0];

				this.node.avatar.style.backgroundImage = path + imgTo + '")';
			};
			//获得限伤
			lib.element.player.addDamageLimiter = function () {
				if (!this.storage._damageLimiter_Miao) {
					this.storage._damageLimiter_Miao = [];
				}
				var id = _status.event.name,
					num = 1,
					source = _status.event.player,
					nolog = false;
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						id = arguments[i];
					}
				}

				this.removeDamageLimiter(id, "noUnmark");
				var Limiter = {};
				Limiter.id = id;
				Limiter.num = num;
				Limiter.source = source;
				this.storage._damageLimiter_Miao.push(Limiter);
				this.markSkill("_DamageLimiter");
			};

			//移除限伤
			lib.element.player.removeDamageLimiter = function () {
				if (!this.storage._damageLimiter_Miao) {
					this.storage._damageLimiter_Miao = [];
				}
				var id = _status.event.name,
					noUnmark = false,
					nolog = false;
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (arguments[i] == "noUnmark") {
						noUnmark = true;
					} else if (typeof arguments[i] == "string") {
						id = arguments[i];
					}
				}
				for (var i = 0; i < this.storage._damageLimiter_Miao.length; i += 1) {
					if (this.storage._damageLimiter_Miao[i].id == id) {
						this.storage._damageLimiter_Miao.splice(i, 1);
					}
				}
				if (this.storage._damageLimiter_Miao.length == 0 && noUnmark == false) this.unmarkSkill("_DamageLimiter");
			};

			lib.skill["_DamageLimiter"] = {
				trigger: {
					player: ["damageBegin3"]
				},
				filter: function (event, player) {
					if (!player.storage._damageLimiter_Miao) return false;
					var min = Infinity;
					for (var i = 0; i < player.storage._damageLimiter_Miao.length; ++i) {
						var limiter = player.storage._damageLimiter_Miao[i];
						if (player.storage._damageLimiter_Miao[i].num < min) min = player.storage._damageLimiter_Miao[i].num;
					}
					return event.num > min;
				},
				priority: -705831,
				forced: true,
				silent:true,
				charlotte: true,
				unique: true,
				mark: true,
				marktext: "限伤",
				intro: {
					name: "最大伤害限制",
					mark: function (dialog, storage, player) {
						var min = Infinity;
						for (var i = 0; i < player.storage._damageLimiter_Miao.length; ++i) {
							var limiter = player.storage._damageLimiter_Miao[i];
							if (player.storage._damageLimiter_Miao[i].num < min) min = player.storage._damageLimiter_Miao[i].num;
						}
						return "你受到的所有伤害不超过" + min + "点";
					}
				},
				content: function () {
					var min = Infinity;
					for (var i = 0; i < player.storage._damageLimiter_Miao.length; ++i) {
						var limiter = player.storage._damageLimiter_Miao[i];
						if (player.storage._damageLimiter_Miao[i].num < min) min = player.storage._damageLimiter_Miao[i].num;
					}
					if (trigger.num > min) trigger.num = min;
					game.log(player, "触发了限伤");
					_status.event.trigger("damageLimit");
				}
			};

			//获得缓伤，即百分比减伤
			lib.element.player.addDamageMitigationer = function () {
				if (!this.storage._damageMitigationer_Miao) {
					this.storage._damageMitigationer_Miao = [];
				}
				var id = _status.event.name,
					num = 1,
					source = _status.event.player,
					nolog = false;
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						id = arguments[i];
					}
				}

				this.removeDamageMitigationer(id);
				var Limiter = {};
				Limiter.id = id;
				Limiter.num = num;
				Limiter.source = source;
				this.storage._damageMitigationer_Miao.push(Limiter);
				this.markSkill("_DamageMitigationer");
			};

			lib.element.player.removeDamageMitigationer = function () {
				if (!this.storage._damageMitigationer_Miao) {
					this.storage._damageMitigationer_Miao = [];
				}
				var id = _status.event.name,
					nolog = false;
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (typeof arguments[i] == "string") {
						id = arguments[i];
					}
				}
				for (var i = 0; i < this.storage._damageMitigationer_Miao.length; i += 1) {
					if (this.storage._damageMitigationer_Miao[i].id == id) {
						this.storage._damageMitigationer_Miao.splice(i, 1);
					}
				}
				if (this.storage._damageMitigationer_Miao.length == 0) this.unmarkSkill("_DamageMitigationer");
			};

			lib.skill["_DamageMitigationer"] = {
				trigger: {
					player: ["damageBegin4"]
				},
				filter: function (event, player) {
					if (!player.hp_float) {
						player.hp_float = 0; //储存浮点位的hp
					}
					if (!player.storage._damageMitigationer_Miao || player.storage._damageMitigationer_Miao.length == 0) return false;
					return true;
				},
				priority: -Infinity, //保证优先级最低
				forced: true,
				silent:true,
				charlotte: true,
				unique: true,
				mark: true,
				marktext: "减伤",
				intro: {
					name: "伤害减免",
					mark: function (dialog, storage, player) {
						var min = Infinity;
						for (var i = 0; i < player.storage._damageMitigationer_Miao.length; ++i) {
							limiter = player.storage._damageMitigationer_Miao[i];
							if (player.storage._damageMitigationer_Miao[i].num < min) min = player.storage._damageMitigationer_Miao[i].num;
						}
						return "你受到的所有伤害减少" + (100 - min * 100).toString() + "%";
					}
				},
				content: function () {
					"step 0"
					var min = 1;
					for (var i = 0; i < player.storage._damageMitigationer_Miao.length; ++i) {
						limiter = player.storage._damageMitigationer_Miao[i];
						if (player.storage._damageMitigationer_Miao[i].num < min) min = player.storage._damageMitigationer_Miao[i].num;
					}
					n1 = trigger.num;
					n2 = parseFloat((n1 * min + 0.00001).toFixed(4));
					// nint = parseInt(n2)
					// game.log(n2,nint,n2-nint)
					// nfloathp = parseFloat(n2 - nint)
					// player.hp_float = player.hp_float + parseFloat(nfloathp)
					// trigger.num = parseInt(n2)
					// if(parseFloat(nfloathp) != 0){
					//     trigger.num += 1
					// }
					// game.log(player.hp_float >= 1)
					// flag=false
					// if(player.hp_float == 0 && n2 > 0){
					//     // if(player.hujia > 0){
					//     //     player.changeHujia(-1)
					//     // }
					//     // else{
					//     //     player.hp-=1
					//     // }
					//     trigger.num += 1

					// }
					player.hp_float -= n2;
					// game.log(player.hp_float)
					trigger.num = 0;
					// if(flag){
					//     trigger.num += 1
					// }
					while (player.hp_float < 0) {
						player.hp_float += 1;
						trigger.num += 1;
					}
					// if(player.hp_float == 0){
					//     // if(player.hujia > 0){
					//     //     player.changeHujia(1)
					//     // }
					//     // else{
					//     //     player.hp+=1
					//     // }
					//     trigger.num -= 1
					// }
					// game.log(player.hp_float,'sss',trigger.num)
					game.log(player, "触发了减伤，实际受到<span class='yellowtext'>" + n2 + "</span>点伤害");
					if (n2 < 1) {
						if (player.hujia != 0) {
							player.changeHujia(-trigger.num);
						} else player.hp -= trigger.num;
						if (trigger.source) {
							player.$damage(trigger.source);
						} else {
							player.$damage();
						}
						player.update();
						trigger.num = 0;
					}
					_status.event.trigger("damageMitigation");
					"step 1"
					if (player.hp <= 0 && player.hp_float <= 0) {
						player.nodying = false;
						// game.log(player.hp,player.hp_float);
						player.dying();
					}
				}
			};
			//濒死阶段0.xhp处理
			lib.skill["_DyingWithFloatHp"] = {
				trigger: {
					player: ["dying"]
				},
				direct: true,
				unique: true,
				silent:true,
				// forceunique:true,
				filter: function (event, player) {
					if (!player.hp_float) {
						player.hp_float = 0; //储存浮点位的hp
					}
					return player.hp == 0 && player.hp_float > 0;
				},
				init: function (player) {
					if (!player.hp_float) {
						player.hp_float = 0; //储存浮点位的hp
					}
				},
				content: function () {
					// game.log(player.hp,player.hp_float)
					trigger.cancel();
					for (var i = 0; i < _status.dying.length; ++i) {
						if (_status.dying[i] == player) {
							_status.dying.splice(i, 1);
						}
					}
					// trigger.nodying = true
				}
			};
			//回满血0.xhp处理
			lib.skill["_RecoverWithFloatHp"] = {
				trigger: {
					player: ["recoverEnd"]
				},
				direct: true,
				unique: true,
				silent:true,
				forceunique: true,
				filter: function (event, player) {
					if (!player.hp_float) {
						player.hp_float = 0; //储存浮点位的hp
					}
					return player.hp == player.maxHp;
				},
				init: function (player) {
					if (!player.hp_float) {
						player.hp_float = 0; //储存浮点位的hp
					}
				},
				content: function () {
					player.hp_float = 0;
				}
			};

			lib.skill["zioy_lockHp"] = {
				trigger: {
					player: ["damageBegin", "loseHpBegin"]
				},
				direct: true,
				unique: true,
				silent:true,
				forceunique: true,
				filter: function (event, player) {
					return true;
				},
				mark: true,
				marktext: "锁血",
				intro: {
					name: "锁血"
				},
				init: function (player) {},
				content: function () {
					trigger.cancel();
				}
			};

			/*-----------------------------------------------------------以下部分为全局状态相关----------------------------------------------------------- */

			game.globalStatus = {
				name: null,
				/*全局状态名称,string or null*/
				timing_type: null,
				/*全局状态计时类型，轮:'round'or回合:"phase"or null */
				locked_timing_type: null,
				/*全局状态锁定计时类型，轮:'round'or回合:"phase"or null */
				source: null,
				/*全局状态来源,player or null*/
				end: 0,
				/*全局状态结束时间,int */
				locked_end: -1,
				/*锁定结束时间,int */
				storage: {
					remove_timing_locked: true
				},
				/*存放全局状态需要的数据,object */
				isLocked: function () {
					/*返回全局状态是否锁定 */
					if (this.locked_timing_type == "round") return this.locked_end > game.roundNumber;
					else return this.locked_end > 0;
				},
				translation: function () {
					/*返回全局状态的中文字符名称 */
					return get.status(this).translation;
				}
			};

			game.changeGlobalStatus = function () {
				/*改变场上状态，example：game.changeGlobalStatus(5,3,"xiyu",ture,"phase") 表示强制转换为细雨天气5回合并锁定3回合，来源默认为event.player*/
				if (!game.hasGlobalStatusButton) {
					game.hasGlobalStatusButton = true;
					ui.globalStatusButton = ui.create.system("喵喵", null, true);
					ui.globalStatusButton.style.display = "hidden";
					lib.setPopped(ui.globalStatusButton, ui.click.globalStatusButton, 170);
					if (get.is.phoneLayout()) {
						ui.globalStatus = ui.create.div(".touchinfo.right", ui.window);
					} else {
						ui.globalStatus = ui.create.div(ui.gameinfo);
					}
				}
				var status = null,
					timing_type = null,
					locked_timing_type = null,
					num = -1,
					locked_num = -1,
					source = _status.event.player,
					forced = false,
					Overridable = false,
					nolog = false; //最后不game.log(xxxxx)
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (arguments[i] == "round" || arguments[i] == "phase") {
						if (timing_type == null) timing_type = arguments[i];
						else locked_timing_type = arguments[i];
					} else if (typeof arguments[i] == "boolean") {
						forced = arguments[i];
					} else if (typeof arguments[i] == "number") {
						if (num == -1) num = arguments[i];
						else if (locked_num == -1) locked_num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						status = arguments[i];
					}
				}

				if (timing_type == null) timing_type = "round";
				if (locked_timing_type == null) locked_timing_type = timing_type;
				_status.event.trigger("changeGlobalStatusBegin");
				/*以上处理输入信息 */
				if (get.status(status) == null) status = null;
				var skill = get.status(status).skill;
				if (num <= -1) {
					num = 1;
				}
				if (locked_num <= -1) {
					locked_num = 0;
				}
				if (locked_num > num) {
					locked_num = num;
				}
				if (forced) {
					Overridable = true;
				} else if (
					(get.status(status).type == get.status(game.globalStatus).type || get.status(null).type == get.status(game.globalStatus).type) &&
					!game.globalStatus.isLocked()
				) {
					Overridable = true;
				}
				var str = "";
				var str1 = lib.globalStatusTypeTranslation[get.status(game.globalStatus).type];
				/*全局状态类型中文字符 */
				var str2 = "轮",
					str4 = str2;
				var flag1 = true;
				if (timing_type == "phase") str2 = "回合";
				if (locked_timing_type == "phase") str4 = "回合";
				//event.trigger("changeGlobalStatus");
				if (Overridable) {
					if (game.globalStatus && game.globalStatus.name != null) {
						if (game.globalStatus.name != status) {
							/*若当前全局状态与待召唤全局状态不一致则删除上一全局状态 */
							game.removeGlobalSkillMiao(get.status(game.globalStatus).skill);
						} else {
							/*若当前全局状态与待召唤全局状态一致则跳过添加全局状态 */
							flag1 = false;
						}
					}
					if (flag1) {
						game.addGlobalSkillMiao(skill);
						// game.addGlobalSkill("globalStatusRemover");
						// game.addGlobalSkill("globalStatusRemover1");
					}
					game.globalStatus.name = status;
					game.globalStatus.end = Math.max(game.roundNumber + num,game.globalStatus.end);
					game.globalStatus.locked_end = Math.max(game.roundNumber + locked_num,game.globalStatus.locked_end)
					game.globalStatus.source = source;
					game.globalStatus.timing_type = timing_type;
					game.globalStatus.locked_timing_type = locked_timing_type;
					game.globalStatus.storage.remove_timing_locked = true; //防止当前回合更改
					if (timing_type == "phase") {
						game.globalStatus.end = num;
					}
					if (locked_timing_type == "phase") {
						game.globalStatus.locked_end = locked_num;
					}

					// if(_status.event.getParent()['triggername'] == 'phaseBegin' && timing_type == 'phase'){
					// 	/*回合开始阶段修正 */
					// 	game.globalStatus.end += 1;
					// }

					// if(_status.event.getParent()['triggername'] == 'phaseBegin' && locked_timing_type == 'phase'){
					// 	/*回合开始阶段修正 */
					// 	game.globalStatus.locked_end += 1;
					// }

					if (!(status == null && locked_num <= 0)) {
						/*更新str1全局状态类型中文字符 */
						str1 = lib.globalStatusTypeTranslation[get.status(game.globalStatus).type];
					}
					str +=
						"召唤场上" +
						str1 +
						"为：<span class='yellowtext'>" +
						get.status(status).translation +
						"</span>,持续<span class='yellowtext'>" +
						num +
						"</span>" +
						str2;
					if (locked_num == num) {
						str =
							"锁定场上" +
							str1 +
							"为：<span class='yellowtext'>" +
							get.status(status).translation +
							"</span>,持续<span class='yellowtext'>" +
							locked_num +
							"</span>" +
							str4;
					} else if (locked_num > 0) {
						str += "并锁定<span class='yellowtext'>" + locked_num + "</span>" + str4;
					}
					if (status == null && locked_num <= 0) {
						str = "清除了场上" + str1;
					}
					if (forced) str = "强制" + str;
					if (!nolog) game.log(source, str);
					ui.updateGlobalStatus();
				} else {
					str += "召唤" + lib.globalStatusTypeTranslation[get.status(status).type] + "失败";
					if (!nolog) game.log(source, str);
				}
				/*以上更改全局状态并输出 */
				_status.event.trigger("changeGlobalStatus_End");
			};

			game.changeGlobalStatusEnd = function () {
				/*改变场上状态持续时间*/
				if (game.globalStatus.name == null) {
					return;
				}
				var num = 0,
					// timing_type = game.globalStatus.timing_type,
					locked_num = 0,
					source = _status.event.player,
					nolog = false; //最后不game.log(xxxxx)
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (arguments[i] == "round" || arguments[i] == "phase") {
						timing_type = arguments[i];
					} else if (typeof arguments[i] == "number") {
						if (num == 0) num = arguments[i];
						else if (locked_num == 0) locked_num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					}
				}

				if (num == 0 && locked_num == 0) return;

				var str = "",
					str1 = "",
					str2 = "";
				if (num > 0) {
					str1 = "延长";
				} else {
					str1 = "减少";
					num = -num;
				}
				if (locked_num > 0) {
					str2 = "延长";
				} else {
					str2 = "减少";
					locked_num = -locked_num;
				}
				if (num != 0) {
					str = str + str1 + '<span class="yellowtext">' + get.status(game.globalStatus).translation + "</span>:<span class='yellowtext'>" + num + "</span>";
					if (game.globalStatus.timing_type == "round") str = str + "轮";
					else str = str + "回合";
				}
				if (locked_num != 0) {
					if (str != "") str = str + ",";
					str = str + str2 + '锁定<span class="yellowtext">' + locked_num + "</span>";
					if (game.globalStatus.locked_timing_type == "round") str = str + "轮";
					else str = str + "回合";
				}
				game.log(source, str);

				/*处理锁定时间大于持续时间 */
				if (game.globalStatus.timing_type == game.globalStatus.locked_timing_type) {
					if (game.globalStatus.locked_end + locked_num > game.globalStatus.end + num) {
						locked_num = game.globalStatus.end + num - game.globalStatus.locked_end;
					}
				}

				/*处理锁定时间小于0 */
				if (game.globalStatus.locked_timing_type == "round") {
					if (game.globalStatus.locked_end + locked_num <= game.roundNumber) {
						locked_num = -game.globalStatus.locked_end + 1;
					}
				} else {
					if (game.globalStatus.locked_end + locked_num <= 0) {
						locked_num = -game.globalStatus.locked_end;
					}
				}

				game.globalStatus.end = game.globalStatus.end + num;
				game.globalStatus.locked_end = game.globalStatus.locked_end + locked_num;
				game.globalStatus.source = source;
				game.globalStatus.storage.remove_timing_locked = true; //防止当前回合更改
				// game.globalStatus.timing_type = timing_type;

				/*处理剩余时间小于0 */
				if (game.globalStatus.timing_type == "round") {
					if (game.globalStatus.end <= game.roundNumber) {
						game.clearGlobalStatus(true, "nolog");
					}
				} else {
					if (game.globalStatus.end <= 0) {
						game.clearGlobalStatus(true, "nolog");
					}
				}
			};
			game.clearGlobalStatus = function () {
				/*强制或状态非锁定则清除场上状态 */
				var force = false,
					source = _status.event.player,
					nolog = false,
					str1 = "清除" + lib.globalStatusTypeTranslation[get.status(game.globalStatus).type];
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == true) {
						force = true;
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (arguments[i] == "nolog") {
						nolog = true;
					}
				}
				//event.trigger("clearGlobalStatusBegin");
				//event.trigger("clearGlobalStatus");
				if (force || !game.globalStatus.isLocked() || game.globalStatus.name == null) {
					if (force) {
						str1 = "强制" + str1;
					}
					game.changeGlobalStatus("nolog", true, null);
					// game.removeGlobalSkill("globalStatusRemover");
					// game.removeGlobalSkill("globalStatusRemover1");
					ui.updateGlobalStatus();
					if (!nolog) game.log(source, str1 + "成功");
				} else {
					if (!nolog) game.log(source, str1 + "失败");
				}
				//event.trigger("clearGlobalStatusEnd");
			};
			game.addGlobalSkillMiao = function (skill) {
				/*添加globalSkill的同时处理skill的init和groupM*/
				if (!lib.skill[skill]) return;

				game.addGlobalSkill(skill);

				/*处理skill的init */
				if (lib.skill[skill].init && typeof lib.skill[skill].init == "function") {
					let p = _status.event.player;
					do {
						lib.skill[skill].init(p);
						p = p.next;
					} while (p != _status.event.player);
				}

				/*直接使用group会出错，这里使用groupM */
				if (lib.skill[skill].groupM) {
					if (typeof lib.skill[skill].groupM == "string") {
						game.log("hello");
						game.addGlobalSkillMiao(lib.skill[skill].groupM);
					} else {
						for (let i in lib.skill[skill].groupM) {
							game.addGlobalSkillMiao(i);
						}
					}
				}
			};
			game.removeGlobalSkillMiao = function (skill) {
				/*添加globalSkill的同时处理skill的onremove和groupM*/
				if (!lib.skill[skill]) return;

				game.removeGlobalSkill(skill);

				/*处理skill的onremove */
				if (lib.skill[skill].onremove && typeof lib.skill[skill].onremove == "function") {
					let p = _status.event.player;
					do {
						lib.skill[skill].onremove(p);
						p = p.next;
					} while (p != _status.event.player);
				}

				/*直接使用group会出错，这里使用groupM */
				if (lib.skill[skill].groupM) {
					if (typeof lib.skill[skill].groupM == "string") {
						game.removeGlobalSkillMiao(lib.skill[skill].groupM);
					} else {
						for (let i in lib.skill[skill].groupM) {
							game.removeGlobalSkillMiao(i);
						}
					}
				}
			};

			// game.hasGlobalStatus = function () {
			// 	/*返回目前是否拥有状态，没啥用 */
			// 	if (!game.globalStatus || game.globalStatus == null || game.globalStatus.name == null) return false;
			// 	return true;
			// };

			get.status = function (status) {
				/*如果输入一个object或string，返回lib.globalStatus中key对应的内容，否则返回lib.globalStatus[null] */
				var s = status;
				if (typeof status == "object" && status != null) {
					return get.status(s.name);
				}
				if (lib.globalStatus[status]) {
					return lib.globalStatus[status];
				}
				return lib.globalStatus[null];
			};
			ui.updateGlobalStatus = function () {
				/*时钟边上的全局状态显示 */
				if (game.globalStatus.name != null) {
					ui.globalStatus.innerHTML = lib.globalStatusTypeTranslation[get.status(game.globalStatus).type] + ":" + get.status(game.globalStatus).translation;
				} else {
					ui.globalStatus.innerHTML = "当前无天气/环境";
				}
				if (get.is.phoneLayout()) ui.globalStatus.innerHTML = "<br>" + ui.globalStatus.innerHTML;
			};
			ui.click.globalStatusButton = function () {
				/*喵喵按钮 */
				var uiintro = ui.create.dialog("hidden");
				uiintro.listen(function (e) {
					e.stopPropagation();
				});
				var num;
				if (game.online) {
					num = _status.cardPileNum || 0;
				} else {
					num = ui.cardPile.childNodes.length;
				}
				if (game.globalStatus.name == null) {
					uiintro.add("当前无天气/环境");
				} else {
					uiintro.add(
						'<div class="text center">>>>当前' +
							lib.globalStatusTypeTranslation[get.status(game.globalStatus).type] +
							"为<<<</div><br>" +
							get.status(game.globalStatus).translation
						// +"<br>"
					);
					var str = "",
						str2 = "轮",
						num1 = game.globalStatus.end - game.roundNumber,
						num2 = game.globalStatus.locked_end - game.roundNumber;
					if (game.globalStatus.timing_type == "phase") {
						str2 = "回合";
						num1 = game.globalStatus.end;
					}
					str = '<div class="text center"><P align=left>--->剩余:' + num1 + str2 + "<br>";
					if (game.globalStatus.locked_timing_type == "phase") {
						str2 = "回合";
						num2 = game.globalStatus.locked_end;
					}
					if (game.globalStatus.isLocked()) {
						str += "--->锁定:" + num2 + str2 + "</P></div>";
					} else {
						str += "--->未被锁定</P></div>";
					}
					str += '<div class="text center"><P align=left>--->效果:' + get.status(game.globalStatus).intro + "</P></div>";
					uiintro.add(str);
				}
				return uiintro;
			};

			lib.globalStatusTypeTranslation = {
				/*储存全局状态类型对应的中文字符 */
				"weather": "天气",
				"environment": "环境",
				null: "状态"
			};

			lib.globalStatus = {
				/*存储所有全局状态信息 */

				/*以下为天气 */

				"rerang": {
					translation: "热浪",
					skill: "zioy_status_rerang",
					type: "weather",
					intro: "火属性伤害+1。"
				},
				"xiyu": {
					translation: "细雨",
					skill: "zioy_status_xiyu",
					type: "weather",
					intro: "火属性伤害将被视为无属性伤害。"
				},
				"chunfeng": {
					translation: "台风",
					skill: "zioy_status_taifeng",
					type: "weather",
					intro: "角色受伤时，概率将其随机一张牌移动至下家的对应位置。"
				},
				"shuguang": {
					translation: "曙光",
					skill: "zioy_status_shuguang",
					type: "weather",
					intro: "回合结束阶段清除当前角色的所有异常状态。"
				},
				"fenfang": {
					translation: "芬芳",
					skill: "zioy_status_fenfang",
					type: "weather",
					intro: "回合结束阶段，若当前回合角色体力值不大于2，其回复1点体力。"
				},
				"shenlou": {
					translation: "海市蜃楼",
					skill: "zioy_status_shenlou",
					type: "weather",
					intro: "回合结束阶段令当前回合角色执行[失去1点体力，将牌弃置至X张（X为体力值，至少弃置1张），获得“睡眠”异常]中随机任意项。"
				},

				/*以下为环境 */

				"mizhang": {
					translation: "迷嶂",
					skill: "zioy_status_mizhang",
					type: "environment",
					intro: "所有角色进攻距离-1。"
				},
				"hexu": {
					translation: "云归鹤墟",
					skill: "zioy_status_hexu",
					type: "environment",
					intro: "还没想出来。"
				},
				"huoshan": {
					translation: "风林火山",
					skill: "zioy_status_huoshan",
					type: "environment",
					intro: "回复体力时令回复体力值减半（向下取整）。"
				},
				"senluowanxiang": {
					translation: "森罗万象",
					skill: "zioy_status_senluowanxiang",
					type: "environment",
					intro: "回合结束阶段，你随机摸0~6张牌，然后你有10*N%几率进入睡眠/混乱状态（N为你以此法获得的牌的数量）。"
				},

				/*以下为其他状态 */

				null: {
					translation: "无",
					skill: null,
					type: null,
					intro: "目前场上无任何状态。"
				},

				"test": {
					translation: "测试",
					skill: null,
					type: null,
					intro: "测试。"
				}
			};

			lib.skill["zioy_status"] = {
				/*储存全局状态对应技能 */
				subSkill: {
					example: {
						trigger: {
							global: "phaseEnd"
						},
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						filter: function (event, player) {
							return true;
						},
						init: function (player) {},
						onremove: function (player) {},
						content: function () {},
						mod: {},
						groupM: "zioy_status_example1"
					},
					xiyu: {
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						trigger: {
							source: "damageBegin1"
						},
						filter: function (event) {
							return event.hasNature("fire");
						},
						priority: -5,
						content: function () {
							trigger.nature = null;
						}
					},
					rerang: {
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						trigger: {
							source: "damageBegin1"
						},
						filter: function (event) {
							return event.hasNature("fire");
						},
						priority: -5,
						content: function () {
							trigger.num += 1;
						}
					},
					mizhang: {
						sub: true,
						forced: true,
						direct: true,
						silent:true,
						unique: true,
						charlotte: true,
						mod: {
							globalFrom: function (from, to, distance) {
								return distance + 1;
							}
						}
					},
					shuguang: {
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						trigger: {
							player: "phaseEnd"
						},
						priority: -2523,
						content: function () {
							player.removeBuff("all");
						}
					},
					shenlou: {
						trigger: {
							player: "phaseEnd"
						},
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						filter: function (event, player) {
							return !player.storage.shenlou_noLoseHp;
						},
						init: function (player) {},
						onremove: function (player) {},
						content: function () {
							var r = function () {
								return [true, false].randomGet();
							};
							if (r()) {
								player.loseHp();
							}
							if (r()) {
								var n = player.countCards() - player.hp;
								if (player.countCards() > 0 && n <= 0) n = 1;
								player.chooseToDiscard(true, n);
							}
							if (r()) {
								player.addBuff("shuimian", null);
							}
						},
						mod: {},
						"_priority": 6485
					},
					huoshan: {
						trigger: {
							player: "recoverBegin"
						},
						sub: true,
						forced: true,
						direct: true,
						silent:true,
						unique: true,
						charlotte: true,
						filter: function (event, player) {
							return !player.storage.huoshan_no;
						},
						init: function (player) {},
						onremove: function (player) {},
						content: function () {
							trigger.num = parseInt(trigger.num / 2);
						},
						mod: {},
						"_priority": 685
					},
					fenfang: {
						trigger: {
							player: "phaseEnd"
						},
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						filter: function (event, player) {
							return true;
						},
						init: function (player) {},
						onremove: function (player) {},
						content: function () {
							if(player.hp <= 2)player.recover()
						},
						mod: {},
					},
					senluowanxiang: {
						trigger: {
							player: "phaseEnd"
						},
						sub: true,
						forced: true,
						direct: true,
						silent:true,
						unique: true,
						charlotte: true,
						filter: function (event, player) {
							return true;
						},
						init: function (player) {},
						onremove: function (player) {},
						content: function () {
							let num = parseInt(Math.random()*7)
							player.draw(num)
							if(Math.random() < 0.1*num){
								// console.log(12)
								player.addBuff('shuimian')
							}
						},
						mod: {},
					},
					test: {
						sub: true,
						forced: true,
						direct: true,
						unique: true,
						silent:true,
						charlotte: true,
						mod: {}
					}
				}
			};

			lib.skill["_globalStatusRemover"] = {
				/*轮类型全局状态倒计时 */
				trigger: {
					global: "roundStart"
				},
				filter: function (card, player, target) {
					if (game.globalStatus.storage.remove_timing_locked == true) return false;
					if (game.globalStatus.timing_type != "round") return false;
					return game.globalStatus.end <= game.roundNumber;
				},
				direct: true,
				charlotte: true,
				silent:true,
				unique: true,
				content: function () {
					if (game.globalStatus.timing_type == "round" && game.globalStatus.end <= game.roundNumber) {
						game.clearGlobalStatus(true, "nolog", null);
						ui.updateGlobalStatus();
					}
				}
				//group:"globalStatusRemover1",
			};
			lib.skill["_globalStatusRemover1"] = {
				/*回合类型全局状态倒计时 */
				trigger: {
					player: "phaseBegin"
				},
				direct: true,
				charlotte: true,
				silent:true,
				unique: true,
				filter: function (event, player) {
					if (game.globalStatus.storage.remove_timing_locked == true) return false;
					return true;
					if (game.globalStatus.locked_timing_type == "phase") game.globalStatus.locked_end--;
					if (game.globalStatus.timing_type != "phase") return false;
					game.globalStatus.end--;
					return game.globalStatus.end <= 0;
				},
				content: function () {
					if (game.globalStatus.locked_timing_type == "phase") game.globalStatus.locked_end--;
					// game.log(123)
					if (game.globalStatus.timing_type == "phase") {
						if (game.globalStatus.storage.remove_timing_locked == true) return;
						game.globalStatus.end--;
						game.globalStatus.storage.remove_timing_locked = true;
						// game.log(game.globalStatus.end);
						if (game.globalStatus.end <= 0) {
							game.clearGlobalStatus(true, "nolog", null);
							ui.updateGlobalStatus();
						}
					}
				}
			};

			lib.skill["_globalStatusRemover2"] = {
				/*回合类型全局状态倒计时 */
				trigger: {
					player: "phaseEnd"
				},
				direct: true,
				charlotte: true,
				silent:true,
				unique: true,
				filter: function (event, player) {
					return true;
				},
				content: function () {
					// game.log(666);
					game.globalStatus.storage.remove_timing_locked = false;
				}
			};

			/*---------------------------------------------------------------以下部分为异常相关---------------------------------------------------------------*/

			lib.element.player.addBuff = function () {
				/*添加异常状态 */
				var buff = null,
					num = 1, //暂时没用，异常状态的持续时间应由异常状态本身决定
					force = false, //暂时没用
					source = _status.event.player; //暂时没用
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						buff = arguments[i];
					} else if (arguments[i] == true) {
						force = true;
					}
				}

				if (buff == null || !lib.buffMiao[buff]) {
					game.log("buff not found_1");
					return;
				}
				if (!this.storage.buffArray) {
					this.storage.buffArray = [];
				}
				if (!this.storage.immuneBuffArray) {
					//Translated by deepl
					this.storage.immuneBuffArray = [];
				}
				var skill = lib.buffMiao[buff].skill;
				for (let i = 0; i < this.storage.immuneBuffArray.length; i++) {
					if (force == true) break;
					//若免疫此buff则return
					if (lib.buffMiao[this.storage.immuneBuffArray[i].name] == lib.buffMiao[buff]) {
						game.log(this, "免疫<span class='yellowtext'>" + lib.buffMiao[buff].translation + "</span>异常");
						return;
					}
				}
				for (let i = 0; i < this.storage.buffArray.length; i++) {
					//若有相同buff则return
					if (lib.buffMiao[this.storage.buffArray[i]] == lib.buffMiao[buff]) {
						return;
					}

					//移除已有同类型Buff
					if (lib.buffMiao[this.storage.buffArray[i]].type == lib.buffMiao[buff].type) {
						this.removeBuff(this.storage.buffArray[i]);
					}
				}
				// console.log(this)
				if(skill == 'mad'){
					this.addTempSkill(skill,'phaseEnd')
				}else{
					this.addSkill(skill);
				}
				this.storage.buffArray.push(buff);
				var strf = "";
				if (force) strf = "强制";
				if (source != null) {
					game.log(source, "令", this, strf, "获得<span class='yellowtext'>" + lib.buffMiao[buff].translation + "</span>异常");
				} else {
					game.log(this, strf, "获得了<span class='yellowtext'>" + lib.buffMiao[buff].translation + "</span>异常");
				}
			};

			lib.element.player.removeBuff = function () {
				/*移去异常状态 */
				var buff = null,
					all = false,
					force = false, //暂时没用
					source = _status.event.player; //暂时没用
				for (var i = 0; i < arguments.length; i++) {
					if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (arguments[i] == "all" || arguments[i] == "All") {
						all = true;
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						buff = arguments[i];
					} else if (arguments[i] == true) {
						force = true;
					}
				}
				if (all) {
					for (let i in lib.buffMiao) {
						this.removeBuff(i);
					}
					return;
				}
				if (buff == null || !lib.buffMiao[buff]) {
					game.log("buff not found_2");
					return;
				}
				if (!this.storage.buffArray) {
					this.storage.buffArray = [];
				}
				var skill = lib.buffMiao[buff].skill;
				for (let i = 0; i < this.storage.buffArray.length; i++) {
					if (this.storage.buffArray[i] == buff) {
						this.removeSkill(skill);
						this.storage.buffArray.splice(i, 1);
						game.log(this, "移除了<span class='yellowtext'>" + lib.buffMiao[buff].translation + "</span>异常");
						break;
					}
				}
			};

			lib.element.player.addBuffImmune = function () {
				/*添加异常免疫 */
				if (!this.storage.buffArray) {
					this.storage.buffArray = [];
				}
				if (!this.storage.immuneBuffArray) {
					//Translated by deepl
					this.storage.immuneBuffArray = [];
				}
				if (!this.storage.immuneBuffRemover) {
					//Translated by deepl
					this.storage.immuneBuffRemover = [];
				}
				var buff = [],
					num = Infinity,
					type = "round",
					id = _status.event.name, // 区分不同来源的异常免疫
					clear = false, //添加免疫时移除已有但免疫的异常
					all = false; //免疫所有异常
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "all" || arguments[i] == "All") {
						all = true;
					} else if (arguments[i] == "phase") {
						type = "phase";
					} else if (arguments[i] == "round") {
						type = "round";
					} else if (typeof arguments[i] == "string" && arguments[i].substring(0,3) == "id=") {
						id = arguments[i].substring(3)
					} else if (arguments[i] == true) {
						clear = true;
					} else if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (typeof arguments[i] == "object") {
						for (var j = 0; j < arguments[i].length; j++) {
							buff.push(arguments[i][j]);
						}
					} else if (typeof arguments[i] == "string") {
						buff.push(arguments[i]);
					}
				}
				if (all == true) {
					for (let i in lib.buffMiao) {
						this.addBuffImmune(i, clear, num, type, 'id='+id);
					}
					return;
				}
				var flag = true;
				for (var i = 0; i < buff.length; i++) {
					var b = buff[i];
					flag = true;
					if (b == null || !lib.buffMiao[b]) {
						game.log("buff not found_3", b);
						return;
					}
					if (clear == true) {
						for (let i = 0; i < this.storage.buffArray.length; i++) {
							if (lib.buffMiao[this.storage.buffArray[i]] == lib.buffMiao[b]) {
								this.removeBuff(b);
								break;
							}
						}
					}
					var getmax = function(arr){
						var max = -1
						for(let i of arr){

						}
					}
					// //若已免疫此buff则continue
					// for (let j = 0; j < this.storage.immuneBuffArray.length; j++) {
					// 	if (lib.buffMiao[this.storage.immuneBuffArray[j].name] == lib.buffMiao[b]) {
					// 		var n = this.storage.immuneBuffArray[j].name;
					// 		for(let ibr of this.storage.immuneBuffRemover){
					// 			if(ibr.id == id && ibr.num > num && ibr.type == type){
					// 				flag = false
					// 			}
					// 		}
					// 		if (flag == false) break;
					// 		// if (this.storage.immuneBuffRemover[b].type != type || this.storage.immuneBuffRemover[b].num >= num) {
					// 		// 	flag = false;
					// 		// 	break;
					// 		// }
					// 	}
					// }
					// if (flag == false) continue;
					if (this.storage.immuneBuffArray.filter(v=>v.name == b && v.id == id).length == 0) this.storage.immuneBuffArray.push({"name":b,"id":id});
					// this.storage.immuneBuffRemover[b] = {};
					// this.storage.immuneBuffRemover[b].num = num;
					// this.storage.immuneBuffRemover[b].type = type;
					// this.storage.immuneBuffRemover[b].id = id;
					if (_status.event.getParent() && _status.event.getParent()["triggername"] == "phaseBegin" && type == "phase") {
						/*回合开始阶段修正 */
						num += 1;
					}
					flag = false
					for(let v of this.storage.immuneBuffRemover){
						if(v.name == b && v.type == type && v.id == id){
							if(v.num < num)v.num = num
							flag = true
						}
					}
					if(flag == false)this.storage.immuneBuffRemover.push({
						"name":b,
						"num":num,
						"type":type,
						"id":id
					})
					if (_status.event.getParent() && _status.event.getParent()["triggername"] == "phaseBegin" && type == "phase") {
						num -= 1;
					}
					var str = "获得<span class='yellowtext'>" + lib.buffMiao[b].translation + "</span>免疫";
					if (num != Infinity) {
						str = str + '<span class="yellowtext">' + num;
						if (type == "round") {
							str = str + "</span>轮";
						} else {
							str = str + "</span>回合";
						}
					}
					game.log(this, str);
					this.markSkill("zioy_buff_mianyi");
				}
			};

			lib.element.player.removeBuffImmune = function () {
				/*移除异常免疫 */
				if (!this.storage.buffArray) {
					this.storage.buffArray = [];
				}
				if (!this.storage.immuneBuffArray) {
					//Translated by deepl
					this.storage.immuneBuffArray = [];
				}
				if (!this.storage.immuneBuffRemover) {
					//Translated by deepl
					this.storage.immuneBuffRemover = [];
				}
				var buff = [],
					source = null,
					id = _status.event.name // 区分不同来源的异常免疫
					// all_flag = false
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "all" || arguments[i] == "All") {
						for (let i in lib.buffMiao) {
							// this.removeBuffImmune(i,source,"id="+id);
							buff.push(i)
						}
					} else if (typeof arguments[i] == "string" && arguments[i].substring(0,3) == "id=") {
						id = arguments[i].substring(3)
					} else if (typeof arguments[i] == "object") {
						for (var j = 0; j < arguments[i].length; j++) {
							buff.push(arguments[i][j]);
						}
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						buff.push(arguments[i]);
					} else if (arguments[i] == true) {
						force = true;
					}
				}
				// console.log(buff,id,this.storage.immuneBuffArray)
				// if(all_flag){
				// 	for (let i in lib.buffMiao) {
				// 		this.removeBuffImmune(i,source,"id="+id);
				// 	}
				// 	return;
				// }

				var flag = true;
				for (var b of buff) {
					// var b = buff[i];
					// console.log(b)
					flag = true;
					if (b == null || !lib.buffMiao[b]) {
						game.log("buff not found_4");
						return;
					}

					//若未免疫此buff则continue
					for (let i = 0; i < this.storage.immuneBuffArray.length; i++) {
						if (lib.buffMiao[this.storage.immuneBuffArray[i].name] == lib.buffMiao[b]) {
							flag = false;
							break;
						}
					}
					if (flag == true) continue;
					// 失去免疫
					this.storage.immuneBuffArray = this.storage.immuneBuffArray.filter(i=>i.name != b || i.id != id)
					this.storage.immuneBuffRemover = this.storage.immuneBuffRemover.filter(i=>i.name != b || i.id != id)
					if(this.storage.immuneBuffArray.filter(v=>v.name == b).length == 0){
						game.log(this, "失去<span class='yellowtext'>" + lib.buffMiao[b].translation + "</span>免疫");
					}
					// console.log('123')
				}
				if (this.storage.immuneBuffArray.length == 0) this.unmarkSkill("zioy_buff_mianyi");
			};

			lib.skill._miao_removeBuffImmune1 = {
				/*轮次类型计数移除异常免疫 */
				trigger: {
					global: "roundStart"
				},
				filter: function (card, player, target) {
					return player.storage.immuneBuffRemover;
				},
				direct: true,
				charlotte: true,
				silent:true,
				unique: true,
				content: function () {
					// 检查是否所有计时器都结束
					var checkRemovable=name=>{
						for(let v of player.storage.immuneBuffRemover){
							if(v.name == name && v.num > 0)return false
						}
						return true
					}
					let i = 0
					while(i < player.storage.immuneBuffRemover.length) {
						// console.log(player.storage.immuneBuffRemover[i],player.storage.immuneBuffRemover,i)
						if (player.storage.immuneBuffRemover[i].type == "round") {
							player.storage.immuneBuffRemover[i].num -= 1;
							if (player.storage.immuneBuffRemover[i].num == 0) {
								var name = player.storage.immuneBuffRemover[i].name
								if(checkRemovable(name)){
									player.removeBuffImmune(player.storage.immuneBuffRemover[i].name,"id="+player.storage.immuneBuffRemover[i].id);
								}else{
									i++
								}
							}else{
								i++
							}
						}else{
							i++
						}
					}
					player.storage.immuneBuffRemover=player.storage.immuneBuffRemover.filter(v=>v.num > 0)
				}
			};

			lib.skill._miao_removeBuffImmune2 = {
				/*回合类型计数移除异常免疫 */
				trigger: {
					global: "phaseBegin"
				},
				direct: true,
				charlotte: true,
				silent:true,
				unique: true,
				filter: function (event, player) {
					return player.storage.immuneBuffRemover;
				},
				content: function () {
					// 检查是否所有计时器都结束
					var checkRemovable=name=>{
						for(let v of player.storage.immuneBuffRemover){
							if(v.name == name && v.num > 0)return false
						}
						return true
					}
					let i = 0
					while(i < player.storage.immuneBuffRemover.length) {
						// console.log(player.storage.immuneBuffRemover[i],player.storage.immuneBuffRemover,i)
						if (player.storage.immuneBuffRemover[i].type == "phase") {
							player.storage.immuneBuffRemover[i].num -= 1;
							if (player.storage.immuneBuffRemover[i].num == 0) {
								var name = player.storage.immuneBuffRemover[i].name
								if(checkRemovable(name)){
									player.removeBuffImmune(player.storage.immuneBuffRemover[i].name,"id="+player.storage.immuneBuffRemover[i].id);
								}else{
									i++
								}
							}else{
								i++
							}
						}else{
							i++
						}
					}
					player.storage.immuneBuffRemover=player.storage.immuneBuffRemover.filter(v=>v.num > 0)
				}
			};

			lib.buffMiao = {
				/*存储所有异常状态信息 */
				"shuimian": {
					translation: "睡眠",
					skill: "zioy_buff_shuimian",
					type: "control",
					intro: "始终跳过出牌阶段，无法使用或打出任何牌，每轮游戏开始时有25*n%概率移除此状态,受到伤害时立即移除此状态。（n为异常状态已持续轮数）"
				},
				// "bingdong": {
				// 	translation: "冰冻",
				// 	skill: "zioy_buff_bingdong",
				// 	type: "control",
				// 	intro:
				// 		"跳过判定阶段，摸牌阶段，出牌阶段与弃牌阶段，受到的所有伤害-1，回合开始阶段有15*n%概率移除此状态。受到火属性伤害时立即移除此状态。（n为异常状态已持续轮数）"
				// },
				// "ranshao": {
				// 	translation: "燃烧",
				// 	skill: "zioy_status_ranshao",
				// 	type: "damage",
				// 	intro: "balabala"
				// },
				"mad":{
					translation: "混乱",
					skill: "mad",
					type: "damage",
					intro:"角色陷入混乱"
				}
			};

			lib.skill["zioy_buff"] = {
				/*储存异常状态对应技能，如写正常技能一般即可 */
				subSkill: {
					mianyi: {
						mark: true,
						marktext: "免疫",
						intro: {
							name: "免疫以下异常状态",
							mark: function (dialog, storage, player) {
								var flag = 0,
									str = "",
									buff_name="";
								var getn = (name,type)=>{
									var arr = player.storage.immuneBuffRemover
									var max = -1
									for(let i of arr){
										// console.log(i.name , name , i.type , type)
										if(i.name == name && i.type == type){
											var n = i.num
											// if(i.type == 'round'){
											// 	n *= game.players.length
											// }
											if(n > max)max = n
										}
									}
									return max
								}
								function unique(arr) {
									return arr.filter(function(item, index, arr) {
									  return arr.indexOf(item, 0) === index;
									});
								}
								var ls = unique(player.storage.immuneBuffArray.map(v=>v.name))
								for (let a of ls) {
									// var a = player.storage.immuneBuffArray[i].name;
									for(let typei of ['round','phase']){
										var n = getn(a,typei)
										if (n == -1)continue
										if (n != Infinity) {
											// buff_name = lib.buffMiao[a].translation + ":" + player.storage.immuneBuffRemover[a].num;
											buff_name = lib.buffMiao[a].translation + ":" + n;
										} else {
											buff_name = lib.buffMiao[a].translation + ":∞";
										}
										if (typei == "round") {
											buff_name = buff_name + "轮";
										} else {
											buff_name = buff_name + "回合";
										}
										if (flag % 2 == 0 && flag != 0) str += "<br>";
										else {
											if (flag != 0) str += ",";
										}
										flag++;
										str += buff_name;
									}
									// if (player.storage.immuneBuffRemover[a].num != Infinity) {
									// 	buff_name = lib.buffMiao[a].translation + ":" + player.storage.immuneBuffRemover[a].num;
									// } else {
									// 	buff_name = lib.buffMiao[a].translation + ":∞";
									// }
									// // if (player.storage.immuneBuffRemover[a].type == "round") {
									// 	// buff_name = buff_name + "轮";
									// // } else {
									// 	buff_name = buff_name + "回合";
									// // }
									// if (flag % 2 == 0 && flag != 0) str += "<br>";
									// else {
									// 	if (flag != 0) str += ",";
									// }
									// flag++;
									// str += buff_name;
								}
								return str;
							}
						}
					},
					shuimian: {
						mark: true,
						marktext: "睡眠",
						init: function (player) {
							player.storage.shuimian_count = 0;
						},
						trigger: {
							player: "phaseUseBegin"
						},
						priority: 3014745327,
						direct: true,
						silent:true,
						filter: function () {
							return true;
						},
						content: function () {
							trigger.cancel(null, null, "notrigger");
						},
						mod:{
							cardEnabled:function(card,player){
								return false;
							},
							cardRespondable:function(card,player){
								return false;
							},
							// cardSavable:function(card,player){
							// 	return false;
							// },
						},
						group: ["zioy_buff_shuimian_awake1", "zioy_buff_shuimian_awake2"],
						intro: {
							name: "睡眠",
							mark: function (dialog, storage, player) {
								var n = player.storage.shuimian_count + 1;
								return "始终跳过出牌阶段，无法使用或打出任何牌，下轮游戏开始时有" + 25 * n + "%概率移除此状态,受到伤害后立即移除此状态。";
							}
						}
					},
					shuimian_awake1: {
						trigger: {
							player: "damageEnd"
						},
						priority: -301745327,
						direct: true,
						silent:true,
						filter: function () {
							return true;
						},
						content: function () {
							player.removeBuff("shuimian");
						}
					},
					shuimian_awake2: {
						trigger: {
							global: "roundStart"
						},
						priority: -3456301727,
						direct: true,
						silent:true,
						filter: function () {
							return true;
						},
						content: function () {
							player.storage.shuimian_count++;
							if (player.storage.shuimian_count * 0.25 > Math.random()) player.removeBuff("shuimian");
						}
					}
				}
			};

			lib.element.player.goMad_old = lib.element.player.goMad
			lib.element.player.goMad = function(end ,force){
				// console.log(this, this.storage )
				if (!this.storage.buffArray) {
					this.storage.buffArray = [];
				}
				if (!this.storage.immuneBuffArray) {
					//Translated by deepl
					this.storage.immuneBuffArray = [];
				}
				if (!this.storage.immuneBuffRemover) {
					//Translated by deepl
					this.storage.immuneBuffRemover = [];
				}
				for (let i = 0; i < this.storage.immuneBuffArray.length; i++) {
					if (force == true) break;
					//若免疫此buff则return
					if (lib.buffMiao[this.storage.immuneBuffArray[i].name] == lib.buffMiao['mad']) {
						game.log(this, "免疫<span class='yellowtext'>" + lib.buffMiao['mad'].translation + "</span>异常");
						return;
					}
				}
				this.goMad_old(end)

			}
			/*---------------------------------------------------------------以下部分为强化相关---------------------------------------------------------------*/

			lib.element.player.changeEnhancement = function () {
				/*获得/失去强化 */
				var enhancements = [],
					num = 1,
					source = _status.event.player,
					forced = false,
					strlog = "",
					flag = false;
				// nolog = false; //最后不game.log(xxxxx)
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (arguments[i] == "all") {
						enhancements = ["attack", "miss", "defend", "hit", "strike"];
					} else if (typeof arguments[i] == "boolean") {
						forced = arguments[i];
					} else if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						enhancements.push(arguments[i]);
					} else if (typeof arguments[i] == "object") {
						for (var j = 0; j < arguments[i].length; j++) {
							enhancements.push(arguments[i][j]);
						}
					}
				}
				if (num == 0) {
					return;
				}
				if (this.storage.enhancementArray["locked"] == true && forced == false) {
					game.log(this, "的强化已<span class='yellowtext'>锁定</span>");
					return;
				}
				if (num > 0) {
					strlog = "获得了" + num + '级<span class="yellowtext">';
				} else if (num < 0) {
					strlog = "失去了" + -num + '级<span class="yellowtext">';
				}
				for (var i = 0; i < enhancements.length; ++i) {
					var e = enhancements[i];
					if (this.storage.enhancementArray[e] || this.storage.enhancementArray[e] == 0) {
						this.storage.enhancementArray[e] += num;
						let s;
						switch (e) {
							case "attack":
								s = "攻击";
								break;
							case "defend":
								s = "防御";
								break;
							case "miss":
								s = "闪避";
								break;
							case "hit":
								s = "命中";
								break;
							case "strike":
								s = "暴击";
								break;
							case "draw":
								s = "摸牌";
								break;
						}
						if (flag) s = '</span>，<span class="yellowtext">' + s;
						flag = true;
						if (this.storage.enhancementArray[e] > 6) {
							this.storage.enhancementArray[e] = 6;
						}
						if (this.storage.enhancementArray[e] < -6) {
							this.storage.enhancementArray[e] = -6;
						}
						this.storage["miao_enhancement_mark_" + e] = this.storage.enhancementArray[e];
						this.storage["miao_enhancement_mark_" + e + "1"] = this.storage.enhancementArray[e];
						// if (this.storage.enhancementArray[e] > 0) {
						// 	this.markSkill("miao_enhancement_mark_" + e + "1");
						// } else if (this.storage.enhancementArray[e] == 0) {
						// 	this.unmarkSkill("miao_enhancement_mark_" + e);
						// 	this.unmarkSkill("miao_enhancement_mark_" + e + "1");
						// } else if (this.storage.enhancementArray[e] < 0) {
						// 	this.markSkill("miao_enhancement_mark_" + e);
						// }
						strlog = strlog + s;
					}
				}
				strlog = strlog + "</span>强化";
				game.log(this, strlog);
				flag = true;
				for (var i in this.storage.enhancementArray) {
					if (!["attack", "miss", "defend", "hit", "strike"].includes(i)) continue;
					if (this.storage.enhancementArray[i] != 0) {
						flag = false;
						this.markSkill("miao_enhancement_mark_mark");
						break;
					}
				}
				if (flag) this.unmarkSkill("miao_enhancement_mark_mark");
			};

			lib.element.player.lockEnhancement = function () {
				/*锁定强化 */
				var num = -1, //锁定回合数
					source = _status.event.player,
					forced = false,
					type = "round",
					strlog = "";
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (typeof arguments[i] == "boolean") {
						forced = arguments[i];
					} else if (typeof arguments[i] == "number") {
						num = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					} else if (typeof arguments[i] == "string") {
						type = arguments[i];
					}
				}
				if (num < 0 || (type == this.storage.enhancementArray["locked_type"] && num < this.storage.enhancementArray["locked_end"])) {
					return;
				}
				this.storage.enhancementArray["locked"] = true;
				this.storage.enhancementArray["locked_end"] = num;
				// game.log(_status.event.getParent().name);
				// for(var i in _status.event.getParent()){
				// 	game.log(i,':',_status.event.getParent()[i]);
				// }
				if (_status.event.getParent()["triggername"] == "phaseBegin" && type == "phase") {
					/*回合开始阶段修正 */
					this.storage.enhancementArray["locked_end"] += 1;
				}
				this.storage.enhancementArray["locked_type"] = type;
				this.markSkill("miao_enhancement_mark_locked");
				strlog = strlog + "已锁定强化<span class='yellowtext'>";
				this.addSkill("miao_enhancement_locked");
				this.addSkill("miao_enhancement_locked2");
				strlog = strlog + num + "</span>";
				if (type == "round") {
					strlog = strlog + "轮";
				} else {
					strlog = strlog + "回合";
				}
				game.log(this, strlog);
			};

			lib.element.player.unlockEnhancement = function () {
				/*解锁强化 */
				var source = _status.event.player,
					forced = false,
					strlog = "";
				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = true;
					} else if (typeof arguments[i] == "boolean") {
						forced = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					}
				}
				if (this.storage.enhancementArray["locked"] == false) {
					return;
				}
				// if (num > 0) {
				// 	strlog = "获得了" + num + '级<span class="yellowtext">';
				// } else if (num < 0) {
				// 	strlog = "失去了" + -num + '级<span class="yellowtext">';
				// }
				this.storage.enhancementArray["locked"] = false;
				this.storage.enhancementArray["locked_end"] = -1;
				this.storage.enhancementArray["locked_type"] = null;
				this.unmarkSkill("miao_enhancement_mark_locked");
				this.removeSkill("miao_enhancement_locked");
				this.removeSkill("miao_enhancement_locked2");
				strlog = strlog + "已解锁强化";
				game.log(this, strlog);
			};

			lib.element.player.clearEnhancement = function () {
				/*清空强化 */
				var nolog = null,
					source = _status.event.player,
					forced = false;

				for (var i = 0; i < arguments.length; i++) {
					if (arguments[i] == "nolog") {
						nolog = "nolog";
					} else if (typeof arguments[i] == "boolean") {
						forced = arguments[i];
					} else if (get.itemtype(arguments[i]) == "player" || arguments[i] == null) {
						source = arguments[i];
					}
				}
				if (this.storage.enhancementArray["locked"] == true && !forced) {
					game.log(this, "已锁定强化");
					return;
				}
				var c = ["attack", "miss", "defend", "hit", "strike"];
				for (var l = 0; l < c.length; ++l) {
					i = c[l];
					if (nolog != null) this.changeEnhancement(i, -this.storage.enhancementArray[i], source, forced, nolog);
					this.changeEnhancement(i, -this.storage.enhancementArray[i], source, forced);
				}
			};

			lib.element.player._miao_check_enhancement = function () {
				if (!this.storage.enhancementArray)
					this.storage.enhancementArray = {
						attack: 0, //攻击力
						defend: 0, //防御力
						miss: 0, //闪避率
						hit: 0, //命中率
						strike: 0, //暴击率，目前没用
						draw: 0, //摸牌，目前没用
						locked: false,
						locked_end: -1,
						locked_type: null
					};
			};
			lib.skill._miao_enhancement_init = {
				/*游戏开始时设置player.storage.enhancementArray */
				// addplayer时会出错，需要注意
				unique: true,
				trigger: {
					global: "phaseBefore",
					player: ["enterGame", "showCharacterAfter"]
				},
				priority: 70582140,
				forced: true,
				silent:true,
				locked: true,
				direct: true,
				filter: function (event, player) {
					return event.name != "phase" || game.phaseNumber == 0 || !player.storage.enhancementArray;
				},
				content: function () {
					player.storage.enhancementArray = {
						attack: 0, //攻击力
						defend: 0, //防御力
						miss: 0, //闪避率
						hit: 0, //命中率
						strike: 0, //暴击率，目前没用
						draw: 0, //摸牌，目前没用
						locked: false,
						locked_end: -1,
						locked_type: null
					};
				}
			};
			lib.skill._miao_enhancement_attack = {
				/*根据攻击与防御强化进行伤害修正 */
				trigger: {
					source: "damageBegin1"
				},
				priority: -70582140,
				forced: true,
				filter: function (card, player, target) {
					return true;
				},
				direct: true,
				silent:true,
				charlotte: true,
				unique: true,
				content: function () {
					if (!player.storage.enhancementArray) {
						player.storage.enhancementArray = {
							attack: 0, //攻击力
							defend: 0, //防御力
							miss: 0, //闪避率
							hit: 0, //命中率
							strike: 0, //暴击率，目前没用
							draw: 0, //摸牌，目前没用
							locked: false,
							locked_end: -1,
							locked_type: null
						};
					}
					if (!trigger.player.storage.enhancementArray) {
						player.storage.enhancementArray = {
							attack: 0, //攻击力
							defend: 0, //防御力
							miss: 0, //闪避率
							hit: 0, //命中率
							strike: 0, //暴击率，目前没用
							draw: 0, //摸牌，目前没用
							locked: false,
							locked_end: -1,
							locked_type: null
						};
					}
					var numDamage = trigger.num,
						numAtk = player.storage.enhancementArray["attack"],
						numDfd = trigger.player.storage.enhancementArray["defend"];
					var dmm = numAtk - numDfd; //Damage modifier multiplier
					// game.log(player,trigger.player,dmm);
					if (dmm > 0) {
						numDamage *= 0.5 * dmm + 1;
						numDamage = parseInt(numDamage);
					} else if (dmm < 0) {
						numDamage *= 1 / (-dmm * 0.5 + 1);
						numDamage = Math.ceil(numDamage);
					}
					trigger.num = numDamage;
				}
			};

			lib.skill._miao_enhancement_miss = {
				/*根据命中与闪避强化判定是否闪避 */
				trigger: {
					player: ["chooseToRespondBegin", "chooseToUseBegin"]
				},
				filter: function (event, player) {
					if (event.responded) return false;
					if (event.miss_skill_miaomiao) return false;
					if (!event.filterCard || !event.filterCard({ name: "shan" }, player, event)) return false;
					if (event.name == "chooseToRespond" && !lib.filter.cardRespondable({ name: "shan" }, player, event)) return false;
					return true;
				},
				priority: 70582140,
				forced: true,
				direct: true,
				silent:true,
				charlotte: true,
				unique: true,
				content: function () {
					if (!player.storage.enhancementArray) {
						player.storage.enhancementArray = {
							attack: 0, //攻击力
							defend: 0, //防御力
							miss: 0, //闪避率
							hit: 0, //命中率
							strike: 0, //暴击率，目前没用
							draw: 0, //摸牌，目前没用
							locked: false,
							locked_end: -1,
							locked_type: null
						};
					}
					if (!trigger.player.storage.enhancementArray) {
						player.storage.enhancementArray = {
							attack: 0, //攻击力
							defend: 0, //防御力
							miss: 0, //闪避率
							hit: 0, //命中率
							strike: 0, //暴击率，目前没用
							draw: 0, //摸牌，目前没用
							locked: false,
							locked_end: -1,
							locked_type: null
						};
					}
					event.miss_skill_miaomiao = true;
					var numMis = player.storage.enhancementArray["miss"],
						numHit = trigger.player.storage.enhancementArray["hit"];
					var num = numMis - numHit;
					if (num <= 0) return;
					else {
						num = 0.05 * num;
					}
					if (num > Math.random()) {
						trigger.untrigger();
						trigger.set("responded", true);
						trigger.result = { bool: true, card: { name: "shan", isCard: false } };
					}
				}
			};

			lib.skill._miao_enhancement_strike = {
				/*根据攻击与防御强化进行伤害修正 */
				trigger: {
					source: "damageBegin1"
				},
				priority: -70582140,
				forced: true,
				filter: function (card, player, target) {
					return true;
				},
				direct: true,
				charlotte: true,
				silent:true,
				unique: true,
				content: function () {
					if (!player.storage.enhancementArray) {
						player.storage.enhancementArray = {
							attack: 0, //攻击力
							defend: 0, //防御力
							miss: 0, //闪避率
							hit: 0, //命中率
							strike: 0, //暴击率，目前没用
							draw: 0, //摸牌，目前没用
							locked: false,
							locked_end: -1,
							locked_type: null
						};
					}
					if (!trigger.player.storage.enhancementArray) {
						player.storage.enhancementArray = {
							attack: 0, //攻击力
							defend: 0, //防御力
							miss: 0, //闪避率
							hit: 0, //命中率
							strike: 0, //暴击率，目前没用
							draw: 0, //摸牌，目前没用
							locked: false,
							locked_end: -1,
							locked_type: null
						};
					}
					var numDamage = trigger.num,
						num = player.storage.enhancementArray["strike"];
					if (num * 0.05 > Math.random()) {
						trigger.num *= 2;
						game.log(player, "暴击了");
					}
				}
			};

			lib.skill._miao_enhancement_locked = {
				/*轮次类型计数移除强化锁定 */
				trigger: {
					global: "roundStart"
				},
				filter: function (card, player, target) {
					return true;
				},
				direct: true,
				silent:true,
				charlotte: true,
				unique: true,
				content: function () {
					if (!player.storage.enhancementArray || player.storage.enhancementArray.locked_type != "round") {
						return;
					}
					player.storage.enhancementArray.locked_end -= 1;
					if (player.storage.enhancementArray.locked_end == 0) {
						player.unlockEnhancement();
					}
				}
			};

			lib.skill._miao_enhancement_locked2 = {
				/*回合类型计数移除强化锁定 */
				trigger: {
					global: "phaseBegin"
				},
				direct: true,
				silent:true,
				charlotte: true,
				unique: true,
				filter: function (event, player) {
					return true;
				},
				content: function () {
					if (!player.storage.enhancementArray || player.storage.enhancementArray.locked_type != "phase") {
						return;
					}
					player.storage.enhancementArray.locked_end -= 1;
					if (player.storage.enhancementArray.locked_end == 0) {
						player.unlockEnhancement();
					}
				}
			};

			lib.skill.miao_enhancement_mark = {
				/*强化的mark，指示用,CPU is cheap,memory is cheap,life is beautiful */
				subSkill: {
					mark: {
						mark: true,
						marktext: "强化",
						intro: {
							name: "强化等级",
							mark: function (dialog, storage, player) {
								var str = "",
									count = 0;
								for (var i in player.storage.enhancementArray) {
									if (!["attack", "miss", "defend", "hit", "strike"].includes(i) || player.storage.enhancementArray[i] == 0) continue;
									var e = i;
									var s = "";
									count++;
									if (count != 1 && (count - 1) % 3 == 0) {
										str = str + "<br>";
									} else if (count != 1) {
										str = str + ",";
									}
									switch (e) {
										case "attack":
											s = "攻击";
											break;
										case "defend":
											s = "防御";
											break;
										case "miss":
											s = "闪避";
											break;
										case "hit":
											s = "命中";
											break;
										case "strike":
											s = "暴击";
											break;
										case "draw":
											s = "摸牌";
											break;
									}
									if (player.storage.enhancementArray[i] > 0) {
										s = s + "+";
									}
									s = s + player.storage.enhancementArray[i];
									str = str + s;
								}
								return str;
							}
						}
					},
					attack: {
						mark: true,
						marktext: "攻击",
						intro: {
							name: "攻击"
						}
					},

					defend: {
						mark: true,
						marktext: "防御",
						intro: {
							name: "防御"
						}
					},
					miss: {
						mark: true,
						marktext: "闪避",
						intro: {
							name: "闪避"
						}
					},
					hit: {
						mark: true,
						marktext: "命中",
						intro: {
							name: "命中"
						}
					},
					strike: {
						mark: true,
						marktext: "暴击",
						intro: {
							name: "暴击"
						}
					},
					draw: {
						mark: true,
						marktext: "摸牌",
						intro: {
							name: "摸牌"
						}
					},
					attack1: {
						mark: true,
						marktext: "攻击+",
						intro: {
							name: "攻击"
						}
					},
					defend1: {
						mark: true,
						marktext: "防御+",
						intro: {
							name: "防御"
						}
					},
					miss1: {
						mark: true,
						marktext: "闪避+",
						intro: {
							name: "闪避"
						}
					},
					hit1: {
						mark: true,
						marktext: "命中+",
						intro: {
							name: "命中"
						}
					},
					strike1: {
						mark: true,
						marktext: "暴击+",
						intro: {
							name: "暴击"
						}
					},
					draw1: {
						mark: true,
						marktext: "摸牌+",
						intro: {
							name: "摸牌"
						}
					},
					locked: {
						mark: true,
						marktext: "锁强",
						intro: {
							name: "已锁定强化等级",
							mark: function (dialog, storage, player) {
								var str;
								if (player.storage.enhancementArray["locked_type"] == "round") str = " 轮";
								else {
									str = " 回合";
								}
								return "剩余 " + player.storage.enhancementArray["locked_end"] + str;
							}
						}
					}
				}
			};

			/*---------------------------------------------------------------以下部分为武将势力相关---------------------------------------------------------------*/

			// 暂时不可用
			game.AddGroupNatureMiao = function (name, translation, mapping) {
				/*设定势力的函数，from活动武将 */
				if (!mapping || !Array.isArray(mapping) || mapping.length != 3) mapping = [199, 21, 133];
				var gradient = [mapping, mapping];
				var y = "(" + mapping[0] + "," + mapping[1] + "," + mapping[2];
				var y1 = y + ",1)",
					y2 = y + ")";
				var s = document.createElement("style");
				var l;
				//omg
				l = ".player .identity[data-color='miao_" + name + "'],";
				l += "div[data-nature='miao_" + name + "'],";
				l +=
					"span[data-nature='miao_" +
					name +
					"'] {text-shadow: black 0 0 1px,rgba" +
					y1 +
					" 0 0 2px,rgba" +
					y1 +
					" 0 0 5px,rgba" +
					y1 +
					" 0 0 10px,rgba" +
					y1 +
					" 0 0 10px}";
				l += "div[data-nature='miao_" + name + "m'],";
				l +=
					"span[data-nature='miao_" +
					name +
					"m'] {text-shadow: black 0 0 1px,rgba" +
					y1 +
					" 0 0 2px,rgba" +
					y1 +
					" 0 0 5px,rgba" +
					y1 +
					" 0 0 5px,rgba" +
					y1 +
					" 0 0 5px,black 0 0 1px;}";
				l += "div[data-nature='miao_" + name + "mm'],";
				l +=
					"span[data-nature='miao_" +
					name +
					"mm'] {text-shadow: black 0 0 1px,rgba" +
					y1 +
					" 0 0 2px,rgba" +
					y1 +
					" 0 0 2px,rgba" +
					y1 +
					" 0 0 2px,rgba" +
					y1 +
					" 0 0 2px,black 0 0 1px;}";
				s.innerHTML = l;
				document.head.appendChild(s);
				if (gradient && Array.isArray(gradient) && Array.isArray(gradient[0]) && gradient[0].length == 3) {
					var str = "",
						st2 = [];
					for (var i = 0; i < gradient.length; i++) {
						str += ",rgb(" + gradient[i][0] + "," + gradient[i][1] + "," + gradient[i][2] + ")";
						if (i < 2) st2[i] = "rgb(" + gradient[i][0] + "," + gradient[i][1] + "," + gradient[i][2] + ")";
					}
					var tenUi = document.createElement("style");
					tenUi.innerHTML = ".player>.camp-zone[data-camp='" + name + "']>.camp-back {background: linear-gradient(to bottom" + str + ");}";
					tenUi.innerHTML += ".player>.camp-zone[data-camp='" + name + "']>.camp-name {text-shadow: 0 0 5px " + st2[0] + ", 0 0 10px " + st2[1] + ";}";
					document.head.appendChild(tenUi);
				}
				//lib.group.push(n);
				lib.translate[name] = translation;
				lib.groupnature[name] = "miao_" + name;
			};
			game.AddGroupNatureMiao("daqin", "秦", [255, 165, 0]);
			game.AddGroupNatureMiao(null, "?", [0, 0, 0]);
			// game.AddGroupNatureMiao('test', "测试", [0, 0, 0]);
		},
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
					"zioy_zhigaotian": ["female", "shen", 3, ["zioy_eye", "zioy_damie"], ["hiddenSkill"]],
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
					"zioy_morana": ["female", "jin", 6, ["zioy_lanzhiyuane", "zioy_liuzhenxiongxiang", "zioy_yinhuxiaowu"], ["hiddenSkill"]],
					"zioy_guanghan": ["female", "wu", "2/9", ["zioy_nongying", "zioy_chanjuan"], ["des:2023中秋"]],
					"zioy_xuanhu": ["male", "wei", 1, ["zioy_leimingqiangu", "zioy_zhoumingchuanxuan"], []],
					"zioy_xiyueying": ["double", "shen", 4, ["zioy_riyuexingkong"], []],
					"zioy_purangsigai": ["none", "wu", 4, ["zioy_jisuishengjin"], ["des:plus黄盖"]],
					"zioy_bidu": ["female", "jin", "3/14/2", ["zioy_biubiubiu"], []],
					"zioy_dacongming": ["male", "qun", "6/6/6", ["zioy_shoufa"], ["des:聪明手法的角色"]],
					"zioy_exchel": ["female", "wei", "2/4", ["zioy_liwuyaomiao","zioy_zhifenghuifang","zioy_liechenyuyou_wood"], []],
					"zioy_sushuang": ["male", "wei", "4/5/1", ['zioy_jietian','zioy_yunshuang'], []],
					"zioy_kaixier": ["female", "qun", "2/4/3", ["zioy_helu"], []],
					"zioy_ji1": ["male", "jin", "3", ["zioy_shimeng",'zioy_heimeng'], ["hiddenSkill"]],
					"zioy_pangxian": ["female", "shu", "3/4/5", ["zioy_bian1","zioy_bian2","zioy_bian3","zioy_bian4","zioy_biandaogui"], ["hiddenSkill"]],
					"zioy_tianqi": ["female", "daqin", "2", ["zioy_junling","zioy_junming","zioy_junci","zioy_junnu","zioy_junyun"], ["hiddenSkill"]],
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
					"zioy_exchel":"伊珂玺尔",
					"zioy_sushuang":'鹔鹴',
					"zioy_kaixier":'凯希儿',
					"zioy_ji1": '畸',
					"zioy_pangxian": '逄暹',
					"zioy_tianqi":'天启',
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
			skill: {
				skill: {
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
							source: "damageBegin1"
						},
						filter: function (event, player) {
							return true;
						},
						forced: true,
						content: function () {
							player.changeHujia(1);

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
							player.changeHujia(1);
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
					"zioy_eye": {
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
					"zioy_damie": {
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
							if(!player.storage.yyUsable) return false
							if (event.getParent().name == "zioy_chuixing") return false;
							if (event.card.name != "sha" && event.card.name != "huosha" && event.card.name != "leisha") return false;
							return true;
						},
						mark: true,
						marktext: "吹星",
						intro: {
							name: "吹星",
							content: function(storage,player){
								return player.storage.yynum;
							},
							onunmark: true
						},
						priority: 1,
						forced: true,
						content: function () {
							"step 0"
							player.storage.yyUsable = false;
							event.count = 0
							"step 1"
							player.storage.yynum[0]+=1;
							for(var i = 0;i < player.storage.yynum.length;i+=1){
								if(player.storage.yynum[i] == 2){
									player.storage.yynum[i] = 0
									if(i == player.storage.yynum.length-1){
										player.storage.yynum.push(1)
									}else{
										player.storage.yynum[i+1] += 1
									}
									event.count += 3**i
									// for(var j = 0;j < 3**i;j+=1){
									// 	event.count++
									// }
								}
							}
							"step 2"
							if(event.count > 0){
								// for(var j = 0;j < event.count;j++){
								// 	player.chooseUseTarget({ name: "sha", nature: "fire" }, false, false, "nodistance");
								// }
								player
									.chooseTarget(1, true, "对一名角色使用"+event.count+"张【杀】", function (card, player, target) {
									return target != player;
								})
								.set("ai", function (target) {
									var player = _status.event.player;
									return -1;
								});
							}
							else{
								player.storage.yyUsable = true;
								event.finish()
							}
							'step 3'
							var target = result.targets[0];
							while(event.count > 0){
								if(target.isAlive()){
									player.useCard({ name: "sha", nature: "fire" }, target);
									event.count-=1
								}else{
									event.goto(2);
									break;
								}
							}
							// target.damage(event.count,player,'fire')
							"step 4"
							player.storage.yyUsable = true;
							event.finish()
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
								if(target.hasSkill("zioy_chenmeng1")){
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
							return player.countCards("he", { color: "red" }) > 0;
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
							event.target = target
							do {
								target = ts.randomGet();
							} while (target == player);
							player.line(target, "red");
							target.damage(2, "thunder");
							"step 2"
							var c = event.cs[0];
							// if(event.target.hp > 0){
								player.gain(c)
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
							trigger.targets.remove(trigger.targets);
							trigger.getParent().triggeredTargets2.remove(trigger.targets);
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
							player.loseMaxHp(result.control);
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
										p1.recover()
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
								player.removeSkill("zioy_huangyi")
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
						priority: -70582140451,
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
							if(player.storage.shulin_juexing == false){
								if(trigger.player){
									var target = trigger.player
									var targets=game.filterPlayer(current=>{
										if(current==target) return false;
										var hs=target.getCards('h');
										if(hs.length) return true;
										var js=target.getCards('j');
										for(var i=0;i<js.length;i++){
											if(current.canAddJudge(js[i])) return true;
										}
										if(current.isMin()) return false;
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(current.canEquip(es[i])) return true;
										}
										return false;
									});
									if(targets.length){
										var next=player.chooseTarget(function(card,player,target){
											return _status.event.targets.contains(target);
										});
										next.set('from',target);
										next.set('targets',targets);
										next.set('ai',function(target){
											var player=_status.event.player;
											var att=get.attitude(player,target);
											var sgnatt=get.sgn(att);
											var from=_status.event.from;
											var es=from.getCards('e');
											var i;
											var att2=get.sgn(get.attitude(player,from));
											for(i=0;i<es.length;i++){
												if(sgnatt!=0&&att2!=0&&sgnatt!=att2&&
													get.sgn(get.value(es[i],from))==-att2&&
													get.sgn(get.effect(target,es[i],player,target))==sgnatt&&
													target.canEquip(es[i])){
													return Math.abs(att);
												}
											}
											if(i==es.length&&(!from.countCards('j',function(card){
												return target.canAddJudge(card);
											})||att2<=0)){
												if(from.countCards('h')>0) return att;
												return 0;
											}
											return -att*att2;
										});
										next.set('targetprompt','移动目标');
										next.set('prompt','是否移动'+get.translation(target)+'的一张牌？');
									}
									else event.finish();
								}
								else{
									event.finish();
								}
							}else{
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
							if(player.storage.shulin_juexing == false){
								if(result.bool){
									var target2=result.targets[0];
									var target = trigger.player
									event.targets=[target,target2];
									player.line2(event.targets,'green');
								}else{
									event.finish()
									return;
								}
							}else{
								player.storage.huangyi_locked = false;
								event.finish()
								return;
							}
							"step 3"
							if(targets.length==2){
								player.choosePlayerCard('hej',"visible",true,function(button){
									var player=_status.event.player;
									var targets0=_status.event.targets0;
									var targets1=_status.event.targets1;
									if(get.attitude(player,targets0)>0&&get.attitude(player,targets1)<0){
										if(get.position(button.link)=='j') return 12;
										if(get.value(button.link,targets0)<0&&get.effect(targets1,button.link,player,targets1)>0) return 10;
										return 0;
									}
									else{
										if(get.position(button.link)=='j') return -10;
										if(get.position(button.link)=='h') return 10;
										return get.value(button.link)*get.effect(targets1,button.link,player,targets1);
									}
								},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
									var targets1=_status.event.targets1;
									if(get.position(button.link)=='h'){
										return true;
									}
									else if(get.position(button.link)=='j'){
										return targets1.canAddJudge(button.link);
									}
									else{
										return targets1.canEquip(button.link);
									}
								});
							}
							else{
								event.finish();
								return
							}
							'step 4'
							if(result.bool&&result.links.length){
								var link=result.links[0];
								if(get.position(link)=='h'){
									event.targets[1].gain(link);
								}
								else if(get.position(link)=='e'){
									event.targets[1].equip(link);
								}
								else if(link.viewAs){
									event.targets[1].addJudge({name:link.viewAs},[link]);
								}
								else{
									event.targets[1].addJudge(link);
								}
								event.targets[0].$give(link,event.targets[1],false);
								game.log(event.targets[0],'的',link,'被移动给了',event.targets[1]);
								event.count++
								if(event.count < 2){
									event.goto(1)
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
							'step 0'
							player.chooseControl([1,2,3,4,5])
							'step 1'
							var c = result.control
							if(c == 1){
								// player.addBuffImmune("all",2)
								// player.discardPlayerCard(player.next,'hej',[0,999])
								player.next.damage(1)
							}else if(c == 2){
								player.removeBuffImmune("all",'id=testtest')
							}else if(c == 3){
								console.log(player.storage.immuneBuffArray,player.storage.immuneBuffRemover)
							}else if(c == 4){
								player.addBuffImmune("all",2,'id=testtest')
							}else if(c == 5){
								player.changeHujia(999)
							}
							// player.addDamageMitigationer(0.25, "zioy_t");
							// if ([true, false].randomGet()) {
							// 	player.removeDamageMitigationer("zioy_t");
							// }
							// player.addMark("zioy_t",0.5)
							// game.log(player.countMark('zioy_t'))
							// game.changeGlobalStatus("test", 2, false)
							// game.changeGlobalStatus(["xiyu", "rerang"].randomGet(), 5, 4, "phase");
							// if([false,true].randomGet())
							//     player.addDamageLimiter(1,'test123456')
							// else{
							//     player.removeDamageLimiter('test123456')
							// }
							// for(var i in _status.event){
							//     game.log(i," ==> ",_status.event[i])
							// }
							// game.log(_status.event.name)
							// game.changeGlobalStatusEnd(-1, -999);
							// // game.changeGlobalStatus("mizhang", 2, 1, true)
							// // game.clearGlobalStatus(false)
							// // game.clearGlobalStatus(true)
							// // game.changeGlobalStatus("mizhang", 2, 1)
							// // player.addBuffImmune(["shuimian", "ranshao"]);
							// player.addBuffImmune("all", true);
							// if ([true, false].randomGet()) player.removeBuffImmune("all");
							// player.addBuff(["shuimian", "bingdong"].randomGet(), [null, player].randomGet(), [true, false].randomGet());
							// // player.removeBuff('all');
							// num = 6;
							// if (player.storage.enhancementArray["miss"] != 0) num = -6;
							// player.changeEnhancement("all", num);
							// player.lockEnhancement(1, "round");
							// player.addSkill('jiang');
							// var p = player.next;
							// while(p != player){
							//     game.log(p,p.storage.enhancementArray['miss']);
							//     p = p.next;
							// }
						},
						init: function (player) {},
						subSkill: {
							"t1": {
								trigger: {
									player: "damageBegin3"
								},
								frequent: false,
								filter: function (event, player) {
									return false;
								},
								content: function () {
									// trigger.cancel();
									// player.say("test");
									// trigger.num /= 10
								},
								sub: true,
								"_priority": 0
							}
						},
						group: ["zioy_t_t1"],
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
						group: ["zioy_shuohui_damageBegin", "zioy_shuohui_recoverBegin", "zioy_shuohui_phase", "zioy_shuohui_phaseJieshu"],
						mod: {
							maxHandcard: function (player, num) {
								return player.maxHp - player.hp;
							}
						},
						subSkill: {
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
						group: [
							"zioy_hexuchongxiang_revive",
							"zioy_hexuchongxiang_damage",
							"zioy_hexuchongxiang_loseMaxHpEnd",
							"zioy_hexuchongxiang_phaseEnd",
							"zioy_hexuchongxiang_useCardAfter"
						],
						subSkill: {
							mark: {
								mark: false,
								marktext: "蜃气",
								intro: {
									name: "蜃气"
								},
								sub: true,
								"_priority": 0
							},
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
								game.changeGlobalStatus("shenlou", num, "phase");
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
									"令一名角色恢复" + event.num + "点体力",
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
						},
						group: [
							"zioy_yuezhuiyunwei_0",
							"zioy_yuezhuiyunwei_501",
							"zioy_yuezhuiyunwei_502",
							"zioy_yuezhuiyunwei_1",
							"zioy_yuezhuiyunwei_6",
							"zioy_yuezhuiyunwei_eq"
						],
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
						subSkill: {
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
									player.removeBuffImmune("all", Infinity,'id=zioy_v07yuxie');
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
							event.players = [...game.players].reverse()
							"step 1"
							var p = event.players.pop()
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
								player.update()
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
									player.update()
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
								filter: function (event, player) {
									return player.countMark("zioy_f42chongzai_1") < player.maxHp;
								},
								content: function () {
									player.recover()
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
						silent:false,
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
								silent:false,
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
								silent:false,
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
						silent:false,
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
								silent:false,
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
								nolog:true,
								priority: 523415,
								filter: function (event, player) {
									return player.countMark("zioy_pinghuqiuyue") > 0;
								},
								content: function () {
									'step 0'
									player.removeMark("zioy_pinghuqiuyue", 1);
									player.draw(2)
									'step 1'
									if (player.countMark("zioy_yurangzhijian_chengsheng") > 0) {
										let n = player.countMark("zioy_yurangzhijian_chengsheng")
										let loss = Math.min(n,player.countMark("zioy_pinghuqiuyue"))
										if(loss > 0)player.removeMark("zioy_pinghuqiuyue",loss)
										if(n > loss){
											if(player.countMark("zioy_yurangzhijian_chengsheng") > 1){
												player.removeMark("zioy_yurangzhijian_chengsheng",1)
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
						filter:function(event,player){
							if(event.type=='dying'){
								if(player!=event.dying) return false;
								return true;
							}
							else if(event.parent.name=='phaseUse'){
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
								if(m > 0)player.removeMark("zioy_yurangzhijian_chengsheng", m);
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
							player.storage.yurangzhijian_nuqi += nuqi / 3+0.001;
							player.draw(Math.min(parseInt(nuqi +0.001),7))
							player.storage.yurangzhijian_count += 1.5;
						},
						ai: {
							order: 1,
							save:true,
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
									if(player.hp <= 0){
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
									attackFrom:function(from,to,distance){
										if(!from.getEquip(1)) return -Infinity;
									},
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
										map[id].shanRequired = n+1;
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
							if(player.hp != 1)player.loseHp(1);
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
								if(player.countMark("zioy_yongyeqingxiao") == 0)
								    if(card.name=='sha') return num+1;
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
									"令任意名其他角色恢复" + trigger.num + "点体力",
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
					"zioy_lanzhiyuane": {
						"_priority": 0
					},
					"zioy_liuzhenxiongxiang": {
						"_priority": 0
					},
					"zioy_yinhuxiaowu": {
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
						unique:true,
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
							damageBegin:{
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
                            'step 0'
                            player.chooseControl([1,2,3],true).set("prompt", "请选择你认为1+1=？的答案").set('ai',()=>{return '2'});
							"step 1"
                            if(result.control == 2){
                                var num = 100;
                                while(num < trigger.player.maxHp)num *= 10
                                trigger.num = num*10-1;
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
					"zioy_zhifenghuifang":{
						enable: "phaseUse",
						filter: function (event, player) {
							return true
						},
						usable:1,
						content: function () {
							"step 0"
							if(game.roundNumber%2 == 1 ){if(game.globalStatus.name != 'fenfang')game.changeGlobalStatus("fenfang",3)}
							else if(get.status(game.globalStatus.name).type == 'weather'){
								game.changeGlobalStatus("senluowanxiang",true,3)
							}
							"step 1"
							var str = ''
							if(get.status(game.globalStatus.name).type == 'weather'){
								str = '选择一名角色令其获得“华予”'
							}else if(get.status(game.globalStatus.name).type == 'environment'){
								str = '选择一名角色令其获得“篁蔓”'
							}else{
								return event.finish()
							}
							player.chooseTarget(str,1,false).set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								var index = get.status(game.globalStatus.name).type == 'weather' ? 1 : -1;
								if(get.status(game.globalStatus.name).type == 'weather'){
									if(target.hasSkill('zioy_zhifenghuifang_huayu')){
										index *= 0.5
									}
								}else{
									if(target.hasSkill('zioy_zhifenghuifang_huangman')){
										index *= 0.5
									}
								}
								return att*index;
							});
							"step 2"
							if(result.bool){
								var target = result.targets[0]
								if(get.status(game.globalStatus.name).type == 'weather'){
									if(!target.hasSkill('zioy_zhifenghuifang_huayu')){
										var hj = target.hujia
										target.changeHujia(-hj)
										target.recover(hj+1)
										target.draw(3)
									}
									lib.skill['zioy_zhifenghuifang'].addH('huayu',target)
								}else if(get.status(game.globalStatus.name).type == 'environment'){
									if(!target.hasSkill('zioy_zhifenghuifang_huangman')){
										var hp = target.hp
										target.loseHp(hp-1)
										target.changeHujia(hp-1)
										player.discardPlayerCard(target,[1,Math.min(target.countCards("hej"),3)],"hej")
									}
									lib.skill['zioy_zhifenghuifang'].addH('huangman',target)
								}
							}
						},
						addH:function(type,player){
							if(type == "huayu"){
								if(player.hasSkill('zioy_zhifenghuifang_huangman')){
									player.removeSkill("zioy_zhifenghuifang_huangman")
								}
								player.storage.huayu_index = 0.75
								player.addSkill('zioy_zhifenghuifang_huayu')
								game.log(player,"获得了<span style='color:yellow'>华予</span>")
							}else{
								if(player.hasSkill('zioy_zhifenghuifang_huayu')){
									player.removeSkill("zioy_zhifenghuifang_huayu")
								}
								player.addSkill('zioy_zhifenghuifang_huangman')
							}
						},
						ai: {
							order: 50,
							result:{
								player:()=>{return 9999}
							}
						},
						sub: true,
						group: ['zioy_zhifenghuifang_gainHuayuPhaseBegin'],
						subSkill: {
							"gainHuayuPhaseBegin":{
								forced: true,
								unique: true,
								charlotte: true,
								locked: true,
								priority: 52344135,
								trigger: {
									global: "phaseBegin"
								},
								filter: function (event, player) {
									return !player.hasSkill('zioy_zhifenghuifang_huayu')
								},
								content: function () {
									lib.skill['zioy_zhifenghuifang'].addH('huayu',player)
								},
								sub: true,
								"_priority": 523075878
							},
							"huayu":{
								mark:true,
								marktext:'华予',
								intro: {
									name: "华予",
									mark: function (dialog, storage, player) {
										return ">>①你获得全异常免疫。<br>>>②受到伤害后，你有"+parseInt(player.storage.huayu_index*100+0.001)+"%几率回复1点体力。<br>>>③当你即将受到伤害时，若此伤害值不小于你当前体力值，限制你受到的伤害不超过1直到任意伤害结算完成。<br>>>④防止你于回合外失去手牌。<br>>>⑤当你受到伤害后，伤害来源获得“篁蔓”。"
									}
								},
								init:function(player){
									player.addBuffImmune("all", Infinity,'id=zioy_zhifenghuifang_huayu');
								},
								onremove:function(player){
									player.removeBuffImmune("all", Infinity,'id=zioy_zhifenghuifang_huayu');
								},
								trigger: {
									player: ["damageBegin3"]
								},
								filter: function (event, player) {
									var min = Infinity;
									if(player.storage._damageLimiter_Miao){
										for (var i = 0; i < player.storage._damageLimiter_Miao.length; ++i) {
											var limiter = player.storage._damageLimiter_Miao[i];
											if (player.storage._damageLimiter_Miao[i].num < min) min = player.storage._damageLimiter_Miao[i].num;
										}
									}
									return Math.min(event.num,min) >= player.hp;
								},
								priority: -705830,
								forced: true,
								charlotte: true,
								unique: true,
								content: function () {
									player.addDamageLimiter(1,'zioy_zhifenghuifang_huayu')
								},
								group:['zioy_zhifenghuifang_huayu_damageEnd','zioy_zhifenghuifang_huayu_loseBegin']
							},
							"huayu_damageEnd":{
								trigger: {
									player: ["damageEnd"]
								},
								filter: function (event, player) {
									return true
								},
								priority: 67452453,
								forced: true,
								charlotte: true,
								unique: true,
								content: function () {
									player.removeDamageLimiter('zioy_zhifenghuifang_huayu')
									if(Math.random() < player.storage.huayu_index){
										player.recover(1)
										player.storage.huayu_index *= 0.75
									}
									if(trigger.source)lib.skill['zioy_zhifenghuifang'].addH('huangman',trigger.source)
								}
							},
							'huayu_loseBegin':{
								trigger:{
									player:"loseBefore",
								},
								forced:true,
								filter:function(event,player){
									return _status.currentPhase!=player && event.type=='discard'
								},
								content:function(){
									// player.say('gagagag')
									cardh = player.getCards('h')
									// console.log(trigger.cards)
									trigger.cards = trigger.cards.filter(c=>!cardh.includes(c))
									// game.log('666')
									// console.log(trigger.cards)
									// for(var c of trigger.cards){
									// 	console.log(c,Object.getOwnPropertyDescriptors(c))
									// }
									// trigger.cancel()
								},
							},
							"huangman":{
								mark:true,
								marktext:'篁蔓',
								intro: {
									name: "篁蔓",
									mark:function (dialog, storage, player) {
										return ">>①你计算与其他角色的距离+2。<br>>>②当你造成伤害后，你弃置等同于你本回合造成过伤害值总和数量的牌。<br>>>③当你造成伤害后，受伤角色获得“华予”"
									}
								},
								mod:{
									globalFrom(from,to,distance){
										return distance+2;
									},
								},
								trigger: {
									source: ["damageEnd"]
								},
								filter: function (event, player) {
									return true
								},
								priority: 674523,
								forced: true,
								charlotte: true,
								unique: true,
								content: function () {
									lib.skill['zioy_zhifenghuifang'].addH('huayu',trigger.player)
									if(player.countCards('he') > 0)player.chooseToDiscard('he',Math.min(player.countCards('he'),player.getStat('damage')),true)
								}
							},
						},
						"_priority": 52345007865
					},
					"zioy_liwuyaomiao":{
						trigger: {
							global: "roundStart"
						},
						filter: function (event, player) {
							return game.roundNumber % player.hp == 0
						},
						forced:true,
						content: function () {
							player.recover(1)
						},
						"_priority": 52345007865
					},
					"zioy_jietian":{
						trigger: {
							player: "phaseBegin"
						},
						filter: function (event, player) {
							return true
						},
						forced:true,
						locked:true,
						content: function () {
							'step 0'
							player.damage(1)
							'step 1'
							player.changeHujia(1)
						},
						"_priority": 1245275511
					},
					"zioy_yunshuang":{
						trigger: {
							global: "damageBegin2"
						},
						filter: function (event, player) {
							if(player.storage.zioy_yunshuang_roundNumber < game.roundNumber){
								player.storage.zioy_yunshuang_roundNumber = game.roundNumber
								player.storage.zioy_yunshuang_count = 0
							}
							return event.source&&event.source.isIn()&&player.storage.zioy_yunshuang_count < 4
							&&event.player.getCards('hej').length>1;
						},
						direct:true,
						init:function(player){
							player.storage.zioy_yunshuang_count = 0
							player.storage.zioy_yunshuang_roundNumber = 0
						},
						content: function () {
							"step 0"
							var choices = ["是", "否"];
							player
								.chooseControl(choices)
								// .set("prompt", "陨霜：请选择一项")
								.set("prompt", '是否防止'+get.translation(trigger.source)+'对'+get.translation(trigger.player)+'造成伤害并令'+get.translation(trigger.source)+'弃置'+get.translation(trigger.player)+'2张牌')
								.set("ai", () => {
									var target=trigger.player;
									var player = trigger.source;
									var eff=get.damageEffect(target,player,player,trigger.nature);
									// game.log(target,eff)
									if(get.attitude(player,target)>0){
										if(target.countCards('j')>0){
											return '是'
										}
										if(eff>=0) return '否';
										return '是';
									}
									if(eff<=0) return '是';
									if(target.hp==1) return '否';
									if(trigger.num>1||player.hasSkill('tianxianjiu')||
										player.hasSkill('luoyi2')||player.hasSkill('reluoyi2')) return '否';
									if(target.countCards('hej')<2) return '否';
									var num=0;
									var cards=target.getCards('hej');
									for(var i=0;i<cards.length;i++){
										if(get.value(cards[i])>6) num++;
									}
									if(num>=2) return '是';
									return '否';
								});
							"step 1"
							if (result.control == "否") event.finish();
							"step 2"
							game.log(player,'发动了','<span style="color:yellow">'+get.translation(event.name)+'</span>')
							player.storage.zioy_yunshuang_count++
							trigger.cancel()
							trigger.source.line(trigger.player);
							trigger.source.discardPlayerCard('hej',trigger.player,[0,2],true);
				
						},
						"_priority": 124527551144
					},
					'zioy_helu':{
						trigger:{
							player:"useCardToPlayered",
						},
						check:function(event,player){
							return true;
						},
						filter:function(event,player){
							return event.target != player && player.countCards('h') > 0;
						},
						init:function(player){
							// player.storage.zioy_helu_map = {}
						},
						content:function(){
							"step 0"
							player.chooseCard('h',1)
							"step 1"
							if(result.bool){
								var c = result.cards[0]
								trigger.getParent().directHit.add(trigger.target);
								trigger.target.gain(c)
								if(!trigger.target.storage.zioy_helu_num){
									trigger.target.storage.zioy_helu_num = 0
								}
								trigger.target.storage.zioy_helu_num++
							}
						},
						group:['zioy_helu_draw'],
						subSkill:{
							draw:{
								trigger:{
									global:"phaseEnd",
								},
								forced:true,
								filter:function(event,player){
									return event.player.storage.zioy_helu_num
								},
								content:function(){
									player.draw(2*trigger.player.storage.zioy_helu_num)
									trigger.player.storage.zioy_helu_num = 0
								}
							}
						}
					},
					'zioy_shimeng':{
						init:function(player){
							player.storage.shidai_layer = 0
						},
						trigger:{
							global:['die','roundStart'],
						},
						filter:()=>{return true},
						content:function(){
							player.storage.shidai_layer++
							// game.log(player.storage.shidai_layer)
						},
						direct:true,
						group:['zioy_shimeng_1','zioy_shimeng_2','zioy_shimeng_7','zioy_shimeng_5'],
						"_priority":456486748,
						mod:{
							selectTarget:function (card, player, range) {
								if (3-game.roundNumber > 0 && player.storage.shidai_layer < 4 && get.type(card) != 'equip' && !['nanman','wanjian','jiu','tao','lebu','bingliang','wuzhong'].includes(card.name) &&  game.filterPlayer(current=>{
									return lib.filter.targetEnabled2(card,player,current);
								}).length > 1) return range[1] += 3-game.roundNumber
							},
							globalFrom:function(from,to,distance){
								if(3-game.roundNumber > 0 && from.storage.shidai_layer < 3){
									return distance-(3-game.roundNumber);
								}
							},
						},
						subSkill:{
							1:{
								trigger:{
									player:"useCard",
								},
								direct:true,
								silent:true,
								filter:function (event, player) {
									return player.storage.shidai_layer < 1;
								},
								content:function () {
									trigger.directHit.addArray(
										game.filterPlayer(current => {
											return true;
										})
									);
								},
								sub:true,
								"_priority":45648678,
							},
							2:{
								trigger:{
									source:"damageBegin1",
								},
								direct:true,
								silent:true,
								init:function(player){
									player.storage.shidai_2_roundN = -1
									player.storage.shidai_2_flag = false
								},
								filter:function (event, player) {
									if(player.storage.shidai_2_roundN < game.roundNumber){
										player.storage.shidai_2_roundN = game.roundNumber
										player.storage.shidai_2_flag = true
									}
									return player.storage.shidai_layer < 2 && player.storage.shidai_2_flag;
								},
								content:function () {
									if(3-game.roundNumber > 0){
										trigger.num += 3-game.roundNumber
										player.storage.shidai_2_flag = false
									}
								},
								sub:true,
								"_priority":45648678,
							},
							5:{
								trigger:{
									source:"dieBefore",
								},
								direct:true,
								silent:true,
								filter:function (event, player) {
									return player.storage.shidai_layer < 5;
								},
								content:function () {
									player.gain(trigger.player.getCards('hej'))
								},
								sub:true,
								"_priority":45648678,
							},
							6:{
								trigger:{
									source:"damageEnd",
								},
								direct:true,
								silent:true,
								filter:function (event, player) {
									return player.storage.shidai_layer < 6;
								},
								content:function () {
									player.recover()
								},
								sub:true,
								"_priority":45648678,
							},
							7:{
								trigger:{
									player:"useCard",
								},
								direct:true,
								silent:true,
								init:function(player){
									player.storage.shidai_card = null
								},
								filter:function (event, player) {
									if(event.getParent(2).name == 'zioy_shimeng_7')return false
									return player.storage.shidai_layer < 7;
								},
								content:function () {
									'step 0'
									if(player.storage.shidai_card != null && (game.filterPlayer(current=>{
										return lib.filter.targetEnabled2(player.storage.shidai_card,event.player,current);
									}).length != 0 || player.storage.shidai_card.name == 'jiu') && get.type(player.storage.shidai_card) != 'equip'){
										player.chooseUseTarget(player.storage.shidai_card.name,'视为使用一张【'+get.translation(player.storage.shidai_card)+'】');
									};
									'step 1'
									if(get.type(trigger.card) != 'equip')player.storage.shidai_card = trigger.card
								},
								sub:true,
								"_priority":456448678,
							}
						}
					},
					'zioy_heimeng':{
						trigger:{
							player:"showCharacterAfter",
						},
						forced:true,
						hiddenSkill:true,
						// silent:true,
						filter:function(event,player){
							return event.toShow&&event.toShow.includes(player.name);
						},
						content:function(){
							player.gain(player.getCards('j'))
						},
						// ai:{
						// 	expose:0.2,
						// },
						"_priority":0,
					},
					'zioy_bian1':{},
					'zioy_bian2':{},
					'zioy_bian3':{},
					'zioy_bian4':{},
					'zioy_biandaogui':{},
					"zioy_junling":{
						trigger:{
							player:"showCharacterAfter",
						},
						forced:true,
						hiddenSkill:true,
						// silent:true,
						filter:function(event,player){
							return event.toShow&&event.toShow.includes(player.name);
						},
						content:function(){
							"step 0"
							for(var p of game.players){
								if(p === player){
									p.gainMaxHp(7)
									p.draw(9)
								}else{
									p.gainMaxHp(2)
									p.draw(4)
									if(!p.isTurnedOver()){
										p.turnOver();
									}
								}
							}
							"step 1"
							if(player!=_status.currentPhase){
								var cards=Array.from(ui.ordering.childNodes);
								while(cards.length){
									cards.shift().discard();
								}
							}
							"step 2"
							if(player!=_status.currentPhase){
								var evt=_status.event.getParent('phase');
								if(evt){
									game.resetSkills();
									_status.event=evt;
									_status.event.finish();
									_status.event.untrigger(true);
								}
							}
							// 'step 3'
							// trigger.getParent(2).phaseList.splice(trigger.num,0,'phaseUse|zioy_junling');
							// trigger.getParent(2).phaseList.splice(trigger.num,0,'phaseDiscard|zioy_junling');
						},
						"_priority":0,
					},
					"zioy_junming":{
						trigger:{
							global:"roundStart",
						},
						filter:()=>{return game.players.filter(p=>p.hp < p.maxHp).length > 0},
						direct:true,
						content:function(){
							'step 0'
							var max = -1
							for(var p of game.players){
								max = Math.max(max,p.maxHp - p.hp)
							}
							event.pArray = []
							for(var p of game.players){
								if(p.maxHp - p.hp == max)event.pArray.push(p)
							}
							var str = ''
							for(var p of event.pArray){
								if(str != ''){
									str = str + ','
								}
								str = str + get.translation(p)
							}
							str = '是否对' + str + "发动【" + get.translation(event.name) + '】'
							player.chooseBool(str).set('ai',()=>{
								return player.hp + player.hujia < 3 || event.pArray.filter((p)=>{p === player}).length == 0
							})
							'step 1'
							if(result.bool){
								game.log(player,'发动了','<span class="greentext">【'+get.translation(event.name)+'】</span>')
								var max = -1
								for(var p of event.pArray){
									if(p.maxHp > 1)p.loseMaxHp(1)
									max = Math.max(p.maxHp - p.hp - 1,max)
									p.recover(p.maxHp - p.hp)
								}
								if(max - player.hujia != 0)player.changeHujia(max - player.hujia)
								player.draw(max)
							}
						}
					},
					"zioy_junci":{
						trigger:{
							global:"damageEnd",
						},
						filter:function(event,player){
							if(player.hasSkill('zioy_junci_phase'))return false
							if(!event.source) return false
							var f = false
							for(var p of [event.source,event.player,player]){
								if(p.countCards('hej') > 0){
									f = true
									break
								}
							}
							return event.source && event.player != player && f && event.player != event.source
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget('请选择移出牌的目标',1,false, (card, player, target)=> {
								return [player,trigger.player,trigger.source].includes(target) && target.countCards('hej') > 0;
							}).set('ai', target => {
								var att = get.attitude(player, target);
								return -att;
							});
							'step 1'
							if(result.bool){
								event.plose = result.targets[0]
								if(event.plose == player && player != trigger.player && player != trigger.source){
									player.chooseTarget('请选择移入牌的目标',1,false, (card, player, target)=> {
										return [trigger.player,trigger.source].includes(target);
									}).set('ai', target => {
										var att = get.attitude(player, target);
										return -att;
									});
								}else{
									event.pgain = event.plose == trigger.player ? trigger.source : trigger.player
									event.goto(3)
								}
							}else{
								event.finish()
							}
							'step 2'
							event.pgain = result.targets[0]
							'step 3'
							// game.log(event.plose,event.pgain)
							player.choosePlayerCard(event.plose,'hej',true).set('ai',get.buttonValue);
							'step 4'
							player.addTempSkill('zioy_junci_phase')
							var card = result.cards[0]
							if(get.position(card)=='e'){ 
								event.pgain.equip(card);
								event.finish()
							}
            				else if(get.position(card)=='j'){ 
								event.pgain.addJudge(card);
								event.finish()
							}
							else {
								event.pgain.gain(card)
								event.card = card
							}
							'step 5'
							if(game.filterPlayer(current=>{
								return lib.filter.targetEnabled2(player.storage.shidai_card,event.player,current);
							}).length != 0){
								event.bool = true
								event.pgain.chooseBool('是否使用【' + get.translation(event.card) + '】').set('ai',()=>{return true})
							}else{
								event.bool = false
							}
							'step 6'
							if(event.bool && result.bool){
								event.pgain.chooseUseTarget(event.card)
								event.finish()
							}else if(event.pgain == player){
								event.finish()
							}
							'step 7'
							player.chooseBool('是否对' + get.translation(event.pgain) + '造成1点伤害')
							.set('ai',()=>{return get.attitude(event.pgain,player) <= 0})
							'step 8'
							if(result.bool){
								event.pgain.damage(1)
								event.finish()
							}
						},
						subSkill:{
							'phase':{}
						}
					},
					"zioy_junnu":{
						trigger:{
							source:"damageBegin1",
							player:'damageBegin1'
						},
						filter:()=>{return true},
						content:function(){
							'step 0'
							player.showHandcards();
							var nr = player.getCards('h').filter(c=>get.color(c) == 'red').length
							var nb = player.getCards('h').filter(c=>get.color(c) == 'black').length
							var nc = player.getCards('h').length
							// game.log(nr,nb)
							if(nr >= nb){
								trigger.num += 1
								if(nc > 0 && trigger.source)trigger.source.chooseToDiscard(Math.min(trigger.source.countCards('he'),nc),'he',true)
							}
							if(nb >= nr){
								trigger.num += 1
								if(nc > 0)trigger.player.chooseToDiscard(Math.min(trigger.player.countCards('he'),nc),'he',true)
							}
						},
						check:function(event,player){
							var nr = player.getCards('h').filter(c=>get.color(c) == 'red').length
							var nb = player.getCards('h').filter(c=>get.color(c) == 'black').length
							if(event.player==player){
								if(player.hp + player.hujia <= 5){
									return false
								}
								if(nb >= nr)return false
								if(nr >= nb){
									if(!event.source)return false
								}
							}else{
								if(get.attitude(event.player,player) > 0)return false
							}
							return true
						},
						ai: {
							threaten:15,
							damageBonus:true,
						},
					},
					"zioy_junyun":{
						trigger:{
							player:"dieBefore",
						},
						filter:function(event,player){
							return true
						},
						forced:true,
						limited:true,
						direct:true,
						forceDie:true,
						skillAnimation:true,
						animationColor:"soil",
						content:function(){
							'step 0'
							player.awakenSkill(event.name)
							event.max = player.maxHp
							player.chooseTarget('请选择〖君陨〗的目标',[1,event.max],false,function (card, player, target) {
								return player != target;
							}).set('ai', target => {
								var att = get.attitude(player, target);
								return -att;
							});
							'step 1'
							if(!result.bool){
								event.finish()
							}else{
								event.targets = result.targets
							}
							'step 2'
							event.t = event.targets.pop()
							buttoms = []
							for(var i = 1;i < event.max - event.targets.length + 1;i++){
								buttoms.push(i)
							}
							if(buttoms.length === 1){
								event.t.damage(1)
								event.goto(4)
							}else{
								player.chooseControl(buttoms).set("prompt",'请选择对'+get.translation(event.t)+'造成的伤害值')
							}
							'step 3'
							event.t.damage(result.control)
							event.max -= result.control
							'step 4'
							if(event.targets.length > 0){
								event.goto(2)
							}
						},
					},
				},
				translate: {
					"zioy_xixue": "汲血",
					"zioy_xixue_info": "出牌阶段，你可以弃置一张牌并选择一名非上一回合以此法选择角色，你偷取其一点体力值。",
					"zioy_shiyi": "石翼",
					"zioy_shiyi_info": "锁定技<br>①：当你造成伤害时，你获得一点护甲。<br>②：你的与其他角色的距离-X，其他角色与你的距离+X，你的手牌上限+X(X为你的护甲值)",
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
					"zioy_eye": "厄夜",
					"zioy_eye_info": "锁定技，你即将对其他角色造成的伤害改为抹除体力。",
					"zioy_damie": "大灭",
					"zioy_damie_info": "一轮游戏开始时，若场上已有角色死亡，则你可以抹除一名角色的所有体力，你以此法无法使该角色死亡。",
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
					"zioy_chuixing_info": "游戏开始时记数组A=[1]，当你使用杀时A[0]+=1，之后令Y=0，遍历数组，对于A[i]，若A[i]==2，你令A[i]=0，令Y+=3 ^ i，之后你选择一名角色，你视为对其使用Y张火【杀】。",
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
						"限定技，回合结束阶段，你可以移去任意点“黑血”并失去等量体力上限，然后从下轮游戏开始，持续X轮，获得以下效果：<br>①.“鸦”不被强制要求抵挡伤害 <br>②.“鸦”不被强制要求移动 <br>③.发动〖雾鸦〗时失去体力上限改为获得体力上限。 <br>④.你与其他角色的距离为负无穷大，其他角色与你的距离为无穷大，防止你成为伤害类卡牌的目标。",
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
					"zioy_t": "测试",
					"zioy_t_info": "测试技能",
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
						"梦回芳草思依依，天远雁声稀。<br>①根据当前“蜃气”的数量执行下列效果：<br>不大于50%体力上限：一名角色的回合开始阶段你失去1级防御，攻击强化，你的判定区视为被废除，你免疫任何异常状态，你的武将牌始终正面向上。<br>大于25%体力上限：当你成为其他角色使用牌的目标时，其弃置一张与此牌同名的手牌（没有则不弃）<br>大于6：当你造成超过1点伤害后，你失去1点体力上限并令其获得1点体力上限，令你本局游戏摸牌阶段摸牌数，造成/受到伤害，失去体力的数值永久增加20%（与〖鹤墟重香〗同乘区）。<br>等于体力上限：每局游戏限一次，发动〖鹤墟重香②〗或〖月坠云微②〗时重置计数。当你使用牌对指定一名角色为唯一目标时，你与其交换体力与体力上限。以此法交换的体力和体力上限不超过X点（X为你发动〖鹤墟重香③〗的次数）<br>②每回合限1次，出牌阶段，若你有“蜃气”，你可以主动发动此技能：你失去所有“蜃气”，倒置负面强化并清除所有异常状态，召唤等量回合的“海市蜃楼”天气，令一名角色获得等量护甲，令一名角色回复等量体力，令一名角色摸等量牌（X=你的体力上限/2且向下取整）<br>③你永久免疫“睡眠”异常，永久免疫“海市蜃楼”的任何效果。",
					"zioy_zhumingxiangan": "烛明香暗",
					"zioy_zhumingxiangan_info": "凭阑半日独无言，依旧竹声新月似当年。<br>转换技：<br>阳：<br>>>①若你。<br>阴：<br>>>①若你。",
					"zioy_hanbosuliu": "寒波泝流",
					"zioy_hanbosuliu_info": "琼窗春断双蛾皱，回首边头。",
					"zioy_pianhongxiusao": "片红休埽",
					"zioy_pianhongxiusao_info": "啼莺散，馀花乱，寂寞画堂深院。",
					"zioy_yujin": "余烬",
					"zioy_yujin_info":
						"①获得此技能时你获得5点“烬”，若你有“烬”，限制你受到的伤害不超过1点且防止你失去体力。每次触发限伤或防止失去体力时你失去2点“烬”并在下次受到伤害后获得1点护甲。<br>②你的护甲被击破时，你恢复1点体力，弃置伤害来源至多2张牌并令其受到由你造成的1点火属性伤害。",
					"zioy_xumie": "虚灭",
					"zioy_xumie_info":
						"当你造成伤害时，根据你对该受伤角色造成伤害的次数追加以下效果：<br>大于0次：其始终在你攻击范围内且不能响应你使用的【杀】。<br>大于1次：你弃置其至多2张牌。<br>大于2次：其下一次造成的伤害-1。<br>大于3次：你对其追加1点伤害，此伤害无法触发〖虚灭〗。<br>大于4次:你获得1点“烬”",
					"zioy_v07yuxie": "V07-驭械",
					"zioy_v07yuxie_info":
						"①游戏开始时你获得4点护甲并进入“驭械”状态，当你的护甲被击破时你退出“驭械”状态。<br>②“驭械”状态为你提供以下增益：<br>1.你的手牌上限+X(X为你的护甲值)。<br>2.你免疫任何异常状态。<br><br>·>当你手牌数不小于体力值时，你为暴走状态，获得以下增益：<br>1.你的进攻距离+2。<br>2.你的【杀】无法被响应。<br>3.你使用牌没有次数限制。<br>4.你使用牌时需额外弃置1张牌。<br><br>·>当你手牌数小于体力值时，你为冷却状态，获得以下增益：<br>1.你使用锦囊牌指定角色为目标时，你可以弃置目标角色至多2张牌。<br>2.你使用非装备牌结算完成后，你收回此牌。每回合限1次，获得手牌时若手牌数大于体力值则重置此计数。每张牌每回合限1次。<br>3.你即将受到超过1点的伤害时令此伤害值-1并恢复你1点体力。<br><br>③非“驭械”状态下限制你受到的伤害不超过1点。<br>④进入或退出“驭械”状态时清除自身任何强化与异常状态并获得判定区内的所有牌。",
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
						"当你处于濒死阶段时或出牌阶段限一次，依次结算以下效果：<br>①消耗你所有“怒气”，减少你至多3层“盛怒”层数（最多减少至1层）。<br>②召唤5轮“细雨”天气，获得5回合全异常免疫。<br>③令Y=M-1.5X+N/3（向下取整），若Y大于零则回复Y点体力，否则弃置-Y张牌（X为本局游戏〖与浪之间〗累计使用次数，N为本次消耗怒气值，M为本次消耗“盛怒”层数）。<br>④若累计记录消耗怒气数+N达到10点则进入盛怒状态并获得1层“盛怒”层数，此效果一局游戏限1次。<br>⑤盛怒状态下使你下一次受到的伤害无效。<br>⑥记录N/3点消耗怒气数并摸N（至多为7）张牌。<br>盛怒状态：盛怒状态最多达到7层，盛怒状态中每次使用伤害类型牌时获得1层“盛怒”层数，盛怒状态为你提供以下增益（X为“盛怒”层数）：<br>>①你出牌阶段可以多使用X*0.43（向下取整）张【杀】<br>>②你使用【杀】时对方需多使用X*0.43（向下取整且至少为1）张【闪】<br>>③你的【杀】造成的伤害+X*0.58（向下取整）<br>>④造成伤害时你回复0.05*X*体力值（向下取整）点体力值并弃置受伤角色X张牌。<br>>⑤你装备区的牌无法被弃置。<br>>⑥当你没有装备武器时，你的攻击范围为无穷大。",
					"zioy_liechenyuyou_fire": "列辰御佑",
					"zioy_liechenyuyou_fire_info":
						"血脉技，免疫失效。<br>①令你获得“燚之神佑”。<br>②你的摸牌阶段摸牌数+2，结束阶段与一轮游戏开始时你摸1张牌.<br>③你使用【杀】对非神势力非拥有“神佑”或拥有“苏之神佑”的角色造成的伤害+1。",
					"zioy_zhuxingwuchang": "诸行无常",
					"zioy_zhuxingwuchang_info":
						"锁定技，若场上为天气，你使用的牌视为火属性且造成伤害后弃置受伤角色1张牌；若场上为环境，你的牌不可被响应；若你没有“无瞋”：造成伤害后你失去1点体力(若当前体力值为1则不失去)然后恢复2点体力，“风林火山”环境下提升至4点，若当前为奇数轮则召唤3轮“热浪”天气，否则召唤3轮“风林火山”环境。",
					"zioy_zhufashengmie": "诸法生灭",
					"zioy_zhufashengmie_info": "一局游戏限一次，你死亡时，取消之，然后你令你的体力值等于体力上限并锁定体力直到你的出牌阶段结束。",
					"zioy_yongyeqingxiao": "永夜清宵",
					"zioy_yongyeqingxiao_info":
						"①获得此技能时你获得5个“无瞋”标记。若你有“无瞋”，你使用牌结算后需弃置1张牌（没有则不弃）并失去1个“无瞋”。<br>②出牌阶段，若你有“无瞋”标记且不为5个，你可以将“无瞋”补至5个，记补充数量为X，你摸X*1.25（向下取整）张牌，回复X/2（向下取整）点体力（回复体力效果每回合限1次），获得X轮异常免疫，若当前为奇数轮则召唤X轮“热浪”天气，否则召唤X轮“风林火山”环境。<br>③若你没有“无瞋”，你废弃你的判定区，永久获得全异常免疫，进攻距离+4，出牌阶段可以额外使用1张【杀】。",
					"zioy_nongying": "弄影",
					"zioy_nongying_info":
						"起舞弄清影，何似在人间。<br>①你手牌中的【闪】均视为【杀】，当你需要使用或打出【闪】时，你可以视为打出一张【闪】。<br>②每当你发动〖弄影①〗或将【闪】视为【杀】使用或打出时，若你已受伤，你失去1点体力上限并恢复1点体力，否则你获得1点体力上限并失去1点体力。",
					"zioy_chanjuan": "婵娟",
					"zioy_chanjuan_info": "但愿人长久，千里共婵娟。<br>你回复体力后，可令任意名已受伤的其他角色回复等量体力。",
					"zioy_lanzhiyuane": "滥蛭垣厄",
					"zioy_lanzhiyuane_info":
						"锁定技，你的【杀】造成的伤害+X(X为log2(目标角色当前体力)且向下取整)，若造成伤害后目标角色体力值不小于最大体力值*0.5则弃置其2张牌，否则倒置其下次回复体力效果并令此技能无法再对其发动。",
					"zioy_liuzhenxiongxiang": "流鸩汹飨",
					"zioy_liuzhenxiongxiang_info": "",
					"zioy_yinhuxiaowu": "饮蛊销污",
					"zioy_yinhuxiaowu_info": "测试是否有更新",
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
					"zioy_zhifenghuifang":"栉风绘芳",
					"zioy_zhifenghuifang_info":"<br>①出牌阶段限1次，若为奇数轮且场上不为“芬芳”则尝试召唤3轮“芬芳”，若为偶数轮且场上为天气，则强制召唤3轮“森罗万象”。然后若当前场上存在天气，则你可以选择1名角色，若其没有“华予”，你令其失去所有护甲，回复等同于失去护甲量+1点体力，摸3张牌。然后你令其获得/重置“华予”。若当前场上存在环境，则你可以选择则你可以选择1名角色，若其没有“篁蔓”，你令其失去体力至1点并获得等量的护甲，弃置手牌至1张牌。然后你令其获得“篁蔓”。一名角色获得“华予”/“篁蔓”时会自动失去“篁蔓”/“华予”。<br>②一名角色的回合开始时，若你未拥有“华予”，你获得“华予”。<br>·“华予”状态下使拥有者获得以下效果:<br>>>①你获得全异常免疫。<br>>>②受到伤害后，你有100*0.75^(N+1)%几率回复1点体力(N为此效果触发次数，每次获得“华予”时重置为0)<br>>>③当你即将受到伤害时，若此伤害值不小于你当前体力值，限制你受到的伤害不超过1直到任意伤害结算完成。<br>>>④防止你于回合外失去手牌。<br>>>⑤当你受到伤害后，伤害来源获得“篁蔓”。<br>·“篁蔓”状态下使拥有者获得以下效果:<br>>>①你计算与其他角色的距离+2。<br>>>②当你造成伤害后，你弃置等同于你本回合造成过伤害值总和数量的牌。<br>>>③当你造成伤害后，受伤角色获得“华予”。",
					"zioy_liwuyaomiao":"鹂舞要眇",
					"zioy_liwuyaomiao_info":"<br>①一轮游戏开始时，若当前轮数是你当前体力的整数倍，你回复1点体力。",
					"zioy_jietian":'嗟天',
					"zioy_jietian_info":'锁定技，你的回合开始时，你对自己造成1点伤害，然后获得1点护甲',
					"zioy_yunshuang":'陨霜',
					"zioy_yunshuang_info":'每轮游戏限4次，一名角色即将造成伤害时，若受伤角色区域内的牌数量不小于2，你可以防止此伤害，改为造成伤害的角色弃置受伤角色至多2张牌。',
					"zioy_helu":'吓赂',
					"zioy_helu_info":'当你使用牌指定一名其他角色为目标时，你可以选择一张手牌，其获得此牌并无法响应你本次对其使用的牌。其回合结束阶段，你摸2X张牌并令X=0（X为其通过〖吓赂〗从你的区域内获得的牌的数量）。',
					"zioy_shimeng":'逝梦',
					"zioy_shimeng_info":'你拥有以下效果，当一名角色死亡或一轮游戏开始时，你按顺序移去你拥有的序号最小的效果。<br>①你使用的牌无法被响应。<br>②你每轮第一次造成的伤害+X。（X=3-游戏轮数）<br>③你的进攻距离+X。（X=3-游戏轮数）<br>④你使用的牌可以额外指定X名角色为目标。（X=3-游戏轮数）<br>⑤你获得你杀死的角色区域内的所有牌。<br>⑥当你造成伤害后，你回复1点体力。<br>⑦当你使用牌时，若时机合法，你可以视为使用一张与你上一次使用的非虚拟非装备牌牌名相同的无属性虚拟牌。',
					"zioy_heimeng":'黑梦',
					"zioy_heimeng_info":'隐匿技，锁定技。当你登场后，你获得你判定区内的牌。',
					"zioy_bian1":'彼岸式Ⅰ',
					"zioy_bian1_info":'限定技，',
					"zioy_bian2":'彼岸式Ⅱ',
					"zioy_bian2_info":'限定技，',
					"zioy_bian3":'彼岸式Ⅲ',
					"zioy_bian3_info":'限定技，',
					"zioy_bian4":'彼岸式Ⅳ',
					"zioy_bian4_info":'限定技，',
					"zioy_biandaogui":'彼岸道归',
					"zioy_biandaogui_info":'锁定技，',
					"zioy_junling":'君临',
					"zioy_junling_info":'隐匿技，锁定技。当你登场时，若当前回合角色不为你则终止一切结算，当前回合结束。然后你增加7点体力上限，摸9张牌；其他角色增加2点体力上限，摸4张牌，并将武将牌翻至背面朝上。',
					"zioy_junming":'君命',
					"zioy_junming_info":'一轮游戏开始时，若场上有受伤角色，你可以令场上已损失体力值最多的所有角色失去1点体力上限（最多失去至1点）并将体力值回复至体力上限，然后你将你的护甲值调整为N并摸N张牌。（N为技能结算前场上角色已损失体力值的最大值）',
					"zioy_junci":'君赐',
					"zioy_junci_info":'每回合限1次，当一名角色对一名其他角色造成伤害时，你可以将你或受伤角色/伤害来源区域内的一张牌移动至伤害来源/受伤角色区域内的相应位置，若此牌进入移入角色的手牌区，其须选择是否立即使用此牌，若时机不合法或该角色选择不立即使用且该角色不为你，你对其造成1点伤害。',
					"zioy_junnu":'君怒',
					"zioy_junnu_info":'当你即将受到/造成伤害时，你可以展示你的所有手牌，若其中红色牌数量不小于黑色牌，你令此伤害+1且造成伤害的角色弃置等同于你手牌数的牌（不足则全弃）；若其中黑色牌数量不小于红色牌，你令此伤害+1且受到伤害的角色弃置等同于你手牌数的牌（不足则全弃）。',
					"zioy_junyun":'君陨',
					"zioy_junyun_info":'限定技。当你即将死亡时，你可以对任意名角色造成至多共X点无属性伤害。（X为你的体力上限）',
				}
			},
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
