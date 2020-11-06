import './App.css';
import React, {useState} from "react";
import {
  Switch,
  Route,
  NavLink,
  Link,
  Prompt,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";

const Login = ({isLoggedIn, loginMsg, setLoginStatus}) => {
  const handleClick = () => {
    setLoginStatus(!isLoggedIn)
  };
  return (
    <div>
      <h2>{loginMsg}</h2>
      <em>This simulates a real login page. Here you just need to press the button.</em>
      <em>In a real application you obviously will need to add your credentials, and log in via the server.</em>
      <br />
      <button onClick={handleClick}>{loginMsg}</button>
    </div>
  );
}

export default function App({bookFacade}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  }

  return (
  <div>
  <Header 
    isLoggedIn={isLoggedIn} 
    loginMsg={isLoggedIn ? "Log out" : "Log in"}
    />
  <Routes 
    bookFacade={bookFacade}
    isLoggedIn={isLoggedIn} 
    loginMsg={isLoggedIn ? "Log out" : "Log in"}
    setLoginStatus={setLoginStatus}
    />
  </div>
  );
}

const Header = ({isLoggedIn, loginMsg}) => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
      {isLoggedIn && (
        <React.Fragment>
        <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
        <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
        </React.Fragment>
      )}
      <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
    </ul>
  )
}

const Routes = ({bookFacade, isLoggedIn, loginMsg, setLoginStatus}) => {
  return (
  <Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route path="/products">
    <Products bookFacade={bookFacade} />
  </Route>
  <Route exact path="/add-book">
    <AddBook bookFacade={bookFacade} />
  </Route>
  <Route exact path="/find-book">
    <FindBook bookFacade={bookFacade} />
  </Route>
  <Route exact path="/company">
    <Company />
  </Route>
  <Route path="/login-out">
    <Login 
      isLoggedIn={isLoggedIn}
      loginMsg={loginMsg}
      setLoginStatus={setLoginStatus}
      />
  </Route>
  <Route>
    <NoMatch />
  </Route>
</Switch>
  );
}

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

const Products = ({bookFacade}) => {
  let { path, url } = useRouteMatch();
  const books = [...bookFacade.getBooks()];

  return (
    <div>
      <h2>Products</h2>
      <ul>
      {books.map((book) => {
        return (
          <li key={book.id}>
          {book.title}
          {"  -  "}
          <Link to={`${url}/${book.id}`}>details</Link>
          </li>
        );
      })}
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Click 'details' to see information about a book.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

// NOTE: changed it, but leaving this here
// as a reminder for myself. See findBook in
// bookFacade to understand.

// id here is a string, therefore == and not === is used
// since === requires the types of both values to be of
// the same type, whereas == checks for value equality 
// with type conversion. An alternative would be using
// the parseInt method to convert it before using the
// find method. 
const Details = ({bookFacade}) => {
  let {id} = useParams();
  let specificBook = bookFacade.findBook(parseInt(id));
  
  if (typeof specificBook !== "undefined") {
  return (
    <div>
      <p>
        ID: {specificBook.id}<br/>
        Title: {specificBook.title}<br/>
        Info: {specificBook.info}<br/>
      </p>
    </div>
  )
  } else {
    return (
    <div>
      <p>Error: book does not exist.</p>
      </div>
      )
    }
}

const AddBook = ({bookFacade, editBook}) => {
  const newBook = {title: "", info: ""};
  const [book, setBook] = useState(typeof editBook !== "undefined" ? editBook : newBook);
  const [isBlocking, setIsBlocking] = useState(false);
  const [added, setAdded] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const val = target.value;
    setIsBlocking(true);
    setBook({ ...book, [name]: val})
    setAdded("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof book.id === "undefined") {
      setAdded("Book has been added")
      setBook(newBook);
    } else {
      setAdded("Book has been edited")
    }
    bookFacade.addBook(book);
    setIsBlocking(false);
  }

  const title = typeof book.id === "undefined" ? "Add Book" : "Edit Book";
  const btn = typeof book.id === "undefined" ? "Add" : "Edit";

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="title" value={book.title} placeholder={"Add title"}></input><br/>
        <input onChange={handleChange} name="info" value={book.info} placeholder={"Add info"}></input><br/>
        <input type="submit" value={btn}></input>
        <br/>
        {added}
        <Prompt
          when={isBlocking}
          message={location =>
          `Are you sure you want to go to ${location.pathname}?`
        } 
        />
      </form>
    </div>
  );
}

const FindBook = ({bookFacade}) => {
  const [id, setId] = useState(0);
  const [book, setBook] = useState({});
  const [edit, setEdit] = useState();
  let showBook = "";

  const handleChange = (e) => {
    const target = e.target;
    const val = target.value;
    setId(val);
    setEdit();
    setBook({})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let foundBook = {...bookFacade.findBook(id)};
    setBook(foundBook);
  }

  const deleteBook = (e) => {
    e.preventDefault();
    let delId = parseInt(e.target.id);
    bookFacade.deleteBook(delId);
    setBook({})
  }

  const editBook = () => {
    setEdit(<AddBook editBook={book} bookFacade={bookFacade}/>);
  }

  if (typeof book.id !== "undefined") {
  showBook = <p>
    ID: {book.id}<br/>
    Title: {book.title}<br/>
    Info: {book.info}<br/>
    <button id={book.id} onClick={deleteBook}>Delete</button>
    <button onClick={editBook}>Edit</button>
    </p>;
  }

  return (
    <div>
      <h2>Find Book</h2>
      <form onSubmit={handleSubmit}>
        <input name="bookId" placeholder={"Enter book id"} onChange={handleChange} />
        <input type="submit" value="Find book" />
      </form>
      <br />
      {showBook}
      {edit}
    </div>
  )
}

const Company = () => {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

const NoMatch = () => {
  return (
    <div>
      <h2>Unknown route. Please try again.</h2>
    </div>
  );
}
