var playersList = []


const Utils = {
    resetApp(){
        var players = document.querySelector('div#players')
        var qttTeamsInput = document.querySelector('input#txtteams')
        var qttPlayersInput = document.querySelector('input#txtqttplayer')
        var inputPlayer = document.querySelector('input#txtplayer')

        inputPlayer.value = ""

        qttTeamsInput.value = ""

        qttPlayersInput.value = ""

        players.innerHTML = "<p>Jogadores:</p>"

        playersList.splice(0, playersList.length)

        inputPlayer.focus()
    },

    resetPlayersList(){
        var players = document.querySelector('div#players')
        playersList.splice(0, playersList.length)
        players.innerHTML = "<p>Jogadores:</p>"
    },

    removeLast() {
        if(playersList.length <= 0){
            window.alert("[ERRO] Não existem jogadores para serem removidos")
        }
        else{
            var players = document.querySelector('div#players')
            playersList.pop()
            players.innerHTML = "<p>Jogadores:</p>"
            playersList.forEach(function(playerName){
                players.innerHTML += `${playerName}, `
            })
        }
    },

    validateFields(){
        var qttPlayers = Number(document.querySelector('input#txtqttplayer').value)
        var qttTeam = Number(document.querySelector('input#txtteams').value)
        if(qttPlayers <= 0 || qttTeam <= 0){
            players = document.querySelector('input#txtqttplayer')

            teams = document.querySelector('input#txtteams')

            window.alert("[ERRO] insira uma quantidade de times ou jogadores válida")
            players.value = ""
            teams.value = ""
            return false
        }
        else if((qttTeam*qttPlayers) > playersList.length){
            window.alert(`[ERRO] Você precisa de ${qttTeam*qttPlayers} jogadores`)
            return false
        }
        else{
            return true
        }
    }
} 

const TabInsert = {
    insertPlayerHtml(player){
        const html =
        `
        <td>
            ${player}
        </td>
         `
        
        return html
    },
    

    addPlayer(){
        var inputPlayer = document.querySelector('input#txtplayer')
        var playerName = document.querySelector('input#txtplayer').value
        var players = document.querySelector('div#players')
        if(Number(playerName.length) == 0){
            window.alert("[ERRO] Insira um nome válido")
        }
        else{
            playersList.push(playerName)
            players.innerHTML = "<p>Jogadores:</p>"
            playersList.forEach(function(name){
                players.innerHTML += `${name}, `
            })
        }
        inputPlayer.value = ""
        inputPlayer.focus()
    },

}

const setTeams = {
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    createTeams() {
        var qttPlayers = Number(document.querySelector('input#txtqttplayer').value)
        var qttTeam = Number(document.querySelector('input#txtteams').value)    
            for(var i = 0;i < qttTeam;i++){
                var index = i+1
                var playerTeams = document.querySelector(`table#team${index}`)
                for(var k = 0;k < qttPlayers;k++){
                    playerIndex = setTeams.getRandomIntInclusive(0, (playersList.length-1))
                    var name = playersList[playerIndex]
                    playerTeams.innerHTML += setTeams.generatePlayerHtml(name)
                    playersList.splice(playerIndex, 1)
                }
            }
        Utils.resetApp()
    },


    generateTeamsHTML(){
        var qttPlayers = Number(document.querySelector('input#txtqttplayer').value)
        var qttTeam = Number(document.querySelector('input#txtteams').value)
        var teams = document.querySelector('div#tables')
        teams.innerHTML = ''
        console.log(qttTeam*qttPlayers)
        if(Utils.validateFields()){
            for(var i = 0;i < qttTeam;i++){
                index = i+1
                const html =
                `
                <table id="team${index}" class="teamTable">
                    <caption>TIME${index}</caption>
                </table>
                `  
                teams.innerHTML += html
            }
            setTeams.createTeams()
        }
    },

    generatePlayerHtml(name){
        const html =
        `
        <tr>
            <td>
                ${name}
            </td>
        </tr>
        `
        return html
    }

}
