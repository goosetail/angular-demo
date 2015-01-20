angular.module('angular-util', [])

	.factory('Util', [
		'$rootScope',
		'$state',
		'$window',
		'$q',
		function($rootScope, $state, $window, $q) {

			var requestId = 1;

			return {

				responseHandler: function(promise, callback) {
					var self = this;
					var deferred = $q.defer();

					promise
						.success(function(data) {

							if (data.error) {

								self.handleError(data.error.message);
								callback && callback(JSON.stringify(data.error.message));
								deferred.reject(data.error.message);
							}
							else if (!data || !data.result) {

								callback && callback('Error with the response.');
								deferred.reject(data);
							}
							else {

								callback && callback(null, data.result);
								deferred.resolve(data.result);
							}
					})
					.error(function(data){

						self.handleError(data);
						callback && callback(data);
						deferred.reject(data);
					});

					return deferred.promise;
				},

				rpcWrapper: function(method, params) {
					return {
						jsonrpc: '2.0',
						id: this.generateRequestId(),
						method: method,
						params: params || {}
					};
				},

				handleError: function (err) {
					switch (err) {
						case 'Unauthorized':
							$state.go('index');
							break;
					}
				},

				generateRequestId: function() {
					return ++requestId + '';
				}
			};
		}]);
