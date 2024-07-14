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
		player: {},
		// 提供一些便捷的math功能
		math: {
			randInt: function (num) {
				num || (num = 1000000000);
				if (num === -1) {
					num = -1000000000;
				} else if (num === 1) {
					num = 1000000000;
				}
				let _n = Math.ceil(Math.random() * num);
				if (num < 0) {
					_n *= -1;
				}
				return _n;
			}
		}
	};
};
