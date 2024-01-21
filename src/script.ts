//https://api.github.com/users

let getUserName = document.querySelector("#username") as HTMLInputElement;
let form = document.querySelector("#search-form") as HTMLFormElement;
let bodySection = document.querySelector(".main_container") as HTMLElement;

//define the contract os the object
interface User {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

async function myCustomeFetcher<T>(
  url: string,
  option?: RequestInit
): Promise<T> {
  let userData = await fetch(url);
  if (!userData) {
    throw new Error("Unable to fetch data");
  }
  let data = await userData.json();
  return data;
}

//display on UI
const displayOnUI = (singleUser: User) => {
  bodySection.insertAdjacentHTML(
    "beforeend",
    `
    <div class='card'>
    <img src=${singleUser.avatar_url} alt=${singleUser.login} width=90px/>
    </div>

    <div class='footer-card'>
    <img src=${singleUser.avatar_url} alt=${singleUser.login} width=10px/>
    <a href=${singleUser.url} target='_blank'> Github </a>
    </div>
    `
  );
};

async function getApiData(url: string): Promise<any> {
  myCustomeFetcher<User[]>("https://api.github.com/users").then((user) => {
    for (const singleUser of user) {
      displayOnUI(singleUser);
    }
  });
}

getApiData("https://api.github.com/users");

//implement search functionality
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = getUserName.value.toLowerCase();

  const allUserData = await myCustomeFetcher<User[]>('https://api.github.com/users');
  const matchingUser = allUserData.filter((user)=>{
    return user.login.toLowerCase().includes(userInput);
  })

  bodySection.innerHTML= "";

  if(matchingUser.length === 0){
    bodySection.insertAdjacentHTML('beforeend',`
    <p class='errormsg'>No matching element found </p>
    `)
  }else{
    matchingUser.forEach((data)=>{
        displayOnUI(data);
    })
  }
  
});
