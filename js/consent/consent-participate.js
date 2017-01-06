var consentRepository
var profileRepository
var profile

$(document).ready(function() {
	var login = new Login()
	login.login(function(){

    profile = new Profile()
    consentRepository = new ConsentRepository()
    profileRepository = new ProfileRepository()

    $('#img-consent-disagree-creator').attr('src', profile.imageUrl)

		var urlParamsDecoder = new UrlParamsDecoder(window.location.href)
  	if(urlParamsDecoder.hasParam('id')) {
   		var id = urlParamsDecoder.valueOf('id')
      consentRepository.find(id, function(consent) {
        refreshConsent(consent)  
      })
  	} 
	})

  var refreshConsent = function(consent) {
    $('#p-consent-participate-current-decision').html(consent.currentProposal().replace(/(?:\r\n|\r|\n)/g, '<br />'))
        refreshBadges(consent)
        refreshButtons(consent)
        profileRepository.find(consent.creator(), function(creatorProfile){
          $('#img-consent-participate-creator').attr('src', creatorProfile.imageUrl)
        }, function(){
          console.log('Profile of creator not found')
        })
        $('#consent-history-body').empty()
        var historyBodyHtml = ''
        $.each(consent.votes, function(index, vote){
          createVoteHtml(vote, function(voteHtml){
            if(vote.proposal != undefined) 
              historyBodyHtml+='<div class="panel panel-default">'
            
            historyBodyHtml += voteHtml
            var nextVote = consent.votes[index+1] 
            if(nextVote != undefined && nextVote.proposal != undefined)
              historyBodyHtml += '</div>'
          })
        })
        console.log(historyBodyHtml)
        $('#consent-history-body').append(historyBodyHtml)
  }

  var createVoteHtml = function(vote, callback) {
    
    profileRepository.find(vote.voter, function(profile){
    var voteHtml = ''
    voteHtml = 

      '<div class="media">'
      + '<div class="media-left">'
      +   '<img class="media-object img-circle" src="'+profile.imageUrl+'" >'
      + '</div>'
      + '<div class="media-body">'
      +   '<h4 class="media-heading">'+profile.givenName+'</h4>'
      +   vote.vote
      + '</div>'
    +'</div>'
    callback(voteHtml)
    }, function(){console.log('Profile of creator not found')})
    
  }

  $('#btn-consent-participate-agree').click(function(){
    if(isEnabled('#btn-consent-participate-agree')) {
      consent.agree(profile.email)
      consentRepository.persist(consent, function(){
        refreshConsent(consent)
      })
    }
  })

  $('#btn-consent-participate-accept').click(function(){
    if(isEnabled('#btn-consent-participate-accept')) {
      consent.accept(profile.email)
      consentRepository.persist(consent, function(){
        refreshConsent(consent)
      })
    }
  })

  $('#txtarea-consent-disagree-proposal').on('input propertychange paste', function() {
    disableOn($('#txtarea-consent-disagree-proposal').val()==="", 
        ['#btn-consent-disagree-proposal-accept',
        '#btn-consent-disagree-proposal-agree'])
  })
  
  $('#btn-consent-disagree-proposal-accept').click(function(){
      if(isEnabled('#btn-consent-disagree-proposal-accept')) {
          consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').val(), $('#txtarea-consent-disagree-reason').val())
          consent.accept(profile.email)
          consentRepository.persist(consent, function(){
            $("#modal-consent-disagree").modal('hide')
            refreshConsent(consent)
          })  
      }
  })

  $('#btn-consent-disagree-proposal-agree').click(function(){
    if(isEnabled('#btn-consent-disagree-proposal-agree')) {
      consent.disagree(profile.email, $('#txtarea-consent-disagree-proposal').val(), $('#txtarea-consent-disagree-reason').val())
        consent.agree(profile.email)
        consentRepository.persist(consent, function(){
          $("#modal-consent-disagree").modal('hide')
          refreshConsent(consent)
        })  
    }
  })

  $('#btn-consent-participate-disagree').click(function(){    
    $("#modal-consent-disagree").modal('show');
  })
  

})

function refreshBadges(consent) {
  $('#bdg-consent-participate-agree').text(consent.agreeCount())
  $('#bdg-consent-participate-accept').text(consent.acceptCount())
}

function refreshButtons(consent) {
  disableOn(consent.hasAgreed(profile.email), ['#btn-consent-participate-agree'])
  disableOn(consent.hasAccepted(profile.email), ['#btn-consent-participate-accept'])  
}