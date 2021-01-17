import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [bookChosen, setBookChosen] = useState(false);
  const [bookName, setBookName] = useState("");
  const [book, setBook] = useState({
    passageName: "",
    passage: "",

  });

  const searchBook = () => {

    // Reads the API
    Axios.get(`https://bible-api.com/${bookName}`)
    .then((response) => {
      console.log(response);
      setBook({
        passageName: bookName,
        passage: response.data.text,

      });

      setBookChosen(true);
    });
    addNewLines(book);
  };

  // Adds a new line after "."
  const addNewLines = (book) => {
    book.passage = book.passage.replaceAll(/\. /g, '.\n');
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Bible passages</h1>
        <input type="text" onChange= {(event) => {
          setBookName(event.target.value);
          }}
        />
        <button onClick={searchBook}>Search the Bible</button>
      </div>
      <div className="DisplaySection">
        {!bookChosen ?
        (<>
        <h3> Please write the passage you want to read.</h3>
        <h6>Format example: john 3:16</h6>
        <h6>If you want several passages, write: john 3:1-16</h6>
        </>)
        :
        (
        <>
        <h2>{book.passageName}</h2>
        <div className="lineBreak">
          <h6>{book.passage}</h6>
        </div>


        <h3><a target="_blank" rel="noreferrer" href="https://www.amazon.com/Womens-Study-Bible-Cloth-Board/dp/1433572036/ref=sr_1_25?dchild=1&amp;keywords=bible&amp;qid=1610740785&amp;sr=8-25/&amp;WZoneDirect-no-more-redirect&_encoding=UTF8&tag=nelsonsc-20&linkCode=ur2&linkId=e49357c6582beed94febcce8e7d98cdf&camp=1789&creative=9325">Click here to learn more</a></h3>
        </>
        )}

      </div>
    </div>
  );
}

export default App;
