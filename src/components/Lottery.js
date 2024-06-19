
const Lottery = () => {
    return(
        <div>
            <div className="App">
            <h1>LOTTOKEN</h1>
            <p>Connected account: {"account"}</p>
            <p>Ticket Price: {"ticketPrice"} Ether</p>
                <button className="token-button" sonClick={"enterLottery"}>Enter Lottery</button>
                    {/*timeLeft > 0 ? (
                    <p>Time left: {timeLeft} seconds</p>
                    ) : (
                    <button onClick={pickWinner}>Pick Winner</button>
                    )*/}
                <p>{"Deposit 10$ in ETH to participate"}</p>
                <p>{"All the deposit will be drop to the winner every friday"}</p>
                <p5>{"Smart Contract keep 3% of deposits"}</p5>
            <h2>Participants</h2>
            <ul>
                {/*players.map((player, index) => (
                <li key={index}>{player}</li>
                 ))*/}
            </ul>
      </div> 
        </div>
    );
}

export default Lottery;
