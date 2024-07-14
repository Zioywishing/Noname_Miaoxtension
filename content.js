import miaoTool from "./miaoTool.js";

export default (lib, game, ui, get, ai, _status) => (config, pack) => {
    lib.miaoTool = miaoTool(lib, game, ui, get, ai, _status)
    // console.log(666,miaoTool(lib, game, ui, get, ai, _status))
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
        /*改变场上状态，example：game.changeGlobalStatus(5,3,"xiyu",true,"phase") 表示强制转换为细雨天气5回合并锁定3回合，来源默认为event.player*/
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
            str += '<div class="text center"><P align=left>--->效果:' + get.status(game.globalStatus).intro.replace('<br>','<br>--->') + "</P></div>";
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
            intro: "回合结束阶段令当前回合角色执行[失去log3(X)点体力（X为海市蜃楼剩余回合数，向上取整），将牌弃置至Y张（Y为体力值，至少弃置1张），获得“睡眠”异常]中随机任意项。<br>当海市蜃楼结束时，当前回合角色失去所有体力。"
        },
        "heiwu": {
            translation: "黑雾",
            skill: "zioy_status_heiwu",
            type: "weather",
            intro: "所有角色体力上限-1直到“黑雾”天气结束。"
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
                onremove: function (player) {
                    let p = _status.currentPhase
                    if(!p.storage.shenlou_noLoseHp){
                        p.loseHp(p.hp)
                    }
                },
                content: function () {
                    var r = function () {
                        return [true, false].randomGet();
                    };
                    if (r()) {
                        let n = game.globalStatus.end
                        if(game.globalStatus.timing_type === 'round'){
                            n = (n - game.roundNumber)*game.players.length
                        }
                        n = Math.ceil(Math.log(n)/Math.log(3))
                        player.loseHp(n);
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
            
            heiwu: {
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
                    return false;
                },
                init: function (player) {
                    player.loseMaxHp(1);
                },
                onremove: function (player) {
                    player.gainMaxHp(1);},
                content: function () {},
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
}