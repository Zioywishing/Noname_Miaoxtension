export default (lib, game, ui, get, ai, _status) => {
	return {
		test: "test123",
		isAsyncFunction(func) {
			return func.constructor.name === 'AsyncFunction';
		},
		watch: function (obj, key, callback) {
			
		},
	};
};
