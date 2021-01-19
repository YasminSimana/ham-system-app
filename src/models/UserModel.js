class UserModel {
    constructor(parseUser){
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.building = parseUser.get("building");
        this.apartment = parseUser.get("apartment");
        this.isCommitteeMember = parseUser.get("isCommitteeMember");
        this.img = parseUser.get("img").url();
        this.community = parseUser.get("community");
    }
}

export default UserModel;