import axios from "axios";
function fetchListonBoard(id) {
  return axios
    .get(
      `https://api.trello.com/1/boards/${id}/lists?key=1e8fc84d1844931bc0c2e1dec3b8cb6a&token=ATTA37d79c87a013e2a1efbca713a526f9b622ad3530693ce7b35b3e78d8135be91eD024A763`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
}

export default fetchListonBoard;
