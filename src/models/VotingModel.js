class VotingModel {
    constructor(parseVoting){
        this.id = parseVoting.id;
        this.title = parseVoting.get("title");
        this.details = parseVoting.get("details");
        this.options = parseVoting.get("options");
        this.endDate = parseVoting.get("endDate");
        this.community = parseVoting.get("community");
        this.parseVotingObj = parseVoting;
    }
}

export default VotingModel;