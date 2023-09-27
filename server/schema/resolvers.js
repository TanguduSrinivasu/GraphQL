//all the functions are defined in the resolvers

const {UserList, MovieList} = require('../DummyData')

const resolvers = {
    Query : {
        users : () => {
            return UserList;
        },

        user: (parent,args) => {
            const id = args.id;
            return UserList.find(person => person.id === Number(id));
        },

        movies : () => {
            return MovieList;
        },

        movie: (parent, args) => {
            const name = args.name;
            return MovieList.find(data => data.name === name);
        }
    },

    User : {
        favouriteMovies : () => {
            return MovieList.filter(movie => movie.yearOfPublication > 2010)
        }
    },

    Mutation : {

        createUser : (parent, args) => {
            const user = args.input;
            const lastUserId = UserList[UserList.length - 1].id;
            user.id = lastUserId+1;
            UserList.push(user);
            return user;
        },

        updateUsername : (parent, args) => {
            const {id, newUsername} = args.input;
            let updatedUser;
            UserList.map(user => {
                if(user.id === Number(id)) {
                    user.username = newUsername;
                    updatedUser = user;
                }
            })

            return updatedUser;
        },

        deleteUser : (parent, args) => {
            const id = args.id;
            const objIndex = UserList.findIndex(user => user.id === Number(id));

            if(objIndex !== -1) {
               UserList.splice(objIndex,1);
            }
            return null;
        }
    }

}


module.exports = {resolvers};