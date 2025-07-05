const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTM0ODE5MGYyNjRlM2JlNWYxMjVhMGM0ZTI5NGUwMyIsIm5iZiI6MTc1MTc0NzQ5Ny43Niwic3ViIjoiNjg2OThiYTkyYzRlZmFjYmMxNTNmNWRhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qK2EAt4tgx0YiDd1BAxeUrraAO-0UeEclwaDzP9c9O8",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
