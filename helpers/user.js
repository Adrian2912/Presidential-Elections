class user {
    constructor(id, firstName, lastName, email, password, phoneNumber, birthDate, description, hasVoted, isCandidate, isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.description = description;
        this.hasVoted = hasVoted;
        this.isCandidate = isCandidate;
        this.isAdmin = isAdmin;
    }
}

module.exports = { user };