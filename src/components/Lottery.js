//import { useSelector, useDispatch } from "react-redux"

//import ticketPriceFetcher from "./ticketPriceFetcher";

const Lottery = () => {

    //let isBetplaced = false;
    const placeLotteryBet = async (e) => {
        //transaction = await lotteryContract.connect(user).deposit({ value: amount })
        //result = await transaction.wait()
        e.preventDefault()
        console.log("Lottery button")
    }

    return(
        <div>
            <div className="App">
            <h1>hi LOTTO</h1>
            <h2>Pot Balance: 10,000,000 hi</h2>
            < ticketPriceFetcher />
                <button className="token-button" onClick={ placeLotteryBet }>Coming soon!</button>
                <p>{"All the deposit will be drop to the winner every friday"}</p>
                <p>{"Lottery will keep 3% of deposits"}</p>
            <h2>Participants</h2>
            <ul>
                <li>Bet Number 1</li>
                <li>Bet Number 2</li>
                <li>Bet Number 3</li>
                <li>Bet Number 4</li>
            </ul>
      </div> 
        </div>
    );
}

export default Lottery;
