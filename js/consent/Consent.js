function Consent(creator, proposal) {
	this.agreeCount = 0
	this.acceptCount = 0
	this.currentDecision = proposal
	var instance = this
	
	this.agree = function() {
		instance.agreeCount++
	}
	
	this.accept = function() {
		instance.acceptCount++
	}
	
	this.disagree = function(reason, newProposal) {
		instance.agreeCount = 0
		instance.acceptCount = 0
		instance.currentDecision = newProposal
	}

	this.currentDecision = function() {
		return instance.currentDecision
	}
}