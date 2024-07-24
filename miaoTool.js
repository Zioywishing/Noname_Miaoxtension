// 用于在game.import中包裹skill，对其进行一定的预处理，使其支持一些如自动导入子技能，自动设置技能名等的功能
export function skillFactory(skill) {
	for (let skill_name in skill.skill) {
		const skill_content = skill.skill[skill_name];
		// 自动导入在autoSubSkill下的子技能
		if (skill_content.autoSubSkill) {
			skill_content.group || (skill_content.group = []);
			skill_content.subSkill || (skill_content.subSkill = {});
			// skill_content.subSkill = skill_content.subSkill ?? {};
			// skill_content.group = skill_content.group ?? [];
			for (let autoSubSkillName in skill_content.autoSubSkill) {
				skill_content.subSkill[autoSubSkillName] = skill_content.autoSubSkill[autoSubSkillName];
				skill_content.group.push(`${skill_name}_${autoSubSkillName}`);
			}
		}
		// 自动根据autoTranslate设置技能的translate相关内容
		if (skill_content.autoTranslate) {
			skill.translate[`${skill_name}`] = skill_content.autoTranslate.name;
			skill.translate[`${skill_name}_info`] = skill_content.autoTranslate.info;
		}
	}
	return skill;
}

/**
 * Description 动态载入css
 * @param {string} cssText css文本
 * @returns {null}
 */
const loadStyleString = cssText => {
	var style = document.createElement("style");
	style.type = "text/css";
	try {
		style.appendChild(document.createTextNode(cssText));
	} catch (ex) {
		style.styleSheet.cssText = cssText; // 适用于IE
	}
	document.getElementsByTagName("head")[0].appendChild(style);
};

// 储存css
const CSSS = {
	// 故障风
	glitch: {
		// 类名
		className: "avatar-glitch-style-miao",
		// css样式内容
		cssText:
			'.avatar-glitch-style-miao {animation: main-img-hide 8s infinite step-end;overflow: hidden;}.avatar-glitch-style-miao::before, .avatar-glitch-style-miao::after {position: absolute;width: inherit;height: inherit;top: 0px;left: 0;background: inherit;}.avatar-glitch-style-miao::after {content: "";animation: glitch-one 8s infinite step-end;}.avatar-glitch-style-miao::before {content: "";animation: glitch-two 8s infinite 1s step-end;}.player.dead > .avatar-glitch-style-miao {filter: grayscale(1) !important;-webkit-filter: grayscale(1);}@keyframes glitch-one {0% {clip-path: inset(140px 0 -20px);left: -2px;}1% {clip-path: inset(149px 0 4px);left: -9px;}2% {clip-path: inset(52px 0 106px);left: 15px;}3% {clip-path: inset(54px 0 96px);left: 33px;}4% {clip-path: inset(18px 0 108px);left: -2px;}5% {clip-path: inset(12px 0 121px);left: 14px;}6% {clip-path: inset(140px 0 5px);left: -4px;}7% {clip-path: inset(128px 0 1px);left: 33px;}8% {clip-path: inset(37px 0 96px);left: 37px;}9% {clip-path: inset(142px 0 -10px);left: 6px;}10% {clip-path: inset(42px 0 97px);left: 4px;}11% {clip-path: inset(130px 0 27px);left: -12px;}12% {clip-path: inset(141px 0 -7px);left: 31px;}13% {clip-path: inset(101px 0 37px);left: 20px;}14% {clip-path: inset(131px 0 14px);left: 14px;}15% {clip-path: inset(121px 0 28px);left: -18px;}16% {clip-path: inset(147px 0 4px);left: -9px;}17% {clip-path: inset(154px 0 -5px);left: 16px;}18% {clip-path: inset(107px 0 49px);left: 31px;}19% {clip-path: inset(123px 0 24px);left: 33px;}20% {clip-path: inset(44px 0 98px);left: 36px;}21% {clip-path: inset(40px 0 91px);left: 13px;}22% {clip-path: inset(53px 0 76px);left: 34px;}23% {clip-path: inset(161px 0 -30px);left: -3px;}24% {clip-path: inset(25px 0 101px);left: 14px;}25% {clip-path: inset(4px 0 149px);left: 23px;}26% {clip-path: inset(81px 0 63px);left: 6px;}27% {clip-path: inset(22px 0 100px);left: 28px;}28% {clip-path: inset(148px 0 -20px);left: -2px;}29% {clip-path: inset(69px 0 86px);left: -16px;}30% {clip-path: inset(59px 0 79px);left: 35px;}31% {clip-path: inset(8px 0 127px);left: -1px;}32% {clip-path: inset(158px 0 -14px);left: -7px;}33% {clip-path: inset(129px 0 4px);left: 13px;}34% {clip-path: inset(58px 0 91px);left: 34px;}35% {clip-path: inset(55px 0 71px);left: -4px;}36% {clip-path: inset(27px 0 99px);left: 33px;}37% {clip-path: inset(156px 0 -11px);left: -8px;}38% {clip-path: inset(166px 0 -13px);left: 23px;}39% {clip-path: inset(19px 0 132px);left: 36px;}40% {clip-path: inset(52px 0 81px);left: -1px;}41% {clip-path: inset(143px 0 -10px);left: 27px;}42% {clip-path: inset(51px 0 89px);left: -14px;}43% {clip-path: inset(100px 0 51px);left: 20px;}44% {clip-path: inset(84px 0 59px);left: 13px;}45% {clip-path: inset(68px 0 67px);left: 11px;}46% {clip-path: inset(64px 0 78px);left: -17px;}47% {clip-path: inset(7px 0 135px);left: 12px;}48% {clip-path: inset(59px 0 74px);left: 37px;}49% {clip-path: inset(86px 0 65px);left: 16px;}50% {clip-path: inset(112px 0 32px);left: 23px;}51% {clip-path: inset(64px 0 58px);left: 30px;}52% {clip-path: inset(5px 0 139px);left: -10px;}53% {clip-path: inset(85px 0 40px);left: 22px;}54% {clip-path: inset(165px 0 -8px);left: 31px;}55% {clip-path: inset(130px 0 23px);left: -6px;}56% {clip-path: inset(84px 0 54px);left: 12px;}57% {clip-path: inset(155px 0 -9px);left: -13px;}58% {clip-path: inset(61px 0 91px);left: -17px;}59% {clip-path: inset(139px 0 -15px);left: 36px;}60% {clip-path: inset(139px 0 15px);left: 40px;}61% {clip-path: inset(59px 0 76px);left: 20px;}62% {clip-path: inset(88px 0 61px);left: -2px;}63% {clip-path: inset(12px 0 140px);left: 5px;}64% {clip-path: inset(11px 0 118px);left: 27px;}65% {clip-path: inset(93px 0 32px);left: 26px;}66% {clip-path: inset(149px 0 -2px);left: 19px;}67% {clip-path: inset(165px 0 -26px);left: 38px;}68% {clip-path: inset(36px 0 123px);left: 10px;}69% {clip-path: inset(43px 0 89px);left: -16px;}70% {clip-path: inset(68px 0 55px);left: 19px;}71% {clip-path: inset(165px 0 -45px);left: -5px;}72% {clip-path: inset(120px 0 21px);left: 28px;}73% {clip-path: inset(74px 0 74px);left: -3px;}74% {clip-path: inset(37px 0 93px);left: -13px;}75% {clip-path: inset(38px 0 85px);left: 20px;}76% {clip-path: inset(96px 0 50px);left: 12px;}77% {clip-path: inset(50px 0 76px);left: 30px;}78% {clip-path: inset(120px 0 12px);left: -12px;}79% {clip-path: inset(153px 0 -4px);left: 11px;}80% {clip-path: inset(7px 0 133px);left: -13px;}81% {clip-path: inset(107px 0 17px);left: 34px;}82% {clip-path: inset(136px 0 22px);left: -9px;}83% {clip-path: inset(103px 0 28px);left: -17px;}84% {clip-path: inset(89px 0 59px);left: 1px;}85% {clip-path: inset(58px 0 83px);left: 40px;}86% {clip-path: inset(159px 0 -18px);left: 35px;}87% {clip-path: inset(155px 0 -22px);left: 24px;}88% {clip-path: inset(148px 0 -7px);left: -16px;}89% {clip-path: inset(52px 0 92px);left: 15px;}90% {clip-path: inset(94px 0 34px);left: 39px;}91% {clip-path: inset(3px 0 137px);left: 24px;}92% {clip-path: inset(143px 0 -10px);left: 13px;}93% {clip-path: inset(123px 0 31px);left: 6px;}94% {clip-path: inset(122px 0 31px);left: 34px;}95% {clip-path: inset(154px 0 -2px);left: -3px;}96% {clip-path: inset(25px 0 95px);left: 17px;}97% {clip-path: inset(32px 0 108px);left: 1px;}98% {clip-path: inset(146px 0 -9px);left: 27px;}99% {clip-path: inset(84px 0 45px);left: -8px;}15.5% {clip-path: inset(10px 0 320px);left: -20px;}16% {clip-path: inset(10px 0 320px);left: -10px;opacity: 0;}45% {opacity: 0.5;left: -20px;filter: hue-rotate(90deg) saturate(1.3);}45.5% {left: 0px;filter: invert(1);}46% {clip-path: inset(150px 0 160px);left: 15%;}46.5% {clip-path: inset(20px 0 200px);left: -10%;transform: scale(1.1);}47% {clip-path: inset(240px 0 20px);left: -11%;transform: scale(1.2);}47.5% {clip-path: inset(20 0 20px);left: 13%;transform: scale(1.3);filter: invert(0);}48% {clip-path: inset(120 0 120px);left: 15%;transform: scale(1.1);}48.5% {clip-path: inset(260px 0 10px);left: -11%;transform: scale(1.2);filter: none;}49% {clip-path: inset(5px 0 350px);left: 11%;transform: scale(1.3);}49.5% {clip-path: inset(105px 0 210px);left: 0%;transform: scale(1.1);}50% {clip-path: inset(175px 0 160px);left: -11%;}50.5% {clip-path: inset(95px 0 230px);left: -14%;transform: scale(1.2);}51% {clip-path: inset(235px 0 12px);left: -14%;}51.5% {clip-path: inset(350px 0 7px);left: -14%;}52% {clip-path: inset(320px 0 27px);left: -12%;transform: scale(1.1);}52.5% {clip-path: inset(190px 0 127px);left: -11%;transform: scale(1.3);filter: hue-rotate(90deg) saturate(1.3);}54% {clip-path: inset(20px 0 20px);left: 12%;transform: scale(1.1);filter: none;}}@keyframes glitch-two {0% {clip-path: inset(169px 0 -24px);left: 13px;}1% {clip-path: inset(124px 0 20px);left: 14px;}2% {clip-path: inset(72px 0 59px);left: 11px;}3% {clip-path: inset(58px 0 63px);left: -8px;}4% {clip-path: inset(162px 0 -34px);left: 14px;}5% {clip-path: inset(84px 0 38px);left: 12px;}6% {clip-path: inset(118px 0 36px);left: 35px;}7% {clip-path: inset(99px 0 23px);left: 37px;}8% {clip-path: inset(146px 0 -16px);left: 26px;}9% {clip-path: inset(86px 0 67px);left: -19px;}10% {clip-path: inset(110px 0 44px);left: 19px;}11% {clip-path: inset(83px 0 52px);left: 22px;}12% {clip-path: inset(159px 0 -19px);left: -1px;}13% {clip-path: inset(19px 0 122px);left: 8px;}14% {clip-path: inset(82px 0 73px);left: -17px;}15% {clip-path: inset(69px 0 82px);left: 15px;}16% {clip-path: inset(90px 0 62px);left: -17px;}17% {clip-path: inset(62px 0 87px);left: 19px;}18% {clip-path: inset(105px 0 46px);left: 10px;}19% {clip-path: inset(137px 0 -8px);left: 7px;}20% {clip-path: inset(75px 0 82px);left: -13px;}21% {clip-path: inset(100px 0 21px);left: 1px;}22% {clip-path: inset(117px 0 8px);left: 25px;}23% {clip-path: inset(95px 0 34px);left: -16px;}24% {clip-path: inset(70px 0 83px);left: 25px;}25% {clip-path: inset(168px 0 -21px);left: 13px;}26% {clip-path: inset(161px 0 -31px);left: -13px;}27% {clip-path: inset(59px 0 97px);left: 37px;}28% {clip-path: inset(35px 0 104px);left: 26px;}29% {clip-path: inset(74px 0 64px);left: -11px;}30% {clip-path: inset(2px 0 118px);left: 32px;}31% {clip-path: inset(95px 0 29px);left: -4px;}32% {clip-path: inset(95px 0 39px);left: 33px;}33% {clip-path: inset(98px 0 27px);left: 29px;}34% {clip-path: inset(98px 0 38px);left: -10px;}35% {clip-path: inset(39px 0 98px);left: 3px;}36% {clip-path: inset(151px 0 -31px);left: 19px;}37% {clip-path: inset(25px 0 130px);left: 33px;}38% {clip-path: inset(53px 0 97px);left: 17px;}39% {clip-path: inset(101px 0 19px);left: 16px;}40% {clip-path: inset(96px 0 57px);left: 21px;}41% {clip-path: inset(122px 0 29px);left: 2px;}42% {clip-path: inset(68px 0 57px);left: 2px;}43% {clip-path: inset(2px 0 148px);left: 15px;}44% {clip-path: inset(111px 0 32px);left: 29px;}45% {clip-path: inset(24px 0 126px);left: 17px;}46% {clip-path: inset(86px 0 62px);left: 22px;}47% {clip-path: inset(128px 0 4px);left: 14px;}48% {clip-path: inset(103px 0 44px);left: -11px;}49% {clip-path: inset(8px 0 115px);left: 20px;}50% {clip-path: inset(20px 0 129px);left: 18px;}51% {clip-path: inset(99px 0 57px);left: 31px;}52% {clip-path: inset(163px 0 -11px);left: 7px;}53% {clip-path: inset(48px 0 102px);left: -4px;}54% {clip-path: inset(127px 0 2px);left: 1px;}55% {clip-path: inset(98px 0 26px);left: 9px;}56% {clip-path: inset(77px 0 44px);left: 35px;}57% {clip-path: inset(93px 0 46px);left: -19px;}58% {clip-path: inset(162px 0 -41px);left: 10px;}59% {clip-path: inset(2px 0 134px);left: -7px;}60% {clip-path: inset(159px 0 -22px);left: 16px;}61% {clip-path: inset(37px 0 109px);left: 15px;}62% {clip-path: inset(166px 0 -43px);left: 21px;}63% {clip-path: inset(126px 0 28px);left: 0px;}64% {clip-path: inset(124px 0 21px);left: 15px;}65% {clip-path: inset(104px 0 23px);left: 25px;}66% {clip-path: inset(123px 0 4px);left: 26px;}67% {clip-path: inset(37px 0 87px);left: -9px;}68% {clip-path: inset(156px 0 -10px);left: 3px;}69% {clip-path: inset(12px 0 137px);left: 11px;}70% {clip-path: inset(30px 0 101px);left: 12px;}71% {clip-path: inset(115px 0 43px);left: 14px;}72% {clip-path: inset(85px 0 40px);left: 40px;}73% {clip-path: inset(118px 0 9px);left: -13px;}74% {clip-path: inset(7px 0 130px);left: 2px;}75% {clip-path: inset(48px 0 107px);left: -7px;}76% {clip-path: inset(108px 0 21px);left: -15px;}77% {clip-path: inset(150px 0 8px);left: 9px;}78% {clip-path: inset(129px 0 14px);left: -4px;}79% {clip-path: inset(45px 0 101px);left: -17px;}80% {clip-path: inset(60px 0 89px);left: 21px;}81% {clip-path: inset(169px 0 -40px);left: 32px;}82% {clip-path: inset(141px 0 8px);left: 4px;}83% {clip-path: inset(157px 0 -21px);left: 32px;}84% {clip-path: inset(91px 0 34px);left: 37px;}85% {clip-path: inset(139px 0 4px);left: -7px;}86% {clip-path: inset(5px 0 121px);left: -8px;}87% {clip-path: inset(44px 0 83px);left: 11px;}88% {clip-path: inset(135px 0 -7px);left: 18px;}89% {clip-path: inset(50px 0 106px);left: 39px;}90% {clip-path: inset(99px 0 58px);left: 7px;}91% {clip-path: inset(75px 0 76px);left: 40px;}92% {clip-path: inset(46px 0 75px);left: -14px;}93% {clip-path: inset(107px 0 17px);left: -18px;}94% {clip-path: inset(14px 0 126px);left: -14px;}95% {clip-path: inset(162px 0 -27px);left: -4px;}96% {clip-path: inset(49px 0 93px);left: 23px;}97% {clip-path: inset(136px 0 17px);left: 29px;}98% {clip-path: inset(31px 0 106px);left: -2px;}99% {clip-path: inset(79px 0 66px);left: 24px;}25.5% {clip-path: inset(10px 0 320px);left: -20px;}26% {clip-path: inset(10px 0 320px);left: -10px;opacity: 0;}45% {opacity: 0.3;left: -20px;filter: hue-rotate(45deg) saturate(1.1);}45.5% {left: 0px;filter: invert(1.2);}46% {clip-path: inset(50px 0 260px);left: -12%;}46.5% {clip-path: inset(120px 0 100px);left: 8%;transform: scale(1.2);}47% {clip-path: inset(40px 0 300px);left: 8%;transform: scale(1.3);}47.5% {clip-path: inset(220 0 70px);left: -9%;transform: scale(1.1);filter: invert(1.1);}48% {clip-path: inset(240px 0 120px);left: 11%;transform: scale(1.2);}48.5% {clip-path: inset(0px 0 310px);left: -12%;transform: scale(1.2);filter: none;}49% {clip-path: inset(255px 0 50px);left: 11%;transform: scale(1.3);}49.5% {clip-path: inset(10px 0 240px);left: 6%;transform: scale(1.1);}50% {clip-path: inset(275px 0 90px);left: -12%;}50.5% {clip-path: inset(195px 0 90px);left: 14%;transform: scale(1.4);}51% {clip-path: inset(35px 0 282px);left: -14%;}51.5% {clip-path: inset(350px 0 7px);left: 14%;}52% {clip-path: inset(20px 0 270px);left: -12%;transform: scale(1.1);}52.5% {clip-path: inset(90px 0 227px);left: -11%;transform: scale(1.3);filter: hue-rotate(150deg) saturate(1.3);}54% {clip-path: inset(220px 0 100px);left: 12%;transform: scale(1.1);filter: none;}}@keyframes main-img-hide {5% {filter: invert(1);}5.2% {filter: none;}10% {opacity: 0.5;filter: grayscale(1);}11% {filter: none;opacity: 1;}45% {opacity: 0.5;filter: grayscale(1);}46% {filter: none;opacity: 1;}53.5% {opacity: 0.5;filter: grayscale(1);}54% {filter: none;opacity: 1;}54.5% {opacity: 0.5;filter: hue-rotate(30deg);}55% {filter: none;}55.5% {opacity: 1;}56% {opacity: 0.5;}56.5% {opacity: 0.8;}57% {opacity: 0.3;}58% {filter: none;opacity: 1;}}'
	}
};

export default (lib, game, ui, get, ai, _status) => {
	return {
		/**
		 * Description 游戏全局相关操作
		 */
		game: {},
		/**
		 * Description 角色相关操作
		 */
		player: {
			/**
			 * Description 更换角色的头像
			 * @param {Player} player 需要更换头像的玩家
			 * @param {string} imageSource  图片源，可以为角色名（player.name）
			 * @param {number|string} replace 要替代的，默认为1（单将模式不用管）
			 * @returns {null} 无返回
			 */
			changeAvatar(player, imageSource, replace) {
				if (replace && (player.name2 === replace || replace === 2)) {
					player.node.avatar2.setBackground(imageSource, "character");
				} else {
					player.node.avatar.setBackground(imageSource, "character");
				}
			},
			/**
			 * Description 为角色设置用于显示的名称(如吕布，貂蝉等)
			 * @param {Player} player 要设置名称的玩家
			 * @param {string} name 新名称
			 * @param {undefined | 1 | 2 | string} replace name1或name2
			 * @returns {null}
			 */
			setName(player, name, replace) {
				let targetNode = player.node.name;
				if (replace && (player.name2 === replace || replace === 2)) {
					targetNode = player.node.name2;
				}
				targetNode.innerHTML = name;
			},
			/**
			 * Description
			 * @param {any} player player对象
			 * @param {"glitch"} styleName 想要设置的风格，如glitch（详见CSSS）
			 * @param {number|string} replace 要替代的，默认为1（单将模式不用管）
			 * @returns {any}
			 */
			changeAvatarStyle(player, styleName, replace) {
				if (!player || !styleName) return;
				if (CSSS[styleName]) {
					// 导入相关样式
					if (!lib.miaoStorage.initedStyle.includes(styleName)) {
						loadStyleString(CSSS[styleName].cssText);
						lib.miaoStorage.initedStyle.push(styleName);
					}
					let dom = player.node.avatar;
					if (replace && (player.name2 === replace || replace === 2)) {
						dom = player.node.avatar2;
					}
					dom.classList.add(CSSS[styleName].className);
				}
			}
		},
		loadash: {
			/**
			 * Description 浅浅拷贝对象
			 * @param {Array | Object} target
			 * @returns {Array | Object}
			 */
			shallowClone(target) {
				if (Array.isArray(target)) {
					return [...target];
				}
				if (typeof target === "object" && target !== null) {
					return { ...target };
				}
				return target;
			}
		},
		// 提供一些便捷的math功能
		math: {
			/**
			 * Description
			 * @param {number} start
			 * @param {number} end
			 * @returns {number} [start,end]
			 */
			randInt(start, end) {
				end += 1;
				return Math.floor(Math.random() * (end - start) + start);
			}
		},
		// 一些不好分类的功能放在这里
		other: {
			/**
			 * Description 返回一个function，每次执行会控制台递增输出0，1，2等等，用于debug挺好
			 * @returns {function}
			 */
			useLogger() {
				let count = 0;
				return (...args) => {
					console.log(count++, ...args);
				};
			},
			/**
			 * Description 类似python的sleep，配合await使用，使async函数暂停。
			 * @param {number} timeout 暂停时间
			 * @returns {null}
			 */
			async sleep(timeout) {
				await new Promise(r => setTimeout(r, timeout));
				return;
			},

			isAsyncFunction(func) {
				return func.constructor.name === "AsyncFunction";
			},

			loadStyleString
		}
	};
};
