/* ------------ Turning form data to JSON ------------ */
import Role from './user-role.js';

export default class User {
    id = "";
    accountCreation = "";
    firstName = "";
    lastName = "";
    email = "";
    username = "";
    password = "";
    birthday = "";
    gender = "";
    preferredPronoun = null;
    role = null;

    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    convertJSON = (json) => {
        this.id = json.ID;
        this.accountCreation = json.dateOfAccountCreation;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.username = json.username;
        this.password = json.password;
        this.birthday = json.birthday;
        this.gender = json.gender;
        this.preferredPronoun = json.preferredPronoun;
        this.role = new Role(json.role.id, json.role.name);
        if(this.role.name.toLowerCase().includes("customer"))
            this.role.name = "Customer";
        else
            this.role.name = "Admin";
    }

    get firstName() {
        return this.firstName;
    }
    set firstName(firstName) {
        this.firstName = firstName;
    }

    get lastName() {
        return this.lastName;
    }
    set lastName(lastName) {
        this.lastName = lastName;
    }

    get email() {
        return this.email;
    }
    set email(email) {
        this.email = email;
    }

    get username() {
        return this.username;
    }
    set username(username) {
        this.username = username;
    }

    get password() {
        return this.password;
    }
    set password(password) {
        this.password = password;
    }

    get birthday() {
        return this.birthday;
    }
    set birthday(birthday) {
        this.birthday = birthday;
    }

    get gender() {
        return this.gender;
    }
    set gender(gender) {
        this.gender = gender;
    }

    get preferredPronoun() {
        return this.preferredPronoun;
    }
    set preferredPronoun(pronoun) {
        this.preferredPronoun = pronoun;
    }

    get id() {
        return this.id;
    }
    set id(id) {
        this.id = id;
    }

    get accountCreation() {
        return this.accountCreation;
    }
    set accountCreation(accountCreation) {
        this.accountCreation = accountCreation;
    }

    get role() {
        return this.role;
    }
    set role(role) {
        this.role = role;
    }
}