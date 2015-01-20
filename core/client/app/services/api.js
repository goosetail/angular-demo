APP_MODULE
	.factory('API', [
		'$http',
		'Util',
		function($http, Util) {

			function req(method, params, callback) {

				var url = '/rpc';

				if (typeof params === 'function') {
					callback = params;
					params = undefined;
				}

				return Util.responseHandler($http.post(url, Util.rpcWrapper (method, params)), callback);
			}

			return {
				getTodoList: function (params, callback) {
					return req('todo.getList', params, callback);
				}
			};

		}
	]);
