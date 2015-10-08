"use strict";

const IBase = require("./IBase");
const ITextChannel = require("./ITextChannel");
const Utils = require("../core/Utils");
const Channel = require("../models/Channel");

// todo: refactor ITextChannel IDirectMessageChannel
class IDirectMessageChannel extends IBase {
	constructor(discordie, directMessageChannelId) {
		super(Channel, (key) => {
			const value = this._discordie._channels
				.get(this._directMessageChannelId)[key];
			if(value) {
				if(key == "name")
					return this.recipient.username;
			}
			return value;
		});
		this._discordie = discordie;
		this._directMessageChannelId = directMessageChannelId;
		Utils.privatify(this);
		Object.freeze(this);
	}
	get recipient() {
		return this._discordie.Users.get(this.recipient_id);
	}
	get allMessagesLoaded() {
		return !this._discordie._messages.channelHasMore(this.id);
	}
	get messages() {
		return this._discordie.Messages.forChannel(this.id);
	}
	fetchMessages(before, after, limit) {
		return ITextChannel.prototype.fetchMessages.apply(this, arguments);
	}
	sendMessage(content, mentions, tts) {
		return ITextChannel.prototype.sendMessage.apply(this, arguments);
	}
	sendTyping() {
		return ITextChannel.prototype.sendTyping.apply(this, arguments);
	}
	close() {
		return rest(this._discordie).channels.deleteChannel(this.id);
	}
}

module.exports = IDirectMessageChannel;