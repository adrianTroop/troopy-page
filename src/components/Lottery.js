
const Lottery = () => {

    const placeLotteryBet = async () => {
        console.log("Lottery button")
    }

    return(
        <div>
            <div className="App">
            <h1>LOTTOKEN</h1>
            <p>Connected account: {"account"}</p>
            <p>Ticket Price: {"ticketPrice"} Ether</p>
                <button className="token-button" onClick={ placeLotteryBet }>Enter Lottery</button>
                <p>{"Deposit 10$ in ETH to participate"}</p>
                <p>{"All the deposit will be drop to the winner every friday"}</p>
                <p5>{"Smart Contract keep 3% of deposits"}</p5>
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
