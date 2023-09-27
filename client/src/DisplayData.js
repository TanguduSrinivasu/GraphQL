import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

//$name should be same as the variable defined in the fetchMovie function
const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      age
      nationality
    }
  }
`;

const DELETE_USER = gql`
mutation Deleteuser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    id
  }
}
`

const UPDATE_USERNAME = gql`
mutation UpdateUsername($updateUsernameInput: Updateusername!) {
  updateUsername(input: $updateUsernameInput) {
    id
    username
  }
}
`

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState();
  const [nationality, setNationality] = useState("");

  const [deleteId, setDeleteId] = useState();

  const [updateId, setUpdateId] = useState();
  const [updateUserName, setUpdateUserName] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: moviesData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUsername] = useMutation(UPDATE_USERNAME);

  if (loading) {
    return <h1>Data is loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div className="App">
      <h1>Users</h1>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h1>ID : {user.id}</h1>
              <h1>Name : {user.name}</h1>
              <h1>UserName : {user.username}</h1>
              <h1>Age : {user.age}</h1>
              <h1>Nationality : {user.nationality}</h1>
              <br></br>
            </div>
          );
        })}

      <br></br>

      <h1>Movies</h1>
      {moviesData &&
        moviesData.movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h1>Name : {movie.name}</h1>
              <h1>YearOfPublication : {movie.yearOfPublication}</h1>
              <h1>IsInTheaters : {movie.isInTheaters}</h1>
            </div>
          );
        })}

      <div>
        <h1>Search Movie By Name</h1>
        MovieName :
        <div>
          <input
            type="text"
            placeholder="Enter the Movie Name"
            value={movieSearched}
            onChange={(e) => setMovieSearched(e.target.value)}
          ></input>
        </div>
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });

            setMovieSearched("");
          }}
        >
          Fetch Movie Data
        </button>
      </div>

      <div>
        {movieSearchedData && (
          <div>
            <h1>MovieName: {movieSearchedData.movie.name}</h1>
            <h1>
              Year Of Publication: {movieSearchedData.movie.yearOfPublication}
            </h1>
          </div>
        )}
        {movieSearchedError && <h1> There was an error fetching the data</h1>}
      </div>

      <div>
        <h1>creating the User</h1>
        Name :{" "}
        <input
          type="text"
          placeholder="Enter the Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        UserName :{" "}
        <input
          type="text"
          placeholder="Enter the UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        Age :{" "}
        <input
          type="number"
          placeholder="Enter the Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></input>
        Nationality :{" "}
        <input
          type="text"
          placeholder="Enter the Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        ></input>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: Number(age),
                  nationality,
                },
              },
            });

            refetch();
            setName("");
            setUsername("");
            setAge("");
            setNationality("");
          }}
        >
          Create the User
        </button>
      </div>



      <div>
        <h1>Delete the User</h1>
        Name :{" "}
        <input
          type="text"
          placeholder="Enter the ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            deleteUser({
              variables: {
                deleteUserId : Number(deleteId)
              },
            });

            refetch();
            setDeleteId("");
          }}
        >
          Delete the User
        </button>
      </div>


      <div>
        <h1>Update the User</h1>
        ID :{" "}
        <input
          type="text"
          placeholder="Enter the UpdateID"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        ></input>
        UserName :{" "}
        <input
          type="text"
          placeholder="Enter the UpdateID"
          value={updateUserName}
          onChange={(e) => setUpdateUserName(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            updateUsername({
              variables: {
                updateUsernameInput : {
                  id : updateId,
                  newUsername : updateUserName
                }
              },
            });

            refetch();
            setUpdateId("");
            setUpdateUserName("");
          }}
        >
          Update the User
        </button>
      </div>


    </div>
  );
};

export default DisplayData;
