import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import axios from 'axios';
import "./App.css"
import { useEffect, useState } from "react"

function App() {
  type Quotes= {
    quote: string;
    author: string;
  }[];

  const [quoteList, setQuoteList] = useState<Quotes>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuote = quoteList[currentIndex];
  const quote = currentQuote ? currentQuote.quote : '';
  const author = currentQuote ? currentQuote.author : '';


  const handleNext =() => {
    if (currentIndex+1 < quoteList.length){
    setCurrentIndex(prevIndex => prevIndex + 1);}
    else {
      quoteList.sort(()=>Math.random()-0.5);
      setCurrentIndex(0);
    }
  }
  
  const handleprevious=() => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  }

  const handleShareOnTwitter = () => {
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  const handleShareOnWhatsApp = () => {
    const message = encodeURIComponent(`"${quote}" - ${author}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };



  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get('http://localhost:4000/quotes');
        const fetchedQuotes = response.data;
        fetchedQuotes.sort(()=>Math.random()-0.5);
        setQuoteList(fetchedQuotes);

      } catch (error) { console.error("Error fetching data :", error); }  

    ;
  }

  fetchData();
  }, []);
  

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box">
          {quoteList.length > 0 ? (
            <>
              <div className="quote">
                <p><i>{quote}</i></p>
                <span><b>{author}</b></span>
              </div>
              <div className="bottom-navigation">
                <div>
                  {currentIndex!==0 ?(
                  <Button className={classnames("rotate cp")}
                  onClick={handleprevious}
                   
                   />):(null)};
                  <Button className="cp" 
                  onClick={handleNext}
                  />
                </div>
                <div className="share">
                  <span>Share At:</span>
                  <Twitter title="Post this quote on Twitter!" 
                  className="cp"
                  onClick={handleShareOnTwitter} 
                   />
                  <Whatsapp title="Post this quote on WhatsApp!" 
                  className="cp" 
                  onClick={handleShareOnWhatsApp}
                  />
                </div>
              </div>
            </>
          ) : (
            <p>Loading quotes...</p>
          )}
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  );
}

export default App;