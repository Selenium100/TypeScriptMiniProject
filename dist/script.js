"use strict";
//https://api.github.com/users
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let getUserName = document.querySelector("#username");
let form = document.querySelector("#search-form");
let bodySection = document.querySelector(".main_container");
function myCustomeFetcher(url, option) {
    return __awaiter(this, void 0, void 0, function* () {
        let userData = yield fetch(url);
        if (!userData) {
            throw new Error("Unable to fetch data");
        }
        let data = yield userData.json();
        return data;
    });
}
//display on UI
const displayOnUI = (singleUser) => {
    bodySection.insertAdjacentHTML("beforeend", `
    <div class='card'>
    <img src=${singleUser.avatar_url} alt=${singleUser.login} width=90px/>
    </div>

    <div class='footer-card'>
    <img src=${singleUser.avatar_url} alt=${singleUser.login} width=10px/>
    <a href=${singleUser.url} target='_blank'> Github </a>
    </div>
    `);
};
function getApiData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        myCustomeFetcher("https://api.github.com/users").then((user) => {
            for (const singleUser of user) {
                displayOnUI(singleUser);
            }
        });
    });
}
getApiData("https://api.github.com/users");
//implement search functionality
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const userInput = getUserName.value.toLowerCase();
    const allUserData = yield myCustomeFetcher('https://api.github.com/users');
    const matchingUser = allUserData.filter((user) => {
        return user.login.toLowerCase().includes(userInput);
    });
    bodySection.innerHTML = "";
    if (matchingUser.length === 0) {
        bodySection.insertAdjacentHTML('beforeend', `
    <p class='errormsg'>No matching element found </p>
    `);
    }
    else {
        matchingUser.forEach((data) => {
            displayOnUI(data);
        });
    }
}));
