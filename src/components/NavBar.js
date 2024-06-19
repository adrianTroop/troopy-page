//Top of the page where the user would link up his wallet to be able to participate in this.

const Navbar = () => {
    return(
        <div className='exchange__header--account flex'>
            <p><small> My balance </small> 0 ETH </p>
            <button className="token-button" >Connect</button>
            
        </div>
    );
}

export default Navbar;

