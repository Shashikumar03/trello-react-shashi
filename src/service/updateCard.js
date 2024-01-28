import axios from "axios";

function updateCard(id, data) {
  const key = "1e8fc84d1844931bc0c2e1dec3b8cb6a";
  const token =
    "ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763";
  const url = `https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`;

  return axios
    .put(url, data)
    .then((res) => {
      // console.log(`Response: ${res.status} ${res.statusText}`);
      return res.data;
    })
    .catch((error) => console.log(error));
}

export default updateCard;
// https://api.trello.com/1/cards/{id}?key=APIKey&token=APIToken
