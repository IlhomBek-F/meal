
const API = 'https://my-json-server.typicode.com/IlhomBek-F/test-node/posts'

export async function getAllMeals() {
  const data = await fetch(API)
  const source = await data.json()
  return source
}

export async function addNewMealToServer(mealData: any) {
    const fetchs = await fetch(API, {
        method: 'POST',
        body: JSON.stringify([mealData]),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await fetchs.json();

    return data
}

export async function deleteMeal(id: any) {
  const deleted = await fetch(`${API}/${id}`, {
    method: 'DELETE',
  });

  return deleted
}

export async function updateMeal(data: any) {
  const updated = await fetch(`${API}/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  const parse = await updated.json();

  return parse;
}