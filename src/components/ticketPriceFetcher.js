const ticketPriceFetcher = () => {

    const ticketPrice = async () =>{
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            const price = data.ethereum.usd;
            document.getElementById('eth-price').innerText = `$${price}`;
        } catch (error) {
            console.error('Error fetching Ethereum price:', error);
            document.getElementById('eth-price').innerText = 'Error fetching price';
        }
    }

    return(
        <div>
            <p>Ticket PriRe: Ether</p>
        </div>
    );
}

export default ticketPriceFetcher;