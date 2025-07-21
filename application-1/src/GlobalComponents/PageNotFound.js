import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="pnf">
            <img src="/pageNotFound.png" alt="PageNotFound Image" />
            <p>Let's go back, click here <Link to={'/'}>Tasks</Link></p>
        </div>
    );
}

export default PageNotFound;
