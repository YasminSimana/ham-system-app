class UserModel {
    constructor(parseUser){
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
        this.apartment = parseUser.get("apartment");
        this.isCommitteeMember = parseUser.get("isCommitteeMember");
        this.img = parseUser.get("img");
    }
}

export default UserModel;