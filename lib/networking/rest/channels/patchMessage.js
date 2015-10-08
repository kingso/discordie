const Constants = require("../../../Constants");
const Events = Constants.Events;
const Endpoints = Constants.Endpoints;
const apiRequest = require("../../../core/ApiRequest");

module.exports = function(channelId, messageId, content, mentions) {
	return new Promise((rs, rj) => {
		apiRequest
		.patch(`${Endpoints.MESSAGES(channelId)}/${messageId}`)
		.auth(this.token)
		.send({
			content: content,
			mentions: mentions,
		})
		.end((err, res) => {
			if(!res.ok)
				return rj(err, res);

			this._messages.set(res.body);
			rs(res.body);
		});
	});
}