
import { writable, derived } from 'svelte/store';

export const jokeArr = writable([]);
export const favoriteArr = derived(
  jokeArr,
  $jokeArr => $jokeArr.filter(function (el) { return el.favorite == true; })
);

export const fetchJoke = async () => {

  const jokeData = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const res = await jokeData.json();
  jokeArr.update(v => {
    v.unshift({ "id": res.id, "joke": res.joke, favorite: false })
    return v
  })

};


export const fetchHalloweenJoke = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",

  };

  let num = Math.floor(Math.random() * 100) + 2

  const jokeData = await fetch("https://v1.nocodeapi.com/cofocus/google_sheets/pcQolKnTUpiVszjF?tabId=Jokes&api_key=AScJsfZLjyjewYbUk&row_id=" + num, requestOptions)
  const res = await jokeData.json();

  jokeArr.update(v => {
    console.log(res)
    v.unshift({ "id": res.ID, "joke": res.Joke, favorite: false })
    return v
  })

  return res
};