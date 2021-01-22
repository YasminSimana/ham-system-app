class VotingModel {
    constructor(parseVoting){
        this.id = parseVoting.id;
        this.title = parseVoting.get("title");
        this.details = parseVoting.get("details");
        this.options = parseVoting.get("options");
        this.results = parseVoting.get("results");
        this.endDate = parseVoting.get("endDate");
        this.community = parseVoting.get("community");
        this.parseVotingObj = parseVoting;
    }

    getFinalResult(){
        let dataArr = [];
        for (let i = 0; i < this.options.length; i++){
            dataArr[i] = 0;
        }
        for (const res of this.results) {
            dataArr[this.options.indexOf(res["vote"])] ++;
        }
        console.log("max",dataArr)
        return this.options[dataArr.indexOf(Math.max(...dataArr))];
    }
}

export default VotingModel;