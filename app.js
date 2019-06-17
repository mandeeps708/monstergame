new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        maxHealth: 100,
        minHealth: 0,
        actionLog: []
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.actionLog = [];
        },

        attack: function() {
            damage = this.calculateDamage(3, 15);
            this.monsterHealth -= damage;
            this.actionLog.push(['you', "You attacked with damage " + damage]);
            if(this.checkWin()){
                return;
            }
            this.monsterTurn();
        },

        specialAttack: function() {
            damage = this.calculateDamage(15, 20);
            this.monsterHealth -= damage;
            this.actionLog.push(['you', "You special-attacked with damage " + damage]);
            if(this.checkWin()){
                return;
            }
            this.monsterTurn();
        },

        heal: function() {
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
                this.actionLog.push(['you', "You healed with power 10"]);
            }
            this.monsterTurn();
            return;
        },

        giveUp: function() {
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.actionLog = [];
        },

        calculateDamage: function(min, max) {
            let damage = Math.floor(min + Math.random() * (max - min));
            return damage;
        },

        checkWin: function() {
            if(this.monsterHealth <= 0){
                this.monsterHealth = 0;
                alert('You won!');
                this.gameIsRunning = false;
                return true;
            }
            else if(this.playerHealth <= 0){
                this.playerHealth = 0;
                alert('You lost!');
                this.gameIsRunning = false;
                return true;
            }
        },

        monsterTurn: function() {
            damage = this.calculateDamage(3, 15);
            this.playerHealth -= damage;
            this.actionLog.push(['monster', "Monster attacked with damage " + damage]);
            this.checkWin();
        }
    }
});
