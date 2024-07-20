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

export default (lib, game, ui, get, ai, _status) => {
	return {
		isAsyncFunction(func) {
			return func.constructor.name === "AsyncFunction";
		},
		watch: function (obj, key, callback) {},
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
			 * @param {undefined | 1 | 2} replace name1或name2
			 * @returns {null}
			 */
			setName(player, name, replace) {
				let targetNode = player.node.name;
				if (replace && (player.name2 === replace || replace === 2)) {
					targetNode = player.node.name2;
				}
				targetNode.innerHTML = name;
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
		math: {},
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
			}
		}
	};
};
